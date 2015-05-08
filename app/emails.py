import os
import mandrill
from models import *



MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
MANDRILL_API_TEST_KEY = "E3JtFuPUZC466EFpJY9-ag"

mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
mandrill_test_client = mandrill.Mandrill(MANDRILL_API_TEST_KEY)

DEFAULT_SENDER_EMAIL = 'jasmine@uguru.me'
DEFAULT_SENDER_NAME = 'Jasmine from Uguru'
DEFAULT_REPLY_TO = "jasmine@uguru.me"
TEST_EMAILS = [
                {   "name": "Robert Nievert",
                    "email": "robertneivert@gmail.com"
                },
                {   "name": "Jasmine Mir",
                    "email": "jasmine@uguru.me"
                },
                {
                    "name": "Samir Makhani",
                    "email": "samir@uguru.me"
                }
            ]

# MVP Send an email
# - Import template from Mandrill
# Send test email

# create data model

# Form GUI Components
# Defaults (Sender Name, Sender Email, Reply to email)
# Per Campaign (subject, batch_id, campaign_name, checkboxes(important, track opens, track_clicks))
# See if there is anything else interesting

# Tutorial should include
# Mailchimp signup
#

def send_campaign_email(campaign_name, template_name,
    subject, sender_email, reply_to_email, sender_title,
    track_opens, track_clicks, important, recipients):
    campaign_name = campaign_name
    template_name = template_name
    subject = subject
    sender_email = sender_email
    reply_to_email = reply_to_email
    sender_title = sender_title
    track_opens_flag = track_opens
    track_clicks_flag = track_clicks
    important_flag = important

    to_emails = []
    for recipient in recipients:
        to_emails.append({
            'email':recipient.email,
            'name':recipient.first_name,
            'type': 'to'
        })

    message = {
        'subject': subject,
        'from_email': sender_email,
        'from_name': sender_title,
        'to': to_emails,
        'headers': {'Reply-To': reply_to_email},
        'important': important_flag,
        'track_opens': track_opens_flag,
        'track_clicks': track_clicks_flag,
        'preserve_recipients':False,
        'tags':[campaign_name]
    }

    if not os.environ.get('PRODUCTION'):

        result = mandrill_client.messages.send_template(
            template_name=template_name,
            template_content=[],
            message=message)

    else:
        result = mandrill_client.messages.send_template(
            template_name=template_name,
            template_content=[],
            message=message)

    return result

def send_transactional_email(subject, content, receiver, tags):

    receiver_info = [{
        'email':'makhani.samir@gmail.com',
        'name':receiver.name,
        'type': 'to'
    }]

    message = {
        'subject': subject,
        'from_email': "samir@uguru.me",
        'from_name': "Samir from Uguru",
        'to': receiver_info,
        'headers': {'Reply-To': 'support@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':tags.split(' '),
        'html': content
    }

    if not os.environ.get('PRODUCTION'):

        print "testing: email skipped intended for", receiver.email, subject, tags

    else:
        print "production: for now: email skipped intended for", receiver.email, subject, tags
        result = mandrill_client.messages.send(message=message)
        return result

def compose_email_notif_message(notif_key, args_tuple):
    return str(email_notif_copy[notif_key] % args_tuple)

def send_reset_password_email(user, raw_password):
    email_subject = '[IMPORTANT] Your Uguru Password Has Been Reset'
    args_tuple = (user.name.split(' ')[0].title(), str(raw_password))
    email_message = compose_email_notif_message('reset_password', args_tuple)
    email_receiver = user
    email_tags = "student-reset-password"
    result = send_transactional_email(email_subject, email_message, email_receiver, email_tags)
    print result


def send_message_to_receiver_support(sender, receiver):
    args_tuple = (
        sender.name.split(' ')[0].title()
    )

    email_subject = 'Uguru Support: 1 New Message'
    email_content = 'You have 1 new message from Uguru support. <br><br> Please login to the app to see more details.<br><br> Best, <br> Uguru Support Team'
    email_receiver = receiver
    email_tags = 'support-message-to-user'

    result = send_transactional_email(email_subject, email_message, email_receiver, email_tags)
    print result

def send_student_request_to_guru(_request, guru):
    args_tuple = (
        _request.DEFAULT_PRICE,
        _request.time_estimate,
        _request.student.name.split(" ")[0],
        _request.course.short_name.upper()
    )

    email_subject = '1 New ' + _request.course.short_name.upper() + ' Request From' + guru.name.split(' ')[0].upper()
    email_message = compose_email_notif_message('student_request', args_tuple)
    email_receiver = guru
    email_tags = "guru-receives-request"

    result = send_transactional_email(email_subject, email_message, email_receiver, email_tags)
    print result

def send_guru_proposal_to_student(proposal, student):
    args_tuple = (
        proposal.guru.name.split(' ')[0].title(),
        str(10)
    )

    email_subject = '1 ' + proposal.request.course.short_name.upper() + ' Guru can Help! Read More'
    email_message = compose_email_notif_message('guru_can_help', args_tuple)
    email_receiver = student
    email_tags = "student-receives-guru-proposal"

    result = send_transactional_email(email_subject, email_message, email_receiver, email_tags)
    print result

def send_student_has_accepted_to_guru(session, guru):

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

    student_name = session.student.name.split(' ')[0].title()


    email_subject = 'Congrats! ' + student_name + ' has accepted your ' + session.request.course.short_name.upper + ' Request'
    email_message = compose_email_notif_message('student_chose_guru', args_tuple)
    email_receiver = guru
    email_tags = "student-accepts-guru"

    result = send_transactional_email(email_subject, email_message, email_receiver, email_tags)
    print result



def send_campaign_email_test(campaign_name, template_name,
    subject, sender_email, reply_to_email, sender_title,
    track_opens, track_clicks, important, test_email, test_name):

    r = Recipient()
    r.first_name = test_name.split(" ")[0].title()
    r.email = test_email
    send_campaign_email(campaign_name, template_name,
    subject, sender_email, reply_to_email, sender_title,
    track_opens, track_clicks, important, [r])


email_notif_copy = {
    "student_request": """Make $%s total in %smin helping %s in %s. Swipe for more details & increase response rate""",

    "guru_can_help": """%s can help! Swipe for more details. %s min until this expires.""",

    "student_chose_guru": """Congrats! You're one step away from earning $%s, Swipe & start preparing now.""",

    "guru_student_canceled": "",
    "guru_student_rejected": "",
    "message_received":"""You have one new message from %s about %s""",
    "message_received_nudged": "",
    "reset_password": """Hi %s,<br><br> Your re-generated Uguru password is <b>%s</b>.<br><br> If you didn't regenerate your password, please contact support immediately by directly replying to this email.<br><br> Best, <br><br>uGuru Support """

}
