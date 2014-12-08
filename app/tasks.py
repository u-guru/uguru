from celery import Celery
from celery.task import task, periodic_task
from celery.schedules import crontab
from app.database import *
from models import *
from views import *

import time
import logging
import os

celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml'],
    CELERY_TIMEZONE="America/Los_Angeles"
)

#################
# REGULAR TASKS #
#################

@task(name='tasks.send_twilio_message_delayed')
def send_twilio_message_delayed(phone, msg, user_id):
    from views import send_twilio_msg
    send_twilio_msg(phone,msg, user_id)

@task(name='tasks.check_text_msg_status')
def check_msg_status(text_id):
    from views import twilio_client, update_text
    text = Text.query.get(text_id)
    msg = twilio_client.messages.get(text.sid)
    update_text(msg, text)
    try:
        db_session.commit()
    except:
        db_session.flush()
        raise

@task(name='tasks.contact_tutors')
def contact_qualified_tutors(request_id):
    
    prioritized_tutors = prioritize_qualified_tutors(r.requested_tutors)

    for tutor in previous_tutor:
        # TODO : DO magic sauce that queues and requests tutors in the proper order here
        logging.info("requesting tutor: " + str(tutor))
        tutor.outgoing_requests.append(r)
    try:
        db_session.commit()
    except:
        db_session.flush()
        raise

##############################
# BEGIN Contact Tutor Helpers#
##############################

def prioritize_qualified_tutors(tutors):
    """ Orders the list of tutors from best to worst. """
    logging.info( "Number of tutors being prioritized: " + str(len(tutors)) )
    # TODO : Implement secret saucce prioritizing algorithm.
    return tutors


def contact_tutor(tutor_id, request_id):
    """ Takes in a turor and a requst and tries to reach the tutor by all possible means. Returns True if the turor was successfully contacted, False otherwise. """
    logging.info("============ Requesting User ==============")
    
    # Find the Request with the given ID
    r = Request.query.get(request_id)
    if not r:
        logging.info("Couln't find a request with the supplied id: ", str(request_id))
        return False

    t = User.query.get(tutor_id)
    if not t:
        logging.info("Couln't find a request with the supplied id: ", str(request_id))
        return False

    # Add request to the tutors requests.  Outgoing, why?
    tutor.outgoing_requests.append(r)


    
    if :
        pass

    try:
        db_session.commit()
    except:
        db_session.rollback()
        return False

    if tutor.text_notification:
        # TODO : Send them a text
        logging.info("Text sent to tutor: " + str(tutor))
    if tutor.email_notification:
        # TODO : send off a text
        logging.info("Email email to tutor: " + str(tutor))
    if tutors.push_notification:
        # TODO : implement push notifications
        pass

    logging.info("============ End Requesting User ==============")
    return True

########################
# END Contact Tutor Helpers#
########################

@task(name='tasks.autoconfirm_payment')
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
    from views import MAX_REQUEST_TUTOR_LIMIT
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
@periodic_task(run_every=crontab(minute=0, hour=0), name="tasks.daily_results_email") # Every midnight
def daily_results_email():
    if os.environ.get('PRODUCTION'):
        from emails import daily_results_email
        daily_results_email('samir@uguru.me', 'uguru-core@googlegroups.com')


#TODO: Samir
#Run on every 2nd ot the month
@periodic_task(run_every=crontab(0, 0, day_of_month='27'), name="tasks.daily_results_email") 
def transfer_stripe_funds_to_bank():
    import stripe, os

    stripe_keys = {
        'secret_key': os.environ['STRIPE_SECRET_KEY'],
        'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
    }
    stripe.api_key = stripe_keys['secret_key']
    SVB_RECIPIENT_ID = "rp_156UOc228F3k8kGfDFirLu5C"
    stripe_balance = stripe.Balance.retrieve()
    stripe_balance_cents = stripe_balance.available[0]['amount'] 
    stripe_balance_dollars = int(stripe_balance_cents / 100)

    if stripe_balance_dollars > 500:
        amount_to_cash_out = stripe_balance_dollars - 500
        transfer = stripe.Transfer.create(
                amount=int(amount_to_cash_out * 100), 
                currency="usd",
                recipient=SVB_RECIPIENT_ID
            )
    else:
        print 'Not enough funds to deposit revenue this month :('
    return            
    