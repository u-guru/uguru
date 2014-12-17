import os
from flask import Flask
from flask.ext import restful
from flask_sqlalchemy import SQLAlchemy
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.restful import reqparse, Api
from flask.ext.bcrypt import Bcrypt
from flask.ext.httpauth import HTTPBasicAuth


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

# flask-restful
api = restful.Api(app)

# flask_becrypt
flask_bcrypt = Bcrypt(app)

# flash-httpauth
auth = HTTPBasicAuth()


#Flask sql alchemy 
db = SQLAlchemy(app)

# Migrations
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

# Allows cross-origin. Allows us to host local server on different ports & share resources
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

from app import views, models, emails
