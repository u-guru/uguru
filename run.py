from app import app
from celery import Celery
from celery.task import periodic_task
from datetime import timedelta
import redis
import logging

app.debug=True
from os import environ

# Setup the celery instance under the 'tasks' namespace
celery = Celery('run')

REDIS_URL = environ.get('REDISTOGO_URL', 'redis://localhost')

# Use Redis as our broker and define json as the default serializer
celery.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json', 'msgpack', 'yaml']
)

def fib(n):
    if n > 1:
        return fib(n - 1) + fib(n - 2)
    else:
        return 1

# The periodic task itself, defined by the following decorator
@periodic_task(run_every=timedelta(seconds=10))
def print_fib():
    # Just log fibonacci(30), no more
    print "sup"
    logging.info(fib(30))

if __name__ == '__main__':
	app.run(host='0.0.0.0',debug=True)

