import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from app import app
from app.models import Skill, User, Request, Email
from models import User
import mandrill 

SMTP_SERVER = "smtp.mandrillapp.com"
SMTP_PORT = 587

SMTP_USERNAME = os.environ['MANDRILL_USERNAME']
SMTP_PASSWORD = os.environ['MANDRILL_PASSWORD']
MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
MASS_MANDRILL_API_KEY = 'Nr-H6duWBJz4kiCbNxtYqg'

HOURLY_RATE = 0

def send_connection_email(student, tutor, request):
    student_name = student.name
    tutor_name = tutor.name
    time_estimate = request.time_estimate
    email_from = "uGuru.me <connections@uguru.me>"
    email_subject = "[uGuru.me] Congrats! You've been connected"

    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "

    EMAIL_TO = [student.email, tutor.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    text = send_connection_text(student_name, tutor_name, time_estimate)
    html = send_connection_html(student_name, tutor_name, time_estimate)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def send_data_to_csv(email):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    text = user_name + '\n' + user_email + '\n\n' + detail
    html = user_name + '\n' + user_email + '\n\n' + detail
    to_emails = []
    to_emails.append({
        'email':'support@uguru.me',
        'name': 'Uguru Support',
        'type': 'to'
    })

    message = {
        'html':html,
        'text':text,
        'subject': topic,
        'from_email': 'uguru-support@uguru.me',
        'from_name': 'Uguru Support Ticket',
        'to': to_emails,
        'headers': {'Reply-To': user_email},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['uguru-support']
    }

    result = mandrill_client.messages.send(message=message)



def send_support_email(topic, detail, user):
    user_name = user.name
    user_email = user.email
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    text = user_name + '\n' + user_email + '\n\n' + detail
    html = user_name + '\n' + user_email + '\n\n' + detail
    to_emails = []
    to_emails.append({
        'email':'support@uguru.me',
        'name': 'Uguru Support',
        'type': 'to'
    })

    message = {
        'html':html,
        'text':text,
        'subject': topic,
        'from_email': 'uguru-support@uguru.me',
        'from_name': 'Uguru Support Ticket',
        'to': to_emails,
        'headers': {'Reply-To': user_email},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['uguru-support']
    }

    result = mandrill_client.messages.send(message=message)

def send_student_packages_email(user, tutor_name, skill_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = user.name.split(" ")[0]
    html = student_packages_html(user_first_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'subject': user_first_name + ', save at least $5 on your next ' + skill_name + ' session with ' + tutor_name,
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-packages']
    }

    result = mandrill_client.messages.send(message=message)

def student_packages_html(user_name):
    return """
    Hi """ + user_name + """,
    <br>
    <br>
    Thank you for using uGuru! We handle payments on our platform to make things <b>easier and cheaper</b> for you. 
    In fact, <b>hundreds of Cal students</b> are currently using our platform for payments.
    <br>
    <br>
    <u>Benefits of using our platform for payments:</u>
    <br>
    <br>
    <span style='padding-left:20px'> 1. <b>100% money back guarantee</b> on any transaction or session that was not satisfactory. </span>
    <br>
    <br> 
    <span style='padding-left:20px'> 2. You never, ever have to worry about carrying cash.</span>
    <br>
    <br>
    <span style='padding-left:20px'> 3. We offer credit packages of all sizes where you <b>get $5 to $200 free credit</b>. </span><a href='http://berkeley.uguru.me/activity/packages/'>See all available packages.</a>
    <br>
    <br>
    If you have any questions or concerns, feel free to reply directly to this email!
    <br>
    <br>
    Best,<br>
    Samir from uGuru
    """

def welcome_uguru_student(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = user.name.split(" ")[0]
    text = welcome_uguru_student_text(user_first_name)
    html = welcome_uguru_student_html(user_first_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'text':text,
        'subject': user_first_name + ', Welcome to uGuru Beta!',
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-signup']
    }

    result = mandrill_client.messages.send(message=message)

def welcome_uguru_tutor(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = user.name.split(" ")[0]
    # text = welcome_uguru_tutor_text(user_first_name)
    html = welcome_uguru_tutor_html(user_first_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        # 'text':text,
        'subject': user_first_name + ', Welcome to uGuru Beta!',
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-signup']
    }

    result = mandrill_client.messages.send(message=message)


def student_sorry_no_gurus(user, skill_name):
    pass

def student_one_hour_left(user, skill_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = user.name.split(" ")[0]
    html = student_one_hour_left_html(user_first_name, skill_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'subject': 'One Hour Left! Choose one of the available ' + skill_name + ' gurus before expiration.',
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        # 'track_opens': True,
        # 'track_clicks': True,
        'preserve_recipients':False,
        'tags':['canceled-email']
    }

    result = mandrill_client.messages.send(message=message)

def student_one_hour_left_html(user_name, skill_name):
    return """
    Hi """ + user_name +""", 
    <br>
    <br>
    You have at least one Guru waiting to help you for """ + skill_name + """!
    <br>
    <br>
    <b>You have 1 Hour to pick one before the request expires.</b> These Gurus may or may not be available if you were to request again.
    <br>
    <br>
    If you have any questions, feel free to reply directly to this email.
    <br>
    <br>
    Best,<br>
    Samir from uGuru
    """

def student_canceled_email(user, skill_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = user.name.split(" ")[0]
    html = student_canceled_email_html()
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'subject': 'Your ' + skill_name + ' Request',
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        # 'track_opens': True,
        # 'track_clicks': True,
        'preserve_recipients':False,
        'tags':['canceled-email']
    }

    result = mandrill_client.messages.send(message=message)

def approved_by_admin_email(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    
    user_first_name = user.name.split(" ")
    html = approved_by_admin_email_html(user_first_name)

    message = {
        'html':html,
        'subject': 'Congrats *|FNAME|*, You Are Now a Guru!',
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from Uguru',
        'to': [{'email':user.email, 'name':user.name, 'type':'to'}],
        'merge_vars': [{
                'rcpt':user.email,
                'vars': [
                    {
                        'name':"fname",
                        'content':user.name.split(' ')[0].title()
                    }
                ]
            }],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['guru-approval-email']
    }

    result = mandrill_client.messages.send(message=message)


def daily_results_email(from_email, to_email):
    from datetime import datetime
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    
    day = datetime.now().strftime('%h %d %Y')
    html = daily_results_email_html(day)

    message = {
        'html':html,
        'subject': 'uGuru Daily Stats for ' + day,
        'from_email': from_email,
        'from_name': 'Samir from uGuru',
        'to': [{'email':to_email, 'name':'uGuru Team', 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['daily-stats-email']
    }

    result = mandrill_client.messages.send(message=message)

def daily_results_email_html(str_date):
    from models import User, Request
    from database import db_session
    from datetime import datetime
    from datetime import timedelta

    now = datetime.now()
    today = datetime(*now.timetuple()[:3])
    yesterday = today - timedelta(days = 1)
    day=today

    from views import get_environment
    if get_environment() == 'PRODUCTION':
        semester_start = User.query.get(1200).time_created
    else:
        semester_start = User.query.get(1).time_created


    day_student_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin == None).all()
    day_student_signups_yesterday = db_session.query(User).filter(User.time_created < day).filter(User.time_created >= yesterday).filter(User.approved_by_admin == None).all()
    day_student_login = db_session.query(User).filter(User.last_active >= day).filter(User.approved_by_admin == None).all()
    day_student_none_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin == None).filter(User.referral_code == None).all()
    day_student_fb_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin == None).filter(User.referral_code == 'fb').all()
    day_student_piazza_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin == None).filter(User.referral_code == 'piazza').all()
    day_student_cal_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin == None).filter(User.referral_code == 'cal').all()
    day_tutor_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin != None).all()
    day_tutor_signups_yesterday = db_session.query(User).filter(User.time_created < day).filter(User.time_created >= yesterday).filter(User.approved_by_admin != None).all()
    day_tutor_login = db_session.query(User).filter(User.last_active >= day).filter(User.approved_by_admin != None).all()
    day_tutor_guru_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin != None).filter(User.referral_code == 'guru').all()
    day_tutor_none_signups = db_session.query(User).filter(User.time_created >= day).filter(User.approved_by_admin != None).filter(User.referral_code == None).all()
    day_requests = db_session.query(Request).filter(Request.time_created >= day).all()
    day_requests_yesterday = db_session.query(Request).filter(Request.time_created < day).filter(Request.time_created >= yesterday).all()

    day_student_sproul_signups = []
    for user in (day_student_signups + day_tutor_signups):
        if user.referral_code and 'sproul' in user.referral_code:
            day_student_sproul_signups.append(user)

    yesterday_student_sproul_signups = []

    for user in (day_student_signups_yesterday + day_tutor_signups_yesterday):
        if user.referral_code and 'sproul' in user.referral_code:
            yesterday_student_sproul_signups.append(user)


    total_signups = db_session.query(User).filter(User.time_created >= semester_start).all()
    total_student_signup = db_session.query(User).filter(User.time_created >= semester_start).filter(User.approved_by_admin == None).all()
    total_tutor_signup = db_session.query(User).filter(User.time_created >= semester_start).filter(User.approved_by_admin != None).all()
    total_requests = db_session.query(Request).filter(Request.time_created >= semester_start).all()    

    day_request_difference = len(day_requests) - len(day_requests_yesterday)
    if day_request_difference >= 0:
        day_request_difference_result = ' (+' + str(day_request_difference) + ')'
    else:
        day_request_difference_result = ' (' + str(day_request_difference) + ')'

    day_student_signup_difference = len(day_student_signups) - len(day_student_signups_yesterday)
    if day_student_signup_difference >= 0:
        day_student_signup_difference_result = ' (+' + str(day_student_signup_difference) + ')'
    else:
        day_student_signup_difference_result = ' (' + str(day_student_signup_difference) + ')'

    day_tutor_signup_difference = len(day_tutor_signups) - len(day_tutor_signups_yesterday)
    if day_tutor_signup_difference >= 0:
        day_tutor_signup_difference_result = ' (+' + str(day_tutor_signup_difference) + ')'
    else: 
        day_tutor_signup_difference_result = ' (' + str(day_tutor_signup_difference) + ')'

    day_sproul_difference = len(day_student_sproul_signups) - len(yesterday_student_sproul_signups)
    if day_sproul_difference >= 0:
        day_sproul_difference_result = ' (+' + str(day_sproul_difference) + ')'
    else:
        day_sproul_difference_result = ' (-' + str(day_sproul_difference) + ')'

    day_total_difference = day_tutor_signup_difference + day_student_signup_difference
    if day_total_difference >= 0:
        day_total_difference_result = ' (+' + str(day_total_difference) + ')'
    else:
        day_total_difference_result = ' (' + str(day_total_difference) + ')'

    sam_signups = 0
    yasi_signups = 0
    tara_signups = 0
    pranay_signups = 0
    liliana_signups = 0 
    allie_signups = 0
    adrianna_signups = 0 
    sarah_signups = 0 
    monsoon_signups = 0
    ben_signups = 0
    akshay_signups = 0
    jessie_signups = 0
    mass_email_user_signups = 0

    for u in User.query.all():
        if u.referral_code and u.time_created > day:
            if 'sam' in u.referral_code.lower():
                sam_signups += 1
            if 'yasi' in u.referral_code.lower():
                yasi_signups += 1
            if 'tara' in u.referral_code.lower():
                tara_signups += 1
            if 'pranay' in u.referral_code.lower():
                pranay_signups += 1
            if 'liliana' in u.referral_code.lower():
                liliana_signups += 1
            if 'allie' in u.referral_code.lower():
                allie_signups += 1
            if 'adrianna' in u.referral_code.lower():
                adrianna_signups += 1
            if 'sarah' in u.referral_code.lower():
                sarah_signups += 1
            if 'monsoon' in u.referral_code.lower():
                monsoon_signups += 1
            if 'ben' in u.referral_code.lower():
                ben_signups += 1
            if 'akshay' in u.referral_code.lower():
                akshay_signups += 1
            if 'jessie' in u.referral_code.lower():
                jessie_signups += 1
            if 'mass' in u.referral_code or 'chloe' in u.referral_code or u.referral_code =='m' or '00' in u.referral_code:
                mass_email_user_signups += 1

    return """
    Daily stats for """ + str_date + """: 
    <br>
    <br>
    <b>Daily Stats </b> <br>
    # of Student Requests: """ +  str(len(day_requests)) + day_request_difference_result + """<br>
    # of Total Signups: """ +  str(len(day_student_signups) + len(day_tutor_signups)) + """<br>
    # of Mass Email Signups: """ +  str(mass_email_user_signups) + """<br>
    # of Sproul/Referral/Other:""" + str(mass_email_user_signups - len(day_student_signups) - len(day_tutor_signups)) + """<br>
    <br>
    <b>Daily Activity Stats </b> <br>
    # of Students Logged In: """+ str(len(day_student_login)) + """<br>
    # of Tutors Logged In: """ + str(len(day_tutor_login)) + """<br>
    <br>
    <b>Accumulated Fa 14 Stats</b> <br>
    Total Signups: """ + str(len(total_signups)) + """ <br>
    Total Student Signups: """ + str(len(total_student_signup)) + """ <br>
    Total Tutor Signups: """ + str(len(total_tutor_signup)) + """ <br>
    Total Student Requests Made: """ + str(len(total_requests))+ """ <br>
    <br>
    <b>Ambasaddor Signup Stats</b> <br>
    Sam: """ + str(sam_signups) + """<br>
    Yasi: """ + str(yasi_signups) + """<br>
    Tara: """ + str(tara_signups) + """<br>
    Pranay: """ + str(pranay_signups) + """<br>
    Liliana: """ + str(liliana_signups) + """<br>
    Allie: """ + str(allie_signups) + """<br>
    Adrianna: """ + str(adrianna_signups) + """<br>
    Sarah: """ + str(sarah_signups) + """<br>
    Monsoon: """ + str(monsoon_signups) + """<br>
    Ben: """ + str(ben_signups) + """<br>
    Akshay: """ + str(akshay_signups) + """<br>
    Jessie: """ + str(jessie_signups) + """<br>
    <br>
    Keep up the great work!
    <br>
    Samir
    """

def student_cap_reached_email(user, skill_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = student_cap_reached_email_html(name)

    message = {
        'html':html,
        'subject': '[Action Required] Choose One of Three ' + skill_name.upper() + ' Gurus', 
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-cap-reached']
    }

    result = mandrill_client.messages.send(message=message)

def student_cap_reached_email_html(user_name):
    return """
    Hi """ + user_name + """
    <br>
    <br>
    You have three Gurus waiting for your reply. <a href='http://berkeley.uguru.me/log_in/'> Log in </a> to your account and choose one now!
    <br>
    <br>
    Once you choose a Guru, you can immediately message them and find the most convenient time to meet.
    <br>
    <br>
    Happy Tutoring!
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """



def sign_up_caltopia_tutor(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = sign_up_caltopia_tutor_html(name)

    message = {
        'html':html,
        'subject': '[Action Required] '+ user.name.split(" ")[0] + ', Finish Your Profile & Start Guru-ing Now!', 
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['caltopia-tutor-reminder']
    }

    result = mandrill_client.messages.send(message=message)

def sign_up_caltopia_tutor_html(user_name):
    return """
    Hi """ + user_name + """,
    <br>
    <br>
    You are only a couple steps away from receiving student requests and earning side cash!
    <br>
    <br>
    Take 2 minutes to <a href="http://berkeley.uguru.me/settings/#prof">to set up your profile</a> (picture, major, year, and introduction) so students feel more comfortable picking you as their Guru.
    <br>
    <br>
    In the mean time, just sit tight and wait. We will email and text you when a student requests help for a course that you signed up for.
    <br>
    <br>
    Thanks for joining us! Go Bears!
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """
def drip_student_signup_1(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_1(name)

    message = {
        'html':html,
        'subject': "Just in case you didn't know",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-1']
    }

    result = mandrill_client.messages.send(message=message)
    return result


def drip_student_signup_html_1(user_name):
    return """
    Hey """ + user_name + """,
    <br>
    <br>
    Since you are new to <a href='http://uguru.me'>uGuru</a>, I want to make sure you know how to get help for your classes.
    <br>
    <br>
    Just <a href='http://berkeley.uguru.me/log_in/'>log in</a> to your account and hit the blue button that says "Get Help And Ace Your Classes." Put in the class, professor, when and where you'd like to meet, and Gurus will get back to you right away.
    <br>
    <br>
    Click <a href='http://berkeley.uguru.me/activity/request/'>HERE</a> and find a Guru. 
    <br>
    <br>
    Let me know if there's anything else I can help with!
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='berkeley.uguru.me/settings/'>here</a></span>
    """

def drip_student_signup_2(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_2(name)

    message = {
        'html':html,
        'subject': "The free tutoring sessions",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-2']
    }

    result = mandrill_client.messages.send(message=message)
    return result

def drip_student_signup_html_2(user_name):
    return """
    Hey """ + user_name + """,
    <br>
    <br>
    I completely forgot to mention! Since <a href='http://uguru.me'>uGuru</a> is new, there are many 1st-time Gurus that offer free sessions. <a href='http://berkeley.uguru.me/activity/request/'>Request help</a> for a difficult class that you are taking now to try it out.
    <br>
    <br>
    Also, don't forget to <a href='http://berkeley.uguru.me/apply-guru/'>become a Guru</a> for classes that you are doing well in! It's a good way to earn money at your own schedule.
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='http://berkeley.uguru.me/settings/'>here</a></span>
    """

def drip_student_signup_3(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_3(name)

    message = {
        'html':html,
        'subject': "The $5 in your account",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-3']
    }

    result = mandrill_client.messages.send(message=message)
    return result

def drip_student_signup_html_3(user_name):
    return """
    Hey """ + user_name + """,
    <br>
    <br>
    I just wanted to remind you to take advantage of that free $5 you earned before it expires. 93% of the Cal students who tried a tutoring session on <a href='http://uguru.me'>uGuru</a> said it helped them get a better grade, so I'd really recommend it.
    <br>
    <br>
    Btw, you can earn extra $5 for every friend that tries <a href='http://uguru.me'>uGuru</a> with your <a href='http://berkeley.uguru.me/settings/referral/'>own referral code</a>.
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='http://berkeley.uguru.me/settings/'>here</a></span>
    """

def drip_student_signup_4(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_4(name)

    message = {
        'html':html,
        'subject': "I decided to give you $5 for free",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-4']
    }

    result = mandrill_client.messages.send(message=message)
    return result


def drip_student_signup_html_4(user_name):
    return """
    Hey """ + user_name + """,
    <br>
    <br>
    I just added $5 credits to your account. 93% of the Cal students who tried a tutoring session on <a href='http://uguru.me'>uGuru</a> said it helped them get a better grade, so I'd really recommend it.
    <br>
    <br>
    Btw, you can earn extra $5 for every friend that tries <a href='http://uguru.me'>uGuru</a> with your <a href='http://berkeley.uguru.me/settings/referral/'>own referral code</a>.
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='http://berkeley.uguru.me/settings/'>here</a></span>
    """
    
def drip_student_signup_5(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_5(name)

    message = {
        'html':html,
        'subject': "Your classes",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-5']
    }

    result = mandrill_client.messages.send(message=message)
    return result


def drip_student_signup_html_5(user_name):
    return """
    """ + user_name.title() + """,
    <br>
    <br>
    How are you classes treating you so far? Some of these classes are just ridiculous, so if you are struggling with any of them, don't forget to <a href='http://berkeley.uguru.me/activity/request/'>get help</a> on <a href='http://uguru/me'>uGuru</a>. Use your free credits if you still have them, or <a href='http://berkeley.uguru.me/activity/request/'>get a free session</a> with one of the 1st-time Gurus to save money.
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='berkeley.uguru.me/settings/'>here</a></span>
    """

def drip_student_signup_6(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_6(name)

    message = {
        'html':html,
        'subject': name + " - 1 quick question",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-6']
    }

    result = mandrill_client.messages.send(message=message)
    return result

def drip_student_signup_html_6(user_name):
    return """
    Hey """ + user_name.title() + """,
    <br>
    <br>
    Can I personally give you extra $5 to try <a href='http://uguru/me'>uGuru</a>? I just added it to your account. <a href='http://berkeley.uguru.me/activity/'>Log in here</a> to get it, and get a Guru who has aced the same class to help you right away.
    <br>
    <br>
    I really hope you can use <a href='http://uguru.me'>uGuru</a> to make studying less of a pain!
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='berkeley.uguru.me/settings/'>here</a></span>
    """

def drip_student_signup_7(user):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    name = user.name.split(" ")[0]
    email = user.email
    html = drip_student_signup_html_7(name)

    message = {
        'html':html,
        'subject': "Checking in with you",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': [{'email':email, 'name':name, 'type':'to'}],
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-drip-campaign', 'student-drip-campaign-7']
    }

    result = mandrill_client.messages.send(message=message)
    return result

def drip_student_signup_html_7(user_name):
    return """
    Hey """ + user_name.title() + """,
    <br>
    <br>
    How are classes for you? More and more of your classmates are using <a href='http://uguru.me'>uGuru</a> to get good grades. I'd really use the free credits and <a href='http://berkeley.uguru.me/activity/request/'>try it out</a> before they expire. It's quick and easy!
    <br>
    <br>
    If you are doing well with your classes, don't forget to also <a href='berkeley.uguru.me/apply-guru/'>become a Guru</a> and make money during your free time!
    <br>
    <br>
    Samir
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>If you don't want to hear from me, click <a href='berkeley.uguru.me/settings/'>here</a></span>
    """

def send_parent_confirmation(user, payment, amount_credits):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    parent_name = user.parent_name.split(" ")[0]
    parent_email = user.parent_email
    student_name = user.name.split(" ")[0]
    student_email = user.email
    charge_id = payment.stripe_charge_id
    card_last4 = user.customer_last4
    amount_billed = payment.student_paid_amount

    if amount_credits == 10000:
        amount_credits = 'Unlimited'

    date = payment.time_created.strftime("%B %d, %Y at %I:%M%p")

    html = send_parent_confirmation_html(parent_name, student_name, charge_id, date, card_last4, amount_credits, amount_billed)

    message = {
        'html':html,
        'subject': 'Thank You For Purchasing uGuru Credits for ' + student_name + '!',
        'from_email': 'payments@uguru.me',
        'from_name': 'Uguru Payments',
        'to': [{'email':parent_email, 'name':parent_name, 'type':'to'}],
        'headers': {'Reply-To': 'support@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['parent-confirmation-purchase']
    }

    result = mandrill_client.messages.send(message=message)

def send_parent_confirmation_html(parent_name, student_name, charge_id, date, card_last4, amount_credits, amount_billed):
    return """
    Hi """ + parent_name + """,    
    <br>
    <br>
    """ + student_name + """ is going to greatly appreciate these credits as things become busier at Cal! 
    <br>
    <br>
    If any experience is less than 100% satisfactory, please let us know, we will provide a full refund.
    <br>
    <br>
    <b>Receipt ID:</b> """+  charge_id +"""<br>
    <b>Time</b>: """+  date +"""<br>
    <b>Card Number:</b> ****-****-****-"""+  card_last4 +"""<br>
    <b>Credits Purchased</b>: """ + str(amount_credits) + """<br>
    <b>Total Amount Billed:</b> $""" + str(amount_billed) + """
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email, or by emailing support@uguru.me for a quick reply.
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """
    
def approved_by_admin_email_html(user_first_name):
    return """
    Congrats *|FNAME|*, 
    <br>
    <br>
    Congratulations! We have just approved your Guru application, and your Guru account has now been activated.
    <br>
    <br>
    Take 2 minutes to <a href="http://berkeley.uguru.me/settings/">update your profile</a> (picture, major, year, and introduction) so students feel more comfortable picking you as their Guru.
    <br>
    <br>
    In the mean time, just sit tight and wait. We will email you when a student requests help for a course that you signed up for.
    <br>
    <br>
    Thanks for joining us! Go Bears!
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_canceled_email_html():
    return """
    Hey *|FNAME|*
    <br>
    <br>
    Our system notified us that you canceled your request recently - I just wanted to personally followup and make sure things were okay on your end.
    <br>
    <br>
    Let us know if there's anything we could've done on our end to make the process smoother.
    <br>
    <br>
    Best,
    <br>
    Samir
    <br>
    <br>
    --
    <br>
    Samir Makhani<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def general_notification_email(user, msg_contents, email_subject):
    user_first_name = user.name.split(" ")[0]
    email_from = "uGuru.me <support@uguru.me>"
    email_subject = "[uGuru.me] " + email_subject
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = general_notification_text(user_first_name, msg_contents)
    html = general_notification_html(user_first_name, msg_contents)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def student_needs_help(student, tutors, course_name, request):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = student.name.split(" ")[0]
    text = student_needs_help_text(user_first_name, course_name, request)
    html = student_needs_help_html(user_first_name, course_name, request)
    to_emails = []
    tutor_emails_dict = {}

    for tutor in tutors:
        if tutor.email_notification and tutor.approved_by_admin:
            to_emails.append({
                'email':tutor.email,
                'name':tutor.name,
                'type': 'to'
                })
            tutor_emails_dict[tutor.email] = tutor

    message = {
        'html':html,
        'text':text,
        'subject': "A Student Needs Your Help!",
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from Uguru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-request']
    }

    result = mandrill_client.messages.send(message=message)
    return (result, tutor_emails_dict)

def send_invite_email(tutor_dict, tag, subject):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    to_emails = []
    merge_vars = []
    html = send_invite_email_html()

    for tutor in tutor_dict.keys():
        email = tutor_dict[tutor]
        query = User.query.filter_by(email=email).first()
        if not query:
            to_emails.append({
                'email':email,
                'name' :tutor.title(),
                'type':'to'
                })
            merge_vars.append({
                'rcpt':email,
                'vars': [
                    {
                        'name':"fname",
                        'content':tutor.split(' ')[0].title()
                    }
                ]
                })
    message = {
        'subject': subject,
        'from_email': 'jasmine@uguru.me',
        'from_name': 'Jasmine from Uguru',
        'to': to_emails,
        'headers': {'Reply-To': 'support@uguru.me'},
        'html':html,
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'merge_vars': merge_vars,
        'tags':[tag]
    }
    result = mandrill_client.messages.send(message=message)

def send_get_help_email(tutor_dict, tag, subject):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    to_emails = []
    merge_vars = []
    html = send_get_help_email_html()

    for tutor in tutor_dict.keys():
        email = tutor_dict[tutor]
        query = User.query.filter_by(email=email).first()
        if not query:
            to_emails.append({
                'email':email,
                'name' :tutor.title(),
                'type':'to'
                })
            merge_vars.append({
                'rcpt':email,
                'vars': [
                    {
                        'name':"fname",
                        'content':tutor.split(' ')[0].title()
                    }
                ]
                })
    message = {
        'subject': subject,
        'from_email': 'chloe@uguru.me',
        'from_name': 'Chloe from Uguru',
        'to': to_emails,
        'headers': {'Reply-To': 'support@uguru.me'},
        'html':html,
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'merge_vars': merge_vars,
        'tags':[tag]
    }
    result = mandrill_client.messages.send(message=message)

def send_get_help_email_html():
    return """
    Hi *|FNAME|*,
    <br>
    <br>
    Hope your studying is going well. My name is Chloe, and I'm emailing to let you know about <a href="http://berkeley.uguru.me/">Uguru</a>, Cal's peer-to-peer tutoring platform that can help you ace your finals!
    <br>
    <br>
    With <a href="http://berkeley.uguru.me/">Uguru</a>, you can get fast affordable tutoring from other Cal Students, many of whom have taken 
    and aced the same classes you're struggling with. 
    <br>
    <br>
    You can request help for most courses, as well as select topics, such as general writing help. Finals represent the majority of your grades, so don't let them ruin your semester of hard work!
    <br>
    <br>
    Also, if you're interested in becoming a tutor, you can apply <a href="http://berkeley.uguru.me/?email=guru">here</a>!
    <br>
    <br>
    Have an awesome finals season!
    <br>
    <br>
    Best,<br>
    Chloe
    """

def send_invite_email_html():
    return """
    <div style="text-align:center">
    Hi *|FNAME|*, 
    <br>
    <br>
    This is Jasmine from <a href="http://berkeley.uguru.me">Uguru</a>, Cal's peer-to-peer tutoring platform. Hope you enjoyed your semester!
    <br>
    <br>
    Great power comes with great responsibility. This finals season you can make a change!<br>
    Be a grade-saving hero and rescue those lost in the dungeons of Main Stacks.
    <br>
    <br>
    Besides the good karma you will rack up, here are other cool benefits as a Guru (tutor):
    <br>
    <br>
    <b> Be Your Own Boss </b><br>
    Set your own rate from $15 to $40 per hour
    <br>
    <br>
    <b>No Time Commitment</b><br>
    Make Money when you are free
    <br>
    <br>
    <b>Great Review for Yourself</b><br>
    Refresh course material as you teach
    <br>
    <br>
    <a href="http://berkeley.uguru.me/?email=guru">Become a Guru Now</a>
    <br>
    <br>
    ---------------------------------------------
    <br>
    <br>
    Alternatively, you won't have to fight this battle alone this semester!
    <br>
    <br>
    If you need help with your finals or papers, you can request <b> instant face-to-face help </b> from your fellow Cal bears 
    who have aced the same class. It's <b>quick</b>, <b>easy</b>, and <b>affordable</b>.
    <br>
    <br>
    <a href="http://berkeley.uguru.me/?email=student">Save Your Grades Now</a>
    <br>
    <br>
    <i> Gurus have finals too. Reserve one before they get busy or booked out!</i>
    <br>
    <br>
    ---------------------------------------------
    <br>
    <br>
    By Cal students, for Cal students<br>
    - The Uguru Team
    <br>
    <br>
    <span style="font-size:10px"><i>If you are annoyed by our email, simply reply "UNSUBSCRIBE" to this message directly. </i></span>
    <br>
    </div>
    """


def send_invite_email_old(tutor_dict, tag, subject, template_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)

    to_emails = []

    for tutor in tutor_dict.keys():
        email = tutor_dict[tutor]
        query = User.query.filter_by(email=email).first()
        if not query:
            to_emails.append({
                'email':email,
                'name' :tutor.title(),
                'type':'to'
                })
    message = {
        'subject': subject,
        'from_email': 'Michael@uguru.me',
        'from_name': 'Michael from Uguru',
        'to': to_emails,
        'headers': {'Reply-To': 'michael@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':[tag]
    }
    result = mandrill_client.messages.send_template(message=message, template_content=[], 
        template_name=template_name)

def send_invite_email_test(tutor_dict, tag, subject, template_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)

    to_emails = []

    for tutor in tutor_dict.keys():
        email = tutor_dict[tutor]
        first_name = tutor.split(' ')[0].title()
        query = User.query.filter_by(email=email).first()
        if not query:
            to_emails.append({
                'email':email,
                'name' :tutor.title(),
                'type':'to'
                })
    message = {
        'subject': subject,
        'from_email': 'Michael@uguru.me',
        'from_name': 'Michael from Uguru',
        'html':"""Become a Tutor on 
Cal's Peer-to-Peer Tutoring Platform
Be Your Own Boss
Set your own rate from $15 to $40 per hour

No Time Commitment
Make money when you are free

Good Karma
Be a hero and rescue your peers from the dungeon of Moffit
Become a Guru Now <a href="http://berkeley.uguru.me/?email=guru"> here</a>.
Feeling Screwed for Your Finals?

Get instant face-to-face help from experienced Gurus at Cal who have aced the same classes you are struggling with.

It's affordable, fast, and easy!
Save Your Grades <a href="http://berkeley.uguru.me/?email=student"> here</a>.
Gurus have finals too. Reserve one now before they get busy or booked out""",
        'to': to_emails,
        'headers': {'Reply-To': 'michael@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':[tag]
    }
    result = mandrill_client.messages.send(message=message)

def generate_new_password(user, new_password):
    if user.name:
        user_name = user.name.split(" ")[0]
    else:
        user_name = "there"
    email_from = "Uguru Reset Password <do-not-reply@uguru.me>"
    email_subject = "Your Temporary Generated Password"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = generate_new_password_text(user_name, new_password)
    html = generate_new_password_html(user_name, new_password)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def generate_new_password_text(user_name, new_password):
    return "Hi """ + user_name + """, \n\n""" + \
    """Your new generated password is '""" + new_password + """'\n\n""" + \
    """Login to http://berkeley.uguru.me/log_in with this password and change to a password of your choice under Account Settings.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def generate_new_password_html(user_name, new_password):
    return """
    Hi """ + user_name + """,
    <br>
    <br>
    Your new generated password is <b>'""" + new_password + """'</b>
    <br>
    <br>
    <a href="http://berkeley.uguru.me/log_in/">Login</a> with this password on Uguru and change to a pasword of your choice under Account Settings. 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def student_needs_help_html(student_name, class_name, request):
    tutor_rate = request.student_estimated_hour
    return """<b>
    """ + student_name + """ needs help with """ + class_name + """.</b> Here's some info:
    <br>
    <br>
    Preferred Location: """ + request.location+ """<br>
    Time Estimate: """ + str(request.time_estimate) + """ hours<br>
    You could* make: $""" + str(request.time_estimate*tutor_rate) +""" ($"""+str(tutor_rate) +"""/hr)<br>
    (You can also propose a different price!)
    <br>
    <br>
    <a href="http://beta.uguru.me/log_in"> Log in </a> to check exact availablilty and accept """ + student_name + """'s request on your feed page, or offer a different price.
    <br>
    <br>
    <span style='font-size:12px; color:grey'>*If this is your first time Guru-ing on the platform, you <b>must</b> tutor for free until you have 4.0 stars average rating. After your first session, have the student rate you immediately, and once you have the sufficient rating, you can continue to tutor the student and bill the student via our platform.</span>
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    <br>
    <br>
    <span style='color:grey;font-size:8px;'>Unsubscribe from these emails <a href='http://berkeley.uguru.me/settings/'>here</a>. Make our platform better by providing feedback <a href='http://tinyurl.com/uguru-feedback-community'>here</a>.</span>
    """

def student_needs_help_text(student_name, class_name, request):
    tutor_rate = request.student_estimated_hour
    return student_name + """ needs help with """ + class_name + """. Here's some info: \n\n""" + \
    """Preferred Location: """ + request.location+ """\n""" + \
    """Time Estimate: """ + str(request.time_estimate) + """ hours\n""" +\
    """You could* make: $""" + str(request.time_estimate * tutor_rate) + """ ($"""+ str(tutor_rate) +"""/hr)\n""" + \
    """(You can also propose a different price!)\n""" +\
    """Login at http://berkeley.uguru.me/log_in/ to see more details. You can either accept the request on the feed page, or offer a different price.\n\n""" +\
    """*If this is your first time Guru-ing on the platform, you must tutor for free until you have 4.0 stars average rating."""+\
    """Samir\nCo-founder"""

def tutor_wants_to_help(student, tutor, course_name):
    user_first_name = student.name.split(" ")[0]
    tutor_name = tutor.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "A Guru Accepted Your Request! Check Now" 
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [student.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = tutor_wants_to_help_text(tutor_name, course_name)
    html = tutor_wants_to_help_html(tutor_name, course_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def tutor_wants_to_help_text(tutor_name, course_name):
    return tutor_name + """ accepted your request for """ + course_name + """. \n\n""" + \
    """Login to http://berkeley.uguru.me/log_in/ to see""" + tutor_name + """'s profile and accept the offer, or if you're not in a rush, wait for a couple more Gurus to accept and choose the one you like best\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_wants_to_help_html(tutor_name, course_name):
    return """
    """ + tutor_name + """ accepted your request for """ + course_name + """.
    <br>
    <br>
    <a href="http://berkeley.uguru.me/log_in/">Log in</a> to see """ + tutor_name + """'s availability & profile, or wait for up to three Gurus to reply!
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def student_is_matched(student, tutor, request_code):
    tutor_name = tutor.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "You Have Been Matched with " + tutor_name  + "!"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [student.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = student_is_matched_text(tutor_name, request_code)
    html = student_is_matched_html(tutor_name, request_code)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()


def send_message_alert(receiver, sender):
    receiver_name = receiver.name.split(" ")[0]
    sender_name = sender.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "You have a new message from " + sender_name
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [receiver.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = send_message_alert_text(receiver_name, sender_name)
    html = send_message_alert_html(receiver_name, sender_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()
    print "sent message alert sent to " + receiver_name

def send_message_alert_text(receiver_name, sender_name):
    return """Don't keep """ + sender_name + " waiting! Login to Uguru.me and message " + sender_name + " now at http://berkeley.uguru.me/messages/ ."
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def send_message_text(sender):
    name = sender.name.split(" ")[0]
    msg = "You have 1 new message on uGuru. Don't keep " + name + ' waiting! www.uguru.me/messages'
    return msg

def send_message_alert_html(receiver_name, sender_name):
    return """Don't keep """ + sender_name + """ waiting!
    <br>
    <br>
    Login to <a href="http://berkeley.uguru.me/log_in">Uguru</a> and reply to """ + sender_name + """ now through our <a href="http://berkeley.uguru.me/messages">messages</a>.
    <br>
    <br>
    If you have any questions or concerns, please reply directly to this email, or give us a phonecall! 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def student_confirm_payment_receipt(user, tutor_name, payment, amount, hourly_price, hours, first_time=None):
    student_name = user.name.split(" ")[0].title()
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = student_name + ", " + tutor_name.title() + " has billed you $" + str(amount) + " please confirm ASAP."
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    
    date = payment.time_created.strftime("%B %d, %Y at %I:%M%p")
    
    #for recurring billing statements
    if not first_time:
        pass
        
    html = student_confirm_payment_receipt_html(date, student_name, str(tutor_name), hourly_price, hours, amount)
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def student_payment_receipt(user, tutor_name, amount, payment, charge_id, skill_name, recurring, connection):
    student_name = user.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Your " + skill_name + " Session with " + tutor_name
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    card_last4 = user.customer_last4
    
    hourly_price = payment.tutor_rate
    hours = payment.time_amount
    date = payment.time_created.strftime("%B %d, %Y at %I:%M%p")

    if not connection:
        hourly_price = payment.tutor_rate
    else:
        hourly_price = None
        

    text = student_payment_receipt_text(date, charge_id, card_last4, str(tutor_name), hourly_price, hours, amount)
    html = student_payment_receipt_html(date, charge_id, card_last4, str(tutor_name), hourly_price, hours, amount)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def tutor_payment_receipt(user, tutor, amount, payment, charge_id, skill_name, student_name):
    student_name = user.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Your "  + skill_name + " Session with " + student_name
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [tutor.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    card_last4 = user.customer_last4
    from app.static.data.prices import prices_dict
    hourly_price = payment.tutor_rate
    hours = payment.time_amount
    amount = hours * hourly_price
    date = payment.time_created.strftime("%B %d, %Y at %I:%M%p")

    from models import Payment
    payments = Payment.query.filter_by(tutor_id=payment.tutor_id, student_id=payment.student_id).all()

    if len(payments) == 1:
        fee_amount = '25'
    elif len(payments) == 2:
        payments = sorted(payments, key=lambda k:k.id)
        first_payment = payments.pop(0)
        second_payment = payments[0]
        if second_payment.confirmed_payment_id == first_payment.id:
            fee_amount = '25'
        else:
            fee_amount = '10'
    else:
        fee_amount = '10'

    html = tutor_payment_receipt_html(date, charge_id, student_name, hourly_price, hours, amount, student_name, fee_amount)
    
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def tutor_received_transfer(user, amount, bank_name, transfer_id, last4, date):
    tutor_name = user.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "$" + str(amount) + " has been successfully transferred!"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    date = date.strftime("%B %d, %Y at %I:%M%p")

    text = tutor_received_transfer_text(amount, bank_name, transfer_id, last4, date)
    html = tutor_received_transfer_html(amount, bank_name, transfer_id, last4, date)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()    

def student_canceled_connection(student, tutor, reason):
    tutor_name = tutor.name.split(" ")[0]
    student_name = student.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "We're Sorry, " + student_name + " has canceled the request."
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [tutor.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    reason_dict = [
        'you were not able to make the time they wanted to meet',
        'there were other tutors that had more experience',
        'your price was out of their budget',
        student_name + ' found help somewhere else',
        'of reasons that ' + student_name +' was not willing to specify, unfortunately.'
        ]

    text = student_canceled_connection_text(student_name, tutor_name, reason_dict[reason])
    html = student_canceled_connection_html(student_name, tutor_name, reason_dict[reason])
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def student_canceled_connection_html(student_name, tutor_name, reason):
    return """
    Hi """ + tutor_name + """, 
    <br>
    <br>
    We regret to inform you that """ + student_name + """ has canceled the current connection with you 
    because """ + reason +""".
    <br>
    <br>
    We understand this is not your fault and you're still awesome! 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_canceled_connection_text(student_name, tutor_name, reason):
    return """Hi """ + student_name + """,\n\n""" +\
    """We regret to infrom you that """ + student_name + """ has canceled the current connection with you because """ + reason + """.\n\n""" +\
    """We understand this is not your fault and you're still awesome! \n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_received_transfer_html(amount, bank_name, transfer_id, last4, date):
    return """
    <br>
    Transfer ID: """+  transfer_id +"""<br>
    Time: """+  date +"""<br>
    Bank Name: """+  bank_name +"""<br>
    Account Number: ****-****-****-"""+  str(last4) +"""<br>
    Total Amount: $""" + str(amount) + """
    <br>
    <br>
    <i>Your balance is being transferred to your account by <a href="http://stripe.com">Stripe</a>, a secure third-party payment platform</i>
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def tutor_received_transfer_text(amount, bank_name, transfer_id, last4,date):
    return """Transfer ID: """+  transfer_id +"""\n""" +\
    """Time: """+  date +"""\n""" +\
    """Bank Name: """+  bank_name +"""\n""" +\
    """Account Number: ****-****-****-"""+ str(last4) +"""\n""" +\
    """Total Amount: $"""+ str(amount) +"""\n\n""" +\
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Your balance is being transferred to your account by Stripe, a secure third-party payment platform\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_payment_receipt_text(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    if not card_last4:
        card_last4 = "None"

    return """For your next session with """ + tutor_name + """, you won't need to submit a request again. Just set """+\
    """ up a time, meetup,. Forget about cash - we'll handle all your payments for free!""" + \
    """Receipt ID: """+  str(charge_id) +"""\n""" +\
    """Time: """+  str(date) +"""\n""" +\
    """Card Number: ****-****-****-"""+ str(card_last4) +"""\n""" +\
    """Guru Name: """+ str(tutor_name) +"""\n""" +\
    """Hourly Price: $"""+ str(hourly_price) +"""\n""" +\
    """Hours: """+ str(hours) +""" hours\n""" +\
    """Total Amount: $"""+ str(amount) +"""\n\n""" +\
    """Your payment is handled by Stripe, a secure third-party payment platform\n\n""" +\
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_payment_receipt_connection_text(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    return """Receipt ID: """+  charge_id +"""\n""" +\
    """Time: """+  date +"""\n""" +\
    """Card Number: ****-****-****-"""+ card_last4 +"""\n""" +\
    """Guru Name: """+ tutor_name +"""\n""" +\
    """Total Amount: $"""+ str(amount) +"""(One-time Connection Fee)\n\n""" +\
    """Your payment is handled by Stripe, a secure third-party payment platform\n\n""" + \
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_payment_receipt_html(date, charge_id, tutor_name, hourly_price, hours, amount, student_name, fee_amount):
    return """
    For your next session with """ + str(student_name) + """, """ + str(student_name) + """ won't need to submit a request again. 
    At the end of session, click the billing button on the top menu bar (the dollar sign button).
    <br>
    <br>
    Receipt ID: """+  str(charge_id) +"""<br>
    Time: """+  str(date) +"""<br>
    Student Name: """+  str(tutor_name) +"""<br>
    Hourly Price: $""" + str(hourly_price) + """<br>
    Hours: """ + str(hours) + """ hours<br>
    Total Earned: $""" + str(amount * (100 - int(fee_amount))/100) + """ (after """+ str(fee_amount) +"""% to uGuru)
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_confirm_payment_receipt_html(date, student_name, tutor_name, hourly_price, hours, amount):
    return """
    Hi """ + student_name + """,
    <br>
    <br>
    """+ tutor_name + """ has billed you the amount below. Please <a href='http://berkeley.uguru.me/activity/'>log in</a> and confirm the amount.<br>
    <b>
    If you do not confirm within 24 hours, the system will auto-confirm.
    </b>
    <br>
    <br>
    Time: """+  str(date) +"""<br>
    Guru Name: """+  tutor_name +"""<br>
    Hourly Price: $""" + str(hourly_price) + """<br>
    Hours: """ + str(hours) + """ hours<br>
    Total Amount: $""" + str(amount) + """
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def student_payment_receipt_html(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    if not card_last4:
        card_last4 = "None"
    return """
    For your next session with """ + tutor_name + """, you won't need to submit a request again. Just set up a time through our messaging."""+\
    """ Forget about cash! We'll handle your payments - for free!
    <br>
    <br>
    Receipt ID: """+  str(charge_id) +"""<br>
    Time: """+  str(date) +"""<br>
    Card Number: ****-****-****-"""+  str(card_last4) +"""<br>
    Guru Name: """+  tutor_name +"""<br>
    Hourly Price: $""" + str(hourly_price) + """<br>
    Hours: """ + str(hours) + """ hours<br>
    Total Amount: $""" + str(amount) + """
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    How helpful was """ + tutor_name + """? <b> Rate and review """ + tutor_name + """ <a href="http://berkeley.uguru.me/activity">here</a>.</b>
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_payment_receipt_connection_html(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    return """
    Receipt ID: """+  charge_id +"""<br>
    Time: """+  date +"""<br>
    Card Number: ****-****-****-"""+  card_last4 +"""<br>
    Guru Name: """+  tutor_name +"""<br>
    Total Amount: $""" + str(amount) + """(One-time connection fee)
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def tutor_is_matched(student, tutor, skill_name):
    student_name = student.name.split(" ")[0]
    tutor_name = tutor.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = student_name  + " Chose You for " + skill_name.upper() + "!"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [tutor.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = tutor_is_matched_text(tutor_name)
    html = tutor_is_matched_html(tutor_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def student_is_matched_text(tutor_name, request_code):
    return """You have been matched with """ + tutor_name + """! Please follow these next steps: \n\n:""" + \
    """1. Message your Guru, and finalize meetup time & location (http://berkeley.uguru.me/messages).\n\n""" +\
    """2. At end of the session, your Guru will draft the bill on his/her device. Don't forget to verify the amount before submitting!\n\n""" +\
    """3. Review your Guru by signing in after the tutor has billed you. \n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_is_matched_html(tutor_name, request_code):
    return """You have been matched with """ + tutor_name + """! Please follow these next steps:
    <br>
    <br>
    1. <a href="http://berkeley.uguru.me/messages/"> Message</a> your Guru, and finalize meetup <b>time & location</b> .
    <br>
    <br>
    2. At end of the session, your Guru will draft the bill on his/her device. You will automatically be charged 
    for the approved amount. 
    <br>
    <br>
    3. <b> Review </b> your Guru by signing in after your Guru has billed you.    
    <br>
    <br>
    If you have any questions or concerns, please reply directly to this email. 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def tutor_is_matched_text(tutor_name):
    return """Congrats """ + tutor_name + """! Here are the next steps\n\n:""" + \
    """1. Message your student, and finalize meetup time & location (http://berkeley.uguru.me/messages).\n\n""" +\
    """2. At the end of the session, log into http://berkeley.uguru.me/log_in/ on your device and confirm that you have met your student.
    .\n\n""" +\
    """3. After payment, remind your student to rate you on their account. These reviews will help you stand out when students choose their tutors.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_is_matched_html(tutor_name):
    return """Congrats """ + tutor_name + """! Here are the next steps: 
    <br>
    <br>
    1. <a href="http://berkeley.uguru.me/messages/">Message</a> your student, and finalize meetup time & location.
    <br>
    <br>
    2. At the end of the session, <a href="http://berkeley.uguru.me/log_in/"> log into Uguru </a> on your device and confirm that you've met your student.
    <br>
    <br>
    3. After you have confirmed, remind your student to rate you on their account. These reviews will help you stand out when students choose their tutors.
    <br>
    <br>
    If you have any questions or concerns, please reply directly to this email, or give us a phonecall! 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


# def student_canceled_request(student, course_name, tutor):
#     email_subject = "We're sorry!"
#     msg_contents = student.name.split(" ")[0] + "'s request for " + course_name.upper() + \
#         " is no longer valid."
#     general_notification_email(tutor, msg_contents, email_subject)

# def student_chose_another_tutor(student, course, tutor):
#     email_subject = "We're sorry!"
#     msg_contents = student.name.split(" ")[0] + " chose another " + course.upper() + \
#         " tutor."
#     general_notification_email(tutor, msg_contents, email_subject)

def student_rating_request(user, tutor_name):
    email_subject = "Please rate " + tutor_name
    msg_contents = "Please visit uguru.me and rate your experience with " + tutor_name +"""
    <br> You will <strong> not </strong> be able to use uGuru.me further until you rate """ + tutor_name + """.
    """

def tutor_payment_received(user, student_name, amount, balance):
    email_subject = "Congrats! You received a payment from " + student_name
    msg_contents = student_name + " has paid you $" + str(amount) + "0. Your balance is now $" + str(balance) + \
        """0. <br><br>You have the option of using this amount for future tutoring, or cashing out 
        to your bank acount."""
    general_notification_email(user, msg_contents, email_subject)


def send_tutor_accept_to_student(request, tutor, skill, student, url):
    student_name = student.name
    student_email = student.email
    skill_name = skill.name
    time_estimate = request.time_estimate
    tutor_name = tutor.name
    tutor_avg_ratings = tutor.calc_avg_ratings
    tutor_length = len(tutor.tutor_ratings)
    
    email_from = "uGuru.me <do-not-reply@uguru.me>"
    email_subject = "[uGuru.me] " +"A " + skill_name + " tutor wants to help you"

    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "

    EMAIL_TO = [student_email]
    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    text = send_request_to_student_text(skill_name, time_estimate, 
        student_name, tutor_name, tutor_avg_ratings, tutor_length, url)
    html = send_request_to_student_html(skill_name, time_estimate, 
        student_name, tutor_name, tutor_avg_ratings, tutor_length, url)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()


def send_request_to_tutors(request, url):

    #Get mail template data
    tutors_to_contact = request.requested_tutors
    student_name = User.query.get(request.student_id).name.split(' ')[0]
    student_description = request.description
    skill_name = Skill.query.get(request.skill_id).name.split(' ')[0]
    urgency = request.convert_urgency_to_str(request.urgency)
    time_estimate = request.time_estimate

    email_from = "uGuru.me <do-not-reply@uguru.me>"
    email_subject = "[uGuru.me] " + skill_name + " Tutoring Request"

    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "

    for tutor in tutors_to_contact:
        EMAIL_TO = [tutor.email]
        tutor_name = tutor.name
        msg = MIMEMultipart('alternative')
        msg['Subject'] = email_subject
        msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
        msg['From'] = email_from
        tutor_name = tutor.name
        text = send_request_to_tutors_text(skill_name, urgency, time_estimate, 
            student_name, tutor_name, student_description, url)
        html = send_request_to_tutors_html(skill_name, urgency, time_estimate, 
            student_name, tutor_name, student_description, url)
        part1 = MIMEText(text, 'plain', 'utf-8')
        part2 = MIMEText(html, 'html', 'utf-8')

        msg.attach(part1)
        msg.attach(part2)
        
        mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
        mail.starttls()
        mail.login(SMTP_USERNAME, SMTP_PASSWORD)
        mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
        mail.quit()
    
def send_request_to_tutors_text(skill_name, urgency, time_estimate, 
    student_name, tutor_name, student_description, url):
    return """Hey """ + tutor_name + """!\n""" + \
    student_name + """ is a Cal student that needs help """ + skill_name + " " + urgency + ". " + \
    student_name + """ estimates that it will take """ + str(int(time_estimate)) + \
    """ hours.""" + """\nHere is some extra information that """ + student_name + \
    """ has asked us to forward on to you: \n\n""" + \
    """'"""+ student_description + """'\n\n
    'Based on your tutoring experience at uGuru.me so far, you will be earning $7 an hour for a total of:'\n
    """ +str(int(time_estimate * 7.0)) + """
    By clicking accept below, you have choosen to continue on with this process.""" +\
    student_name + """ will be notified with your background (average rating and 
    number of tutor encounters on uGuru.me), and will be given the option to accept or
    reject. If """ + student_name + """ chooses to accept, an automated email will be sent from uGuru.me to connect you.\n""" +\
    url + """\n
    Sincerely,
    The Uguru Team\n"""

def send_request_to_student_text(skill_name, time_estimate, 
        student_name, tutor_name, tutor_avg_ratings, tutor_length, url):
    if tutor_length == 0:
        tutor_length = "NA (This is " + tutor_name + "'s first time with uGuru.me"
        tutor_avg_ratings = "NA"
    return """Hey """ + student_name + """!\n\n""" + \
    tutor_name + """, one of our """ + skill_name + """ tutors, has accepted your request for tutoring. Before \
    you choose to accept, we want to show you """ + tutor_name + "'s current experience with uGuru.me.\n\n" + \
    """Number of times tutored with uGuru.me:  """ + tutor_length + "\n" + \
    """Average uGuru.me rating: """ + tutor_avg_ratings + "\n\n" + \
    "Because it is " + tutor_name + "'s first time with us, we've discounted the rate and sent" + tutor_name + \
    """ the uGuru.me Best Tutoring Practices to read beforhand.\n\n""" + \
    """Based on this experience with uGuru.me, """ + str(time_estimate) + \
    """ hours of tutoring from """ + tutor_name + " will cost $7 an hour for a total of:\n\n""" + \
    str(int(time_estimate) * 7) + "\n\n" + \
    """We recommend that you pay """ + tutor_name + " at the end of the session.\n\n" + \
    "If you choose to accept, click the button below. An automated email will be cc'd to both of you" + \
    "so the two of you can take it from there. Thank you for using uGuru.me\n" + \
    url + """\nSincerely,The Uguru Team\n"""

def send_connection_text(student_name, tutor_name, time_estimate):
    return """
    Congrats!\n\n""" + \
    """The two of you have matched. At the end of this session, """ + student_name + """ owes """ + \
    tutor_name + """ $""" + str(int(time_estimate) * 7) + """. Both of your emails are cc'd to this""" + \
    """ message, so we'll let you two take it from here :)\n\n""" +\
    """If you have any questions, or this experience did not go as well as you expected, please reach out """ +\
    """to us at support@uguru.me for a quick reply.\n\n""" +\
    """Sincerely, \nThe uGuru.me Team"""

def welcome_uguru_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """Thank you for signing up for uGuru.me! \n\nOur site is currently at a beta stage, so if anything is janky at""" +\
    """ first, we sincerely apologize. \n\n""" + \
    """We are hard at work to better your experience and would love to hear your thoughts! If you have """ +\
    """any questions, concerns, or suggestions <i>please<i/> do not hesitate to reach out to us directly""" +\
    """ by replying to this email.\n\n""" +\
    """Sincerely, \nThe uGuru.me Team"""

def welcome_uguru_student_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir, from Uguru. We hope to make instant help available and affordable by connecting you to Gurus who have done well in the same classes at Cal!  \n\n""" +\
    """This finals season, you won't have to fight the battle alone. If you feel lost in the dungeons of Moffit, just request help here(at http://berkeley.uguru.me/activity), and the Gurus will be ready to rescue you! \n\n""" + \
    """We are a small team with limited resources. If you have any questions/suggestions, let us know by replying to this email directly! \n\n""" + \
    """Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears!  \n\n""" + \
    """Samir Makhani\nCo-Founder\nsamir@uguru.me\n(813) 500 9853"""

def general_notification_text(user_name, msg):
    print msg, user_name
    return"""
    Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + msg + \
    """\n\n""" + \
    """See more details by visiting the link below:\n""" + \
    """http://berkeley.uguru.me/activity\n\n""" + \
    """Sincerely, \nThe uGuru.me Team"""
    

def send_request_to_student_html(skill_name, time_estimate, 
        student_name, tutor_name, tutor_avg_ratings, tutor_length, url):
    if tutor_length == 0:
        tutor_length = "NA (This is " + tutor_name + "'s first time with uGuru.me"
        tutor_avg_ratings = "NA"
    return """
    Hey """ + student_name + """!
    <br>
    <br>""" + \
    tutor_name + """, one of our """ + skill_name + """ has accepted your request for tutoring. Before
    you choose to accept, we want to show you """ + tutor_name + """'s current experience with uGuru.me:
    <br>
    <br>
    <b>Number of times tutored with uGuru.me:</b>""" + tutor_length + """<br>
    <b>Average uGuru.me rating: </b>""" + tutor_avg_ratings + """
    <br>
    <br>
    Because it is """ + tutor_name + """'s first time with us, we've discounted the rate and 
    sent """ + tutor_name + """ the <b>uGuru.me Best Tutoring Practices</b> to read beforehand.
    <br>
    <br>
    Based on this experience with uGuru.me, """ + \
    str(time_estimate) + """ hours of tutoring from """ + tutor_name + """ will cost $7 an hour for a total of:<br>
    <h2><center>$""" +str(int(time_estimate * 7.0)) + """</center></h2>
    We recommend that you pay """ + tutor_name + """ at the end of the session.
    <br>
    <br>
    If you choose to accept, click the button below. An automated email will be cc'd to both of you so the two of you can take it from there. 
    <br> 
    <br>""" + \
    """<a href='""" + url+ """'><center> ACCEPT </center></a>
    <br> 
    Thank you for using uGuru.me!
    <br>
    <br>
    Sincerely, <br>
    The Uguru Team <br>"""

def send_request_to_tutors_html(skill_name, urgency, time_estimate, 
    student_name, tutor_name, student_description, url):
    return """
    Hey """ + tutor_name + """! 
    <br> 
    <br>""" + \
    student_name + """ is a Cal student that needs help in """ + skill_name.upper() + " " + urgency + ". " + \
    student_name + """ estimates that it will take <b>""" + str(int(time_estimate)) + \
    """ hours</b>. Here is some extra information that """ + student_name + """ has asked
    us to forward on to you: 
    <br>
    <br><i>
    '""" + \
    student_description + """'</i><br><br>
    Based on your tutoring experience at uGuru.me so far, you will be earning 
    $7 an hour for a total of:<br>
    <h2><center>$""" +str(int(time_estimate * 7.0)) + """</center></h2>
    By clicking accept below, you have choosen to continue on with this process. <br><br>""" +\
    """<a href='""" + url+ """' ><center> ACCEPT </center></a><br><br>""" + \
    student_name + """ will be notified with your background (average rating and 
    number of tutor encounters on uGuru.me), and will be given the option to accept or
    reject. <br><br>If """ + student_name + """ chooses to accept, an automated email will be sent from uGuru.me to connect you.
    <br>
    <br>
    Sincerely, <br>
    The Uguru Team <br>
    """

def send_connection_html(student_name, tutor_name, time_estimate):
    return """
    Congrats!
    <br>
    <br>

    The two of you have matched. At the end of this session, """ + student_name + """ owes """ + \
    tutor_name + """ $""" + str(int(time_estimate) * 7) + """. Both of your emails are cc'd to this
    message, so we'll let you two take it from here :)
    <br>
    <br>

    If you have any questions, or this experience did not go as well as you expected, please reach out
    to us at support@uguru.me for a quick reply.
    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """

def welcome_uguru_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>

    Thank you for signing up for uGuru.me! 
    <br>
    <br>
    Our site is currently at a beta stage, so if anything is janky at first, we sincerely apologize. 
    <br>
    <br>
    We are hard at work to better your experience and would love to hear your thoughts! If you have 
    any questions, concerns, or suggestions <i>please</i> do not hesitate to reach out to us directly 
    by replying to this email.

    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """

def welcome_uguru_tutor_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>
    This is Samir, from <a href="http://berkeley.uguru.me">uGuru</a>. We strive to create a better tutoring experiencing by making peer-to-peer help <b>available</b> and <b>affordable</b> to students by connecting them with trusted Gurus like you! 
    <br>
    <br>
    We are excited to have you on board as a Cal Guru. Your role will be to save students who are lost in the dungeons of Moffit.
    <br>
    <br>
    Since this is your first time tutoring with us, your current mission is to show your skills by earning a great rating during your first session. This session will be free to the student, so do your best to earn a 4.0 rating. As soon as you achieve that 4.0 rating, you'll be ready to set your own rates, be your own boss, and earn some extra cash. To get the full scoop on the Guru code, check out our <a href='tinyurl.com/uguru-q-a'> FAQ </a>.
    <br>
    <br>
    Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears! 
    <br>
    <br>
    Samir<br>
    Samir@uguru.me<br>
    (813) 500-9853
    <br>
    <br>
    <span style='color:grey;font-size:12px;'> We're are a small team with limited resources, but we're committed to providing the best possible experience to our users. If you have any questions/suggestions, let us know by replying to this email. </span>
    """


def welcome_uguru_tutor_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir from Uguru. We created Uguru to make peer-to-peer help available and affordable to students by connecting fellow Cal Bears. \n\n""" +\
    """We will email you as soon as we approve your application to join the Guru force. In the mean time, you are able to request help(at http://berkeley.uguru.me/activity) from the Gurus If you feel lost in the dungeons of Moffit. \n\n""" + \
    """We are a small team with limited resources. If you have any questions/suggestions, let us know by replying to this email directly! \n\n""" + \
    """Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears!  \n\n""" + \
    """Samir Makhani\nCo-Founder\nsamir@uguru.me\n(813) 500 9853"""

def welcome_uguru_student_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>
    This is Samir from <a href="http://berkeley.uguru.me">Uguru</a>. We hope to make instant help <b>available</b> and <b>affordable</b> by connecting you to Gurus who have done well in the same classes at Cal.
    <br>
    <br>
    This finals season, you won't have to fight the battle alone. If you feel lost in the dungeons of Moffit, just request help <a href="http://berkeley.uguru.me/activity/request/">here</a>, and the Gurus will be ready to rescue you!
    <br>
    <br>    
    We are a small team with limited resources. If you have any questions/suggestions, let us know by replying to this email directly.
    <br>
    <br>
    Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears! 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500-9853
    """


def general_notification_html(user_name, msg):
    return """
    Hi """ + user_name + """,
    <br>
    <br> """ + msg + """ 
    <br>
    <br>
    See more details <a href="http://beta.uguru.me/activity/"> here</a>. 
    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """


def request_received_msg(user, tutor, _request, skill):
    user_name = user.name.split(" ")[0].title()
    amount = _request.student_estimated_hour * _request.time_estimate
    from views import calc_avg_rating
    if calc_avg_rating(tutor)[0] >= 4.0:
        msg = user_name + " needs your help with " + skill.upper() + " You can make up to $" + \
        str(amount) + ". Act fast and see if your schedules line up at http://berkeley.uguru.me."
    else:
        msg = user_name + " needs your help with " + skill.upper() + ". Act fast and see if your schedules line up at http://berkeley.uguru.me."
    return msg

def guru_can_help(tutor, skill_name):
    tutor_name = tutor.name.split(" ")[0].title()

    msg = tutor_name + " can help with " + skill_name.upper() + ". Check out " + tutor_name + "'s profile and confirm this session at http://berkeley.uguru.me. Happy Studying!"
    return msg

def its_a_match_guru(student, skill_name):
    student_name = student.name.split(" ")[0]
    msg = student_name + " has chosen you!" + " Message " + student_name + " now at http://berkeley.uguru.me/messages."
    return msg

def student_cap_reached(skill_name):
    return "You've received your 3 Gurus for your " + skill_name +  " request! You have 24 hours to choose one!"

def reminder_before_session(person_a, person_b, location, ending):
    person_a_name = person_a.name.split(" ")[0].title()
    person_b_name = person_b.name.split(" ")[0].title()
    msg = "Hey " + person_a_name + "! Your uGuru session with " + person_b_name + " is in one hour! Meet at " + location + ". Happy " + ending + "!"
    return msg


def unsubscribe_str_html(receiver_email, tag_arr = None, campaign_str = None):
    from views import get_environment
    base_url = None
    if get_environment() == 'PRODUCTION':
        base_url = 'http://berkeley.uguru.me/'
    elif get_environment() == 'TESTING':
        base_url = 'http://berkeley.uguru.me/'
    else:
        base_url = 'http://berkeley.uguru.me/'

    full_url = base_url + 'unsubscribe/' + receiver_email + '/'

    if tag_arr:
        full_url = full_url + ' '.join(tag_arr) + '/'

    if campaign_str:
        full_url = full_url + campaign_str + '/'

    return """
    <br>
    <br>
    <span style='color:grey-text; font-size:10px'>
    Don't want to hear from us? Unsubscribe <a target='_blank' href='""" +full_url+"""'>here</a>.
    </span>
    """

def unsubscribe_str_html_bare(receiver_email, tag_arr=None, campaign_str=None):
    from views import get_environment
    base_url = None
    if get_environment() == 'PRODUCTION':
        base_url = 'http://berkeley.uguru.me/'
    elif get_environment() == 'TESTING':
        base_url = 'http://berkeley.uguru.me/'
    else:
        base_url = 'http://berkeley.uguru.me/'

    full_url = base_url + 'unsubscribe/' + receiver_email + '/'

    if tag_arr:
        full_url = full_url + ' '.join(tag_arr) + '/'

    if campaign_str:
        full_url = full_url + campaign_str + '/'

    return """
    No thanks? <a target='_blank' href='""" +full_url+"""'>Unsubscribe here</a>.
    """

def unsubscribe_str_html_(receiver_email, tag_arr=None, campaign_str=None):
    from views import get_environment
    base_url = None
    if get_environment() == 'PRODUCTION':
        base_url = 'http://berkeley.uguru.me/'
    elif get_environment() == 'TESTING':
        base_url = 'http://berkeley.uguru.me/'
    else:
        base_url = 'http://berkeley.uguru.me/'

    full_url = base_url + 'unsubscribe/' + receiver_email + '/'

    if tag_arr:
        full_url = full_url + ' '.join(tag_arr) + '/'

    if campaign_str:
        full_url = full_url + campaign_str + '/'

    return """
    Don't want to hear from us? Unsubscribe <a target='_blank' href='""" +full_url+"""'>here</a>.
    """



def send_mailgun_email(domain, receiver_name, receiver_email, subject,
    _from, html_str, tag_arr, campaign_str=None, reply_to = None):
    import requests
    data = {
            "from":_from,
              "to": [receiver_email],
              "subject": subject,
              "html": html_str, 
              "o:tag": tag_arr,
              "o:tracking-clicks": True, 
              "o:tracking-opens": True, 
            }
    if reply_to:
        data['h:Reply-To'] = reply_to
    if campaign_str:
        data['o:campaign'] = campaign_str
    return requests.post(
        "https://api.mailgun.net/v2/" + domain + "/messages",
        # auth=("api", "key-bfe01b1e2cb76d45e086c2fa5e813781"),
        auth=("api", "key-d28b48c63af278e7c460a7df9258c424"),
        data=data)


def one_click_signup_email_html_bare(receiver_name, receiver_email):
    return """
    Hi """ + receiver_name.split(" ")[0] + """,
    <br>
    <br>
    This is Samir, from <a href="http://uguru.me">uGuru</a>. We strive to create a better tutoring experiencing by making peer-to-peer help <b>available</b> and <b>affordable</b> to students by connecting them with trusted Gurus like you! 
    <br>
    <br>
    We are excited to have you on board as a Cal Guru. Your role will be to save students who are lost in the dungeons of Moffit.
    <br>
    <br>
    Since this is your first time tutoring with us, your current mission is to show your skills by earning a great rating during your first session. This session will be free to the student, so do your best to earn a 4.0 rating. As soon as you achieve that 4.0 rating, you'll be ready to set your own rates, be your own boss, and earn some extra cash. To get the full scoop on the Guru code, check out our <a href='tinyurl.com/uguru-q-a'> FAQ </a>.
    <br>
    <br>
    Click <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email) + """'>here</a> to get your free credit.
    <br>
    <br>
    Samir"""


def one_click_signup_email(receiver_name, receiver_email):
    send_mailgun_email(
        receiver_name,
        receiver_email,
        'Thank you for signing up - here is your credit from uGuru',
        'spencer@support.uguru.me',
        one_click_signup_email_html_bare(receiver_name, receiver_email),
        ['test-campaign-one'],
        'd83uh'
        )

def mailgun_template_one(receiver_name, receiver_email):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', how are your classes treating you?'
    tag_arr = ['mailgun-campaign-one']
    campaign_str = 'd83uh'
    send_mailgun_email(
        'support.uguru.me',
        receiver_name,
        receiver_email,
        subject,
        "Chloe from uGuru <chloe@support.uguru.me>",
        mailgun_sample_action_template_html(receiver_name, receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-one'],
        'd83uh'
        )    


def mailgun_campaign_one(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', get $10 for uGuru'
    tag_arr = ['mailgun-campaign-one']
    send_mailgun_email(
        'nationalacademicresearch.org',
        receiver_name,
        receiver_email,
        subject,
        "Chloe from uGuru <Chloe@uguru.me>",
        mailgun_campaign_one_html(receiver_name, receiver_email, tag_arr, campaign_str) + unsubscribe_str_html(receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-one'],
        campaign_str
        )    

def mailgun_campaign_two(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', your friend Michael just sent you $10'
    tag_arr = ['mailgun-campaign-two']
    send_mailgun_email(
        'nationalacademicresearch.org',
        receiver_name,
        receiver_email,
        subject,
        "Chloe from uGuru <chloe@uguru.me>",
        mailgun_campaign_two_html(receiver_name, receiver_email, tag_arr, campaign_str)  + unsubscribe_str_html(receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-two'],
        campaign_str
        )    

def mailgun_campaign_three(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', get $10 from uGuru'
    tag_arr = ['mailgun-campaign-three']
    send_mailgun_email(
        'nationalacademicresearch.org',
        receiver_name,
        receiver_email,
        subject,
        "Chloe from uGuru <Chloe@uguru.me>",
        mailgun_campaign_three_html(receiver_name, receiver_email, tag_arr, campaign_str) + unsubscribe_str_html(receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-three'],
        campaign_str
        )    

def mailgun_campaign_four(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', your friend Michael just sent you $10'
    tag_arr = ['mailgun-campaign-four']
    send_mailgun_email(
        'caltutors.org',
        receiver_name,
        receiver_email,
        subject,
        "Jen from uGuru <jen@uguru.me>",
        mailgun_campaign_four_html(receiver_name, receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-four'],
        campaign_str
        )    

def mailgun_campaign_five(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ", try uGuru today"
    tag_arr = ['mailgun-campaign-five']
    send_mailgun_email(
        'nationalacademicresearch.org',
        receiver_name,
        receiver_email,
        subject,
        "Jen from uGuru <jen@uguru.me>",
        mailgun_campaign_four_html(receiver_name, receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-five'],
        campaign_str
        )    

def mailgun_campaign_six(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', your friend Michael just sent you $10'
    tag_arr = ['mailgun-campaign-six']
    send_mailgun_email(
        'nationalacademicresearch.org',
        receiver_name,
        receiver_email,
        subject,
        "Chloe from uGuru <chloe@uguru.me>",
        mailgun_campaign_six_html(receiver_name, receiver_email, tag_arr, campaign_str) + unsubscribe_str_html(receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-six'],
        campaign_str
        )    

def generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str):
    from views import get_environment
    base_url = None
    if get_environment() == 'PRODUCTION':
        base_url = 'http://berkeley.uguru.me/'
    elif get_environment() == 'TESTING':
        base_url = 'http://berkeley.uguru.me/'
    else:
        base_url = 'http://berkeley.uguru.me/'
    return base_url + 'free-10-credit/' + receiver_email + '/' + receiver_name + '/' + campaign_str



def mailgun_test(email, first_name):
    import requests
    return requests.post(
        "https://api.mailgun.net/v2/caluguru.me/messages",
        auth=("api", "key-bfe01b1e2cb76d45e086c2fa5e813781"),
        data={"from": "Spencer from uGuru <spencer@caluguru.me>",
              "to": [email],
              "subject": "Tutoring is the best thing ever, " + first_name,
              "h:Reply-To": 'support@uguru.me',
              "html": mail_gun_template_test_2_html(first_name),
              "o:tag": ['test-campaign-one'],
              "o:tracking-clicks": True, 
              "o:tracking-opens": True, 
              "o:campaign": 'd7eaw', 
                })

def unsubscribe_all_emails():
    from static.data.unsubscribe import emails
    import requests
    for email in emails:
        requests.post(
        "https://api.mailgun.net/v2/caluguru.me/unsubscribes",
        auth=("api", "key-bfe01b1e2cb76d45e086c2fa5e813781"),
        data={"address":email,
              "tag": "*"
            }
        )
        print email, "has been unsubscribed"


def mail_gun_template_test_1_html(user_name):
    return """
    Hi """ + user_name + """,
    <br>
    <br>
    This is Spencer, a research analyst at National Academic Research.
    <br>
    <br>
    We are trying to understand the habits of Berkeley students. At the end of 3 multiple choice survey questions, we will reward you with $10 with <a href='http://uguru.me'>uGuru</a>, the peer-to-peer tutoring platform on campus.
    <br>
    <br>
    Take 30 secs to <a href='https://docs.google.com/forms/d/15edP5zH3YCjIWwoVxTPbpYJu_d2e9gmlXHf7JWLoGDk/viewform?usp=send_form'>tell us how you study</a>.
    <br>
    <br>
    See more details <a href="http://beta.uguru.me/activity/"> here</a>. 
    <br>
    <br>
    Sincerely, <br>
    Spencer
    """

def mail_gun_template_test_2_html(user_name):
    return """
    Hi """ + user_name + """,
    We hope you use our platform - thanks for showing interest!
    Sincerely, <br>
    Spencer"""


def error(message):

    EMAIL_TO = ["makhani.samir@gmail.com", "bkamita@gmail.com"]
    print message

    if os.environ.get('TESTING'):
        EMAIL_FROM = "TESTING Error <sandbox_error@uguru.me>"
        EMAIL_SUBJECT = "[Uguru Sandbox Error] Exception"
    elif os.environ.get('PRODUCTION'):
        EMAIL_FROM = "PRODUCTION Error <site_error@uguru.me>"
        EMAIL_SUBJECT = "[Uguru PRODUCTION Error] Exception"
    else: #local machine
        print message
        return 


    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    DATA='This is the content of the email.'

    # msg = MIMEText(DATA)
    msg = MIMEMultipart('alternative')
    msg['Subject'] = EMAIL_SUBJECT
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = EMAIL_FROM

    error_message = MIMEText(message, 'plain', 'utf-8')
    msg.attach(error_message)

    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()


def mailgun_template_one_html(receiver_name, receiver_email):
    return """
    Hi """ + receiver_name.split(" ")[0].title() + """,
    <br>
    <br>
    This is Chloe, from <a href="http://uguru.me">uGuru</a>, the peer-to-peer tutoring service on campus. Lots of your classmates are using uGuru to study, and 93 of them said uGuru helped them improve their grades. 
    <br>
    <br>
    It really sucks when you are stuck by yourself the night before the exams, and that's why we built uGuru. You can find other students who have aced the same class to help you whenever you need it. 
    <br>
    <br>
    I have added $10 to your uGuru account to try it, just make sure you confirm here. <br>
    Click <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email) + """'>here</a> to get your free credit.
    <br>
    <br>
    Good luck with your midterms!
    <br>
    <br>
    Chloe"""

def mailgun_campaign_one_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return """
    Hi """ + receiver_name.split(" ")[0].title() + """,
    <br>
    <br>
    Many of your classmates are acing their exams with uGuru. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
    <br>
    <br>
    We want to give you $10 to try it (expires 9/25). 
    <br>
    <br>
    Take 30 secs to tell us how you study.<br>
    https://docs.google.com/forms/d/15edP5zH3YCjIWwoVxTPbpYJu_d2e9gmlXHf7JWLoGDk/viewform?usp=send_form
    <br>
    <br>
    Click <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str) + """'>here</a> to get your $10 from uGuru.
    <br>
    <br>
    Chloe"""    

def mailgun_campaign_two_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return """
    Hi """ + receiver_name.split(" ")[0].title() + """,
    <br>
    <br>
    This is Chloe from <a href='http://uguru.me'>uGuru</a>, the <b>peer-to-peer tutoring service</b> on campus. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
    <br>
    <br>
    Your friend <b>Michael</b> referred you, and sent you <b>$10</b> to try it! Michael will also get $10 if you redeem.
    <br>
    <br>
    <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email) + """'>Click here to get your $10 from uGuru.</a>
    <br>
    <br>
    Good luck with your midterms!
    <br>
    <br>
    Chloe"""

def mailgun_campaign_three_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return """
    Hi """ + receiver_name.split(" ")[0].title() + """,
    <br>
    <br>
    Many of your classmates are acing their exams with uGuru. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
    <br>
    <br>
    <b>We wanted to give you 10 to try it</b> (expires 9/25).
    <br>
    <br>
    <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email) + """'>Click here to get your reward</a>
    <br>
    <br>
    Good luck with your midterms!
    <br>
    Chloe
    <br>
    <br>
    """
    #P.S. <b>93%</b> of your classmates said uGuru helped improve their grades.


def mailgun_campaign_six_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return """
    Hi """ + receiver_name.split(" ")[0].title() + """,
    <br>
    <br>
    This is Chloe from <a href='http://uguru.me'>uGuru</a>, the <b>peer-to-peer tutoring service</b> on campus. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
    <br>
    <br>
    Your friend <b>Michael</b> referred you, and sent you <b>$10</b> to try it! Michael will also get $10 if you redeem.
    <br>
    <br>
    <a href='"""+ generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str) + """'>Click here to get your $10 from uGuru</a>
    <br>
    <br>
    Good luck with your midterms!
    <br>
    Chloe
    """


def send_mandrill_purchase_package_promotion_html(receiver_name):
    return"""
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Actionable emails e.g. reset password</title>

    <link href='http://fonts.googleapis.com/css?family=Grand+Hotel' rel='stylesheet' type='text/css'>

    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      h1 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h4 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        width: 100% !important;
      }
      .content {
        padding: 10px !important;
      }
      .content-wrapper {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    </style>
    </head>

    <body style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0; padding: 0;">

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0; padding: 0;">
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; padding: 0; border: 1px solid #e9e9e9;">
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="alert alert-warning" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 32px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; display:block;margin: 0 auto; border-radius: 3px 3px 0 0; background: #2CAEE1; margin: 0; padding: 20px; text-decoration:none;" align="center" valign="top">
                                <b>uGuru.me</b><br>
                                <span style='font-size:18px; font-weight:bold'> One Day Promotion </span>
                            </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Hi """ + receiver_name.split(" ")[0].title() + """,
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Payments through uGuru are very easy. You don't need to worry about carrying cash anymore, and your tutor can bill you immediately after any session. 
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            We just wanted to remind you one more time about the <b> grade-saving </b> deals & packages we are offering TODAY ONLY.
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <b>This promotion will expire tonight at midnight</b>. 
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <a href='http://berkeley.uguru.me/activity/promotion/1/' class="btn-primary" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 16px; color: #fff; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #2CAEE1; margin: 0; padding: 0; border-color: #2CAEE1; border-style: solid; border-width: 10px 20px;">&nbsp;&nbsp;See Packages and Save!&nbsp;&nbsp;</a>
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Good luck with your midterms!<br>
                                            Samir
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Don't want to hear from us? Unsubscribe <a href='berkeley.uguru.me/settings'>here</a></td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
        </tr>
    </table>

    </body>
    </html>"""


def mailgun_campaign_four_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return"""
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Actionable emails e.g. reset password</title>

    <link href='http://fonts.googleapis.com/css?family=Grand+Hotel' rel='stylesheet' type='text/css'>

    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      h1 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h4 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        width: 100% !important;
      }
      .content {
        padding: 10px !important;
      }
      .content-wrapper {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    </style>
    </head>

    <body style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0; padding: 0;">

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0; padding: 0;">
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; padding: 0; border: 1px solid #e9e9e9;">
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="alert alert-warning" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 32px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; display:block;margin: 0 auto; border-radius: 3px 3px 0 0; background: #2CAEE1; margin: 0; padding: 20px; text-decoration:none;" align="center" valign="top">
                                <b>uGuru.me</b>
                            </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Hi """ + receiver_name.split(" ")[0].title() + """,
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            This is Jasmine from <a href='http://uguru.me'>uGuru</a>, the <b>peer-to-peer tutoring service</b> on campus. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Your friend <b>Michael</b> referred you, and sent you <b>$10</b> to try it! Michael will also get $10 if you redeem.
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <a href='"""+generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str)+"""' class="btn-primary" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 18px; color: #fff; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #2CAEE1; margin: 0; padding: 0; border-color: #2CAEE1; border-style: solid; border-width: 10px 20px;">&nbsp;&nbsp;Get my $10&nbsp;&nbsp;</a>
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Good luck with your midterms!<br>
                                            Jasmine
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            P.S. This promotion expires 10/3.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"> You are receiving this message because a friend referred you. <br> """+unsubscribe_str_html_bare(receiver_email, tag_arr, campaign_str)+"""</td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
        </tr>
    </table>

    </body>
    </html>"""

def mandrill_campaign_two_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return"""
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Actionable emails e.g. reset password</title>

    <link href='http://fonts.googleapis.com/css?family=Grand+Hotel' rel='stylesheet' type='text/css'>

    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      h1 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h4 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        width: 100% !important;
      }
      .content {
        padding: 10px !important;
      }
      .content-wrapper {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    </style>
    </head>

    <body style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0; padding: 0;">

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0; padding: 0;">
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; padding: 0; border: 1px solid #e9e9e9;">
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="alert alert-warning" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 32px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; display:block;margin: 0 auto; border-radius: 3px 3px 0 0; background: #2CAEE1; margin: 0; padding: 20px; text-decoration:none;" align="center" valign="top">
                                <b>uGuru.me</b>
                            </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Hi """ + receiver_name.split(" ")[0].title() + """,
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            This is Jen from <a href='http://uguru.me'>uGuru</a>, the <b>peer-to-peer tutoring service</b> on campus. With uGuru, you can find other students who have aced the same class to help you anytime, even the night before exams!
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <b>Three thousand Cal students</b> are on uGuru. We would like to give you <b>$10</b> to try it! 
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <a href='"""+generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str)+"""' class="btn-primary" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 18px; color: #fff; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #2CAEE1; margin: 0; padding: 0; border-color: #2CAEE1; border-style: solid; border-width: 10px 20px;">&nbsp;&nbsp;Get my free $10&nbsp;&nbsp;</a>
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Good luck with your midterms!<br>
                                            Jen
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            P.S. This promotion expires 9/30.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">"""+unsubscribe_str_html_bare(receiver_email, tag_arr, campaign_str)+"""</td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
        </tr>
    </table>

    </body>
    </html>"""

def mailgun_campaign_seven_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return"""
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Actionable emails e.g. reset password</title>

    <link href='http://fonts.googleapis.com/css?family=Grand+Hotel' rel='stylesheet' type='text/css'>

    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      h1 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h4 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        width: 100% !important;
      }
      .content {
        padding: 10px !important;
      }
      .content-wrapper {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    </style>
    </head>

    <body style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0; padding: 0;">

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0; padding: 0;">
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; padding: 0; border: 1px solid #e9e9e9;">
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="alert alert-warning" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 32px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; display:block;margin: 0 auto; border-radius: 3px 3px 0 0; background: #2CAEE1; margin: 0; padding: 20px; text-decoration:none;" align="center" valign="top">
                                <b>uGuru.me</b>
                            </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Hi """ + receiver_name.split(" ")[0].title() + """,
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            This is Lily from uGuru, the <b>peer-to-peer tutoring service</b> on campus. With uGuru, you can find students who have aced the same class to help you anytime!
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Over <b>3k students at Cal</b> are on uGuru. We would like to give you <b>$10</b> to try it!
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <a href='"""+generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str)+"""' class="btn-primary" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 18px; color: #fff; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #2CAEE1; margin: 0; padding: 0; border-color: #2CAEE1; border-style: solid; border-width: 10px 20px;">&nbsp;&nbsp;Get 10 dollars now&nbsp;&nbsp;</a>
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Good luck with your courses!<br>
                                            Lily
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"> <br> """+unsubscribe_str_html_bare(receiver_email, tag_arr, campaign_str)+"""</td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
        </tr>
    </table>

    </body>
    </html>"""

def mailgun_campaign_seven(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ", here's to the new year."
    tag_arr = ['mailgun-campaign-five']
    send_mailgun_email(
        'caltutors.org',
        receiver_name,
        receiver_email,
        subject,
        "Lily at Cal Tutors<lily@caltutors.org>",
        mailgun_campaign_four_html(receiver_name, receiver_email, tag_arr, campaign_str),
        ['mailgun-campaign-five'],
        campaign_str
        )

def mailgun_campaign_eight(receiver_name, receiver_email, campaign_str):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_name + ', welcome to the platform!'
    # tag_arr = ['mailgun-campaign-five']
    send_mailgun_email(
        'caltutors.org',
        receiver_name,
        receiver_email,
        subject,
        "Samir from uGuru <samir@uguru.me>",
        'Thank you for signing up! We will be in touch :)',
        ['test'],
        campaign_str
        )

def mailgun_campaign_nine(receiver_name, receiver_email):
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', thank you for signing up!'
    send_mailgun_email(
        'nationaltutorassociation.com',
        receiver_name,
        receiver_email,
        subject,
        "Dan from NTA <dan@nationaltutorassociation.com>",
        mailgun_campaign_nine_html(receiver_name),
        ['first-campaign'],
        'first-campaign'
        )    

def mailgun_campaign_nine_html(name):
    return """
    Hi, """ + name + """,
    <br>
    <br>
    Welcome to NTA! You will be glad to know that there are 100,000 tutors in this organization.
    <br>
    <br>
    We are excited to have you be part of this organization. For more details, read <a href='http://www.nationaltutorassociation.com'>here</a>.
    <br>
    <br>
    Best, <br>
    Dan
    """

def send_mandrill_nine(receiver_name, receiver_email, tag_arr):
    mandrill_client = mandrill.Mandrill(MASS_MANDRILL_API_KEY)
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ', your friend Michael just sent you $10'

    to_emails = []
    to_emails.append({
        'email':receiver_email,
        'name': receiver_name,
        'type': 'to'
    })


    message = {
        'html':mailgun_campaign_four_html(receiver_name, receiver_email, [tag_arr], tag_arr),
        'subject': subject,
        'from_email': 'jasmine@uguru.me',
        'from_name': 'Jasmine from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'support@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':[tag_arr]
    }

    result = mandrill_client.messages.send(message=message)

def send_mandrill_purchase_package_promotion(receiver_name, receiver_email, skill_name, tutor_name):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject =  "LAST DAY: Pay " + tutor_name.split(" ")[0].title() + " through uGuru and get up to $50 free credit." 

    to_emails = []
    to_emails.append({
        'email':receiver_email,
        'name': receiver_name,
        'type': 'to'
    })


    message = {
        'html':send_mandrill_purchase_package_promotion_html(receiver_name),
        'subject': subject,
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['purchase-package-promotion-v2']
    }

    result = mandrill_client.messages.send(message=message)

def send_mandrill_ten(receiver_name, receiver_email, tag_arr):
    mandrill_client = mandrill.Mandrill(MASS_MANDRILL_API_KEY)
    receiver_first_name = receiver_name.split(" ")[0].title()
    subject = receiver_first_name + ", 3k+ Cal students use uGuru. Here's $10 to try it."

    to_emails = []
    to_emails.append({
        'email':receiver_email,
        'name': receiver_name,
        'type': 'to'
    })


    message = {
        'html':mandrill_campaign_two_html(receiver_name, receiver_email, [tag_arr], tag_arr),
        'subject': subject,
        'from_email': 'jen@uguru.me',
        'from_name': 'Jen from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'support@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':[tag_arr]
    }

    result = mandrill_client.messages.send(message=message)


def mailgun_campaign_eight_html(receiver_name, receiver_email, tag_arr, campaign_str):
    return"""
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Actionable emails e.g. reset password</title>

    <link href='http://fonts.googleapis.com/css?family=Grand+Hotel' rel='stylesheet' type='text/css'>

    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      h1 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h4 {
        font-weight: 600 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        width: 100% !important;
      }
      .content {
        padding: 10px !important;
      }
      .content-wrapper {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    </style>
    </head>

    <body style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0; padding: 0;">

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0; padding: 0;">
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; padding: 0; border: 1px solid #e9e9e9;">
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <td class="content-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Hi """ + receiver_name.split(" ")[0].title() + """,
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            <a href='"""+generate_one_click_signup_email_url(receiver_name, receiver_email, campaign_str)+"""' class="btn-primary" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 18px; color: #fff; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #2CAEE1; margin: 0; padding: 0; border-color: #2CAEE1; border-style: solid; border-width: 10px 20px;">&nbsp;&nbsp;Get it now&nbsp;&nbsp;</a>
                                        </td>
                                    </tr>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                        <td class="content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                            Good luck with everything!<br>
                                            Samir
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                            <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"> <br> """+unsubscribe_str_html_bare(receiver_email, [tag_arr], campaign_str)+"""</td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top"></td>
        </tr>
    </table>

    </body>
    </html>"""