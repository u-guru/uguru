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

from mandrill_webhooks import MandrillWebhooks
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
mandrill = MandrillWebhooks(app)

app.config.update(dict(
  PREFERRED_URL_SCHEME = 'https',
))

app.config.setdefault('MANDRILL_WEBHOOKS_KEY', 'Byu1r2LQpLmaxGvIoydqQw')
app.config.setdefault('MANDRILL_WEBHOOKS_URL', 'https://uguru-rest-test.herokuapp.com/mandrill')

try:
    if os.environ.get('PRODUCTION'):
        app.config.update(SERVER_NAME='uguru.me')
except:
    print "some shit went wrong on production"


# flask-restful
api = restful.Api(app)
_force_https(app)
CORS(app)

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


@mandrill.hook('*')
def wildcard(payload, event):
    print "Receiving %s hook from mandrill.." % event
    from pprint import pprint
    pprint(payload)

    if event == 'open' or event == 'click':

        # https://mandrill.zendesk.com/hc/en-us/articles/205583307-Message-Event-Webhook-format
        event = payload.get('event') #type open or click
        _ip = payload.get('ip')

        ## important --> city, country, country_short, long/lat, postal, region + timezone
        location_dict = payload.get('location')

        # os_family, ua_version, os family, os_name, #from mobile device
        user_agent = payload.get('user_agent_parsed')
        is_mobile = payload.get('user_agent_parsed').get('mobile')
        agent_type = payload.get('Email Client')

        ## Make sure to get email
        email = payload.get('msg').get('email') ## convert this
        tag_arr = payload.get('msg').get('tags')
        opens = payload.get('opens')
        clicks = payload.get('click')

        msg_state = payload.get('msg').get('state') #sent, rejected, spam, etc.

        mandrill_id = payload.get('_id')

        ## mandrill id
        metadata = payload.get('metadata')

    return 200

# Allows cross-origin. Allows us to host local server on different ports & share resources
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Type, Accept, Authorization, X-Request-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    # response.headers["X-Frame-Options"] = "ALLOW"
    response.headers.add('Access-Control-Allow-Credentials', True)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

from app import rest, models, emails, views
