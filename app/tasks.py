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

## Queueing system
## - Guru is sent a notification
## - [task --> expire in 12 minutes]
## - Once they open the notification
#### [client] start the 5 minute timer (let server know they opened it),
#### [client -> server] Notify it's been opened
## - [task -> expire in 6 minutes]

################
#### TASKS #####
################

@task(name='tasks.example_task')
def example_task(args):
    pass

### Send out all of them at the same time
@task(name='tasks.process_request_gurus_and_send')
def sort_gurus_by_rank(request_id):
    _request = Request.query.get(request_id)
    request_gurus = _request.gurus

    # 1. sort gurus
    from guru_rank import sort_gurus_by_rank
    sorted_gurus = sort_gurus_by_rank(request_gurus)
    return sorted_gurus

    # 2. send gurus push notifications one by one
    ###  (let them know where they are on the queue)

    # 3.

    # 4.


    ### helper functions to
    sorted_gurus = []

    ## TODO sort gurus
    return sorted_gurus

@task(name='tasks.check_proposal_status')
def check_proposal_status(proposal_id, previous_status):
    from app.models import Proposal
    from app.database import db_session
    proposal = Proposal.query.get(proposal_id)
    db_session.refresh(proposal)

    print proposal_id, previous_status

    seconds_since_update = get_seconds_since_last_update(proposal)
    print "seconds since:", seconds_since_update

    if proposal.status != previous_status:
        print "status before:", previous_status, "status after:", proposal.status

    if proposal.status == previous_status \
    and seconds_since_update > Proposal.GURU_STATE_EXP_TIME_ARR_WITHOUT_BUFFER[previous_status]:

        print "expiring proposal...buffer has been passed\n"
        expire_proposal(proposal, proposal.GURU_EXPIRED)

        print "checking for other gurus \n"
        next_best_guru = get_best_guru(proposal.request)

        # no more gurus
        if not next_best_guru:
            print "no more gurus...\n"
            event_dict = {'status': Request.NO_GURUS_AVAILABLE, 'request_id':proposal.request.id}
            event = Event.initFromDict(event_dict)
            proposal.request.guru_id = None
            proposal.request.status = proposal.request.NO_GURUS_AVAILABLE
            db_session.commit()
            # send push notification to user
            print "request complete, no gurus found"

        #there are gurus left
        print 'proposing with id', proposal.id, 'to guru', next_best_guru.id, 'for request ', proposal.request.id, '\n'
        proposal = create_guru_proposal(proposal.request, next_best_guru, proposal.request.student_calendar)
        print proposal.status, proposal.GURU_STATE_EXP_TIME_ARR[proposal.status]
        check_proposal_status.apply_async(args=[proposal.id, proposal.status], countdown=proposal.GURU_STATE_EXP_TIME_ARR[proposal.status])
        print "checking status in ", proposal.GURU_STATE_EXP_TIME_ARR[proposal.status], 'seconds \n'
        return


# @periodic_task(run_every=crontab(minute=0, hour='*/1'), name="tasks.calculate_stats")
# def update_stats_hourly():

#     s = Stats.query.get(1)
#     s.last_updated = datetime.now()
#     s.total_users = len(User.query.all())
#     s.total_gurus = len([user.is_a_guru or user.guru_courses for user in User.query.all() if user.is_a_guru])
#     s.total_universities = len(University.query.all())
#     print s.total_users, s.total_gurus, s.total_universities
#     s.total_courses = 0
#     s.total_depts = 0
#     s.total_popular_courses= 0


#     for u in University.query.all():
#         u.num_courses = len(u.courses)
#         u.num_depts = len(u.departments)
#         # u.num_popular_courses = len(u.popular_courses)

#         s.total_courses += u.num_courses
#         s.total_depts += u.num_depts
#         s.total_popular_courses += u.num_popular_courses
#         db_session.commit()


    ## calculate all students
    ## calculate all universities
    ## calculate all gurus
    ## calculat all courses
    ## calculate all popular courses
    ## calculat all universities departments
    ## Active users
    ## Active gurus

# @periodic_task(run_every=crontab(minute=0, hour=0), name="tasks.update_university_guru_rankings")
# def update_university_guru_rankings():
#     for u in University.query.all():
#         # if the university has gurus, calculate their rankings
#         if u.gurus:
#             from app.lib.guru_rank import calculate_university_guru_scores

#             university_guru_scores = calculate_university_guru_scores(u)

#             #update university gurus count
#             u.num_gurus = len(u.gurus)

#             rank_position = 1
#             for guru, score in university_guru_scores:
#                 previous_rank = guru.official_guru_rank
#                 previous_score = guru.official_guru_score

#                 guru.official_guru_rank = rank_position
#                 guru.official_guru_score = score
#                 guru.official_guru_rank_last_updated = datetime.now()
#                 guru.estimated_guru_rank_last_updated = None

#                 rank_position += 1

#                 #create event to track
#                 event = Event.initGuruRankEvent(guru_id=guru.id, off_rank_before=previous_rank, off_rank_after=guru.official_guru_rank)


#             db_session.commit()

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


#########################
#### Helper Methods #####
#########################

def get_seconds_since_last_update(proposal):
    # guru has been sent but not seen
    last_updated = None

    # if status
    if not proposal.time_updated and proposal.status == 0:
        last_updated = proposal.time_created
    else:
        last_updated = proposal.time_updated

    seconds_difference = (datetime.now() - last_updated).seconds
    return seconds_difference

def expire_proposal(proposal, proposal_status):
    proposal.status = proposal_status
    proposal.request.guru_id = None
    db_session.commit()

def create_guru_proposal(_request, guru, calendar):
    proposal = Proposal.initProposal(_request.id, guru.id, calendar.id)
    event_dict = {'status': Proposal.GURU_SENT, 'proposal_id':proposal.id}
    event = Event.initFromDict(event_dict)
    return proposal

def get_best_guru(_request):
    from lib.guru_rank import calculate_guru_score

    gurus_already_contacted = [proposal.guru for proposal in _request.proposals]
    all_course_gurus = _request.course.gurus.all()

    gurus_remaining = [guru for guru in all_course_gurus if guru not in gurus_already_contacted]

    print len(gurus_already_contacted), 'gurus already contacted', len(gurus_remaining), 'remaining out of', len(all_course_gurus), 'total'

    #calculate most up-to-date score
    for guru in gurus_remaining:
        guru.official_guru_score = calculate_guru_score(guru)

    sorted_available_gurus = sorted(gurus_remaining, key=lambda g:g.official_guru_rank, reverse=True)

    if not sorted_available_gurus:
        return None

    # if gurus do exist
    most_qualified_guru = sorted_available_gurus[0]

    return most_qualified_guru