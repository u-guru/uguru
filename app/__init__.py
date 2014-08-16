from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from celery import Celery
from celery.task import periodic_task
from datetime import timedelta
import redis
import logging

import os
from os import environ

app = Flask(__name__)
app.config.from_object('config')

#Detects production env
if os.environ.get('DATABASE_URL'):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
else:
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')


REDIS_URL = environ.get('REDISTOGO_URL', 'redis://localhost')

# Setup the celery instance under the 'tasks' namespace
celery = Celery('tasks')

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
    logging.info(fib(30))


class DataBase():
    session = None;

    def __init__(self, session):
        self.session = session

db = SQLAlchemy(app)

from app import views, models, emails