from app.database import init_db, db_session
from app.models import *
from nose.tools import *
from manage import create_cs10_skill
import json
import app
import os

BASE_WEB_API_URL = 'api/v1/'
requests_url = BASE_WEB_API_URL + 'requests'
users_url = BASE_WEB_API_URL + 'users'
login_url = BASE_WEB_API_URL + 'login'

#Create test app
init_db()
create_cs10_skill() # for testing
test_app = app.app.test_client()

######################
# POST api/users     #
######################


def test_create_user_route_success():
    #Check for incorrect payload object
    json_data = json.dumps({'empty':'true'})
    response = test_app.post(users_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 422)

    #Create a new user
    json_data = json.dumps({
        'email':'makhani@berkeley.edu',
        'password': 'makhani1',
        'name': 'Samir Makhani'
        })
    response = test_app.post(users_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

def test_create_user_route_duplicate():
    json_data = json.dumps({
        'email':'makhani@berkeley.edu',
        'password': 'makhani1',
        'name': 'Samir Makhani'
        })
    response = test_app.post(users_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 403)

######################
# GET api/login      #
######################

def test_login_route_incorrect():
    json_data = json.dumps({'email':'random@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 403)

def test_login_route_success():
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)


######################
# POST api/requests/ #
######################
def test_create_request_route_skill_not_supported():
    json_data = json.dumps({
        'skill_name': 'cs10'
        })
    response = test_app.post(requests_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 422)

    # This is not a valid course, should throw an error
    json_data = json.dumps({
        'skill_name': 'cs10111',
        'description': 'yo yo yo',
        'time_estimate': 'test',
        'phone_number': '8135009853',
        'location': 'sup',
        'remote': True,
        'urgency': 5,
        'start_time': True
        })
    response = test_app.post(requests_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 403)
    get_response_error = json.loads(response.data)['errors']
    eq_(get_response_error, ["Sorry! This is not a support skill, please choose one from the dropdown."])

#Valid request but NO tutors
def test_create_request_route_no_tutors():
    from datetime import datetime
    json_data = json.dumps({
        'skill_name': 'cs10',
        'description': 'yo yo yo',
        'time_estimate': 3,
        'phone_number': '8135009853',
        'location': 'Dwinelle',
        'remote': True,
        'urgency': 5,
        'start_time': '1417150714005' #JS UTC
        })
    response = test_app.post(requests_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)
    get_response_redirect = json.loads(response.data)['redirect']
    eq_(get_response_redirect, 'back-to-home')

# Same request, but should be rejected because the previous one is pending
def test_create_request_successful():
    # Create a CS10 Tutor
    tutor = User.create_user(name='Cameron Ehrlich', email='cameron1@uguru.me', password='ehrlich1')
    cs10_skill = Skill.query.filter_by(name=u'COMPSCI.10').first()
    tutor.add_skill(cs10_skill)

    from datetime import datetime
    json_data = json.dumps({
        'skill_name': 'cs10',
        'description': 'yo yo yo',
        'time_estimate': 3,
        'phone_number': '8135009853',
        'location': 'Dwinelle',
        'remote': True,
        'urgency': 5,
        'start_time': '1417150714005' #JS UTC
        })
    response = test_app.post(requests_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

# Same request, but should be rejected because the previous one is pending
def test_create_request_already_pending():
    from datetime import datetime
    json_data = json.dumps({
        'skill_name': 'cs10',
        'description': 'yo yo yo',
        'time_estimate': 3,
        'phone_number': '8135009853',
        'location': 'Dwinelle',
        'remote': True,
        'urgency': 5,
        'start_time': '1417150714005' #JS UTC
        })
    response = test_app.post(requests_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 403)
    get_response_error = json.loads(response.data)['errors']
    skill_name = 'CS10'
    eq_(get_response_error, \
        ['You already have a pending request for ' + skill_name.upper() + \
        '. Please cancel your current one or wait for a tutor for the other one.'
        ])

################################
# GET api/requests/id #
################################
def test_get_request_details_invalid_request_id():
    invalid_request_id = 10000
    requests_url_id = requests_url + '/' + str(invalid_request_id)
    response = test_app.get(requests_url_id)
    eq_(response.status_code, 400)

def test_get_request_details_valid_user():
    #login this tutor
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

    requests_url_id = requests_url + '/' + str(1)
    response = test_app.get(requests_url_id)
    eq_(response.status_code, 200)

def test_get_request_details_invalid_user():
    #Create new tutor who shouldn't be able to access this request.
    tutor = User.create_user(name='Howie Mandell', email='howie@uguru.me', password='howizzle')
    
    #login this tutor
    json_data = json.dumps({'email':'howie@uguru.me', 'password':'howizzle'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful
    eq_(response.status_code, 200)


    requests_url_id = requests_url + '/' + str(1)
    response = test_app.get(requests_url_id)
    eq_(response.status_code, 403)

####################################
# PUT api/requests/id/tutor_accept #
####################################

def test_put_request_by_id_tutor_accept_invalid_request_id():
    invalid_request_id = 10000
    requests_url_id = requests_url + '/' + str(invalid_request_id) + '/tutor_accept'
    response = test_app.put(requests_url_id)
    eq_(response.status_code, 400)

def test_put_request_by_id_tutor_accept_inactive_tutor():
    #Tutor login for unapproved tutor
    json_data = json.dumps({'email':'howie@uguru.me', 'password':'howizzle'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful
    eq_(response.status_code, 200)

    requests_url_id = requests_url + '/' + str(1) + '/tutor_accept'
    response = test_app.put(requests_url_id)
    eq_(response.status_code, 403)

def test_put_request_by_id_tutor_accept_invalid_parameters():
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'cameron1@uguru.me', 'password':'ehrlich1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    requests_url_id = requests_url + '/' + str(2) + '/tutor_accept'
    
    #Missing status
    json_data = json.dumps({
        'description': 5,
        })
    response = test_app.put(requests_url_id, data=json_data, content_type='application/json')
    eq_(response.status_code, 422)

def test_put_request_by_id_tutor_accept_valid_parameters():
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'cameron1@uguru.me', 'password':'ehrlich1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    requests_url_id = requests_url + '/' + str(2) + '/tutor_accept'
    
    
    json_data = json.dumps({
        'description': 5,
        'status': 'accept'
        })
    response = test_app.put(requests_url_id, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

    get_response_data = json.loads(response.data)
    
    #Check if interested tutors for request is updated
    eq_(len(get_response_data['interested_tutors']), 1)    


######################################
# PUT api/requests/id/student_accept #
######################################

def test_put_request_by_id_student_accept_invalid_request_id():
    invalid_request_id = 10000
    requests_url_id = requests_url + '/' + str(invalid_request_id) + '/student_accept'
    response = test_app.put(requests_url_id)
    eq_(response.status_code, 400)


def test_put_request_by_id_student_accept_invalid_user():
    requests_url_id = requests_url + '/' + str(2) + '/student_accept'
    response = test_app.put(requests_url_id)
    eq_(response.status_code, 403)

def test_put_request_by_id_student_accept_invalid_parameters():
    
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    #Missing tutor_server_id
    json_data = json.dumps({
        'status': 'accept'
        })

    requests_url_id = requests_url + '/' + str(2) + '/student_accept'
    response = test_app.put(requests_url_id, data=json_data, content_type='application/json')
    eq_(response.status_code, 422)

def test_put_request_by_id_student_accept_valid_parameters_invalid_tutor():
    
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    #invalid tutor server_id
    json_data = json.dumps({
        'status': 'accept',
        'tutor_server_id': 3
        })

    requests_url_id = requests_url + '/' + str(2) + '/student_accept'
    response = test_app.put(requests_url_id, data=json_data, content_type='application/json')
    eq_(response.status_code, 403)

def test_put_request_by_id_student_accept_valid_parameters_valid_tutor():
    
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    #invalid tutor server_id
    json_data = json.dumps({
        'status': 'accept',
        'tutor_server_id': 2
        })

    requests_url_id = requests_url + '/' + str(2) + '/student_accept'
    response = test_app.put(requests_url_id, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

####################################
# GET api/users/id/conversations #
####################################

def test_get_conversations_invalid_user():
    invalid_student_id = 10000
    conversations_url = BASE_WEB_API_URL + 'users/' + str(invalid_student_id) + '/conversations'
    response = test_app.get(conversations_url)
    eq_(response.status_code, 403)

def test_get_conversations_valid_user():
    #Tutor login for approved tutor
    json_data = json.dumps({'email':'makhani@berkeley.edu', 'password':'makhani1'})
    response = test_app.get(login_url, data=json_data, content_type='application/json')
    
    # Login *should* be successful 
    eq_(response.status_code, 200)

    conversations_url = BASE_WEB_API_URL + 'users/' + str(1) + '/conversations'
    response = test_app.get(conversations_url)
    eq_(response.status_code, 200)

    get_response_data = json.loads(response.data)
    
    #Make sure there is only one conversation
    conversations_arr = get_response_data['conversations']
    eq_(len(conversations_arr), 1)    

######################################################
# GET, POST api/users/id/conversations/c_id/messages #
######################################################

def test_get_messages_invalid_conversation_id():
    valid_user_id = 1
    invalid_conversation_id = 10000
    messages_url = BASE_WEB_API_URL + 'users/' + str(valid_user_id) + '/conversations/' + str(invalid_conversation_id) + '/messages'
    response = test_app.get(messages_url)
    eq_(response.status_code, 400)

def test_get_messages_valid_conversation_id_no_messages():
    valid_user_id = 1
    valid_conversation_id = 1
    messages_url = BASE_WEB_API_URL + 'users/' + str(valid_user_id) + '/conversations/' + str(valid_conversation_id) + '/messages'
    response = test_app.get(messages_url)
    eq_(response.status_code, 200)

    get_response_data = json.loads(response.data)
    
    #Make sure there is only one conversation
    messages_arr = get_response_data['messages']
    eq_(len(messages_arr), 0)    

def test_post_message_invalid_payload():
    valid_user_id = 1
    valid_conversation_id = 1
    messages_url = BASE_WEB_API_URL + 'users/' + str(valid_user_id) + '/conversations/' + str(valid_conversation_id) + '/messages'
    json_data = json.dumps({'message_contents':'true'})
    response = test_app.post(messages_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 422)

def test_post_message_valid_payload():
    valid_user_id = 1
    valid_conversation_id = 1
    messages_url = BASE_WEB_API_URL + 'users/' + str(valid_user_id) + '/conversations/' + str(valid_conversation_id) + '/messages'
    json_data = json.dumps({'contents':'true'})
    response = test_app.post(messages_url, data=json_data, content_type='application/json')
    eq_(response.status_code, 200)

    get_response_data = json.loads(response.data)
    eq_(get_response_data['server_id'], 1)    

def teardown():
    os.remove('app.db')

