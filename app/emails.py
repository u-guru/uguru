import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from app import app
from app.models import Skill, User, Request
from models import User

SMTP_SERVER = "smtp.mandrillapp.com"
SMTP_PORT = 587

SMTP_USERNAME = os.environ['MANDRILL_USERNAME']
SMTP_PASSWORD = os.environ['MANDRILL_PASSWORD']

HOURLY_RATE = 0

def send_request_to_tutors(request):
    #Start mail server    

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
            student_name, tutor_name, student_description)
        html = send_request_to_tutors_html(skill_name, urgency, time_estimate, 
            student_name, tutor_name, student_description)
        part1 = MIMEText(text, 'plain', 'utf-8')
        part2 = MIMEText(html, 'html', 'utf-8')

        msg.attach(part1)
        msg.attach(part2)
        
        mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
        mail.starttls()
        mail.login(SMTP_USERNAME, SMTP_PASSWORD)
        mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
        mail.quit()
        
        print "Mail sent"

def send_request_to_tutors_html(skill_name, urgency, time_estimate, 
    student_name, tutor_name, student_description):
    return """
    Hey """ + tutor_name + """! 
    <br> 
    <br>""" + \
    student_name + """ needs help in """ + skill_name + " " + urgency + ". " + \
    student_name + """ estimates that it will take <b>""" + str(int(time_estimate)) + \
    """ hours</b>. Here is some extra information that """ + student_name + """ has asked
    us to forward on to you: 
    <br>
    <br><i>
    '""" + \
    student_description + """'</i><br><br>
    Based on your tutoring experience at uGuru.me so far, you will be earning 
    the following for this job at $7 an hour:<br>
    <h2><center>$""" +str(int(time_estimate * 7.0)) + """</center></h2>
    By clicking accept below, you have choosen to continue on with this process. <br><br>""" +\
    """<button><center> Accept </center></button><br><br>""" + \
    student_name + """ will be notified with your background (your average rating and 
    number of tutor encounters with uGuru.me), and will be given the option to accept or
    reject. <br><br>If """ + student_name + """ chooses to accept, an automated email will be sent from uGuru.me
    <br>
    <br>
    Sincerely, <br>
    The Uguru Team <br>
    """
    
def send_request_to_tutors_text(skill_name, urgency, time_estimate, 
    student_name, tutor_name, student_description):
    return """Hey """ + tutor_name + """!\n""" + \
    student_name + """ needs help in """ + skill_name + " " + urgency + ". " + \
    student_name + """ estimates that it will take """ + str(int(time_estimate)) + \
    """ hours.""" + """\nHere is some extra information that """ + student_name + \
    """has asked us to forward on to you: \n\n""" 
    +"""'"""+ student_description + """'\n\n
    'Based on your tutoring experience at uGuru.me so far, you will be earning 
    the following for this job at $7 an hour:'\n
    """ +str(int(time_estimate * 7.0)) + """
    By clicking accept below, you have choosen to continue on with this process.""" +\
    student_name + """ will be notified with your background (your average rating and 
    number of tutor encounters with uGuru.me), and will be given the option to accept or
    reject. If """ + student_name + """ chooses to accept, an automated email will be sent from uGuru.me.\n
    https://uguru.me/accept/request/1 \n
    Sincerely,
    The Uguru Team\n"""
