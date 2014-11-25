from celery import Celery
from celery.task import task, periodic_task
from celery.schedules import crontab

import time
import logging
import os

celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml']
)

#################
# REGULAR TASKS #
#################

@task(name='tasks.test_background')
def test_background():
	time.sleep(3)
	logging.info("Done!")

@task
def send_twilio_message_delayed(phone, msg, user_id):
    send_twilio_msg(phone,msg, user_id)

@task(name='tasks.check_text_msg_status')
def check_msg_status(text_id):
    text = Text.query.get(text_id)
    msg = twilio_client.messages.get(text.sid)
    update_text(msg, text)
    try:
        db_session.commit()
    except:
        db_session.flush()
        raise

@task(name='tasks.autoconfirm_payment')
@celery.task
def auto_confirm_student_payment(payment_id, student_id):
    user = User.query.get(student_id)
    p = Payment.query.get(payment_id)
    
    #student has already confirmed!
    if p.student_confirmed:
        logging.info("Student has already confirmed")
        return
    p.student_confirmed = True
    stripe_charge = False
    if not p.confirmed_payment_id:
        orig_p = p
    else:
        orig_p = Payment.query.get(p.confirmed_payment_id)

    if p.student_paid_amount > 0:
        stripe_amount_cents = int(p.student_paid_amount * 100)
        student = User.query.get(p.student_id)
        
        if student.credit >= p.student_paid_amount:
            student.credit = student.credit - p.student_paid_amount
            p.student_description = 'Your credits used for this session'
        elif student.credit > 0:
            difference = p.student_paid_amount - student.credit
            p.student_description = 'You used $' + str(student.credit) +' in credit and were billed $' + str(difference) + ' to your card.'
            stripe_amount_cents = int(difference * 100)
            student.credit = 0
            try: 
                stripe_charge = True
                charge = stripe.Charge.create(
                    amount = stripe_amount_cents,
                    currency="usd",
                    customer=student.customer_id,
                    description="charge for receiving tutoring"
                )
                p.stripe_charge_id = charge['id']
                logging.info(p.stripe_charge_id)
            except stripe.error.CardError, e:
                if p.student_id == user.id:
                    error_msg = "Sorry! Your card has been declined. Please update your payment info in your settings > billing."
                else:
                    error_msg = "Sorry! The student's card has been declined. Please kindly ask them to update their information" 
                return errors([error_msg])
        else:
            try: 
                stripe_charge = True
                charge = stripe.Charge.create(
                    amount = stripe_amount_cents,
                    currency="usd",
                    customer=student.customer_id,
                    description="charge for receiving tutoring"
                )
                p.stripe_charge_id = charge['id']
                logging.info(p.stripe_charge_id)
            except stripe.error.CardError, e:
                error_msg = "Sorry! Your card has been declined. Please update your payment info in your settings > billing."
                return errors([error_msg])
            except stripe.error.InvalidRequestError, e:
                if p.student_id == user.id:
                    error_msg = "Sorry! The your card has been declined. Please update your payment info in your settings."
                else:
                    error_msg = "Sorry! The student's card has been declined. Please kindly ask them to update their information" 
                return errors([error_msg])
    else:
        user.credit = user.credit + abs(p.student_paid_amount)
        stripe_charge = False

    

    from notifications import student_payment_approval
    tutor = User.query.get(p.tutor_id)

    if orig_p != p:
        tutor.pending = tutor.pending - orig_p.tutor_received_amount - p.tutor_received_amount
        tutor.balance = tutor.balance + p.tutor_received_amount + orig_p.tutor_received_amount     
    else:
        logging.info("this is a bill-student api payment")
        logging.info("original pending " + tutor.pending)
        logging.info("original balance " + tutor.balance)
        tutor.pending = tutor.pending - orig_p.tutor_received_amount
        tutor.balance = tutor.balance + p.tutor_received_amount
        logging.info("new pending " + tutor.pending)
        logging.info("new balance " + tutor.balance)

    if p.confirmed_payment_id:
        total_amount = orig_p.time_amount * orig_p.tutor_rate + p.student_paid_amount
    else:
        #recurring billing case
        total_amount = p.student_paid_amount
    logging.info(total_amount)
    
    from app.static.data.short_variations import short_variations_dict
    skill_name = short_variations_dict[Skill.query.get(p.skill_id).name]
    
    if stripe_charge:
        charge = charge['id']
    else:
        charge = 'as9d0sudas' + str(p.id)

    student_notification = student_payment_approval(user, tutor, p, total_amount, charge, skill_name, False)
    user.notifications.append(student_notification)
    db_session.add(student_notification)
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise


@task(name='tasks.expire_request_job')
def expire_request_job(request_id, user_id):
    _request = Request.query.get(request_id)
    user = User.query.get(user_id)
    if _request in user.outgoing_requests:
        user.outgoing_requests.remove(_request)
    _request.is_expired = True
    db_session.commit()

@task(name='tasks.send_delayed_email')
def send_delayed_email(email_str, args):
    if email_str == 'canceled-request-email':
        from emails import student_canceled_email
        user_id = args[0]
        skill_name = args[1]
        student_canceled_email(User.query.get(user_id), skill_name)

@task(name='tasks.send_student_request_to_tutors')
def send_student_request_to_tutors(tutor_id_arr, request_id, user_id, skill_name):
    r = Request.query.get(request_id)
    if len(r.committed_tutors) == (MAX_REQUEST_TUTOR_LIMIT + 1):
        logging.info('We have already accomodated this request. Tier 2 tutors will not get it anymore.')
        return
    student = User.query.get(user_id)
    second_tier_tutors = []
    for tutor_id in tutor_id_arr:
        tutor = User.query.get(tutor_id)
        second_tier_tutors.append(tutor)
        r.requested_tutors.append(tutor)
        logging.info(str(tutor) + ' received tier 2 request')
        if tutor.text_notification and tutor.phone_number:
            from emails import request_received_msg
            message = request_received_msg(student, tutor, r, skill_name)
            send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id])
        tutor.incoming_requests_to_tutor.append(r)
        from app.notifications import tutor_request_offer
        notification = tutor_request_offer(student, tutor, r, skill_name)
        db_session.add(notification)
        tutor.notifications.append(notification)


    #Send email to tier 2 tutors
    from emails import student_needs_help
    mandrill_result, tutor_email_dict = student_needs_help(student, second_tier_tutors, skill_name, r)
    for sent_email_dict in mandrill_result:
        if tutor_email_dict.get(sent_email_dict['email']):
            tutor = tutor_email_dict[sent_email_dict['email']]
            logging.info(str(tutor) + ' received tier 2 email')
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

@task(name='tasks.send_student_package_info')
def send_student_package_info(user_id, request_id):
    from app.static.data.short_variations import short_variations_dict
    user = User.query.get(user_id)

    if user.credit > 10:
        logging.info("user already has purchased credits.")
        return

    r = Request.query.get(request_id)
    skill_name = short_variations_dict[Skill.query.get(r.skill_id).name]
    tutor_name = User.query.get(r.connected_tutor_id).name.split(" ")[0]
    from app.emails import send_student_packages_email
    send_student_packages_email(user, tutor_name, skill_name)
    logging.info("Email sent to " + str(user) + " regarding student packages.")


##################
# PERIODIC TASKS #
##################

@periodic_task(run_every=crontab(minute=0, hour = 5))
def test_periodic():
    if get_environment() == 'PRODUCTION':
        from emails import daily_results_email
        daily_results_email('samir@uguru.me', 'uguru-core@googlegroups.com')

@periodic_task(run_every=crontab(minute=59, hour = 6))
def samir_results():
    if get_environment() == 'PRODUCTION':
        from emails import daily_results_email
        daily_results_email('samir@uguru.me', 'makhani.samir@gmail.com')
        daily_results_email('samir@uguru.me', 'uguru-core@googlegroups.com')

##################
#  UNUSED TASKS  #
# (For reference)#
##################

#Student Drip Campaign 1 - New to uGuru students
@task
def send_student_drip_1(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    
    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-1').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        from emails import drip_student_signup_1
        email_result = drip_student_signup_1(user)
        email = Email(
                    tag='student-drip-1', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            send_student_drip_2.apply_async(args=[user.id], countdown = 10)
        else:
            send_student_drip_2.apply_async(args=[user.id], countdown = 86400)

#Student Drip Campaign 2 - Become a tutor + free tutors
@task
def send_student_drip_2(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    
    from time import sleep
    sleep(0.1)

    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-2').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        from emails import drip_student_signup_2
        email_result = drip_student_signup_2(user)
        email = Email(
                    tag='student-drip-2', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            if user.credit == 5:
                send_student_drip_3.apply_async(args=[user.id], countdown = 10)
            else:
                send_student_drip_4.apply_async(args=[user.id], countdown = 10)
        elif get_environment() == 'PRODUCTION':
            if user.credit == 5:
                send_student_drip_3.apply_async(args=[user.id], countdown = (86400 * 3))
            else:
                send_student_drip_4.apply_async(args=[user.id], countdown = (86400 * 3))


#Student Drip Campaign 3 - Free tutoring sessions
@task
def send_student_drip_3(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    
    from time import sleep
    sleep(0.1)

    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-3').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        from emails import drip_student_signup_3
        email_result = drip_student_signup_3(user)
        email = Email(
                    tag='student-drip-3', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            send_student_drip_5.apply_async(args=[user.id], countdown = 10)
        elif get_environment() == 'PRODUCTION':
            send_student_drip_5.apply_async(args=[user.id], countdown = (86400 * 7))

@task
def send_student_drip_4(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    

    from time import sleep
    sleep(0.1) # TODO : This looks like a nasty hack...

    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-4').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        user.credit = user.credit + 5
        from emails import drip_student_signup_4
        email_result = drip_student_signup_4(user)
        email = Email(
                    tag='student-drip-4', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            send_student_drip_5.apply_async(args=[user.id], countdown = 10)
        elif get_environment() == 'PRODUCTION':
            send_student_drip_5.apply_async(args=[user.id], countdown = (86400 * 7))

@task
def send_student_drip_5(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    
    from time import sleep
    sleep(0.1)


    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-5').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        from emails import drip_student_signup_5
        email_result = drip_student_signup_5(user)
        email = Email(
                    tag='student-drip-5', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            send_student_drip_6.apply_async(args=[user.id], countdown = 10)
        elif get_environment() == 'PRODUCTION':
            send_student_drip_6.apply_async(args=[user.id], countdown = (86400 * 7))

@task
def send_student_drip_6(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()

    from time import sleep
    sleep(0.1)


    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-6').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        user.credit = user.credit + 5
        from emails import drip_student_signup_6
        email_result = drip_student_signup_6(user)
        email = Email(
                    tag='student-drip-6', 
                    user_id=user.id, 
                    time_created=datetime.now(), 
                    mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        if os.environ.get('USER') == 'makhani':
            send_student_drip_7.apply_async(args=[user.id], countdown = 10)
        elif get_environment() == 'PRODUCTION':
            send_student_drip_7.apply_async(args=[user.id], countdown = (86400 * 7))

@task
def send_student_drip_7(user_id):
    return
    request = Request.query.filter_by(student_id=user_id).first()
    
    
    from time import sleep
    sleep(0.1)

    #concurrency bug?
    e = Email.query.filter_by(user_id = user_id, tag = 'student-drip-7').first()
    if e:
        return

    if not request:
        user = User.query.get(user_id)
        if not user.email_notification:
            return 
        from emails import drip_student_signup_7
        email_result = drip_student_signup_7(user)
        email = Email(
                        tag='student-drip-7', 
                        user_id=user.id, 
                        time_created=datetime.now(), 
                        mandrill_id = email_result[0]['_id']
                    )
        db_session.add(email)
        user.emails.append(email)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
