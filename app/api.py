from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, \
session, flash, redirect, url_for
from forms import SignupForm, RequestForm
from models import User, Request, Skill, Course, Notification, Mailbox, \
    Conversation, Message, Payment, Rating, Email, Week, Range
from hashlib import md5
from datetime import datetime, timedelta
import emails, boto, stripe, os
from sqlalchemy import desc
import json, traceback
import mandrill
from twilio import twiml
from mixpanel import Mixpanel
import random
from apscheduler.scheduler import Scheduler
import views, time
from apns import APNs, Frame, Payload

cert_path = os.path.join(os.path.dirname(__file__), 'uguru-cert.pem')
key_path = os.path.join(os.path.dirname(__file__), 'uguru-key.pem')
apns = APNs(use_sandbox=True, cert_file=cert_path, key_file=key_path)


@app.route('/api/<arg>', methods=['GET', 'POST', 'PUT'], defaults={'_id': None})
@app.route('/api/<arg>/<_id>')
def api(arg, _id):
    # Cam doesn't use this shit
    return_json = {}
    ajax_json = request.json

    if arg == 'sign_up' and request.method == 'POST': 

        email = request.json.get("email")
        password = request.json.get("password")
        phone_number = email
        name = request.json.get("name")
        
        new_user, mailbox = create_user(email, password, phone_number, name)

        #Generate new notifications for them
        from notifications import getting_started_student, getting_started_student_tip
        notification = getting_started_student(new_user)
        notification2 = getting_started_student_tip(new_user)
        new_user.notifications.append(notification)
        new_user.notifications.append(notification2)
    
        try:
            db_session.add_all([new_user, mailbox, notification, notification2])
            db_session.commit()
        except:
            db_session.rollback()
            raise
            # return errors(["Email already in use"])

        response = {"user":{
                            "server_id": new_user.id,
                            "email": new_user.email,
                            "name": new_user.name,
                            "auth_token": new_user.auth_token
                            }
                    }

        return jsonify(response)

    # sign_in logic
    if arg == 'sign_in' and request.method == 'POST':
        email = request.json.get("email")
        
        if request.json.get('password'):
            password = md5(request.json.get("password")).hexdigest()

        pwd_flag = request.json.get('no-pass')

    
        if pwd_flag:
            user = User.query.filter_by(email=email).first()
        else:
            user = User.query.filter_by(email=email).first()

        if user:
            user.auth_token = "%032x" % random.getrandbits(128);
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                return errors(["Invalid username or password"])

            response = {"user":{
                                "server_id": user.id,
                                "email": user.email,
                                "name": user.name,
                                "auth_token": user.auth_token
                                }
            }

            return jsonify(response)
        return errors(["User or password were not correct"])


    if arg =='apply_guru' and request.method == 'POST':
        user = getUser()
        
        print request.json
        user.school_email = request.json.get('school-email')
        user.major = request.json.get('major')
        user.qualifications = request.json.get('experience')
        user.tutor_introduction = user.qualifications
        user.year = request.json.get('year')
        user.slc_tutor = request.json.get('slc-tutor')
        user.la_tutor = request.json.get('la-tutor')
        user.res_tutor = request.json.get('res-tutor')
        user.ta_tutor = request.json.get('ta-tutor')
        user.previous_tutor = request.json.get('previous-tutor')
        user.approved_by_admin = True
        user.verified_tutor = True

        courses = request.json.get('courses')

        #Process text courses
        from app.static.data.variations import courses_dict

        for course_txt in courses:
            skill_to_add_id = courses_dict[course_txt.lower()]
            skill = Skill.query.get(skill_to_add_id)
            db_session.add(skill)
            user.skills.append(skill)
        
        try:
            db_session.commit()
        except:
            db_session.rollback()
            return errors(['Something went wrong...'])

        user = User.query.get(user.id)
        response = {"user": user.__dict__}

        return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

    if arg =='stripe_token' and request.method == 'POST':
        user = getUser()
        if user:
            user_token = request.json.get('stripe-token')
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

            response = {"user": user.__dict__}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

    if arg == 'notifications' and request.method == 'GET' and _id == None:
        user = getUser()
        if user:
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created, reverse=True)
            user_notifications_arr = []
            # user_notifications_arr = [n.__dict__  for n in user_notifications]
            tutor_tags = ['tutor-request-offer', 'getting-started-tutor', 'tutor-receive-payment', 'tutor-cashed-out']
            student_tags = ['student-request-help', 'student-payment-approval', 'student-incoming-offer']

            for n in user_notifications:
                n_dict = sanitize_dict(n.__dict__)
                if n.custom_tag in tutor_tags:
                    n_dict['role'] = 'guru'
                else:
                    n_dict['role'] = 'student'

                if n.request_id:
                    r = Request.query.get(n.request_id)
                    if r.student_id == r.connected_tutor_id:
                        n_dict['status'] = 'canceled'
                    if user in r.requested_tutors and r.connected_tutor_id and user.id != r.connected_tutor_id:
                        n_dict['status'] = 'taken'
                    if r.connected_tutor_id == None:
                        n_dict['status'] = 'active'

                # n_detail['request'] = r.__dict__
                # n_detail['request']['server_id'] = n_detail['request'].pop('id')
                if n.payment_id:
                    p = Payment.query.get(n.payment_id)
                    n_dict['status'] = 'active'
                    if n.time_read:
                        n_dict['status'] = 'inactive'

                n_dict['feed_message'] = n_dict['feed_message'].replace('<b>', '').replace('</b>', '')
                if n_dict.get('feed_message_subtitle'):
                    n_dict.pop('feed_message_subtitle')
                if n_dict.get('id'):
                    n_dict['server_id'] = n_dict.pop('id') 

                user_notifications_arr.append(n_dict)

            response = {"notifications": user_notifications_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'read-notification' and _id != None and request.method == 'PUT':
        user = getUser()
        if user:
            n = Notification.query.get(_id)
            n.time_read = datetime.now()
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            response = {'notification': n.__dict__}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg =='conversations' and _id == None and request.method == 'GET':
        user = getUser()

        if user:
            conversations_arr = []
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            for c in conversations:
                if c.guru_id == user.id:
                    image_url = c.student.profile_url
                    name = c.student.name
                else:
                    image_url = c.guru.profile_url
                    name = c.guru.name
                if c.messages: 
                    last_message = c.messages[-1]
                    last_message_contents = last_message.contents
                    last_message_write_time = last_message.write_time
                    message_read = c.is_read
                else: 
                    last_message_contents = None
                    last_message_write_time = None
                    message_read = False


                conversations_arr.append({
                        'server_id': c.id,
                        'image_url': image_url,
                        'last_message': last_message_contents,
                        'last_message_time': last_message_write_time,
                        'name': name,
                        'read': message_read
                    })
            response = {'conversations': conversations_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='conversations' and _id != None and request.method == 'GET':
        user = getUser()

        if user:
            conversation = Conversation.query.get(_id)
            messages_arr = []
            conversation_messages = sorted(conversation.messages, key=lambda m:m.write_time)
            for m in conversation_messages:
                if conversation.guru_id == user.id:
                    receiver_id = conversation.student_id
                    receiver = User.query.get(receiver_id)
                else:
                    receiver_id = conversation.guru_id
                    receiver = User.query.get(receiver_id)
                messages_arr.append({
                        'server_id': m.id,
                        'contents': m.contents,
                        'sender_name': m.sender.name.split(" ")[0],
                        'sender_server_id': m.sender.id,
                        'receiver_name': receiver.name.split(" ")[0],
                        'receiver_server_id': receiver_id,
                        'write_time': m.write_time
                    })
            response = {'conversation_server_id': conversation.id,
                        'conversation_meeting_location': conversation.requests[0].location,
                        'conversation_meeting_time': None,
                        'messages': messages_arr }
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='send_message' and _id == None and request.method == 'POST':
        user = getUser()
        if user:
            message_contents = ajax_json.get('contents')
            conversation_id = ajax_json.get('conversation_id')
            conversation = Conversation.query.get(conversation_id)
            sender_id = user.id
            if conversation.guru_id == user.id:
                receiver_id = conversation.student_id
                receiver = User.query.get(receiver_id)
            else:
                receiver_id = conversation.guru_id
                receiver = User.query.get(receiver_id)

            if receiver.apn_token:
                apn_message = receiver.name.split(" ")[0] + ' has sent you a message'
                send_apn(apn_message, receiver.apn_token)
                
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

            message = Message.query.get(message.id)
            response = {'message': sanitize_dict(message.__dict__)}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(['Invalid Token'])


    if arg =='billing-contacts' and request.method == 'GET':
        user = getUser()
        billing_contacts_arr = []
        if user:
            from app.static.data.short_variations import short_variations_dict
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            for conversation in conversations:
                if conversation.student_id != user.id:
                    student = User.query.get(conversation.student_id)
                    print student.customer_id
                    r = conversation.requests[0]
                    hourly_rate = r.student_estimated_hour
                    profile_url = student.profile_url
                    skill = Skill.query.get(r.skill_id)
                    skill_name = short_variations_dict[skill.name]
                    billing_contacts_arr.append({
                            'student-name': student.name.split(" ")[0],
                            'student-profile': profile_url,
                            'hourly-rate': hourly_rate, 
                            'course': skill_name,
                            'time-estimate': r.time_estimate,
                            'request-id': r.id
                        })

            response = {'billing-contacts': billing_contacts_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='bill-student' and request.method == 'POST':
        user = getUser()
        pending_ratings_dict = {}
        if user:
            request_id = request.json.get('request_id')
            print request.json
            r = Request.query.get(request_id)
            r.actual_time = float(request.json.get('time_estimate'))
            r.actual_hourly = request.json.get('hourly_amount')
            total_amount = float(request.json.get('time_estimate')) * request.json.get('hourly_amount')

            payment = Payment(r)

            stripe_amount_cents = int(total_amount * 100)
            student = User.query.get(r.student_id)

            try: 
                charge = stripe.Charge.create(
                    amount = stripe_amount_cents,
                    currency="usd",
                    customer=student.customer_id,
                    description="charge for receiving tutoring"
                )
            except stripe.error.InvalidRequestError, e:
                return errors(["Sorry! The student's card has been declined. Please kindly ask them to update their information"])

            payment.stripe_charge_id = charge['id']

            db_session.add(payment)

            user.payments.append(payment)
            student.payments.append(payment)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            r.payment_id = payment.id
            rating = Rating(r.id)            
            user.pending_ratings.append(rating)
            student.pending_ratings.append(rating)
            db_session.add(rating)

            user.balance = user.balance + total_amount
            user.total_earned = user.total_earned + total_amount

            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[Skill.query.get(r.skill_id).name]

            from notifications import student_payment_approval, tutor_receive_payment
            tutor_notification = tutor_receive_payment(student, user, payment, total_amount)
            student_notification = student_payment_approval(student, user, payment, total_amount, charge['id'], skill_name, False)
            user.notifications.append(tutor_notification)
            student.notifications.append(student_notification)
            db_session.add_all([tutor_notification, student_notification])
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 


            pending_ratings_dict = {
                    'rating_server_id' : rating.id,
                    'student_name' : student.name.split(" ")[0],
                    'student_profile' : student.profile_url,
                    'student_server_id': student.id, 
                    'tutor_name' : user.name.split(" ")[0],
                    'tutor_profile': user.profile_url,
                    'tutor_server_id': user.id, 
                }
            response = {'bill_student': {'pending_ratings': pending_ratings_dict } }
            print response
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])


    if arg == 'notifications' and _id != None and request.method == 'GET':
        user = getUser()
        if user:
            n_detail = {}
            n = Notification.query.get(_id)
            if n.custom and n.custom == 'tutor-accept-request':
                n_detail['type'] = n.custom
            elif n.custom and n.custom =='student-accept-request':
                n_detail['type'] = 'student-match'
            elif n.custom and n.custom =='tutor-is-matched':
                n_detail['type'] = 'tutor-match'
            else:
                n_detail['type'] =  n.custom_tag

            if n.request_id:
                r = Request.query.get(n.request_id)
                
                temp_availability = r.weekly_availability
                if temp_availability:
                    n_detail['student-calendar'] = {
                            'time_ranges': process_back_to_original_form(get_student_time_ranges(temp_availability, 0))
                        }
                    if n.request_tutor_id:
                        n_detail['tutor-calendar'] = {
                            'time_ranges': process_back_to_original_form(get_student_time_ranges(temp_availability, n.request_tutor_id))
                        }
                r = Request.query.get(n.request_id)

                #View Calendar
                n_detail['request'] = sanitize_dict(r.__dict__)

            if n.payment_id:
                p = Request.query.get(n.payment_id)
                n_detail['payment'] = sanitize_dict(p.__dict__)

            n_detail['notification'] = sanitize_dict(n.__dict__)
            n_detail['notification']['feed_message'] = n_detail['notification']['feed_message'].replace('<b>', '').replace('</b>', '')
            if n_detail['notification'].get('feed_message_subtitle'):
                n_detail['notification'].pop('feed_message_subtitle')

            response = n_detail
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])
    
    if arg == 'rating' and request.method == 'PUT':
        user = getUser()
        if user:
            tutor = User.query.get(request.json.get('tutor_server_id'))
            student = User.query.get(request.json.get('student_server_id'))
            
            print request.json

            if request.json.get('tutor_rating_student'):
                rating = tutor.pending_ratings[0]
                rating.student_rating = request.json.get('star_rating')

                if request.json.get('rating_description'):
                    rating.student_rating_description = request.json.get('rating_description')

                tutor.pending_ratings.remove(rating)
                student.student_ratings.append(rating)
            else:
                rating = student.pending_ratings[0]
                rating.tutor_rating = request.json.get('star_rating')

                if request.json.get('rating_description'):
                    rating.tutor_rating_description = request.json.get('rating_description')

                student.pending_ratings.remove(rating)
                tutor.student_ratings.append(rating)


            try:
                db_session.commit()
                db_session.close()
            except:
                db_session.rollback()
                raise 

            response = {'rating': {'success':True}}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])


    if arg == 'user' and request.method == 'GET':
        user = getUser()
        if user:
            response = user_dict_in_proper_format(user)
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'user' and request.method == 'PUT':
        user = getUser()
        if user:
            print request.json
            user_response_dict = {}
            if request.json.get('apn_token'):
                user.apn_token = request.json.get('apn_token')
            if request.json.get('stripe-card-token'):
                create_stripe_customer(request.json.get('stripe-card-token'), user)
                user_response_dict['customer_id'] = user.customer_id
                user_response_dict['customer_last4'] = user.customer_last4
            if request.json.get('password'):
                user.password = md5(request.json.get('password')).hexdigest()
            if request.json.get('major'):
                user.major = request.json.get('major')
            if request.json.get('email'):
                user.email = request.json.get('email')
            if request.json.get('last_active'):
                user.last_active = datetime.now()
            if 'ta_tutor' in request.json:
                user.ta_tutor = request.json.get('ta_tutor')
            if request.json.get('auth_token'):
                user.auth_token = request.json.get('auth_token')
            if 'la_tutor' in request.json:
                user.la_tutor = request.json.get('la_tutor')
            if 'hkn_tutor' in request.json:
                user.hkn_tutor = request.json.get('hkn_tutor')
            if 'res_tutor' in request.json:
                user.res_tutor = request.json.get('res_tutor')
            if 'slc_tutor' in request.json:
                user.slc_tutor = request.json.get('slc_tutor')
            if request.json.get('fb_account'):
                user.fb_account = request.json.get('fb_account')
            if request.json.get('secret_code'):
                user.secret_code = request.json.get('secret_code')
            if request.json.get('profile_url'):
                user.profile_url = request.json.get('profile_url')
            if request.json.get('verified_tutor'):
                user.verified_tutor = request.json.get('verified_tutor')
            if 'email_notification' in request.json:
                user.email_notification = request.json.get('email_notification')
            if 'push_notification' in request.json:
                user.push_notification = request.json.get('push_notification')
            if request.json.get('total_earned'):
                user.total_earned = request.json.get('total_earned')
            if request.json.get('recipient_id'):
                user.recipient_id = request.json.get('recipient_id')
            if request.json.get('customer_id'):
                user.customer_id = request.json.get('customer_id')
            if request.json.get('customer_last4'):
                user.customer_last4 = request.json.get('customer_last4')
            if request.json.get('previous_tutor'):
                user.previous_tutor = request.json.get('previous_tutor')
            if request.json.get('tutor_introduction'):
                user.tutor_introduction = request.json.get('tutor_introduction')
            if request.json.get('balance'):
                user.balance = request.json.get('balance')
            if request.json.get('feed_notif'):
                user.feed_notif = request.json.get('feed_notif')
            if request.json.get('year'):
                user.year = request.json.get('year')
            if request.json.get('settings_notif'):
                user.settings_notif = request.json.get('settings_notif')
            if request.json.get('msg_notif'):
                user.msg_notif = request.json.get('msg_notif')
            if request.json.get('name'):
                user.name = request.json.get('name')

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            user = User.query.get(user.id)

            if user_response_dict:
                response = {'user': user_response_dict}
            else:
                response = user_dict_in_proper_format(user)
            
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg =='tutor_accept' and request.method =='PUT':
        user = getUser()
        if user:
            print request.json

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            request_id = request.json.get('request_id')
            hourly_amount = request.json.get('hourly_amount')
            extra_details = request.json.get('tutor_message')
            weekly_availability = request.json.get('calendar')
            notification_id = request.json.get('notif_id')
            current_notification = Notification.query.get(notification_id)

            tutor = user
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)

            r = Request.query.get(request_id)   
            r.committed_tutors.append(tutor)
            
            tutor_week_times = Week(owner=tutor.id)
            db_session.add(tutor_week_times)
            i = 0
            for day in weekly_availability:
                for time_range in day:
                    temp_range = Range(start_time=time_range[0], end_time=time_range[1], week_day=i)
                    db_session.add(temp_range)
                    tutor_week_times.ranges.append(temp_range)
                i = i + 1

            r.weekly_availability.append(tutor_week_times)


            skill_id = r.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name].upper()

            student = User.query.get(r.student_id)
            student.incoming_requests_from_tutors.append(r)
            # db_session.commit()


            if student.apn_token:
                apn_message =tutor.name.split(" ")[0] + ', a ' + skill_name + ' tutor, wants to help!'
                send_apn(apn_message, student.apn_token)

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
            extra_detail = ajax_json.get('tutor_message')
            student_notification = student_incoming_tutor_request(student, tutor, r, original_skill_name, hourly_amount, extra_detail)
            student.notifications.append(student_notification)
            db_session.add(student_notification)
            
            student_weekly_availability = get_time_ranges(r.weekly_availability, 0)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            r = Request.query.get(r.id)
            current_notification = Notification.query.get(current_notification.id)
            response = {"request": r.__dict__,
                        "notifications": [current_notification.__dict__],
                        # "tutor-calendar": weekly_availability,
                        # "student-calendar": student_weekly_availability
                        }
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])




    if arg =='cancel_request' and request.method =='POST':
        user = getUser()
        if user:
            print request.json
            notif_id = request.json.get('notif-id')
            request_id = request.json.get('request-id')
            student_notification = Notification.query.get(notif_id)
            _request = Request.query.get(request_id)
            _request.connected_tutor_id = user.id 
            user.outgoing_requests.remove(_request)
            user.notifications.remove(student_notification)
            
            for _tutor in _request.requested_tutors:
                for n in sorted(_tutor.notifications, reverse=True):
                    if n.request_id == _request.id:
                        n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has canceled the original request.</span>'            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            user = User.query.get(user.id)
            response = {'user': user.__dict__}
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])
    

    if arg =='student_accept' and request.method == 'PUT':
        user = getUser()
        if user:
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            notification_id = request.json.get('notif_id')

            student = user
            current_notification = Notification.query.get(notification_id)
            skill_name = current_notification.skill_name

            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)

            #Modify student notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name.upper() + " tutor."
            current_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            current_notification.custom = 'student-accept-request'
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None
            current_notification.time_created = datetime.now()

            #Update request
            request_id = current_notification.request_id
            r = Request.query.get(request_id)

            #Cancelled payments for now
            previous_request_payment = Payment.query.filter_by(request_id = r.id).first()
            if not previous_request_payment:
                p = Payment(r)
                if r.id > 165 :
                    p.student_paid_amount = 5
                else:
                    p.student_paid_amount = 10
                db_session.add(p)
            else:
                p = previous_request_payment
            
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_id = tutor_id
            from app.static.data.prices import prices_dict
            r.connected_tutor_hourly = prices_dict[current_notification.request_tutor_amount_hourly]
            r.time_connected = datetime.now()
            r.student_secret_code = user.secret_code

            if not previous_request_payment:
                charge = stripe.Charge.create(
                    amount = p.student_paid_amount * 100,
                    currency="usd",
                    customer=student.customer_id,
                    description="one-time connection fee"
                )
                charge_id = charge["id"]


            if not previous_request_payment:
                from emails import student_payment_receipt
                student_payment_receipt(student, tutor.name.split(" ")[0], p.student_paid_amount, p, charge_id, skill_name, False, True)

            if r in student.outgoing_requests:
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

            if tutor.apn_token:
                apn_message = student.name.split(" ")[0] + ' has chosen you! BIG MONEY TIME. Message '  + student.name.split(" ")[0] + ' now!'
                send_apn(apn_message, tutor.apn_token)

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
            response = {'user': user.__dict__}
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])

    if arg =='request' and request.method =='POST':

        user = getUser()
        if user:
            print request.json
            description = request.json.get('_description')
            skill_name = request.json.get('course_name') 
            urgency = request.json.get('urgency')
            estimate = request.json.get('estimated_hourly')
            professor = request.json.get('professor_name')
            student_price = request.json.get('student_estimated_hour')
            location = request.json.get('location_name')

            weekly_availability = request.json.get('calendar')

            from app.static.data.variations import courses_dict
            from app.static.data.short_variations import short_variations_dict
            original_skill_name = skill_name.lower()
            
            if not courses_dict.get(original_skill_name):
                return errors([skill_name + ' is not a registered skill. Please try again.'])

            skill_id = courses_dict[original_skill_name]
            skill = Skill.query.get(skill_id)
            skill_name = short_variations_dict[skill.name].upper()

            if user.verified_tutor:
                if skill in user.skills:
                    return errors(["You cannot request help in a course you're a tutor for."])

            # If student already has an outgoing request
            if user.outgoing_requests:
                for r in user.outgoing_requests:
                    if r.skill_id == skill_id:
                        return errors(["You already have an active request for this."])

            r = Request(
                student_id = user.id,
                skill_id = skill_id,
                description = description,
                urgency = int(urgency),
                frequency = None, 
                time_estimate = float(estimate)
            )

            r.professor = professor

            week_times = Week(owner=0)
            
            db_session.add(week_times)
            i = 0
            
            for day in weekly_availability:
                for time_range in day:
                    print time_range
                    temp_range = Range(start_time=time_range[0], end_time=time_range[1], week_day=i)
                    db_session.add(temp_range)
                    week_times.ranges.append(temp_range)
                i = i + 1

            r.weekly_availability.append(week_times)
            r.num_students = 1
            r.student_estimated_hour = int(float(student_price))
            r.location = location
            r.available_time = ''
            user.outgoing_requests.append(r)
            db_session.add(r)            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            sched = Scheduler()
            sched.start()
            later_time = datetime.now() + timedelta(0, 60)
            
            job = sched.add_date_job(expire_request_job, later_time, [r.id, user.id])


            from notifications import student_request_receipt
            notification = student_request_receipt(user, r, original_skill_name)
            user.notifications.append(notification)
            db_session.add(notification)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            student_notification_id = notification.id
            # if not skill.tutors:
            #     return jsonify(dict={'no-active-tutors': True})

            # Tutors are currently not contacted when there is a request.
            from notifications import tutor_request_offer
            for tutor in r.requested_tutors:
                #Only if they are approved tutors
                if tutor.approved_by_admin:
                    if tutor.apn_token:
                        apn_message = user.name.split(" ")[0] + ' needs help in ' + skill_name + '. You could make $' + \
                            str(r.student_estimated_hour * r.time_estimate) + '.'
                        send_apn(apn_message, tutor.apn_token)

                    tutor.incoming_requests_to_tutor.append(r)
                    notification = tutor_request_offer(user, tutor, r, skill_name)
                    db_session.add(notification)
                    tutor.notifications.append(notification)
            
            #send emails + create objects
            from emails import student_needs_help
            mandrill_result, tutor_email_dict = student_needs_help(user, r.requested_tutors, skill_name, r)
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

            r = Request.query.get(r.id)
            student_notification = Notification.query.get(student_notification_id)
            response = {"request": sanitize_dict(r.__dict__),
                        "notifications": sanitize_dict(student_notification.__dict__),
                        # "calendar": weekly_availability
                        }
            return json.dumps(response, default=json_handler, indent=4)

        return errors(['Invalid Token'])
        

    if arg == 'support':

        user_id = session.get('user_id')
        user = User.query.get(user_id)

        support_topic = ajax_json['selected-issue']
        support_detail = ajax_json['detail']

        from emails import send_support_email
        send_support_email(support_topic, support_detail, user)


    if arg == 'sample-tutors':
        
        from app.static.data.variations import courses_dict
        
        course_str = ajax_json['course'].lower()
        skill_to_add_id = courses_dict[course_str]
        skill = Skill.query.get(skill_to_add_id)

        count = 0
        tutor_array = []
        for tutor in skill.tutors:
            if count >= 5:
                break
            if tutor.profile_url:
                tutor_array.append(tutor.profile_url
                )
    
        return_json['enough-tutors'] = count > 5
        return_json['tutors'] = tutor_array

    if arg =='guru-app':
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        user.school_email = ajax_json['school-email']
        user.major = ajax_json['major']
        user.qualifications = ajax_json['experience']
        user.year = ajax_json['year']
        user.slc_tutor = ajax_json['slc']
        user.la_tutor = ajax_json['la']
        user.res_tutor = ajax_json['res']
        user.ta_tutor = ajax_json['gsi']
        user.previous_tutor = ajax_json['cal']

        courses = ajax_json['courses']

        from app.static.data.variations import courses_dict

        for course_txt in courses:
            skill_to_add_id = courses_dict[course_txt]
            skill = Skill.query.get(skill_to_add_id)
            db_session.add(skill)
            user.skills.append(skill)
        
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 


    return jsonify(response=return_json)

################# HELPER METHODS #####################

# Returns the user looked up by the authentication token sent in the header
def getUser():
    auth_token = request.headers.get("X-UGURU-Token")
    user = User.query.filter_by(auth_token=auth_token).first()
    if user:
        return user
    else:
        return None

#retunns a {"errors": []} resource of the resounse the last request failed
def errors(errors=[]):
    return jsonify({"errors":errors})

def json_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    if obj.__class__.__name__ == 'InstanceState':
        return None
    if obj.__class__.__name__ == 'User':
        return None
    else:
        return json.JSONEncoder.default(obj)
        return obj

def create_user(email, password, phone_number, name):
    new_user = User(email=email, 
                        password=md5(password).hexdigest(), 
                        phone_number=phone_number, 
                        name=name)

    new_user.last_active = datetime.now()
    new_user.secret_code = views.generate_secret_code()
    new_user.feed_notif = 0
    new_user.settings_notif = 0

    mailbox = Mailbox(new_user)

    new_user.auth_token = "%032x" % random.getrandbits(128);

    return new_user, mailbox

def expire_request_job(request_id, user_id):
    print 'request has expired'
    request = Request.query.get(request_id)
    user = User.query.get(user_id)
    request.is_expired = True
    db_session.commit()

def get_time_ranges(week_object, owner):
    if not week_object.first():
        return []
    arr_ranges = []
    ranges = week_object.filter_by(owner=owner).first().ranges
    for r in ranges:
        arr_ranges.append([r.week_day, r.start_time, r.end_time])
    return arr_ranges

def send_apn(message, token):
    payload = Payload(alert=message, sound='default', badge=1)
    apns.gateway_server.send_notification(token, payload)

def create_stripe_customer(token, user):
    customer = stripe.Customer.create(
                email=user.email,
                card = token
                )

    user.customer_id = customer.id
    user.customer_last4 = customer['cards']['data'][0]['last4']
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 


def sanitize_dict(_dict):   
    if _dict.get('id'): _dict['server_id'] = _dict.pop('id')
    if _dict.get('description'): _dict['_description'] = _dict.pop('description')
    if _dict.get('professor'): _dict['professor_name'] = _dict.pop('professor')
    if _dict.get('location'): _dict['location_name'] = _dict.pop('location')
    return _dict

def get_student_time_ranges(week_object, owner):
    if not week_object.first():
        return []
    arr_ranges = []
    ranges = week_object.filter_by(owner=owner).first().ranges
    for r in ranges:
        arr_ranges.append([r.week_day, r.start_time, r.end_time])
    return arr_ranges

def process_back_to_original_form(arr_arr):
    return_list = [[],[],[],[],[],[],[]]
    for item in arr_arr:
        if item:
            index = item.pop(0)
            return_list[index].append(item)
    return return_list

def get_user_skills_in_arr(user):
    skills = []
    if user.skills:
        for skill in user.skills:
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill.name]
            skills.append(skill_name)
    return skills

def user_dict_in_proper_format(user):
    pending_ratings_dict = {}
    is_a_tutor = False
    skills = []
    if user.pending_ratings:
        rating = user.pending_ratings[0]
        student = User.query.get(rating.student_id)
        tutor = User.query.get(rating.tutor_id)

        pending_ratings_dict = {
            'rating_server_id' : rating.id,
            'student_name' : student.name.split(" ")[0],
            'student_profile' : student.profile_url,
            'student_server_id': student.id, 
            'tutor_name' : tutor.name.split(" ")[0],
            'tutor_profile': tutor.profile_url,
            'tutor_server_id': tutor.id, 
        }

    if user.verified_tutor and user.approved_by_admin and user.skills:
        is_a_tutor = True
        skills = get_user_skills_in_arr(user)


    response = {'user': 
                    { 
                        'server_id': user.id,
                        'name': user.name.split(" ")[0],
                        'email': user.email,
                        'password': user.password,
                        'auth_token': user.auth_token,
                        'apn_token': user.apn_token,
                        'image_url': user.profile_url,
                        'recipient_id': user.recipient_id,
                        'customer_id': user.customer_id,
                        'customer_last4': user.customer_last4,
                        'pending_ratings': pending_ratings_dict,
                        'is_a_tutor': is_a_tutor,
                        'hkn_tutor': user.hkn_tutor,
                        'la_tutor': user.la_tutor,
                        'slc_tutor': user.slc_tutor,
                        'res_tutor': user.res_tutor,
                        'ta_tutor': user.ta_tutor,
                        'previous_tutor': user.previous_tutor,
                        'year': user.year,
                        'bio': user.tutor_introduction,
                        'skills' : skills,
                        'major' : user.major
                    }
            }
    print response
    return response