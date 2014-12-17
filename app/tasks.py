from celery import Celery
from celery.task import task, periodic_task
from twilio.rest import TwilioRestClient
from celery.schedules import crontab
from database import *
from models import *
from views import *

import time
import logging
import os
import twilio
from datetime import datetime
from time import sleep

TWILIO_DEFAULT_PHONE = "+15104661138"
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])

#Celery setup
#TODO: Move this to __init__.py
celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml'],
    CELERY_TIMEZONE="America/Los_Angeles",
)

################
#### TASKS #####
################

@task(name='tasks.example_task')
def example_task(args):
    pass


##################
# PERIODIC TASKS #
##################
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
    