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
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Experienced Gurus Are Ready to Help Whenever You Feel Stuck"
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
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Congrats " + user_first_name + ", you did something great! See why"
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

def student_needs_help(student, tutor, course_name, request):
    user_first_name = student.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = user_first_name + " Needs Your Help in " + course_name.upper() +"! Accept Now" 
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [tutor.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    text = student_needs_help_text(user_first_name, course_name, request)
    html = student_needs_help_html(user_first_name, course_name, request)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()


def generate_new_password(user, new_password):
    user_name = user.name.split(" ")[0]
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
    """Login to http://uguru.me with this password and change to a password of your choice under Account Settings.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def generate_new_password_html(user_name, new_password):
    return """
    Hi """ + user_name + """,
    <br>
    <br>
    Your new generated password is <b>'""" + new_password + """'</b>
    <br>
    <br>
    <a href="http://uguru.me"> Login</a> with this password on Uguru and change to a pasword of your choice under Account Settings. 
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """


def student_needs_help_html(student_name, class_name, request):
    return """<b>
    """ + student_name + """ needs help with """ + class_name + """.</b> Here's some info:
    <br>
    <br>
    Availability: """ + request.available_time + """<br>
    Preferred Location: """ + request.location+ """<br>
    Time Estimate: """ + str(request.time_estimate) + """ hours<br>
    # of Students That Need Help: """ + str(request.num_students) + """<br>
    <br>
    Sounds good so far? <a href="http://beta.uguru.me"> Log in </a> to see more details. You can either accept the request, or change the hourly price to an amount you think is fair!
    <br>
    <br>
    Tip: take 3 minutes to update your profile so students feel more comfortable picking you as their Guru.    
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_needs_help_text(student_name, class_name, request):
    return student_name + """ needs help with """ + class_name + """. Here's some info: \n\n""" + \
    """Availability: """ + request.available_time + """\n""" +\
    """Preferred Location: """ + request.location+ """\n""" + \
    """Time Estimate: """ + str(request.time_estimate) + """ hours\n""" +\
    """# of Students That Need Help: """ + str(request.num_students) + """ hours\n\n""" +\
    """Sound good so far? Login at http://uguru.me to see more details. You can either accept the request, or change the hourly price to an amount you think is fair!!\n\n""" +\
    """Tip: take 3 minutes to update your profile so students feel more comfortable picking you as their Guru.\n\n"""+\
    """Samir\nCo-founder"""

def tutor_wants_to_help(student, tutor, course_name):
    user_first_name = student.name.split(" ")[0]
    tutor_name = tutor.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "A Guru Accepted Your " + course_name +" Request! Check Now" 
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
    return tutor_name + """ needs help with """ + course_name + """. \n\n""" + \
    """Login to http://uguru.me to see""" + tutor_name + """'s profile and accept the offer, or if you're not in a rush, wait for a couple more Gurus to accept and choose the one you like best\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_wants_to_help_html(tutor_name, course_name):
    return """
    """ + tutor_name + """ accepted your request for """ + course_name + """.
    <br>
    <br>
    <a href="http://uguru.me"> Log in </a> to see """ + tutor_name + """'s profile and accept the offer, or if 
    you're not in a rush, wait for a couple more Gurus to accept and choose the one you like best!
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
    email_subject = "You Have Been Matched with " + tutor_name  + "! Now Follow These Steps"
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
    return """Don't keep """ + sender_name + " waiting! Login to Uguru.me and message " + sender_name + " now at http://uguru.me/messages/ ."
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def send_message_alert_html(receiver_name, sender_name):
    return """Don't keep """ + sender_name + """ waiting!
    <br>
    <br>
    Login to <a href="http://uguru.me"> Uguru </a> and reply to """ + sender_name + """ now through our <a href="http://uguru.me/messages">messages</a>.     
    <br>
    <br>
    If you have any questions or concerns, please reply directly to this email, or give us a phonecall! \\
    <br>
    <br>
    Samir<br>
    Co-Founder<br>
    Samir@uguru.me<br>
    (813) 500 - 9853
    """

def student_payment_receipt(user, tutor_name, amount, payment, charge_id):
    student_name = user.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Here's Your Receipt from Your Session with " + tutor_name
    DATE_FORMAT = "%d/%m/%Y"
    EMAIL_SPACE = ", "
    EMAIL_TO = [user.email]

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email_subject
    msg['To'] = EMAIL_SPACE.join(EMAIL_TO)
    msg['From'] = email_from

    card_last4 = user.customer_last4
    from app.static.data.prices import prices_dict
    prices_reversed_dict = {v:k for k, v in prices_dict.items()}
    hourly_price = prices_reversed_dict[payment.tutor_rate]
    hours = payment.time_amount

    text = student_payment_receipt_text(charge_id, card_last4, tutor_name, hourly_price, hours, amount)
    html = student_payment_receipt_html(charge_id, card_last4, tutor_name, hourly_price, hours, amount)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()

def tutor_received_transfer(user, amount, bank_name, transfer_id, last4):
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

    text = tutor_received_transfer_text(amount, bank_name, transfer_id, last4)
    html = tutor_received_transfer_html(amount, bank_name, transfer_id, last4)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)
    
    mail = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)        
    mail.starttls()
    mail.login(SMTP_USERNAME, SMTP_PASSWORD)
    mail.sendmail(msg['From'], EMAIL_TO, msg.as_string())
    mail.quit()    

def tutor_received_transfer_html(amount, bank_name, transfer_id, last4):
    return """
    <br>
    Receipt ID: """+  transfer_id +"""<br>
    Bank Name: """+  bank_name +"""<br>
    Account Number: ****-****-****-"""+  str(last4) +"""<br>
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

def tutor_received_transfer_text(amount, bank_name, transfer_id, last4):
    return """\n:""" + \
    """Receipt ID: """+  transfer_id +"""\n""" +\
    """Bank Name: """+  bank_name +"""\n""" +\
    """Account Number: ****-****-****-"""+ str(last4) +"""\n""" +\
    """Total Amount: $"""+ str(amount) +"""\n\n""" +\
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_payment_receipt_text(charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    return """\n:""" + \
    """Receipt ID: """+  charge_id +"""\n""" +\
    """Card Number: ****-****-****-"""+ card_last4 +"""\n""" +\
    """Guru Name: """+ tutor_name +"""\n""" +\
    """Hourly Price: $"""+ str(hourly_price) +""" (Including Uguru fees)\n""" +\
    """Hours: """+ str(hours) +""" hours\n""" +\
    """Total Amount: $"""+ str(amount) +"""\n\n""" +\
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_payment_receipt_html(charge_id, card_last4, tutor_name, hourly_price, hours, amount):
    return """
    <br>
    Receipt ID: """+  charge_id +"""<br>
    Card Number: ****-****-****-"""+  card_last4 +"""<br>
    Guru Name: """+  tutor_name +"""<br>
    Hourly Price: $""" + str(hourly_price) + """ (including Uguru fees)<br>
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

def tutor_is_matched(student, tutor):
    student_name = student.name.split(" ")[0]
    tutor_name = tutor.name.split(" ")[0]
    email_from = "Samir from Uguru <samir@uguru.me>"
    email_subject = "Congrats! " + student_name  + " Chose You! Now Follow These Steps"
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
    return """We have made it super easy for you! Here are the steps:\n\n:""" + \
    """1. Coordinate with your Guru, and finalize meetup time & location through our messages (http://uguru.me/messages).\n\n""" +\
    """2. At end of the session, your Guru will draft the bill on his device. Verify the bill, and give your Guru your code as proof of approval. You will automatically be charged for the approved amount. Forget about cash, your code is your wallet!\n\n""" +\
    """3. 3. Rate and review your Guru, and you are all done!\n\n""" +\
    """Please bring(or remember) your 1-time verification code for this session:""" + request_code + """""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_is_matched_html(tutor_name, request_code):
    return """We have made it super easy for you! Here are the steps:
    <br>
    <br>
    1. Coordinate with your student, and finalize meetup time & location through our <a href="http://uguru.me/messages/"> messages</a>.
    <br>
    <br>
    2. At end of the session, your Guru will draft the bill on his device. Verify the bill, and give your Guru your code as proof of approval. You will automatically be charged 
    for the approved amount. Forget about cash, your code is your wallet!
    <br>
    <br>
    3. Rate and review your Guru, and you are all done!
    <br>
    <br>
    <b> Please bring(or remember) your 1-time verification code for this session:</b> '<span style="color:red;font-weight:bold">""" + request_code + """</span>'
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


def tutor_is_matched_text(tutor_name):
    return """Congrats """ + tutor_name + """! Here are the next steps\n\n:""" + \
    """1. Coordinate with your student, and finalize meetup time & location through our messages (http://uguru.me/messages).\n\n""" +\
    """2. At the end of the session, you draft a bill clicking "Request Payment" on your feed page. You should bring a laptop or smart phone that
    can access the web to your session.\n\n""" +\
    """3. Have your student verify the amount, and input his/her 1-time verification code as proof of approval. The amount will be added to your balance,
    and you can cash out at any time!\n\n""" +\
    """4. Important: Remind your student to rate you after the session. The student can do this by logging in after the payment has been submitted. These ratings will help you promote yourself to other students!\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_is_matched_html(tutor_name):
    return """Congrats """ + tutor_name + """! Here are the next steps: 
    <br>
    <br>
    1. Coordinate with your student, and finalize meetup time & location through our <a href="http://uguru.me/messages/"> messages</a>.
    <br>
    <br>
    2. At the end of the session, you draft a bill clicking "Request Payment" on your feed page. You should bring a laptop or smart phone that
    can access the web to your session.
    <br>
    <br>
    3. Have your student verify the amount, and input his/her 1-time verification code as proof of approval. The amount will be added to your balance,
    and you can cash out at any time!
    <br>
    <br>
    4. <b>Important</b>: Remind your student to rate you after the session. The student can do this by logging in after the payment has been submitted. These ratings will help you promote yourself to other students!
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


def student_canceled_request(student, course_name, tutor):
    email_subject = "We're sorry!"
    msg_contents = student.name.split(" ")[0] + "'s request for " + course_name.upper() + \
        " is no longer valid."
    general_notification_email(tutor, msg_contents, email_subject)

def student_chose_another_tutor(student, course, tutor):
    email_subject = "We're sorry!"
    msg_contents = student.name.split(" ")[0] + " chose another " + course.upper() + \
        " tutor."
    general_notification_email(tutor, msg_contents, email_subject)

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
    """This is Samir, Co-Founder at Uguru. First of all, congrats, you made it! Our Guru selection process is competitive only to make sure that you can provide infinite wisdom and sage advice to our students.\n\n""" +\
    """My partner Michael and I both recently graduated from Cal. We couldn't help but notice many of our classmates wishing for a way to get help during times of great academic struggle. We knew that there had to be a better way to achieve success in Bear Territory. \n\n""" + \
    """Enter Uguru, where we hope to make grade-saving help available and affordable to students by connecting them to our trusted Gurus like you! Soon, you will be able to guide those lost in the dungeons of Moffit and help them achieve scholarly enlightenment. We will be sending you these requests via email. \n\n""" + \
    """As a small team slowly gathering our resources, we are trying our best to make using Uguru a seamless experience. If you encounter any pesky hiccups or bugs, or if you have any questions/suggestions, please let me know by replying directly to this email. \n\n""" + \
    """Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears!  \n\n""" + \
    """Samir Makhani\nCo-Founder\nsamir@uguru.me\n(813) 500 9853"""

def welcome_uguru_student_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir, Co-Founder at Uguru. My partner Michael and I both recently graduated from Cal. When we were in school, we saw many of our friends struggle in courses because they couldn't find the help they needed in this competitive Bear Territory. \n\n""" +\
    """With Uguru, we hope to make it available and affordable to everyone by connecting them with awesome Gurus that we hand-picked from a pool of experienced peer tutors. If you are feeling stuck, just send a request here, and they will be ready to help! \n\n""" + \
    """As a small team slowly gathering our resources, we are trying our best to make using Uguru a seamless experience. If you encounter any pesky hiccups or bugs, or if you have any questions/suggestions, please let me know by replying directly to this email. \n\n""" + \
    """Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears!  \n\n""" + \
    """Samir Makhani\nCo-Founder\nsamir@uguru.me\n(813) 500 9853"""

def general_notification_text(user_name, msg):
    print msg, user_name
    return"""
    Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + msg + \
    """\n\n""" + \
    """See more details by visiting the link below:\n""" + \
    """http://uguru.me/activity\n\n""" + \
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
    This is Samir, Co-Founder at <a href="http://uguru.me">Uguru</a>. First of all, congrats, you made it! Our Guru selection process 
    is competitive only to make sure that you can provide infinite wisdom and sage advice to our students.
    <br>
    <br>
    My partner Michael and I both recently graduated from Cal. We couldn't help but notice many of our classmates wishing for a way to get help during times of great 
    academic struggle. We knew that there had to be a better way to achieve success in Bear Territory.
    <br>
    <br>
    Enter Uguru, where we hope to make grade-saving help available and affordable to students by connecting them to our trusted Gurus like you! Soon, you will be able to 
    guide those lost in the dungeons of Moffit and help them achieve scholarly enlightenment. We will be sending you these requests via email.
    <br>
    <br>    
    As a small team slowly gathering our resources, we are trying our best to make using Uguru a seamless experience. If you encounter any pesky hiccups or bugs, or if you 
    have any questions/suggestions, please let me know by replying directly to this email.
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

def welcome_uguru_student_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>
    This is Samir, Co-Founder at <a href="http://uguru.me">Uguru</a>.  My partner Michael and I both recently graduated from Cal. When we were in school, we saw many of our 
    friends struggle in courses because they couldn't find the help they needed in this competitive Bear Territory. 
    <br>
    <br>
    With Uguru, we hope to make it available and affordable to everyone by connecting them with awesome Gurus that we hand-picked from a pool of experienced peer tutors. 
    If you are feeling stuck, just send a request here, and they will be ready to help!    
    <br>
    <br>    
    As a small team slowly gathering our resources, we are trying our best to make using Uguru a seamless experience. If you encounter any pesky hiccups or bugs, or if you 
    have any questions/suggestions, please let me know by replying directly to this email.
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

def error(message):

    EMAIL_TO = ["makhani.samir@gmail.com"]

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