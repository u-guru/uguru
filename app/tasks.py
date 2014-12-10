from celery import Celery
from texts import tutor_receives_student_request
from celery.task import task, periodic_task
from celery.schedules import crontab
from database import *
from models import *
from views import *

import time
import logging
import os
from datetime import datetime
from time import sleep

celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml'],
    CELERY_TIMEZONE="America/Los_Angeles",
)

DEFAULT_TUTOR_ACCEPT_TIME = 5 #*60
DEFAULT_STUDENT_ACCEPT_TIME = 20 #*60
ASAP_LIMIT = 60 * 120 # 2 hours
# DEFAULT_CHECK_MSG_TIME = 60


################
# Helpers ######
################

# Returns best tutor based on sorting
# Sort by average rating (for now) 
def get_best_queued_tutor(_request):
    from views import calc_avg_rating
    
    tutor_queue = get_qualified_tutors(_request)
    
    tutor_queue = sorted(tutor_queue, key=lambda tutor:calc_avg_rating(tutor)[0], reverse=True)

    tutor = tutor_queue.pop(0)
    _request.requested_tutors.remove(tutor) 
    commit_to_db()
    return tutor

# Returns list of qualified tutors if they have text enabled.
def get_qualified_tutors(_request):
    qualified_tutors = []
    for tutor in _request.requested_tutors:
        if tutor.text_notification and tutor.phone_number:
            qualified_tutors.append(tutor)
    
    commit_to_db()
    return qualified_tutors 

################
# Samir-Tasks #
################

# If Time:
# Cancel a ASAP request automatically 2 hours after the request
# Make MVP tutors algorithm better

#Send request to tutor
@task(name='tasks.send_student_request')
def send_student_request(r_id):
    _request = Request.query.get(r_id)

    #If no more tutors
    if not _request.requested_tutors:
        return

    #If request is canceled or there's a match, return.
    if _request.connected_tutor_id or _request.time_connected:        
        return

    tutor = get_best_queued_tutor(_request)
    tutor.outgoing_requests.append(_request)

    #Update request with new tutor
    _request.pending_tutor_id = tutor.id
    _request.time_pending_began = datetime.now()
    _request.contacted_tutors.append(tutor)

    #Send to mixpanel
    print
    print '============================'
    print 'Request #' + str(_request.id) + tutor.get_first_name().upper() + ' REQUEST RECEIVED: ' + str(tutor.calc_avg_rating()[0]) + 'stars'
    print '============================'

    #Check status ten minutes later
    check_tutor_request_status.apply_async(\
        args=[r_id, tutor.id], countdown=DEFAULT_TUTOR_ACCEPT_TIME)

    #Send the text message
    msg = tutor.get_first_name().upper() + tutor_receives_student_request(r_id)
    from views import send_twilio_msg
    # twilio_msg = send_twilio_msg(tutor.phone_number, msg, tutor)

    commit_to_db()


#Removes cancellation from tutor 
@task(name='tasks.tutor_request_status')
def check_tutor_request_status(r_id, tutor_id):
    
    # Tutor didn't reply 
    _request = Request.query.get(r_id)
    tutor = User.query.get(tutor_id)

    SECONDS_IN_BETWEEN = (datetime.now() - _request.time_pending_began).seconds

    #If tutor accepted in time .... recall the function for seconds in between
    if SECONDS_IN_BETWEEN < DEFAULT_STUDENT_ACCEPT_TIME and \
        tutor in _request.committed_tutors:

        check_tutor_request_status.apply_async(args=[_request.id, tutor.id], \
            countdown = SECONDS_IN_BETWEEN)

        print 'Request #' + str(_request.id) + ' ' + tutor.get_first_name().upper() + ' TIME CONTNUING'\
        + ' FOR ' + SECONDS_IN_BETWEEN

    elif _request.pending_tutor_id == tutor_id:
        
        print 
        print '============================'
        print 'Request #' + str(_request.id) + ' ' + tutor.get_first_name().upper() + ' TIME IS UP'
        print '============================'


        #Fire off the next one immediately
        send_student_request(r_id)

        #Update this tutor
        tutor = User.query.get(tutor_id)
        _request = Request.query.get(r_id)
        tutor.outgoing_requests.remove(_request)

        #Add notification, in-case we want to display them.
        n = Notification()
        n.status = 'late'
        n.request_id = _request.id
        tutor.notifications.append(n)
        commit_to_db(n)
    
    else:
        pass
        #IDK? 




#####################
# CAM REGULAR TASKS #
#####################

@task(name='tasks.send_twilio_message_delayed')
def send_twilio_message_delayed(phone, msg, user_id):
    from views import send_twilio_msg
    send_twilio_msg(phone,msg, user_id)

@task(name='tasks.check_text_msg_status')
def check_msg_status(msg_id):
    from views import twilio_client, update_text
    text = Text.query.get(text_id)
    msg = twilio_client.messages.get(text.sid)
    update_text(msg, text)
    try:
        db_session.commit()
    except:
        db_session.flush()
        raise


# Samir --> Won't this use up all of our connections? 
# Things like these will need attention of all of our workers.
# For instance, student makes Math 1A request with 80 tutors...
# I tried reading a best practices celery doc & couldn't find 
@task(name='tasks.contact_qualified_tutors')
def contact_qualified_tutors_outdated(request_id):

    request = Request.query.get(request_id)
    if not request:
        logging.info("Couldn't find a request with the supplied id: ", str(request_id))
        return 
    
    # TODO : set based on urgency
    SECONDS_BETWEEN_CONTACT_ATTEMPTS    = 5
    SECONDS_ALLOWED_PENDING             = 30 # Ten Minutes

    # Get a list of tutors, prioritized, and make a queue
    tutor_queue = prioritize_qualified_tutors(request.requested_tutors)
    logging.info("=== Beginning Number of qualified and prioritized tutors: " + str(len(tutor_queue)) )

    # Get starting tutor    
    current_tutor = tutor_queue.pop(0)
    while len(tutor_queue) != 0:

        # Re-fetch the request so that we are sure it's state is accurate
        request = Request.query.get(request_id)
        
        # if request has been connected, you are done. "CARRY ON MY WAYWARD SON!"
        if request.connected_tutor_id:
            logging.info("...tutor has been matched with to tutor :" + str(request.connected_tutor_id))
            break

        # Don't proceed if the request is canceled
        if request.time_canceled:
            logging.info("...stopped contacting tutors because request was canceled.")
            break

        # Don't proceed if the request is expired, although it shouldn
        if request.time_expired:
            logging.info("...stopped contacting tutors because request expired")
            break

        # If request is in a pending state, check how long its been and proceed to wait or expire the request accordingly
        if request.pending_tutor_id:
            # Been pending too long, expire the request
            seconds_spent_pending = (datetime.now() - request.time_pending_began) # datetime.timedelta
            if seconds_spent_pending > SECONDS_ALLOWED_PENDING:
                request.time_expired = datetime.now()
                logging.info("...request expired at " + str(request.time_expired) + " because it was pending for too long.")
                db_session.commit()
                # TODO : Try catch if commit fails!
                break
            else:
                logging.info("...request " + str(request.id) + " is in pending state.")
                sleep(SECONDS_BETWEEN_CONTACT_ATTEMPTS) # Wait a beat and then try again
                continue

        # If this tutor has already been contacted, "MOVE ALONG MOVE ALONG LIKE YOU ALWAYS DO"
        if current_tutor.id in request.contacted_tutors:
            #   NOTE :  This will be important when we allow the list of qualified tutors 
            #           to be updated while this function is running.  Instead of assigning r.requested_tutors
            #           once when the request is created, we could have a method on the Request instance
            #           called r.prioritized_tutor_candidates() that fetches Skill.query.get(skill_id).tutors
            #           and prioritized them.  This way we ensure that we are always contacting 
            #           the best possible tutor as sson as possible.
            logging.info("Skipping over tutor who has already been contacted for request: " + str(request))
            current_tutor = tutor_queue.pop(0) # Pop next tutor off the queue, and begin the loop again immediately
            logging.info("=== Moving on to next tutor. ===")
            continue

        # Finally, go ahead and try to contact the tutor
        contact_success = contact_tutor(current_tutor, request)
        if not contact_success:
            logging.info("...failed to contact tutor: " + str(current_tutor))
        db_session.commit()
        # TODO : Try catch here
        sleep(SECONDS_BETWEEN_CONTACT_ATTEMPTS) # Wait a beat and then
        current_tutor = tutor_queue.pop(0) # Pop next tutor off the queue
        logging.info("Moving on to next tutor...")

    logging.info("=== End of contacting for request: "+str(request.id)+" ===")
    return

##############################
# BEGIN Contact Tutor Helpers#
##############################

def prioritize_qualified_tutors(tutors):
    """ Orders the list of tutors from best to worst. """
    # TODO : Implement secret saucce prioritizing algorithm.
    return tutors

def contact_tutor(tutor, request):
    """ Takes in a turor and a requst and tries to reach the 
    tutor by all possible means. Returns True if the turor was 
    successfully contacted, False otherwise. """
    logging.info("...contacting tutor: " + str(tutor))


    if tutor.phone_number and tutor.text_notification:
        # TODO : Send them a text
        logging.info("...texting")

    # This is what we *should* do.  
    if not tutor.phone_number and tutor.text_notification:
        logging.info("...send an email saying they could have made money.")

    # Append request to the tutor's outgoing_requests.    
    tutor.outgoing_requests.append(request)
    # Add this tutor to the list of tutors tried by this request
    request.contacted_tutors.append(tutor)

    try:
        db_session.commit()
    except:
        db_session.rollback()
        logging.info("Failed to add the request to tutor.outgoing_request in DB.")
        return False

    return True

#############################
# END Contact Tutor Helpers #
#############################

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
    _request.time_expired = datetime.now()
    db_session.commit()
    # TODO : Try catch if commit fails!



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
    