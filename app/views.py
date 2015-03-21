import os, hashlib, stripe
from app.database import *
from models import *
from twilio import *
from twilio.rest import TwilioRestClient
from flask import render_template, redirect, url_for, session, request

# Twilio
TWILIO_DEFAULT_PHONE = "+15104661138"
twilio_client = TwilioRestClient(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])

admin_authkey = 'fe78e1c1cddfe4b132c7963136243aa51ac5609fb17839bf65a446d6'          #hash for username


# Stripe
stripe_keys = {
    'secret_key': os.environ['STRIPE_SECRET_KEY'],
    'publishable_key': os.environ['STRIPE_PUBLISHABLE_KEY']
}
stripe.api_key = stripe_keys['secret_key']

# Mixpanel
from mixpanel import Mixpanel
mp = Mixpanel(os.environ['MIXPANEL_TOKEN'])


@app.route('/admin/home/')
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

@app.route('/login',methods=["POST"])
def trylogin():
    username = request.form['username']
    password = request.form['password']
    hashed = hashlib.sha224(username + password).hexdigest()

    #test if login is correct
    if hashed != admin_authkey:
        #successful authentication!
        session["admin"] = True
        return redirect(url_for('default'))
    else:
        return render_template("admin/index.html", os=os)

@app.route('/index.html')
def index():
    if(session.get("admin")):
        return redirect(url_for('default'))
    else:
        return render_template("admin/login.html", os=os)

@app.route('/admin/users/')
def admin_users():
    if(session.get("admin")):
        return render_template("admin/admin.users.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/admin/universities/')
def admin_universities():
    if(session.get("admin")):
        return render_template("admin/admin.universities.html", os=os)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/admin/emails/')
def admin_emails():
    if(session.get("admin")):
        return render_template("admin/admin.emails.html")
    else:
        return render_template("admin/login.html", os=os)

@app.route('/admin/universities/<_id>')
def admin_university(_id):
    if(session.get("admin")):
        university = University.query.get(_id)
        return render_template("admin/admin.university.html", os=os, university=university)
    else:
        return render_template("admin/login.html", os=os)

@app.route('/admin/user/<_id>/')
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

@app.route('/<name>/', methods=["GET"])
def one_university(name):
    from lib.university_data import supported_universities
    university_names = supported_universities.keys()

    if request.args.get("email", None) is not None:

        email = request.args.get("email")
        email_user = Email_User.initEmailUser(email)
        session['email_user'] = email
        session['email_user_id'] = email_user.id

        return redirect(request.path)

    if name in university_names:
        return render_template("web/university.html", university=supported_universities[name])
    else:
        return redirect(url_for('app_flex'))


@app.route('/')
def student_home():
    return render_template("web/student.index.html")

@app.route('/guru/')
def guru_home():
    return render_template("web/guru.index.html")

@app.route('/web/app/')
def app_home():
    return render_template("web/app.index.html")

@app.route('/universities/')
def app_home():
    return render_template("web/app.index.html")

@app.route('/app/')
def app_route():
    version = Version.query.get(1).ios
    return redirect('http://uguru-rest.herokuapp.com/static/remote/index.html?version=' + str(version))
    # return redirect('http://161.82.64.66:5000/static/remote/index.html?version=' + str(version))
    # return redirect('http://192.168.0.104:5000/static/remote/index.html')
    # return redirect('http://192.168.0.104:8100')

@app.route('/admin/campaigns/results/')
def admin_campaign_results():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/admin.campaigns.html')

@app.route('/admin/campaigns/create/')
def admin_campaign_create():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/admin.create-, os=oscampaigns.html')

@app.route('/admin/campaigns/<name>/')
def admin_campaigns_detailed(name):
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin/campaign-detailed.html', name=name)

@app.route('/admin/development/')
def admin_development():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    version = Version.query.get(1)
    return render_template('admin/development.html', os=os, version=version)

@app.route('/admin/issues/')
def admin_issues():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    version = Version.query.get(1)
    return render_template('admin/admin.issues.html', os=os, version=version)

@app.route('/admin/web/')
def index():
    return render_template('index.html')



@app.route('/admin/form/')
@app.route('/admin/home/')
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

@app.route('/admin/api/')
def admin_api():
    if not session.get('admin'):
        return redirect(url_for('admin'))
    return render_template('admin/api.html', os=os)

@app.route('/admin/dashboard/')
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

@app.route('/admin/accounts/')
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