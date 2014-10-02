from app import app
from app.models import Skill, User, Request, Notification
from emails import welcome_uguru_student, welcome_uguru_tutor, student_needs_help, tutor_wants_to_help, \
    tutor_is_matched, student_payment_receipt, tutor_payment_receipt, tutor_payment_received, student_is_matched
from datetime import datetime

def getting_started_student(user, no_email=None):
    getting_started_msg = "<b>You </b> signed up" + \
        " for uGuru.me!" 
    notification = Notification(other='getting_started')
    notification.feed_message = getting_started_msg
    notification.a_id_name = 'getting-started'
    notification.image_url = user.profile_url
    notification.time_read = datetime.now()
    if not no_email:
        welcome_uguru_student(user)
    return notification

def getting_started_student_tip(user):
    getting_started_msg = "<b>TIP:</b>  Adding a profile picture " + \
        " makes Gurus feel more comfortable helping you!"  
    notification = Notification(other='getting_started')
    notification.feed_message = getting_started_msg
    notification.a_id_name = 'tip-photo'
    notification.feed_message_subtitle = "<b>Click here</b> to " +\
        " add a photo." 
    notification.image_url = '/static/img/jenny.jpg'
    user.feed_notif = user.feed_notif + 1
    user.settings_notif = user.settings_notif + 1
    return notification

def getting_started_tutor(user):
    getting_started_msg = "Ready to Guru?" 
    notification = Notification(other='getting_started')
    notification.feed_message_subtitle = "Click here for our guide to getting started!"
    notification.feed_message = getting_started_msg
    notification.a_id_name = 'getting-started-guru'
    notification.image_url = user.profile_url
    # notification.time_read = datetime.now()    
    # welcome_uguru_tutor(user)
    return notification

def welcome_guru(user):
    getting_started_msg = 'Welcome to uGuru.'
    notification = Notification(other='getting_started')
    notification.feed_message = getting_started_msg
    notification.a_id_name = 'getting-started'
    notification.image_url = user.profile_url
    notification.time_read = datetime.now()    
    # welcome_uguru_tutor(user)
    return notification

def getting_started_tutor_2(user):
    getting_started_msg = "<b>Click here</b> to see what " +\
        "a student request looks like." 
    notification = Notification(other='getting_start_tutor')
    notification.feed_message = getting_started_msg
    if not user.approved_by_admin:
        notification.feed_message_subtitle = "Once approved, we will notify you when students need help via email."
    else:
        notification.feed_message_subtitle = "We will notify you when students need help via email."
    notification.a_id_name = 'getting-started-tutor'
    notification.image_url = '/static/img/jenny.jpg'
    return notification

def student_purchase_package(user, credits, amount):
    notification = Notification(other='package_purchase')
    notification.feed_message = 'You purchased <b>$'+str(credits)+'</b> credits for <b>$' + str(amount) +'.'
    notification.feed_message_subtitle = "Click here to view your transaction history."    
    notification.a_id_name = 'student-purchase-package'
    notification.custom_tag = 'student-purchase-package'
    notification.image_url = user.profile_url
    notification.time_read = datetime.now()
    return notification


def student_cap_reached_notif(user, request, skill_name):
    notification = Notification(request=request)
    notification.skill_name = skill_name
    notification.feed_message = "You have 3 Gurus waiting to help for " +skill_name + "!"
    notification.feed_message_subtitle = "You have 24 hours to pick one, or your request expires."
    notification.a_id_name = 'student-cap-reached-' + str(request.id)
    notification.image_url = user.profile_url
    notification.custom_tag = 'student-cap-reached'
    notification.request_id = request.id
    user.feed_notif = user.feed_notif + 1
    return notification

def confirm_meeting_tutor(user, tutor, request):
    notification = Notification(request=request)
    notification.feed_message = "Once you've met " + user.name.split(" ")[0].title() + ", please confirm that you've met."
    notification.feed_message_subtitle = "Click here to confirm!"
    notification.a_id_name = 'confirm-meeting' + str(request.id)
    notification.image_url = user.profile_url
    notification.custom_tag = 'confirm-meeting'
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    user.feed_notif = user.feed_notif + 1
    return notification


def confirm_meeting_student(user, tutor, request):
    notification = Notification(request=request)
    notification.feed_message = "Once you've met " + tutor.name.split(" ")[0].title() + ", please confirm that you've met."
    notification.feed_message_subtitle = "Click here to confirm!"
    notification.a_id_name = 'confirm-meeting' + str(request.id)
    notification.image_url = tutor.profile_url
    notification.custom_tag = 'confirm-meeting'
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    user.feed_notif = user.feed_notif + 1
    return notification

def next_time_student_notif(user, tutor, request):
    notification = Notification(request=request)
    notification.feed_message = "Next time you want to meet " + tutor.name.split(" ")[0].title() + ", here is what you should do."
    notification.feed_message_subtitle = "Click here for more details"
    notification.a_id_name = 'next-time' + str(request.id)
    notification.image_url = tutor.profile_url
    notification.custom_tag = 'next-time'
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    user.feed_notif = user.feed_notif + 1
    return notification

def next_time_tutor_notif(user, tutor, request):
    notification = Notification(request=request)
    notification.feed_message = "Next time you want to meet " + user.name.split(" ")[0].title() + ", here is what you should do."
    notification.feed_message_subtitle = "Click here for more details"
    notification.a_id_name = 'next-time' + str(request.id)
    notification.image_url = user.profile_url
    notification.custom_tag = 'next-time'
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    user.feed_notif = user.feed_notif + 1
    return notification

def student_request_receipt(user, request, skill_name):
    notification = Notification(request=request)
    notification.skill_name = skill_name
    notification.feed_message = "You requested help in <b>" + skill_name.upper() + '</b>.'
    notification.feed_message_subtitle = "<b>Click here</b> to see " +\
        "the status of your request!"
    # request_number = user.outgoing_requests.index(request)
    notification.a_id_name = 'student-request-help' + str(request.id)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.custom_tag = 'student-request-help'
    notification.custom = skill_name
    notification.request_id = request.id
    user.feed_notif = user.feed_notif + 1
    return notification

def student_request_receipt(user, request, skill_name):
    notification = Notification(request=request)
    notification.skill_name = skill_name
    notification.feed_message = "You requested help in <b>" + skill_name.upper() + '</b>.'
    notification.feed_message_subtitle = "<b>Click here</b> to see " +\
        "the status of your request!"
    # request_number = user.outgoing_requests.index(request)
    notification.a_id_name = 'student-request-help' + str(request.id)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.custom_tag = 'student-request-help'
    notification.custom = skill_name
    notification.request_id = request.id
    user.feed_notif = user.feed_notif + 1
    return notification


def tutor_request_offer(user, tutor, request, skill_name):
    notification = Notification(request=request)
    notification.feed_message = "<b>" + user.name.split(" ")[0] + "</b> needs help in " + skill_name.upper()
    notification.feed_message_subtitle = '<span style="color:#69bf69">This request is still <strong>available</strong>! Click here to accept now!</span>'
    notification.skill_name = skill_name
    request_number = tutor.incoming_requests_to_tutor.index(request)
    notification.a_id_name = 'tutor-request-offer' + str(request.id)
    if user.profile_url:
        notification.image_url = user.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.custom_tag = 'tutor-request-offer'
    notification.custom = skill_name
    notification.request_id = request.id
    urgency_dict = ['ASAP', 'by tomorrow', 'by next week']
    tutor.feed_notif = tutor.feed_notif + 1
    tutor.status = 'red'
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
    notification.time_read = datetime.now()
    return notification

def student_incoming_tutor_request(user, tutor, request, skill_name, hourly_amount, extra_detail):
    notification = Notification(request=request)
    notification.feed_message = "<b>"+ tutor.name.split(" ")[0] + "</b> wants to help you with <b>" \
        + skill_name.upper() + "</b>."
    notification.skill_name = skill_name
    notification.request_tutor_amount_hourly = float(hourly_amount)
    notification.request_id = request.id
    notification.request_tutor_id = tutor.id
    notification.custom_tag = 'student-incoming-offer'
    request_number = user.incoming_requests_from_tutors.index(request)
    notification.a_id_name = 'student-incoming-offer' + str(len(user.notifications) + 1)
    if extra_detail:
        notification.extra_detail = extra_detail
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    tutor_wants_to_help(user, tutor, skill_name.upper()) 
    user.feed_notif = user.feed_notif + 1
    return notification

def student_match(user, tutor, request, skill_name, hourly_amount):
    notification = Notification(request=request)
    notification.feed_message = "<b>You</b> have been matched with <b>" + tutor.name + "</b>, a <b>" + skill_name.upper() + "</b> tutor. </br>" + \
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
    tutor_is_matched(user, tutor)
    student_is_matched(user,tutor,request.student_secrete_code)
    notification.time_read = datetime.now()
    user.msg_notif = user.msg_notif + 1
    tutor.msg_notif = tutor.msg_notif + 1
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
    notification.time_read = datetime.now()
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
    amount = float(payment.time_amount * payment.tutor_rate)
    user.feed_notif = user.feed_notif + 1
    return notification

def student_payment_approval(user, tutor, payment, amount_charged, charge_id, skill_name, recurring):
    notification = Notification(payment=payment)
    notification.feed_message = "<b>$" + str('%.4g' % amount_charged) + "</b> payment has been sent to " + \
        tutor.name.split(" ")[0] + "."
    notification.feed_message_subtitle = "Click here to view your transaction history."
    notification.custom_tag = 'student-payment-approval'
    notification.a_id_name = 'student-payment-approval-' + str(payment.id)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    student_payment_receipt(user, tutor.name.split(" ")[0], amount_charged, payment, charge_id, skill_name, recurring, False)
    tutor_payment_receipt(user, tutor, amount_charged, payment, charge_id, skill_name, user.name.split(" ")[0])
    notification.time_read = datetime.now()
    return notification

def tutor_receive_payment(user, tutor, payment, amount_made):
    notification = Notification(payment=payment)
    notification.feed_message = 'Congrats! You have made <b>$' + str('%.4g' % amount_made) + "</b>."
    notification.feed_message_subtitle = "Click here to view your transaction history."
    
    notification.custom_tag = 'tutor-receive-payment' 
    notification.a_id_name = 'tutor-receive-payment-' + str(payment.id)
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    notification.time_read = datetime.now()
    return notification

def tutor_cashed_out(tutor, amount):
    notification = Notification(other='cashing_out')
    notification.feed_message = '<b>You</b>' + " cashed out <b>$" + str(amount) + "</b>."
    notification.feed_message_subtitle = "<b>Click here</b> to see the status of your transfer"
    notification.custom = amount
    notification.custom_tag = 'tutor-cashed-out' 
    notification.a_id_name = 'tutor-cashed-out' + str(len(tutor.notifications))
    if tutor.profile_url:
        notification.image_url = tutor.profile_url
    else:
        notification.image_url = '/static/img/default-photo.jpg'
    return notification