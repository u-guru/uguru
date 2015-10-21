import os, hashlib, stripe
from app.database import *
from models import *
from twilio import *
from twilio.rest import TwilioRestClient
from flask import render_template, redirect, url_for, session, request
import json

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


################
## Bens Views ##
################

@app.route('/admin/stats/universities/')
def admin_statistics_universities():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    from lib.universities import filterPrepared, filterPreparedWithEmails, calcAndSortedPrepared

    ## Queries database for all universities
    universities = University.query.all()

    ## Some old universities dont have ids
    universities = [university for university in universities if university.id]

    ## Prepared information dictionary w/ missing fields
    final_universities, prepared_info = calcAndSortedPrepared(universities)

    full_prepared_universities = [university for university in final_universities if prepared_info[university.id]['percentage'] == 100] ##remember to change 90 backt to 80
    eighty_prepared_universities = [university for university in final_universities if prepared_info[university.id]['percentage'] >= 80 and prepared_info[university.id]['percentage'] < 100 and prepared_info[university.id]['percentage'] >= 80 and university.school_mascot_name == None ]
    shitty_prepared_universities = [university for university in final_universities if prepared_info[university.id]['percentage'] >= 50 and prepared_info[university.id]['percentage'] < 80]
    dont_exist_universities = [university for university in final_universities if prepared_info[university.id]['percentage'] < 50]
    atleast_fifty_universities = eighty_prepared_universities + shitty_prepared_universities

    return render_template("admin/admin.stats.universities.html", \
        universities = universities, \
        prepared_universities=final_universities,
        prepared_info_dict=prepared_info,
        full_prepared_universities=full_prepared_universities,
        eighty_prepared_universities=eighty_prepared_universities,
        shitty_prepared_universities=shitty_prepared_universities,
        atleast_fifty_universities=atleast_fifty_universities)

## have the intuition that if something is funky -- chances are, its something super small,
## like a grammer error, a TYPO ;)
@app.route('/admin/stats/universities/uni_id/flickr_options/set_url/<url>/')
def admin_statistics_get_flickr_urls_unique(uni_id, url):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    u = University.query.get(uni_id)
    print url
    u.banner_url = url

    print u.banner_url
    # try:
    #     db_session.commit()
    # except:
    #     db_session.rollback()
    #     raise

    formatted_str = "%s has updated its banner url to %" % (u.name, u.banner_url)
    return formatted_str

@app.route('/admin/stats/universities/<uni_id>/flickr_options/')
## IF SOMETHING IS FUNKY --> Most likely your forgot to rename the function definition of the view
def admin_statistics_get_flickr_urls(uni_id):
    print "it gets here"
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    university = University.query.get(uni_id)

    ## if more than two nested functions, it should be in an external file in app/lib/

    # this function will return an image, if you click it .. it will automatically set the university to that ;)
    def html_image_string_links(url):
        url = url.replace("http://", "").replace("https://", "")
        ## Quotes mindfuck -- try to understand this later -- it should work
        link_beginning = '<a href="/admin/stats/universities/2307/flickr_options/set_url/' + url + '/' + '">'
        print link_beginning
        link_ending = '</a>'
        return '%s<img src="%s" alt="Smiley face" style="max-width:300px; height:auto; margin: 0 auto; position:absolute\;"> %s' % (link_beginning, url, link_ending)

    def getFlickerBanners(university,size=20):
        from lib.flickr_wrapper import parse_flickr_response, search_university_response_api, process_returned_photos

        flickrResponse = search_university_response_api(tags='Panorama', text=university.name, all_or='all')
        arr = process_returned_photos(parse_flickr_response(flickrResponse))
        urls = [html_image_string_links(item['url']) for item in arr]
        html_strings_of_imgs = " ".join(urls)
        return html_strings_of_imgs

    html_strings_of_imgs = getFlickerBanners(university)


    ## notice, this has no template! We are just returning the strings
    return html_strings_of_imgs


@app.route('/admin/ben/data-todo/')
def ben_data_todo():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    todo_items = [
        "Pick one missing field to modify - i.e. (school_mascot_name)",
        "Write necessary script(s) to apply it. Input must be university, output must include university_id && missing field <br> <br> &nbsp; { <br> &nbsp;&nbsp;&nbsp; 'id': 2307, <br> &nbsp;&nbsp;&nbsp; 'school_mascot_name': 'golden bears'<br> &nbsp; } <br><br>",
        "Test that it works & will increase the total # significantly (or more significant than the other fields",
        "Calculate the total # of schools expected to be prepared",
        "Run it locally",
        "Let Samir know that you have another script ready. Ready means that: <br> <br> <b>1. You know the <u>EXACT</u> # of schools prepared after you run this with https://www.uguru.me <br>2. You have already run it locally && are 100% confident it works<br></b>",
        "If Samir approves, run it with production server",
        "Pull production server && update your local one <br><br> <i> Cut && paste this into your terminal w/o outside quotes </i><br><br> >>   heroku pg:backups capture --app uguru-rest <br><br> >> curl -o latest.dump `heroku pg:backups public-url --app uguru-rest` <br><br> >> pg_restore --verbose --clean --no-acl --no-owner -h localhost -U uguru -d uguru_db latest.dump'",
        "Cleanup your code - if you have any questions where things should be organized ask -- if i dont reply, move on.",
        "Repeat."
    ]


    todo_items_indexed = ["#%s: %s<br><br>" % (todo_items.index(item) + 1, item) for item in todo_items]


    return "".join(todo_items_indexed)

@app.route('/admin/stats/universities/<uni_id>')
def admin_statistics_one_university(uni_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    university = University.query.get(uni_id)

    ## Take the time to clean up old code, even if its not yours ;)


    return render_template("admin/admin.stats.one.university.html", \
        university=university)


###############
## NEW ADMIN ##
###############

@app.route('/admin/staging/')
def admin_statistics_staging():
    if not session.get('admin'):
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
            session['admin'] = admin_info[email]

            if 'investors.uguru.me' in request.url:
                return redirect(url_for('admin_investor_stats'))

            return redirect(request.path)
        else:
            session['error'] = 'incorrect username & password'
            return redirect(request.path)

    if session.get('error'):
        error = 'incorrect username & password'
        session.pop('error')

    if session.get('admin'):
        return redirect(url_for('admin_team_calendar'))

    return render_template("admin/login.html", error=error)

@app.route('/500-test')
def internal_test():
    return render_template("<b>500</b>")

@app.route('/admin/statistics/')
def admin_statistics():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    stats = Stats.query.get(1)
    return render_template("admin/admin.statistics.html", stats=stats)

@app.route('/admin/stats/devices/')
def admin_devices():
    if not session.get('admin'):
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
    import httpagentparser
    print httpagentparser.simple_detect(request.user_agent.string)
    print httpagentparser.detect(request.user_agent.string)
    return render_template("web/pages/faq.html")

@app.route('/faq-only/')
def faq_body():
    from flask import request

    return render_template("web/pages/faq_only.html")

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

@app.route('/support-only/')
def team():
    return render_template("web/pages/support_only.html")

@app.route('/staging/profile')
def profile_page():
    return render_template("web/profile.html")

@app.route('/admin/stats/campaigns/')
def admin_stats_campaigns():
    ### all logic
    import requests, json
    if not session.get('admin'):
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



@app.route('/admin/search/instagram')
def admin_instagram_search(uni_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

        ### Together

    return render_template("Hello World")

@app.route('/admin/search/results/<query>')
def admin_instragram_results(query):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    return render_template("Hello World")

#
@app.route('/admin/search/instagram')
def admin_instagram(uni_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

        ### Together
        ### Together --> create menu bar

    return render_template("Hello World")


@app.route('/admin/search/monoprice/<query_str>')
def admin_search_monoprice(query_str):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    #step 3 --> Import necessary wrapper
    #copy your wrapper into app/lib/
    from lib.monoprice_wrapper import queryMonoprice as query


# Step 4 --> call the results
    results_dict = query(query_str)
    results_dict_json = open('mono_price.json')
    load_as_json_obj = json.load(results_dict_json)
    from pprint import pprint

    #pprint(load_as_json_obj)
    results_arr = [ load_as_json_obj[key] for key in load_as_json_obj.keys()]
    pprint(results_dict)

   # results_arr = [ results_dict[key] for key in results_dict.keys() ]


    # Step 5 --> render the dictionary in a presentable format

    return render_template("admin/admin.monoprice.query.html", query_results=results_arr, query_str=query_str)

@app.route('/admin/search/monoprice/<product_id>')
def AddItemsToCart(product_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.monoprice.additem.html", product_id = str(product_id))

@app.route('/admin/search/monoprice/cart')
def AddItemsToCart():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    from lib.monoprice_wrapper import AddItemToCart
    AddItemToCart(1,str(product_id))

    #step 3 --> Import necessary wrapper
    #copy your wrapper into app/lib/
    from lib.monoprice_wrapper import queryMonoprice as query


# Step 4 --> call the results
    results_dict = query(query_str)
    results_dict_json = open('mono_price.json')
    load_as_json_obj = json.load(results_dict_json)
    from pprint import pprint

    #pprint(load_as_json_obj)
    results_arr = [ load_as_json_obj[key] for key in load_as_json_obj.keys()]
    pprint(results_dict)

   # results_arr = [ results_dict[key] for key in results_dict.keys() ]


    # Step 5 --> render the dictionary in a presentable format

    return render_template("admin/admin.monoprice.query.html", query_results=results_arr, query_str=query_str)

@app.route('/admin/search/monoprice/<product_id>')
def AddItemsToCart(product_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.monoprice.additem.html", product_id = str(product_id))

@app.route('/admin/search/monoprice/cart')
def AddItemsToCart():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    from lib.monoprice_wrapper import AddItemToCart
    AddItemToCart(1,str(product_id))

@app.route('/admin/localytics')
def admin_localytics():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))


###############
## Investors ##
###############

@app.route('/admin/i/stats/')
def admin_investor_stats():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.statistics.html")

@app.route('/admin/i/product/')
def admin_view_campaigns_product():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.product.html")

@app.route('/admin/i/competition/')
def admin_investors_competition():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.competition.html")

@app.route('/admin/i/biz-model/')
def admin_investors_biz_model():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.business-model.html")

###################
## END Investors ##
###################

@app.route('/style/')
def uguru_style_guide():
    return redirect('/static/style/index.html')

@app.route('/admin/campaigns/')
def admin_view_campaigns():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/campaigns.html")

@app.route('/admin/design/banners')
def admin_design_banners():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    universities = University.query.filter(University.courses_sanitized == True, University.departments_sanitized == True, University.banner_url != None, University.logo_url != None).all()
    return render_template('admin/design.validate.flickr.html', universities=universities)

@app.route('/admin/campaigns/create/')
def admin_create():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/create-campaign.html")

@app.route('/admin/design/style/')
def admin_style_guide():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("style/index.html")

@app.route('/admin/design/inspired/')
def admin_components_inspired():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/design/moodboards/')
def admin_components():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/users/<_id>/')
def admin_users(_id):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    from app.models import User
    user = User.query.get(_id)
    return render_template("admin/admin.users.one.html", user=user)



@app.route('/admin/requests/')
def admin_requests():
    if not session.get('admin'):
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
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/scheduled-campaigns.html")

@app.route('/admin/campaigns/<campaign_name>/')
def admin_one_campaign(campaign_name):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/one_campaign.html", tag_name=campaign_name)

@app.route('/admin/coming-soon/')
def admin_coming_soon():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin-coming-soon.html")

@app.route('/admin/product/categories/')
def admin_product_skills():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.product.categories.html")



@app.route('/admin/product/releases/')
def admin_product_releases():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.product.releases.html")

@app.route('/admin/product/practices/')
def admin_best_practices_product():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.product.practices.html")

@app.route('/admin/i/statistics/')
def admin_best_practices():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.investors.statistics.html")

@app.route('/admin/support/tickets/')
def admin_testing():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    from app.models import Support
    support_tickets = Support.query.all()
    return render_template("admin/admin.support.tickets.html", support_tickets=support_tickets[::-1])


@app.route('/admin/team/members/')
def admin_members():
    from app.lib.admin import admin_info
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-members.html", team=admin_info)

@app.route('/admin/team/routine/')
def admin_routine():
    from app.lib.admin import admin_info
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-routine.html", team=admin_info)



@app.route('/admin/expectations/')
def admin_expectations():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.team-expectations.html", team=[])

@app.route('/admin/team/project/')
def admin_team():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/team-project-items.html", team=[])

# @app.route('/admin/team/action/')
# def admin_team():
#     if not session.get('admin'):
#         return redirect(url_for('admin_login'))
#     return render_template("admin/team-action-items.html", team=[])



@app.route('/admin/design/guidelines/')
def admin_design_guidelines():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/design-guidelines.html", team=[])

@app.route('/admin/development/guidelines/')
def admin_dev_guidelines():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/development-guidelines.html", team=[])

@app.route('/admin/development/api/')
def admin_dev_api():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/admin.development.api.html")

@app.route('/admin/')
@app.route('/admin/team/')
@app.route('/admin/team/calendar/')
def admin_team_calendar():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/team-calendar.html")

@app.route('/lte/')
def lte_theme():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return redirect("/static/admin/index.html")


@app.route('/admin/bugs/')
def admin_bugs():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/bugs.admin.html", team=[])

@app.route('/admin/bugs/view/')
def admin_bugs_view():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/bugs.view.admin.html", team=[])

@app.route('/admin/development/style/')
def admin_development_style():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template("admin/style.development.admin.html", team=[])

@app.route('/admin/logout/')
def admin_logout():
    if session.get('user'):
        session.pop('user')
        session.pop('admin')
    return redirect(url_for('admin_login'))


# from static.data.ben import getAllUsNewsUniversities


@app.route('/admin/universities/ben/stats/<arg>')
def ben_stats(arg=None):
    from static.data.ben import getAllUsNewsUniversities
    usNewsArr = getAllUsNewsUniversities()
    all_keys = usNewsArr[0].keys()
    result_dict = {}
    for key in all_keys:
        result_dict[key] = 0
    for uni in usNewsArr:
        for key in all_keys:
            if uni.get(key):
                result_dict[key] += 1
    if arg == 'emails':
        result = [uni['name'] for uni in usNewsArr if uni.get('num_emails')]
        return json.dumps(result)
    if arg == '!school_color':
        result = [uni for uni in usNewsArr if uni.get('num_emails') and not uni.get('school_color_one')]
        return json.dumps(result)
    # else:
    #     return json.dumps(result_dict, indent=4)



@app.route('/admin/ben/flickr/<uni_name>')
def flickr_ben_admin(uni_name):
    def html_image_string(url):
        return '<img src="%s" alt="Smiley face" height="auto" width="%s">' % (url, '100%')
    from lib.flickr_wrapper import parse_flickr_response, search_university_response_api, process_returned_photos

    flickrResponse = search_university_response_api(tags='Panorama', text=uni_name, all_or='all')
    arr = process_returned_photos(parse_flickr_response(flickrResponse))
    urls = [html_image_string(item['url']) for item in arr][0:5]

    html_strings_of_imgs = " ".join(urls)

    return html_strings_of_imgs



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
    if not session.get('admin'):
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
    print confirm_email_token
    user = User.query.filter_by(school_email_token=confirm_email_token).first()
    print user
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

# @app.route('/hybrid-app/')
# def hybrid_app():

#     from lib.university_data import supported_universities
#     university_names = supported_universities.keys()

#     return render_template('web/hybrid.app.html', university=supported_universities['virginia'])

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

    from flask import request
    print request.user_agent.platform, request.user_agent.browser

    version = Version.query.get(1)
    if version and version.ios:
        version = version.ios
    else:
        version = 1
    print '\n\n\n\n\nrequest headers'
    # print request.headers, type(request.headers)
    if 'iPad' in str(request.headers) and 'Safari' in str(request.headers):
        return redirect(url_for('itunes_app'))
    if os.environ.get('PRODUCTION'):
        print "woohoo we're in production"
        return redirect('https://www.uguru.me/static/remote/index.html?version=' + str(version) + str(02323))
    else:
        print "aww im local"
        return redirect('/static/remote/index.html')
        # return redirect('http://localhost:8100/')


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
