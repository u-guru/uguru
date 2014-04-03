import sys, os
from app.database import *
from app.models import *
from hashlib import md5
from app import emails
from app import app

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






