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
    email_subject = "Our Gurus Are Ready to Help Anytime!"
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
    email_subject = "You Are Now a Guru!"
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

def student_needs_help(student, tutors, course_name, request):
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    user_first_name = student.name.split(" ")[0]
    text = student_needs_help_text(user_first_name, course_name, request)
    html = student_needs_help_html(user_first_name, course_name, request)
    to_emails = []
    tutor_emails_dict = {}

    for tutor in tutors:
        if tutor.email_notification:
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
    from app.static.data.prices import prices_dict
    tutor_rate = prices_dict[request.student_estimated_hour]
    return """<b>
    """ + student_name + """ needs help with """ + class_name + """.</b> Here's some info:
    <br>
    <br>
    Availability: """ + request.available_time + """<br>
    Preferred Location: """ + request.location+ """<br>
    Time Estimate: """ + str(request.time_estimate) + """ hours<br>
    # of Students: """ + str(request.num_students) + """<br>
    You can make: $""" + str(request.time_estimate*tutor_rate) +""" ($"""+str(tutor_rate) +"""/hr)<br>
    (You can also propose a different price!)
    <br>
    <br>
    <a href="http://beta.uguru.me"> Log in </a> to accept """ + student_name + """'s request on your feed page, or offer a different price.
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
    from app.static.data.prices import prices_dict
    tutor_rate = prices_dict[request.student_estimated_hour]
    return student_name + """ needs help with """ + class_name + """. Here's some info: \n\n""" + \
    """Availability: """ + request.available_time + """\n""" +\
    """Preferred Location: """ + request.location+ """\n""" + \
    """Time Estimate: """ + str(request.time_estimate) + """ hours\n""" +\
    """# of Students: """ + str(request.num_students) + """\n\n""" +\
    """You can make: $""" + str(request.time_estimate * tutor_rate) + """ ($"""+ str(tutor_rate) +"""/hr)\n""" + \
    """(You can also propose a different price!)\n""" +\
    """Login at http://uguru.me to see more details. You can either accept the request on the feed page, or offer a different price.\n\n""" +\
    """Tip: take 3 minutes to update your profile so students feel more comfortable picking you as their Guru.\n\n"""+\
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
    """Login to http://uguru.me to see""" + tutor_name + """'s profile and accept the offer, or if you're not in a rush, wait for a couple more Gurus to accept and choose the one you like best\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_wants_to_help_html(tutor_name, course_name):
    return """
    """ + tutor_name + """ accepted your request for """ + course_name + """.
    <br>
    <br>
    <a href="http://uguru.me">Log in</a> to see """ + tutor_name + """'s profile and accept the offer, or wait for more Gurus to accept!
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
    return """Don't keep """ + sender_name + " waiting! Login to Uguru.me and message " + sender_name + " now at http://uguru.me/messages/ ."
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def send_message_alert_html(receiver_name, sender_name):
    return """Don't keep """ + sender_name + """ waiting!
    <br>
    <br>
    Login to <a href="http://uguru.me"> Uguru </a> and reply to """ + sender_name + """ now through our <a href="http://uguru.me/messages">messages</a>.     
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

def student_payment_receipt(user, tutor_name, amount, payment, charge_id, skill_name, recurring):
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
    from app.static.data.prices import prices_dict
    prices_reversed_dict = {v:k for k, v in prices_dict.items()}
    hourly_price = prices_reversed_dict[payment.tutor_rate]
    hours = payment.time_amount
    date = payment.time_created.strftime("%B %d, %Y at %I:%M%p")

    if recurring:
        hourly_price = payment.tutor_rate

    text = student_payment_receipt_text(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount)
    html = student_payment_receipt_html(date, charge_id, card_last4, tutor_name, hourly_price, hours, amount)
    
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

    text = tutor_payment_receipt_text(date, charge_id, student_name, hourly_price, hours, amount, student_name)
    html = tutor_payment_receipt_html(date, charge_id, student_name, hourly_price, hours, amount, student_name)
    
    part1 = MIMEText(text, 'plain', 'utf-8')
    part2 = MIMEText(html, 'html', 'utf-8')

    msg.attach(part1)
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
    <i>Your balance is being transferred to your account by <a href="http://stripe.com"> Stripe</a>, a secure third-party payment platform</i>
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
    return """For your next session with """ + tutor_name + """, you won't need to submit a request again. Just set """+\
    """ up a time, meetup, and provide your regenerated secret code for payment. Forget about cash - your code is your wallet!""" + \
    """Receipt ID: """+  charge_id +"""\n""" +\
    """Time: """+  date +"""\n""" +\
    """Card Number: ****-****-****-"""+ card_last4 +"""\n""" +\
    """Guru Name: """+ tutor_name +"""\n""" +\
    """Hourly Price: $"""+ str(hourly_price) +"""\n""" +\
    """Hours: """+ str(hours) +""" hours\n""" +\
    """Total Amount: $"""+ str(amount) +"""(Including Uguru fees)\n\n""" +\
    """Your payment is handled by Stripe, a secure third-party payment platform\n\n""" + \
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """How helpful was """ + tutor_name + """? Rate and review """ + tutor_name + """ here.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_payment_receipt_text(date, charge_id, tutor_name, hourly_price, hours, amount, student_name):
    return """For your next session with """ + student_name + """, """ + student_name + """ won't need to submit a """+ \
    """request again. Just coordinate through messaging and meet up. At the end of the session, click "REQUEST PAYMENT" on """ +\
    """your feed page, find """ + student_name + """ in the drop-down list, and input the updated secret code after confirming the """ + \
    """amount with """ + student_name + """.\n\n""" + \
    """Receipt ID: """+  charge_id +"""\n""" +\
    """Time: """+  date +"""\n""" +\
    """Student Name: """+ tutor_name +"""\n""" +\
    """Hourly Price: $"""+ str(hourly_price) +""" (Including Uguru fees)\n""" +\
    """Hours: """+ str(hours) +""" hours\n""" +\
    """Total Earned: $"""+ str(amount) +"""\n\n""" +\
    """Your payment is handled by Stripe, a secure third-party payment platform\n\n""" + \
    """If the above information is incorrect, please contact us by directly replying to this email.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_payment_receipt_html(date, charge_id, tutor_name, hourly_price, hours, amount, student_name):
    return """
    For your <b>next session with """ + student_name + """</b>, """ + student_name + """ won't need to submit a request again. 
    Just coordinate through messaging and meet up. At the end of session, click "REQUEST PAYMENT" on your feed page, find """ + \
    student_name + """ in the <b>drop-down list</b>, and input the <b>updated secret code</b> after confirming the amount with """ + student_name +""".
    <br>
    <br>
    Receipt ID: """+  charge_id +"""<br>
    Time: """+  date +"""<br>
    Student Name: """+  tutor_name +"""<br>
    Hourly Price: $""" + str(hourly_price) + """ (including Uguru fees)<br>
    Hours: """ + str(hours) + """ hours<br>
    Total Earned: $""" + str(amount) + """
    <br>
    <br>
    <i>Your payment is handled by <a href="http://stripe.com"> Stripe</a>, a secure third-party payment platform</i>
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
    return """
    For your <b>next session with """ + tutor_name + """</b>, you won't need to submit a request again. Just set up a time, meetup, and provide the regenerated code to """ + tutor_name + """" for payment."""+\
    """ Forget about cash - your code is your wallet!
    <br>
    <br>
    Receipt ID: """+  charge_id +"""<br>
    Time: """+  date +"""<br>
    Card Number: ****-****-****-"""+  card_last4 +"""<br>
    Guru Name: """+  tutor_name +"""<br>
    Hourly Price: $""" + str(hourly_price) + """<br>
    Hours: """ + str(hours) + """ hours<br>
    Total Amount: $""" + str(amount) + """(including Uguru fees)
    <br>
    <br>
    <i>Your payment is handled by <a href="http://stripe.com"> Stripe</a>, a secure third-party payment platform</i>
    <br>
    <br>
    If the above information is incorrect, please contact us by directly replying to this email.
    <br>
    <br>
    How helpful was """ + tutor_name + """? <b> Rate and review """ + tutor_name + """ <a href="http://uguru.me/activity">here</a>.</b>
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
    email_subject = student_name  + " Chose You for " + skill_name + "!"
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
    """1. Message your Guru, and finalize meetup time & location (http://uguru.me/messages).\n\n""" +\
    """2. At end of the session, your Guru will draft the bill on his/her device. Verify the bill, and give your Guru your secret code (find this at the top of your feed page) as proof of approval. You will automatically be charged for the approved amount.\n\n""" +\
    """3. Review your Guru by signing in after the tutor has billed you. \n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def student_is_matched_html(tutor_name, request_code):
    return """You have been matched with """ + tutor_name + """! Please follow these next steps:
    <br>
    <br>
    1. <a href="http://uguru.me/messages/"> Message</a> your Guru, and finalize meetup <b>time & location</b> .
    <br>
    <br>
    2. At end of the session, your Guru will draft the bill on his/her device. <b> Verify the bill</b>, and give your Guru your <b>secret code</b> (<a href="http://uguru.me/activity/">find this at the top of your feed page</a>) as proof of approval. You will automatically be charged 
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
    """1. Message your student, and finalize meetup time & location (http://uguru.me/messages).\n\n""" +\
    """2. At the end of the session, log into http://uguru.me on your device and draft a bill by clicking 
    "REQUEST PAYMENT" on your feed page.\n\n""" +\
    """3. Have your student verify the amount, and input his/her 1-time verification code as proof of approval. The amount will be added to your balance,
    and you can cash out at any time!\n\n""" +\
    """4. After payment, remind your student to rate you on their account. These reviews will help you stand out when students choose their tutors.\n\n""" +\
    """Samir\nCo-founder\nsamir@uguru.me\n(813) 500 9853"""

def tutor_is_matched_html(tutor_name):
    return """Congrats """ + tutor_name + """! Here are the next steps: 
    <br>
    <br>
    1. <a href="http://uguru.me/messages/">Message</a> your student, and finalize meetup <b>time & location</b>.
    <br>
    <br>
    2. At the end of the session, <a href="http://uguru.me/activity/"> log into Uguru </a> on your device and draft a bill by clicking 
    <b>"REQUEST PAYMENT"</b> on your feed page.
    <br>
    <br>
    3. Have your student <b>verify the amount</b>, and input his/her <b> secret code</b> as proof of approval. The amount will be added to your balance,
    and you can cash out at any time!
    <br>
    <br>
    4. After payment, remind your student to <b>rate you</b> on their account. These reviews will help you stand out when students choose their tutors.
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

def welcome_uguru_tutor_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir from Uguru. We hope to make peer-to-peer help available and affordable to students by connecting them with trusted Gurus like you! \n\n""" +\
    """Soon, you will be able to guide those lost in the dungeons of Moffit and help them achieve scholarly enlightenment. We will be sending you these requests via email. \n\n""" + \
    """We are a small team with limited resources. If you have any questions/suggestions, let us know by replying to this email directly! \n\n""" + \
    """Thank you """.encode('utf-8') + user_name.split(' ')[0] + """ for joining us! Go Bears!  \n\n""" + \
    """Samir Makhani\nCo-Founder\nsamir@uguru.me\n(813) 500 9853"""

def welcome_uguru_student_text(user_name):
    return """Hi """ + user_name.split(' ')[0] + \
    """, \n\n""" + \
    """This is Samir, from Uguru. We hope to make instant help available and affordable by connecting you to Gurus who have done well in the same classes at Cal!  \n\n""" +\
    """If you are feeling lost in the dungeons of Moffit, just send a request at http://uguru.me/activity, and our Gurus will be ready to save you! \n\n""" + \
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
    This is Samir, from <a href="http://uguru.me">Uguru</a>. We hope to make peer-to-peer help <b>available</b> and <b>affordable</b> to students by connecting them with trusted Gurus like you! 
    <br>
    <br>
    Soon, you will be able to guide those lost in the dungeons of Moffit and help them achieve scholarly enlightenment. We will be sending you these requests via email. 
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

def welcome_uguru_student_html(user_name):
    return """
    Hi """ + user_name.split(' ')[0] + """,
    <br>
    <br>
    This is Samir from <a href="http://uguru.me">Uguru</a>. We hope to make instant help <b>available</b> and <b>affordable</b> by connecting you to Gurus who have done well in the same classes at Cal.
    <br>
    <br>
    If you are feeling lost in the dungeons of Moffit, just send a request <a href="http://uguru.me/activity">here</a>, and our Gurus will be ready to save you!
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