import os, mandrill
from models import *

MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)


def example_mandrill_email(user, tutor_name, skill_name):
    user_first_name = user.name.split(" ")[0]
    html = student_packages_html(user_first_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'subject': user_first_name + ', save at least $5 on your next ' + skill_name + ' session with ' + tutor_name,
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-packages']
    }

    result = mandrill_client.messages.send(message=message)
    return result

