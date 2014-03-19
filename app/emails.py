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

def welcome_uguru_student(user):
    user_first_name = user.name.split(" ")[0]
    email_from = "uGuru.me <support@uguru.me>"
    email_subject = "[uGuru.me] Sign Up Confirmation"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "

    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    text = welcome_uguru_student_text(user_first_name)
    html = welcome_uguru_student_html(user_first_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def welcome_uguru_tutor(user):
    user_first_name = user.name.split(" ")[0]
    email_from = "uGuru.me <support@uguru.me>"
    email_subject = "[uGuru.me] Sign Up Confirmation"
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "

    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from
    text = welcome_uguru_tutor_text(user_first_name)
    html = welcome_uguru_tutor_html(user_first_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

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

def student_needs_help(user, course_name, course_urgency):
    email_subject = "A Student Needs Help in " + course_name.upper()
    msg_contents = "A student needs help in " + course_name.upper() + " " + course_urgency + """."""
    general_notification_email(user, msg_contents, email_subject)

def tutor_wants_to_help(user, course_name):
    email_subject = "A Tutor Wants to Help in " + course_name.upper()
    msg_contents = "A tutor wants to help in " + course_name.upper() + "."
    general_notification_email(user, msg_contents, email_subject)

def tutor_is_matched(user, course_name, student_name):
    email_subject = "Congrats! You've been matched with " + student_name
    msg_contents = """Start messaging """ + student_name + """ and set up a time to meet now.<br><br>""" + \
                   """Once you've met the student, don't forget to send the bill to the student
                    so you can immediately get paid and receive your first rating. <br><br>
                    If your first rating is good, we'll increase the max price you can advertise yourself ;) """
    general_notification_email(user, msg_contents, email_subject)


def student_payment_request(user, tutor_name, amount):
    email_subject = tutor_name + " has billed you "
    msg_contents = tutor_name + " has billed you for your recent tutoring session."
    general_notification_email(user, msg_contents, email_subject)

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

def welcome_uguru_tutor_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """Welcome onboard as an exclusive beta guru at uGuru.me! Very shortly, we will start connecting you with students who need your help and expertise, and notify you when we such an opportunity presents itself.  \n\n""" +\
    """Our site is currently in beta, so our sincerely apologies for any unexpected hiccups. \n\n""" + \
    """If you have any questions, concerns, or suggestions please do not hesitate to reach out to us directly by replying to this email. Your feedback is critical in making this product a meaningful service that can benefit the UC Berkeley as a whole. \n\n""" + \
    """Sincerely, \nThe uGuru.me Team"""

def welcome_uguru_student_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """Welcome onboard as an exclusive beta user at uGuru.me! Very shortly, we will start connecting you with experienced Berkeley tutors, and notify you when we such an opportunity presents itself. \n\n""" +\
    """Our site is currently in beta, so our sincerely apologies for any unexpected hiccups. \n\n""" + \
    """If you have any questions, concerns, or suggestions please do not hesitate to reach out to us directly by replying to this email. Your feedback is critical in making this product a meaningful service that can benefit the UC Berkeley as a whole. \n\n""" + \
    """Sincerely, \nThe uGuru.me Team"""

def general_notification_text(user_name, msg):
    print msg, user_name
    return"""
    Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + msg + \
    """\n\n""" + \
    """See more details by visiting the link below:\n""" + \
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
    student_name + """ is a Cal student that needs help in """ + skill_name + " " + urgency + ". " + \
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
    Welcome onboard as an exclusive beta guru at uGuru.me! Very shortly, we will start connecting you 
    with students who need your help and expertise, and notify you when we such an opportunity presents itself. 
    <br>
    <br>
    Our site is currently in beta, so our sincerely apologies for any unexpected hiccups. 
    <br>
    <br>
    If you have any questions, concerns, or suggestions <i>please</i> do not hesitate to reach out to us directly by 
    replying to this email. Your feedback is critical in making this product a meaningful service that can 
    benefit the UC Berkeley as a whole.
    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """

def welcome_uguru_student_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>
    Welcome onboard as an exclusive beta user at uGuru.me! Very shortly, we will start connecting you 
    with Cal tutors that can immediately help, and notify you when we such an opportunity presents itself. 
    <br>
    <br>
    Our site is currently in beta, so our sincerely apologies for any unexpected hiccups. 
    <br>
    <br>
    If you have any questions, concerns, or suggestions <i>please</i> do not hesitate to reach out to us directly by 
    replying to this email. Your feedback is critical in making this product a meaningful service that can 
    benefit the UC Berkeley as a whole.
    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """


def general_notification_html(user_name, msg):
    return """
    Hi """ + user_name + """,
    <br>
    <br> """ + msg + """ 
    <br>
    <br>
    See more details <a href="https://beta.uguru.me/activity/"> here</a>. 
    <br>
    <br>
    Sincerely, <br>
    The uGuru.me Team
    """
