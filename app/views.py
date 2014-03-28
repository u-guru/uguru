from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, \
session, flash, redirect, url_for
from forms import SignupForm, RequestForm
from models import User, Request, Skill, Course, Notification, Mailbox, \
    Conversation, Message, Payment, Rating
from hashlib import md5
from datetime import datetime
import emails, boto, stripe, os
from sqlalchemy import desc
import json


stripe_keys = {
    'secret_key': os.environ['SECRET_KEY'],
    'publishable_key': os.environ['PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']
MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

@app.route('/', methods=['GET', 'POST'])
def index():
    if os.environ.get('TESTING') and not session.get('testing-admin'):
        return redirect(url_for('login'))
    tutor_signup_incomplete = False
    request_form = RequestForm()
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
        logged_in=session.get('user_id'), tutor_signup_incomplete=tutor_signup_incomplete)

@app.route('/sneak/', methods=['GET', 'POST'])
def sneak():
    return render_template('new_index.html')

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
        print status
        #find user
        user = User.query.filter_by(recipient_id=recipient_id).first()
        for n in reversed(user.notifications):
            print n.id
            if n.custom_tag == 'tutor-cashed-out':
                if status == 'failed':
                    status = "Your bank account transfer did not go through. Please contact support@uguru.me for quick support."
                n.status = status
                n.skill_name = bank_account_name
                break;
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
    return "OK"


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
            amazon_url = "https://s3.amazonaws.com/uguruprof/"+destination_filename
            user.profile_url = amazon_url

            if not user.skills:
                user.settings_notif = 0

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
        users = User.query.order_by(desc(User.id)).all()
        pretty_dates = {}
        skills_dict = {}
        tutor_count = 0
        student_count = 0
        skills_array = []
        for u in users: 
            pretty_dates[u.id] = pretty_date(u.time_created)
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
        print skills_counter
        skills_counter = sorted(skills_counter.iteritems(), key=operator.itemgetter(1))
        return render_template('admin.html', users=users, pretty_dates = pretty_dates, \
            skills_dict = skills_dict, tutor_count = tutor_count, student_count=student_count, skills_counter = skills_counter)
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

        user.notifications.append(notification)

        user.balance = 0

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
            if 'additional_detail' in ajax_json:
                rating.student_rating_description
            
            user.pending_ratings.remove(rating)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'student-rating-tutor' in ajax_json:
            rating = user.pending_ratings[0]
            rating.tutor_rating = ajax_json['num_stars']
            
            if 'additional_detail' in ajax_json:
                rating.tutor_rating_description

            user.pending_ratings.remove(rating)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

    return jsonify(return_json=return_json)            

@app.route('/submit-payment/', methods=('GET', 'POST'))
def submit_payment():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'submit-payment' in ajax_json:
            conversation_id = ajax_json.get('submit-payment')
            total_time = ajax_json.get('total-time')

            conversation = Conversation.query.get(conversation_id)

            for _request in conversation.requests:
                if _request.connected_tutor_id == user_id and not _request.actual_hourly:
                    r = _request
                    student_id = _request.student_id
                    student = User.query.get(student_id)
                    return_json['student-profile-url'] = student.profile_url

            if r.student_secret_code != ajax_json.get('secret-code').lower():
                return_json['secret-code'] = False
                return jsonify(return_json=return_json)

            return_json['secret-code'] = True
            total_amount = round((r.connected_tutor_hourly / 0.8) * float(total_time))
            stripe_amount_cents = int(total_amount * 100.0)

            payment = Payment(r)
            payment.time_amount = float(total_time)
            payment.tutor_rate = r.connected_tutor_hourly

            tutor = user
            student_id = payment.student_id
            student = User.query.get(student_id)

            charge = stripe.Charge.create(
                amount = stripe_amount_cents,
                currency="usd",
                customer=student.customer_id,
                description="charge for receiving tutoring"
            )

            amount_charged = float(stripe_amount_cents / 100)
            

            db_session.add(payment)

            tutor.payments.append(payment)
            student.payments.append(payment)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            r.payment_id = payment.id
            rating = Rating(r.id)
            tutor.pending_ratings.append(rating)
            db_session.add(rating)
            db_session.commit()

            return_json['student-name'] = student.name.split(" ")[0]

            amount_made = int(round(r.connected_tutor_hourly * float(total_time)))

            tutor.balance = tutor.balance + int(round(r.connected_tutor_hourly * float(total_time)))

            #Add pending rating to student 
            for rating in tutor.pending_ratings:
                if rating.student_id == student.id:
                    student.pending_ratings.append(rating)

            from notifications import student_payment_approval, tutor_receive_payment
            tutor_notification = tutor_receive_payment(student, tutor, payment, amount_made)
            student_notification = student_payment_approval(student, tutor, payment, amount_charged)
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

        if 'update-message' in ajax_json:
            conversation_num = ajax_json.get('conversation-num')
            conversation = user.mailbox.conversations[conversation_num]
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
            conversation = user.mailbox.conversations[conversation_num]
            sender_id = user.id
            if conversation.guru_id == user.id:
                receiver_id = conversation.student_id
                receiver = User.query.get(receiver_id)
            else:
                receiver_id = conversation.guru_id
                receiver = User.query.get(receiver_id)

            message = Message(message_contents, conversation, user, receiver)
            db_session.add(message)
            receiver.msg_notif += 1
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
            incoming_request_num = ajax_json.get('tutor-accept')
            hourly_amount = ajax_json.get('hourly-amount')
            skill_name = ajax_json.get('skill-name')
            notif_num = ajax_json.get('notif-num')
            tutor = user
            r = tutor.incoming_requests_to_tutor[incoming_request_num]
            r.committed_tutors.append(tutor)
            student = User.query.get(r.student_id)
            student.incoming_requests_from_tutors.append(r)
            db_session.commit()

            current_notification = user.notifications[notif_num]
            current_notification.feed_message = 'You accepted ' + student.name.split(' ')[0] + \
                "'s request for " + skill_name.upper() + "."
            current_notification.feed_message_subtitle = "Click here to see next steps."
            current_notification.custom = 'tutor-accept-request'
            
            if ajax_json.get('price-change'):
                current_notification.request_tutor_amount_hourly = ajax_json.get('hourly-amount')
            
            user.feed_notif += 1
            current_notification.time_read = None

            from notifications import tutor_request_accept, student_incoming_tutor_request
            student_notification = student_incoming_tutor_request(student, tutor, r, skill_name, hourly_amount)
            student.notifications.append(student_notification)
            db_session.add(student_notification)
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'tutor-reject' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            request_num = ajax_json.get('request-num')
            _request = Request.query.get(request_num)
            current_notification = user.notifications[notif_num]
            print _request
            # user.incoming_requests_to_tutor.remove(_request)
            student_name = User.query.get(_request.student_id).name.split(" ")[0]

            current_notification.feed_message = 'You rejected ' + student_name + "'s request for " +\
                current_notification.skill_name + "."
            current_notification.feed_message_subtitle = None
            current_notification.custom = 'tutor-reject'

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

        if 'cancel-request' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            student_notification = user.notifications[notif_num]
            request_id = student_notification.request_id
            _request = Request.query.get(request_id)
            _request.connected_tutor_id = user.id
            student_notification.feed_message = 'You canceled a request for ' + student_notification.skill_name.upper() + '.'
            student_notification.feed_message_subtitle = None

            from emails import student_canceled_request
            for tutor in _request.committed_tutors:
                for n in tutor.notifications:
                    if n.request_id == _request.id:
                        tutor_notification = n
                tutor.feed_notif += 1
                tutor_notification.time_read = None
                tutor_notification.feed_message_subtitle = 'Click here to see the status of your accepted request'
                student_canceled_request(user, student_notification.skill_name, tutor)
                print "Email sent to " + tutor.name

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

        if 'student-accept' in ajax_json:
            notification_id = ajax_json.get('notification-id')
            student = user
            current_notification = student.notifications[notification_id]
            skill_name = current_notification.skill_name
            
            print current_notification.id

            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)

            #Modify student notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name + " tutor."
            current_notification.feed_message_subtitle = 'Click here to see next steps!'
            current_notification.custom = 'student-accept-request'
            user.feed_notif += 1
            current_notification.time_read = None

            #Update request
            from app.static.data.animals import animal_list
            import random 
            request_id = current_notification.request_id
            r = Request.query.get(request_id)
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_id = tutor_id
            r.connected_tutor_hourly = current_notification.request_tutor_amount_hourly
            r.student_secret_code = random.choice(animal_list)
            
            #Modify tutor notification
            for n in tutor.notifications:
                if n.request_id == r.id:
                    tutor_notification = n
            tutor_notification.feed_message = "<b>You</b> have been matched with " + user.name.split(" ")[0] + " for " + skill_name + "."
            tutor_notification.feed_message_subtitle = 'Click here to see next steps!'
            tutor_notification.custom = 'tutor-is-matched'
            tutor.feed_notif += 1
            tutor_notification.time_read = None
            from emails import tutor_is_matched
            tutor_is_matched(tutor, skill_name, user.name.split(" ")[0])


            #create conversation between both
            conversation = Conversation(skill, tutor, user)
            conversation.requests.append(r)
            db_session.add(conversation)

            #create message notifications
            tutor.msg_notif += 1
            student.msg_notif += 1

            #let other committed tutors now that they have been rejected
            from emails import student_chose_another_tutor
            for tutor in r.committed_tutors:
                if r.connected_tutor_id != tutor.id:
                    for n in tutor.notifications:
                        if n.request_id == r.id:
                            tutor_notification = n
                    tutor.feed_notif += 1
                    tutor_notification.time_read = None
                    tutor_notification.feed_message_subtitle = 'Click here to see the status of your accepted request'
                    student_chose_another_tutor(user, current_notification.skill_name, tutor)
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
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'update-feed-count' in ajax_json:
            notification = user.notifications[ajax_json['notif_num']]
            notification.time_read = datetime.now()
            user.feed_notif = user.feed_notif - 1
            db_session.commit();

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
            if session.get('tutor-signup'):
                session.pop('tutor-signup')

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
            skill_to_remove = short_variations_reverse_dict[ajax_json.get('remove')]
            print skill_to_remove
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
        
        #Create user for first time experiences
        if ajax_json.get('student-signup'):
            try: 
                if 'TESTING' not in os.environ:
                    query = User.query.filter_by(email=ajax_json['email']).first()
                    if query:
                        ajax_json['duplicate-email'] = True
                        return jsonify(dict=ajax_json)
                    query = User.query.filter_by(phone_number=ajax_json['phone']).first()
                    if query and ajax_json['phone'] != '':
                        ajax_json['duplicate-phone'] = True
                        return jsonify(dict=ajax_json)
                u = User(
                    name = ajax_json['name'], 
                    password = md5(ajax_json['password']).hexdigest(),
                    email = ajax_json['email'],
                    phone_number = ajax_json['phone']
                )

                if ajax_json['phone'] == '':
                    u.phone_number = None;

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
            user_id = u.id
            authenticate(user_id)
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

        #Create a request
        if ajax_json.get('student-request'):
            user_id = session['user_id']
            from app.static.data.variations import courses_dict
            skill_name = ajax_json['skill'].lower()
            skill_id = courses_dict[skill_name]
            u = User.query.get(user_id)
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
            notification = student_request_receipt(u, r, skill_name)
            u.notifications.append(notification)
            db_session.add(notification)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            # Tutors are currently not contacted when there is a request.
            from notifications import tutor_request_offer
            for tutor in r.requested_tutors:
                tutor.incoming_requests_to_tutor.append(r)
                notification = tutor_request_offer(u, tutor, r, skill_name)
                db_session.add(notification)
                tutor.notifications.append(notification)
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

                if len(user.notifications) < 2: 
                    from notifications import getting_started_tutor, getting_started_tutor_2
                    notification1 = getting_started_tutor(user)
                    notification2 = getting_started_tutor_2(user)
                    db_session.add(notification1)
                    db_session.add(notification2)
                    user.notifications.append(notification1)
                    user.notifications.append(notification2)
                    db_session.commit()
                #increment feed counter
                #create fake notification
            except:
                db_session.rollback();

        #Create a tutor for the first time
        if ajax_json.get('tutor-signup'):
            try:
                if 'TESTING' not in os.environ:
                    query = User.query.filter_by(email=ajax_json['email']).first()
                    if query:
                        ajax_json['duplicate-email'] = True
                        return jsonify(dict=ajax_json)
                    query = User.query.filter_by(phone_number=ajax_json['phone']).first()
                    if query and ajax_json['phone'] != '':
                        ajax_json['duplicate-phone'] = True
                        return jsonify(dict=ajax_json)
                u = User(
                    name = ajax_json['name'], 
                    password = md5(ajax_json['password']).hexdigest(),
                    email = ajax_json['email'],
                    phone_number = ajax_json['phone'],
                )

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
                m = Mailbox(u)
                db_session.add(m)
                db_session.commit()
                session['tutor-signup'] = True;
            except:
                db_session.rollback()
                raise 
            
            user_id = u.id
            authenticate(user_id)
            print "Account created!"
        return jsonify(dict=ajax_json)

@app.route('/logout/', methods=('GET', 'POST'))
def logout():
    if session.get('user_id'):
        session.pop("user_id")
    if session.get('tutor-signup'):
        session.pop('tutor-signup')
    if session.get('admin'):
        return redirect(url_for('admin'))
    flash('You have been logged out', 'info')
    return redirect(url_for("index"))


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
        if access_code.lower() in access_codes:
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
    if user.skills and len(user.notifications) < 2:
        return redirect(url_for('settings'))
    request_dict = {}
    address_book = {}
    payment_dict = {}
    pretty_dates = {}
    pending_ratings_dict = {}
    tutor_dict = {}
    urgency_dict = ['ASAP', 'Tomorrow', 'This week']
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
        # request = Request.query.get(payment.request_id)
        payment_dict[payment.id] = {'payment': payment, 'tutor_name':tutor.name.split(' ')[0],\
        'student_name': student.name.split(' ')[0]}
    return render_template('activity.html', key=stripe_keys['publishable_key'], address_book=address_book, \
        logged_in=session.get('user_id'), user=user, request_dict = request_dict, payment_dict = payment_dict,\
        pretty_dates = pretty_dates, urgency_dict=urgency_dict, tutor_dict=tutor_dict, pending_ratings_dict=pending_ratings_dict)

@app.route('/tutor_offer/')
def tutor_offer():
    return render_template('tutor_offer.html')

@app.route('/messages/')
def messages():
    if not session.get('user_id'):
        return redirect(url_for('index'))
    user_id = session['user_id']
    user = User.query.get(user_id)
    if user.skills and len(user.notifications) < 2:
        return redirect(url_for('settings'))
    pretty_dates = {}
    for conversation in user.mailbox.conversations:
        for message in conversation.messages:
            pretty_dates[message.id] = pretty_date(message.write_time)
    return render_template('messages.html', user=user, pretty_dates=pretty_dates)

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
    if not user_id:
        return redirect(url_for('index'))
    user = User.query.get(user_id)
    from app.static.data.short_variations import short_variations_dict
    return render_template('settings.html', logged_in=session.get('user_id'), user=user, variations=short_variations_dict)

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


####################
#  Error Handling  #
####################

if os.environ.get('PRODUCTION') or os.environ.get('TESTING'):
    @app.errorhandler(500)
    def internal_server(e):
        from emails import error
        error(traceback.format_exc())
        return render_template('500.html'), 500

    @app.errorhandler(Exception)
    def catch_all(e):
        from emails import error
        error(traceback.format_exc())
        return render_template('500.html')
