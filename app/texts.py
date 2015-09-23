import time, sys, traceback, os
from twilio.rest import TwilioRestClient
# Twilio
TWILIO_DEFAULT_PHONE = "+15104661138"
MESSAGE_FOOTER = '\n\nCheck uGuru mobile app for more details!'
MESSAGE_HEADER = '[uguru]\n\n'
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])


######################
# Send Text Message #
######################
def send_text_message(phone_number, message):
    try:
        message = twilio_client.messages.create(
            body_ = message,
            to_ = phone_number,
            from_ = TWILIO_DEFAULT_PHONE,
            )
        print message
    except:
        print "Exception in user code:"
        print '-'*60
        traceback.print_exc(file=sys.stdout)
        print '-'*60
        return False

def compose_text_message(notif_key, args_tuple):
    if args_tuple:
        return str(text_notif_copy[notif_key] % args_tuple)
    else:
        return str(text_notif_copy[notif_key])

def send_text_to_user(user, notif_key, args_tuple):
    #append header
    message = MESSAGE_HEADER
    #append body
    message += compose_text_message(notif_key, args_tuple)
    #append footer
    message += MESSAGE_FOOTER
    send_text_message(user.phone_number, message)

def send_message_to_receiver_support(sender, receiver):

    # args_tuple = (
    #     sender.name.split(' ')[0].title()
    #     )


    send_text_to_user(receiver, 'support_message_received', ())

def send_message_to_receiver(sender, receiver, course, delay_seconds=None):
    args_tuple = (
        sender.name.split(' ')[0].title(),
        course.short_name.upper()
        )

    send_text_to_user(receiver, 'message_received', args_tuple)

def send_student_has_accepted_to_guru(session, guru, delay_seconds=None):

    total_hours = session.hours
    #TODO FIX
    if not session.hours:
        session.hours = 1
        session.minutes = 0
    if session.minutes:
        total_hours += int((session.minutes / 60.0 * 100)/100)
    else:
        total_hours = session.hours
    estimated_price = session.request.DEFAULT_PRICE * total_hours
    args_tuple = (
        str(estimated_price)
        )

    send_text_to_user(guru, 'student_chose_guru', args_tuple)

def send_guru_proposal_to_student(proposal, student, delay_seconds=None):
    args_tuple = (
        proposal.guru.name.split(' ')[0].title(),
        str(10)
    )


    send_text_to_user(student, 'guru_can_help', args_tuple)

def send_student_request_to_guru(_request, guru, delay_seconds=None):
    args_tuple = (
        _request.DEFAULT_PRICE,
        _request.time_estimate,
        _request.student.name.split(" ")[0],
        _request.course.short_name.upper()
    )

    # send push to to guru

    send_text_to_user(guru, 'student_request', args_tuple)




# TODO , finish the copy
text_notif_copy = {
    "student_request": """Make $%s total in %smin helping %s in %s. Swipe for more details & increase response rate""",

    "guru_can_help": """%s can help! Swipe for more details. %s min until this expires.""",

    "student_chose_guru": """Congrats! You're one step away from earning $%s, Swipe & start preparing now.""",

    "guru_student_canceled": "",
    "guru_student_rejected": "",
    "message_received":"""You have one new message from %s about %s""",
    "support_message_received":"""You have 1 new message from Uguru Support""",
    "message_received_nudged": "",

}
