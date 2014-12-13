import os
import stripe 
import emails
import boto
import api
import redis
import time
import json
import traceback
import mandrill
import logging
import twilio
from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, session, flash, redirect, url_for
from models import *
from hashlib import md5
from datetime import datetime, timedelta
from sqlalchemy import desc
from twilio import *
from twilio.rest import TwilioRestClient
from datetime import timedelta
from app import tasks

# Twilio
TWILIO_DEFAULT_PHONE = "+15104661138"
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])

# Constants
MAX_REQUEST_TUTOR_LIMIT = 3
MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
tutor_blacklist = [1708, 624]

# Stripe
stripe_keys = {
    'secret_key': os.environ['STRIPE_SECRET_KEY'],
    'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']

# Mixpanel
from mixpanel import Mixpanel
mp = Mixpanel(os.environ['MIXPANEL_TOKEN']) 

#################
# New Web Views #
#################

# TODO: 
# - 
# - Go hard with views & integration
@app.route('/m/desktop/')
def desktop():
    return render_template('web/home-desktop.html')

@app.route('/m/home/')
@app.route('/home/')
def home():
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    if user.pending_ratings:
        rating_id = user.pending_ratings[0].id
        return redirect(url_for('m_rating', _id=rating_id))
    
    return render_template('web/home.html', user=user)

@app.route('/m/guru/')
def m_guru():
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    if user.pending_ratings:
        rating_id = user.pending_ratings[0].id
        return redirect(url_for('m_rating', _id=rating_id))

    return render_template('web/guru.html', user=user)

@app.route('/m/guru/sessions/')
def guru_sessions():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/guru_sessions.html', user=user)

@app.route('/m/guru/requests/')
def guru_requests():

    user = api.current_user()

    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/guru_requests.html', user=user)

@app.route('/m/guru/students/')
@app.route('/m/tutors/')
def my_tutors():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))
    
    return render_template('web/my_tutors.html', user=user)

##########################################################
# /m/ Mobile Routes 
##########################################################
@app.route('/m/')
@app.route('/m/welcome/')
@app.route('/welcome/')
def welcome():
    # Track email click though
    campaign = request.args.get('camp')
    user_id = request.args.get('user_id')
    if campaign and user_id:
        #Create MP profile

        from tasks import create_mp_profile
        create_mp_profile.delay(user_id, campaign)

        session['email_user_id'] = user_id
        print campaign, user_id

        return redirect(url_for('welcome'))

    return render_template('web/welcome.html')

@app.route('/m/welcome/<campaign>/<_id>/')
def m_welcome_campaign_track(campaign, _id):
    #SEND TO MP PANEL
    return redirect(url_for('m_welcome'))

@app.route('/m/guru/new/')
@app.route('/m/guru/new/1/')
def m_guru_new():
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))
        
    return render_template('web/guru-new/guru-1.html')

@app.route('/m/login/')
def m_login():

    no_pw_user = None
    user = api.current_user()
    if user:
        if user.is_a_guru():
            return redirect(url_for('m_guru'))
        else:
            return redirect(url_for('home'))

    if session.get('email_user_id'):
        user = User.query.get(session.get('email_user_id'))
        if not user.password:
            no_pw_user = user
            return redirect(url_for('m_signup'))

        # if student w/ requests
        # pending_requests = user.get_pending_requests()
        # if pending_requests:
        #     pending_request_id = pending_requests[0].id
        #     return redirect( \
        #         url_for(endpoint='request_by_id', _id=pending_request_id))
    
    return render_template('web/login.html', no_pw_user=no_pw_user, session=session)

@app.route('/m/signup/')
def m_signup():
    no_pw_user = None
    user = api.current_user()
    if user:
        return redirect(url_for('home'))
    
    if session.get('email_user_id'):
        user = User.query.get(session.get('email_user_id'))
        if not user.password:
            no_pw_user = user

    return render_template('web/signup.html', no_pw_user=no_pw_user)

@app.route('/m/logout/')
def m_logout():
    if session.get('user_id'):
        session.pop('user_id')
    return redirect(url_for('welcome'))

#Content pages, example: Sorry, 'We have no tutors page'
@app.route('/m/show/<event>/')
def content_page(event):

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))
    
    return render_template('web/content.html', event=event)

@app.route('/m/transactions/')
def m_transactions():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/transactions.html', user=user)

@app.route('/m/request_form/')
def request_form():
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/request_form.html')

@app.route('/m/add_payment/', defaults={'r_id': None})
@app.route('/m/add_payment/<r_id>/')
def add_payment(r_id=None):

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/add_payment.html', \
        stripe_key=stripe_keys['publishable_key'],\
        redirect_request_id = r_id,
        user=user)

@app.route('/m/guru/cashout/')
@app.route('/m/guru/cashout/<redirect>/')
def guru_cashout(redirect=None):
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    #if tutor doesn't have a balance
    if not user.balance:
        return redirect(url_for('m_guru'))

    return render_template('web/cashout.html',\
        user=user, redirect=redirect)

@app.route('/m/add_cash_card/<home>/')
@app.route('/m/add_cash_card/')
def add_cash_out(home=None):

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/add_cash_out.html', \
        stripe_key=stripe_keys['publishable_key'],\
        redirect_home=home,
        user=user)

@app.route('/m/become_guru/')
def become_guru():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/become_guru.html'\
        , user=user)

@app.route('/m/upcoming/')
def upcoming_sessions():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/upcoming_sessions.html'\
        , user=user)

@app.route('/m/add_courses/')
def add_courses():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/add_courses.html')

@app.route('/m/reset_password/<_hash>')
@app.route('/m/change_password/')
def add_courses(_hash=None):

    reset_flag = False

    if 'reset' in request.url:
        print request.url
        
        user = User.query.filter_by(password=_hash).first()
        print user

        if not user:
            flash('Sorry! That reset link is no longer valid. Please try resetting your password again.')
            return redirect(url_for('m_login'))        

        #Reset password is successful.
        else:
            user.authenticate()
            reset_flag = True


    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/change_password.html',\
        user=user, reset_flag=reset_flag)

@app.route('/m/c/<_id>')
@app.route('/m/conversation/<_id>')
@app.route('/m/guru/conversation/<_id>')
def m_messages(_id):

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    convo = Conversation.query.get(_id)
    
    return render_template('web/messages.html', convo=convo, user=user)

@app.route('/m/guru/settings/')
@app.route('/m/settings/')
def m_settings():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))
    
    return render_template('web/settings.html',\
        stripe_key=stripe_keys['publishable_key'],\
        user=user)

@app.route('/m/guru/profile/edit/')
@app.route('/m/profile/edit/')
def edit_profile():
    user = api.current_user()

    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/edit_profile.html',\
        user=user)


@app.route('/m/p/<_id>/')
@app.route('/m/guru/profile/<_id>/')
@app.route('/m/profile/<_id>/')
def profile(_id):

    user = api.current_user()
    if not user:
        if _id:
            session['request-profile'] = _id
        return redirect(url_for('m_login'))

    #if guru is viewing their profile
    if user.id == int(_id) and user.approved_by_admin:
        return render_template('web/profile.html', \
        student=None, guru=user, _request=None)

    #if student is viewing their profile
    if user.id == int(_id):
        return render_template('web/profile.html', \
        student=user, guru=None, _request=None)

    # Make sure user can see this tutor profile
    results = user.has_incoming_tutor_for_request(int(_id))
    if not results:
        flash('Sorry, you dont have access to this page!')
        return redirect(url_for('m_guru'))
    
    guru = results[0]
    _request = results[1]

    return render_template('web/profile.html', \
        student=user, guru=guru, _request=_request)


@app.route('/m/rating/<_id>/')
def m_rating(_id):

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    rating = Rating.query.get(_id)

    if not user.pending_ratings:
        if user.id == rating.student_id:
            return redirect(url_for('home'))
        else:
            return redirect(url_for('m_guru'))

    return render_template('web/rating.html', user=user, \
        rating=rating)


@app.route('/m/r/')
@app.route('/m/request/')
def _request():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/request.html')

@app.route('/m/guru/support/')
@app.route('/m/support/')
def support():

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/support.html', 
        user=user)

@app.route('/m/reject_guru/<_id>/')
def student_reject_guru(_id):
    _request = Request.get_request_by_id(int(_id))
    if not _request:
        return redirect(url_for('home'))

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/student_reject_guru.html',\
        _request=_request)

@app.route('/m/cancel_request/<_id>/')
def student_cancel_request_id(_id):
    _request = Request.get_request_by_id(int(_id))
    if not _request:
        return redirect(url_for('home'))

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/student_cancel_request.html',\
        _request=_request)

@app.route('/m/guru/reject_request/<_id>/')
@app.route('/m/guru/cancel_request/<_id>/')
@app.route('/m/guru/accept_request/<_id>/')
@app.route('/m/guru/confirm/<_id>/')
def guru_cancel_request_by_id(_id):
    _request = Request.get_request_by_id(int(_id))
    
    if not _request:        
        return redirect(url_for('home'))

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    if 'reject' in request.url:
        return render_template('web/guru_reject_request.html', user=user,\
        request_dict=_request.get_return_dict())
    elif 'cancel' in request.url:
        return render_template('web/guru_cancel_request.html', user=user,\
        request_dict=_request.get_return_dict())
    elif 'confirm' in request.url:
        return render_template('web/guru_confirm_request.html', user=user,\
        request_dict=_request.get_return_dict())
    else:
        return render_template('web/guru_accept_request.html', user=user,\
        request_dict=_request.get_return_dict())


@app.route('/m/guru/accept_request/<_id>/')
def accept_request_by_id(_id):
    _request = Request.get_request_by_id(int(_id))
    if not _request:
        
        return redirect(url_for('home'))

    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    if not user == _request.get_student() and not _request.is_tutor_involved(user):
        flash("Sorry! You do not have access to this page.")
        return redirect(url_for('m_guru'))

    return render_template('web/guru_accept_request.html', user=user,\
     request_dict=_request.get_return_dict())

@app.route('/m/account_details/')
def account_details():
    user = api.current_user()
    if not user:
        return redirect(url_for('m_login'))

    return render_template('web/account_details.html', user=user)


# ONLY TUTORS ARE LEAD TO THIS ROUTE.
@app.route('/m/r/<_id>/')
@app.route('/m/confirm_request/<_id>/')
@app.route('/m/guru/request/<_id>/')
@app.route('/m/request/<_id>/')
def request_by_id(_id):
    #if ID is not accurate, send back to home.
    _request = Request.get_request_by_id(int(_id))
    if not _request:
        
        return redirect(url_for('home'))

    #if tutor (should take up the whole page)
    user = api.current_user()
    if not user:
        if _id:
            session['request-redirect'] = _id
        return redirect(url_for('m_login'))

    if not user == _request.get_student() and _request.pending_tutor_id != user.id\
    and user in _request.contacted_tutors and not _request.time_canceled:
        flash('Sorry! You missed your turn!')
        return redirect(url_for('m_guru'))

    # request already canceled, guru can't accept
    if not user == _request.get_student() and \
    _request.time_canceled:
        flash('Sorry! The student has canceled this request')
        return redirect(url_for('m_guru'))

    #if Guru shouldn't see this.
    if not user == _request.get_student() and not _request.pending_tutor_id == user.id:
        flash("Sorry! You dont have access to this page.")
        return redirect(url_for('m_guru'))

    #Different page, same validation, might as well put in same route? 
    if 'confirm_request' in request.url:
        
        # if something went wrong but the PUT request went through..
        # redirect to home
        if _request.connected_tutor_id:
            return redirect(url_for('home'))

        return render_template('web/confirm_request.html', user=user,\
        request_dict=_request.get_return_dict(),\
        stripe_key=stripe_keys['publishable_key'])

    #Guru is looking at request
    from datetime import datetime 
    from tasks import DEFAULT_TUTOR_ACCEPT_TIME
    guru_seconds_remaining = DEFAULT_TUTOR_ACCEPT_TIME - \
    (datetime.now() - _request.time_pending_began).seconds
    
    
    if session.get('request-redirect'):
        session.pop('request-redirect')

    mp.track(user.id, 'View Student Request', {
        'Request Id': _request.id
    })

    return render_template('web/request_details.html', user=user,\
     request_dict=_request.get_return_dict(), time=round(guru_seconds_remaining,2))

@app.route('/log_in/')
@app.route('/sign_up/')
@app.route('/guru/')
@app.route('/callisto/')
@app.route('/fb/')
@app.route('/instant/')
@app.route('/piazza/')
@app.route('/', methods=['GET', 'POST'])
def index(arg=None):

    modal_flag = None
    if os.environ.get('TESTING') and not session.get('testing-admin'):
        return redirect(url_for('login'))
    tutor_signup_incomplete = False
    guru_referral = False
    if session.get('guru-checked'):
        guru_referral = True
        session.pop('guru-checked')
    if request.args.get('email'):
        session['referral'] = request.args.get('email')
        if request.args.get('email') == 'guru':
            session['guru-checked'] = True
        return redirect(url_for('index'))
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        # if user.skills and len(user.notifications) < 2:
        #     return redirect(url_for('settings'))
        return redirect(url_for('welcome'))
    if 'log_in' in request.url:
        modal_flag = 'login'
    if 'sign_up' in request.url:
        modal_flag = 'signup'
    if '/guru' in request.url:
        modal_flag = 'guru'
    if 'callisto' in request.url:
        session['referral'] = 'callisto'
    if 'fb' in request.url:
        session['referral'] = 'fb'
    if 'piazza' in request.url:
        session['referral'] = 'piazza'
    if 'cal' in request.url:
        session['referral'] = 'cal'

    return render_template('index.html',
        logged_in=session.get('user_id'), tutor_signup_incomplete=tutor_signup_incomplete, \
        environment = get_environment(), session=session, guru_referral=guru_referral, modal_flag = modal_flag)

@app.route('/florida/', methods=['GET', 'POST'])
def florida(arg=None):

    from schools import school_dict
    school_details = school_dict['UF']
    modal_flag = None
    tutor_signup_incomplete = False
    guru_referral = False
    if session.get('guru-checked'):
        guru_referral = True
        session.pop('guru-checked')
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        return redirect(url_for('activity'))
    if 'log_in' in request.url:
        modal_flag = 'login'
    if 'sign_up' in request.url:
        modal_flag = 'signup'
    if '/guru' in request.url:
        modal_flag = 'guru'
    if 'callisto' in request.url:
        session['referral'] = 'callisto'
    if 'fb' in request.url:
        session['referral'] = 'fb'
    if 'piazza' in request.url:
        session['referral'] = 'piazza'
    if 'cal' in request.url:
        session['referral'] = 'cal'
    return render_template('school-landing-page.html',
        logged_in=session.get('user_id'), tutor_signup_incomplete=tutor_signup_incomplete, \
        environment = get_environment(), session=session, guru_referral=guru_referral, modal_flag = modal_flag, \
        school_details=school_details)

@app.route('/parents/', methods =['GET', 'POST'], defaults={'arg': None})
@app.route('/parents/<arg>/')
def parents(arg=None):
    return render_template('parents.html', key=stripe_keys['publishable_key'])

@app.route('/apply-guru/', methods=['GET', 'POST', 'PUT'])
def apply_guru():
    return redirect(url_for('welcome'))
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        return render_template('apply-guru.html', user=user)
    else:
        session['redirect'] = '/apply-guru/'
        return redirect('/log_in/')

@app.route('/tos/', methods=['GET','POST'])
def tos():
    return render_template('tos.html')

@app.route('/update-profile/', methods=('GET', 'POST'))
def update_profile():
    if request.method == "POST":
        ajax_json = request.json
        logging.info(ajax_json)
        return_json = {}
        user_id = session.get('user_id')
        user = User.query.get(user_id)
        
        #If image has been uploaded
        if request.files:
            file = request.files['file']
            extension = file.filename.rsplit('.',1)[1]
            destination_filename = md5(str(user_id)).hexdigest() + "." + extension

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
            update_profile_notifications(user)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            ajax_json = {}

        #if other profile data is being updated
        if request.json:
            ajax_json = request.json
            if ajax_json.get('intro'):
                user.tutor_introduction = ajax_json.get('intro')
            if ajax_json.get('year'):
                user.year = ajax_json.get('year')
            if ajax_json.get('major'):
                user.major = ajax_json.get('major')
            if 'slc' in ajax_json:
                user.slc_tutor = ajax_json.get('slc')
            if 'previous' in ajax_json:
                user.previous_tutor = ajax_json.get('previous')
            if 'ta' in ajax_json:
                user.ta_tutor = ajax_json.get('ta')
            if 'la' in ajax_json:
                user.la_tutor = ajax_json.get('la')
            if 'name' in ajax_json:
                user.name = ajax_json.get('name').title()
            if 'email' in ajax_json:
                #check here to see if another email is already there
                other_user = User.query.filter_by(email=ajax_json.get('email')).first()
                if other_user and user != other_user:
                    from api import errors
                    return errors(['A duplicate account already exists with email ' + ajax_json.get('email') + '. Logout and try "Forgot your Password"'])
                user.email = ajax_json.get('email').lower()
            if 'high' in ajax_json:
                user.high_tutor = ajax_json.get('high')
            if 'res' in ajax_json:
                user.res_tutor = ajax_json.get('res')
            if 'hkn' in ajax_json:
                user.hkn_tutor = ajax_json.get('hkn')
            if 'discover' in ajax_json:
                user.discoverability = ajax_json.get('discover')
            if 'phone' in ajax_json:
                if ajax_json.get('phone'):
                    other_user = User.query.filter_by(phone_number=ajax_json.get('phone')).first()
                    if other_user and user != other_user:
                        from api import errors
                        return errors(['A duplicate account already exists with phone ' + ajax_json.get('phone') + '. Logout and try "Forgot your Password"'])
                    user.phone_number = ajax_json.get('phone')
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
        if user.skills and user.tutor_introduction and user.major and \
            user.profile_url != '/static/img/default-photo.jpg':
            user.settings_notif = 0
        return jsonify(ajax_json)

@app.route('/add-credit/', methods=('GET', 'POST'))
def add_credit():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if ajax_json.get('token'):
            stripe_user_token = ajax_json.get('token')
            
            customer = stripe.Customer.create(
                email=user.email,
                card = stripe_user_token
                )

            user.customer_id = customer.id
            user.customer_last4 = customer['cards']['data'][0]['last4']
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
        return jsonify(response=return_json)

@app.route('/admin/')
def new_admin():
    if session.get('admin'):
    
        now = datetime.now()
        today = datetime(*now.timetuple()[:3])
        day_stats = []

        for i in range(0, 7):
            day = today - timedelta(days=i)
            day_after = today - timedelta(days=(i - 1))
            day_student_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin == None).all()
            day_student_none_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin == None).filter(User.referral_code == None).all()
            day_student_fb_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin == None).filter(User.referral_code == 'fb').all()
            day_student_piazza_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin == None).filter(User.referral_code == 'piazza').all()
            day_student_cal_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin == None).filter(User.referral_code == 'cal').all()
            day_tutor_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin != None).all()
            day_tutor_guru_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin != None).filter(User.referral_code == 'guru').all()
            day_tutor_none_signups = db_session.query(User).filter(User.time_created >= day).filter(User.time_created <= day_after).filter(User.approved_by_admin != None).filter(User.referral_code == None).all()
            day_requests = db_session.query(Request).filter(Request.time_created >= day).filter(Request.time_created <= day_after).all()         

            day_student_sproul_signups = []

            for user in (day_student_signups + day_tutor_signups):
                if user.referral_code and 'sproul' in user.referral_code:
                    day_student_sproul_signups.append(user)

            day_stats.append(
                    {
                        'date': day.strftime('%h %d %Y'),
                        'student-signups': day_student_signups,
                        'tutor-signups': day_tutor_signups,
                        'requests': day_requests,
                        'student-signups-piazza': day_student_piazza_signups,
                        'student-signups-none': day_student_none_signups,
                        'student-signups-fb': day_student_fb_signups,
                        'student-signups-sproul': day_student_sproul_signups,
                        'student-signups-cal': day_student_cal_signups,
                        'student-signups-guru-none': day_tutor_none_signups,
                        'student-signups-guru': day_tutor_guru_signups
                    }

                )
        

        return render_template('admin/new-admin.html', day_stats=day_stats)
    return redirect(url_for('index'))


@app.route('/admin/users/<arg>/')
def admin_users(arg):
    if session.get('admin'):
        
        result_str = ''
        count = 0

        def attr_to_row(arr_attr):
            return ','.join(arr_attr) + '<br>'



        if arg =='students':
            for u in User.query.all():
                if not u.is_a_guru() and u.email_notification:
                    
                    user_fields = [u.name, u.email]
                    result_str += attr_to_row(user_fields)
                    count += 1

        if arg =='students-no-pw':
            for u in User.query.all():
                if not u.is_a_guru() and u.email_notification \
                and not u.password and not u.fb_account:
                    
                    user_fields = [u.email]
                    result_str += attr_to_row(user_fields)
                    count += 1



        if arg =='tutors':
            for u in User.query.all():
                if u.is_a_guru() and u.email_notification:                    
                    user_fields = [u.name, u.email, str(u.id)]
                    result_str += attr_to_row(user_fields)
                    count += 1

        if arg =='active-tutors-skills':
            for u in User.query.all():
                if u.is_a_guru() and u.email_notification \
                and 'removed' not in u.email.lower():                    
                    for n in sorted(u.notifications, key=lambda n:n.time_created, reverse=True):
                        if 'accepted' in n.feed_message or 'matched' in n.feed_message:
                            full_name = u.name.split(' ')
                            first_name = full_name[0]
                            last_name = ''
                            if len(full_name) > 1:
                                last_name = full_name[1]
                            user_fields = [u.name, first_name, last_name, u.email, n.skill_name.title(), str(u.id)]
                            result_str += attr_to_row(user_fields)
                            count += 1

        if arg =='no-skills':
            for u in User.query.all():
                if u.is_a_guru() and u.email_notification \
                and 'removed' not in u.email.lower() and u.skills:                    
                    
                    user_fields = [u.email]
                    result_str += attr_to_row(user_fields)
                    count += 1

        if arg =='skills':
            for u in User.query.all():
                if u.is_a_guru() and u.email_notification \
                and 'removed' not in u.email.lower() and u.skills:                    
                    skill_name = None
                    for n in sorted(u.notifications, key=lambda n:n.time_created, reverse=True):
                        if 'accepted' in n.feed_message or 'matched' in n.feed_message:
                            skill_name = n.skill_name
                            break
                    if not skill_name:
                        skill_name = u.skills[0].get_short_name()
                    full_name = u.name.split(' ')
                    first_name = full_name[0]
                    last_name = ''
                    if len(full_name) > 1:
                        last_name = full_name[1]
                    user_fields = [u.name, first_name, last_name, u.email, skill_name.title(), str(u.id)]
                    result_str += attr_to_row(user_fields)
                    count += 1

        if arg =='skills-email':
            for u in User.query.all():
                if not u.skills and u.is_a_guru() and u.approved_by_admin: 
                    user_fields = [u.email]
                    result_str += attr_to_row(user_fields)

        if arg == 'students-course':
            for u in User.query.all():
                skill_name = None
                if not u.is_a_guru() and u.email_notification:
                    
                    for n in u.notifications:
                        if n.request_id:
                            skill_name = Skill.query.get(n.request_id).get_short_name().title()
                            break
                    full_name = u.name.split(' ')
                    if len(full_name) == 0: 
                        first_name = ''
                        last_name = ''
                    elif len(full_name) == 1:
                        first_name = full_name[0].title()
                        last_name = ''
                    else: 
                        first_name = full_name[0].title()
                        last_name = full_name[1]
                    if not skill_name:
                        skill_name = ''
                    user_fields = [u.email, str(u.id), first_name, last_name, skill_name]
                    result_str += attr_to_row(user_fields)
                    count += 1

    print 'results returned:', count
    return result_str

@app.route('/admin/students/')
def new_admin_students():
    if session.get('admin'):
        all_students = sorted(db_session.query(User).filter(User.approved_by_admin == None).all(), key=lambda u:u.last_active, reverse=True)
        times_signed_up = {}
        times_last_active = {}

        for student in all_students:
            times_signed_up[student.id] = pretty_date(student.time_created)
            times_last_active[student.id] = pretty_date(student.last_active)

        return render_template('admin/new-admin-students.html', all_students = all_students, times_signed_up=times_signed_up,\
            times_last_active=times_last_active)
    return redirect(url_for('index'))

@app.route('/admin/stats/')
def new_admin_stats():
    if session.get('admin'):

        all_students = db_session.query(User).filter(User.approved_by_admin == None).all()
        all_tutors = db_session.query(User).filter(User.approved_by_admin == True).all()
        
        all_users = User.query.all()

        num_tutors_request_help = 0
        num_students_request_help = 0
        num_students_request_help_again = 0
        
        #revenue vars
        fall_request_revenue = 0
        fall_free_tutor_request_revenue = 0
        fall_package_revenue = 0
        fall_recurring_payment_revenue = 0

        #user vars
        total_user_signups = 0
        organic_user_signups = 0
        referral_user_signups = 0
        mass_email_user_signups = 0

        requests = Request.query.all()
        payments = Payment.query.all()
        p = Payment.query.all()

        for r in Request.query.all():
            if r.connected_tutor_id and r.id > 313:
                #Was not a free session
                if r.connected_tutor_hourly:
                    fall_request_revenue += r.connected_tutor_hourly * r.time_estimate
                else: #was a free session
                    fall_free_tutor_request_revenue += r.student_estimated_hour * r.time_estimate

            if r.student_id and r.connected_tutor_id:
                payments = Payment.query.filter_by(student_id=r.student_id, tutor_id = r.connected_tutor_id).all()
                if payments:
                        payments = sorted(payments, key=lambda k:k.id)
                        payments.pop(0)
                        for p in payments:
                            if p.id > 130 and p.student_paid_amount:
                                fall_recurring_payment_revenue += p.student_paid_amount


        for p in Payment.query.all():
            if p.student_description and 'purchased' in p.student_description:
                fall_package_revenue += p.student_paid_amount

        for u in User.query.all():
            total_user_signups += 1
            if u.referral_code:
                if 'mass' in u.referral_code or 'chloe' in u.referral_code or u.referral_code =='m' or '00' in u.referral_code:
                    mass_email_user_signups += 1
                else:
                    referral_user_signups += 1
            else:
                organic_user_signups += 1


        return render_template('admin/admin-stats.html', fall_request_revenue=fall_request_revenue, \
            fall_free_tutor_request_revenue=fall_free_tutor_request_revenue, \
            fall_package_revenue = fall_package_revenue, \
            fall_recurring_payment_revenue=fall_recurring_payment_revenue,\
            total_user_signups=total_user_signups, \
            organic_user_signups=organic_user_signups, \
            referral_user_signups=referral_user_signups,\
            mass_email_user_signups=mass_email_user_signups)

    return redirect(url_for('index'))


@app.route('/admin/unsubscribes/')
def new_admin_unsubscribes():
    if session.get('admin'):
        unsubscribes = sorted(Unsubscribe.query.all(), key=lambda u:u.time_created, reverse=True)

        times = {}

        for user in unsubscribes:
            times[user.id] = pretty_date(user.time_created)

        return render_template('admin/admin-unsubscribe.html', unsubscribes=unsubscribes, times=times)
    return redirect(url_for('index'))


@app.route('/admin/tutors/')
def new_admin_tutors():
    if session.get('admin'):
        if get_environment() == 'PRODUCTION' or get_environment() =='TESTING':
            all_tutors = sorted(db_session.query(User).filter(User.approved_by_admin != None).all(), key=lambda u:u.last_active, reverse=True)
        else:
            all_tutors = db_session.query(User).filter(User.approved_by_admin != None).all()
        times_signed_up = {}
        times_last_active = {}
        avg_rating_tutor = {}

        for tutor in all_tutors:
            times_signed_up[tutor.id] = pretty_date(tutor.time_created)
            times_last_active[tutor.id] = pretty_date(tutor.last_active)
            avg_rating_tutor[tutor.id] = calc_avg_rating(tutor)
        return render_template('admin/admin-tutors.html', all_tutors = all_tutors, times_signed_up=times_signed_up,\
            times_last_active=times_last_active, avg_rating_tutor = avg_rating_tutor)
    return redirect(url_for('index'))


@app.route('/admin/ratings/')
def new_admin_ratings():
    if session.get('admin'):
        ratings_dict = {}
        ratings_arr = []
        for r in Rating.query.all():
            if r.skill_id and r.tutor_id and r.student_id and r.time_created:
                skill = Skill.query.get(r.skill_id)
                tutor = User.query.get(r.tutor_id)
                student = User.query.get(r.student_id)
                if tutor and tutor.name and skill and skill.name and student and student.name:
                    ratings_dict[r] = {'skill':skill.name, 'tutor-name':tutor.name.split(" ")[0], \
                        'student-name':student.name.split(" ")[0]}
                    ratings_arr.append(r)
        return render_template('admin/admin-ratings.html', ratings=ratings_arr      , ratings_dict=ratings_dict)
    return redirect(url_for('index'))


@app.route('/admin/payments/')
def new_admin_payments():
    if session.get('admin'):
        payment_dict = {}
        for p in Payment.query.all():
            tutor_name = None
            student_name = None

            if p.tutor_id: 
                tutor = User.query.get(p.tutor_id)
                if tutor and tutor.name:
                    tutor_name = tutor.name.split(" ")[0]
            if p.student_id: 
                student = User.query.get(p.student_id)
                if student and student.name: 
                    student_name = student.name.split(" ")[0]
            payment_dict[p] = {'tutor-name':tutor_name, \
                'student-name':student_name}
        return render_template('admin/admin-payments.html', payments=Payment.query.all(), payment_dict = payment_dict, env=get_environment())
    return redirect(url_for('index'))

@app.route('/admin/courses/')
def new_admin_courses():
    if session.get('admin'):
        skills_array = []
        skills_dict = {}
        for u in User.query.all():
            from collections import Counter
            import operator
            if u.skills:
                result_string = ""
                for s in u.skills:
                    result_string = result_string + s.name + " "
                    skills_array.append(s.name)
                skills_dict[u.id] = result_string

        skills_counter = dict(Counter(skills_array))
        skills_counter = sorted(skills_counter.iteritems(), key=operator.itemgetter(1))
        return render_template('admin/admin-courses.html', skills_counter=skills_counter)
    return redirect(url_for('index'))

@app.route('/admin/conversations/')
def new_admin_convos():
    if session.get('admin'):
        conversations = []
        for c in Conversation.query.all():
            if c.requests and c.guru and c.student:
                c_dict = {}
                c_dict['conversation'] = c
                c_dict['tutor'] = c.guru
                c_dict['student'] = c.student
                c_dict['msg-count'] = len(c.messages)
                if c_dict['msg-count']:
                    c_dict['last-message-time'] = c.messages[-1].write_time
                else: 
                    c_dict['last-message-time'] = c.requests[0].time_created
                c_dict['skill-name'] = Skill.query.get(c.requests[0].skill_id).name
                conversations.append(c_dict)
        conversations = sorted(conversations, key=lambda c:c['last-message-time'], reverse=True)
        for c_dict in conversations:
            c_dict['last-message-time'] = pretty_date(c_dict['last-message-time'])
        return render_template('admin/admin-convos.html', conversations=conversations)
    return redirect(url_for('index'))

@app.route('/admin/requests/')
def admin_requests():
    if session.get('admin'):
        all_requests = []
        num_repeat_payments = 0
        for r in Request.query.all()[::-1]:
            if r.id > 900:
                r_dict = r.get_return_dict()
                r_dict['request'] = r
                r_dict['phone-tutors'] = sum([int(bool(t.phone_number)) for t in r.requested_tutors])
                r_dict['setting-tutors'] = sum([int(bool(t.phone_number) and t.text_notification) for t in r.requested_tutors])
                r_dict['date'] = r.time_created.strftime('%h %d %Y, %I:%M:%S %p')
                all_requests.append(r_dict)
        all_requests = sorted(all_requests, key=lambda d: d['request'].id, reverse=True)
        return render_template('admin/admin-requests.html', all_requests=all_requests)
    return redirect(url_for('index'))

@app.route('/admin/requests/<r_id>/')
def admin_requests_two(r_id):
    if session.get('admin'):
        from tasks import get_qualified_tutors, DEFAULT_TUTOR_ACCEPT_TIME
        from datetime import datetime

        r = Request.query.get(r_id)
        skill = Skill.query.get(r.skill_id)
        
        current_tutor = None
        current_tutor_id = r.pending_tutor_id
        if current_tutor_id: 
            current_tutor = User.query.get(current_tutor_id)

        r_dict = r.get_return_dict()

        r_dict['time-created'] = r.time_created.strftime('%h %d %Y, %I:%M:%S %p')
        r_dict['tutors-available'] = len(get_qualified_tutors(r))
        r_dict['tutors-contacted'] = len(r.contacted_tutors)
        r_dict['tutors-committed'] = len(r.committed_tutors)
        if current_tutor: 
            r_dict['current-tutor'] = current_tutor.as_dict()
            r_dict['time-remaining'] = int(DEFAULT_TUTOR_ACCEPT_TIME - (datetime.now() - r.time_pending_began).seconds)

        r_notifications = Notification.query.filter_by(request_id = r.id).all()
        r_notifications = sorted(r_notifications, key=lambda n:n.time_created)
        r_notifications_arr = []
        for n in r_notifications:
            temp_dict = {
                'server_id': n.id,
                'status': n.status,
                'time-created': n.time_created.strftime('%h %d %Y, %I:%M:%S %p')
            }
            if n.request_tutor_id:
                temp_dict['tutor'] = User.query.get(n.request_tutor_id).as_dict()
            r_notifications_arr.append(temp_dict)
        
        r_dict['notifications'] = r_notifications_arr

        return render_template('admin/admin-detailed-request.html', r_dict = r_dict)

@app.route('/add-bank/', methods=('GET', 'POST'))
def add_bank():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if ajax_json.get('token'):
            stripe_user_token = ajax_json.get('token')
            # stripe_user_legal_name = ajax_json.get('legal-name')
            
            try: 
                recipient = stripe.Recipient.create(
                    name=user.name,
                    type="individual",
                    email=user.email,
                    card=stripe_user_token
                )
            except stripe.error.InvalidRequestError, e:
                return_json['not-a-debit'] = True
                return jsonify(response=return_json)

            user.recipient_id = recipient.id

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 


        transfer = stripe.Transfer.create(
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

        flash("Thank you for cashing out! You should have the funds in account 1-3 days.")

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 

        return jsonify(response=return_json)        

@app.route('/submit-rating/', methods=('GET', 'POST'))
def submit_rating():
    return redirect(url_for('welcome'))

    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        if not user_id:
            return redirect(url_for('index'))
        user = User.query.get(user_id)
        if not user.pending_ratings:
            return redirect(url_for('index'))

        if 'tutor-rating-student' in ajax_json:
            rating = user.pending_ratings[0]
            logging.info(user.pending_ratings)
            rating.student_rating = ajax_json['num_stars']
            student = User.query.get(rating.student_id)
            student_name = student.name.split(" ")[0]
            if 'additional_detail' in ajax_json:
                rating.student_rating_description = ajax_json['additional_detail']
            
            user.pending_ratings.remove(rating)
            student.student_ratings.append(rating)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'student-rating-tutor' in ajax_json:
            rating = user.pending_ratings[0]
            rating.tutor_rating = ajax_json['num_stars']
            tutor = User.query.get(rating.tutor_id)
            tutor_name = tutor.name.split(" ")[0]
            
            if 'additional_detail' in ajax_json:
                rating.tutor_rating_description = ajax_json['additional_detail']

            user.pending_ratings.remove(rating)
            tutor.tutor_ratings.append(rating)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

    return jsonify(return_json=return_json)     

@app.route('/500/')       
def _500():
    return render_template('500.html')

@app.route('/free-10-credit/<email>/<name>/<tag>/')
@app.route('/free-10-credit/<email>/<name>/')
@app.route('/free-10-credit/')
def free_10_credit(email=None, name=None, tag=None):
    if not email and not name and not session.get('free-10-credit-email') and not session.get('free-10-credit-name'):
        return redirect(url_for('index'))

    if email and name:
        session['free-10-credit-email'] = email
        session['free-10-credit-name'] = name

        logging.info(name + " " + email + " has clicked this link")

        user = User.query.filter_by(email=email).first()
        if user:
            authenticate(user.id)
            logging.info(name + " " + email + " already exists... redirecting")
            return redirect(url_for('index'))

        user = User(
                email=email,
                name=name,
            )

        user.feed_notif = 0
        user.settings_notif = 0
        user.referral_code=tag

        mailbox = Mailbox(user)

        db_session.add(mailbox)
        db_session.add(user)

        user.last_active = datetime.now()
        user.credit = 10
        from notifications import getting_started_student, welcome_guru, getting_started_tutor, getting_started_student_tip
        notification = getting_started_student(user, True)
        notification2 = getting_started_student_tip(user)
        user.notifications.append(notification2)
        db_session.add(notification)
        db_session.add(notification2)
        user.notifications.append(notification)

        try:
            db_session.commit()
            authenticate(user.id)
            logging.info(name + " " + email + " account has been successfully created")
        except:
            db_session.rollback()
            raise


        if session.get('free-10-credit-email'):
            email =session.get('free-10-credit-email')
        if session.get('free-10-credit-name'):
            name =session.get('free-10-credit-name')

        return redirect('/free-10-credit/')


    if session.get('free-10-credit-email'):
        email =session.get('free-10-credit-email')
    if session.get('free-10-credit-name'):
        name =session.get('free-10-credit-name')
    #They already have an account and need to be redirected to home
    # if session.get('free-10-credit-email') and session.get('free-10-credit-name') and not name and not email:
    #     return redirect(url_for('activity'))


    return render_template('free-credit-signup.html', email=email, name=name)

@app.route('/send-message/', methods=('GET', 'POST'))
def send_message():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        if not user_id:
            return redirect(url_for('index'))
        user = User.query.get(user_id)

        if 'update-message' in ajax_json and not session.get('admin'):
            conversation_num = ajax_json.get('conversation-num')
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            conversation = conversations[conversation_num]
            conversation.is_read = True
            if user.msg_notif > 0:
                user.msg_notif = user.msg_notif - 1
            else:
                user.msg_notif = 0
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        if 'send-message' in ajax_json:
            message_contents = ajax_json.get('send-message')
            conversation_num = ajax_json.get('conversation-num')
            conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated, reverse=True)
            conversation = conversations[conversation_num]
            conversation.last_updated = datetime.now()
            sender_id = user.id
            if conversation.guru_id == user.id:
                receiver_id = conversation.student_id
                receiver = User.query.get(receiver_id)
            else:
                receiver_id = conversation.guru_id
                receiver = User.query.get(receiver_id)

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
                    if difference_time.seconds > (0 * 60):
                        from emails import send_message_alert
                        send_message_alert(receiver, user)
                        if receiver.phone_number and receiver.text_notification:
                            from emails import send_message_text
                            msg = send_message_text(user)
                            from tasks import send_twilio_message_delayed
                            message = send_twilio_message_delayed.apply_async(args=[receiver.phone_number, msg, receiver.id], countdown=10)


            message = Message(message_contents, conversation, user, receiver)
            db_session.add(message)
            
            conversation.is_read = False
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            logging.info('message-created')
        return jsonify(response=return_json)

@app.route('/update-request/', methods=('GET', 'POST'))
def update_requests():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        if 'tutor-accept' in ajax_json:
            hourly_amount = 20
            notif_num = ajax_json.get('notif-num')
            tutor = user
            logging.info("Tutor is accepting a student request: " + str(tutor))
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            incoming_request_num = current_notification.request_id

            r = Request.query.get(incoming_request_num)
            student = User.query.get(r.student_id)

            if len(r.committed_tutors) > MAX_REQUEST_TUTOR_LIMIT:
                logging.info("The max request tutor limit has been reached!")
                for tutor in r.requested_tutors:
                    if tutor not in r.committed_tutors:
                        for n in tutor.notifications:
                            if n.request_id == r.id:
                                n.status = 'LATE'
                                n.feed_message_subtitle = 'Click here to learn why!'
                                logging.info(str(tutor) + " is too late! We have updated their profile accordingly")
                from api import errors
                return errors(['Sorry! You were just a couple seconds late. This request has already been accepted by three other Gurus!'])


            if r.connected_tutor_id and r.connected_tutor_id != user.id:
                logging.info("Student with accept button after match is trying to connect")
                from api import errors
                return errors(['Sorry! You were just a couple seconds late. The student has already chose a Guru'])

            r.committed_tutors.append(tutor)
            tutor = user
            skill_id = r.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name]

            student.incoming_requests_from_tutors.append(r)
            db_session.commit()

            logging.info("request" + str(r.id))

            if student.text_notification and student.phone_number:
                logging.info("Student is supposed to be receiving a text message")
                from emails import guru_can_help
                message = guru_can_help(tutor, skill_name)
                from tasks import send_twilio_message_delayed
                send_twilio_message_delayed.apply_async(args=[student.phone_number, message, student.id])

            current_notification.feed_message = 'You accepted <b>' + student.name.split(' ')[0] + \
                "'s</b> request for <b>" + skill_name.upper() + "</b>."
            current_notification.feed_message_subtitle = "<b>Click here</b> to see next steps."
            current_notification.custom = 'tutor-accept-request'
            current_notification.time_created = datetime.now()
            
            if ajax_json.get('price-change'):
                current_notification.request_tutor_amount_hourly = 20
            else:
                current_notification.request_tutor_amount_hourly = 20

            if calc_avg_rating(tutor)[0] < 4.0:
                current_notification.request_tutor_amount_hourly = 0
                hourly_amount = 0
            
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None

            from notifications import tutor_request_accept, student_incoming_tutor_request
            extra_detail = ajax_json.get('extra-detail')
            student_notification = student_incoming_tutor_request(student, user, r, skill_name, hourly_amount, extra_detail)
            student.notifications.append(student_notification)
            db_session.add(student_notification)
            
            if len(r.committed_tutors) >= (MAX_REQUEST_TUTOR_LIMIT + 1):
                for n in student.notifications:
                        if n.request_id == r.id and n.custom_tag == 'student-incoming-offer':
                            n.status = 'tutor_cap_reached'

                if student.text_notification and student.phone_number:
                    logging.info("Student is supposed to receive a text about reaching the tutor limit")
                    from emails import student_cap_reached
                    message = student_cap_reached(skill_name.upper())
                    from tasks import send_twilio_message_delayed
                    send_twilio_message_delayed.apply_async(args=[student.phone_number, message, student.id])

                if student.email_notification:
                    from emails import student_cap_reached_email
                    student_cap_reached_email(student, skill_name)


                from notifications import student_cap_reached_notif
                student_cap_notif = student_cap_reached_notif(user, r, skill_name)
                student.notifications.append(student_cap_notif)
                db_session.add(student_cap_notif)

            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

            logging.info("Tutor accept has been successfully committed to the database")

        if 'tutor-cancel-accept' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notif_num]
            _request = Request.query.get(current_notification.request_id)
            _request.committed_tutors.remove(user)
            weekly_availability = _request.weekly_availability.filter_by(owner=user.id).first()
            _request.weekly_availability.remove(weekly_availability)

            skill_id = _request.skill_id
            skill = Skill.query.get(skill_id)
            skill_name = skill.name
            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[skill_name]

            student = User.query.get(_request.student_id)

            current_notification.feed_message = "<b>" + student.name.split(" ")[0] + "</b> needs help in " + skill_name.upper()
            current_notification.feed_message_subtitle = "<b>Click here</b> to see more information"
            current_notification.custom = skill_name
            current_notification.request_tutor_amount_hourly = None

            for n in student.notifications:
                if n.request_id == _request.id and n.request_tutor_id == user.id:
                    student_notification = n
                    break
            student_notification.feed_message_subtitle = "<span style='color:#CD2626'>Sorry! This tutor is not able to help anymore.</span>"
            student_notification.request_tutor_amount_hourly = None
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            flash("You successfully canceled your commitment to " + student.name.split(" ")[0] + "'s request")

        if 'cancel-request' in ajax_json:
            notif_num = ajax_json.get('notif-num')
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            student_notification = user_notifications[notif_num]
            request_id = student_notification.request_id
            _request = Request.query.get(request_id)
            _request.connected_tutor_id = user.id
            if _request in user.outgoing_requests:
                user.outgoing_requests.remove(_request)
            user.notifications.remove(student_notification)

            from app.static.data.short_variations import short_variations_dict
            skill_name = short_variations_dict[Skill.query.get(_request.skill_id).name]
            
            if os.environ.get('TESTING') or os.environ.get('USER') == 'makhani':
                from tasks import send_delayed_email
                send_delayed_email.apply_async(args=['canceled-request-email', [user.id, skill_name]], countdown = 10)
            else:
                send_delayed_email.apply_async(args=['canceled-request-email', [user.id, skill_name]], countdown = 1800)

            for n in user_notifications:
                if n.request_id == request_id and n in user.notifications:
                    user.notifications.remove(n)
            
            for _tutor in _request.requested_tutors:
                for n in sorted(_tutor.notifications, reverse=True):
                    if n.request_id == _request.id:
                        n.status = 'Canceled'
                        n.feed_message_subtitle = 'Sorry, the student has canceled the request.'
            

            flash("Your request has been successfully canceled.")
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise             

        if 'student-accept' in ajax_json:
            notification_id = ajax_json.get('notification-id')
            student = user
            logging.info("===A student is choosing a tutor===")
            logging.info("student " + str(student))
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            current_notification = user_notifications[notification_id]
            skill_name = current_notification.skill_name

            tutor_id = current_notification.request_tutor_id
            tutor = User.query.get(tutor_id)
            logging.info("tutor " + str(student))

            #Modify student notification
            current_notification.feed_message = "<b>You</b> have been matched with " + tutor.name.split(" ")[0] + ", a " \
                + skill_name.upper() + " tutor."
            current_notification.feed_message_subtitle = '<b>Click here</b> to see next steps!'
            current_notification.custom = 'student-accept-request'
            if current_notification.time_read:
                user.feed_notif += 1
                current_notification.time_read = None
            current_notification.time_created = datetime.now()

            #Update request
            request_id = current_notification.request_id
            r = Request.query.get(request_id)

            previous_request_payment = Payment.query.filter_by(request_id = r.id).first()
            if not previous_request_payment:
                p = Payment(r)
                if r.id > 165 :
                    p.student_paid_amount = 5
                else:
                    p.student_paid_amount = 10
                db_session.add(p)
            else:
                p = previous_request_payment
            
            skill = Skill.query.get(r.skill_id)
            r.connected_tutor_id = tutor_id
            r.connected_tutor_hourly = current_notification.request_tutor_amount_hourly
            r.time_connected = datetime.now()

            mutual_times_arr = find_earliest_meeting_time(r)
            logging.info("Mutual times array: " + str(mutual_times_arr))
            if tutor.phone_number and tutor.text_notification:
                from emails import its_a_match_guru, reminder_before_session
                total_seconds_delay = int(convert_mutual_times_in_seconds(mutual_times_arr, r)) - 3600
                message = reminder_before_session(tutor, student, r.location, "Guru-ing")
                from tasks import send_twilio_message_delayed
                if os.environ.get('TESTING') or os.environ.get('USER') == 'makhani':
                    send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id], countdown=10)
                else:                    
                    send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id], countdown=total_seconds_delay)

                message = its_a_match_guru(student, skill_name)
                send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id])


            if student.phone_number and student.text_notification:
                from emails import reminder_before_session
                total_seconds_delay = int(convert_mutual_times_in_seconds(mutual_times_arr, r)) - 3600
                message = reminder_before_session(student, tutor, r.location, "Studying")
                from tasks import send_twilio_message_delayed
                if os.environ.get('TESTING') or os.environ.get('USER') == 'makhani':
                    send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id], countdown=10)
                else:
                    send_twilio_message_delayed.apply_async(args=[student.phone_number, message, student.id], countdown=total_seconds_delay)


            if not previous_request_payment:
                charge = stripe.Charge.create(
                    amount = p.student_paid_amount * 100,
                    currency="usd",
                    customer=student.customer_id,
                    description="one-time _connection_payments fee"
                )
                charge_id = charge["id"]

            if not previous_request_payment:
                from emails import student_payment_receipt
                student_payment_receipt(student, tutor.name.split(" ")[0], p.student_paid_amount, p, charge_id, skill_name, False, True)

            student.outgoing_requests.remove(r)

            for _tutor in r.requested_tutors:
                if _tutor.id != tutor_id:
                    for n in sorted(_tutor.notifications, reverse=True):
                        if n.request_id == r.id:
                            n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has already chose another tutor.</span>'
            
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
            student_is_matched(user, tutor, None)

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

            #let other committed tutors now that they have been rejected
            # from emails import student_chose_another_tutor
            for _tutor in r.committed_tutors:
                if r.connected_tutor_id != tutor.id and r.connected_tutor_id != user.id:
                    for n in _tutor.notifications:
                        if n.request_id == r.id:
                            tutor_notification = n
                    tutor.feed_notif += 1
                    tutor_notification.time_read = None
                    tutor_notification.feed_message_subtitle = '<span style="color:red">This request has been canceled</span>'
                    tutor_notification.time_created = datetime.now()
                    # student_chose_another_tutor(user, current_notification.skill_name, _tutor)
                    logging.info("Email sent to " + str(tutor))
            
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        return jsonify(response=return_json)
    


@app.route('/notif-update/', methods=('GET', 'POST'))
def notif_update():
    return_json = {}
    if request.method == "POST":

        #If admin is logged in, don't mark things as read or update their feed counter.
        if session.get('admin'):
            return jsonify(return_json=return_json)            
        
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        if not user_id:
            return redirect(url_for('index'))
        user = User.query.get(user_id)

        if 'update-total-settings' in ajax_json:
            user.settings_notif = 0

        if 'update-feed-count' in ajax_json:
            user_notifications = sorted(user.notifications, key=lambda n:n.time_created)
            notification = user_notifications[ajax_json['notif_num']]
            notification.time_read = datetime.now()
            user.feed_notif = user.feed_notif - 1

        if 'update-total-unread' in ajax_json:
            user.feed_notif = ajax_json['update-total-unread']

        if 'update-total-messages' in ajax_json:
            user.msg_notif = ajax_json['update-total-messages']
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 

    return jsonify(return_json=return_json)

@app.route('/events/',methods =('GET', 'POST'))
def event_update():
    if request.method == 'POST':
        return_json = {}
        
        if session.get('admin'):
            return jsonify(return_json=return_json)

        ajax_json = request.json
        logging.info(ajax_json)

        user_id = session.get('user_id')
        user = User.query.get(user_id)

        return jsonify(return_json=return_json)


@app.route('/unsubscribe/<email>/')
@app.route('/unsubscribe/<email>/<tag>/<campaign>/')
def unsubscribe(email = None, tag = None, campaign = None):
    if not email:
        return redirect(url_for('index'))
    else:
        already_unsubscribed = Unsubscribe.query.filter_by(email=email).first()
        if not already_unsubscribed:
            unsubscribe_user = Unsubscribe(
                                email=email,
                                tag=tag,
                                campaign=campaign,
                                time_created = datetime.now()
                                )
            db_session.add(unsubscribe_user)
            user = User.query.filter_by(email=email).first()
            if user:
                user.text_notification = False
                user.email_notification = False
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise
        else:
            logging.info("email: " + email + " has already unsubscribed.")

    return render_template('unsubscribe.html', email=email)

@app.route('/reset-password/', methods=('GET', 'POST'))
def reset_pw():
    return_json = {}
    if request.method == 'POST':

        ajax_json = request.json

        if 'email' in ajax_json:
            from emails import generate_new_password
            from app.static.data.random_codes import random_codes_array
            import random
            new_password = random.choice(random_codes_array).lower()
            
            email = ajax_json['email'].lower()

            user = User.query.filter_by(email=email).first()
            if user:
                user.password = md5(new_password).hexdigest()
                generate_new_password(user, new_password)
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise 


    return jsonify(return_json=return_json)

@app.route('/update-skill/', methods=('GET', 'POST'))
def update_skill():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        user_id = session.get('user_id')
        if not user_id:
            return redirect(url_for('index'))
        user = User.query.get(user_id)

        from app.static.data.variations import courses_dict

        if ajax_json.get('add'):
            skill_to_add = ajax_json.get('add').lower()
            # if session.get('tutor-signup'):
            #     session.pop('tutor-signup')

            #check if skill is a course
            if courses_dict.get(skill_to_add):
                skill_to_add_id = courses_dict[skill_to_add]
                skill = Skill.query.get(skill_to_add_id)
                user.skills.append(skill)
            else: #not a course 
                course = Course(skill_to_add)
                db_session.add(course)
        if ajax_json.get('remove'):
            from app.static.data.short_variations_reverse import short_variations_reverse_dict
            skill_name = ajax_json.get('remove').lower()
            if courses_dict.get(skill_name):
                skill_to_remove_id = courses_dict[skill_name]
                skill = Skill.query.get(skill_to_remove_id)
                skill.tutors.remove(user)
                user.skills.remove(skill)

        try:
            db_session.commit()
            if len(user.skills) == 0:
                session['tutor-signup'] = True
        except:
            db_session.rollback()
            raise 
        return jsonify(response=return_json)
    

@app.route('/update-password/', methods=('GET','POST'))
def update_password():
    if request.method == "POST":
        return_json = {}
        
        ajax_json = request.json
        old_password = md5(ajax_json.get('old-pwd')).hexdigest()
        new_password = md5(ajax_json.get('new-pwd')).hexdigest()
        user_id = session['user_id']
        user = User.query.get(user_id)
        
        if old_password != user.password:
            return_json['error'] = 'Incorrect original password'
        else:
            user.password = new_password
            return_json['success'] = 'Password successfully updated'
            logging.info("user password before was " + str(old_password))
            logging.info("user password is now" + str(new_password))
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        return jsonify(response=return_json)

@app.route('/apply/')
def apply():
    return render_template('apply.html')

@app.route('/validation/', methods=('GET', 'POST'))
def success():
    if request.method == "POST":
        ajax_json = request.json
        logging.info(ajax_json)

        if ajax_json.get('student-signup'):
            try: 
                if not ajax_json.get('email'):
                    from api import errors
                    return errors(['Something went wrong ... Try again!'])

                u = User.query.filter_by(email=ajax_json['email'].lower()).first()
                
                #Check if account already exists
                if u and not u.fb_account:
                    return jsonify(dict={'account-exists':True});

                if 'fb-signup' in ajax_json:
                    #They have a facebook account and they want to login
                    if u and u.fb_account:
                        user_id = u.id
                        authenticate(user_id)
                        fb_result_dict = {'fb-account-exists': True}
                        if session.get('redirect'):
                            fb_result_dict['redirect'] = session.get('redirect')
                            session.pop('redirect')
                        return jsonify(dict=fb_result_dict);
                    password = ''
                else:
                    password = md5(ajax_json['password']).hexdigest()

                if u:
                    return jsonify(dict={'account-exists':True});

                if 'tutor-signup' in ajax_json: 
                    session['tutor-signup'] = True

                if 'sproul-intern-referral' in ajax_json: session['referral'] = ajax_json['sproul-intern-referral'] + '-sproul'

                u = User(
                        name = ajax_json['name'].title(),
                        password = password,
                        email = ajax_json['email'].lower(),
                        phone_number = None
                    )
                u.last_active = datetime.now()
                u.fb_account = True if 'fb-signup' in ajax_json else False
                db_session.add(u)
                db_session.commit()

                if session.get('referral'):
                    u.referral_code = session['referral']
                    user_with_promo_code = User.query.filter_by(user_referral_code = session.get('referral')).first()
                    if user_with_promo_code:
                        p = Promo()
                        p.time_used = datetime.now()
                        p.sender_id = user_with_promo_code.id
                        p.receiver_id = u.id
                        p.tag = 'referral'
                        db_session.add(p)
                        u.promos.append(p)
                        user_with_promo_code.promos.append(p)
                        u.credit = u.credit + 5

                    session.pop('referral')
                
                m = Mailbox(u)
                db_session.add(m)
                
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            user_id = u.id
            u.user_referral_code = create_referral_code(u)

            if not ajax_json.get('instant'):
                authenticate(user_id)

            try:
                from notifications import getting_started_student, welcome_guru, getting_started_tutor, getting_started_student_tip
                if session.get('tutor-signup'):
                    from notifications import getting_started_tutor, welcome_guru
                    welcome_guru_notification = welcome_guru(u)
                    u.notifications.append(welcome_guru_notification)
                    db_session.add(welcome_guru_notification)
                    notification = getting_started_tutor(u)
                    from emails import welcome_uguru_tutor
                    welcome_uguru_tutor(u)
                    u.notifications.append(notification)
                    db_session.add(notification)
                    u.approved_by_admin = True
                    u.verified_tutor = True
                else:
                    notification = getting_started_student(u)
                    notification2 = getting_started_student_tip(u)
                    u.notifications.append(notification2)
                    db_session.add(notification)
                    db_session.add(notification2)
                    u.notifications.append(notification)
                db_session.add(u)
                db_session.commit()
            except:
                db_session.rollback()
                raise 

        #Create a tutor for the first time
        if ajax_json.get('complete-tutor-signup'):
            u = User.query.get(session['user_id'])
            u.qualifications = ajax_json.get('complete-tutor-signup')
            if session.get('tutor-signup') : session.pop('tutor-signup')
            u.year = 'sophomore'
            if 'student-convert' not in ajax_json:
                u.verified_tutor = True
                from emails import welcome_uguru_tutor
                welcome_uguru_tutor(u)
                u.settings_notif = u.settings_notif + 1
            try:
                db_session.commit()
            except:
                db_session.rollback()

        if ajax_json.get('verify-tutor'):
            try:
                user_id = session.get('user_id')
                user = User.query.get(user_id)
                user.feed_notif = user.feed_notif + 1
                user.verified_tutor = True
                already_has_notifications = False
                
                if user.notifications:
                    already_has_notifications = True

                from notifications import getting_started_tutor, getting_started_tutor_2
                notification1 = getting_started_tutor(user)
                notification2 = getting_started_tutor_2(user)
                db_session.add(notification1)
                db_session.add(notification2)
                user.notifications.append(notification1)
                user.notifications.append(notification2)
                db_session.commit()

                if already_has_notifications:
                    for n in user.notifications:
                        if n.a_id_name != 'getting-started' and n.a_id_name != 'getting-started-tutor':
                            n.time_created = datetime.now()

                db_session.commit()

                #increment feed counter
                #create fake notification
            except:
                db_session.rollback();

        return jsonify(dict=ajax_json)

# TODO : This should go in api.py
@app.route('/student_request/', methods=('GET', 'POST'))
def student_request():
    
    from api import errors, success

    ajax_json = request.json
    logging.info("===Printing the json for a student request===")
    logging.info(ajax_json)

    from app.static.data.variations import courses_dict
    from app.static.data.short_variations import short_variations_dict

    original_skill_name = ajax_json['skill'].lower()
    if not courses_dict.get(original_skill_name):
        return errors(['Please choose a skill from the listed courses we have in the dropdown.'])

    # Get current user_id
    user = User.query.get(session['user_id'])
    logging.info("===Printing details about the user who made this request===")
    logging.info(user)

    if ajax_json.get('phone'):
        # If there is another user with the same number,
        other_user = User.query.filter_by(phone_number=ajax_json.get('phone')).first()
        if other_user and user != other_user:
            return errors(['A duplicate account already exists with phone ' + ajax_json.get('phone') + '. Logout and try "Forgot your Password"'])
        else:
            # If not, update user with new phone number
            user.phone_number = ajax_json.get('phone')

    # Get information about the skill they are requesting help in
    skill_id = courses_dict[original_skill_name]
    skill = Skill.query.get(skill_id)
    skill_name = short_variations_dict[skill.name]

    logging.info("===Checking whether a similar request has been made too recently===")
    previous_request = sorted(Request.query.filter_by(student_id=user.id, skill_id=skill_id).all(), key=lambda n:n.time_created, reverse = True)
    if previous_request:
        most_recent_time = previous_request[0].time_created
        from api import get_time_diff_in_seconds
        time_diff_in_seconds = get_time_diff_in_seconds(datetime.now(), most_recent_time)
        if time_diff_in_seconds < 7200 and os.environ.get("PRODUCTION"):
            logging.info("Fail: Requesting help for skill too soon after last request.")
            return errors(['Sorry! You must wait 2 hours before you make a request for ' + skill_name.upper() + ' again.'])

    # Check if current user is a tutor, and if so, whether they are a turor for this particular skill.
    if user.verified_tutor: # or user.is_a_tutor:
        if skill in user.skills:
            logging.info("Fail: Requesting help for class user is a tutor in.")
            return errors(['Sorry! You cannot request help for a class you are a tutor in.'])

    # If student already has an outgoing request
    for user_request in user.outgoing_requests:
        if user_request.skill_id == skill_id:
            logging.info("Fail: Requesting help while there is already and active request.")
            return errors(["You already have an active request for this course.  Please cancel your previous requst and try again."])

    logging.info("===Creating a new request===")
    new_request = Request(
        student_id = user.id,
        skill_id = skill_id,
        description = ajax_json['description'],
        urgency = int(ajax_json['urgency']),
        time_estimate = float(ajax_json['estimate'])
        )

    new_request.remote = ajax_json.get('remote')
    new_request.num_students = 1 # TODO : this will eventually be variable?
    new_request.student_estimated_hour = 20
    new_request.location = ajax_json['location']
    new_request.available_time = '' # TODO : What does this do?

    user.outgoing_requests.append(new_request)
    db_session.add(new_request)

    try:
        db_session.commit()
    except:
        db_session.rollback()
        logging.info("Failed to add the request to the database")
        return errors(["Sorry, we couldn't make your request at this time. Try again later"])
    
    logging.info("===Request was successfully committed to the database===")
    logging.info(new_request)

    # Create notification object for request and store it in the database
    from notifications import student_request_receipt, tutor_request_offer

    notification = student_request_receipt(user, new_request, original_skill_name)
    user.notifications.append(notification)
    db_session.add(notification)
    try:
        db_session.commit()
    except:
        db_session.rollback()
        logging.info("Failed to save notification to database.")
        raise 

    logging.info("===Student request notification was successfully committed to the database===")
    if not skill.tutors:
        return errors(["Sorry! There are currently no active tutors for this course.  Try again soon!"])

    # Tutors are currently not contacted when there is a request.
    tier_2_tutor_ids = []
    tier_2_tutors = []
    logging.info("===Going through all qualified tutors for this request...===")
    logging.info("Here are all the requested tutors: " + str(new_request.requested_tutors))
    for tutor in new_request.requested_tutors:
        #Only if they are approved tutors
        logging.info(str(tutor) + " is qualified.")

        #Check if conversation already exists between tutor + student. If so, we don't want to see it.
        conversation = Conversation.query.filter_by(student_id=user.id, guru_id=tutor.id).first()
        if conversation and conversation.requests and conversation.requests[0].skill_id == new_request.skill_id:
            new_request.requested_tutors.remove(tutor)
            continue

        #check if tutor is in tutor blacklist
        if tutor.id in tutor_blacklist:
            new_request.requested_tutors.remove(tutor)
            continue

        if tutor.approved_by_admin: # or tutor.is_a_tutor:
            logging.info(str(tutor) + " is approved by admin.")
            if is_tier_one_tutor(tutor):
                logging.info(str(tutor) + ' is a tier 1 tutor')
                if tutor.text_notification and tutor.phone_number:
                    logging.info(str(tutor) + ' is qualified to receive a text')
                    from emails import request_received_msg
                    from tasks import send_twilio_message_delayed
                    message = request_received_msg(user, tutor, new_request, skill_name)
                    send_twilio_message_delayed.apply_async(args=[tutor.phone_number, message, tutor.id])
                tutor.incoming_requests_to_tutor.append(new_request)
                notification = tutor_request_offer(user, tutor, new_request, skill_name)
                db_session.add(notification)
                tutor.notifications.append(notification)
            else:
                logging.info(str(tutor) + ' is a tier 2 tutor')
                tier_2_tutor_ids.append(tutor.id)
                tier_2_tutors.append(tutor)
                logging.info(tier_2_tutor_ids)

    for tutor in tier_2_tutors:
        logging.info("Tutor has been removed: " +  str(tutor))
        new_request.requested_tutors.remove(tutor)

    if tier_2_tutor_ids:
        logging.info("Here are all the tier2 tutor ids: " + str(tier_2_tutor_ids))
        from tasks import send_student_request_to_tutors
        if not os.environ.get('PRODUCTION'):
            send_student_request_to_tutors.apply_async(args=[tier_2_tutor_ids, new_request.id, user.id, skill_name], countdown=100)
        else:
            send_student_request_to_tutors.apply_async(args=[tier_2_tutor_ids, new_request.id, user.id, skill_name], countdown=3600)

    logging.info("==Contacting tutors==")
    # Send emails + create objects
    from emails import student_needs_help
    mandrill_result, tutor_email_dict = student_needs_help(user, new_request.requested_tutors, skill_name, new_request)
    for sent_email_dict in mandrill_result:
        if tutor_email_dict.get(sent_email_dict['email']):
            tutor = tutor_email_dict[sent_email_dict['email']]
            email = Email(
                tag='tutor-request',
                user_id=tutor.id,
                time_created=datetime.now(), 
                mandrill_id = sent_email_dict['_id']
                )
            db_session.add(email)
            tutor.emails.append(email)
            new_request.emails.append(email)
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise

    logging.info("===Student Request Complete. Texts and Emails successfully sent out===")
    return success(["Student request has been made!"])

@app.route('/logout/', methods=('GET', 'POST'))
def logout():
    if session.get('user_id'):
        session.pop("user_id")
    if session.get('tutor-signup'):
        session.pop('tutor-signup')
    if session.get('signup-start-user-id'):
        session.pop('signup-start-user-id')
    if session.get('signup-start'):
        session.pop('signup-start')
    if session.get('admin'):
        return redirect(url_for('new_admin'))
    return redirect(url_for("index"))

@app.route('/logout-admin/')
def admin_logout():
    if session.get('admin'):
        session.pop("admin")
    return redirect(url_for('index'))

@app.route('/payments/')
def payments():
    return redirect(url_for('welcome'))
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        return render_template('payments.html', user=user)
    else:
        return redirect(url_for('index'))

@app.route('/login/', methods=('GET', 'POST'))
def login():
    if session.get('user_id'):
        # flash("You are already logged in!")
        return redirect(url_for('index'))
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        logging.info(ajax_json)
        if ajax_json['email'].lower() == 'testing@uguru.me' \
            and ajax_json['password'].lower() == 'launchuguru' and os.environ.get('TESTING'):
            session['testing-admin'] = True
            json['success'] = True                
            json['testing-admin'] = True
            return jsonify(json=json)

        if ajax_json['email'].lower() == 'admin@uguru.me' \
            and ajax_json['password'].lower() == 'launchuguru':
            session['admin'] = True
            users = User.query.order_by(desc(User.id)).all()
            pretty_dates = {}
            skills_dict = {}
            tutor_count = 0
            student_count = 0
            for u in users: 
                pretty_dates[u.id] = pretty_date(u.time_created)
                if u.skills:
                    result_string = ""
                    for s in u.skills:
                        result_string = result_string + s.name + " "
                    skills_dict[u.id] = result_string
                    tutor_count +=1 
                else:
                    student_count += 1
            json['admin'] = True
            return jsonify(json=json)

        email = ajax_json['email'].lower()
        password = md5(ajax_json['password']).hexdigest()
        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            if not user.name:
                json['unfinished'] = True
                session['signup-start'] = user.email
                session['signup-start-user-id'] = user.id
            else:
                authenticate(user.id)
                json['success'] = True                
        else:
            if user and user.fb_account:
                json['fb-account'] = True
            json['failure'] = False

        if json.get('success') and session.get('redirect'):
            json['redirect'] = session.get('redirect')
            session.pop('redirect')

        return jsonify(json=json)
    if os.environ.get('PRODUCTION'):
        return redirect(url_for('index'))
    return render_template("login.html")

@app.route('/access/', methods=('GET','POST'))
def access():
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        access_code = ajax_json['access']
        access_codes = ['goslc50', 'gospc10', 'goess10','gohkn20', 'gobears30', 'golee', 'gojackie', \
        'gojared', 'gomichael','gosamir','gojonathan','gosaba','gorafi', 'godorms20', 'gopeace20'\
        ,'goess10']

        from app.static.data.random_codes import random_codes_array

        if access_code.lower() in access_codes or access_code.upper() in random_codes_array:
            json['success'] = True            
            session['referral'] = access_code.lower()
        else:
            json['failure'] = False
        return jsonify(json=json)

@app.route('/admin-access/', methods=('GET', 'POST'))
def admin_access():
    if request.method == "POST": 
        json = {}
        ajax_json = request.json
        user_id = ajax_json['user-id']
        if session.get('user_id'):
            session.pop('user_id')
        session['user_id'] = int(user_id)
        return jsonify(json=ajax_json)

@app.route('/activity/request/')
def activity_request():
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/activity/#request'
        return redirect('/log_in/')
    else:
        return redirect('/activity/#request')

@app.route('/activity/packages/')
def activity_packages():
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/activity/#packages'
        return redirect('/log_in/')
    else:
        return redirect('/activity/#request')

@app.route('/activity/promotion/1/')
def activity_promotion():
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/activity/#p1'
        return redirect('/log_in/')
    else:
        return redirect('/activity/#p1')



@app.route('/activity/', methods=('GET', 'POST'), defaults={'arg': None})
@app.route('/activity/<arg>/')
def activity(arg=None):
    return redirect(url_for('welcome'))
    if not session.get('user_id'):
        session['redirect'] = '/activity/'
        return redirect('/log_in/')
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    request_dict = {}
    address_book = {}
    payment_dict = {}
    pretty_dates = {}
    pending_ratings_dict = {}
    outgoing_request_index = {}
    tutor_dict = {}
    confirm_payments = []
    urgency_dict = ['ASAP', 'Tomorrow', 'This week']

    from app.static.data.prices import prices_dict
    prices_reversed_dict = {v:k for k, v in prices_dict.items()}
    avg_rating = None
    num_ratings = None
    if user.tutor_ratings:
        avg_rating, num_ratings = calc_avg_rating(user)
    if user.outgoing_requests:
        index = 0
        for o_r in user.outgoing_requests:
            outgoing_request_index[o_r] = index
            index += 1
    if user.pending_ratings:
        rating = user.pending_ratings[0]
        student = User.query.get(rating.student_id)
        tutor = User.query.get(rating.tutor_id)
        pending_ratings_dict['student'] = student
        pending_ratings_dict['tutor'] = tutor
    if arg == 'all':
        user_notifications = user.get_all_notifications()
    else:
        user_notifications = user.get_recent_notifications()
    for notification in user_notifications:
        notification.feed_message = notification.feed_message.replace("<b>", "<span class='green-text normal-text'> ").replace("</b>", " </span>")
        if notification.feed_message_subtitle:
            notification.feed_message_subtitle = notification.feed_message_subtitle.replace("<b>", "").replace("</b>", "")
        if notification.request_tutor_id:
            tutor_dict[notification] = User.query.get(notification.request_tutor_id)
        if notification.custom_tag == 'student-request-help':
            from api import get_time_diff_in_seconds, REQUEST_EXP_TIME_IN_SECONDS, get_time_remaining
            seconds_since_creation = get_time_diff_in_seconds(datetime.now(), notification.time_created)
            r = Request.query.get(notification.request_id)
            if seconds_since_creation > REQUEST_EXP_TIME_IN_SECONDS or notification.status == 'EXPIRED':
                from tasks import expire_request_job
                notification.status = 'EXPIRED'
                expire_request_job.apply_async(args=[notification.request_id, user.id])
            elif len(r.committed_tutors) == (MAX_REQUEST_TUTOR_LIMIT + 1):
                notification.status = '' 
            else:
                notification.status = get_time_remaining(REQUEST_EXP_TIME_IN_SECONDS - seconds_since_creation)
        if notification.custom_tag == 'student-incoming-offer':
            from api import get_time_diff_in_seconds, TUTOR_ACCEPT_EXP_TIME_IN_SECONDS, get_time_remaining
            seconds_since_creation = get_time_diff_in_seconds(datetime.now(), notification.time_created)
            if seconds_since_creation > TUTOR_ACCEPT_EXP_TIME_IN_SECONDS or notification.status == 'EXPIRED':
                notification.status = 'EXPIRED'
            elif notification.status == 'tutor_cap_reached':
                notification.status = get_time_remaining(TUTOR_ACCEPT_EXP_TIME_IN_SECONDS - seconds_since_creation)

        if notification.request_id and notification.custom_tag == 'student-incoming-offer':
            r = Request.query.get(notification.request_id)
            if r.connected_tutor_id:
                notification.status = ''

        pretty_dates[notification.id] = pretty_date(notification.time_created)
    for conversation in user.mailbox.conversations:
        if conversation.student_id != user.id:
            student = User.query.get(conversation.student_id)
            address_book[student.id] = \
                {'profile_url': student.profile_url, 'conversation_id' : conversation.id, 'student_name' : student.name.split(" ")[0]}
    all_outgoing_requests = Request.query.filter_by(student_id = user.id).all()
    for request in (user.outgoing_requests + user.incoming_requests_to_tutor + user.incoming_requests_from_tutors + all_outgoing_requests):
        student_id = request.student_id
        if user.skills and len(address_book.keys())>0:
            if address_book.get(student_id):
                    address_book[student_id]['request'] = request
        student = User.query.get(request.student_id)
        request_dict[request.id] = {'request':request,'student':student}
    for payment in user.payments:
        tutor_id = payment.tutor_id
        student_id = payment.student_id
        if payment.student_id and payment.tutor_id:
            tutor = User.query.get(tutor_id)
            student = User.query.get(student_id)
            if (payment.tutor_id == user.id and payment.tutor_confirmed == False) or (payment.student_id == user.id and payment.student_confirmed == False):
                confirm_payments.append({
                    'payment': payment,
                    'student_name': student.name.split(" ")[0].title(),
                    'tutor_name': tutor.name.split(" ")[0].title(),
                    'student': student,
                    'tutor': tutor
                    })
            payment_dict[payment.id] = {'payment': payment, 'tutor_name':tutor.name.split(' ')[0],\
            'student_name': student.name.split(' ')[0]}

        
    from app.static.data.short_variations import short_variations_dict
    return render_template('activity.html', key=stripe_keys['publishable_key'], address_book=address_book, \
        logged_in=session.get('user_id'), user=user, request_dict = request_dict, payment_dict = payment_dict,\
        pretty_dates = pretty_dates, urgency_dict=urgency_dict, tutor_dict=tutor_dict, pending_ratings_dict=pending_ratings_dict,\
        environment = get_environment(), prices_dict=prices_dict, prices_reversed_dict=prices_reversed_dict, session=session,\
        outgoing_request_index=outgoing_request_index, avg_rating=avg_rating, num_ratings = num_ratings, time=time, variations=short_variations_dict,\
        confirm_payments=confirm_payments, user_avg_rating = calc_avg_rating(user), user_notifications=user_notifications)

@app.route('/guru-rules/')
def guru_rules():
    return render_template('guru-rules.html')

@app.route('/messages/')
def messages():
    return redirect(url_for('welcome'))
    if not session.get('user_id'):
        return redirect(url_for('index'))
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    pretty_dates = {}
    transactions = []
    for p in user.payments:
        if p.tutor_id and p.student_id:
            if user.verified_tutor:
                transactions.append(User.query.get(p.student_id))
            else:
                transactions.append(User.query.get(p.tutor_id))
    for conversation in user.mailbox.conversations:
        r = conversation.requests[0]
        for message in conversation.messages:
            pretty_dates[message.id] = pretty_date(message.write_time)
    
    conversations = sorted(user.mailbox.conversations, key=lambda c:c.last_updated)
    return render_template('messages.html', user=user, pretty_dates=pretty_dates, environment = get_environment(), session=session, \
        transactions = transactions, conversations=conversations)


@app.route('/settings/referral/')
def settings_referral():
    return redirect(url_for('welcome'))
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/settings/#referral'
        return redirect('/log_in/')
    else:
        return redirect('/settings/#referral')

@app.route('/settings/billing/')
def settings_billing():
    return redirect(url_for('welcome'))
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/settings/#billing'
        return redirect('/log_in/')
    else:
        return redirect('/settings/#billing')

@app.route('/settings/profile/')
def settings_profile():
    return redirect(url_for('welcome'))
    user_id = session.get('user_id')
    if not user_id:
        session['redirect'] = '/settings/#prof'
        return redirect('/log_in/')
    else:
        return redirect('/settings/#prof')


@app.route('/settings/')
def settings():
    return redirect(url_for('welcome'))
    user_id = session.get('user_id')
    not_launched_flag = False
    logging.info(request.url)
    if not user_id:
        session['redirect'] = '/settings/'
        return redirect('/log_in/')
    user = User.query.get(user_id)
    if not session.get('admin'):
        user.last_active = datetime.now()
    if user.verified_tutor and not is_tutor_verified(user):
        not_launched_flag = True
    from app.static.data.short_variations import short_variations_dict
    num_ratings = None
    avg_rating = None
    if user.tutor_ratings:
        avg_rating, num_ratings = calc_avg_rating(user)
    return render_template('settings.html', logged_in=session.get('user_id'), user=user, \
        variations=short_variations_dict, not_launched_flag = not_launched_flag, \
        environment = get_environment(), session=session, avg_rating = avg_rating, num_ratings = num_ratings,key=stripe_keys['publishable_key'])

def calc_avg_rating(user):
    total_rating_sum = 0
    num_ratings = 0
    for rating in user.tutor_ratings:
        if rating.tutor_rating:
            total_rating_sum += rating.tutor_rating
            num_ratings += 1
    if num_ratings:
        avg_rating = round((total_rating_sum/float(num_ratings))*2)/2
    else:
        avg_rating = 0
    return avg_rating, num_ratings


def upload_file_to_amazon(filename, file):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_file(file)
    sml.set_acl('public-read')

def pretty_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    """
    from datetime import datetime
    now = datetime.now()
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time,datetime):
        diff = now - time 
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "just now"
        if second_diff < 60:
            return str(second_diff) + " seconds ago"
        if second_diff < 120:
            return  "a minute ago"
        if second_diff < 3600:
            return str( second_diff / 60 ) + " minutes ago"
        if second_diff < 7200:
            return "an hour ago"
        if second_diff < 86400:
            return str( second_diff / 3600 ) + " hours ago"
    if day_diff == 1:
        return "Yesterday"
    if day_diff < 7:
        return str(day_diff) + " days ago"
    if day_diff < 31:
        return str(day_diff/7) + " weeks ago"
    if day_diff < 365:
        return str(day_diff/30) + " months ago"
    return str(day_diff/365) + " years ago"


def is_tutor_verified(tutor):
    tutor_verified_flag = False
    for n in tutor.notifications:
        if n.a_id_name == 'getting-started':
            tutor_verified_flag = True
    return tutor_verified_flag

def schedule_job(func, seconds_delay, args):
    sched = Scheduler()
    sched.start()
    later_time = datetime.now() + timedelta(0, seconds_delay)                
    job = sched.add_job(func=func, next_run_time=later_time, args=args) 

def authenticate(user_id):
    session['user_id'] = user_id

def generate_secret_code():
    import random 
    from random import randint 
    from app.static.data.animals import animal_list
    return random.choice(animal_list) + str(randint(1, 100))

####################
#  Error Handling  #
####################

if os.environ.get('PRODUCTION') or os.environ.get('TESTING'):
    @app.errorhandler(500)
    def internal_server(e):
        message = traceback.format_exc()
        logging.info(message)
        from emails import error
        if session.get('user_id'):
            logging.info(session.get('user_id'))
            user = User.query.get(session.get('user_id'))
            from pprint import pprint # TODO : is pprint needed for any particular reason?
            message += "\n\n" + str(pprint(vars(user))) 
        error(message)
        return render_template('500.html'), 500

    @app.errorhandler(Exception)
    def catch_all(e):
        message = traceback.format_exc()
        logging.info(message)
        from emails import error
        if session.get('user_id'):
            user = User.query.get(session.get('user_id'))
            from pprint import pprint # TODO : is pprint needed for any particular reason?
            message += "\n\n" + str(pprint(vars(user)))
        error(message)
        return render_template('500.html')

def update_profile_notifications(user):
    a_id_names = ['getting-started', 'getting-started-tutor']
    custom_tags = ['student-request-help', 'tutor-receive-payment', 'tutor-cashed-out']
    for user in User.query.all():
        if user.profile_url != '/static/img/default-photo.jpg':
            for n in user.notifications:
                if n.a_id_name in a_id_names or n.custom_tag in custom_tags:
                    if n.image_url != user.profile_url:
                        n.image_url = user.profile_url
                        logging.info(str(user) + str(n.feed_message[0:30]) + " notification is now updated")
    return False


def convert_mutual_times_in_seconds(mutual_arr, _request):
    total_seconds = 0
    logging.info(mutual_arr)
    if mutual_arr[0]:
        total_seconds = (mutual_arr[0] - 1) * 24 * 3600 #one day of seconds depending on the offset days from today
        total_seconds = total_seconds + float(mutual_arr[1] / 2.0) * 3600
    total_seconds = total_seconds + total_seconds_remaining_today()
    return total_seconds
            
def total_seconds_remaining_today():            
    import datetime as datetime_orig
    today = datetime_orig.date.today()
    tomorrow = datetime.combine((today + timedelta(days = 1)), datetime.min.time())
    return (tomorrow - datetime.now()).total_seconds()

def get_environment():
    environment = "LOCAL"
    if os.environ.get('PRODUCTION'):
        environment = "PRODUCTION"
    if os.environ.get("TESTING"):
        environment = "TESTING"
    return environment


def create_referral_code(user):
    first_name = user.name.split(" ")[0].lower()
    users_with_promo_code = User.query.filter_by(user_referral_code = first_name).first()
    #First attempt
    if (not users_with_promo_code):
        return first_name
    # first_name_last_initial = first_name + user.name.split(" ")[1][0].lower()
    # users_with_promo_code = User.query.filter_by(user_referral_code = first_name_last_initial).first()
    # if (not users_with_promo_code):
    #     return first_name_last_initial
    return first_name + str(user.id)


def update_text(message, text = None):
    from email.utils import parsedate_tz
    if not text:
        text = Text()
    else:
        text.date_sent = datetime(*parsedate_tz(message.date_sent)[:6])
    
    text.sid = message.sid
    text.date_created = datetime.now()
    text.to_phone = message.to
    text.from_phone = message.from_
    text.body = message.body
    text.status = message.status
    text.date_created = datetime(*parsedate_tz(message.date_created)[:6])
    text.date_updated = datetime(*parsedate_tz(message.date_updated)[:6])
    text.price = message.price
    text.uri = message.uri
    text.account_sid = message.account_sid
    return text

def is_tier_one_tutor(tutor):
    if not tutor.tutor_ratings:
        return False
    _sum = 0
    _index = 0
    if tutor.tutor_ratings:
        for rating in tutor.tutor_ratings:
            if rating.tutor_rating:
                _sum += rating.tutor_rating
                _index += 1 
    if _sum > 0:
        avg_rating = float (_sum) / float (_index)
        if avg_rating >= 4.0:
            logging.info(str(tutor) + ' avg rating is approved')
            return True
    return False