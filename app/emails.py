import os, mandrill
from models import *

MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)

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

def send_campaign_email(options, recipients):
    campaign_name = options.get('campaign_name')
    template_name = options.get('template_name')
    subject = options.get('subject')
    sender_email = options.get('sender_email')
    reply_to_email = 'jasmine@uguru.me'
    # sender_title = options.get('sender_name')
    sender_title = "Jasmine"
    track_opens_flag = options.get('track_opens_flag')
    track_clicks_flag = options.get('track_clicks_flag')
    important_flag = options.get('important_flag')

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

    result = mandrill_client.messages.send_template(
        template_name=template_name,
        template_content=[],
        message=message)

    return result

def send_campaign_email_test(options, test_recipients):
    test_prefix = "[TEST] "
    options['subject'] = test_prefix + str(options.get('subject'))
    options['campaign_name'] = test_prefix + options.get('campaign_name')
    options['sender_email'] = str(options.get('sender_email'))
    options['sender_name'] = str(options.get('sender_name'))
    send_campaign_email(options, test_recipients)
