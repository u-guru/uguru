import os, mandrill
from models import *



MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
if not os.environ.get('PRODUCTION'):
    MANDRILL_API_KEY = "E3JtFuPUZC466EFpJY9-ag"

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

    result = mandrill_client.messages.send_template(
        template_name=template_name,
        template_content=[],
        message=message)

    return result

def send_campaign_email_test(campaign_name, template_name,
    subject, sender_email, reply_to_email, sender_title, 
    track_opens, track_clicks, important, test_email, test_name):
    
    r = Recipient()
    r.first_name = test_name.split(" ")[0].title()
    r.email = test_email
    send_campaign_email(campaign_name, template_name,
    subject, sender_email, reply_to_email, sender_title, 
    track_opens, track_clicks, important, [r])
