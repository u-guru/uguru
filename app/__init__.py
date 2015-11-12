import os
from flask import Flask
from flask.ext import restful
from flask_sqlalchemy import SQLAlchemy
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.restful import reqparse, Api
from flask.ext.bcrypt import Bcrypt
from flask.ext.httpauth import HTTPBasicAuth
from flask.ext.cors import CORS
from flask.ext.compress import Compress
import logging
from logging.handlers import SMTPHandler
from flask_sslify import SSLify

# import newrelic.agent

# Logging
import logging
import sys


def _force_https(app):
    def wrapper(environ, start_response):
        environ['wsgi.url_scheme'] = 'https'
        return app(environ, start_response)
    return wrapper

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
sslify = SSLify(app)

# flask-restful
api = restful.Api(app)
_force_https(app)
# CORS(app)

# flask_becrypt
flask_bcrypt = Bcrypt(app)

compress = Compress(app)

class MandrillHandler(SMTPHandler):
    """ Send's an email using BOTO SES.
    """
    def emit(self,record):
        from emails import send_errors_email
        # from lib.github_client import init_github, create_issue
        # gh = init_github('uguru')
        # create_issue(gh, ['PRODUCTION SERVER ERROR'], 'UGURU PRODUCTION ERROR', self.format(record))
        send_errors_email(self.format(record))



logger = logging.getLogger()
mail_handler = MandrillHandler(mailhost="",fromaddr='<do-not-reply@uguru.me>',toaddrs="<samir@uguru.me>", subject='Production Error')
mail_handler.setLevel(logging.ERROR)
logger.addHandler(mail_handler)

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
    response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Type, Accept, Authorization, X-Request-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    response.headers["X-Frame-Options"] = "ALLOW"
    response.headers.add('Access-Control-Allow-Credentials', True)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

from app import rest, models, emails, views
