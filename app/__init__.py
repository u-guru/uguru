from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.mobility import Mobility
from flask.ext.assets import Environment, Bundle
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

#Device Detection Plugin
Mobility(app)

#Flask pyScss
assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('css/web.scss', filters='pyscss', output='css/all.css')
# TODO: Use this line when we have more css files to bundble
assets.register('scss_all', scss) 

app.config.from_pyfile('../config.py')

#Detects production env
if os.environ.get('DATABASE_URL'): # TODO : can this be os.environ.get('PRODUCTION') ?
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
else:
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

class DataBase():
    session = None;

    def __init__(self, session):
        self.session = session

db = SQLAlchemy(app)

from app import views, models, emails