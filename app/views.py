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


stripe_keys = {
    'secret_key': os.environ['SECRET_KEY'],
    'publishable_key': os.environ['PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']
MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

@app.route('/', methods=['GET', 'POST'])
def index():
    if session.get('user_id'):
        return redirect(url_for('activity'))
    if (session.get('user_id') and user.skills and (not user.profile_url or not user.tutor_introduction)):
        return redirect(url_for('settings'))
    request_form = RequestForm()
    return render_template('new_index.html', forms=[request_form],
        logged_in=session.get('user_id'))

@app.route('/sneak/', methods=['GET', 'POST'])
def sneak():
    return render_template('new_index.html')

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

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        #if other profile data is being updated
        if request.json:
            ajax_json = request.json

        if ajax_json.get('intro'):
            user.tutor_introduction = ajax_json.get('intro')
        if ajax_json.get('price'):
            user.advertised_rate = ajax_json.get('price')
        if 'discover' in ajax_json:
            user.discoverability = ajax_json.get('discover')
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
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
            
            transfer = stripe.Transfer.create(
                amount=int(user.balance * 100), # amount in cents, again
                currency="usd",
                recipient=recipient.id
            )

            from notifications import tutor_cashed_out
            notification = tutor_cashed_out(user, user.balance)
            db_session.add(notification)

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
            rating.tutor_rating = ajax_json['num_stars']
            if 'additional_detail' in ajax_json:
                rating.tutor_rating_description
            
            student = User.query.get(rating.student_id)
            student.pending_ratings.append(rating)
            user.pending_ratings.remove(rating)

            from emails import student_rating_request
            student_rating_request(student, user.name.split(" ")[0])

            db_session.commit()

        if 'student-rating-tutor' in ajax_json:
            rating = user.pending_ratings[0]
            rating.student_rating = ajax_json['num_stars']
            
            if 'additional_detail' in ajax_json:
                rating.student_rating_description

            user.pending_ratings.remove(rating)
            db_session.commit()

    return jsonify(return_json=return_json)            

@app.route('/submit-payment/', methods=('GET', 'POST'))
def submit_payment():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'accept-payment' in ajax_json:
            payment_id = int(ajax_json.get('accept-payment'))
            payment = Payment.query.get(payment_id)
            total_amount = float(payment.time_amount * payment.tutor_rate)
            stripe_amount_cents = int(total_amount * 100.0)
            charge = stripe.Charge.create(
                amount = stripe_amount_cents,
                currency="usd",
                customer=user.customer_id,
                description="charge for receiving tutoring"
            )
            payment.stripe_charge_id = charge.id
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            student_id = payment.student_id
            student = User.query.get(student_id)
            tutor_id = payment.tutor_id
            tutor = User.query.get(tutor_id)

            tutor.balance = tutor.balance + float(float(stripe_amount_cents) / 100.0)

            #Add pending rating to student 
            for rating in tutor.pending_ratings:
                if rating.student_id == user.id:
                    student.pending_ratings.append(rating)

            from notifications import student_payment_approval, tutor_receive_payment
            tutor_notification = tutor_receive_payment(student, tutor, payment)
            student_notification = student_payment_approval(student, tutor, payment)
            tutor.notifications.append(tutor_notification)
            student.notifications.append(student_notification)
            db_session.add_all([tutor_notification, student_notification])
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'submit-payment' in ajax_json:
            conversation_id = ajax_json.get('submit-payment')
            hourly_rate = ajax_json.get('hourly-rate')
            total_time = ajax_json.get('total-time')
            amount = float(hourly_rate * total_time)

            conversation = Conversation.query.get(conversation_id)

            for _request in conversation.requests:
                if _request.connected_tutor_id == user_id and not _request.actual_hourly:
                    r = _request
                    student_id = _request.student_id
                    student = User.query.get(student_id)
                    if student.profile_url:
                        return_json['student-profile-url'] = student.profile_url
                    else: 
                        return_json['student-profile-url'] = '/static/img/default-photo.jpg'
            
            tutor = user
            payment = Payment(r)
            payment.tutor_rate = float(hourly_rate)
            payment.time_amount = float(total_time)
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

            return_json['student-name'] = user.name.split(" ")[0]

            from notifications import tutor_payment_request_receipt, student_payment_proposal
            tutor_notification = tutor_payment_request_receipt(student, tutor, payment)
            student_notification = student_payment_proposal(student, tutor, payment)
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
            tutor = user
            r = tutor.incoming_requests_to_tutor[incoming_request_num]
            r.committed_tutors.append(tutor)
            student = User.query.get(r.student_id)
            student.incoming_requests_from_tutors.append(r)
            db_session.commit()

            from notifications import tutor_request_accept, student_incoming_tutor_request
            tutor_notification = tutor_request_accept(student, tutor, r, skill_name, hourly_amount)
            student_notification = student_incoming_tutor_request(student, tutor, r, skill_name, hourly_amount)
            tutor.notifications.append(tutor_notification)
            student.notifications.append(student_notification)
            db_session.add_all([tutor_notification, student_notification])
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'student-accept' in ajax_json:
            hourly_amount = ajax_json.get('hourly-amount')
            skill_name = ajax_json.get('skill-name')
            notification_id = ajax_json.get('notification-id')
            student = user
            current_notification = student.notifications[notification_id]
            print current_notification.id
            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)
            request_id = current_notification.request_id
            r = Request.query.get(request_id)
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_id = tutor_id
            r.connected_tutor_hourly = current_notification.request_tutor_amount_hourly
            
            #create conversation between both
            conversation = Conversation(skill, tutor, student)
            conversation.requests.append(r)
            db_session.add(conversation)
            
            from notifications import student_match, tutor_match
            tutor_notification = tutor_match(student, tutor, r, skill_name, hourly_amount)
            student_notification = student_match(student, tutor, r, skill_name, hourly_amount)
            tutor.notifications.append(tutor_notification)
            student.notifications.append(student_notification)
            db_session.add_all([student_notification, tutor_notification])
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

            #check if skill is a course
            if courses_dict.get(skill_to_add):
                skill_to_add_id = courses_dict[skill_to_add]
                skill = Skill.query.get(skill_to_add_id)
                user.skills.append(skill)
            else: #not a course 
                course = Course(skill_to_add)
                db_session.add(course)
        if ajax_json.get('remove'):
            skill_to_remove = ajax_json.get('remove').lower()
            for skill in user.skills:
                if skill.name.lower() == skill_to_remove:
                    user.skills.remove(skill)
        try:
            db_session.commit()
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
                query = User.query.filter_by(email=ajax_json['email']).first()
                if query:
                    ajax_json['duplicate-email'] = True
                    return jsonify(dict=ajax_json)
                query = User.query.filter_by(phone_number=ajax_json['phone']).first()
                if query:
                    ajax_json['duplicate-phone'] = True
                    return jsonify(dict=ajax_json)
                
                u = User(
                    name = ajax_json['name'], 
                    password = md5(ajax_json['password']).hexdigest(),
                    email = ajax_json['email'],
                    phone_number = ajax_json['phone']
                )
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
                from notifications import getting_started
                notification = getting_started(u)
                u.notifications.append(notification)
                db_session.add_all([u, notification])
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
                frequency = ajax_json['frequency'],
                time_estimate = float(ajax_json['estimate'])
            )
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
            



        #Create a tutor for the first time
        if ajax_json.get('tutor-signup'):
            try:
                query = User.query.filter_by(email=ajax_json['email']).first()
                if query:
                    ajax_json['duplicate-email'] = True
                    return jsonify(dict=ajax_json)
                query = User.query.filter_by(phone_number=ajax_json['phone']).first()
                if query:
                    ajax_json['duplicate-phone'] = True
                    return jsonify(dict=ajax_json)
                u = User(
                    name = ajax_json['name'], 
                    password = md5(ajax_json['password']).hexdigest(),
                    email = ajax_json['email'],
                    phone_number = ajax_json['phone'],
                )

                from notifications import getting_started
                notification = getting_started(u)
                u.notifications.append(notification)
                db_session.add_all([u, notification])
                db_session.commit()
                u.settings_notif = u.settings_notif + 1
                u.verified_tutor = True
                m = Mailbox(u)
                db_session.add(m)
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            user_id = u.id
            authenticate(user_id)
            print "Account created!"
        return jsonify(dict=ajax_json)

@app.route('/logout/', methods=('GET', 'POST'))
def logout():
    session.pop("user_id")    
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
    return render_template("login.html", redirect_args=request.query_string)    

@app.route('/access/', methods=('GET','POST'))
def access():
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        access_code = ajax_json['access']
        if access_code.lower() == 'calslctutor':
            json['success'] = True                
        else:
            json['failure'] = False
        return jsonify(json=json)


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
    if (user.skills and (not user.profile_url or not user.tutor_introduction)):
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
    for request in (user.outgoing_requests + user.incoming_requests_to_tutor + user.incoming_requests_from_tutors):
        request_dict[request.id] = {'request':request, 'student':User.query.get(request.student_id)}
    for conversation in user.mailbox.conversations:
        if conversation.student_id != user.id:
            student = User.query.get(conversation.student_id)
            address_book[student.name.split(" ")[0]] = \
                {'profile_url': student.profile_url, 'conversation_id' : conversation.id}
    for payment in user.payments:
        tutor_id = payment.tutor_id
        student_id = payment.student_id
        tutor = User.query.get(tutor_id)
        student = User.query.get(student_id)
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
    if (user.skills and (not user.profile_url or not user.tutor_introduction)):
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
    return render_template('settings.html', logged_in=session.get('user_id'), user=user)

@app.route('/tutor_accept/')
def tutor_accept():
    page_info = { 'student_name': 'Jaclyn', 'skill_name': 'CS61A'}
    return render_template('tutor_accept.html', page_dict = page_info)

@app.route('/student_accept/')
def studentaccept():
    return render_template('student_accept.html')

@app.route('/ratingconfirm/')
def ratingconfirm():
    return render_template('ratingconfirm.html')

@app.route('/rating_noshow/')
def rating_noshow():
    return render_template('rating_noshow.html')

@app.route('/rating_stars/')
def rating_stars():
    return render_template('rating_stars.html')

@app.route('/rating_gen/')
def rating_gen():
    return render_template('rating_gen.html')

@app.route('/sorry/')
def sorry():
    return render_template('sorry.html')

def authenticate(user_id):
    session['user_id'] = user_id


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
