from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, \
session, flash, redirect, url_for
from forms import SignupForm, RequestForm
from models import User, Request, Skill, Course, Notification, Mailbox, \
    Conversation, Message, Payment, Rating, Email
from hashlib import md5
from datetime import datetime
import emails, boto, stripe, os
from sqlalchemy import desc
import json, traceback
import mandrill
from twilio import twiml



stripe_keys = {
    'secret_key': os.environ['SECRET_KEY'],
    'publishable_key': os.environ['PUBLISHABLE_KEY']
}
MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']

stripe.api_key = stripe_keys['secret_key']
MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

@app.route('/', methods=['GET', 'POST'])
def index():
    if os.environ.get('TESTING') and not session.get('testing-admin'):
        return redirect(url_for('login'))
    tutor_signup_incomplete = False
    guru_referral = False
    request_form = RequestForm()
    if session.get('guru-checked'):
        guru_referral = True
        session.pop('guru-checked')
    if request.args.get('email'):
        session['referral'] = request.args.get('email')
        if request.args.get('email') == 'guru':
            session['guru-checked'] = True
        return redirect(url_for('index'))
    if session.get('tutor-signup'):
        tutor_signup_incomplete = True
        return render_template('new_index.html', forms=[request_form],
        logged_in=session.get('user_id'), tutor_signup_incomplete=tutor_signup_incomplete)
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        if user.skills and len(user.notifications) < 2:
            return redirect(url_for('settings'))
        return redirect(url_for('activity'))
    return render_template('new_index.html', forms=[request_form],
        logged_in=session.get('user_id'), tutor_signup_incomplete=tutor_signup_incomplete, \
        environment = get_environment(), session=session, guru_referral=guru_referral)

@app.route('/sneak/', methods=['GET', 'POST'])
def sneak():
    return render_template('new_index.html')

@app.route('/tos/', methods=['GET','POST'])
def tos():
    return render_template('tos.html')


@app.route('/webhooks/', methods=['GET', 'POST'])
def webhooks():
    event_json = json.loads(request.data)
    stripe_response =  event_json['data']['object']
    print stripe_response
    stripe_response_type = stripe_response['object']
    if stripe_response_type == 'transfer':
        bank_account_name = stripe_response['account']['bank_name']
        recipient_id = stripe_response['recipient']
        status = stripe_response['status']

        #find user
        user = User.query.filter_by(recipient_id=recipient_id).first()
        if user:
            for n in reversed(user.notifications):
                print n.id
                if n.custom_tag == 'tutor-cashed-out':
                    if status == 'failed':
                        status = "Your bank account transfer did not go through. Please contact support@uguru.me for quick support."
                    n.status = status
                    n.skill_name = bank_account_name
                    break;
        
        if user and status == "paid":
            from emails import tutor_received_transfer
            amount = float(stripe_response['amount'] / 100)
            transfer_id = stripe_response['id']
            last4 = stripe_response['account']['last4']
            time = datetime.fromtimestamp(stripe_response['date'])
            tutor_received_transfer(user, amount, bank_account_name, transfer_id, last4, time)

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
    return "OK"

@app.route('/twilio/', methods=['GET', 'POST'])
def twilio_msg():
    if request.method == "POST":
        resp = twiml.Response()
        if request.form['Body'].upper() == "ACCEPT":
            resp.sms("You have accepted this request. See full details at uguru.me/activity.")
        # resp.message("Hello, Mobile Monkey")
        return str(resp)

@app.route('/notification-settings/', methods=('GET','POST'))
def update_notifications():
    if request.method == "POST":
        ajax_json = request.json
        print ajax_json
        user_id = session['user_id']
        user = User.query.get(user_id)
        if 'text' in ajax_json:
            user.text_notification = ajax_json.get('text')
        if 'email' in ajax_json:
            user.email_notification = ajax_json.get('email')
        db_session.commit()
        print "user email notification is now " + str(user.email_notification)
        print "user next notification is now " + str(user.text_notification)
        return jsonify(ajax_json)


@app.route('/update-profile/', methods=('GET', 'POST'))
def update_profile():
    if request.method == "POST":
        ajax_json = request.json
        print ajax_json
        return_json = {}
        user_id = session.get('user_id')
        user = User.query.get(user_id)
        
        #If image has been uploaded
        if request.files:
            file = request.files['file']
            extension = file.filename.rsplit('.',1)[1]
            destination_filename = md5(str(user_id)).hexdigest() + "." + extension

            upload_file_to_amazon(destination_filename, file)
            
            #save this to the db
            if os.environ.get('PRODUCTION'):
                amazon_url = "https://s3.amazonaws.com/uguruprof/"+destination_filename
            else:
                amazon_url = "https://s3.amazonaws.com/uguruproftest/"+destination_filename
            user.profile_url = amazon_url

            if not user.skills:
                user.settings_notif = 0

            #update previous notification profile photos to point to this new photo
            update_profile_notifications(user)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            ajax_json = {}

        #if other profile data is being updated
        if request.json:
            ajax_json = request.json
            if ajax_json.get('intro'):
                user.tutor_introduction = ajax_json.get('intro')
            if ajax_json.get('year'):
                user.year = ajax_json.get('year')
            if ajax_json.get('major'):
                user.major = ajax_json.get('major')
            if 'slc' in ajax_json:
                user.slc_tutor = ajax_json.get('slc')
            if 'previous' in ajax_json:
                user.previous_tutor = ajax_json.get('previous')
            if 'ta' in ajax_json:
                user.ta_tutor = ajax_json.get('ta')
            if 'la' in ajax_json:
                user.la_tutor = ajax_json.get('la')
            if 'res' in ajax_json:
                user.res_tutor = ajax_json.get('res')
            if 'hkn' in ajax_json:
                user.hkn_tutor = ajax_json.get('hkn')
            if 'discover' in ajax_json:
                user.discoverability = ajax_json.get('discover')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
        if user.skills and user.tutor_introduction and user.major and \
            user.profile_url != '/static/img/default-photo.jpg':
            user.settings_notif = 0
        return jsonify(ajax_json)

@app.route('/add-credit/', methods=('GET', 'POST'))
def add_credit():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if ajax_json.get('token'):
            stripe_user_token = ajax_json.get('token')
            
            customer = stripe.Customer.create(
                email=user.email,
                card = stripe_user_token
                )

            user.customer_id = customer.id
            user.customer_last4 = customer['cards']['data'][0]['last4']
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
        return jsonify(response=return_json)

@app.route('/admin/')
def admin():
    if session.get('admin'):
        users = sorted(User.query.all(), key=lambda u:u.last_active, reverse=True)
        users_last_active = {}
        for u in users:
            users_last_active[u] = pretty_date(u.last_active)
        pretty_dates = {}
        skills_dict = {}
        tutor_count = 0
        student_count = 0
        skills_array = []
        all_requests = []
        transactions = []
        payment_analytics=\
            {
                'avg-student-rate':0,
                'avg-tutor-rate':0,
                'avg-student-charge':0,
                'avg-tutor-paid':0,
                'avg-stripe-fees':0,
                'avg-profit':0
            }
        total_profit = 0
        total_revenue = 0
        ratings_dict = {}
        payments = []
        conversations = []
        
        notifications = sorted(Notification.query.all(), key=lambda n:n.id, reverse=True)

        bank_users = User.query.filter(User.recipient_id != None)
        for _user in bank_users:
            recipient_id = _user.recipient_id
            transfers = stripe.Transfer.all(recipient=recipient_id).data
            for transfer in transfers:
                transaction_dict = {}
                transaction_dict['tutor-name'] = _user.name.split(" ")[0]
                transaction_dict['tutor-id'] = _user.id
                transaction_dict['amount'] = '$' + str(float(transfer.amount / 100)) 
                transaction_dict['bank-name'] = transfer.account.bank_name
                transaction_dict['bank-status'] = transfer.status
                transaction_dict['time'] = pretty_date(datetime.fromtimestamp(transfer.created))
                transactions.append(transaction_dict)

        for c in Conversation.query.all():
            if c.requests and c.guru and c.student:
                c_dict = {}
                c_dict['conversation'] = c
                c_dict['tutor'] = c.guru
                c_dict['student'] = c.student
                c_dict['msg-count'] = len(c.messages)
                if c_dict['msg-count']:
                    c_dict['last-message-time'] = c.messages[-1].write_time
                else: 
                    c_dict['last-message-time'] = c.requests[0].time_created
                c_dict['skill-name'] = Skill.query.get(c.requests[0].skill_id).name
                conversations.append(c_dict)
        conversations = sorted(conversations, key=lambda c:c['last-message-time'], reverse=True)
        for c_dict in conversations:
            c_dict['last-message-time'] = pretty_date(c_dict['last-message-time'])


        for r in Rating.query.all():
            skill = Skill.query.get(r.skill_id)
            tutor = User.query.get(r.tutor_id)
            student = User.query.get(r.student_id)
            ratings_dict[r] = {'skill':skill.name, 'tutor-name':tutor.name.split(" ")[0], \
                'student-name':student.name.split(" ")[0]}

        for r in Request.query.all()[::-1]:
            request_dict = {}
            request_dict['emails-seen'] = 0
            request_dict['request'] = r
            request_dict['date'] = pretty_date(r.time_created)
            skill = Skill.query.get(r.skill_id)
            request_dict['skill_name'] = skill.name
            student = User.query.get(r.student_id)
            request_dict['student'] = student
            total_seen_count = 0
            for tutor in r.requested_tutors:
                for n in tutor.notifications:
                    if n.request_id == r.id:
                        if n.time_read:
                            total_seen_count += 1
            request_dict['total_seen']  = total_seen_count
            request_dict['pending-ratings'] = 0
            request_dict['message-length'] = 0
            # if r.emails:
            #     count = 0
            #     mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            #     for email in r.emails:
            #         mandrill_id = email.mandrill_id
            #         try:
            #             result = mandrill_client.messages.info(id=mandrill_id)
            #             if result['opens'] > 0:
            #                 count += 1
            #         except mandrill.Error, e:
            #             print 'A mandrill error occurred: %s - %s' % (e.__class__, e)
            #     request_dict['emails-seen'] = count

            if r.last_updated:
                request_dict['last-updated'] = pretty_date(r.last_updated)
            if r.connected_tutor_id:
                tutor = User.query.get(r.connected_tutor_id)
                request_dict['connected-tutor'] = tutor
                c = Conversation.query.filter_by(guru=tutor, student=student).first()
                if c:
                    request_dict['message-length'] = len(c.messages)
                _payments = None 
                if tutor and student:
                    _payments = Payment.query.filter_by(tutor_id=tutor.id, student_id=student.id)
                if _payments:
                    _payments = sorted(_payments, key=lambda d:d.time_created)
                    count = 0
                    for p in _payments:
                        payment_dict = {}
                        payment_dict['recurring'] = False
                        if count >= 1:
                            payment_dict['recurring'] = True
                        # payment_dict['recurring'] = len(_payments) > 1
                        from app.static.data.prices import prices_dict
                        prices_reversed_dict = {v:k for k, v in prices_dict.items()}
                        payment_dict['payment'] = p
                        payment_dict['time_created'] = pretty_date(p.time_created)
                        payment_dict['student'] = student
                        payment_dict['tutor'] = tutor
                        if count >= 1:
                            payment_dict['student-hourly'] = p.tutor_rate
                        else: 
                            payment_dict['student-hourly'] = prices_reversed_dict[p.tutor_rate]
                        payment_analytics['avg-student-rate'] += payment_dict['student-hourly']
                        payment_dict['tutor-hourly'] = p.tutor_rate
                        payment_analytics['avg-tutor-rate'] += payment_dict['tutor-hourly']
                        student_charge = payment_dict['student-hourly'] * p.time_amount
                        if count >=1:
                            payment_dict['student-total'] = student_charge  * 1.03 + 2
                        else:
                            payment_dict['student-total'] = student_charge 
                        payment_analytics['avg-student-charge'] += payment_dict['student-total']
                        tutor_paid = p.tutor_rate * p.time_amount
                        payment_analytics['avg-tutor-paid'] += tutor_paid
                        stripe_fees = payment_dict['student-total'] * 0.029 + 0.30
                        payment_dict['tutor-total'] = tutor_paid
                        payment_dict['stripe-fees'] = round(stripe_fees, 2)
                        payment_analytics['avg-stripe-fees'] += payment_dict['stripe-fees']
                        request_dict['payment'] = round(payment_dict['student-total'] - tutor_paid - stripe_fees, 2)
                        payment_dict['profit'] = request_dict['payment']
                        payment_analytics['avg-profit'] += payment_dict['profit']
                        total_profit += payment_dict['profit']
                        total_revenue += student_charge
                        payments.append(payment_dict)
                        count += 1
                request_dict['pending-ratings'] = 0
                if student and student.pending_ratings:
                    request_dict['pending-ratings'] += 1
                if tutor and tutor.pending_ratings:
                    request_dict['pending-ratings'] += 1
            all_requests.append(request_dict)
        all_requests = sorted(all_requests, key=lambda d: d['request'].id, reverse=True)
        payments = sorted(payments, key=lambda d:d['payment'].time_created, reverse=True)
        unverified_tutor_count = 0
        for u in users: 
            pretty_dates[u.id] = pretty_date(u.time_created)
            if u.referral_code == 'guru' and not u.approved_by_admin:
                unverified_tutor_count += 1
            if u.skills:
                result_string = ""
                for s in u.skills:
                    result_string = result_string + s.name + " "
                    skills_array.append(s.name)
                skills_dict[u.id] = result_string
                tutor_count +=1 
            else:
                student_count += 1
        from collections import Counter
        import operator
        skills_counter = dict(Counter(skills_array))
        skills_counter = sorted(skills_counter.iteritems(), key=operator.itemgetter(1))
        return render_template('admin.html', users=users, pretty_dates = pretty_dates, \
            skills_dict = skills_dict, tutor_count = tutor_count, student_count=student_count, \
            all_requests = all_requests, skills_counter = skills_counter, notifications=notifications,\
            payments=payments, total_profit=total_profit, environment = get_environment(), ratings=Rating.query.all(),\
            ratings_dict=ratings_dict, transactions=transactions, conversations=conversations, users_last_active=users_last_active,\
            total_revenue = total_revenue, payment_analytics=payment_analytics)
    return redirect(url_for('index'))

@app.route('/add-bank/', methods=('GET', 'POST'))
def add_bank():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if ajax_json.get('token'):
            stripe_user_token = ajax_json.get('token')
            stripe_user_legal_name = ajax_json.get('legal-name')
            
            recipient = stripe.Recipient.create(
                name=stripe_user_legal_name,
                type="individual",
                email=user.email,
                bank_account=stripe_user_token
            )

            user.recipient_id = recipient.id

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 


        transfer = stripe.Transfer.create(
                amount=int(user.balance * 100), # amount in cents, again
                currency="usd",
                recipient=user.recipient_id
            )

        from notifications import tutor_cashed_out
        notification = tutor_cashed_out(user, user.balance)
        db_session.add(notification)

        notification.status = 'Pending'
        notification.skill_name = 'Pending'

        user.notifications.append(notification)

        user.balance = 0

        flash("Thank you for cashing out! You should have the funds in account 1-3 days.")

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 

        return jsonify(response=return_json)        

@app.route('/submit-rating/', methods=('GET', 'POST'))
def submit_rating():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'tutor-rating-student' in ajax_json:
            rating = user.pending_ratings[0]
            print user.pending_ratings
            rating.student_rating = ajax_json['num_stars']
            student = User.query.get(rating.student_id)
            student_name = student.name.split(" ")[0]
            if 'additional_detail' in ajax_json:
                rating.student_rating_description = ajax_json['additional_detail']
            
            user.pending_ratings.remove(rating)
            student.student_ratings.append(rating)


            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            flash("For your next session with " + student_name + ", just set up a time and meetup. At the end of the session, request payment as you usually would with " + student_name + "'s regenerated secret code.")

        if 'student-rating-tutor' in ajax_json:
            rating = user.pending_ratings[0]
            rating.tutor_rating = ajax_json['num_stars']
            tutor = User.query.get(rating.tutor_id)
            tutor_name = tutor.name.split(" ")[0]
            
            if 'additional_detail' in ajax_json:
                rating.tutor_rating_description = ajax_json['additional_detail']

            user.pending_ratings.remove(rating)
            tutor.tutor_ratings.append(rating)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            flash("For your next session with " + tutor_name + ", you won't need to submit a request again. Just set up a time, meetup, and provide the regenerated code to " + tutor_name + " for payment.")

    return jsonify(return_json=return_json)     

@app.route('/500/')       
def _500():
    return render_template('500.html')

@app.route('/submit-payment/', methods=('GET', 'POST'))
def submit_payment():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'submit-payment' in ajax_json:
            recurring = None
            conversation_id = ajax_json.get('submit-payment')
            total_time = ajax_json.get('total-time')

            conversation = Conversation.query.get(conversation_id)

            for _request in conversation.requests:
                if _request.connected_tutor_id == user_id:
                    r = _request
                    student_id = _request.student_id
                    student = User.query.get(student_id)
                    return_json['student-profile-url'] = student.profile_url

            if student.secret_code != ajax_json.get('secret-code').lower():
                return_json['secret-code'] = False
                return jsonify(return_json=return_json)

            return_json['secret-code'] = True
            student.secret_code = generate_secret_code()

            from app.static.data.prices import prices_dict
            prices_reversed_dict = {v:k for k, v in prices_dict.items()}
            if 'price-change' in ajax_json:
                total_amount = prices_reversed_dict[int(float(ajax_json['price-change']))] * float(total_time)
                r.actual_hourly = int(float(ajax_json['price-change']))
                r.connected_tutor_hourly = int(float(ajax_json['price-change']))
            else:
                total_amount = prices_reversed_dict[r.connected_tutor_hourly] * float(total_time)

            #if user has already has a payment with this student id
            p = Payment.query.filter_by(tutor_id=user.id, student_id=student.id)
            if p.first():
                recurring = True
                if 'price-change' in ajax_json:
                    total_amount = (float(ajax_json['price-change']) * float(total_time) * 1.03) + 2
                else:
                    total_amount = (r.connected_tutor_hourly * float(total_time) * 1.03) + 2

            print total_amount

            stripe_amount_cents = int(total_amount * 100)

            # user.incoming_requests_to_tutor.remove(r)

            payment = Payment(r)
            payment.time_amount = float(total_time)
            payment.tutor_rate = r.connected_tutor_hourly
            payment.request_id = r.id

            tutor = user
            student_id = payment.student_id
            student = User.query.get(student_id)

            charge = stripe.Charge.create(
                amount = stripe_amount_cents,
                currency="usd",
                customer=student.customer_id,
                description="charge for receiving tutoring"
            )

            charge_id = charge["id"]

            amount_charged = float(stripe_amount_cents / 100.0)
            

            db_session.add(payment)

            tutor.payments.append(payment)
            student.payments.append(payment)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            r.payment_id = payment.id
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[Skill.query.get(r.skill_id).name]
            rating = Rating(r.id)
            tutor.pending_ratings.append(rating)
            db_session.add(rating)
            db_session.commit()

            return_json['student-name'] = student.name.split(" ")[0]

        
                
            amount_made = (r.connected_tutor_hourly * float(total_time))

            tutor.balance = tutor.balance + amount_made
            tutor.total_earned = tutor.total_earned + amount_made   

            #Add pending rating to student 
            for rating in tutor.pending_ratings:
                if rating.student_id == student.id:
                    student.pending_ratings.append(rating)

            from notifications import student_payment_approval, tutor_receive_payment
            tutor_notification = tutor_receive_payment(student, tutor, payment, amount_made)
            student_notification = student_payment_approval(student, tutor, payment, amount_charged, charge_id, skill_name, recurring)
            tutor.notifications.append(tutor_notification)
            student.notifications.append(student_notification)
            db_session.add_all([tutor_notification, student_notification])
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
    return jsonify(return_json=return_json)

@app.route('/send-message/', methods=('GET', 'POST'))
def send_message():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'update-message' in ajax_json and not session.get('admin'):
            conversation_num = ajax_json.get('conversation-num')
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            conversation = conversations[conversation_num]
            conversation.is_read = True
            if user.msg_notif > 0:
                user.msg_notif = user.msg_notif - 1
            else:
                user.msg_notif = 0
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'send-message' in ajax_json:
            message_contents = ajax_json.get('send-message')
            conversation_num = ajax_json.get('conversation-num')
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            conversation = conversations[conversation_num]
            conversation.last_updated = datetime.now()
            sender_id = user.id
            if conversation.guru_id == user.id:
                receiver_id = conversation.student_id
                receiver = User.query.get(receiver_id)
            else:
                receiver_id = conversation.guru_id
                receiver = User.query.get(receiver_id)

            #If previous message was not the sender, we know the receive should receive a notification + email 
            if not conversation.messages or conversation.messages[-1].sender_id != user.id \
                or (conversation.messages[-1].sender_id == user.id and conversation.is_read):
                receiver.msg_notif += 1
                
                
                if not conversation.messages :
                    from emails import send_message_alert
                    send_message_alert(receiver, user)
                else:
                    last_message_time = conversation.messages[-1].write_time
                    current_time = datetime.now()
                    difference_time = current_time - last_message_time
                    if difference_time.seconds > (15 * 60):
                        from emails import send_message_alert
                        send_message_alert(receiver, user)


            message = Message(message_contents, conversation, user, receiver)
            db_session.add(message)
            
            conversation.is_read = False
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            print 'message-created'
        return jsonify(response=return_json)

@app.route('/update-request/', methods=('GET', 'POST'))
def update_requests():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'tutor-accept' in ajax_json:
            hourly_amount = ajax_json.get('hourly-amount')
            notif_num = ajax_json.get('notif-num')
            tutor = user
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            incoming_request_num = current_notification.request_id


            r = Request.query.get(incoming_request_num)
            r.committed_tutors.append(tutor)
            skill_id = r.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name]

            student = User.query.get(r.student_id)
            student.incoming_requests_from_tutors.append(r)
            db_session.commit()

            current_notification.feed_message = 'You accepted <b>' + student.name.split(' ')[0] + \
                "'s</b> request for <b>" + skill_name.upper() + "</b>."
            current_notification.feed_message_subtitle = "<b>Click here</b> to see next steps."
            current_notification.custom = 'tutor-accept-request'
            current_notification.time_created = datetime.now()
            
            if ajax_json.get('price-change'):
                current_notification.request_tutor_amount_hourly = ajax_json.get('hourly-amount')
            else:
                current_notification.request_tutor_amount_hourly = r.student_estimated_hour
            
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None

            from notifications import tutor_request_accept, student_incoming_tutor_request
            for n in student.notifications[::-1]:
                if n.request_id == r.id:
                    original_skill_name = n.custom
            extra_detail = ajax_json.get('extra-detail')
            student_notification = student_incoming_tutor_request(student, tutor, r, original_skill_name, hourly_amount, extra_detail)
            student.notifications.append(student_notification)
            db_session.add(student_notification)
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'tutor-cancel-accept' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            _request = Request.query.get(current_notification.request_id)
            _request.committed_tutors.remove(user)

            skill_id = _request.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name]

            student = User.query.get(_request.student_id)

            current_notification.feed_message = "<b>" + student.name.split(" ")[0] + "</b> needs help in " + skill_name.upper()
            current_notification.feed_message_subtitle = "<b>Click here</b> to see more information"
            current_notification.custom = skill_name
            current_notification.request_tutor_amount_hourly = None

            for n in student.notifications:
                if n.request_id == _request.id and n.request_tutor_id == user.id:
                    student_notification = n
                    break
            student_notification.feed_message_subtitle = "<span style='color:#CD2626'>Sorry! This tutor is not able to help anymore.</span>"
            student_notification.request_tutor_amount_hourly = None
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            flash("You successfully canceled your commitment to " + student.name.split(" ")[0] + "'s request")

        if 'edit-request' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            _request = Request.query.get(current_notification.request_id)
            changed_fields = {}

            if ajax_json['additional'] != _request.description:
                changed_fields['additional'] = {'before':_request.description, 'after':ajax_json['additional']}
                _request.description = ajax_json['additional']
            if ajax_json['availability'] != _request.available_time:
                changed_fields['availability'] = {'before':_request.available_time, 'after':ajax_json['availability']}
                _request.available_time = ajax_json['availability']
            if ajax_json['location'] != _request.location:
                changed_fields['location'] = {'before':_request.location, 'after':ajax_json['location']}
                _request.location = ajax_json['location']
            if float(ajax_json['time-length']) != _request.time_estimate:
                changed_fields['time-length'] = {'before':_request.time_estimate, 'after':float(ajax_json['time-length'])}
                _request.time_estimate = float(ajax_json['time-length'])
            if int(ajax_json['price']) != _request.student_estimated_hour:
                changed_fields['price'] = {'before':_request.student_estimated_hour, 'after':int(ajax_json['price'])}
                _request.student_estimated_hour = int(ajax_json['price'])
            
            if changed_fields:
                _request.last_updated = datetime.now()
                #send emails to tutors
                #if price or availability has changed, email all tutors that have not committed

                #LATER: If availability, location, description, or time-length has been changed
                #Let committed tutors know

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            flash("Your request has been successfully edited!")

        if 'tutor-reject' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            request_num = ajax_json.get('request-num')
            _request = Request.query.get(request_num)
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            print _request
            # user.incoming_requests_to_tutor.remove(_request)
            student_name = User.query.get(_request.student_id).name.split(" ")[0]

            current_notification.feed_message = 'You rejected ' + student_name + "'s request for " +\
                current_notification.skill_name + "."
            current_notification.feed_message_subtitle = None
            current_notification.custom = 'tutor-reject'
            current_notification.time_created = datetime.now()

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

        if 'cancel-request' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            student_notification = user_notifications[notif_num]
            request_id = student_notification.request_id
            _request = Request.query.get(request_id)
            _request.connected_tutor_id = user.id
            user.outgoing_requests.remove(_request)
            user.notifications.remove(student_notification)
            
            for _tutor in _request.requested_tutors:
                for n in sorted(_tutor.notifications, reverse=True):
                    if n.request_id == _request.id:
                        n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has canceled the original request.</span>'
            
            flash("Your request has been successfully canceled.")
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

        if 'cancel-connected-request' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            reason = ajax_json.get('radio-index')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            student_notification = user_notifications[notif_num]
            request_id = student_notification.request_id
            _request = Request.query.get(request_id)
            former_tutor = User.query.get(_request.connected_tutor_id)
            _request.connected_tutor_id = None
            user.outgoing_requests.append(_request)

            #Find the matched notification
            for n in user.notifications[::-1]:
                if n.custom == 'student-accept-request' and n.request_id == _request.id:
                    user.notifications.remove(n)
                    db_session.delete(n)
                    break;

            #Delete the conversation
            for c in user.mailbox.conversations:
                if c.guru == former_tutor and c.student == user:
                    db_session.delete(c)

            for _tutor in _request.requested_tutors:
                for n in sorted(_tutor.notifications, reverse=True):
                    if n.request_id == _request.id:
                        n.feed_message_subtitle = '<span style="color:#69bf69">This request is still <strong>available</strong>! Click here to accept now!</span>'

            #Delete the tutor's you've been matched notification + conversation
            for n in former_tutor.notifications[::-1]:
                if n.custom == 'tutor-is-matched' and n.request_id == _request.id:
                    former_tutor.notifications.remove(n)
                    db_session.delete(n)

            #Email the tutor
            tutor_name = former_tutor.name.split(" ")[0]
            student_name = user.name.split(" ")[0]
            from app.emails import student_canceled_connection
            student_canceled_connection(user, former_tutor, reason)
            flash('Your connection has been successfully canceled')

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

            

        if 'student-accept' in ajax_json:
            notification_id = ajax_json.get('notification-id')
            student = user
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notification_id]
            skill_name = current_notification.skill_name
            
            print current_notification.id

            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)

            #Modify student notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name + " tutor."
            current_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            current_notification.custom = 'student-accept-request'
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None
            current_notification.time_created = datetime.now()

            #Update request
            request_id = current_notification.request_id
            r = Request.query.get(request_id)
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_id = tutor_id
            r.connected_tutor_hourly = current_notification.request_tutor_amount_hourly
            r.time_connected = datetime.now()
            r.student_secret_code = user.secret_code

            student.outgoing_requests.remove(r)

            for _tutor in r.requested_tutors:
                if _tutor.id != tutor_id:
                    for n in sorted(_tutor.notifications, reverse=True):
                        if n.request_id == r.id:
                            n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has already chose another tutor.</span>'
            
            #Modify tutor notification
            for n in tutor.notifications:
                if n.request_id == r.id:
                    tutor_notification = n
            tutor_notification.feed_message = "<b>You</b> have been matched with " + user.name.split(" ")[0] + " for " + skill_name + "."
            tutor_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            tutor_notification.custom = 'tutor-is-matched'
            tutor_notification.time_created = datetime.now()
            tutor.feed_notif += 1
            tutor_notification.time_read = None
            from emails import tutor_is_matched, student_is_matched
            tutor_is_matched(user, tutor, skill_name)
            student_is_matched(user, tutor, r.student_secret_code)


            #create conversation between both
            conversation = Conversation.query.filter_by(student_id=user.id, guru_id=tutor.id).first()
            if not conversation:
                conversation = Conversation(skill, tutor, user)
                conversation.requests.append(r)
                conversation.last_updated = datetime.now()
                db_session.add(conversation)
            else:
                conversation.is_read = False



            #create message notifications
            tutor.msg_notif += 1
            student.msg_notif += 1

            #let other committed tutors now that they have been rejected
            # from emails import student_chose_another_tutor
            for _tutor in r.committed_tutors:
                if r.connected_tutor_id != tutor.id and r.connected_tutor_id != user.id:
                    for n in _tutor.notifications:
                        if n.request_id == r.id:
                            tutor_notification = n
                    tutor.feed_notif += 1
                    tutor_notification.time_read = None
                    tutor_notification.feed_message_subtitle = '<span style="color:red">This request has been canceled</span>'
                    tutor_notification.time_created = datetime.now()
                    # student_chose_another_tutor(user, current_notification.skill_name, _tutor)
                    print "Email sent to " + tutor.email
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        return jsonify(response=return_json)
    


@app.route('/notif-update/', methods=('GET', 'POST'))
def notif_update():
    if request.method == "POST":
        return_json = {}

        #If admin is logged in, don't mark things as read or update their feed counter.
        if session.get('admin'):
            return jsonify(return_json=return_json)            
        
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'update-total-settings' in ajax_json:
            user.settings_notif = 0

        if 'update-feed-count' in ajax_json:
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            notification = user_notifications[ajax_json['notif_num']]
            notification.time_read = datetime.now()
            user.feed_notif = user.feed_notif - 1

        if 'update-total-unread' in ajax_json:
            user.feed_notif = ajax_json['update-total-unread']

        if 'update-total-messages' in ajax_json:
            user.msg_notif = ajax_json['update-total-messages']
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 

    return jsonify(return_json=return_json)

@app.route('/reset-password/', methods=('GET', 'POST'))
def reset_pw():
    if request.method == 'POST':
        return_json = {}

        ajax_json = request.json

        if 'email' in ajax_json:
            from emails import generate_new_password
            from app.static.data.random_codes import random_codes_array
            import random
            new_password = random.choice(random_codes_array).lower()
            email = ajax_json['email'].lower()

            user = User.query.filter_by(email=email).first()
            if user:
                user.password = md5(new_password).hexdigest()
                generate_new_password(user, new_password)
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise 


    return jsonify(return_json=return_json)

@app.route('/update-skill/', methods=('GET', 'POST'))
def update_skill():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        from app.static.data.variations import courses_dict

        if ajax_json.get('add'):
            skill_to_add = ajax_json.get('add').lower()
            # if session.get('tutor-signup'):
            #     session.pop('tutor-signup')

            #check if skill is a course
            if courses_dict.get(skill_to_add):
                skill_to_add_id = courses_dict[skill_to_add]
                skill = Skill.query.get(skill_to_add_id)
                user.skills.append(skill)
            else: #not a course 
                course = Course(skill_to_add)
                db_session.add(course)
        if ajax_json.get('remove'):
            from app.static.data.short_variations_reverse import short_variations_reverse_dict
            if short_variations_reverse_dict.get(ajax_json.get('remove')):
                skill_to_remove = short_variations_reverse_dict[ajax_json.get('remove')]
            else:
                from app.static.data.variations import courses_dict
                skill_id = courses_dict[ajax_json.get('remove').lower()]
                skill = Skill.query.get(skill_id)
                skill_to_remove = skill.name
            for skill in user.skills:
                if skill.name.lower() == skill_to_remove.lower():
                    user.skills.remove(skill)
        try:
            db_session.commit()
            if len(user.skills) == 0:
                session['tutor-signup'] = True
        except:
            db_session.rollback()
            raise 
        return jsonify(response=return_json)
    

@app.route('/update-password/', methods=('GET','POST'))
def update_password():
    if request.method == "POST":
        return_json = {}
        
        ajax_json = request.json
        old_password = md5(ajax_json.get('old-pwd')).hexdigest()
        new_password = md5(ajax_json.get('new-pwd')).hexdigest()
        user_id = session['user_id']
        user = User.query.get(user_id)
        
        if old_password != user.password:
            return_json['error'] = 'Incorrect original password'
        else:
            user.password = new_password
            return_json['success'] = 'Password successfully updated'
            print "user password before was " + str(old_password)
            print "user password is now" + str(new_password)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        return jsonify(response=return_json)

@app.route('/validation/', methods=('GET', 'POST'))
def success():
    if request.method == "POST":
        ajax_json = request.json
        print ajax_json
        
        if ajax_json.get('submit-email-home'):
            try: 
                query = User.query.filter_by(email=ajax_json['submit-email-home']).first()

                #If user with email already exists
                if query:
                    ajax_json['duplicate-email'] = True
                    return jsonify(dict=ajax_json)
                #else create the new user
                u = User(
                        name = None,
                        password = None,
                        email = ajax_json['submit-email-home'],
                        phone_number = None
                    )
                u.last_active = datetime.now()
                u.secret_code = generate_secret_code()
                db_session.add(u)
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            m = Mailbox(u)
            db_session.add(m)
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            session['signup-start'] = ajax_json['submit-email-home']
            session['signup-start-user-id'] = u.id

        if ajax_json.get('student-signup'):
            try: 
                u = User.query.get(session.get('signup-start-user-id'))
                u.name = ajax_json['name'] 
                u.password = md5(ajax_json['password']).hexdigest()
                u.phone_number = ajax_json['phone']
                u.last_active = datetime.now()
                u.secret_code = generate_secret_code()

                if session.get('referral'):
                    u.referral_code = session['referral']
                    session.pop('referral')

                if ajax_json['phone'] == '':
                    u.phone_number = None;

                # db_session.add(u)
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            user_id = u.id
            authenticate(user_id)
            session.pop('signup-start-user-id')
            session.pop('signup-start')
            try:
                from notifications import getting_started_student, getting_started_student_tip
                notification = getting_started_student(u)
                notification2 = getting_started_student_tip(u)
                u.notifications.append(notification)
                u.notifications.append(notification2)
                db_session.add_all([u, notification, notification2])
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        #Create a tutor for the first time
        if ajax_json.get('complete-tutor-signup'):
            u = User.query.get(session['user_id'])
            u.qualifications = ajax_json.get('complete-tutor-signup')
            try:
                db_session.commit()
            except:
                db_session.rollback()

        if ajax_json.get('tutor-signup'):
            try:
                u = User.query.get(session.get('signup-start-user-id'))
                u.name = ajax_json['name'] 
                u.password = md5(ajax_json['password']).hexdigest()
                u.phone_number = ajax_json['phone']

                u.last_active = datetime.now()

                if ajax_json['phone'] == '':
                    u.phone_number = None;

                u.year = 'Sophomore'
                u.verified_tutor = True
                db_session.add(u)
                db_session.commit()
                if session.get('referral'):
                    u.referral_code = session['referral']
                    session.pop('referral')
                u.settings_notif = u.settings_notif + 1
                db_session.commit()
                session['tutor-signup'] = True;

                from emails import welcome_uguru_tutor
                welcome_uguru_tutor(u)

            except:
                db_session.rollback()
                raise 
            
            user_id = u.id
            authenticate(user_id)
            print "Account created!"

        #Create a request
        if ajax_json.get('student-request'):
            user_id = session['user_id']
            from app.static.data.variations import courses_dict
            from app.static.data.short_variations import short_variations_dict
            
            original_skill_name = ajax_json['skill'].lower()
            skill_id = courses_dict[original_skill_name]
            skill = Skill.query.get(skill_id)
            skill_name = short_variations_dict[skill.name]
            u = User.query.get(user_id)

            if u.verified_tutor:
                if skill in u.skills:
                    return jsonify(dict={'tutor-request-same':True})

            # If student already has an outgoing request
            if u.outgoing_requests:
                for r in u.outgoing_requests:
                    if r.skill_id == skill_id:
                        return jsonify(dict={'duplicate-request': True})
            
            r = Request(
                student_id = user_id,
                skill_id = skill_id,
                description = ajax_json['description'],
                urgency = ajax_json['urgency'],
                frequency = None, 
                time_estimate = float(ajax_json['estimate'])
            )

            r.num_students = int(ajax_json['num-students'])
            r.student_estimated_hour = int(float(ajax_json['idea-price']))
            r.location = ajax_json['location']
            r.available_time = ajax_json['availability']
            u.outgoing_requests.append(r)
            db_session.add(r)            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            from notifications import student_request_receipt
            notification = student_request_receipt(u, r, original_skill_name)
            u.notifications.append(notification)
            db_session.add(notification)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            if not skill.tutors:
                return jsonify(dict={'no-active-tutors': True})

            # Tutors are currently not contacted when there is a request.
            from notifications import tutor_request_offer
            for tutor in r.requested_tutors:
                #Only if they are approved tutors
                if tutor.approved_by_admin:
                    tutor.incoming_requests_to_tutor.append(r)
                    notification = tutor_request_offer(u, tutor, r, skill_name)
                    db_session.add(notification)
                    tutor.notifications.append(notification)
            
            #send emails + create objects
            from emails import student_needs_help
            mandrill_result, tutor_email_dict = student_needs_help(u, r.requested_tutors, skill_name, r)
            for sent_email_dict in mandrill_result:
                tutor = tutor_email_dict[sent_email_dict['email']]
                email = Email(
                    tag='tutor-request', 
                    user_id=tutor.id, 
                    time_created=datetime.now(), 
                    mandrill_id = sent_email_dict['_id']
                    )
                db_session.add(email)
                tutor.emails.append(email)
                r.emails.append(email)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if ajax_json.get('verify-tutor'):
            try:
                user_id = session.get('user_id')
                user = User.query.get(user_id)
                user.feed_notif = user.feed_notif + 1
                user.verified_tutor = True
                already_has_notifications = False
                
                if user.notifications:
                    already_has_notifications = True

                from notifications import getting_started_tutor, getting_started_tutor_2
                notification1 = getting_started_tutor(user)
                notification2 = getting_started_tutor_2(user)
                db_session.add(notification1)
                db_session.add(notification2)
                user.notifications.append(notification1)
                user.notifications.append(notification2)
                db_session.commit()

                if already_has_notifications:
                    for n in user.notifications:
                        if n.a_id_name != 'getting-started' and n.a_id_name != 'getting-started-tutor':
                            n.time_created = datetime.now()

                db_session.commit()

                #increment feed counter
                #create fake notification
            except:
                db_session.rollback();

        return jsonify(dict=ajax_json)

@app.route('/logout/', methods=('GET', 'POST'))
def logout():
    if session.get('user_id'):
        session.pop("user_id")
    if session.get('tutor-signup'):
        session.pop('tutor-signup')
    if session.get('signup-start-user-id'):
        session.pop('signup-start-user-id')
    if session.get('signup-start'):
        session.pop('signup-start')
    if session.get('admin'):
        return redirect(url_for('admin'))
    flash('You have been logged out', 'info')
    return redirect(url_for("index"))

@app.route('/logout-admin/')
def admin_logout():
    if session.get('admin'):
        session.pop("admin")
    return redirect(url_for('index'))


@app.route('/login/', methods=('GET', 'POST'))
def login():
    if session.get('user_id'):
        flash("You are already logged in!")
        return redirect(url_for('index'))
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        if ajax_json['email'].lower() == 'testing@uguru.me' \
            and ajax_json['password'].lower() == 'launchuguru' and os.environ.get('TESTING'):
            session['testing-admin'] = True
            json['success'] = True                
            json['testing-admin'] = True
            return jsonify(json=json)

        if ajax_json['email'].lower() == 'admin@uguru.me' \
            and ajax_json['password'].lower() == 'launchuguru':
            session['admin'] = True
            users = User.query.order_by(desc(User.id)).all()
            pretty_dates = {}
            skills_dict = {}
            tutor_count = 0
            student_count = 0
            for u in users: 
                pretty_dates[u.id] = pretty_date(u.time_created)
                if u.skills:
                    result_string = ""
                    for s in u.skills:
                        result_string = result_string + s.name + " "
                    skills_dict[u.id] = result_string
                    tutor_count +=1 
                else:
                    student_count += 1
            json['admin'] = True
            return jsonify(json=json)

        email = ajax_json['email']
        password = md5(ajax_json['password']).hexdigest()
        query = User.query.filter_by(email=email, password=password).first()
        if query:
            user = query
            authenticate(user.id)
            json['success'] = True                
        else:
            json['failure'] = False
        return jsonify(json=json)
    if os.environ.get('PRODUCTION'):
        return redirect(url_for('index'))
    return render_template("login.html")

@app.route('/access/', methods=('GET','POST'))
def access():
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        access_code = ajax_json['access']
        access_codes = ['goslc50', 'gospc10', 'goess10','gohkn20', 'gobears30', 'golee', 'gojackie', \
        'gojared', 'gomichael','gosamir','gojonathan','gosaba','gorafi', 'godorms20', 'gopeace20'\
        ,'goess10']

        from app.static.data.random_codes import random_codes_array

        if access_code.lower() in access_codes or access_code.upper() in random_codes_array:
            json['success'] = True            
            session['referral'] = access_code.lower()
        else:
            json['failure'] = False
        return jsonify(json=json)

@app.route('/admin-access/', methods=('GET', 'POST'))
def admin_access():
    if request.method == "POST": 
        json = {}
        ajax_json = request.json
        user_id = ajax_json['user-id']
        if session.get('user_id'):
            session.pop('user_id')
        session['user_id'] = int(user_id)
        return jsonify(json=ajax_json)


@app.route('/tutorsignup1/', methods=('GET', 'POST'))
def tutorsignup1():
    form = SignupForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('tutorsignup1.html', form=form)

@app.route('/activity/', methods=('GET', 'POST'))
def activity():
    if not session.get('user_id'):
        return redirect(url_for('index'))
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    if user.verified_tutor and not is_tutor_verified(user):
        return redirect(url_for('settings'))
    request_dict = {}
    address_book = {}
    payment_dict = {}
    pretty_dates = {}
    pending_ratings_dict = {}
    outgoing_request_index = {}
    tutor_dict = {}

    urgency_dict = ['ASAP', 'Tomorrow', 'This week']

    from app.static.data.prices import prices_dict
    prices_reversed_dict = {v:k for k, v in prices_dict.items()}
    if user.outgoing_requests:
        index = 0
        for o_r in user.outgoing_requests:
            outgoing_request_index[o_r] = index
            index += 1
    if user.pending_ratings:
        rating = user.pending_ratings[0]
        student = User.query.get(rating.student_id)
        tutor = User.query.get(rating.tutor_id)
        pending_ratings_dict['student'] = student
        pending_ratings_dict['tutor'] = tutor
    for notification in user.notifications:
        if notification.request_tutor_id:
            tutor_dict[notification] = User.query.get(notification.request_tutor_id)
        pretty_dates[notification.id] = pretty_date(notification.time_created)
    for conversation in user.mailbox.conversations:
        if conversation.student_id != user.id:
            student = User.query.get(conversation.student_id)
            address_book[student.id] = \
                {'profile_url': student.profile_url, 'conversation_id' : conversation.id, 'student_name' : student.name.split(" ")[0]}
    for request in (user.outgoing_requests + user.incoming_requests_to_tutor + user.incoming_requests_from_tutors):
        student_id = request.student_id
        if user.skills and len(address_book.keys())>0:
            if address_book.get(student_id):
                    address_book[student_id]['request'] = request
        student = User.query.get(request.student_id)
        request_dict[request.id] = {'request':request,'student':student}
    for payment in user.payments:
        tutor_id = payment.tutor_id
        student_id = payment.student_id
        tutor = User.query.get(tutor_id)
        student = User.query.get(student_id)
        payment_dict[payment.id] = {'payment': payment, 'tutor_name':tutor.name.split(' ')[0],\
        'student_name': student.name.split(' ')[0]}
    return render_template('activity.html', key=stripe_keys['publishable_key'], address_book=address_book, \
        logged_in=session.get('user_id'), user=user, request_dict = request_dict, payment_dict = payment_dict,\
        pretty_dates = pretty_dates, urgency_dict=urgency_dict, tutor_dict=tutor_dict, pending_ratings_dict=pending_ratings_dict,\
        environment = get_environment(), prices_dict=prices_dict, prices_reversed_dict=prices_reversed_dict, session=session,\
        outgoing_request_index=outgoing_request_index)

@app.route('/tutor_offer/')
def tutor_offer():
    return render_template('tutor_offer.html')

@app.route('/messages/')
def messages():
    if not session.get('user_id'):
        return redirect(url_for('index'))
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    if user.verified_tutor and not is_tutor_verified(user):
        return redirect(url_for('settings'))
    pretty_dates = {}
    transactions = []
    for p in user.payments:
        if user.verified_tutor:
            transactions.append(User.query.get(p.student_id))
        else:
            transactions.append(User.query.get(p.tutor_id))
    for conversation in user.mailbox.conversations:
        for message in conversation.messages:
            pretty_dates[message.id] = pretty_date(message.write_time)
    
    conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated)
    return render_template('messages.html', user=user, pretty_dates=pretty_dates, environment = get_environment(), session=session, \
        transactions = transactions, conversations=conversations)

@app.route('/student_request/')
def student_request():
    return render_template('student_request.html')

@app.route('/rate/')
def rate():
    return render_template('rate.html')

@app.route('/bill/')
def bill():
    return render_template('bill.html')

@app.route('/request_payment/')
def request_payment():
    return render_template('request_payment.html')

@app.route('/credit_card/')
def credit_card():
    return render_template('credit_card.html')

@app.route('/conversation/')
def conversation():
    return render_template('conversation.html')

@app.route('/request_tutor/')
def request_tutor():
    return render_template('request_tutor.html')

@app.route('/student_signup/')
def student_signup():
    return render_template('student_signup.html')

@app.route('/tutor_signup/')
def tutor_signup():
    return render_template('tutor_signup.html')

@app.route('/tutorsignup2/')
def tutorsignup2():  
    return render_template('tutorsignup2.html')

@app.route('/howitworks/')
def howitworks():
    return render_template('howitworks.html')

@app.route('/settings/')
def settings():
    user_id = session.get('user_id')
    not_launched_flag = False
    if not user_id:
        return redirect(url_for('index'))
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    if user.verified_tutor and not is_tutor_verified(user):
        not_launched_flag = True
    from app.static.data.short_variations import short_variations_dict
    avg_rating = None
    num_ratings = None
    if user.tutor_ratings:
        total_rating_sum = 0
        num_ratings = 0
        for rating in user.tutor_ratings:
            if rating.tutor_rating:
                total_rating_sum += rating.tutor_rating
                num_ratings += 1
        if num_ratings:
            avg_rating = round((total_rating_sum/float(num_ratings))*2)/2
        else:
            avg_rating = 0
    return render_template('settings.html', logged_in=session.get('user_id'), user=user, \
        variations=short_variations_dict, not_launched_flag = not_launched_flag, \
        environment = get_environment(), session=session, avg_rating = avg_rating, num_ratings = num_ratings)

# @app.route('/tutor_accept/')
# def tutor_accept():
#     page_info = { 'student_name': 'Jaclyn', 'skill_name': 'CS61A'}
#     return render_template('tutor_accept.html', page_dict = page_info)

# @app.route('/student_accept/')
# def studentaccept():
#     return render_template('student_accept.html')

# @app.route('/ratingconfirm/')
# def ratingconfirm():
#     return render_template('ratingconfirm.html')

# @app.route('/rating_noshow/')
# def rating_noshow():
#     return render_template('rating_noshow.html')

# @app.route('/rating_stars/')
# def rating_stars():
#     return render_template('rating_stars.html')

# @app.route('/rating_gen/')
# def rating_gen():
#     return render_template('rating_gen.html')

# @app.route('/sorry/')
# def sorry():
#     return render_template('sorry.html')

@app.route('/test-500/', methods=['GET','POST'])
def test():
    return render_template('test-500.html')


def upload_file_to_amazon(filename, file):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_file(file)
    sml.set_acl('public-read')

def pretty_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    """
    from datetime import datetime
    now = datetime.now()
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time,datetime):
        diff = now - time 
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "just now"
        if second_diff < 60:
            return str(second_diff) + " seconds ago"
        if second_diff < 120:
            return  "a minute ago"
        if second_diff < 3600:
            return str( second_diff / 60 ) + " minutes ago"
        if second_diff < 7200:
            return "an hour ago"
        if second_diff < 86400:
            return str( second_diff / 3600 ) + " hours ago"
    if day_diff == 1:
        return "Yesterday"
    if day_diff < 7:
        return str(day_diff) + " days ago"
    if day_diff < 31:
        return str(day_diff/7) + " weeks ago"
    if day_diff < 365:
        return str(day_diff/30) + " months ago"
    return str(day_diff/365) + " years ago"


def is_tutor_verified(tutor):
    tutor_verified_flag = False
    for n in tutor.notifications:
        if n.a_id_name == 'getting-started':
            tutor_verified_flag = True
    return tutor_verified_flag


def authenticate(user_id):
    session['user_id'] = user_id

def generate_secret_code():
    import random 
    from random import randint 
    from app.static.data.animals import animal_list
    return random.choice(animal_list) + str(randint(1, 100))

####################
#  Error Handling  #
####################

if os.environ.get('PRODUCTION') or os.environ.get('TESTING'):
    @app.errorhandler(500)
    def internal_server(e):
        message = traceback.format_exc()
        print message
        from emails import error
        if session.get('user_id'):
            print session.get('user_id')
            user = User.query.get(session.get('user_id'))
            from pprint import pprint
            message += "\n\n" + str(pprint(vars(user)))
        error(message)
        return render_template('500.html'), 500

    @app.errorhandler(Exception)
    def catch_all(e):
        message = traceback.format_exc()
        print message
        from emails import error
        if session.get('user_id'):
            user = User.query.get(session.get('user_id'))
            from pprint import pprint
            message += "\n\n" + str(pprint(vars(user)))
        error(message)
        return render_template('500.html')

def update_profile_notifications(user):
    a_id_names = ['getting-started', 'getting-started-tutor']
    custom_tags = ['student-request-help', 'tutor-receive-payment', 'tutor-cashed-out']
    for user in User.query.all():
        if user.profile_url != '/static/img/default-photo.jpg':
            for n in user.notifications:
                if n.a_id_name in a_id_names or n.custom_tag in custom_tags:
                    if n.image_url != user.profile_url:
                        n.image_url = user.profile_url
                        print user.name, n.feed_message[0:30], " notification is now updated"
    return False

def get_environment():
    environment = "LOCAL"
    if os.environ.get('PRODUCTION'):
        environment = "PRODUCTION"
    if os.environ.get("TESTING"):
        environment = "TESTING"
    return environment