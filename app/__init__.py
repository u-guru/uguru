from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Logging
import logging
import sys

root = logging.getLogger()
root.setLevel(logging.INFO)
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s %(filename)s:%(lineno)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
root.addHandler(ch)
# TODO : Add debug logger

app = Flask(__name__)
app.config.from_object('config')

class DataBase():
    session = None;

    def __init__(self, session):
        self.session = session

db = SQLAlchemy(app)

from app import views, models, emails