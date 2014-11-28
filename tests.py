from app.database import init_db, db_session
from nose.tools import *
import json
import app

BASE_WEB_API_URL = '/web/v1/api/'
test_app = None

#Create test app

init_db()
test_app = app.app.test_client()


def test_user_route():



def test_login_routes():
    login_url = BASE_WEB_API_URL + 'login'
    data = {'email':'makhani1@berkeley.edu', 'password':'makhani1'}
    json_data = json.dumps(data)
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

def teardown():
    db_session.remove()

