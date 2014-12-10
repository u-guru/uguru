from celery import Celery
from celery.task import task, periodic_task
from celery.schedules import crontab
from app.database import *
from app.models import *
from app.views import *
from app.tasks import *

import time
import logging
import os
from datetime import datetime
from time import sleep

DEFAULT_TUTOR_ACCEPT_TIME = 5

from twilio.rest import TwilioRestClient
from app.models import *
from app.texts import *
from app.views import *
from app.database import *


#Create twilio REST client
os.environ['TWILIO_AUTH_TOKEN'] = '4d5a1f6390c445fd1f6eb39634bdf299'
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])


tutor_ids = [307, 334, 277, 282, 15, 274, 1898, 2445, 2576, 284]
random_skill_id = 4841
DEFAULT_TUTOR_TIME = 10 #10 minutes
DEFAULT_ASAP_TUTOR_TIME = 10 #5 minutes

skill = Skill.query.get(4841)
student = User.query.get(1217)

for _id in tutor_ids:
    user = User.query.get(_id)
    user.skills.append(skill)
    print user.get_first_name(), ' is updated'

from app.lib.utils import js_date_to_python_datetime 

_request = Request.create_request(
    student = student,
    skill_id = skill.id,
    description = 'Need last second polishing in ..... ',
    time_estimate = 2,
    location = 'Dwinelle' ,
    is_urgent = False,
    start_time = '1418217122376'
)

print 'We have ' + str(len(_request.requested_tutors)) + ' for ' + skill.get_short_name()

from app.tasks import send_student_request
send_student_request.delay(_request.id)
print 'starting request in 10...'


# print 'canceling requests .... '
# user.outgoing_requests.remove(_request)
# print 'Canceled! All set. '





#Things to test,

#1. student makes request and goes successfully out
#2. tutor receives request & accepts via mobile
#3. student receives text, sees request and rejects. 
#4. tutor 2 receives a request & rejects. 
#5. student receives a request & accepts. 
#6. tutor messages the student 

