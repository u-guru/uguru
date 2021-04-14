import json, nose, os, requests, sys, time, unittest
from nose.tools import *
import logging
DEFAULT_HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}
BASE_URL = 'http://localhost:5000'
prod_env = os.environ.get('u.guru')
import sys
sys.tracebacklimit=0

def connect_server():
    base_url = BASE_URL
    if prod_env:
        base_url = "http://www.u.guru"
    response = requests.get(base_url)
    assert response.status_code == 200
# def test_login_user():
#     from test_data import loginDict
#     unique_id = generateUniqueID()
#     test_email = 'samir-%s@uguru.me' % unique_id
#     payload_dict = {'email': test_email, 'password':"launchuguru123", 'fb_id': str(unique_id), 'name':'samir m'}
#     payload_dict['student_courses'] = [{'id': 120544, 'short_name': 'CHICANO 176'}, {'id': 120591, 'short_name': 'CHINESE 100A'}, {'id': 120591, 'short_name': 'COMPSCI 160'}, {'id': 123102, 'short_name': 'ESPM 15'}]

#     from pprint import pprint
#     response = initNewUserFullyLoaded(BASE_URL + '/api/v1/user', payload_dict)
#     eq_(response.status_code, 200)
#     user_dict = json.loads(response.text)

class TestClass:
   def test1_server_alive(self):
        connect_server()



class TestUserCreateClass(unittest.TestCase):
    def test0_create_user_invalid(self):
        assert_equal(1, 2)

    def test1_create_user_valid(self):
        assert_equal(1, 2)

class TestUserLoginClass:
    def test0_user_unsuccessful(self):
        assert_equal(1, 2)

    def test1_user_already_exists(self):
        assert_equal(1, 2)

    def test2_invalid_email(self):
        assert_equal





# def testPreApp():
#     obj = TestClass()
#     obj.initUserTest()
#     obj.update_user_fields()