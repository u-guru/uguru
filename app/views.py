import os
import stripe 
from app.database import *
from models import *
from twilio import *
from twilio.rest import TwilioRestClient
from flask import render_template, redirect, url_for, session

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
    return render_template('index.html')

@app.route('/admin/')
def admin():

    if session.get('admin'):
        return redirect(url_for('admin_dashboard'))

    return render_template('admin.html')

@app.route('/admin/dashboard/')
def admin_dashboard():
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
def admin_dashboard():
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