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

celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml'],
    CELERY_TIMEZONE="America/Los_Angeles",
)

## What TASKS should be used for
## Heavy database tasks

################
#### TASKS #####
################

@task(name='tasks.example_task')
def example_task(args):
    pass


@periodic_task(run_every=crontab(minute=0, hour=0), name="tasks.update_university_guru_rankings")
def update_university_guru_rankings():
    for u in University.query.all():
        # if the university has gurus, calculate their rankings
        if u.gurus:
            from app.lib.guru_rank import calculate_university_guru_scores

            university_guru_scores = calculate_university_guru_scores(u)

            #update university gurus count
            u.num_gurus = len(u.gurus)

            rank_position = 1
            for guru, score in university_guru_scores:
                previous_rank = guru.official_guru_rank
                previous_score = guru.official_guru_score

                guru.official_guru_rank = rank_position
                guru.official_guru_score = score
                guru.official_guru_rank_last_updated = datetime.now()
                guru.estimated_guru_rank_last_updated = None

                rank_position += 1

                #create event to track
                event = Event.initGuruRankEvent(guru_id=guru.id, off_rank_before=previous_rank, off_rank_after=guru.official_guru_rank)


            db_session.commit()

##################
# PERIODIC TASKS #
##################
# @periodic_task(run_every=crontab(0, 0, day_of_month='27'), name="tasks.daily_results_email")
# def transfer_stripe_funds_to_bank():
#     import stripe, os

#     stripe_keys = {
#         'secret_key': os.environ['STRIPE_SECRET_KEY'],
#         'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
#     }
#     stripe.api_key = stripe_keys['secret_key']
#     SVB_RECIPIENT_ID = "rp_156UOc228F3k8kGfDFirLu5C"
#     stripe_balance = stripe.Balance.retrieve()
#     stripe_balance_cents = stripe_balance.available[0]['amount']
#     stripe_balance_dollars = int(stripe_balance_cents / 100)

#     if stripe_balance_dollars > 500:
#         amount_to_cash_out = stripe_balance_dollars - 500
#         transfer = stripe.Transfer.create(
#                 amount=int(amount_to_cash_out * 100),
#                 currency="usd",
#                 recipient=SVB_RECIPIENT_ID
#             )
#     else:
#         print 'Not enough funds to deposit revenue this month :('
#     return
#