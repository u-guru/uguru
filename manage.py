import sys, os
from app.database import *
from app.models import *
from hashlib import md5
from app import emails
from app import app
from mixpanel import Mixpanel
import mandrill

SMTP_USERNAME = os.environ['MANDRILL_USERNAME']
SMTP_PASSWORD = os.environ['MANDRILL_PASSWORD']
MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']

arg = sys.argv[1]

def initialize_skill():
    skill = Skill(u'CS10')
    db_session.add(skill)
    db_session.commit()

if arg == 'create_db':
    init_db()
    # initialize_skill()
    print "db initialized"

if arg == 'set_profile_default':
    for user in User.query.all():
        if not user.profile_url:
            user.profile_url = '/static/img/default-photo.jpg'
    db_session.commit()
    print "complete"

if arg =='send_mailgun_1':
    from app.emails import mailgun_template_one
    mailgun_template_one(sys.argv[2], sys.argv[3])

if arg =='mp-create-student-profiles':
    import os
    mp = Mixpanel(os.environ['MP-TOKEN'])
    for u in User.query.all():
        if not u.skills and not u.verified_tutor and u.name:
            print u
            mp.people_set(str(u.id), {
                'name': u.name,
                'email': u.email,
                })

if arg == 'send_mailgun':
    from app.emails import one_click_signup_email
    one_click_signup_email(sys.argv[2], sys.argv[3])

if arg == 'send_mailgun_one':
    from app.emails import mailgun_campaign_one
    mailgun_campaign_one(sys.argv[2], sys.argv[3], sys.argv[4])

if arg == 'send_mailgun_two':
    from app.emails import mailgun_campaign_two
    mailgun_campaign_two(sys.argv[2], sys.argv[3], sys.argv[4])

if arg == 'send_mailgun_three':
    from app.emails import mailgun_campaign_three
    mailgun_campaign_three(sys.argv[2], sys.argv[3], sys.argv[4])

if arg == 'send_campaign_one':
    from app.static.data.fa14_batch.batch_1 import emails
    sent_count = 0
    avoided_count = 0
    for key in emails.keys():
        receiver_name = key.title()
        receiver_email = emails[key]
        from app.models import User
        user = User.query.filter_by(email=receiver_email).first()

        if not user:
            from app.emails import mailgun_campaign_one
            mailgun_campaign_one(receiver_name, receiver_email, 'nar_text_1_100')
            print receiver_name, receiver_email, 'has been sent an email'
            sent_count += 1
        else:
            print receiver_name, receiver_email, 'already has an account'
            avoided_count += 1
    print "Sent:", sent_count, "Accounts already made:", avoided_count

if arg == 'send_campaign_two':
    from app.static.data.fa14_batch.batch_1 import batch_2_emails
    sent_count = 0
    avoided_count = 0
    for key in batch_2_emails.keys():
        receiver_name = key.title()
        receiver_email = batch_2_emails[key]
        from app.models import User
        user = User.query.filter_by(email=receiver_email).first()

        if not user:
            from app.emails import mailgun_campaign_two
            mailgun_campaign_two(receiver_name, receiver_email, 'chloe_1_100_text')
            print receiver_name, receiver_email, 'has been sent an email'
            sent_count += 1
        else:
            print receiver_name, receiver_email, 'already has an account'
            avoided_count += 1
    print "Sent:", sent_count, "Accounts already made:", avoided_count

if arg == 'send_campaign_three':
    from app.static.data.fa14_batch.batch_1 import batch_3_emails
    sent_count = 0
    avoided_count = 0
    for key in batch_3_emails.keys():
        receiver_name = key.title()
        receiver_email = batch_3_emails[key]
        from app.models import User
        user = User.query.filter_by(email=receiver_email).first()

        if not user:
            from app.emails import mailgun_campaign_three
            mailgun_campaign_three(receiver_name, receiver_email, 'chloe_2_1_100_text')
            print receiver_name, receiver_email, 'has been sent an email'
            sent_count += 1
        else:
            print receiver_name, receiver_email, 'already has an account'
            avoided_count += 1
    print "Sent:", sent_count, "Accounts already made:", avoided_count

if arg == 'initialize_user_codes':

    unique_codes = []

    for u in User.query.all():
        if not u.user_referral_code and u.name and len(u.name.split(" ")) > 1 and u.name.split(" ")[0] and len(u.name.split(" ")[1]) > 0:
            init_string = u.name.split(" ")[0] + u.name.split(" ")[1][0]
            if init_string not in unique_codes:
                u.user_referral_code = init_string
                unique_codes.append(init_string)
            else:
                u.user_referral_code = init_string + str(u.id)
                unique_codes.append(init_string + str(u.id))
            print u.id, u.user_referral_code, "initialized"

    db_session.commit()

def send_free_5_email():
    return """
    Hey *|FNAME|*,
    <br>
    <br>
    We've just added $5 to your <a href='http://uguru.me'> uGuru </a> account for signing up at Caltopia!
    <br>
    <br>
    If you're ever struggling in a class at Cal, just <a href='http://uguru.me/login/'> log in </a> and get help from another
    student. At around $15/hr you can keep your wallet happy while preventing your GPA from suffering. Best of all, there are many new Gurus who will help you for FREE.
    <br>
    <br>
    Also, if you are looking for a part-time intership this fall, check out uGuru's <a href='uguru.me/apply'> Campus Ambassador Program</a>. It only takes 1 minute to apply, and can be a lot of fun!
    <br>
    <br>
    Start your semester strong, and don't let your GPA slide!
    <br>
    <br>
    Cheers,
    <br>
    Samir from uGuru
    """

if arg == 'send_free_5':
    for user in User.query.all():
        if user.id > 1219 and user.id < 1650:
            if user.credit == 0:
                user.credit = 5
                db_session.commit()
            user_name = user.name
            user_email = user.email
            mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            html = send_free_5_email()
            to_emails = []
            to_emails.append({
                'email':user_email,
                'name': user_name,
                'type': 'to'
            })

            print user.id, user.name, user.email, user.credit, 'email has sent'

            message = {
                'html':html,
                'subject': '*|FNAME|*, Your $5 from uGuru is Here! + Internship Opportunity',
                'from_email': 'samir@uguru.me',
                'from_name': 'Samir from uGuru',
                'to': to_emails,
                'headers': {'Reply-To': "samir@uguru.me"},
                'important': True,
                'merge_vars': [{
                'rcpt':user.email,
                'vars': [
                        {
                            'name':"fname",
                            'content':user.name.split(' ')[0].title()
                        }
                    ]
                }],
                'track_opens': True,
                'track_clicks': True,
                'preserve_recipients':False,
                'tags':['uguru-free-5']
            }

            result = mandrill_client.messages.send(message=message)

def send_growth_dev_html():
    return """
    Hey *|FNAME|*!
    <br>
    <br>
    We wanted to let you know that we are currently looking for student applicants for our Campus Ambassador Internship. 
    <br>
    <br>
    As a uGuru intern, you can conveniently work on campus while gaining valuable experience with a fast-growing <a href='http://500.co'>500 Startups</a> funded company. Commitments are flexible around your schedule, and are estimated to be 5+ hours per week. This internship will provide valuable experience to enhance your resume for future employers. 
    <br>
    <br>
    If you haven't already, take two minutes to check out the job description and apply <a href='http://uguru.me/apply/'>here</a>.
    <br>
    <br>
    Due to an unexpectedly high amount of interest, we've decided to increase the number of positions available and extend our deadline to <b>TONIGHT at 11:59pm</b>. 
    <br>
    <br>
    Looking forward to work with you! 
    <br>
    <br>
    Cheers,
    <br>
    Samir from uGuru
    """


if arg == 'growth-dev-internship':
    for user in User.query.all():
        if user.id > 1219 and user.id < 1650:
            user_name = user.name
            user_email = user.email
            mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            html = send_growth_dev_html()
            to_emails = []
            to_emails.append({
                'email':user_email,
                'name': user_name,
                'type': 'to'
            })

            message = {
                'html':html,
                'subject': '[Apply Tonight] uGuru Internship Opportunity',
                'from_email': 'samir@uguru.me',
                'from_name': 'Samir from uGuru',
                'to': to_emails,
                'headers': {'Reply-To': "samir@uguru.me"},
                'important': True,
                'merge_vars': [{
                'rcpt':user.email,
                'vars': [
                        {
                            'name':"fname",
                            'content': user.name.split(' ')[0].title()
                        }
                    ]
                }],
                'track_opens': True,
                'track_clicks': True,
                'preserve_recipients':False,
                'tags':['growth-dev-internship']
            }

            result = mandrill_client.messages.send(message=message)
            print user.id, user.name, user.email, 'email has sent'

def email_old_students():
    return """
    Hey *|FNAME|*,
    <br>
    <br>
    Hope you had a blast this summer! Now are you ready to ace this fall semester!?
    <br>
    <br>
    While you were away this summer, we've been making some improvements to uGuru that we're really excited to share:
    <br>
    <br>
    <b> 1. No More Annoying Connection Fees! </b>
    <br>
    After much though and feedback, we decided to make uGuru <b>100% free</b> for students to use.
    <br>
    <br>
    <b> 2. More Gurus, and free Gurus </b>
    <br>
    We recruited more Gurus! To test the water, all the new Gurus offer their first lessons for free.<br>
    Take advantage of the free sessions, <a href='www.uguru.me/activity/'>get help</a> or become a Guru <a href ='berkeley.uguru.me/guru/'>here</a>.
    <br>
    <br>
    <b> 3. 100% Satisfaction Guaranteed </b>
    <br>
    In rare cases where you are not happy with your Guru, your Guru will give you a refund.
    <br>
    <br>
    <b> 4. A better way to schedule </b>
    <br>
    We built a calendar into the Guru requerst form, so Gurus only connect with you if they can make your schedule. 
    <br>
    <br>
    <b> 5. Texting </b>
    <br>
    We text both you and your Gurus to make finding help even quicker!
    <br>
    <br>
    Your opinion counts! Anytime you feel like the platform can be better or something isn't working, do not hesitate to email me at samir@uguru.me or text 813-500-9853. We reply quickly and are available around the clock for support. 
    <br>
    <br>
    Remember to <a href='berkeley.uguru.me/settings/#prof'>update your profile and add classes from last semester!
    <br>
    <br>
    Cheers,
    <br>
    Samir from uGuru
    """


if arg == 'new_email_old_students':
    already_sent = [15, 283, 307, 334, 925, 357, 277, 282, 274]
    for user in User.query.all():
        if not user.skills or user.incoming_requests_from_tutors:
            if user.name and user.id not in already_sent:
                user_name = user.name
                user_email = user.email
                mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
                html = email_old_students()
                to_emails = []
                to_emails.append({
                    'email':user_email,
                    'name': user_name,
                    'type': 'to'
                })

                message = {
                    'html':html,
                    'subject': '*|FNAME|*, Here Are Some Exciting Changes to uGuru',
                    'from_email': 'samir@uguru.me',
                    'from_name': 'Samir from uGuru',
                    'to': to_emails,
                    'headers': {'Reply-To': "samir@uguru.me"},
                    'important': True,
                    'merge_vars': [{
                    'rcpt':user_email,
                    'vars': [
                            {
                                'name':"fname",
                                'content':user_name.split(' ')[0].title()
                            }
                        ]
                    }],
                    'track_opens': True,
                    'track_clicks': True,
                    'preserve_recipients':False,
                    'tags':['uguru-fa14-students']
                }

                result = mandrill_client.messages.send(message=message)
                print user.id, user.name, user.email, 'email has sent'

def email_old_tutors():
    return """
    Hey *|FNAME|*,
    <br>
    <br>
    Hope you had a fantastic summer! Are you ready to help your fellow Cal bears while making money?
    <br>
    <br>
    While you were away this summer, we've been making improvements to uGuru that we're really excited to share:
    <br>
    <br>
    <b> 1. More students us uGuru! </b>
    <br>
    uGuru is spreading across campus like you wouldn't believe, which means more tutoring opportunities for you!
    <br>
    <br>
    <b> 2. You earn more now </b>
    <br>
    We now take 25% commission of your first session with a student, and only 10% each time you meet with that student again (most agencies take about 50% per session).
    <br>
    <br>
    <b> 3. A better way to schedule </b>
    <br>
    We've built an availability calendar into the Guru request form, making it easy to schedule with your students.
    <br>
    <br>
    <b> 4. Texting </b>
    <br>
    We've also built text notifications that allow you to accept requests even faster. If you happen to not want to use this feature, you can always disable it at the <a href='berkeley.uguru.me/settings/'>settings</a> page. 
    <br>
    <br>
    <b> 5. A new way you receive Guru requests </b>
    <br>
    We used to notify all Gurus of tutoring requests at the same time. To avoid competition, we now notify Gurus in order based on experience. Higher-rated Gurus and 1st-time Gurus are notified first.
    <br>
    <br>
    Your opinion counts! Please let me know how we can do better by emailing me directly at samir@uguru.me or texting 813-500-9853. 
    <br>
    <br>
    Remember to <a href='berkeley.uguru.me/settings/#prof'>update your profile and add classes</a> from last semester!
    <br>
    <br>
    Cheers,
    <br>
    Samir from uGuru
    """


if arg == 'new_email_old_gurus':
    for user in User.query.all():
        if user.skills and user.name:
            user_name = user.name
            user_email = user.email
            mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            html = email_old_tutors()
            to_emails = []
            to_emails.append({
                'email':user_email,
                'name': user_name,
                'type': 'to'
            })

            message = {
                'html':html,
                'subject': '*|FNAME|*, Here Are Some Exciting Changes For Gurus',
                'from_email': 'samir@uguru.me',
                'from_name': 'Samir from uGuru',
                'to': to_emails,
                'headers': {'Reply-To': "samir@uguru.me"},
                'important': True,
                'merge_vars': [{
                'rcpt':user_email,
                'vars': [
                        {
                            'name':"fname",
                            'content':user_name.split(' ')[0].title()
                        }
                    ]
                }],
                'track_opens': True,
                'track_clicks': True,
                'preserve_recipients':False,
                'tags':['uguru-fa14-gurus']
            }

            result = mandrill_client.messages.send(message=message)
            print user.id, user.name, user.email, 'email has sent'

def approve_old_tutors():
    return """
    Hey *|FNAME|*,
    <br>
    <br>
    Thanks for applying to become a Guru last semester. We understand it took a while to get back to you, but we've been busy making uGuru even better and wanted you to be among the first to try out the new system.
    <br>
    <br>
    We have processed your application, and you will start receiving requests for classes that you've added to your profile as being available to tutor. Be sure to update your profile if you haven't done so in a while!
    <br>
    <br>
    Just like everyone else, your first session will be free to the student. As soon as you have an average rating of 4.5 or above, you can start charging. If you get a 5 star review on your first one, you will be good to go!
    <br>
    <br>
    Anytime you experience confusion or difficulties, email samir@uguru.me or text 813-500-9853. Your feedback is extremely important and we know it will make uGuru better!
    <br>
    <br>
    Cheers,
    <br>
    Samir from uGuru
    """



if arg == 'approve_old_tutors':
    for user in User.query.all():
        if user.qualifications and not user.approved_by_admin:
            # user = User.query.get(4)
            print user.id, user.name, user.email, 'email has sent'
            user.approved_by_admin = True
            user.verified_tutor = True
            user.tutor_introduction = user.qualifications
            
            user.notifications = []

            from app.notifications import getting_started_tutor, welcome_guru
            welcome_guru_notification = welcome_guru(user)
            user.notifications.append(welcome_guru_notification)
            db_session.add(welcome_guru_notification)
            notification = getting_started_tutor(user)
            from app.emails import welcome_uguru_tutor
            welcome_uguru_tutor(user)
            user.notifications.append(notification)
            db_session.add(notification)

            db_session.commit()

            user_name = user.name
            user_email = user.email
            mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            html = approve_old_tutors()
            to_emails = []
            to_emails.append({
                'email':user_email,
                'name': user_name,
                'type': 'to'
            })

            message = {
                'html':html,
                'subject': 'Congrats *|FNAME|*, You are now a Guru!',
                'from_email': 'samir@uguru.me',
                'from_name': 'Samir from uGuru',
                'to': to_emails,
                'headers': {'Reply-To': "samir@uguru.me"},
                'important': True,
                'merge_vars': [{
                'rcpt':user.email,
                'vars': [
                        {
                            'name':"fname",
                            'content':user.name.split(' ')[0].title()
                        }
                    ]
                }],
                'track_opens': True,
                'track_clicks': True,
                'preserve_recipients':False,
                'tags':['uguru-fa13-unapproved-gurus']
            }

            result = mandrill_client.messages.send(message=message)



if arg == 'initialize':
    import os, json
    os.remove('app.db')
    init_db()
    script_dir = os.path.dirname(__file__)
    rel_path = 'app/static/data/db_courses.json'
    abs_file_path = os.path.join(script_dir, rel_path)    
    skills = json.load(open(abs_file_path))
    
    for index in range(1, len(skills) + 1):
        new_course = Course(name=skills[str(index)])
        db_session.add(new_course)
        db_session.commit()
    print 'courses created'

    #New Guru
    user = User(name='Tutor 1', email='makhani.samir@gmail.com', phone_number = '8135009853')
    user.approved_by_admin = True
    user.verified_tutor = True
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '18135009853'
    user.major = 'EECS'
    skill = Skill.query.get(6849)
    user.skills.append(skill)
    m = Mailbox(user)
    db_session.add(m)
    db_session.add(user)
    db_session.commit()

    #Tier 1 Tutor
    user = User(name='Tutor 2', email='kljasdkljakd@berkeley.edu')
    r = Rating()
    r.tutor_rating = 5
    user.tutor_ratings.append(r)
    user.approved_by_admin = True
    user.verified_tutor = True
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '10dka0d-a'
    user.major = 'EECS'
    skill = Skill.query.get(6849)
    m = Mailbox(user)
    db_session.add(m)
    user.skills.append(skill)
    db_session.add(r)
    db_session.add(user)
    db_session.commit()

    #Tier 1 Tutor
    user = User(name='Tutor 3', email='kljasdkljakd1@berkeley.edu')
    r = Rating()
    r.tutor_rating = 5
    user.approved_by_admin = True
    user.verified_tutor = True
    user.tutor_ratings.append(r)
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '110dka0d-a'
    user.major = 'EECS'
    m = Mailbox(user)
    db_session.add(m)
    skill = Skill.query.get(6849)
    user.skills.append(skill)
    db_session.add(r)
    db_session.add(user)
    db_session.commit()

    #Tier 1 Tutor
    user = User(name='Tutor 4', email='kljasdkljakd2@berkeley.edu')
    r = Rating()
    r.tutor_rating = 5
    user.tutor_ratings.append(r)
    user.approved_by_admin = True
    m = Mailbox(user)
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '220dka0d-a'
    user.major = 'EECS'
    db_session.add(m)
    user.verified_tutor = True
    skill = Skill.query.get(6849)
    user.skills.append(skill)
    db_session.add(r)
    db_session.add(user)
    db_session.commit()

    #Tier 1 Tutor
    user = User(name='Tutor 5', email='kljasd2232kljakd2@berkeley.edu')
    r = Rating()
    r.tutor_rating = 5
    user.tutor_ratings.append(r)
    user.approved_by_admin = True
    m = Mailbox(user)
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '220dka0asdjasd9d-a'
    user.major = 'EECS'
    db_session.add(m)
    user.verified_tutor = True
    skill = Skill.query.get(6849)
    user.skills.append(skill)
    db_session.add(r)
    db_session.add(user)
    db_session.commit()

    #Tier 2 Tutor
    user = User(name='Tutor 6', email='kljasdkljakd3@berkeley.edu')
    r = Rating()
    r.tutor_rating = 3
    user.tutor_ratings.append(r)
    m = Mailbox(user)
    db_session.add(m)
    user.approved_by_admin = True
    user.verified_tutor = True
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '330dka0d-a'
    user.major = 'EECS'
    skill = Skill.query.get(6849)
    user.skills.append(skill)
    db_session.add(r)
    db_session.add(user)
    db_session.commit()

    #Student One
    user = User(name='Student One', email='kljasdkl333jakd3@berkeley.edu')
    m = Mailbox(user)
    db_session.add(m)
    user.phone_number = '8135009853'
    db_session.add(user)
    db_session.commit()


def get_email_gurus_update_html():
    return """
    Hi Gurus,
    <br>
    <br>
    Hope you are enjoying your summer. We've been ramping up for the Fall 2014 semester and have some exciting updates for you.
    <br>
    <br>
    <b>
    Uguru is no faster and easier than ever before!
    </b>
    <br>
    <br>
    <div style='padding-left:20px'>
        <b>1. Revamped Website </b> <br>
        Thanks for bearing with our beta site last semester! We are thrilled to announce that we are completely rebuilding the site. The newest features are in final review, but check out what we have so far at <a href='http://uguru.me'> Uguru.me </a>.
        <br>
        <br>
        <b>2. iPhone & Android Apps </b> <span style='color:rgb(106, 168, 79); font-style:italic'>Coming Soon! </span><br>
        We want to connect our Gurus with students as fast as possible! That's why we've built an iOS/Android apps that will make scheduling so much easier. We will release the app at the start of the semester.
    </div>
    <br>
    <br>
    <b>
    We love our Gurus! Here are some ways to get more involved:
    </b>
    <br>
    <br>
    <div style='padding-left:20px'>
        <b> 1. APPLY </b><br>
        Calling rockstars! If you are passionate about Uguru's vision, apply to join our team. All our open positions are posted <a href='http://uguru.me/apply'> here </a>. If you're interested in getting involved in another way, feel free to email Katie (katie@uguru.me).
        <br>
        <br>
        <b> 2. CONNECT </b><br>
        Join the <a href='https://www.facebook.com/groups/832170350134169/' target='_blank'>Guru & Campus Rep </a> group to stay up-to-date throughout our Launch @ Cal.
        <br>
        <br>
        <b> 3. QUICK CASH </b><br>
        We are building a referral program to make marketing your Guru skills even easier! We'll release the details at Caltopia, August 24th. 
    </div>
    <br>
    <br>
    Cheers,
    <br>
    <br>
    Michael Koh
    """

if arg == 'data_to_csv':
    email = sys.argv[2]
    users = User.query.all()
    requests = Request.query.all()
    data = []
    data_first_row = ['Name', 'Email', 'Tutor?', 'Number Outgoing Requests', 'Number Conversations']
    data.append(data_first_row)
    for u in users:
        data_row = [u.name, u.email]
        user_requests = Request.query.filter_by(student_id = u.id).all()
        user_requests_len = len(user_requests)
        if u.skills and u.verified_tutor:
            data_row.append('1')
        else:
            data_row.append('0')
        data_row.append(user_requests_len)
        data_row.append(len(u.conversations))
        data.append(data_row)

    import csv
    with open('data.csv', 'wb') as fp:
        a = csv.writer(fp, delimiter=',')
        a.writerows(data)

    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    to_emails = []
    to_emails.append({
        'email':email,
        'name': 'UGURU Data Dump',
        'type': 'to'
    })

    # import json
    # with open('data.csv', 'w') as outfile:
    #   json.dump(data, outfile)
    # print data
    import base64

    with open("data.csv", "rb") as csv_file:
        encoded_string = base64.b64encode(csv_file.read())

    message = {
        'subject': "Uguru Data Dump",
        'from_email': 'yourmom@uguru.me',
        'from_name': 'Uguru Data Director',
        'to': to_emails,
        'headers': {'Reply-To': 'makhani.samir@gmail.com'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'attachments': [
                {
                    "type": "text/csv",
                    "name": "data.csv",
                    "content": encoded_string
                }
            ],
        'preserve_recipients':False,
        'tags':['uguru-data']
    }

    result = mandrill_client.messages.send(message=message)

if arg == 'email_gurus_update':
    to_emails = []
    users = User.query.all()
    for u in users:
        if u.skills and u.verified_tutor:
            to_emails.append({
                'email':u.email,
                'name': u.name,
                'type': 'to'
            })
            print "email sent to " + u.email

    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
    import base64
    with open("team.jpg", "rb") as team_photo:
        encoded_string = base64.b64encode(team_photo.read())

    message = {
        'subject': "Calling all Gurus! Updates + Opportunities",
        'from_email': 'michael@uguru.me',
        'from_name': 'Michael Koh',
        'html': get_email_gurus_update_html(),
        'to': to_emails,
        'headers': {'Reply-To': 'michael@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'attachments': [
                {
                    "type": "image/jpeg",
                    "name": "team.jpg",
                    "content": encoded_string
                }
            ],
        'preserve_recipients':False,
        'tags':['calling-all-gurus']
    }

    result = mandrill_client.messages.send(message=message)

if arg == 'update-notifications':
    for u in User.query.all():
        for n in u.notifications:
            if n.custom_tag == 'tutor-request-offer':
                r = Request.query.get(n.request_id)
                student = User.query.get(r.student_id)
                if r and not r.connected_tutor_id:
                    n.feed_message_subtitle = '<span style="color:#69bf69">This request is still <strong>available</strong>! Click here to accept now!</span>'
                elif r.connected_tutor_id and r.connected_tutor_id == student.id:
                    n.feed_message_subtitle = '<span style="color:#CD2626"> <strong>Update:</strong> The student has canceled the original request.</span>'
                elif r.connected_tutor_id and r.connected_tutor_id != u.id:
                    n.feed_message_subtitle = '<span style="color:#CD2626"><strong>Update:</strong> The student has already chose another tutor.</span>'
    db_session.commit()

if arg == 'update-rating':
    for r in Rating.query.all():
        student = User.query.get(r.student_id)
        tutor = User.query.get(r.tutor_id)
        if student:
            student.student_ratings.append(r)
        if tutor: 
            tutor.tutor_ratings.append(r)
    db_session.commit()


if arg == 'test-campaign-email':
    mass_email_3 = {'Samir Makhani':'sam1rm@berkeley.edu', 'Michael Koh':'michael60716@gmail.com'}
    # test_json = {'Samir Makhani':'sam1rm@berkeley.edu', 'Samir Makhani':'makhani.samir@gmail.com', 'Michael Koh':'michael60716@gmail.com', 'Subhav':'sub_have@berkeley.edu', 'Lee Lazar':'leelazar@berkeley.edu', 'Caleb Wang':'calebwang@berkeley.edu', 'David Liu': 'david_liu@berkeley.edu', 'Steve Wang':'ywang155@berkeley.edu', 'Jared Baker':'jaredbaker@berkeley.edu', 'Jackie Hong':'jhong924@berkeley.edu', 'Angela Lu':'angelalu@berkeley.edu'}
    from app.emails import send_get_help_email
    send_get_help_email(mass_email_3, 'mass-email-3', "*|FNAME|*, A Site That Can Help You Ace Your Finals")

if arg == 'send-first-150':
    import json
    first150_ab_1 = json.load(open('app/static/data/first150-ab-1.json'))
    first150_ab_2 = json.load(open('app/static/data/first150-ab-2.json'))
    from app.emails import send_invite_email
    send_invite_email(first150_ab_1, 'ab-test-1', "Join Cal's Peer-to-Peer Tutoring Platform and Make Money", 'Tutor Email Blast v1')
    send_invite_email(first150_ab_2, 'ab-test-2', "Become a Tutor on Uguru and Make Money", 'Tutor Email Blast v2')

if arg == 'send-next-450':
    import json
    third_ab_1 = json.load(open('app/static/data/third300-ab-1.json'))
    third_ab_2 = json.load(open('app/static/data/third300-ab-2.json'))
    third_ab_3 = json.load(open('app/static/data/third300-ab-3.json'))
    from app.emails import send_invite_email
    send_invite_email(third_ab_1, 'ab-test-7', "*|FNAME|*, Become a Freelance Tutor at Cal and Make Money")
    send_invite_email(third_ab_2, 'ab-test-8', "*|FNAME|*, Tutor Your Classmates and Make Hundreds on Uguru")
    send_invite_email(third_ab_3, 'ab-test-9', "*|FNAME|*, Tutor Your Classmates and Make Money on Uguru")

if arg =='mass-email-1':
    import json
    mass_email_1 = json.load(open('app/static/data/mass-email-1.json'))
    from app.emails import send_invite_email
    send_invite_email(mass_email_1, 'mass-email-1', "*|FNAME|*, Tutor Your Classmates and Make Money on Uguru")

if arg =='mass-email-2':
    import json
    mass_email_2 = json.load(open('app/static/data/mass-email-2.json'))
    print len(mass_email_2)
    # from app.emails import send_invite_email
    # send_invite_email(mass_email_2, 'mass-email-2', "*|FNAME|*, Tutor Your Classmates and Make Money on Uguru")

if arg =='mass-email-3':
    import json
    mass_email_3 = json.load(open('app/static/data/all_cal_emails_unsubscribe.json'))
    from app.emails import send_get_help_email
    send_get_help_email(mass_email_3, 'mass-email-3', "*|FNAME|*, A Site That Can Help You Ace Your Finals")


if arg == 'conversation-update':
    for u in User.query.all():
        if u and u.mailbox.conversations:
            for c in u.mailbox.conversations:
                if c.messages:
                    last_message_time = sorted(c.messages, key=lambda m:m.write_time, reverse = True)[0].write_time
                else:
                    last_message_time = datetime.now()
                c.last_updated = last_message_time
    db_session.commit()

if arg == 'send-test-email':
    test_email_dict = {
        'Samir Makhani': 'samir@uguru.me',
        'Michael Koh': 'michael@uguru.me'
    }

if arg == 'update-aproved-admin':
    for u in User.query.all():
        if u.skills:
            u.approved_by_admin = True
    db_session.commit()

if arg == 're-create_db':
    os.remove('app.db')
    init_db()
    initialize_skill()
    import os, json
    script_dir = os.path.dirname(__file__)
    rel_path = 'app/static/data/all_courses.json'
    abs_file_path = os.path.join(script_dir, rel_path)
    rel_path_variations = 'app/static/data/variations.py'
    abs_file_path_to_save = os.path.join(script_dir, rel_path_variations)
    variation_dict = {}
    courses = json.load(open(abs_file_path))
    for course_name in courses.keys():
        new_course = Course(course_name)
        db_session.add(new_course)
        db_session.commit()
        new_skill_id = new_course.skill_id

        #Create variation course
        d = courses[course_name]
        variations = d['variations'] 
        for v in variations:
            variation_dict[v.lower()] = new_skill_id

    f = open(abs_file_path_to_save, "wb+")
    f.write(json.dumps(variation_dict,
        sort_keys = True,
        indent = 4,
        separators = (',', ': ')))
    print "Previous App.db deleted and new db_initialized"

if arg == 'test_payments':
    user0 = User(name = u'Aleks', email="test2", password="test", phone_number="test2")
    user1 = User(name = u'Samir', email="test3", password="test", phone_number="test3")
    db_session.add_all([user0, user1])
    db_session.commit()

    skill = Skill(u'CS10')
    db_session.add(skill)
    db_session.commit()
    user0.skills.append(skill)    
    db_session.commit()

    r1 = Request(student_id = 1, skill_id = 1, description = "help me", \
        urgency = 1, frequency = 0, time_estimate = 1)

    r1.connected_tutor_id = 1
    r1.estimated_hourly = 20.0
    db_session.add(r1)
    db_session.commit()

    tutor = user0

    payment = Payment(r1)
    db_session.add(payment)
    
if arg == 'test_inbox':
    user0 = User(name = u'Aleks', email="test2", password="test", phone_number="test2")
    user1 = User(name = u'Samir', email="test3", password="test", phone_number="test3")
    user2 = User(name = u'Summer', email="test4", password="test", phone_number="test4")
    db_session.add_all([user0, user1,user2])
    db_session.commit()

    mailbox0 = Mailbox(user0)
    mailbox1 = Mailbox(user1)
    mailbox2 = Mailbox(user2)
    db_session.add_all([mailbox0, mailbox1, mailbox2])
    db_session.commit()

    skill0 = Skill(u'Guitar')
    course0 = Course(u'CS 61A')
    skill1 = course0.skill
    course1 = Course(u'Math 1A')
    skill2 = course1.skill
    db_session.add_all([skill0, course0, skill1, course1, skill2])
    db_session.commit()

    user0.skills.append(skill0)
    user0.skills.append(skill1)
    user1.skills.append(skill1)
    user1.skills.append(skill2)
    db_session.add_all([skill0, course0, skill1, course1, skill2])
    db_session.commit()

    convo0 = Conversation(skill0, user0, user1)
    convo1 = Conversation(skill1, user1, user0)
    convo2 = Conversation(skill2, user2, user0)
    db_session.add_all([convo0, convo1, convo2])
    db_session.commit()

    message0 = Message(u"Hello", convo0, user0, user1)
    message1 = Message(u"World", convo0, user1, user0)
    message2 = Message(u"Jon", convo1, user0, user1)
    message3 = Message(u"Sucks", convo1, user1, user0)
    db_session.add_all([message0, message1, message2, message3])
    db_session.commit()

    tag0 = Tag("accepted", conversation = convo0)
    tag1 = Tag("read", message = message1)
    tag2 = Tag("unread", message = message3)
    tag3 = Tag("no_reply", conversation = convo1)
    db_session.add_all([tag0, tag1, tag2, tag3])
    db_session.commit()
 

if arg == 'testdb':    
    init_db()

    #Create a user
    student = User(name = 'Samir', email = 'makhani@berkeley.edu',\
        password = 'sup', phone_number = "8135009853")
    tutor = User(name = 'Nikhil', email = 'nikhil@gmail.com',\
        password = 'sup', phone_number = '5103102321')

    db_session.add_all([student, tutor])
    db_session.flush()
    print "===Tutor/Student Data==="
    print student
    print tutor 
    print

    #Create multiple skills for one user
    skill1 = Skill(u'BIO1B')
    skill2 = Skill(u'CS61B')
    tutor.skills.append(skill1)
    tutor.skills.append(skill2)
    db_session.add_all([skill1, skill2])
    db_session.flush()
    print "===User Skill Data==="
    print tutor.skills
    print 

    #Test multiple requests for one tutor
    r1 = Request(student_id = 1, skill_id = 2, description = "help me", \
        urgency = 1, frequency = 0, time_estimate = 1)
    r2 = Request(student_id = 1, skill_id = 1, description = "help me", \
        urgency = 1, frequency = 0, time_estimate = 1)
    db_session.add_all([r1, r2])
    student.outgoing_requests.append(r1)
    student.outgoing_requests.append(r2)
    db_session.flush()
    print "===User Requests Data==="
    print student.outgoing_requests
    print

    #Query multiple tutors based on skill
    tutor2 = User(name = 'Hurshal', email = 'hurshal@gmail.com',\
        password = 'sup', phone_number = '8134762041')
    db_session.add(tutor2)
    tutor2.skills.append(skill1)
    db_session.commit()
    skill1 = Skill.query.get(1)
    print "===Tutors that teach Bio1b==="
    print skill1.tutors
    print

    #Show valid tutors per request
    r3 = Request(student_id = 1, skill_id = 1, description = "help me", \
        urgency = 1, frequency = 0, time_estimate = 1)
    db_session.add(r3)
    db_session.commit()
    print "===Bio1B requested tutors==="
    print r3.requested_tutors
    print

    #Show committed tutors per request
    r3.committed_tutors.append(tutor2)
    r3.committed_tutors.append(tutor)
    db_session.commit()
    print "===Bio1b committed requested tutors"
    print r3.committed_tutors
    student = User.query.get(1)

    print "===Connection Complete"
    r3.connected_tutor_id = 3
    rating = Rating(3)
    db_session.add(rating)
    db_session.commit()
    rating = Rating.query.get(1)
    student = User.query.get(rating.student_id)
    tutor = User.query.get(rating.tutor_id)
    student.pending_ratings.append(rating)
    tutor.pending_ratings.append(rating)
    print student.pending_ratings
    print tutor.pending_ratings
    
#     db.session.add(r)
#     db.session.commit()
#     u = User.query.all()[0]
#     r = Request.query.all()[0]
#     print "===User Data==="
#     print u
#     print 
    db_session.commit()
    os.remove('app.db')


if arg == 'remove':
    email = sys.argv[2]
    user = User.query.filter_by(email=email).first()
    r = Request.query.filter_by(student_id=user.id).first()
    if r:
        db_session.delete(r)
    db_session.delete(user)
    db_session.commit()
    print email + " removed"

if arg == 'print':
    email = sys.argv[2]
    user = User.query.filter_by(email=email).first()
    user_id = user.id
    print user
    print user.outgoing_requests

if arg == 'create':
    email = sys.argv[2]
    password = "admin"
    phone = "18135009853"
    name = "Admin"
    user = User(name=name, email=email, password=md5(password).hexdigest(), \
        phone_number = phone)
    db_session.add(user)
    db_session.commit()
    print email + " added"

if arg == 'create-tutor':
    email = sys.argv[2]
    password = "admin"
    phone = "18135009853"
    name = "Admin"
    user = User(name=name, email=email, password=md5(password).hexdigest(), \
        phone_number = phone)
    skill = Skill.query.get(1)
    user.skills.append(skill)
    db_session.add(user)
    db_session.commit()
    print email + " added"

def delete_all():
    users = User.query.all()
    requests = Request.query.all()
    for user in users:
        db_session.delete(user)
    for request in requests:
        db_session.delete(request)
    db_session.commit()
    print 'everything deleted'    

if arg == 'delete_all':
    delete_all()

if arg == 'test_connection':
    init_db()
    skill = Skill(u'CS10')
    print "======================="
    print "Let's get started!"
    print "======================="
    print "1. Make sure you have a local server running on another tab"
    print "2. Also make sure that you are logged out of uGuru.me on the local site."
    print
    print raw_input("If all of this is true, press enter to continue...")
    db_session.add(skill)
    db_session.commit()
    student_email = sys.argv[2]
    tutor_email = sys.argv[3]
    student = User(name="Samir", email=student_email, \
        password=md5("admin").hexdigest(), phone_number="18135009853")
    tutor1 = User(name="Jaclyn", email=tutor_email, \
        password=md5("admin").hexdigest(), phone_number="18135009851")
    tutor2 = User(name="Hurshal", email='samir.makhani@berkeley.edu', \
        password=md5("admin").hexdigest(), phone_number="18135009852")
    print "Accounts have been created"
    print "--------------------------"
    print "Student email is " + student_email + ". Name: Samir, Password: admin"
    print "Tutor email is " + tutor_email + ". Name: Jaclyn, Password: admin"
    print
    db_session.commit()
    skill = Skill.query.get(1) 
    tutor1.skills.append(skill)
    tutor2.skills.append(skill)
    db_session.add(student)
    db_session.add(tutor1)
    db_session.add(tutor2)
    db_session.commit()

    #Create request
    print "A request for CS10 has been created by Samir, a student. Jaclyn should now receive an email"
    print
    request = Request(student.id, skill.id, description="i need help",\
        urgency=1, frequency = 1, time_estimate=2)
    db_session.add(request)
    db_session.commit()
    request_url = "http://0.0.0.0:5000/requests/tutors/" + str(request.id)
    emails.send_request_to_tutors(request, request_url)
    print "Mail sent. Check tutor email: " + tutor_email
    print raw_input("Did you receive an email? If so, press Enter to continue...")
    print raw_input("Click the accept link. It should take you to a login page with" + \
        " an alert that says 'Please Login First'. If this is true, click enter")
    print raw_input("Go ahead in login with the following credentials\n email:%s \n password:admin\n Click enter after"% tutor_email)
    print raw_input("You should have been redirected to a page that confirms your request acceptance")
    print raw_input("The student has been sent an email to show that the tutor has accept their request. Check your student email" + \
        student_email + ". If you received an email, DO NOT CLICK ACCEPT YET, you need to first  logout first from the local uguru site as a tutor. Click enter when you've done so.")
    print raw_input("Login with the following credentials of your student account: \n email:%s \n password:admin \nClick enter after"% student_email)
    print raw_input("Now click the link in the student email. It should take you to the connected page.")
    print "That's all - more to follow!"
    
       

if arg == 'test_email':
    init_db()
    skill = Skill('CS10')
    db_session.add(skill)
    db_session.commit()
    student = User(name="Samir", email="makhani@berkeley.edu", \
        password=md5("admin").hexdigest(), phone_number="18135009853")
    skill = Skill.query.get(1)
    tutor1 = User(name="Hurshal", email="makhani.samir@gmail.com", \
        password=md5("admin").hexdigest(), phone_number="18135009851")
    # tutor2 = User(name="Michael Koh", email="michael60716@gmail.com", \
    #     password=md5("admin").hexdigest(), phone_number="18135009852")
    # tutor3 = User(name="Samir 2", email="samir@uguru.me", \
    #     password=md5("admin").hexdigest(), phone_number="18135009850")
    tutor1.skills.append(skill)
    # tutor2.skills.append(skill)
    # tutor3.skills.append(skill)
    db_session.add_all([student, tutor1])
    db_session.commit()
    request = Request(student.id, skill.id, description="i need help",\
        urgency=1, frequency = 1, time_estimate=2)
    db_session.add(request)
    db_session.commit()
    request_url = "http://0.0.0.0:5000/requests/tutors/" + str(request.id)
    emails.send_request_to_tutors(request, request_url)
    # os.remove('app.db')    


if arg == 'save_db_skills':
    import os, json
    script_dir = os.path.dirname(__file__)
    rel_path = 'app/static/data/db_courses.json'
    abs_file_path_to_save = os.path.join(script_dir, rel_path)
    skills_dict = {}

    for skill in Skill.query.all():
        skills_dict[skill.id] = skill.name

    f = open(abs_file_path_to_save, "wb+")
    f.write(json.dumps(skills_dict,
        sort_keys = True,
        indent = 4,
        separators = (',', ': ')))



if arg == 'add_courses_db':
    import os, json
    script_dir = os.path.dirname(__file__)
    rel_path = 'app/static/data/db_courses.json'
    abs_file_path = os.path.join(script_dir, rel_path)    
    skills = json.load(open(abs_file_path))
    
    for index in range(1, len(skills) + 1):
        new_course = Course(name=skills[str(index)])
        db_session.add(new_course)
        db_session.commit()
    print 'courses created'

if arg == 'add_courses_production':
    from app.static.data.variations import courses_dict
    from app.static.data.variations2 import courses_dict_detailed
    from app.models import Skill
    from app.database import db_session
    
    for course_name in courses_dict.keys():
        _id = courses_dict[course_name]
        skill = Skill.query.get(_id)
        skill.name = courses_dict_detailed[course_name]
        skill.course.name = courses_dict_detailed[course_name]  
        db_session.commit()

if arg == 'test_feed':
    user1 = User(name = u'Samir', email="test3", password="test", phone_number="test3")
    user2 = User(name = u'Michael', email="test4", password="test", phone_number="test4")
    db_session.add(user1)
    db_session.commit()
    db_session.add(user2)
    db_session.commit()
    skill = Skill.query.get(1)
    user1.skills.append(skill)

    #instantiated when user is created
    notification1 = Notification(other="Welcome to uGuru.me. Click here to get started")
    user1.notifications.append(notification1)
    skill_str = "You just added " + str(len(user1.skills)) + " skills. "
    notification2 = Notification(other=skill_str)
    db_session.add(notification1)
    db_session.commit()
    db_session.add(notification2)
    db_session.commit()
    user1.notifications.append(notification2)

    r1 = Request(student_id = 2, skill_id = 1, description = "help me", \
        urgency = 1, frequency = 0, time_estimate = 1)

    db_session.add(r1)

    db_session.commit()

    notification3 = Notification(request = r1)
    user1.notifications.append(notification3)
    db_session.add(notification3)
    db_session.commit()
    user1 = User.query.get(1)
    print user1.notifications

if arg == 'generate_short_variations':
    import json    
    json_data = open('app/static/data/all_courses.json')
    data = json.load(json_data)
    result_dict = {}
    for key in data.keys():
        key_variations = data[key]['variations']
        shortest_one = min(key_variations, key=len)
        result_dict[key] = shortest_one


    script_dir = os.path.dirname(__file__)
    rel_path_variations = 'app/static/data/short_variations.py'
    abs_file_path_to_save = os.path.join(script_dir, rel_path_variations)

    f = open(abs_file_path_to_save, "wb+")
    f.write(json.dumps(result_dict,
        sort_keys = True,
        indent = 4,
        separators = (',', ': ')))
    print result_dict

if arg == 'update_profile_notifications_test':
    a_id_names = ['getting-started', 'getting-started-tutor']
    custom_tags = ['student-request-help', 'tutor-receive-payment', 'tutor-cashed-out']
    for user in User.query.all():
        if user.profile_url != '/static/img/default-photo.jpg':
            for n in user.notifications:
                if n.a_id_name in a_id_names or n.custom_tag in custom_tags:
                    if n.image_url != user.profile_url:
                        print user.name, n.feed_message[0:30], " notification is not updated"

if arg == 'update_profile_notifications':
    a_id_names = ['getting-started', 'getting-started-tutor']
    custom_tags = ['student-request-help', 'tutor-receive-payment', 'tutor-cashed-out']
    for user in User.query.all():
        if user.profile_url != '/static/img/default-photo.jpg':
            for n in user.notifications:
                if n.a_id_name in a_id_names or n.custom_tag in custom_tags:
                    if n.image_url != user.profile_url:
                        n.image_url = user.profile_url
                        print user.name, n.feed_message[0:30], " notification is now updated"
    db_session.commit()


if arg == 'generate_short_variations_reverse':
    import json    
    json_data = open('app/static/data/all_courses.json')
    data = json.load(json_data)
    result_dict = {}
    for key in data.keys():
        key_variations = data[key]['variations']
        shortest_one = min(key_variations, key=len)
        result_dict[shortest_one] = key

    script_dir = os.path.dirname(__file__)
    rel_path_variations = 'app/static/data/short_variations_reverse.py'
    abs_file_path_to_save = os.path.join(script_dir, rel_path_variations)

    f = open(abs_file_path_to_save, "wb+")
    f.write(json.dumps(result_dict,
        sort_keys = True,
        indent = 4,
        separators = (',', ': ')))
    print result_dict

if arg == 'update_balance':
    import stripe, os
    stripe_keys = {
        'secret_key': os.environ['SECRET_KEY'],
        'publishable_key': os.environ['PUBLISHABLE_KEY']
    }
    stripe.api_key = stripe_keys['secret_key']
    for u in User.query.all():
        if u.verified_tutor:
            u.total_earned == u.balance
    bank_users = User.query.filter(User.recipient_id != None)
    for _user in bank_users:
        recipient_id = _user.recipient_id
        transfers = stripe.Transfer.all(recipient=recipient_id).data
        for transfer in transfers:
            amount = float(transfer.amount / 100)
            _user.total_earned = _user.total_earned + amount

    db_session.commit()

if arg == 'generate_secret_codes':
    def generate_secret_code():
        import random 
        from random import randint 
        from app.static.data.animals import animal_list
        return random.choice(animal_list) + str(randint(1, 100))
    for u in User.query.all():
        if not u.verified_tutor:
            u.secret_code = generate_secret_code()                   
            for n in u.notifications:
                if n.request_id:
                    r = Request.query.get(n.request_id)
                    if r and r.connected_tutor_id:
                        r.student_secret_code = u.secret_code
    db_session.commit()

