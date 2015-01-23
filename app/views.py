import os
import stripe 
from app.database import *
from models import *
from twilio import *
from twilio.rest import TwilioRestClient
from flask import render_template, redirect, url_for, session, request

# Twilio
TWILIO_DEFAULT_PHONE = "+15104661138"
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])

# Stripe
stripe_keys = {
    'secret_key': os.environ['STRIPE_SECRET_KEY'],
    'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']

# Mixpanel
from mixpanel import Mixpanel
mp = Mixpanel(os.environ['MIXPANEL_TOKEN']) 


@app.route('/')
def index():
    if 'admin.uguru.me' in request.url:
        return redirect(url_form('admin_login'))
    return render_template('index.html')

@app.route('/login/')
def admin_login():
    return render_template('admin/login.html')

@app.route('/admin/form/')
@app.route('/admin/home/')
def admin_dashboard_home():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    universities = [
            {
                'name': 'UCLA',
                'emails_sent': 1000,
                'total_emails': 10000
            },

            {
                'name': 'Berkeley',
                'emails_sent': 0,
                'total_emails': 7000
            },

            {
                'name': 'UT Austin',
                'emails_sent': 1000,
                'total_emails': 12000
            },

            {
                'name': 'U Michigan',
                'emails_sent': 1000,
                'total_emails': 15000
            }

            ]

    from emails import mandrill_client
    templates = sorted(mandrill_client.templates.list(),
        key=lambda t:datetime.strptime(t['updated_at'], "%Y-%m-%d %H:%M:%S.%f"), reverse=True)
    template_names = [t['name'] for t in templates]

    return render_template('admin/form.html', 
        mandrill_client=mandrill_client,
        available_universities=universities,
        template_names=template_names)

@app.route('/admin/api/')
def admin_api():
    if not session.get('admin'):
        return redirect(url_for('admin'))
    return render_template('admin/api.html')

@app.route('/admin/dashboard/')
def admin_dashboard():
    
    if not session.get('admin'):
        return redirect(url_for('admin'))

    from emails import mandrill_client, DEFAULT_SENDER_EMAIL, DEFAULT_SENDER_NAME 

    templates = mandrill_client.templates.list()
    batches = Batch.query.all()
    test_accounts = Recipient.query.filter_by(admin_account=True).all()

    
    default_args = {
        'default_sender_email': DEFAULT_SENDER_EMAIL,
        'default_sender_name': DEFAULT_SENDER_NAME
    }

    return render_template('admin.dashboard.html',\
        templates=templates, batches=batches, test_accounts=test_accounts\
        ,default_args=default_args)

@app.route('/admin/accounts/')
def admin_accounts():
    if not session.get('admin'):
        return redirect(url_for('admin'))

    from app.models import *
    from app.database import db_session
    ADMIN_NAMES = ["Samir Makhani", "Jasmine Mir", "Shun Kurosaki", "Robert Neivert", "Matias Baglieri"]
    admin_users = []
    for name in ADMIN_NAMES:
        u = User.query.filter_by(name=name).first()
        if not u: 
            continue
        else:
            admin_users.append(u)
    return render_template('admin-users.html', admin_users=admin_users)