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
import views


@app.route('/api/<arg>', methods=('GET', 'POST'), defaults={'_id': None})
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
            tutor_tags = ['tutor-request-offer', 'student-incoming-offer', 'getting-started-tutor', 'tutor-receive-payment', 'tutor-cashed-out']
            student_tags = ['student-request-help', 'student-payment-approval', 'student-incoming-offer']

            for n in user_notifications:
                n_dict = n.__dict__
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
        return errors(["Invalid Token"])



    if arg == 'notifications' and _id != None and request.method == 'GET':
        user = getUser()
        if user:
            n_detail = {}
            n = Notification.query.get(_id)
            n_detail['type'] =  n.custom_tag

            if n.request_id:
                r = Request.query.get(n.request_id)
                n_detail['request'] = r.__dict__
                if n_detail['request'].get('id'):
                    n_detail['request']['server_id'] = n_detail['request'].pop('id')
            if n.payment_id:
                p = Request.query.get(n.payment_id)
                n_detail['payment'] = p.__dict__
                n_detail['payment']['server_id'] = n_detail['payment'].pop('id')
                if n_detail['payment'].get('id'):
                    n_detail['payment']['server_id'] = n_detail['payment'].pop('id')

            n_detail['notification'] = n.__dict__
            n_detail['notification']['server_id'] = n_detail['notification'].pop('id')
            n_detail['notification']['feed_message'] = n_detail['notification']['feed_message'].replace('<b>', '').replace('</b>', '')
            if n_detail['notification'].get('feed_message_subtitle'):
                n_detail['notification'].pop('feed_message_subtitle')

            response = n_detail
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])


    if arg == 'user' and request.method == 'GET':
        user = getUser()
        if user:
            response = {'user': user.__dict__}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])


    if arg =='tutor_accept' and request.method =='POST':
        user = getUser()
        if user:
            request_id = request.json.get('request_id')
            hourly_amount = request.json.get('amount')
            extra_details = request.json.get('details')
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
                        "tutor-calendar": weekly_availability,
                        "student-calendar": student_weekly_availability
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
    

    if arg =='student_request' and request.method =='POST':

        user = getUser()
        if user:
            description = request.json.get('description')
            skill_name = request.json.get('skill') 
            urgency = request.json.get('urgency')
            estimate = request.json.get('estimate')
            professor = request.json.get('professor')
            weekly_availability = request.json.get('calendar')
            student_price = request.json.get('hourly-price')
            location = request.json.get('location')

            from app.static.data.variations import courses_dict
            from app.static.data.short_variations import short_variations_dict
            original_skill_name = skill_name.lower()
            skill_id = courses_dict[original_skill_name]
            skill = Skill.query.get(skill_id)
            skill_name = short_variations_dict[skill.name]
            
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
            response = {"request": r.__dict__,
                        "notifications": [student_notification.__dict__],
                        "calendar": weekly_availability
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