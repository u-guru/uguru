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

    return render_template("admin/login.html", error=error)

@app.route('/500-test')
def internal_test():
    return render_template("<b>500</b>")

@app.route('/admin/statistics/')
def admin_statistics():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    stats = Stats.query.get(1)
    return render_template("admin/admin.statistics.html", stats=stats)

@app.route('/admin/stats/devices/')
def admin_devices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    test_devices = sorted(Device.getTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    regular_devices = sorted(Device.getNonTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    return render_template("admin/admin.stats.devices.html", test_devices=test_devices, \
        regular_devices=regular_devices)

@app.route('/')
@app.route('/staging/')
def new_home_page():
    return render_template("web/index.html")

@app.route('/faq/')
def faq():
    return render_template("web/pages/faq.html")

@app.route('/manifest/')
def manifest():
    return render_template("web/pages/manifest.html")

@app.route('/team/profiles/<name>')
def team_profiles(name):

    from lib.admin import admin_info
    team_names_lower = [admin_info[key]['name'].split(' ')[0].lower() for key in admin_info.keys()]

    if name.lower() not in team_names_lower:
        return redirect(url_for('team'))

    member = name.lower()
    member_index = team_names_lower.index(member)
    member_dict = admin_info[admin_info.keys()[member_index]]

    return render_template("web/user-profile.html", member=member_dict)

@app.route('/team/')
def team():
    from lib.admin import admin_info
    team_members = [admin_info[key] for key in admin_info.keys() if not key == 'investors@uguru.me']
    return render_template("web/pages/team.html", team_members=team_members)

@app.route('/staging/profile')
def profile_page():
    return render_template("web/profile.html")

@app.route('/admin/stats/campaigns/')
def admin_stats_campaigns():
    ### all logic
    import requests, json
    if not session.get('user'):
        return redirect(url_for('admin_login'))

    from lib.mailgun import get_all_university_progress
    results_arr, no_results_arr = get_all_university_progress()

    from pprint import pprint
    pprint(results_arr)

    results_arr = sorted(results_arr, key=lambda u:int(u['rank']))
    no_results_arr = sorted(no_results_arr, key=lambda u:int(u['rank']))
    _sum = sum([uni['count'] for uni in results_arr])
    not_scrapeable = []

    ### take all the information & inject it into the html

    return render_template("admin/admin.stats.campaigns.html", university_arr=results_arr, sum=_sum, \
        remainder_arr=no_results_arr, not_scrapeable=not_scrapeable)

@app.route('/admin/stats/universities/')
def admin_statistics():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    # test_devices = sorted(Device.getTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    # regular_devices = sorted(Device.getNonTestDevices(), key=lambda d:d.last_accessed, reverse=True)
    import json
    uni_targetted_arr = json.load(open('app/static/data/fa15_targetted.json'))

    all_university_arr = json.load(open('app/static/data/fa15_all.json'))

    all_targetted_names = [uni['name'] for uni in uni_targetted_arr]
    remaining_unis = [uni for uni in all_university_arr if uni['name'] not in all_targetted_names]
    for u in remaining_unis:
        fields_remaining = ""
        if not u.get('latitude'):
            fields_remaining += 'lat/long '
        if not u.get('fa15_start'):
            fields_remaining += 'fa15_start '
        if not u.get('logo_url'):
            fields_remaining += 'logo_url '
        if not u.get('school_color_one'):
            fields_remaining += 'school_colors '
        if not u.get('population'):
            fields_remaining += 'population '
        u['fields_remaining'] = fields_remaining

    # latitudes = [uni for uni in remaining_unis if uni.get('latitude')]
    # populations = [uni for uni in remaining_unis if uni.get('population')]
    # banner_urls = [uni for uni in remaining_unis if uni.get('banner_url')]
    # logo_urls = [uni for uni in remaining_unis if uni.get('logo_url')]
    # school_colors = [uni for uni in remaining_unis if uni.get('school_color')]
    # fa_starts = [uni for uni in remaining_unis if uni.get('fa15_start')]
    # uni_length = len(all_university_arr)

    # stats = {
    #     'latitude': (len(latitudes) / uni_length) * 100,
    #     'population': (len(populations) / uni_length) * 100,
    #     'logo_url': (len(logo_urls) / uni_length) * 100,
    #     'banner_urls': (len(banner_urls) / uni_length) * 100,
    #     'school_colors': (len(school_colors) / uni_length) * 100,
    #     'fa15_start': (len(fa_starts) / uni_length) * 100
    # }
    uni_targetted_arr = sorted(uni_targetted_arr, key=lambda k:k['rank'])
    remaining_unis = sorted(remaining_unis, key=lambda k:k['rank'])
    return render_template("admin/admin.stats.universities.html",
        target_universities=uni_targetted_arr, remainder_universities=remaining_unis)

###############
## Investors ##
###############

@app.route('/admin/i/stats/')
def admin_investor_stats():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.statistics.html")

@app.route('/admin/i/product/')
def admin_view_campaigns():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.product.html")

@app.route('/admin/i/competition/')
def admin_investors_competition():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.competition.html")

@app.route('/admin/i/biz-model/')
def admin_investors_biz_model():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.business-model.html")


###################
## END Investors ##
###################

@app.route('/admin/campaigns/')
def admin_view_campaigns():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/campaigns.html")

@app.route('/admin/campaigns/create/')
def admin_create():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/create-campaign.html")

@app.route('/admin/design/style/')
def admin_style_guide():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("style/index.html")

@app.route('/admin/design/inspired/')
def admin_components():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/design/moodboards/')
def admin_components():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/users/<_id>/')
def admin_users(_id):
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import User
    user = User.query.get(_id)
    return render_template("admin/admin.users.one.html", user=user)



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
    return render_template('admin/student.requests.html', requests=student_requests[::-1])


@app.route('/admin/campaigns/scheduled/')
def admin_scheduled():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/scheduled-campaigns.html")

@app.route('/admin/campaigns/<campaign_name>/')
def admin_one_campaign(campaign_name):
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/one_campaign.html", tag_name=campaign_name)

@app.route('/admin/coming-soon/')
def admin_coming_soon():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/product/releases/')
def admin_product_releases():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.product.releases.html")

@app.route('/admin/product/practices/')
def admin_best_practices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.product.practices.html")

@app.route('/admin/i/statistics/')
def admin_best_practices():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.statistics.html")

@app.route('/admin/support/tickets/')
def admin_testing():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import Support
    support_tickets = Support.query.all()
    return render_template("admin/admin.support.tickets.html", support_tickets=support_tickets[::-1])


@app.route('/admin/team/members/')
def admin_members():
    from app.lib.admin import admin_info
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-members.html", team=admin_info)

@app.route('/admin/team/routine/')
def admin_routine():
    from app.lib.admin import admin_info
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-routine.html", team=admin_info)



@app.route('/admin/expectations/')
def admin_expectations():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-expectations.html", team=[])

@app.route('/admin/team/project/')
def admin_team():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/team-project-items.html", team=[])

# @app.route('/admin/team/action/')
# def admin_team():
#     if not session.get('user'):
#         return redirect(url_for('admin_login'))
#     return render_template("admin/team-action-items.html", team=[])



@app.route('/admin/design/guidelines/')
def admin_design_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/design-guidelines.html", team=[])

@app.route('/admin/development/guidelines/')
def admin_dev_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/development-guidelines.html", team=[])

@app.route('/admin/development/api/')
def admin_dev_guidelines():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.development.api.html")

@app.route('/admin/')
@app.route('/admin/team/')
@app.route('/admin/team/calendar/')
def admin_team_calendar():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/team-calendar.html")

@app.route('/lte/')
def lte_theme():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return redirect("/static/admin/index2.html")


@app.route('/admin/bugs/')
def admin_bugs():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/bugs.admin.html", team=[])

@app.route('/admin/bugs/view/')
def admin_bugs_view():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/bugs.view.admin.html", team=[])

@app.route('/admin/development/style/')
def admin_development_style():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("admin/style.development.admin.html", team=[])

@app.route('/admin/logout/')
def admin_logout():
    if session.get('user'):
        session.pop('user')
    return redirect(url_for('admin_login'))






@app.route('/admin/universities/flickr/')
def flicker_targetted_universities():
    import json
    target_universities = json.load(open('app/static/data/fa15_all.json'))
    for uni in target_universities:
        if uni.get('banner_url'):
            uni['banner_url'] = uni['banner_url'].replace('b.jpg','n.jpg')
        else:
            uni['banner_url'] = '#'
    # target_universities = University.query.filter_by(is_targetted=True).all()
    return render_template('new_admin/admin.universities.flickr.html', universities=target_universities)

@app.route('/admin/flickr/<university_id>')
def flicker_university_process(university_id):
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    try:
        u = University.query.get(university_id)
    except:
        db_session.rollback()
        return "ERROR --> record it for now Samir will fix it later"
    from lib.flickr_wrapper import *
    flickr_response = str(search_university_response_api(u))
    photos_arr = parse_flickr_response(flickr_response)
    processed_arr = process_returned_photos(photos_arr)
    processed_arr = sorted(processed_arr, key=lambda k:k['views'], reverse=True)[:20]

    for uni in processed_arr:
        uni['url'] = uni['url'].replace('z.jpg','n.jpg')

    return render_template('admin/admin.design.flickr.html', flickr_photos=processed_arr,  university=u)

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
        # return redirect('http://localhost:8100/')
        return redirect('http://localhost:5000/static/remote/index.html?version=' + str(version) + str(02323))
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
