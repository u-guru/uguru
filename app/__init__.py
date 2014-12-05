import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.mobility import Mobility
from flask.ext.assets import Environment, Bundle

# Logging
import logging
import sys

root = logging.getLogger()
root.setLevel(logging.INFO)
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.INFO)
formatter = logging.Formatter('%(filename)s:%(lineno)s %(message)s')
ch.setFormatter(formatter)
root.addHandler(ch)
# TODO : Add debug logger

app = Flask(__name__)
app.config.from_object('config')

#Device Detection Plugin
Mobility(app)

#Flask pyScss
assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('css/web.scss', filters='pyscss', output='css/all.css')
# TODO: Use this line when we have more css files to bundble
assets.register('scss_all', scss)

db = SQLAlchemy(app)

# Migrations
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

from app import views, models, emails
