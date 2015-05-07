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

@app.route('/admin/login/')
def admin_login():
    error = None
    if request.args.get("email", None) and request.args.get("password"):
        email = request.args.get("email")
        password = request.args.get("password")

        from app.lib.admin import admin_info
        print email, password
        if check_admin_password(email, password):
            session['user'] = admin_info[email]
            return redirect(request.path)
        else:
            session['error'] = 'incorrect username & password'
            return redirect(request.path)

    if session.get('error'):
        error = 'incorrect username & password'
        session.pop('error')

    if session.get('user'):
        return redirect(url_for('admin_requests'))


    return render_template("new_admin/login.html", error=error)



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

@app.route('/admin/requests/')
def admin_requests():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    from app.models import *

    unfiltered_requests = Request.query.all()
    real_before_170 = [167, 166, 163, 161, 160, 159, 149, 146, 143,141, 139, 112, 92, 78]
    student_requests = []
    for _request in unfiltered_requests:
        if _request.id in real_before_170 or _request.id > 170:
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

@app.route('/admin/')
@app.route('/admin/team/')
@app.route('/admin/home/')
@app.route('/admin/team/action_items/')
def admin_team():
    if not session.get('user'):
        return redirect(url_for('admin_login'))
    return render_template("new_admin/team-action-items.html", team=[])

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


@app.route('/old_admin/home/')
@app.route('/login/')
def default():
    if('admin' in session and session["admin"] == True):

        statistics = {
            'universities': {'count': len(University.query.all())},
            'users': {'count': len(User.query.all())},
            'courses': {'count': 758719},
            'departments': {'count': 21361},
        }

        return render_template("admin/index.html", os=os, statistics=statistics)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/index.html')
def index():
    if(session.get("admin")):
        return redirect(url_for('default'))
    else:
        return render_template("admin/login.html", os=os)

@app.route('/old_admin/users/')
def admin_users():
    if(session.get("admin")):
        return render_template("admin/admin.users.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/old_admin/campaigns/')
def old_admin():
    return render_template("admin/campaigns.html")


@app.route('/old_admin/universities/')
def admin_universities():
    if(session.get("admin")):
        return render_template("admin/admin.universities.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/old_admin/emails/')
def admin_emails():
    if(session.get("admin")):
        return render_template("admin/admin.emails.html")
    else:
        return render_template("admin/login.html", os=os)

@app.route('/old_admin/universities/<_id>')
def admin_university(_id):
    if(session.get("admin")):
        university = University.query.get(_id)
        return render_template("admin/admin.university.html", os=os, university=university)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/old_admin/user/<_id>/')
def admin_user(_id):
    if(session.get("admin")):
        user = User.query.get(_id)
        return render_template("admin/admin.user.html", user=user, os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/emails.html')
def emails():
    if(session.get("admin")):
        return render_template("admin/emails.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/campaigns.html')
def campaigns():
    if(session.get("admin")):
        return render_template("admin/campaigns.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/createcampaigns.html')
def createcampaigns():
    if(session.get("admin")):
        return render_template("admin/createcampaigns.html", os=os)
    else:
        return render_template('admin/login.html', os=os)

@app.route('/messages.html')
def messages():
    if(session.get("admin")):
        return render_template("admin/messages.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/tasks.html')
def tasks():
    if(session.get("admin")):
        return render_template("admin/tasks.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/ui.html')
def users():
    if(session.get("admin")):
        return render_template("admin/ui.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/widgets.html')
def widgets():
    if(session.get("admin")):
        return render_template("admin/widgets.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

# @app.route('/ui.html')
# def ui():
#     if(session.get("admin")):
#         return render_template("admin/ui.html", os=os)
#     else:
#         return render_template("admin/login.html", os=os)

@app.route('/submenu.html')
def submenu():
    if(session.get("admin")):
        return render_template('admin/submenu.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/submenu2.html')
def submenu2():
    if(session.get("admin")):
        return render_template('admin/submenu2.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/submenu3.html')
def submenu3():
    if(session.get('admin')):
        return render_template('admin/submenu3.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/form.html')
def form():
    if(session.get("admin")):
        return render_template('admin/form.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/chart.html')
def chart():
    if(session.get("admin")):
        return render_template('admin/chart.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/typography.html')
def typo():
    if(session.get("admin")):
        return render_template('admin/typography.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/gallery.html')
def gallery():
    if(session.get("admin")):
        return render_template('admin/gallery.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/table.html')
def table():
    if(session.get("admin")):
        return render_template('admin/table.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/calendar.html')
def calendar():
    if(session.get("admin")):
        return render_template('admin/calendar.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/file-manager.html')
def filemanager():
    if(session.get("admin")):
        return render_template('admin/file-manager.html')
    else:
        return render_template("admin/login.html", os=os)

@app.route('/icon.html')
def icon():
    if(session.get("admin")):
        return render_template('admin/icon.html', os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/logout.html')
def login():
    session.pop("admin")
    return render_template("login.html")

@app.route('/university/')
def app_flex():

    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    return render_template("web/university.html", university=supported_universities['virginia'])

@app.route('/faqs/')
def uguru_faqs():
    return render_template("web/content/faq.html")

@app.route('/terms/')
def uguru_terms():
    return render_template("web/content/terms.html")

@app.route('/')
def app_student_home():
    from lib.university_data import supported_universities
    from random import sample
    from app.lib.gen_departments import departments

    university_names = supported_universities.keys()


    departments = sample(departments, 12)

    university_statistics = {
        "schools": len(university_names),
        "courses": 753986,
        "gurus": 100,
        "rating": 4.8
    }

    return render_template("web/student_home.index.html", university_statistics=university_statistics, university=supported_universities['virginia'], departments=departments)

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





@app.route('/universities/')
def app_home():

    from app.static.data.universities_efficient import universities_arr
    u_titles = [university['title'].lower() for university in universities_arr]

    return render_template("web/universities.html", universities=u_titles)

@app.route('/itunes/app/')
def itunes_app():
    return redirect('https://www.dropbox.com/s/1tvzqjmsu0657nf/Uguru.ipa?dl=0')

@app.route('/production/app/')
@app.route('/app/production/')
@app.route('/app/')
def app_route():
    version = Version.query.get(1).ios
    if os.environ.get('PRODUCTION'):
        print "woohoo we're in production"
        return redirect('http://u.uguru.me/static/remote/index.html?version=' + str(version) + str(02323))
    else:
        print "aww im local"
        return redirect('http://192.168.42.66:5000/static/remote/index.html?version=' + str(version) + str(13213))
    # return redirect('http://192.168.0.104:5000/static/remote/index.html')
    # return redirect('http://192.168.42.66:8100/remote/')

@app.route('/old_admin/campaigns/results/')
def admin_campaign_results():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/admin.campaigns.html')

@app.route('/old_admin/campaigns/create/')
def admin_campaign_create():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/admin.create-, os=oscampaigns.html')

@app.route('/old_admin/campaigns/<name>/')
def admin_campaigns_detailed(name):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/campaign-detailed.html', name=name)

@app.route('/old_admin/development/')
def admin_development():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    version = Version.query.get(1)
    return render_template('admin/development.html', os=os, version=version)

@app.route('/old_admin/issues/')
def admin_issues():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    version = Version.query.get(1)
    return render_template('admin/admin.issues.html', os=os, version=version)

@app.route('/old_admin/web/')
def index():
    return render_template('index.html')



@app.route('/old_admin/form/')
@app.route('/old_admin/home/')
def admin_dashboard_home():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    universities = [
            {
                'name': 'UCLA',
                'emails_sent': 1000,
                'total_emails': 10000
            },

            {
                'name': 'Berkeley',
                'emails_sent': 0,
                'total_emails': 7000
            },

            {
                'name': 'UT Austin',
                'emails_sent': 1000,
                'total_emails': 12000
            },

            {
                'name': 'U Michigan',
                'emails_sent': 1000,
                'total_emails': 15000
            }

            ]

    from emails import mandrill_client
    templates = sorted(mandrill_client.templates.list(),
        key=lambda t:datetime.strptime(t['updated_at'], "%Y-%m-%d %H:%M:%S.%f"), reverse=True)
    template_names = [t['name'] for t in templates]

    return render_template('admin/form.html', os=os,
        mandrill_client=mandrill_client,
        available_universities=universities,
        template_names=template_names)

@app.route('/old_admin/api/')
def admin_api():
    if not session.get('admin'):
        return redirect(url_for('admin'))
    return render_template('admin/api.html', os=os)

@app.route('/old_admin/dashboard/')
def admin_dashboard():

    if not session.get('admin'):
        return redirect(url_for('admin'))

    from emails import mandrill_client, DEFAULT_SENDER_EMAIL, DEFAULT_SENDER_NAME

    templates = mandrill_client.templates.list()
    batches = Batch.query.all()
    test_accounts = Recipient.query.filter_by(admin_account=True).all()


    default_args = {
        'default_sender_email': DEFAULT_SENDER_EMAIL,
        'default_sender_name': DEFAULT_SENDER_NAME
    }

    return render_template('admin.dashboard.html',\
        templates=templates, batches=batches, test_accounts=test_accounts\
        ,default_args=default_args)

@app.route('/old_admin/accounts/')
def admin_accounts():
    if not session.get('admin'):
        return redirect(url_for('admin'))

    from app.models import *
    from app.database import db_session
    ADMIN_NAMES = ["Samir Makhani", "Jasmine Mir", "Shun Kurosaki", "Robert Neivert", "Matias Baglieri"]
    admin_users = []
    for name in ADMIN_NAMES:
        u = User.query.filter_by(name=name).first()
        if not u:
            continue
        else:
            admin_users.append(u)
    return render_template('admin-users.html', admin_users=admin_users)


def check_admin_password(email, password):
    from app.lib.admin import admin_info
    print email, password
    if admin_info.get(email):
        email_user_info = admin_info[email]
        first_name = email_user_info['name'].split(' ')[0].lower()
        if password == first_name + '-uguru-1':
            return True
    return False