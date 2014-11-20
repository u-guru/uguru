from celery import Celery
from celery.task import task

import time
import logging
import os

celery = Celery('run')
REDIS_URL = os.environ.get('REDISTOGO_URL')
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml']
)

@task(name='tasks.test_background')
def test_background():
	time.sleep(3)
	logging.info("Done!")
