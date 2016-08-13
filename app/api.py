from app import app
from app.database import *
from lib.api_utils import *
from flask import jsonify, request, session, flash
from models import *
from hashlib import md5
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler as Scheduler

import os
import boto
import stripe
import json
import random
import views
import tasks
import logging

REQUEST_EXP_TIME_IN_SECONDS = 172800
TUTOR_ACCEPT_EXP_TIME_IN_SECONDS = 86400

PAYMENT_PLANS = {1:[45,50], 2:[170,200], 3:[800,1000], 4:[1500,10000]}
PACKAGE_HOME_PLANS = {0:[800, 1000], 1:[500, 600], 2:[170, 200], 3:[45, 50]}
PROMOTION_PAYMENT_PLANS = {0:[20, 25], 1:[45, 60], 2:[150, 200]}

####################
# Request REST API #
####################

@app.route('/api/v2/<school>/user', methods=['POST', 'GET'])
def request_school_api(school):
    if request.method == 'POST':

        #General login
        expected_parameters = ['email','password', 'university']
        request_json = request.json
        return_dict = {}

        if request_contains_all_valid_parameters(request_json, expected_parameters):
            
            email = request.json.get('email')
            password = request.json.get('password')

            # if email == 'admin@uguru.me' and password == 'launchuguru':
            #     error_msg = 'Logging into Admin...'
            #     session['admin'] = True
            #     return json_response(http_code=200, errors = [error_msg], redirect='admin')

            # If fields are left empty
            if not email or not password:
                return json_response(http_code=403, errors=["Please fill in required fields."])

            #Check if user exists in DB
            user = User.login_user(email, password)
            
            #If it does, send success to client to redirect to home
            if user:

                user.authenticate()
                return_dict = user.as_dict()
                return_dict['school'] = request_json.get('university')
                return json_response(200, return_dict)

            #Email doesn't exist
            elif User.does_email_exist(email):
                error_msg = 'Incorrect password. Please try again!'
                return json_response(http_code=403, errors=[error_msg])

            #Email does exist.
            else:
                error_msg = 'Email does not exist in our records. ' + \
                    'Please try again or create an account.'
                return json_response(http_code=403, errors=[error_msg])

        else:
            # Incorrect json payload
            error_msg = 'All valid parameters were not supplied.'
            return json_response(http_code=422, errors=[error_msg])

    return json_response(400)

@app.route('/api/v2/fb_connect', methods=['POST'])
def api_2_fb_connect():

    logging.info(request.json)

    user_from_fb_id = User.query.filter_by(fb_id=request.json.get("id")).first()

    # If we can find them by their fb_id, log them in!
    if user_from_fb_id:
        user_from_fb_id.authenticate();

        return_dict = user_from_fb_id.as_dict()
        return_dict['school'] = request.json.get('university')
        return json_response(200, return_dict)
    
    # If we can find them by email, but they don't have their fb_id set, we set in and log them in
    user_from_email = User.query.filter_by(email=request.json.get("email")).first()
    if user_from_email: 
        # Update the user with new information from facebook.
        user_from_email.fb_id = request.json.get("id")
        user_from_email.gender = request.json.get("gender")
        user_from_email.profile_url = request.json.get("profile_url")
        user_from_email.fb_account = True;
        db_session.commit()
        user_from_email.authenticate();
        return_dict = user_from_email.as_dict()
        return_dict['school'] = request_json.get('university')
        return json_response(200, return_dict)

    else:
        return json_response(400)

@app.route('/api/v2/<school>/user/<user_id>', methods=["DELETE", 'PUT'])
def request_school_api_user(school, user_id):
    if request.method == 'DELETE':
        
        if session.get('user_id'):
            print "request received", user_id

            session.pop('user_id')

            return_dict = {}
            return_dict['school'] = school

            return json_response(200, return_dict)
    return json_response(400)




# General request route
# POST creates a new request
# TODO: GET returns a users requests 
@app.route('/api/v1/requests', methods=['POST'])
def request_web_api():

    user = current_user()
    if not user:
        return json_response(http_code=401)

    expected_parameters = ['skill_name', 'description', 'time_estimate','phone_number', 'location', 'urgency', 'is_urgent', 'start_time']
    if not request_contains_all_valid_parameters(request.json, expected_parameters):
        return json_response(422, errors=["Not all required parameters were supplied."])
    
    # Check if this skill is registed in our DB
    skill_name = request.json.get('skill_name')
    skill = Skill.get_skill_from_name(skill_name)
    if not skill: 
        # TODO : this should still be logged in mixpanel!
        error_msg = 'Sorry! This is not a supported skill, please choose one from the dropdown.'
        return json_response(http_code=403, errors=[error_msg])

    # Make sure they don't already a pending request for a skill
    if user.already_has_pending_request_for_skill(skill):
        error_msg = 'You already have a pending request for ' + skill_name.upper() + \
            '. Please cancel your current one or wait for a tutor for the other one.'
        return json_response(http_code=403, errors=[error_msg])
    
    # Make sure user is not a tutor for this skill
    if skill in user.skills:
        error_msg = "You're already a tutor for " + skill_name.upper() + '!'
        return json_response(http_code=403, errors=[error_msg])

    # Create a request
    from lib.utils import js_date_to_python_datetime # TODO : This isn't being used, ***
    
    is_urgent = urgency = request.json.get("is_urgent")

    user.phone_number = request.json.get('phone_number')

    _request = Request.create_request(
            student = user,
            skill_id = skill.id,
            description = request.json.get('description'),
            time_estimate = request.json.get('time_estimate'),
            location = request.json.get('location'),
            remote = request.json.get('remote'),
            is_urgent = is_urgent, # TODO : probably don't need to convert to int first, but lets be safe
            urgency = int(urgency), # TODO : Depricate
            start_time = request.json.get('start_time') # TODO : *** should be used here
        )

    # Check if there are no tutors
    if _request.get_tutor_count() == 0:
        error_msg = "We have no tutors for " + skill_name.upper()
        return json_response(http_code=200, errors=[error_msg], redirect='no-tutors')

    # Begin contacting qualified tutors
    # tasks.contact_qualified_tutors.delay(_request.id)
    tasks.send_student_request.delay(_request.id)

    # OK we are FINALLY good to send the return dictionary back to the 
    user.add_request_to_pending_requests(_request)
    request_return_dict = _request.get_return_dict(skill, user)
    return json_response(http_code=200, return_dict=request_return_dict)


# Specific support route
# GET returns details of a request 
# PUT cancels a request 
@app.route('/api/v1/requests/<request_id>', methods=['GET', 'PUT'])
def request_by_id_web_api(request_id):
    
    user = current_user()
    if not user:
        return json_response(http_code=401)

    #Get request by ID
    _request = Request.get_request_by_id(request_id)

    #check if this request_id is valid
    if not _request:
        return json_response(http_code=400)
        
    if request.method == 'GET':

        expected_parameters = ['description', 'status']
        
        request_return_dict = _request.get_return_dict()
        return json_response(http_code = 200, return_dict = request_return_dict)

    if request.method == 'PUT':
        
        request_json = request.json
        put_action = request_json['action']

        # if student cancels request
        if put_action == 'cancel':
            expected_parameters = ['action', 'description']
            #invalid payload
            if not request_contains_all_valid_parameters(request_json, expected_parameters):
                return json_response(422)

            _request.cancel(user, request.json.get('description'))
            flash('Your request has been successfully canceled.')

        # Guru cancels a pending session
        # TODO: they should be penalized.
        if put_action == 'guru-cancel':
            expected_parameters = ['action', 'description', 'tutor_server_id']
            #invalid payload
            if not request_contains_all_valid_parameters(request_json, expected_parameters):
                return json_response(422)

            _request.guru_cancel(user.id, request.json.get('description'))
            flash('Your request has been successfully canceled.')

        
        #Guru accepts a student request. 
        if put_action == 'guru-accept':
            _request.process_tutor_acceptance(user, request.json.get('description'))
            flash('Request successfully sent to student! We have texted '\
                    + _request.get_student().get_first_name() + ', who will get back'\
                    + 'to you they like your profile.')

        # Guru rejects incoming student request.
        # TODO: Active gurus should be rewarded
        if put_action == 'guru-reject':
            # TODO MP: Record this!
            if request_json.get('description'):
                flash('Request successfully rejected! Thank you for your feedback')
            else:
                flash('Request successfully rejected!')

            _request.process_tutor_reject(user.id)

        
        # Student accepts guru 
        if put_action == 'student-accept':
            expected_parameters = ['action', 'tutor_id']
            
            #invalid payload
            if not request_contains_all_valid_parameters(request_json, expected_parameters):
                return json_response(422)

            tutor_id = request.json.get('tutor_id')
            tutor = User.get_user(tutor_id)
            
            _request.process_student_acceptance(tutor)

        #If student rejects guru
        if put_action == 'student-reject':

            expected_parameters = ['action', 'description', 'tutor_server_id']
            
            #invalid payload
            if not request_contains_all_valid_parameters(request_json, expected_parameters):
                return json_response(422)

            _request.process_student_reject(request.json.get('tutor_server_id'))

        #Guru confirms session, student is charged, guru is paid.
        if put_action == 'guru-confirm':
            expected_parameters = ['action', 'minutes', 'hours']
            
            if not request_contains_all_valid_parameters(request_json, expected_parameters):
                error_msg = "Please fill in all fields"
                return json_response(http_code=422, errors=[error_msg])

            minutes = request_json.get('minutes')
            hours = request_json.get('hours')

            # TODO : Delay this function to tasks.py
            _request.process_tutor_confirm(hours, minutes)

        request_return_dict = _request.get_return_dict()
        return json_response(http_code = 200, return_dict = request_return_dict)


    return json_response(400)


###### /requests/id/student_accept ########
# PUT updates the request accordingly for a studnet accepting a request
@app.route('/api/v1/requests/<request_id>/student_accept', methods=['PUT'])
def request_by_id_student_accept_web_api(request_id):
    

    if request.method == 'PUT':

        expected_parameters = ['status', 'tutor_server_id']
        request_json = request.json

        user = current_user()
        if not user:
            return json_response(http_code=401)

        #Get request by ID
        _request = Request.get_request_by_id(request_id)
        
        #check if this request_id is valid
        if not _request:
            return json_response(http_code=400)

        #Check sure user is the student for this request
        if user != _request.get_student():
            return json_response(http_code=403)

        #Check payload for valid parameters
        if request_contains_all_valid_parameters(request_json, expected_parameters):

            #Check if tutor server_id is a committed tutor
            tutor = User.current_user(_id=request_json.get('tutor_server_id'))
            if tutor not in _request.get_interested_tutors():
                return json_response(http_code=403)                

            #If a student accepts request
            if request_json.get('status') == 'accept':
                _request.process_student_acceptance(tutor)
            
            #If student rejects the request
            else:
                _request.process_student_reject(tutor)
                pass

            #Return relevant dict
            request_return_dict = _request.get_return_dict()
            return json_response(http_code = 200, return_dict = request_return_dict)

        else:
            # Incorrect json payload
            return json_response(422)

    #Default response
    return json_response(400)



#################
# User REST API #
#################

###### /signup ########
# POST - creates a new user and logs them in
@app.route('/api/v1/signup', methods=['POST'])
def api_signup():

    if request.method == 'POST':
        
        expected_parameters = ['name','email','password']

        if request_contains_all_valid_parameters(request.json, expected_parameters):
            name = request.json.get('name').title()
            email = request.json.get('email')
            password = request.json.get('password')
            # If fields are left empty
            if not name or not email or not password:
                return json_response(http_code=403, errors=["Please fill in required fields."])
            
            errors = []

            # Check if user with this email already exists
            if User.does_email_exist(email):
                errors.append("Email address is already in use.")

            # TODO : Implement email validation? (*.edu, contains "@", etc...)
            # if User.is_valid_email(email):
            #     errors.append("Password must contain at least 6 characters, one uppercase letter, and one special character.")

            # TODO : Implement password validation
            # if User.is_valid_password(password):
            #     errors.append("Password must contain at least 6 characters, one uppercase letter, and one special character.")

            if errors:
                return json_response(http_code=403, errors=errors)
            else:
                user = User.create_user(name=name, email=email, password=password)
                if user:
                    user.authenticate()
                    return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)
                else:
                    return json_response(http_code=403, errors=["Could not create user."])
        
        elif request.json.get('no_pwd_user') and session.get('email_user_id'):
            
            expected_parameters.append('no_pwd_user')

            if request_contains_all_valid_parameters(request.json, expected_parameters):
                from hashlib import md5 
                user_id = int(session.get('email_user_id'))
                user = User.query.get(user_id)

                user.name = request.json.get('name')
                user.password = md5(request.json.get('password')).hexdigest()
                commit_to_db()
                user.authenticate()
                session.pop('email_user_id')
                return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        else:
            return json_response(http_code=422, errors=["Required parameters not supplied."])

    return json_response(http_code=400, errors=["Request method not supported."])

###### /fb_connect ########
# POST - Checks for exsisting user, or begins creation of new one.
@app.route('/api/v1/fb_connect', methods=['POST'])
def api_fb_connect():

    logging.info(request.json)

    user_from_fb_id = User.query.filter_by(fb_id=request.json.get("id")).first()

    # If we can find them by their fb_id, log them in!
    if user_from_fb_id:
        user_from_fb_id.authenticate();
        return json_response(http_code=200)
    
    # If we can find them by email, but they don't have their fb_id set, we set in and log them in
    user_from_email = User.query.filter_by(email=request.json.get("email")).first()
    if user_from_email: 
        # Update the user with new information from facebook.
        user_from_email.fb_id = request.json.get("id")
        user_from_email.gender = request.json.get("gender")
        user_from_email.profile_url = request.json.get("profile_url")
        user_from_email.fb_account = True;
        db_session.commit()
        user_from_email.authenticate();
        return json_response(http_code=200)

    # If we can't find them, create a new user
    new_user = User.create_user(
        name=request.json.get("name"), 
        email=request.json.get("email"),
        password=None,
        profile_url=request.json.get("profle_url"),
        fb_id=request.json.get("id"),
        gender=request.json.get("gender"))

    if not new_user:
        return json_response(http_code=400, errors=["Couldn't create new user."]) # TODO : Use correct http status code?
    else:
        return json_response(http_code=200)

##### /login/ ########
# POST - logs user in
@app.route('/api/v1/login', methods = ['POST', 'PUT'])
def api_login():
    
    if request.method == 'POST':

        #General login
        expected_parameters = ['email','password']
        request_json = request.json
        return_dict = {}

        if request_contains_all_valid_parameters(request_json, expected_parameters):
            
            email = request.json.get('email')
            password = request.json.get('password')

            if email == 'admin@uguru.me' and password == 'launchuguru':
                error_msg = 'Logging into Admin...'
                session['admin'] = True
                return json_response(http_code=200, errors = [error_msg], redirect='admin')

            # If fields are left empty
            if not email or not password:
                return json_response(http_code=403, errors=["Please fill in required fields."])

            #Check if user exists in DB
            user = User.login_user(email, password)
            
            #If it does, send success to client to redirect to home
            if user: 
                

                if session.get('request-redirect'):
                    user.authenticate()
                    error_msg = session.get('request-redirect')
                    return json_response(http_code=200, errors = [error_msg], redirect='request')

                if session.get('request-redirect'):
                    user.authenticate()
                    error_msg = session.get('request-profile')
                    return json_response(http_code=200, errors = [error_msg], redirect='profile')

                user.authenticate()
                return_dict = DEFAULT_SUCCESS_DICT 
                return json_response(200, return_dict)

            #Email doesn't exist
            elif User.does_email_exist(email):
                error_msg = 'Incorrect password. Please try again!'
                return json_response(http_code=403, errors=[error_msg])

            #Email does exist.
            else:
                error_msg = 'Email does not exist in our records. ' + \
                    'Please try again or create an account.'
                return json_response(http_code=403, errors=[error_msg])

        else:
            # Incorrect json payload
            error_msg = 'All valid parameters were not supplied.'
            return json_response(http_code=422, errors=[error_msg])


    if request.method == 'PUT':

        expected_parameters = ['email','action']
        request_json = request.json
        return_dict = {}

        if request_contains_all_valid_parameters(request_json, expected_parameters):

            if request_json.get('action') == 'reset-password':
                
                email = request_json.get('email')

                #Check if email exists
                user = User.does_email_exist(email)

                if user:
                    from emails import reset_password_email
                    from hashlib import md5
                    
                    #Make the password the hash of their ID
                    reset_password_email(user)
                    user.password = md5(str(user.id)).hexdigest()
                    commit_to_db()

                    return_dict = DEFAULT_SUCCESS_DICT 
                    return json_response(200, return_dict)

                else:
                    error_msg = 'Email does not exist in our records. ' + \
                    'Please try again or create an account.'
                    return json_response(http_code=403, errors=[error_msg])

        else:
            # Incorrect json payload
            error_msg = 'All valid perameters were not supplied.'
            return json_response(http_code=422, errors=[error_msg])


    return json_response(http_code=400)

##### /user/<user_id> #####
# PUT updates a user
# DELETE deletes a user (TODO Later)
@app.route('/api/v1/users/<user_id>', methods = ['PUT', 'POST','DELETE'])
def users_by_id_web_api(user_id):
    
    if request.method == 'PUT':

        request_json = request.json

        user = current_user()
        if not user:
            return json_response(http_code=401)

        #Check if user_id is session['user_id'] 
        if int(user_id) != user.id:
            return json_response(http_code=403)

        if not request_json:
            return json_response(http_code=422)

        if request_json.get('add_card'):

            token = request.json.get('add_card')
            result = user.add_payment_card(token)

            #If we successfully can charge them in the future ;)
            if result:
                return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

            else:    
                error_msg = 'Card was declined, please try again'
                return json_response(http_code=403, errors=[error_msg])


        if request_json.get('add_debit_card'):

            token = request.json.get('add_debit_card')
            result = user.add_cashout_card(token)

            if result:
                return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)                

            else:
                error_msg = 'Please enter a debit card. Not a credit card'
                return json_response(http_code=403, errors=[error_msg])

        if request_json.get('guru-cashout'):

            user.cashout_balance()

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        if request_json.get('action') == 'become-guru':

            if not request_json.get('tutor_introduction') and \
            not request_json.get('tutor_major'):
                return json_response(http_code=422)

            flash('Wecome to the Guru interface. Check out our getting started guide.')
            user.become_a_guru(request.json.get('tutor_introduction'),\
                request.json.get('tutor_major'))

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        if request_json.get('action') == 'update-guru-profile':

            if not request_json.get('tutor_introduction') and \
            not request_json.get('tutor_major'):
                return json_response(http_code=422)

            
            print request_json
            user.become_a_guru(request.json.get('tutor_introduction'),\
                request.json.get('tutor_major'))

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        if request_json.get('action') == 'update-student-profile':

            if not request_json.get('tutor_introduction') and \
            not request_json.get('student_major'):
                return json_response(http_code=422)

            user.major = request_json.get('student_major')
            commit_to_db()

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        if request_json.get('action') == 'change-password':

            if not ('old_pwd' in request_json and 'new_pwd' in request_json \
                and 'confirm_pwd' in request_json):
                return json_response(http_code=422)

            from hashlib import md5

            if md5(request.json.get('old_pwd')).hexdigest() != user.password:
                error_msg = 'You entered the wrong password. Please try again.'
                return json_response(http_code=403, errors=[error_msg])

            if request_json.get('confirm_pwd') != request_json.get('new_pwd'):
                error_msg = 'Your new passwords do not match! Please try again.'
                return json_response(http_code=403, errors=[error_msg])

            user.password = User.encrypted_password(request.json.get('confirm_pwd'))
            commit_to_db()

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        if request_json.get('action') == 'reset-password':
            
            if not ('new_pwd' in request_json \
                and 'confirm_pwd' in request_json):
                return json_response(http_code=422)

            from hashlib import md5

            if request_json.get('confirm_pwd') != request_json.get('new_pwd'):
                error_msg = 'Your new passwords do not match! Please try again.'
                return json_response(http_code=403, errors=[error_msg])

            user.password = User.encrypted_password(request.json.get('confirm_pwd'))
            commit_to_db()

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)


        if request_json.get('action') == 'support':
            
            if not request_json.get('description'):
                error_msg = 'Please type in a description!'
                return json_response(http_code=403, errors=[error_msg])


            from emails import send_support_email
            send_support_email(user, request_json.get('description'), \
                request_json.get('urgency'))
            flash("Thank you for taking the time! We'll get back to you as soon as possible.")
            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)


        #For settings, like emails, phone-number, etc
        if request_json.get('update_attribute'):

            if request_json.get('update_attribute') == 'text-notification':
                user.text_notification = request_json.get('value')
                commit_to_db()
                return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

            if request_json.get('update_attribute') == 'email-notification':
                user.email_notification = request_json.get('value')
                commit_to_db()
                return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

        #Save the year of the student / guru as soon as they click the option.
        if request_json.get('year'):
            user.year = request_json.get('year')
            commit_to_db()
            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)


        if request_json.get('account_details'):

            # Always required for a user.
            if not request_json.get('name') or not request_json.get('email'):
                error_msg = 'Name and email are required fields.'
                return json_response(http_code=403, errors=[error_msg])

            if request_json.get('phone_number'):
                user.phone_number = request_json.get('phone_number')

            if request_json.get('email'):
                user.email = request_json.get('email')

            if request_json.get('name'):
                user.name = request_json.get('name')                

            commit_to_db()

            return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

    return json_response(400)
        
    

# List of active requests for a user Route 
# GET returns a list of active requests
@app.route('/api/v1/users/<user_id>/active_requests', methods = ['GET'])
def users_by_id_active_requests_web_api(user_id):
    # Add all user settings here.
    pass

# User All Conversations Route
# GET returns a list of conversations for a user
@app.route('/api/v1/users/<user_id>/conversations', methods = ['GET'])
def users_by_id_conversations_web_api(user_id):
    
    if request.method == 'GET':

        user = current_user()
        if not user:
            return json_response(http_code=401)

        #Check if user_id is session['user_id'] 
        if int(user_id) != user.id:
            return json_response(http_code=403)

        #Return list of conversations
        conversations_dict = user.get_all_conversations(_dict=True)
        return json_response(200, conversations_dict)

    #Default response
    return json_response(400)
    
# User Specific Conversation Route
# GET Returns all messages (sorted by time) for a conversation
# POST allows a user to create a message
# PUT Pings a tutor, Makes a conversation inactive
@app.route('/api/v1/users/<user_id>/conversations/<conversation_id>/messages', methods = ['GET', 'POST', 'PUT'])
def users_by_id_address_book(user_id, conversation_id):

    user = current_user()
    if not user:
        return json_response(http_code=401)

    #Check if user_id is session['user_id'] 
    if int(user_id) != user.id:
        return json_response(http_code=403)

    #Check if conversation_id is valid
    conversation = Conversation.get_conversation(int(conversation_id))
    if not conversation:
        return json_response(http_code=400)

    if request.method == 'GET':

        messages_dict = conversation.get_all_messages(_dict=True)
        return json_response(200, messages_dict)

    if request.method == 'POST':
        
        request_json = request.json
        expected_parameters = ['contents']

        #If invalid payload
        if not request_contains_all_valid_parameters(request_json, expected_parameters):
            return json_response(http_code=422)

        message = Message.create_message(
            contents = request.json.get('contents'),
            conversation = conversation,
            sender = user
            )
        message_dict = message.as_dict()
        return json_response(http_code=200, return_dict=message_dict)

    #TODO: Figure out workflow for this
    if request.method == 'PUT':
        return json_response(400)
    
    return json_response(400)

# Customer credit/debit card route
# POST adds card
# PUT updates a card
# DELETE removes a card (TODO LATER)
@app.route('/api/v1/users/<user_id>/customer', methods = ['GET'])
def users_by_id_customer_web_api(user_id):
    pass

# Recipient debit card route
# POST adds card
# PUT updates a card
# DELETE removes a card (TODO LATER)
@app.route('/api/v1/users/<user_id>/recipient', methods = ['GET'])
def users_by_id_recepient_web_api(user_id):
    pass

# User transaction history route
# GET returns list of transactions
@app.route('/api/v1/users/<user_id>/transactions', methods = ['GET'])
def users_by_id_transactions_web_api(user_id):
    pass

# User logout route
# GET logs out the user
@app.route('/api/v1/logout', methods = ['DELETE'])
def users_logout_web_api():
    if request.method == 'DELETE':
        
        user = current_user()
        if not user:
            return json_response(http_code=401)

        if session.get('user_id'):
            session.pop('user_id')
        return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)




# User reset password route
# POST updates a password
# GET sends an email to the user to reset the password
@app.route('/api/v1/reset_password', methods = ['GET', 'POST'])
def users_reset_password_web_api():
    pass

########################
# Ratings REST Web Api #
########################

# PUT Updates a Rating
# GET Returns a list of Ratings & Average (TODO Later)
@app.route('/api/v1/ratings/<_id>', methods = ['PUT'])
def ratings_web_api(_id):    
    
    user = current_user()
    if not user:
        return json_response(http_code=401)

    if request.method == 'PUT':
        
        request_json = request.json

        if 'rating' not in request_json:
            return json_response(http_code=422)

        rating = Rating.query.get(_id)
        
        #student is submitting guru rating
        if user.id == rating.student_id:
            rating.update_guru_rating(request_json.get('rating'))

        #guru is submitting student rating
        if user.id == rating.tutor_id:
            rating.update_student_rating(request_json.get('rating'))

        return json_response(http_code=200, return_dict=DEFAULT_SUCCESS_DICT)

    return json_response(400)


########################
# Support REST Web Api #
########################

# POST Submits a general support request
@app.route('/api/v1/support/', methods = ['POST'])
def support_web_api():
    pass

# POST Submits a general support refund request
@app.route('/api/v1/support/refund/', methods = ['POST'])
def support_web_api():
    pass

############################
# END New RESFTUL Web API. #
############################


##############################
# START Old RESFTUL Web API. #
##############################

@app.route('/api/<arg>', methods=['GET', 'POST', 'PUT'], defaults={'_id': None})
@app.route('/api/<arg>/<_id>')
def api(arg, _id):
    return_json = {}
    ajax_json = request.json
    logging.info(ajax_json)

    #for local testing purposes

    if not os.environ.get('PRODUCTION'):
        logging.info(request.method + "-" + request.url)

    if arg == 'forgot_password' and request.method == 'POST':
        email = request.json.get("email").lower()

        u = User.query.filter_by(email=email).first()
        if not u:
            return errors(["There is no account with this email. Please try again or signup!"])
        else:
            from emails import generate_new_password
            from app.static.data.random_codes import random_codes_array
            new_password = random.choice(random_codes_array).lower()
            logging.info(new_password)
            email = ajax_json['email'].lower()
            u.password = md5(new_password).hexdigest()
            generate_new_password(u, new_password)
            logging.info("reset email sent to " + email + " " + new_password)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
        response = {"forgot_password":"success"}
        return jsonify(response)


    if arg == 'sign_up' and request.method == 'POST': 

        email = request.json.get("email").lower()
        password = request.json.get("password")
        phone_number = email
        name = request.json.get("name")

        u = User.query.filter_by(email=ajax_json['email']).first()
        if u and not u.fb_account:
            return errors(["This email already exists. Please try logging in!"])
        
        new_user, mailbox = create_user(email, password, phone_number, name)

        #Generate new notifications for them
        from notifications import getting_started_student, getting_started_student_tip
        notification = getting_started_student(new_user)
        notification2 = getting_started_student_tip(new_user)
        new_user.notifications.append(notification)
        new_user.notifications.append(notification2)
    
        try:
            db_session.add_all([new_user, mailbox, notification, notification2])
            db_session.commit()
        except:
            db_session.rollback()
            raise
            # return errors(["Email already in use"])

        response = {"user":{
                            "server_id": new_user.id,
                            "email": new_user.email,
                            "name": new_user.name,
                            "auth_token": new_user.auth_token
                            }
                    }

        return jsonify(response)

    # sign_in logic
    if arg == 'sign_in' and request.method == 'POST':
        from hashlib import md5
        email = request.json.get("email").lower()
        password = md5(request.json.get("password")).hexdigest()
        
        user = User.query.filter_by(email=email, password=password).first()

        if user:
            user.auth_token = "%032x" % random.getrandbits(128);
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                return errors(["Invalid username or password"])

            response = {"user":{
                                "server_id": user.id,
                                "email": user.email,
                                "name": user.name,
                                "auth_token": user.auth_token
                                }
            }

            return jsonify(response)
        return errors(["User or password were not correct"])

    if arg =='stripe_token' and request.method == 'POST':
        user = current_user()
        if user:
            user_token = request.json.get('stripe-token') # TODO : assigned but never used
            customer = stripe.Customer.create(
                email = user.email,
                card = stripe_user_token # TODO : should this be user_token? 
                )

            user.customer_id = customer.id
            user.customer_last4 = customer['cards']['data'][0]['last4']
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {"user": user.__dict__}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'deactivate_account' and request.method == 'POST':
        user = current_user()
        if user:
            user.email = user.email + '-REMOVED'
            session.pop('user_id')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {"user": user.__dict__}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(['Invalid Token'])

    if arg == 'unconfirm_meeting' and request.method == 'POST':
        user = current_user()
        if user:
            request_id = request.json.get('payment_id')
            
            if request_id == 'None':
                return errors(["Something went wrong... please contact customer support below immediately."])

            r = Request.query.get(request_id)
            relevant_notifications = Notification.query.filter_by(custom_tag='confirm-meeting', request_id=request_id).all()

            logging.info("# of relevant notifications " + str(len(relevant_notifications)))
            logging.info(relevant_notifications)
            
            student_notif = None
            tutor_notif = None
            tutor = User.query.get(r.connected_tutor_id)
            student = User.query.get(r.student_id)
            for n in relevant_notifications:
                if student.name.split(' ')[0].title() in n.feed_message:
                    tutor_notif = n
                else:
                    student_notif = n

            logging.info(student_notif.feed_message)
            logging.info(tutor_notif.feed_message)

            tutor_notif.time_read = None
            student_notif.time_read = None
            tutor_notif.time_created = datetime.now()
            student_notif.time_created = datetime.now()

            payment = Payment.query.filter_by(student_id=r.student_id, tutor_id=r.connected_tutor_id).first()
            if payment:
                payment.tutor_confirmed = None
            student.notifications.append(student_notif)
            tutor.notifications.append(tutor_notif)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            for n in student.notifications:
                if n.custom_tag == 'next-time' and request_id == n.request_id:
                    logging.info("student notification removed")
                    logging.info(n.feed_message)
                    student.notifications.remove(n)

            for n in tutor.notifications:
                if n.custom_tag == 'next-time' and request_id == n.request_id:
                    logging.info(n.feed_message)
                    logging.info("tutor notification removed")
                    tutor.notifications.remove(n)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {"user": user.__dict__}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(["Invalid Token"])

    if arg == 'confirm_meeting' and request.method == 'POST':
        user = current_user()
        if user:
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            notification = user_notifications[request.json.get('notification-id')]
            r = Request.query.get(notification.request_id)
            user.notifications.remove(notification)
            student = User.query.get(r.student_id)
            tutor = User.query.get(r.connected_tutor_id)
            next_time_flag_student = False
            next_time_flag_tutor = False

            #check tutor is confirming
            if r.connected_tutor_id == user.id:
                logging.info("tutor is confirming")
                for n in student.notifications:
                    if n.custom_tag =='confirm-meeting' and n.request_id == r.id:
                        student.notifications.remove(n)

                    if n.custom_tag == 'next-time' and n.request_id == r.id:
                        next_time_flag_tutor = True

                flash('We have sent a notification to ' + student.name.split(" ")[0].title() + ' to confirm the time amount.')

            else: #student is confirming
                logging.info("student is confirming")
                for n in tutor.notifications:
                    if n.custom_tag =='confirm-meeting' and n.request_id == r.id:
                        tutor.notifications.remove(n)                    

                    if n.custom_tag == 'next-time' and n.request_id == r.id:
                        next_time_flag_student = True

                flash('We have sent a notification to ' + tutor.name.split(" ")[0].title() + ' to confirm the time amount.')



            payment = Payment.query.filter_by(student_id = student.id, tutor_id = tutor.id).first()
            payment.tutor_confirmed = False

            from notifications import next_time_student_notif, next_time_tutor_notif
            
            if not next_time_flag_student:
                next_time_student = next_time_student_notif(student, tutor, r)    
                student.notifications.append(next_time_student)
                db_session.add(next_time_student)
            
            if not next_time_flag_tutor:
                next_time_tutor = next_time_tutor_notif(student, tutor, r)
                tutor.notifications.append(next_time_tutor)
                db_session.add(next_time_tutor)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {"user": user.__dict__}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(["Invalid Token"])

    if arg == 'notifications' and request.method == 'GET' and _id == None:
        user = current_user()
        if user:
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created, reverse=True)
            user_notifications_arr = []
            # user_notifications_arr = [n.__dict__  for n in user_notifications]
            tutor_tags = ['tutor-request-offer', 'getting-started-tutor', 'tutor-receive-payment', 'tutor-cashed-out']
            student_tags = ['student-request-help', 'student-payment-approval', 'student-incoming-offer'] # TODO : assigned but unused

            for n in user_notifications:
                n_dict = sanitize_dict(n.__dict__)
                if n.custom_tag in tutor_tags:
                    n_dict['role'] = 'guru'
                else:
                    n_dict['role'] = 'student'
                

                if n.custom and n.custom == 'tutor-accept-request':
                    n_dict['type'] = n.custom
                elif n.custom and n.custom =='student-accept-request':
                    n_dict['type'] = 'student-match'
                elif n.custom and n.custom =='tutor-is-matched':
                    n_dict['type'] = 'tutor-match'
                else:
                    n_dict['type'] =  n.custom_tag

                if n.request_id:
                    r = Request.query.get(n.request_id)
                    if n.custom_tag == 'student-request-help': 
                        seconds_since_creation = get_time_diff_in_seconds(datetime.now(), n.time_created)
                        if r.student_id == r.connected_tutor_id:
                            n_dict['status'] = 'canceled'
                        elif r.connected_tutor_id:
                            n_dict['status'] = 'connected'
                        elif user in r.requested_tutors and r.connected_tutor_id and user.id != r.connected_tutor_id:
                            n_dict['status'] = 'taken'    
                        elif seconds_since_creation > REQUEST_EXP_TIME_IN_SECONDS:
                            n_dict['status'] = 'EXPIRED'
                        else:
                            n_dict['status'] = get_time_remaining(REQUEST_EXP_TIME_IN_SECONDS - seconds_since_creation)

                    if n.custom_tag == 'student-incoming-offer':
                        seconds_since_creation = get_time_diff_in_seconds(datetime.now(), n.time_created)
                        if seconds_since_creation > TUTOR_ACCEPT_EXP_TIME_IN_SECONDS:
                            n_dict['status'] = 'EXPIRED'
                        else:
                            n_dict['status'] = get_time_remaining(TUTOR_ACCEPT_EXP_TIME_IN_SECONDS - seconds_since_creation)

                if n.payment_id:
                    p = Payment.query.get(n.payment_id)
                    n_dict['status'] = 'active'
                    if n.time_read:
                        n_dict['status'] = 'inactive'

                n_dict['feed_message'] = n_dict['feed_message'].replace('<b>', '').replace('</b>', '')
                if n_dict.get('feed_message_subtitle'):
                    n_dict.pop('feed_message_subtitle')
                if n_dict.get('id'):
                    n_dict['server_id'] = n_dict.pop('id') 

                user_notifications_arr.append(n_dict)

            response = {"notifications": user_notifications_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'read-notification' and _id != None and request.method == 'PUT':
        user = current_user()
        if user:
            n = Notification.query.get(_id)
            n.time_read = datetime.now()
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            response = {'notification': n.__dict__}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'cash_out' and _id == None and request.method == 'POST':
        user = current_user()
        if user:
            transfer = stripe.Transfer.create(
                amount=int(user.balance * 100), # amount in cents, again
                currency="usd",
                recipient=user.recipient_id
            )

            p = Payment()

            p.time_created = datetime.now()
            p.stripe_recipient_id = transfer['id']
            p.tutor_received_amount = user.balance
            p.tutor_description = 'You cashed out $' + str(user.balance) + ' to your account'

            user.payments.append(p)

            db_session.add(p)

            from notifications import tutor_cashed_out
            notification = tutor_cashed_out(user, user.balance)
            db_session.add(notification)

            notification.status = 'Pending'
            notification.skill_name = 'Pending'

            user.notifications.append(notification)

            user.balance = 0

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {'success': True}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg =='conversations' and _id == None and request.method == 'GET':
        user = current_user()

        if user:
            conversations_arr = []
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            for c in conversations:
                if c.guru_id == user.id:
                    image_url = c.student.profile_url
                    name = c.student.name
                else:
                    image_url = c.guru.profile_url
                    name = c.guru.name
                if c.messages: 
                    last_message = c.messages[-1]
                    last_message_contents = last_message.contents
                    last_message_write_time = last_message.write_time
                    message_read = c.is_read
                else: 
                    last_message_contents = None
                    last_message_write_time = None
                    message_read = False


                conversations_arr.append({
                        'server_id': c.id,
                        'image_url': image_url,
                        'last_message': last_message_contents,
                        'last_message_time': last_message_write_time,
                        'name': name,
                        'read': message_read
                    })
            response = {'conversations': conversations_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    
    if arg == 'create-password' and request.method == 'POST':
        user = current_user()
        if user:
            from hashlib import md5
            user.password = md5(request.json.get('password')).hexdigest()
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise
            flash("<b>You're all set!</b> Anytime you need help with your courses, click the button above!")
            response = {'success': True}
        return errors(['Invalid Token'])

    if arg =='conversations' and _id != None and request.method == 'GET':
        user = current_user()

        if user:
            conversation = Conversation.query.get(_id)
            messages_arr = []
            conversation_messages = sorted(conversation.messages, key=lambda m:m.write_time)
            for m in conversation_messages:
                if conversation.guru_id == user.id:
                    receiver_id = conversation.student_id
                    receiver = User.query.get(receiver_id)
                else:
                    receiver_id = conversation.guru_id
                    receiver = User.query.get(receiver_id)
                messages_arr.append({
                        'server_id': m.id,
                        'contents': m.contents,
                        'sender_name': m.sender.name.split(" ")[0],
                        'sender_server_id': m.sender.id,
                        'receiver_name': receiver.name.split(" ")[0],
                        'receiver_server_id': receiver_id,
                        'write_time': m.write_time
                    })
            response = {'conversation_server_id': conversation.id,
                        'conversation_meeting_location': conversation.requests[0].location,
                        'conversation_meeting_time': None,
                        'messages': messages_arr }
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='parent_signup' and request.method == 'POST':
        query = User.query.filter_by(email = request.json.get('student-email')).first()
        if query:
            user = query
        else:
            user = User()
            m = Mailbox(user)
            db_session.add(user)
            db_session.add(m)

        user.parent_name = request.json.get('parent-name');
        user.parent_email = request.json.get('parent-email');
        user.name = request.json.get('student-name');
        user.email = request.json.get('student-email');
        user.last_active = datetime.now()
        user.time_created = datetime.now()
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        response = {'success': True}
        session['user_id'] = user.id

        return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

    if arg =='parent_purchase' and request.method =='PUT':
        user = current_user()
        if user:
            if request.json.get('stripe-card-token'):
                status = create_stripe_customer(request.json.get('stripe-card-token'), user)
                if status == 'error':
                    return errors(['Your card has been declined'])
            if request.json.get('payment_plan'):
                p = process_payment_plan(request.json.get('payment_plan'), user)
                if p == 'error':
                    return errors(['Your card has been declined'])
            session.pop('user_id')
            response = {'success':True}

            from emails import send_parent_confirmation
            plan_arr = PAYMENT_PLANS[request.json.get('payment_plan')]
            send_parent_confirmation(user, p, plan_arr[1])

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='send_message' and _id == None and request.method == 'POST':
        user = current_user()
        if user:
            message_contents = ajax_json.get('contents')
            conversation_id = ajax_json.get('conversation_id')
            conversation = Conversation.query.get(conversation_id)
            sender_id = user.id # TODO : assigned but unused
            if conversation.guru_id == user.id:
                receiver_id = conversation.student_id
                receiver = User.query.get(receiver_id)
            else:
                receiver_id = conversation.guru_id
                receiver = User.query.get(receiver_id)

            if receiver.apn_token:
                apn_message = receiver.name.split(" ")[0] + ' has sent you a message'
                send_apn(apn_message, receiver.apn_token)
                
            #If previous message was not the sender, we know the receive should receive a notification + email 
            if not conversation.messages or conversation.messages[-1].sender_id != user.id \
                or (conversation.messages[-1].sender_id == user.id and conversation.is_read):
                receiver.msg_notif += 1
                
                if not conversation.messages :
                    from emails import send_message_alert
                    send_message_alert(receiver, user)
                else:
                    last_message_time = conversation.messages[-1].write_time
                    current_time = datetime.now()
                    difference_time = current_time - last_message_time
                    if difference_time.seconds > (15 * 60):
                        from emails import send_message_alert
                        send_message_alert(receiver, user)
                

            message = Message(message_contents, conversation, user, receiver)
            db_session.add(message)
            
            conversation.is_read = False
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            message = Message.query.get(message.id)
            response = {'message': sanitize_dict(message.__dict__)}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(['Invalid Token'])

    if arg =='billing-contacts' and request.method == 'GET':
        user = current_user()
        billing_contacts_arr = []
        if user:
            from app.static.data.short_variations import short_variations_dict
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            for conversation in conversations:
                if conversation.student_id != user.id:
                    student = User.query.get(conversation.student_id)
                    logging.info(student.customer_id)
                    r = conversation.requests[0]
                    hourly_rate = r.student_estimated_hour
                    profile_url = student.profile_url
                    skill = Skill.query.get(r.skill_id)
                    skill_name = short_variations_dict[skill.name]
                    billing_contacts_arr.append({
                            'student-name': student.name.split(" ")[0],
                            'student-profile': profile_url,
                            'hourly-rate': hourly_rate, 
                            'course': skill_name,
                            'time-estimate': r.time_estimate,
                            'request-id': r.id
                        })

            response = {'billing-contacts': billing_contacts_arr}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])

    if arg =='payments' and request.method == 'POST':
        user = current_user()
        billing_contacts_arr = []
        if user:
            p = Payment.query.get(int(request.json.get('payment_id')))
            total_amount = p.time_amount * p.tutor_rate
            
            #tutor is confirming --> this is only for first time requests
            if p.tutor_confirmed == False and user.id == p.tutor_id:
                tutor = user
                logging.info("Tutor confirming is beginning")
                p.tutor_confirmed = True
                if p.time_amount != float(request.json.get('time_amount')):
                    logging.info("Time amount is different")
                    time_difference = float(request.json.get('time_amount')) - p.time_amount 
                    new_payment = Payment(p.request_id)
                    new_payment.student_paid_amount = time_difference * p.tutor_rate
                    total_amount = total_amount + new_payment.student_paid_amount
                    new_payment.tutor_rate = p.tutor_rate
                    new_payment.confirmed_payment_id = p.id #to keep track they are linked
                    new_payment.time_created = datetime.now()
                    new_payment.time_amount = request.json.get('time_amount')
                    p.confirmed_time_amount = request.json.get('time_amount')
                    logging.info("New confirmed time amount is " + str(p.confirmed_time_amount))
                    

                    tutor = user
                    student = User.query.get(p.student_id)
                    if time_difference > 0:
                        new_payment.student_description = 'Extra charge from your session with ' + tutor.name.split(" ")[0].title()
                        new_payment.tutor_description = 'Extra earnings from your session with ' + student.name.split(" ")[0].title()
                    else:
                        new_payment.student_description = 'A partial refund from your session with ' + tutor.name.split(" ")[0].title()
                        new_payment.tutor_description = 'Subtracted earnings from your session with ' + student.name.split(" ")[0].title()
                        new_payment.refunded = True


                    new_payment.student_confirmed = False
                    student.payments.append(new_payment)
                    tutor.payments.append(new_payment)
                    db_session.add(new_payment)
                
                else:
                    p.confirmed_time_amount = p.time_amount
                    total_amount = p.student_paid_amount
                    user.pending = user.pending - p.tutor_received_amount
                    user.balance = user.balance + p.tutor_received_amount
                    user.total_earned = user.total_earned + p.tutor_received_amount
                    
                    from notifications import student_payment_approval
                    student = User.query.get(p.student_id)

                    from app.static.data.short_variations import short_variations_dict
                    skill_name = short_variations_dict[Skill.query.get(p.skill_id).name]

                    if total_amount > 0:
                        logging.info(str(student) + str(student.id) + str(user))
                        student_notification = student_payment_approval(student, user , p, total_amount, p.stripe_charge_id, skill_name, False)
                        student.notifications.append(student_notification)
                        db_session.add(student_notification)

                rating = Rating(p.request_id)
                user.pending_ratings.append(rating)
                student = User.query.get(p.student_id)
                student.pending_ratings.append(rating)
                db_session.add(rating)

                if student.text_notification and student.phone_number:
                    from tasks import send_twilio_message_delayed
                    if p.time_amount != float(request.json.get('time_amount')):
                        message = tutor.name.split(' ')[0].title() + ' has billed you! Please confirm the amount and rate ' + tutor.name.split(' ')[0].title() + ". You have 24 hours to confirm or the system will auto-confirm."
                    else:    
                        message = tutor.name.split(' ')[0].title() + ' has rated you! Please rate ' + tutor.name.split(' ')[0].title() + ' by logging in to www.uguru.me/log_in/.'
                    send_twilio_message_delayed.apply_async(args=[student.phone_number, message, student.id], countdown=10)

                from notifications import tutor_receive_payment
                student = User.query.get(p.student_id)

                if p.time_amount != float(request.json.get('time_amount')):
                    final_tutor_amount_difference = time_difference * p.tutor_rate * 0.75
                    final_tutor_amount = p.tutor_received_amount + 0.75 * time_difference * p.tutor_rate
                    new_payment.tutor_received_amount = 0.75 * time_difference * p.tutor_rate
                    tutor.pending = tutor.pending + final_tutor_amount_difference

                    #send student email to confirmation
                    from emails import student_confirm_payment_receipt
                    final_student_amount = new_payment.student_paid_amount + p.student_paid_amount
                    student_confirm_payment_receipt(student, tutor.name.split(" ")[0].title(), new_payment, final_student_amount, p.tutor_rate, p.time_amount + time_difference, True)
                    from tasks import auto_confirm_student_payment
                    from views import get_environment
                    if get_environment() == 'PRODUCTION':
                        auto_confirm_student_payment.apply_async(args=[new_payment.id, student.id], countdown=86400)
                    else:
                        auto_confirm_student_payment.apply_async(args=[new_payment.id, student.id], countdown=50)
                else:
                    final_tutor_amount = p.tutor_received_amount


                if final_tutor_amount > 0:
                    tutor_notification = tutor_receive_payment(student, user, p, final_tutor_amount)
                    user.notifications.append(tutor_notification)
                    db_session.add(tutor_notification)

            #student is confirming
            if p.student_confirmed == False and p.student_id == user.id:
                p.student_confirmed = True
                stripe_charge = False
                if not p.confirmed_payment_id:
                    orig_p = p
                else:
                    orig_p = Payment.query.get(p.confirmed_payment_id)

                if p.student_paid_amount > 0:
                    stripe_amount_cents = int(p.student_paid_amount * 100)
                    student = User.query.get(p.student_id)
                    
                    if student.credit >= p.student_paid_amount:
                        student.credit = student.credit - p.student_paid_amount
                        p.student_description = 'Your credits used for this session'
                    elif student.credit > 0:
                        difference = p.student_paid_amount - student.credit
                        p.student_description = 'You used $' + str(student.credit) +' in credit and were billed $' + str(difference) + ' to your card.'
                        stripe_amount_cents = int(difference * 100)
                        student.credit = 0
                        try: 
                            stripe_charge = True
                            charge = stripe.Charge.create(
                                amount = stripe_amount_cents,
                                currency="usd",
                                customer=student.customer_id,
                                description="charge for receiving tutoring"
                            )
                            p.stripe_charge_id = charge['id']
                            logging.info(p.stripe_charge_id)
                        except stripe.error.CardError, e:
                            if p.student_id == user.id:
                                error_msg = "Sorry! Your card has been declined. Please update your payment info in your settings > billing."
                            else:
                                error_msg = "Sorry! The student's card has been declined. Please kindly ask them to update their information" 
                            return errors([error_msg])
                    else:
                        try: 
                            stripe_charge = True
                            charge = stripe.Charge.create(
                                amount = stripe_amount_cents,
                                currency="usd",
                                customer=student.customer_id,
                                description="charge for receiving tutoring"
                            )
                            p.stripe_charge_id = charge['id']
                            logging.info(p.stripe_charge_id)
                        except stripe.error.CardError, e:
                            error_msg = "Sorry! Your card has been declined. Please update your payment info in your settings > billing."
                            return errors([error_msg])
                        except stripe.error.InvalidRequestError, e:
                            if p.student_id == user.id:
                                error_msg = "Sorry! The your card has been declined. Please update your payment info in your settings."
                            else:
                                error_msg = "Sorry! The student's card has been declined. Please kindly ask them to update their information" 
                            return errors([error_msg])
                else:
                    user.credit = user.credit + abs(p.student_paid_amount)
                    stripe_charge = False

                from notifications import student_payment_approval
                tutor = User.query.get(p.tutor_id)

                if orig_p != p:
                    tutor.pending = tutor.pending - orig_p.tutor_received_amount - p.tutor_received_amount
                    tutor.balance = tutor.balance + p.tutor_received_amount + orig_p.tutor_received_amount     
                    tutor.total_earned = tutor.total_earned + p.tutor_received_amount + orig_p.tutor_received_amount     
                else:
                    tutor.pending = tutor.pending - orig_p.tutor_received_amount
                    tutor.balance = tutor.balance + p.tutor_received_amount
                    tutor.total_earned = tutor.total_earned + p.tutor_received_amount
                
                if p.confirmed_payment_id:
                    total_amount = orig_p.time_amount * orig_p.tutor_rate + p.student_paid_amount
                else:
                    #recurring billing case
                    total_amount = p.student_paid_amount
                logging.info(total_amount)
                
                from app.static.data.short_variations import short_variations_dict
                skill_name = short_variations_dict[Skill.query.get(p.skill_id).name]
                
                if stripe_charge:
                    charge = charge['id']
                else:
                    charge = 'as9d0sudas' + str(p.id)

                student_notification = student_payment_approval(user, tutor, p, total_amount, charge, skill_name, False)
                user.notifications.append(student_notification)
                db_session.add(student_notification)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 


            response = {'success': True}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(['Invalid Token'])


    if arg =='bill-student' and request.method == 'POST':
        user = current_user()
        pending_ratings_dict = {} # TODO : assigned but unused
        if user:
            logging.info(request.json)
            from app.views import calc_avg_rating
            if calc_avg_rating(user)[0] < 4.0:
                return errors(['Sorry! You cannot bill a student with less than a 4.0 star rating.'])
            conversation_id = request.json.get('submit-payment')
            total_time = request.json.get('total-time')
            hourly_price = request.json.get('price')

            conversation = Conversation.query.get(conversation_id)
            r = None
            for _request in conversation.requests:
                if _request.connected_tutor_id == user.id:
                    r = _request
                    student_id = _request.student_id
                    student = User.query.get(student_id)

            if not r:
                return errors(['Sorry! Something went wrong, please use the support chat below and we can help investigate the issue further.'])
            request_id = r.id
            
            r = Request.query.get(request_id)

            payment = Payment(r.id)

            total_amount = hourly_price * total_time
            stripe_amount_cents = int(total_amount * 100)
            student = User.query.get(r.student_id)
            tutor = user

            previous_rating = Rating.query.filter_by(student_id=student.id, tutor_id=tutor.id).first()
            if not previous_rating:
                rating = Rating(r.id)
                student.pending_ratings.append(rating)
                tutor.pending_ratings.append(rating)
                db_session.add(rating)

            payment = Payment(r.id)
            payment.student_paid_amount = total_amount
            payment.tutor_rate = hourly_price
            payment.confirmed_payment_id = payment.id #to keep track they are linked
            payment.time_created = datetime.now()
            payment.time_amount = total_time

            payment.student_description = 'Final charge from your session with ' + tutor.name.split(" ")[0].title()
            payment.tutor_description = 'Earnings from your session with ' + student.name.split(" ")[0].title() + ' after 10% fee'

            payment.student_confirmed = False
            student.payments.append(payment)
            tutor.payments.append(payment)
            db_session.add(payment)

            final_tutor_amount = 0.9 * payment.tutor_rate * payment.time_amount
            payment.tutor_received_amount = final_tutor_amount
            tutor.pending = tutor.pending + payment.tutor_received_amount

            if student.text_notification and student.phone_number:
                from tasks import send_twilio_message_delayed
                message = tutor.name.split(' ')[0].title() + ' has billed you! Please confirm the amount and rate ' + tutor.name.split(' ')[0].title() + ". You have 24 hours to confirm or the system will auto-confirm."
                send_twilio_message_delayed.apply_async(args=[student.phone_number, message, student.id], countdown=10)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            from emails import student_confirm_payment_receipt
            final_student_amount = payment.student_paid_amount
            student_confirm_payment_receipt(student, tutor.name.split(" ")[0].title(), payment, final_student_amount, payment.tutor_rate, payment.time_amount, True)
            from tasks import auto_confirm_student_payment
            from views import get_environment
            if get_environment() == 'PRODUCTION':
                auto_confirm_student_payment.apply_async(args=[payment.id, student.id], countdown=86400)
            else:
                auto_confirm_student_payment.apply_async(args=[payment.id, student.id], countdown=50)

            from notifications import tutor_receive_payment
            tutor_notification = tutor_receive_payment(student, user, payment, final_tutor_amount)
            user.notifications.append(tutor_notification)
            db_session.add(tutor_notification)
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            response = {'success': True}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)

        return errors(['Invalid Token'])


    if arg == 'notifications' and _id != None and request.method == 'GET':
        user = current_user()
        if user:
            n_detail = {}
            n = Notification.query.get(_id)
            if n.custom and n.custom == 'tutor-accept-request':
                n_detail['type'] = n.custom
            elif n.custom and n.custom =='student-accept-request':
                n_detail['type'] = 'student-match'
            elif n.custom and n.custom =='tutor-is-matched':
                n_detail['type'] = 'tutor-match'
            else:
                n_detail['type'] =  n.custom_tag

            if n.request_id:
                r = Request.query.get(n.request_id)
                
                temp_availability = r.weekly_availability
                if temp_availability:
                    n_detail['student-calendar'] = {
                            'time_ranges': process_back_to_original_form(get_student_time_ranges(temp_availability, 0))
                        }
                    if n.request_tutor_id:
                        n_detail['tutor-calendar'] = {
                            'time_ranges': process_back_to_original_form(get_student_time_ranges(temp_availability, n.request_tutor_id))
                        }
                r = Request.query.get(n.request_id)

                #View Calendar
                n_detail['request'] = sanitize_dict(r.__dict__)
                n_detail['request']['skill_name'] = n.feed_message.split(" ")[-1].replace('<b>', '').replace('</b>', '')
                n_detail['request']['student_name'] = User.query.get(r.student_id).name.split(" ")[0]

            if n.payment_id:
                p = Request.query.get(n.payment_id)
                n_detail['payment'] = sanitize_dict(p.__dict__)

            n_detail['notification'] = sanitize_dict(n.__dict__)
            n_detail['notification']['feed_message'] = n_detail['notification']['feed_message'].replace('<b>', '').replace('</b>', '')
            if n_detail['notification'].get('feed_message_subtitle'):
                n_detail['notification'].pop('feed_message_subtitle')

            response = n_detail
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])
    
    if arg == 'upload_photo' and request.method == 'POST':
        user = current_user()
        if user:
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            if request.files:
                
                file = request.files['profile_photo']
                extension = file.filename.rsplit('.',1)[1]
                destination_filename = md5(str(user.id)).hexdigest() + "." + extension

                upload_file_to_amazon(destination_filename, file)
                
                #save this to the db
                if os.environ.get('PRODUCTION'):
                    amazon_url = "https://s3.amazonaws.com/uguruprof/"+destination_filename
                else:
                    amazon_url = "https://s3.amazonaws.com/uguruproftest/"+destination_filename
                user.profile_url = amazon_url

                if not user.skills:
                    user.settings_notif = 0

                #update previous notification profile photos to point to this new photo
                from views import update_profile_notifications
                update_profile_notifications(user)

                # TODO : Uncomment method above when webapp is restful

                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise 

            response = user_dict_in_proper_format(user)
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    
    if arg =='purchase_promotion' and request.method == 'POST':
        user = current_user()
        if user:
            logging.info(request.json)
            p = process_promotion_payment_plan(request.json.get('option-selected'), user)
            if p == 'error':
                return errors(['Your card has been declined. Please update it in settings!'])
            response = {'success':True}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])        


    if arg =='purchase_package' and request.method == 'POST':
        user = current_user()
        if user:
            logging.info(request.json)
            p = process_package_home(request.json.get('option-selected'), user)
            if p == 'error':
                return errors(['Your card has been declined. Please update it in settings!'])
            response = {'success':True}
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])        


    if arg == 'rating' and request.method == 'PUT':
        user = current_user()
        if user:
            tutor = User.query.get(request.json.get('tutor_server_id'))
            student = User.query.get(request.json.get('student_server_id'))
            
            logging.info(request.json)

            if request.json.get('tutor_rating_student'):
                rating = tutor.pending_ratings[0]
                rating.student_rating = request.json.get('star_rating')

                if request.json.get('rating_description'):
                    rating.student_rating_description = request.json.get('rating_description')

                tutor.pending_ratings.remove(rating)
                student.student_ratings.append(rating)
            else:
                rating = student.pending_ratings[0]
                rating.tutor_rating = request.json.get('star_rating')

                if request.json.get('rating_description'):
                    rating.tutor_rating_description = request.json.get('rating_description')

                student.pending_ratings.remove(rating)
                tutor.student_ratings.append(rating)

            try:
                db_session.commit()
                db_session.close()
            except:
                db_session.rollback()
                raise 

            response = {'rating': {'success':True}}

            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])


    if arg == 'user' and request.method == 'GET':
        user = current_user()
        if user:
            response = user_dict_in_proper_format(user)
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg == 'user' and request.method == 'PUT':
        user = current_user()
        if user:
            user_response_dict = {} # TODO : assigned but unused
            if request.json.get('apn_token'):
                user.apn_token = request.json.get('apn_token')
            if request.json.get('stripe-card-token'):
                status = create_stripe_customer(request.json.get('stripe-card-token'), user)
                if status == 'error':
                    return errors(['Your card was declined. Please try again or try another card.'])
                if request.json.get('payment_plan'):
                    p = process_payment_plan(request.json.get('payment_plan'), user)
                    if p == 'error':
                        return errors(['Your card has been declined'])

            if request.json.get('stripe_recipient_token'):
                try:
                    create_stripe_recipient(request.json.get('stripe_recipient_token'), user)
                except stripe.error.InvalidRequestError, e:
                    return errors(['Please enter a debit card. Not a credit card'])

            #for first time password set.
            if request.json.get('set-password'):
                from hashlib import md5
                user.password = md5(ajax_json.get('set-password')).hexdigest() 
                flash('Your password has been set.')
            if request.json.get('password') and request.json.get('new_password'):
                old_password = md5(ajax_json.get('password')).hexdigest()
                new_password = md5(ajax_json.get('new_password')).hexdigest()
                if old_password != user.password:
                    return errors(["Incorrect password"])
                else:
                    user.password = new_password

            if 'major' in request.json:
                user.major = request.json.get('major')
            if request.json.get('cashed_out'):
                cash_out_user(user)
                user.balance = 0
            if request.json.get('email'):
                user.email = request.json.get('email')
            if request.json.get('last_active'):
                user.last_active = datetime.now()
            if request.json.get('add_skill'):
                update_skill('add', request.json.get('add_skill'), user)
            if request.json.get('remove_skill'):
                update_skill('remove',request.json.get('remove_skill'), user)
            if request.json.get('check_promo_code'):
                result = check_promo_code(user, request.json.get('check_promo_code'))
                logging.info(result)
                if result == "invalid":
                    return errors(['Invalid Promo Code! Try again.'])
                elif result == "used":
                    return errors(['Sorry you have already used a code for this promotion.'])
                elif result == "success":
                    user.credit = user.credit + 5
                logging.info("check_promo_code" + str(request.json.get('check_promo_code')))
            if request.json.get('update_promo_code'):
                result = update_promo_code(user, request.json.get('update_promo_code'))
                if (not result):
                    return errors(['Sorry! This promo code is already taken.'])
                else:
                    user.user_referral_code = request.json.get('update_promo_code')
                logging.info("update_promo_code" + str(request.json.get('update_promo_code')))
            if 'ta_tutor' in request.json:
                user.ta_tutor = request.json.get('ta_tutor')
            if request.json.get('auth_token'):
                user.auth_token = request.json.get('auth_token')
            if 'la_tutor' in request.json:
                user.la_tutor = request.json.get('la_tutor')
            if 'hkn_tutor' in request.json:
                user.hkn_tutor = request.json.get('hkn_tutor')
            if 'res_tutor' in request.json:
                user.res_tutor = request.json.get('res_tutor')
            if 'slc_tutor' in request.json:
                user.slc_tutor = request.json.get('slc_tutor')
            if request.json.get('fb_account'):
                user.fb_account = request.json.get('fb_account')
            if request.json.get('secret_code'):
                user.secret_code = request.json.get('secret_code')
            if request.json.get('profile_url'):
                user.profile_url = request.json.get('profile_url')
            if request.json.get('verified_tutor'):
                user.verified_tutor = request.json.get('verified_tutor')
            if 'email_notification' in request.json:
                user.email_notification = request.json.get('email_notification')
            if 'text_notification' in request.json:
                user.text_notification = request.json.get('text_notification')
            if 'push_notification' in request.json:
                user.push_notification = request.json.get('push_notification')
            if request.json.get('total_earned'):
                user.total_earned = request.json.get('total_earned')
            if request.json.get('recipient_id'):
                user.recipient_id = request.json.get('recipient_id')
            if request.json.get('customer_id'):
                user.customer_id = request.json.get('customer_id')
            if request.json.get('customer_last4'):
                user.customer_last4 = request.json.get('customer_last4')
            if request.json.get('previous_tutor'):
                user.previous_tutor = request.json.get('previous_tutor')
            if request.json.get('tutor_introduction'):
                user.tutor_introduction = request.json.get('tutor_introduction')
                user.qualifications = request.json.get('tutor_introduction')
            if request.json.get('balance'):
                user.balance = request.json.get('balance')
            if request.json.get('feed_notif'):
                user.feed_notif = request.json.get('feed_notif')
            if 'year' in request.json:
                user.year = request.json.get('year')
            if request.json.get('settings_notif'):
                user.settings_notif = request.json.get('settings_notif')
            if request.json.get('msg_notif'):
                user.msg_notif = request.json.get('msg_notif')

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            user = User.query.get(user.id)

            response = user_dict_in_proper_format(user)
            
            return json.dumps(response, default=json_handler, allow_nan=True, indent=4)
        return errors(["Invalid Token"])

    if arg =='tutor_accept' and request.method =='PUT':
        user = current_user()
        if user:
            logging.info(request.json)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            request_id = request.json.get('request_id')
            hourly_amount = request.json.get('hourly_amount')
            extra_details = request.json.get('tutor_message') # TODO : assigned buy unused
            notification_id = request.json.get('notif_id')
            current_notification = Notification.query.get(notification_id)

            tutor = user
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)

            r = Request.query.get(request_id)   
            r.committed_tutors.append(tutor)

            skill_id = r.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name].upper()

            student = User.query.get(r.student_id)
            student.incoming_requests_from_tutors.append(r)

            if student.text_notification and student.phone_number:
                    msg = send_twilio_msg(student.phone_number, "A tutor wants to help! See more information at http://uguru.me")

            # db_session.commit()

            sched = Scheduler()
            sched.start()
            later_time = datetime.now() + timedelta(0, TUTOR_ACCEPT_EXP_TIME_IN_SECONDS - 3600)
            apn_message = tutor.name.split(" ")[0] + "'s request to help you is expiring in 1 hour. Choose before it's too late!"
            
            job = sched.add_date_job(send_delayed_notification, later_time, [apn_message, student.apn_token, r.id])

            if student.apn_token:
                apn_message =tutor.name.split(" ")[0] + ', a ' + skill_name + ' tutor, wants to help!'
                send_apn(apn_message, student.apn_token)

            current_notification.feed_message = 'You accepted <b>' + student.name.split(' ')[0] + \
                "'s</b> request for <b>" + skill_name.upper() + "</b>."
            current_notification.feed_message_subtitle = "<b>Click here</b> to see next steps."
            current_notification.custom = 'tutor-accept-request'
            current_notification.time_created = datetime.now()
            
            if ajax_json.get('price-change'):
                current_notification.request_tutor_amount_hourly = ajax_json.get('hourly-amount')
            else:
                current_notification.request_tutor_amount_hourly = r.student_estimated_hour
            
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None

            from notifications import tutor_request_accept, student_incoming_tutor_request # TODO : tutor_request_accept imported but unused
            for n in student.notifications[::-1]:
                if n.request_id == r.id:
                    original_skill_name = n.custom
            extra_detail = ajax_json.get('tutor_message')
            student_notification = student_incoming_tutor_request(student, tutor, r, original_skill_name, hourly_amount, extra_detail)
            student.notifications.append(student_notification)
            db_session.add(student_notification)
            
            student_weekly_availability = get_time_ranges(r.weekly_availability, 0) # TODO : assigned but unused

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            r = Request.query.get(r.id)
            current_notification = Notification.query.get(current_notification.id)
            response = {"request": r.__dict__,
                        "notifications": [current_notification.__dict__],
                        # "tutor-calendar": weekly_availability,
                        # "student-calendar": student_weekly_availability
                        }
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])

    if arg =='cancel_request' and request.method =='POST':
        user = current_user()
        if user:
            logging.info(request.json)
            notif_id = request.json.get('notif_id')
            request_id = request.json.get('request_id')
            description = request.json.get('description')

            student_notification = Notification.query.get(notif_id)
            _request = Request.query.get(request_id)
            user.notifications.remove(student_notification)

            if description: #PRE connection
                _request.cancellation_reason = description

            if 'description' in request.json and not description:
                _request.cancellation_reason = "0"
            
            if not _request.connected_tutor_id:
                user.outgoing_requests.remove(_request)
                for _tutor in _request.requested_tutors:
                    for n in sorted(_tutor.notifications, reverse=True):
                        if n.request_id == _request.id:
                            n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has canceled the original request.</span>'            
                            if tutor.apn_token:
                                message = user.name.split(" ")[0] + ' has canceled the request. Sorry!'
                                send_apn(message, tutor.apn_token)

            else: #POST connection
                former_tutor = User.query.get(_request.connected_tutor_id)

                #Find the matched notification
                for n in user.notifications[::-1]:
                    if n.request_id == _request.id:
                        user.notifications.remove(n)
                        db_session.delete(n)
                        break;

                #Delete the conversation
                for c in user.mailbox.conversations:
                    if c.guru == former_tutor and c.student == user:
                        db_session.delete(c)

                #Delete the tutor's you've been matched notification + conversation
                for n in former_tutor.notifications[::-1]:
                    if n.custom == 'tutor-is-matched' and n.request_id == _request.id:
                        n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has canceled the original request.</span>'            
                        n.status = 'CANCELED'
                if former_tutor.apn_token:
                    message = user.name.split(" ")[0] + ' has canceled the request. Sorry!'
                    send_apn(message, former_tutor.apn_token)

            #Cancel this shit
            _request.connected_tutor_id = user.id 
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            user = User.query.get(user.id)
            response = {'user': user.__dict__}
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])
    

    if arg =='student_accept' and request.method == 'PUT':
        user = current_user()
        if user:
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            notification_id = ajax_json.get('notification-id')

            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notification_id]

            if request.json.get('payment_plan') and current_notification.request_tutor_amount_hourly != 0:
                logging.info("There was a payment plan selected, it was number " + str(request.json.get('payment_plan')))
                p = process_payment_plan(request.json.get('payment_plan'), user)
                if p == 'error':
                    return errors(['Your card has been declined. Please update your card info in Settings > Billing.'])

            student = user

            logging.info("student" + str(student))
            # current_notification = Notification.query.get(notification_id)
            skill_name = current_notification.skill_name

            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)
            logging.info("tutor" + str(tutor))

            #Update request
            request_id = current_notification.request_id
            r = Request.query.get(request_id)
            
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_hourly = current_notification.request_tutor_amount_hourly
            r.time_connected = datetime.now()

            #Modify student_idnt notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name.upper() + " tutor."
            current_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            current_notification.custom = 'student-accept-request'
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None
            current_notification.time_created = datetime.now()
            r.connected_tutor_id = tutor_id

            for n in user_notifications[::-1]:
                if n.request_id == r.id and n.custom_tag == 'student-cap-reached':
                    user.notifications.remove(n)
                    logging.info("Student-cap-reached notification removed for request id " + str(r.id))

            from tasks import send_twilio_message_delayed
            if tutor.phone_number and tutor.text_notification:
                logging.info("The tutor has a phone number and is supposed to receive a text.")
                from emails import its_a_match_guru
                message = its_a_match_guru(student, skill_name)
                send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id], countdown=10)

            p = Payment(r.id)
            db_session.add(p)
            
            total_amount = r.connected_tutor_hourly * r.time_estimate
            user_credits = user.credit
            
            if user_credits and r.connected_tutor_hourly != 0:
                difference = user_credits - total_amount
                #if they have enough credits
                if difference >= 0:
                    logging.info("The student has enough credits to not purchase anything")
                    logging.info("Credit before: " + str(user.credit))
                    logging.info("Amount to be billed: " + str(total_amount))
                    user.credit = user.credit - total_amount
                    logging.info("Remaining credits: " + str(user.credit))
                    p.credits_used = total_amount
                    p.student_description = 'Your confirmed session amount with ' + tutor.name.split(" ")[0].title() +'. You used ' + str(total_amount) + ' credits.'
                else:
                    p.credits_used = user_credits
                    user.credit = 0
                    p.student_paid_amount = total_amount - user_credits
                    logging.info("The student has credits, but not enough, so we are billing them $" + str(p.student_paid_amount))
                    p.student_description = 'Your confirmed session amount with ' + tutor.name.split(" ")[0].title() +'. You used ' + str(user_credits) + ' credits, and were billed $' + str(p.student_paid_amount)
                    try: 
                        charge = stripe.Charge.create(
                            amount = int(p.student_paid_amount * 100),
                            currency="usd",
                            customer=student.customer_id,
                            description="partial charge with credit usage"
                        )
                        p.stripe_charge_id = charge['id']
                    except stripe.error.CardError, e: # TODO : 'e' assigned but unused
                        return errors(['Your card has been declined. Please update in Settings > Billing.'])

            else:
                logging.info("The student has no credits, and is paying directly")
                if r.connected_tutor_hourly != 0:
                    try:
                        charge = stripe.Charge.create(
                            amount = int(total_amount * 100),
                            currency="usd",
                            customer=student.customer_id,
                            description="amount for tutoring"
                        )   
                    except stripe.error.CardError:
                        return errors(['Your card has been declined. Please update in Settings > Billing.'])
                    p.stripe_charge_id = charge['id']
                    p.student_description = 'Your confirmed session amount with ' + tutor.name.split(" ")[0].title()

            #Modify student notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name.upper() + " tutor."
            current_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            current_notification.custom = 'student-accept-request'
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None
            current_notification.time_created = datetime.now()
            r.connected_tutor_id = tutor_id

            p.tutor_rate = r.connected_tutor_hourly
            p.student_paid_amount = r.connected_tutor_hourly * r.time_estimate

            previous_student_tutor_payment = Payment.query.filter_by(student_id = student.id, tutor_id = tutor.id).first()
            if previous_student_tutor_payment:
                p.tutor_received_amount = r.connected_tutor_hourly * r.time_estimate
            else:
                p.tutor_received_amount = r.connected_tutor_hourly * r.time_estimate * 0.75

            p.time_created = datetime.now()
            p.tutor_description = 'Your earnings from your session with ' + student.name.split(" ")[0].title() + ' after 25% fee'
            p.time_amount = r.time_estimate
            p.request_id = r.id
            tutor.pending = tutor.pending + p.tutor_received_amount 

            tutor.payments.append(p)
            student.payments.append(p)

            if r in student.outgoing_requests:
                student.outgoing_requests.remove(r)

            for _tutor in r.committed_tutors:
                if _tutor.id != tutor_id and _tutor.id !=student.id:
                    for n in sorted(_tutor.notifications, reverse=True):
                        if n.request_id == r.id:
                            n.status = 'Taken'
                            n.feed_message_subtitle = 'Sorry, the student chose one of the other 2 Gurus.'

            for _tutor in r.requested_tutors:
                if _tutor not in r.committed_tutors:
                    for n in _tutor.notifications:
                        if n.request_id == r.id:
                            n.status = 'LATE'
                            n.feed_message_subtitle = 'Click here to learn why!'
                            logging.info(str(_tutor) + " is too late! We have updated their profile accordingly")

            #delete notifications
            for n in student.notifications:
                if n.request_id and n.request_id == r.id and n.custom_tag == 'student-incoming-offer' and n.request_tutor_id != r.connected_tutor_id:
                    logging.info("Previous tutor incoming offer deleted. Tutor id: " + str(n.request_tutor_id) + "Notification id: " + str(n.id))
                    student.notifications.remove(n)

            #Modify tutor notification
            for n in tutor.notifications:
                if n.request_id == r.id:
                    tutor_notification = n
            tutor_notification.feed_message = "<b>You</b> have been matched with " + user.name.split(" ")[0] + " for " + skill_name + "."
            tutor_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            tutor_notification.custom = 'tutor-is-matched'
            tutor_notification.time_created = datetime.now()
            tutor.feed_notif += 1
            tutor_notification.time_read = None
            from emails import tutor_is_matched, student_is_matched
            tutor_is_matched(user, tutor, skill_name)
            student_is_matched(user, tutor, r.student_secret_code)

            #create conversation between both
            conversation = Conversation.query.filter_by(student_id=user.id, guru_id=tutor.id).first()
            if not conversation:
                conversation = Conversation(skill, tutor, user)
                conversation.requests.append(r)
                conversation.last_updated = datetime.now()
                db_session.add(conversation)
            else:
                conversation.is_read = False

            #create message notifications
            tutor.msg_notif += 1
            student.msg_notif += 1

            #Create 'confirm that you've met' notifications
            from notifications import confirm_meeting_tutor, confirm_meeting_student
            confirm_meeting_tutor_notification = confirm_meeting_tutor(student, tutor, r)
            confirm_meeting_student_notification = confirm_meeting_student(student, tutor, r)
            tutor.notifications.append(confirm_meeting_tutor_notification)
            student.notifications.append(confirm_meeting_student_notification)
            db_session.add(confirm_meeting_student_notification)
            db_session.add(confirm_meeting_tutor_notification)

            #let other committed tutors now that they have been rejected
            # from emails import student_chose_another_tutor

            for _tutor in r.committed_tutors:
                if r.connected_tutor_id != _tutor.id and r.connected_tutor_id != user.id and _tutor.id != student.id:
                    for n in _tutor.notifications:
                        if n.request_id == r.id:
                            tutor_notification = n
                            _tutor.feed_notif += 1
                            tutor_notification.time_read = None
                            # tutor_notification.feed_message_subtitle = '<span style="color:red">The student has chosen another tutor</span>'
                            tutor_notification.time_created = datetime.now()
                            tutor_notification.feed_message_subtitle = 'Click here to see next steps'
                            tutor_notification.status = 'Taken'
                            logging.info("We have let " + str(_tutor) + " know that this request has been taken by someone else")

                    # student_chose_another_tutor(user, current_notification.skill_name, _tutor)
                    # logging.info( "Email sent to " + tutor.email)
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            logging.info("Student Accept Request has been successfully made.")

            from app.views import get_environment
            from tasks import send_student_package_info
            if get_environment == 'PRODUCTION':
                send_student_package_info.apply_async(args=[student.id, r.id], countdown=86400)
            else:
                send_student_package_info.apply_async(args=[student.id, r.id], countdown=10)
            response = {'user': user.__dict__}
            return json.dumps(response, default=json_handler, indent=4)
        return errors(['Invalid Token'])

    if arg =='request' and request.method =='POST':

        user = current_user()
        if user:
            logging.info(request.json)
            description = request.json.get('_description')
            skill_name = request.json.get('course_name') 
            urgency = request.json.get('urgency')
            estimate = request.json.get('estimated_hourly')
            professor = request.json.get('professor_name')
            student_price = request.json.get('student_estimated_hour')
            location = request.json.get('location_name')

            weekly_availability = request.json.get('calendar')

            from app.static.data.variations import courses_dict
            from app.static.data.short_variations import short_variations_dict
            original_skill_name = skill_name.lower()
            
            if not courses_dict.get(original_skill_name):
                return errors([skill_name + ' is not a registered skill. Please try again.'])

            skill_id = courses_dict[original_skill_name]
            skill = Skill.query.get(skill_id)
            skill_name = short_variations_dict[skill.name].upper()

            if user.verified_tutor:
                if skill in user.skills:
                    return errors(["You cannot request help in a course you're a tutor for."])

            # If student already has an outgoing request
            if user.outgoing_requests:
                for r in user.outgoing_requests:
                    if r.skill_id == skill_id:
                        return errors(["You already have an active request for this."])

            r = Request(
                student_id = user.id,
                skill_id = skill_id,
                description = description,
                urgency = int(urgency),
                frequency = None, 
                time_estimate = float(estimate)
            )

            r.professor = professor

            week_times = Week(owner=0)
            
            db_session.add(week_times)
            i = 0
            
            for day in weekly_availability:
                for time_range in day:
                    logging.info(str(time_range))
                    temp_range = Range(start_time=time_range[0], end_time=time_range[1], week_day=i)
                    db_session.add(temp_range)
                    week_times.ranges.append(temp_range)
                i = i + 1

            r.weekly_availability.append(week_times)
            r.num_students = 1
            r.student_estimated_hour = int(float(student_price))
            r.location = location
            r.available_time = ''
            user.outgoing_requests.append(r)
            db_session.add(r)            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            sched = Scheduler()
            sched.start()
            later_time = datetime.now() + timedelta(0, REQUEST_EXP_TIME_IN_SECONDS - 3600)
            apn_message = "Your request is expiring in 1 hour. Please select a tutor!"
            
            job = sched.add_date_job(send_delayed_notification, later_time, [apn_message, user.apn_token, r.id])

            from notifications import student_request_receipt
            notification = student_request_receipt(user, r, original_skill_name)
            user.notifications.append(notification)
            db_session.add(notification)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            student_notification_id = notification.id
            # if not skill.tutors:
            #     return jsonify(dict={'no-active-tutors': True})

            # Tutors are currently not contacted when there is a request.
            from notifications import tutor_request_offer
            for tutor in r.requested_tutors:
                #Only if they are approved tutors
                if tutor.approved_by_admin:
                    if tutor.apn_token:
                        apn_message = user.name.split(" ")[0] + ' needs help in ' + skill_name + '. You could make $' + \
                            str(r.student_estimated_hour * r.time_estimate) + '.'
                        send_apn(apn_message, tutor.apn_token)

                    if tutor.text_notification and tutor.phone_number:
                        msg = send_twilio_msg(tutor.phone_number, "You have received a request and can make BIG MONEY. Please check http://uguru.me") # TODO: assigned but never used, although the right-hand call is important

                    tutor.incoming_requests_to_tutor.append(r)
                    notification = tutor_request_offer(user, tutor, r, skill_name)
                    db_session.add(notification)
                    tutor.notifications.append(notification)
            
            #send emails + create objects
            from emails import student_needs_help
            mandrill_result, tutor_email_dict = student_needs_help(user, r.requested_tutors, skill_name, r)
            for sent_email_dict in mandrill_result:
                tutor = tutor_email_dict[sent_email_dict['email']]
                email = Email(
                    tag='tutor-request', 
                    user_id=tutor.id, 
                    time_created=datetime.now(), 
                    mandrill_id = sent_email_dict['_id']
                    )
                db_session.add(email)
                tutor.emails.append(email)
                r.emails.append(email)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

            r = Request.query.get(r.id)
            student_notification = Notification.query.get(student_notification_id)
            response = {"request": sanitize_dict(r.__dict__),
                        "notifications": sanitize_dict(student_notification.__dict__),
                        # "calendar": weekly_availability
                        }
            return json.dumps(response, default=json_handler, indent=4)

        return errors(['Invalid Token'])

    if arg == 'sample-tutors':
        
        from app.static.data.variations import courses_dict
        
        course_str = ajax_json['course'].lower()
        skill_to_add_id = courses_dict[course_str]
        skill = Skill.query.get(skill_to_add_id)

        count = 0
        tutor_array = []
        for tutor in skill.tutors:
            if count >= 5:
                break
            if tutor.profile_url:
                tutor_array.append(tutor.profile_url
                )
    
        return_json['enough-tutors'] = count > 5
        return_json['tutors'] = tutor_array


    if arg =='guru-app':
        user_id = session.get('user_id')
        
        user = User.query.filter_by(phone_number = ajax_json['phone']).first()
        if user:
            return errors(['There already exists an account with this phone number. Try logging in with your other account, or contact us via support below.'])

        user = User.query.get(user_id)

        # user.school_email = ajax_json['school-email']
        user.major = ajax_json['major']
        user.qualifications = ajax_json['experience']
        user.tutor_introduction = ajax_json['experience']
        user.year = ajax_json['year']
        user.slc_tutor = ajax_json['slc']
        user.la_tutor = ajax_json['la']
        user.res_tutor = ajax_json['res']
        user.ta_tutor = ajax_json['gsi']
        user.previous_tutor = ajax_json['cal']
        user.high_tutor = ajax_json['high']
        if ajax_json.get('phone'):
            user.phone_number = ajax_json['phone']
        user.approved_by_admin = True
        user.verified_tutor = True
        user.is_a_tutor = True

        courses = ajax_json['courses']

        from app.static.data.variations import courses_dict

        for course_txt in courses:
            skill_to_add_id = courses_dict[course_txt]
            skill = Skill.query.get(skill_to_add_id)
            db_session.add(skill)
            user.skills.append(skill)

        tutor_notification_flag = False
        for n in user.notifications:
            logging.info(str(n.id) + " " + str(n.feed_message))
            if n.a_id_name == 'getting-started-guru':
                tutor_notification_flag = True
                break

        if not tutor_notification_flag:
            from notifications import getting_started_tutor, welcome_guru
            welcome_guru_notification = welcome_guru(user)
            user.notifications.append(welcome_guru_notification)
            db_session.add(welcome_guru_notification)
            notification = getting_started_tutor(user)
            from emails import welcome_uguru_tutor
            welcome_uguru_tutor(user)
            user.notifications.append(notification)
            db_session.add(notification)
        
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 


    return jsonify(response=return_json)

################# HELPER METHODS #####################

# Returns the user looked up by the authentication token sent in the header
def current_user():
    if session.get('user_id'):
        return User.query.get(session.get('user_id'))
    else:
        auth_token = request.headers.get("X-UGURU-Token")
        if auth_token:
            logging.info(auth_token)
            user = User.query.filter_by(auth_token=auth_token).first()
            if user:
                return user
        return None # if can't find user by auth token

#retunns a {"errors": []} resource of the resounse the last request failed
def errors(errors=[]):
    response = jsonify({"errors":errors})
    logging.info(response)
    return response

def success(messages=[]):
    response = jsonify({"message":messages})
    logging.info(response)
    return response

def json_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    if obj.__class__.__name__ == 'InstanceState':
        return None
    if obj.__class__.__name__ == 'User':
        return None
    else:
        return json.JSONEncoder.default(obj)
        return obj

def create_user(email, password, phone_number, name):
    new_user = User(email=email, 
                        password=md5(password).hexdigest(), 
                        phone_number=phone_number, 
                        name=name)

    new_user.last_active = datetime.now()
    new_user.secret_code = views.generate_secret_code()
    new_user.feed_notif = 0
    new_user.settings_notif = 0

    mailbox = Mailbox(new_user)

    new_user.auth_token = "%032x" % random.getrandbits(128);

    return new_user, mailbox

def send_delayed_notification(message, apn_token, request_id):
    r = Request.query.get(request_id)
    if not r.connected_tutor_id and r.committed_tutors:
        send_apn(message, apn_token)

def get_time_ranges(week_object, owner):
    if not week_object.first():
        return []
    arr_ranges = []
    ranges = week_object.filter_by(owner=owner).first().ranges
    for r in ranges:
        arr_ranges.append([r.week_day, r.start_time, r.end_time])
    return arr_ranges

#TODO, write this much better
def create_stripe_customer(token, user):
    try:
        customer = stripe.Customer.create(
                    email=user.email,
                    card = token
                    )
    except stripe.error.CardError, e:
        return 'error'

    user.customer_id = customer.id
    user.customer_last4 = customer['cards']['data'][0]['last4']
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 
    return 'success'

def create_stripe_recipient(token, user):
    logging.info("Create stripe recipient" + str(user))
    recipient = stripe.Recipient.create(
                    name=user.name,
                    type="individual",
                    email=user.email,
                    card=token
                )
    user.recipient_last4 = recipient['cards']['data'][0]['last4']
    logging.info(user.recipient_last4)
    user.recipient_id = recipient.id
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise

def cash_out_user(user):
    
    transfer = stripe.Transfer.create( # TODO : assigned but unused
                amount=int(user.balance * 100), # amount in cents, again
                currency="usd",
                recipient=user.recipient_id
            )

    from notifications import tutor_cashed_out
    notification = tutor_cashed_out(user, user.balance)
    db_session.add(notification)

    notification.status = 'Pending'
    notification.skill_name = 'Pending'

    user.notifications.append(notification)

    user.balance = 0
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise

    return

def sanitize_dict(_dict):   
    if _dict.get('id'): _dict['server_id'] = _dict.pop('id')
    if _dict.get('description'): _dict['_description'] = _dict.pop('description')
    if _dict.get('professor'): _dict['professor_name'] = _dict.pop('professor')
    if _dict.get('location'): _dict['location_name'] = _dict.pop('location')
    return _dict

def get_time_diff_in_seconds(later_time, earlier_time):
    return int(abs(later_time-earlier_time).total_seconds())

def get_time_remaining(seconds):
    if (seconds < 120):
        "Expiring in " + str(seconds % 60) + " min"
    if (seconds < 3600):
        return "Expiring in " + str(seconds / 60) + " mins"
    elif (seconds >= 3600 and seconds < 5400):
        return "Expiring in " + str(seconds / 3600) + " hour"
    elif (seconds >= 3600 and seconds < 86400):
        return "Expiring in " + str(seconds / 3600) + " hours"
    elif (seconds >= 86400 and seconds < 172800):
        return "Expiring in " + str(seconds / 86400)  + ' day and ' + str((seconds - 86400) / 3600) + ' hrs'
    return "2 days"

def check_promo_code(user, promo_code):
    user_with_promo_code = User.query.filter_by(user_referral_code = promo_code).first()
    
    #make sure referral promo code is not from the same user
    if user_with_promo_code and user_with_promo_code.id == user.id:
        return "invalid"
    
    #for referral rpomo case
    if user_with_promo_code:
        #check if they have already used it
        if user.promos:
            for p in user.promos:
                if p.tag == 'referral' and user.id == p.receiver_id:
                    return "used"
        else:
            p = Promo()
            p.time_used = datetime.now()
            p.sender_id = user_with_promo_code.id
            p.receiver_id = user.id
            p.tag = 'referral'
            db_session.add(p)
            user.promos.append(p)
            user_with_promo_code.promos.append(p)
            return "success"

    if promo_code.lower() == 'doyouguru':
        if user.promos:
            for p in user.promos:
                if p.tag == 'referral':
                    return "used"
        p = Promo()
        p.time_used = datetime.now()
        p.receiver_id = user.id
        p.tag = 'referral'
        db_session.add(p)
        user.promos.append(p)
        return "success"

    if promo_code.lower() == 'indusrocks':
        if user.promos:
            for p in user.promos:
                if p.tag == 'indusrocks':
                    return "used"
        p = Promo()
        p.time_used = datetime.now()
        p.received_id = user.id
        p.tag = 'indusrocks'
        db_session.add(p)
        user.promos.append(p)
        return "success" 

    if promo_code.lower() == 'berkeleybap':
        if user.promos:
            for p in user.promos:
                if p.tag == 'berkeleybap':
                    return "used"
        p = Promo()
        p.time_used = datetime.now()
        p.received_id = user.id
        p.tag = 'berkeleybap'
        db_session.add(p)
        user.promos.append(p)
        return "success" 

    return "invalid"

def update_promo_code(user, promo_code):
    users_with_promo_code = User.query.filter_by(user_referral_code = promo_code).first()
    if (not users_with_promo_code):
        return True
    else:
        return False  

def upload_file_to_amazon(filename, file):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_file(file)
    sml.set_acl('public-read')

def process_back_to_original_form(arr_arr):
    return_list = [[],[],[],[],[],[],[]]
    for item in arr_arr:
        if item:
            index = item.pop(0)
            return_list[index].append(item)
    return return_list

def current_user_skills_in_arr(user):
    skills = []
    if user.skills:
        for skill in user.skills:
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill.name]
            skills.append(skill_name)
    return skills

def update_skill(flag, skill, user):
    from app.static.data.variations import courses_dict
    from app.static.data.short_variations_reverse import short_variations_reverse_dict
    skill = skill.lower()
    if (flag == "add"):
        skill_to_add_id = courses_dict[skill]
        skill = Skill.query.get(skill_to_add_id)
        user.skills.append(skill)

    if (flag == "remove"):
        if short_variations_reverse_dict.get(skill):
                skill_to_remove = short_variations_reverse_dict[skill]
        else:
            from app.static.data.variations import courses_dict
            skill_id = courses_dict[skill]
            skill = Skill.query.get(skill_id)
            skill_to_remove = skill.name
        for skill in user.skills:
            if skill.name.lower() == skill_to_remove.lower():
                user.skills.remove(skill)

    try:
        db_session.commit()
        if len(user.skills) == 0:
            session['tutor-signup'] = True
    except:
        db_session.rollback()
        raise 
    logging.info(str(flag) + " successful")

def user_dict_in_proper_format(user):
    pending_ratings_dict = {}
    is_a_tutor = False
    skills = []
    if user.pending_ratings:
        rating = user.pending_ratings[0]
        student = User.query.get(rating.student_id)
        tutor = User.query.get(rating.tutor_id)

        pending_ratings_dict = {
            'rating_server_id' : rating.id,
            'student_name' : student.name.split(" ")[0],
            'student_profile' : student.profile_url,
            'student_server_id': student.id, 
            'tutor_name' : tutor.name.split(" ")[0],
            'tutor_profile': tutor.profile_url,
            'tutor_server_id': tutor.id, 
        }

    if user.verified_tutor and user.approved_by_admin:
        is_a_tutor = True

    if user.skills:
        skills = current_user_skills_in_arr(user)

    response = {'user': 
                    { 
                        'server_id': user.id,
                        'name': user.name.split(" ")[0],
                        'email': user.email,
                        'password': user.password,
                        'auth_token': user.auth_token,
                        'apn_token': user.apn_token,
                        'image_url': user.profile_url,
                        'recipient_id': user.recipient_id,
                        'customer_id': user.customer_id,
                        'customer_last4': user.customer_last4,
                        'pending_ratings': pending_ratings_dict,
                        'is_a_tutor': is_a_tutor,
                        'hkn_tutor': user.hkn_tutor,
                        'la_tutor': user.la_tutor,
                        'slc_tutor': user.slc_tutor,
                        'res_tutor': user.res_tutor,
                        'ta_tutor': user.ta_tutor,
                        'previous_tutor': user.previous_tutor,
                        'year': user.year,
                        'bio': user.tutor_introduction,
                        'skills' : skills,
                        'major' : user.major,
                        'email_notification': user.email_notification,
                        'push_notification': user.push_notification,
                        'balance': user.balance,
                        'total_earned': user.total_earned,
                        'user_referral_code': user.user_referral_code,
                        'credit': user.credit
                    }
            }
    logging.info(response)
    return response

def process_package_home(plan_num, user):
    plan_arr = PACKAGE_HOME_PLANS[plan_num]
    p = Payment()
    db_session.add(p)
    p.time_created = datetime.now()
    p.student_description = 'You purchased ' + str(plan_arr[1]) + " credits for $" + str(plan_arr[0]) + ' through a promotion.'
    p.student_paid_amount = plan_arr[0]
    p.student_id = user.id
    try:
        charge = stripe.Charge.create(
            amount = int(plan_arr[0] * 100),
            currency="usd",
            customer=user.customer_id,
            description="student purchased credits"
        )
    except stripe.error.CardError, e: # TODO : assigned but unused
        return 'error'

    from notifications import student_purchase_package
    notification = student_purchase_package(user, plan_arr[1], plan_arr[0])
    db_session.add(notification)
    user.notifications.append(notification)

    p.stripe_charge_id = charge['id']
    user.payments.append(p)
    user.credit += plan_arr[1]

    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 
    return p

def process_promotion_payment_plan(plan_num, user):
    plan_arr = PROMOTION_PAYMENT_PLANS[plan_num]
    p = Payment()
    db_session.add(p)
    p.time_created = datetime.now()
    p.student_description = 'You purchased ' + str(plan_arr[1]) + " credits for $" + str(plan_arr[0]) + ' through a promotion.'
    p.student_paid_amount = plan_arr[0]
    p.student_id = user.id
    try:
        charge = stripe.Charge.create(
            amount = int(plan_arr[0] * 100),
            currency="usd",
            customer=user.customer_id,
            description="student purchased credits"
        )
    except stripe.error.CardError, e: # TODO : assigned but unused
        return 'error'


    from notifications import student_purchase_package
    notification = student_purchase_package(user, plan_arr[1], plan_arr[0])
    db_session.add(notification)
    user.notifications.append(notification)

    p.stripe_charge_id = charge['id']
    user.payments.append(p)
    user.credit += plan_arr[1]

    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 
    return p

def process_payment_plan(plan_num, user):
    plan_arr = PAYMENT_PLANS[plan_num]

    p = Payment()
    db_session.add(p)
    p.time_created = datetime.now()
    p.student_description = 'You purchased ' + str(plan_arr[1]) + " credits for $" + str(plan_arr[0]) + '.'
    p.student_paid_amount = plan_arr[0]
    p.student_id = user.id
    try:
        charge = stripe.Charge.create(
            amount = int(plan_arr[0] * 100),
            currency="usd",
            customer=user.customer_id,
            description="student purchased credits"
        )
    except stripe.error.CardError, e: # TODO : assigned but unused
        return 'error'

    p.stripe_charge_id = charge['id']
    user.payments.append(p)
    user.credit += plan_arr[1]

    from notifications import student_purchase_package
    notification = student_purchase_package(user, plan_arr[1], plan_arr[0])
    db_session.add(notification)
    user.notifications.append(notification)

    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 
    return p
