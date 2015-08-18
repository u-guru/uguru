import os, hashlib, stripe
from app.database import *
from models import *
from twilio import *
from twilio.rest import TwilioRestClient
from flask import render_template, redirect, url_for, session, request

# Twilio
TWILIO_DEFAULT_PHONE = "+15104661138"
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])

admin_authkey = 'fe78e1c1cddfe4b132c7963136243aa51ac5609fb17839bf65a446d6' #hash for username


# Stripe
stripe_keys = {
    'secret_key': os.environ['STRIPE_SECRET_KEY'],
    'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']

# Mixpanel
from mixpanel import Mixpanel
mp = Mixpanel(os.environ['MIXPANEL_TOKEN'])


###############
## NEW ADMIN ##
###############

@app.route('/admin/staging/')
def admin_statistics():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return redirect(url_for('new_home_page'))

@app.route('/admin/login/')
def admin_login():
    error = None
    if request.args.get("email", None) and request.args.get("password"):
        email = request.args.get("email").lower()
        password = request.args.get("password")

        from app.lib.admin import admin_info
        print email, password
        if check_admin_password(email, password):
            session['user'] = admin_info[email]

            if 'investors.uguru.me' in request.url:
                return redirect(url_for('admin_investor_stats'))

            return redirect(request.path)
        else:
            session['error'] = 'incorrect username & password'
            return redirect(request.path)

    if session.get('error'):
        error = 'incorrect username & password'
        session.pop('error')

    if session.get('user'):
        return redirect(url_for('admin_team_calendar'))

    return render_template("new_admin/login.html", error=error)

@app.route('/500-test')
def internal_test():
    return render_template("<b>500</b>")

@app.route('/admin/statistics/')
def admin_statistics():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    stats = Stats.query.get(1)
    return render_template("new_admin/admin.statistics.html", stats=stats)

@app.route('/admin/stats/devices/')
def admin_devices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    test_devices = sorted(Device.getTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    regular_devices = sorted(Device.getNonTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    return render_template("new_admin/admin.stats.devices.html", test_devices=test_devices, \
        regular_devices=regular_devices)

@app.route('/')
@app.route('/staging/')
def new_home_page():
    return render_template("gabrielle/index.html")

@app.route('/faq/')
def faq():
    return render_template("gabrielle/faq.html")

@app.route('/manifest/')
def manifest():
    return render_template("gabrielle/manifest.html")

@app.route('/team/')
def team():
    return render_template("gabrielle/team.html")

@app.route('/staging/profile')
def profile_page():
    return render_template("gabrielle/profile.html")

@app.route('/admin/stats/campaigns/')
def admin_stats_campaigns():
    import requests, json
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        )
    arr = json.loads(response.text)
    university_arr = []
    for list_info in arr['items']:
        description = list_info['description']
        description_parsed = description.split('|')
        university_arr.append({
            'id': description_parsed[1].split(':')[1],
            'name': description_parsed[0].split(':')[1],
            'count': float(list_info['members_count']),
            'population': float(description_parsed[2].split(':')[1]),
            'percentage': int((float(list_info['members_count'])) / (float(description_parsed[2].split(':')[1]) * 1.0) * 100)
        })
    university_arr = sorted(university_arr, key=lambda u:u['count'], reverse=True)
    _sum = sum([uni['count'] for uni in university_arr])
    return render_template("new_admin/admin.stats.campaigns.html", university_arr=university_arr, sum=_sum)

@app.route('/admin/stats/universities/')
def admin_statistics():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    # test_devices = sorted(Device.getTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    # regular_devices = sorted(Device.getNonTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    universities = University.query.all()
    uni_length = len(universities) * 1.0
    latitudes = University.query.filter_by(latitude=None).all()
    websites = University.query.filter_by(website=None).all()
    populations = University.query.filter_by(population=None).all()
    school_mascots = University.query.filter_by(school_mascot_name=None).all()
    school_casuals = University.query.filter_by(school_casual_name=None).all()
    logo_urls = University.query.filter_by(logo_url=None).all()
    school_colors = University.query.filter_by(school_color_one=None).all()
    fa_starts = University.query.filter_by(fa15_start=None).all()
    target_universities = University.query.filter_by(is_targetted=True).all()
    target_universities = sorted(target_universities, key=lambda d:(d.fa15_start or datetime.now()) )
    stats = {
        'latitude': ((uni_length - len(latitudes)) / uni_length) * 100,
        'website': ((uni_length - len(websites)) / uni_length) * 100,
        'population': ((uni_length - len(populations)) / uni_length) * 100,
        'school_mascot_name': ((uni_length - len(school_mascots)) / uni_length) * 100,
        'school_casual_name': ((uni_length - len(school_casuals)) / uni_length) * 100,
        'logo_url': ((uni_length - len(logo_urls)) / uni_length) * 100,
        'school_colors': ((uni_length - len(school_colors)) / uni_length) * 100,
        'fa15_start': ((uni_length - len(fa_starts)) / uni_length) * 100
    }
    return render_template("new_admin/admin.stats.universities.html", universities =universities, stats=stats,\
        target_universities=target_universities)

###############
## Investors ##
###############

@app.route('/admin/i/stats/')
def admin_investor_stats():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.investors.statistics.html")

@app.route('/admin/i/product/')
def admin_view_campaigns():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.investors.product.html")

@app.route('/admin/i/competition/')
def admin_investors_competition():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.investors.competition.html")

@app.route('/admin/i/biz-model/')
def admin_investors_biz_model():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.investors.business-model.html")


###################
## END Investors ##
###################

@app.route('/admin/campaigns/')
def admin_view_campaigns():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/campaigns.html")

@app.route('/admin/campaigns/create/')
def admin_create():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/create-campaign.html")

@app.route('/admin/design/style/')
def admin_style_guide():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("style/index.html")

@app.route('/admin/design/inspired/')
def admin_components():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin-coming-soon.html")

@app.route('/admin/design/moodboards/')
def admin_components():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin-coming-soon.html")

@app.route('/admin/users/<_id>/')
def admin_users(_id):
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import User
    user = User.query.get(_id)
    return render_template("new_admin/admin.users.one.html", user=user)



@app.route('/admin/requests/')
def admin_requests():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import *

    unfiltered_requests = Request.query.all()
    real_before_220 = [167, 166, 163, 161, 160, 159, 149, 146, 143,141, 139, 112, 92, 78, 222, 219, 220, 216, 197, 225]
    student_requests = []
    for _request in unfiltered_requests:
        if _request.id in real_before_220 or _request.id > 226:
            student_requests.append(_request)
    return render_template('new_admin/student.requests.html', requests=student_requests[::-1])


@app.route('/admin/campaigns/scheduled/')
def admin_scheduled():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/scheduled-campaigns.html")

@app.route('/admin/campaigns/<campaign_name>/')
def admin_one_campaign(campaign_name):
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/one_campaign.html", tag_name=campaign_name)

@app.route('/admin/coming-soon/')
def admin_coming_soon():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin-coming-soon.html")

@app.route('/admin/product/releases/')
def admin_product_releases():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.product.releases.html")

@app.route('/admin/product/practices/')
def admin_best_practices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.product.practices.html")

@app.route('/admin/i/statistics/')
def admin_best_practices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.investors.statistics.html")

@app.route('/admin/support/tickets/')
def admin_testing():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import Support
    support_tickets = Support.query.all()
    return render_template("new_admin/admin.support.tickets.html", support_tickets=support_tickets[::-1])


@app.route('/admin/team/members/')
def admin_members():
    from app.lib.admin import admin_info
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.team-members.html", team=admin_info)

@app.route('/admin/team/routine/')
def admin_routine():
    from app.lib.admin import admin_info
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.team-routine.html", team=admin_info)



@app.route('/admin/expectations/')
def admin_expectations():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.team-expectations.html", team=[])

@app.route('/admin/team/project/')
def admin_team():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/team-project-items.html", team=[])

# @app.route('/admin/team/action/')
# def admin_team():
#     if not session.get('user'):
#         return redirect(url_for('admin_login'))
#     return render_template("new_admin/team-action-items.html", team=[])



@app.route('/admin/design/guidelines/')
def admin_design_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/design-guidelines.html", team=[])

@app.route('/admin/development/guidelines/')
def admin_dev_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/development-guidelines.html", team=[])

@app.route('/admin/development/api/')
def admin_dev_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/admin.development.api.html")

@app.route('/admin/')
@app.route('/admin/team/')
@app.route('/admin/team/calendar/')
def admin_team_calendar():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/team-calendar.html")

@app.route('/lte/')
def lte_theme():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return redirect("/static/new_admin/index2.html")


@app.route('/admin/bugs/')
def admin_bugs():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/bugs.admin.html", team=[])

@app.route('/admin/bugs/view/')
def admin_bugs_view():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/bugs.view.admin.html", team=[])

@app.route('/admin/development/style/')
def admin_development_style():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/style.development.admin.html", team=[])

@app.route('/admin/logout/')
def admin_logout():
    if session.get('user'):
        session.pop('user')
    return redirect(url_for('admin_login'))






@app.route('/admin/flickr/<university_id>')
def flicker_university_process(university_id):
    if not session.get('user'):
        return redirect(url_for('admin_login'))

    u = University.query.get(university_id)
    from lib.flickr_wrapper import *
    flickr_response = str(search_university_response_api(u))
    photos_arr = parse_flickr_response(flickr_response)
    processed_arr = process_returned_photos(photos_arr)
    processed_arr = sorted(processed_arr, key=lambda k:k['views'], reverse=True)[:20]
    return render_template('new_admin/admin.design.flickr.html', flickr_photos=processed_arr,  university=u)

@app.route('/terms/')
def uguru_terms():
    return render_template("web/content/terms.html")

@app.route('/auth/school_email/<confirm_email_token>')
def school_email_check(confirm_email_token):
    user = User.query.filter_by(school_email_token=confirm_email_token).first()
    if user:
        user.school_email_confirmed = True
        db_session.commit()
        result = "<script> alert('School email " + user.school_email + " confirmed!'); window.location.href = 'http://uguru.me';</script>"
        return result
    else:
        return 404

@app.route('/guru/')
def guru_home():

    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    return render_template("web/guru_home.index.html", university=supported_universities['virginia'])

def parse_user_agent(ua_str):
    if 'iphone' in ua_str.lower():
        return 'iphone'
    if 'android' in ua_str.lower():
        return 'android'
    else:
        return 'web'

@app.route('/hybrid-app/')
def hybrid_app():

    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    return render_template('web/hybrid.app.html', university=supported_universities['virginia'])

@app.route('/new/dev/m/<name>/', methods=["GET"])
def one_university_mobile_dev(name):
    os = parse_user_agent(request.headers['User-Agent'])
    first_name= None
    email= None

    if os == "iphone":
        return redirect('https://itunes.com/apps/uguru')

    if os == "android":
        return redirect('https://play.google.com/store/apps/details?id=com.Uguru.Uguru')

    return redirect('/m/' + name)

@app.route('/dev/m/<name>/', methods=["GET"])
@app.route('/m/<name>/', methods=["GET"])
def one_university_mobile(name):
    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    os = parse_user_agent(request.headers['User-Agent'])
    first_name= None
    email= None

    if request.args.get("email", None) is not None:
        email = request.args.get("email")
        email_user = Email_User.initEmailUser(email)
        session['email'] = email
        session['name'] = request.args.get("name")
        return redirect(request.path)

    if session.get("name"):
        first_name = session.get("name")
    if session.get("email"):
        email = session.get("email")

    print email, first_name

    if name in university_names:
        return render_template("web/university_mobile.html", \
            university=supported_universities[name], os=os, name=first_name\
            , email=email)
    else:
        return redirect(url_for('app_flex'))

@app.route('/u/<name>/<_id>/', methods=["GET"])
def one_university(name, _id):
    import random

    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    from app.static.data.universities_efficient import universities_arr
    u_titles = [university['title'].lower() for university in universities_arr]

    if not name or not _id:
        return redirect(url_for('app_student_home'))

    from lib.all_schools_updated import school_dict

    print name, _id
    university = school_dict.get(str(_id))

    if not university:
        return redirect(url_for('app_student_home'))

    university['name'] = name.replace('_', ' ').title()
    university['stats'] =  {'population':'24212', 'departments':'1231', 'courses':'23132', 'rating':'4.8'}


    popular_courses = []
    print university['popular_courses']
    for popular_course in university['popular_courses']:
        if len(popular_course) >= 5 and len(popular_course) <= 9 and not all(char.isdigit() for char in popular_course):
            popular_courses.append(popular_course)
    popular_courses = random.sample(popular_courses, 12)

    return render_template("web/university.html", university=university, departments=popular_courses)



@app.route('/itunes/app/')
def itunes_app():
    return redirect('https://itunes.com/apps/uguru')

@app.route('/android/app/')
def android_app():
    return redirect('https://play.google.com/store/apps/details?id=com.beta.college.Uguru')

@app.route('/windows/app/')
def windows_app():
    return redirect('https://www.windowsphone.com/en-us/store/app/uguru/8df574bc-cbdd-4d6c-af3f-a7b2fe259494')

@app.route('/production/app/')
@app.route('/app/production/')
@app.route('/app/')
def app_route():
    version = Version.query.get(1).ios
    print '\n\n\n\n\nrequest headers'
    print request.headers, type(request.headers)
    if 'iPad' in str(request.headers) and 'Safari' in str(request.headers):
        return redirect(url_for('hybrid_app'))
    if os.environ.get('PRODUCTION'):
        print "woohoo we're in production"
        return redirect('http://u.uguru.me/static/remote/index.html?version=' + str(version) + str(02323))
    else:
        print "aww im local"
        return redirect('http://localhost:8100/')
    # return redirect('http://192.168.0.104:5000/static/remote/index.html')
    # return redirect('http://192.168.42.66:8100/remote/')


def check_admin_password(email, password):
    from app.lib.admin import admin_info
    print email, password
    print email.lower(), password.lower()
    if admin_info.get(email):
        email_user_info = admin_info[email]
        first_name = email_user_info['name'].split(' ')[0].lower()
        if password == first_name + '-uguru-1':
            return True
    if admin_info.get(email) and (email.lower() == 'investors@uguru.me') and (password == '786-uguru-investor'):
        print 'it works'
        return True
    return False
