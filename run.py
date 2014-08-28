from app import app
from celery import Celery
from celery.task import periodic_task
from datetime import timedelta
import redis
import logging

app.debug=True
from os import environ

if __name__ == '__main__':
	app.run(host='192.168.128.234',debug=True)

