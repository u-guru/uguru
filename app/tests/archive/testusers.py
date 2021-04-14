import json, nose, os, requests, sys, time
from nose.tools import *
import logging
DEFAULT_HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}
BASE_URL = 'http://dev.samir:5000'

def checkServerStatus(prod_env):
    base_url = BASE_URL
    if prod_env:
        base_url = 'https://www.uguru.me'
    response = requests.get(base_url)
    eq_(response.status_code, 200)

def initNewUserFullyLoaded(url, payload):
    response = uPostRequest(url, payload)
    return response

def initNewUserFullyLoaded(url, payload):
    response = uPostRequest(url, payload)
    return response

def uPostRequest(url, payload_dict):
    logging.info(payload_dict)
    print 'post request to %s' % url
    return requests.post(url=url, json=payload_dict, headers=DEFAULT_HEADERS)

def getUserPublicProfileInfo(user_id):
    pass

def setUserAttributes(user_id):
    pass

def getCommandLineDevEnvVars():
    if len(sys.argv) > 2:
        if '-local' in sys.argv:
            return '-l'
        else:
            return '-p'

def generateUniqueID():
    from datetime import datetime
    from time import mktime
    return int(mktime(datetime.now().timetuple()))

def test_server_running(prod_env=True):
    if os.environ.get('PRODUCTION') or getCommandLineDevEnvVars() in ['-p', '-production']:
        prod_env = True
    if getCommandLineDevEnvVars() in ['-l']:
        prod_env = False
    # Step 0
    checkServerStatus(prod_env)

def test_user_init_new_email():

    # Step 1
    # test brandnew user
    unique_id = generateUniqueID()
    test_email = 'samir-%s@uguru.me' % unique_id
    payload_dict = {'email': test_email, 'password':"launchuguru123", 'fb_id': str(unique_id), 'name':'samir m'}
    payload_dict['guru_courses'] = [{'id': 120544, 'short_name': 'CHICANO 176'}, {'id': 120591, 'short_name': 'CHINESE 100A'}, {'id': 120591, 'short_name': 'COMPSCI 160'}, {'id': 123102, 'short_name': 'ESPM 15'}]

    from pprint import pprint
    response = initNewUserFullyLoaded(BASE_URL + '/api/v1/user', payload_dict)
    eq_(response.status_code, 200)
    user_dict = json.loads(response.text)
    pprint(user_dict)
    # university_id
    # referral_code
    # guru_courses
    # portfolio items

def test_user_init_old_email():
    # Step 2
    # test brandnew user
    unique_id = generateUniqueID()
    test_email = 'samir@uguru.me'
    payload_dict = {'email': test_email, 'password':"launchuguru123"}
    from pprint import pprint
    response = initNewUserFullyLoaded(BASE_URL + '/api/v1/user', payload_dict)
    eq_(response.status_code, 409)
    user_dict = json.loads(response.text)

def remove_all_test_accounts():
    admin_token = "9c1185a5c5e9fc54612808977ee8f548b2258d34"
    url = "http://localhost:5000/api/admin/%s/users" % admin_token
    response = requests.delete(url)
    print response.status_code




def test_popular_gurus():
    ## get popular gurus && seee if profile code works
    eq_(False, True)

# def test_user_put():
#     setUserAttributes(1)


    # rv = test_app.get('/users')
    # check_content_type(rv.headers)
    # resp = json.loads(rv.data)
    # #make sure we get a response
    # eq_(rv.status_code,200)
    # #make sure there are no users
    # eq_(len(resp), 0)

    # #create a user
    # d = dict(first_name="User1First", last_name="User1Last",email="User1@User1.com")
    # rv = test_app.post('/users', data=d)
    # check_content_type(rv.headers)
    # eq_(rv.status_code,201)

    # #Verify we sent the right data back
    # resp = json.loads(rv.data)
    # eq_(resp["email"],"User1@User1.com")
    # eq_(resp["first_name"],"User1First")
    # eq_(resp["last_name"],"User1Last")

    # #Get users again...should have one
    # rv = test_app.get('/users')
    # check_content_type(rv.headers)
    # resp = json.loads(rv.data)
    # #make sure we get a response
    # eq_(rv.status_code,200)
    # eq_(len(resp), 1)

    # #GET the user with specified ID
    # rv = test_app.get('/users/%s' % resp[0]['id'])
    # check_content_type(rv.headers)
    # eq_(rv.status_code,200)
    # resp = json.loads(rv.data)
    # eq_(resp["email"],"User1@User1.com")
    # eq_(resp["first_name"],"User1First")
    # eq_(resp["last_name"],"User1Last")

    # #Try and add Duplicate User Email
    # rv = test_app.post('/users', data=d)
    # check_content_type(rv.headers)
    # eq_(rv.status_code,500)