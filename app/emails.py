import os
import smtplib
import mandrill
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from app import app
from models import *

SMTP_SERVER = "smtp.mandrillapp.com"
SMTP_PORT = 587
SMTP_USERNAME = os.environ['MANDRILL_USERNAME']
SMTP_PASSWORD = os.environ['MANDRILL_PASSWORD']
MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)


def send_student_packages_email(user, tutor_name, skill_name):
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

#Sent to students when they sign up for the first time
def welcome_uguru_student(user):
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

def welcome_uguru_student_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir, from Uguru. We hope to make instant help available and affordable by connecting you to Gurus who have done well in the same classes at Cal!  \n\n""" +\
    """This finals season, you won't have to fight the battle alone. If you feel lost in the dungeons of Moffit, just request help here(at http://berkeley.uguru.me/activity), and the Gurus will be ready to rescue you! \n\n""" + \
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

#Sent to tutors when they sign up for the first time
def welcome_uguru_tutor(user):
    user_first_name = user.name.split(" ")[0]
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

#Sent to students when they cancel a request.
def student_canceled_email(user, skill_name):
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

#Daily results email sent nightly
def daily_results_email(from_email, to_email):
    from datetime import datetime
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

#Sent when the 3 Guru cap is reached.
def student_cap_reached_email(user, skill_name):
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

#Sent when parents purchase credits for their kids
def send_parent_confirmation(user, payment, amount_credits):
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

#Sent to all tutors when a student has a request
def student_needs_help(student, tutors, course_name, request):
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

#Generates new password email
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

#Sent to students when a tutor is available.
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


#Sent to a student when they are matched.
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


#Sent to a student/tutor if receiver hasn't replied in the past 15m
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
    logging.info("sent message alert sent to " + receiver_name)

def send_message_alert_text(receiver_name, sender_name):
    return """Don't keep """ + sender_name + " waiting! Login to Uguru.me and message " + sender_name + " now at http://berkeley.uguru.me/messages/ ."
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

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

#Send confirmation to student that they need to confirm the payment
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

#Send details to student regarding the payment
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

#Send details to tutor regarding the payment
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

#TODO, make this functioning & then send this to them!
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

#When a tutor is matched.
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

#############
# All TEXTS #
#############
def send_message_text(sender):
    name = sender.name.split(" ")[0]
    msg = "You have 1 new message on uGuru. Don't keep " + name + ' waiting! www.uguru.me/messages'
    return msg

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


#Was MEANT to send an error anytime there is a production. Not anymore I guess.
def error(message):

    EMAIL_TO = ["makhani.samir@gmail.com", "bkamita@gmail.com"]
    logging.info(message)

    if os.environ.get('TESTING'):
        EMAIL_FROM = "TESTING Error <sandbox_error@uguru.me>"
        EMAIL_SUBJECT = "[Uguru Sandbox Error] Exception"
    elif os.environ.get('PRODUCTION'):
        EMAIL_FROM = "PRODUCTION Error <site_error@uguru.me>"
        EMAIL_SUBJECT = "[Uguru PRODUCTION Error] Exception"
    else: #local machine
        logging.info(message)
        return 


    DATE_FORMAT = "%d/%m/%Y" # TODO : assigned but unused
    EMAIL_SPACE = ", "
    DATA='This is the content of the email.' # TODO : assigned but unused

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


#Save on packages old template.
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

def send_mandrill_purchase_package_promotion(receiver_name, receiver_email, skill_name, tutor_name):
    receiver_first_name = receiver_name.split(" ")[0].title() # TODO : assigned but unused
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

    result = mandrill_client.messages.send(message=message) # TODO : assigned but unused, righ-hand side important though
