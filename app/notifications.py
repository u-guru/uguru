from app import app
from app.models import Skill, User, Request, Notification
from emails import welcome_uguru, student_needs_help, tutor_wants_to_help, \
    tutor_is_matched, student_payment_request, tutor_payment_received

def getting_started(user):
    getting_started_msg = "<b>Welcome " + user.name.split(' ')[0] + \
        " to uGuru.me!</b> <br>Select here for more information to get started."
    notification = Notification(other='getting_started')
    notification.feed_message = getting_started_msg
    notification.a_id_name = 'getting-started'
    notification.image_url = "/static/img/guru.png"
    welcome_uguru(user)
    return notification

def student_request_receipt(user, request, skill_name):
    notification = Notification(request=request)
    notification.skill_name = skill_name
    notification.feed_message = "<b>You</b> requested help in " + skill_name
    request_number = user.outgoing_requests.index(request)
    notification.a_id_name = 'student-request-help' + str(request_number)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.custom_tag = 'student-request-help'
    notification.custom = skill_name
    notification.request_id = request.id
    return notification

def tutor_request_offer(user, tutor, request, skill_name):
    notification = Notification(request=request)
    notification.feed_message = "A <b>student</b> needs help in " + skill_name
    notification.skill_name = skill_name
    request_number = tutor.incoming_requests_to_tutor.index(request)
    notification.a_id_name = 'tutor-request-offer' + str(request_number)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.custom_tag = 'tutor-request-offer'
    notification.custom = skill_name
    notification.request_id = request.id
    urgency_dict = ['ASAP', 'by tomorrow', 'by next week']
    student_needs_help(tutor, skill_name, urgency_dict[request.urgency])
    return notification

def tutor_request_accept(user, tutor, request, skill_name, hourly_amount):
    notification = Notification(request=request)
    notification.feed_message = "<b>You</b> accepted a request for " + skill_name
    notification.skill_name = skill_name
    notification.request_tutor_amount_hourly = float(hourly_amount)
    notification.request_id = request.id
    notification.custom_tag = 'tutor-accept-offer'
    request_number = tutor.incoming_requests_to_tutor.index(request)
    notification.a_id_name = 'tutor-accept-offer' + str(request_number)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification

def student_incoming_tutor_request(user, tutor, request, skill_name, hourly_amount):
    notification = Notification(request=request)
    notification.feed_message = "<b>You</b> have received a tutor request for " + skill_name
    notification.skill_name = skill_name
    notification.request_tutor_amount_hourly = float(hourly_amount)
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    notification.custom_tag = 'student-incoming-offer'
    request_number = user.incoming_requests_from_tutors.index(request)
    notification.a_id_name = 'student-incoming-offer' + str(request_number)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    tutor_wants_to_help(user, skill_name) 
    return notification

def student_match(user, tutor, request, skill_name, hourly_amount):
    notification = Notification(request=request)
    notification.feed_message = "<b>You</b> have been matched with " + tutor.name + ", a " + skill_name + " tutor. </br>" + \
        "Select here to start messaging your tutor."
    notification.skill_name = skill_name
    notification.request_tutor_amount_hourly = float(hourly_amount)
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    notification.custom_tag = 'student-match'
    notification.a_id_name = 'student-match'
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    tutor_is_matched(tutor, skill_name, user.name.split(" ")[0])
    return notification

def tutor_match(user, tutor, request, skill_name, hourly_amount):
    notification = Notification(request=request)
    notification.feed_message = "<b>You</b> have been matched with " + user.name + " for " + skill_name + ".</br>" + \
        "Select here to start messaging your tutor."
    notification.skill_name = skill_name
    notification.request_tutor_amount_hourly = float(hourly_amount)
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    notification.custom_tag = 'tutor-match'
    notification.a_id_name = 'tutor-match'
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification

def tutor_payment_request_receipt(user, tutor, payment):
    notification = Notification(payment=payment)
    notification.feed_message = "<b>You</b> sent payment request to " + user.name.split(" ")[0]
    
    notification.custom_tag = 'tutor-sent-payment-' 
    notification.a_id_name = 'tutor-sent-payment-' + str(payment.id)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification

def student_payment_proposal(user, tutor, payment):
    notification = Notification(payment=payment)
    notification.feed_message = "<b>You</b> have received a payment request from " + tutor.name.split(" ")[0]
    
    notification.custom_tag = 'student-payment-proposal-' 
    notification.a_id_name = 'student-payment-proposal-' + str(payment.id)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url 
    else:
         notification.image_url = '/static/img/default-photo.jpg' 
    tutor_name = User.query.get(payment.tutor_id).name.split(" ")[0]
    student_payment_request(user, tutor_name)
    return notification

def student_payment_approval(user, tutor, payment):
    notification = Notification(payment=payment)
    notification.feed_message = "<b>You</b> have paid " + tutor.name.split(" ")[0]
    
    notification.custom_tag = 'student-payment-approval'
    notification.a_id_name = 'student-payment-approval-' + str(payment.id)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification

def tutor_receive_payment(user, tutor, payment):
    notification = Notification(payment=payment)
    notification.feed_message = '<b>' + user.name.split(' ')[0] + '</b>' + " has paid you."
    
    notification.custom_tag = 'tutor-receive-payment' 
    notification.a_id_name = 'tutor-receive-payment-' + str(payment.id)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    student_name = User.query.get(payment.student_id).name.split(" ")[0]
    amount = payment.tutor_rate * payment.time_amount
    balance = tutor.balance
    tutor_payment_received(tutor,student_name, amount, balance)
    return notification

def tutor_cashed_out(tutor, amount):
    notification = Notification(other='cashing_out')
    notification.feed_message = '<b>You</b>' + " cashed out " + str(amount)
    
    notification.custom_tag = 'tutor-cashed-out' 
    notification.a_id_name = 'tutor-cashed-out'
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification