import sys, os
from app.database import *
from app.models import *
from hashlib import md5
from app import emails

arg = sys.argv[1]

#Test whether DB is accurate
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

if arg == 'test_email':
    init_db()
    skill = Skill('test')
    db_session.add(skill)
    db_session.commit()
    student = User(name="Samir", email="makhani@berkeley.edu", \
        password=md5("admin").hexdigest(), phone_number="18135009853")
    skill = Skill.query.get(1)
    tutor1 = User(name="Hurshal", email="makhani.samir@gmail.com", \
        password=md5("admin").hexdigest(), phone_number="18135009851")
    tutor2 = User(name="Michael Koh", email="michael60716@gmail.com", \
        password=md5("admin").hexdigest(), phone_number="18135009852")
    tutor3 = User(name="Samir 2", email="samir@uguru.me", \
        password=md5("admin").hexdigest(), phone_number="18135009850")
    tutor1.skills.append(skill)
    tutor2.skills.append(skill)
    tutor3.skills.append(skill)
    db_session.add_all([student, tutor1, tutor2, tutor3])
    db_session.commit()
    request = Request(student.id, skill.id, description="i need help",\
        urgency=1, frequency = 1, time_estimate=2)
    db_session.add(request)
    db_session.commit()
    print "request created"
    emails.send_request_to_tutors(request)
    os.remove('app.db')

    # from app.models import user_skill_table
    # d0 = user_skill_table.delete(user_skill_table.c.user_id == 1)
    # d1 = user_skill_table.delete(user_skill_table.c.user_id == 2)
    # d2 = user_skill_table.delete(user_skill_table.c.user_id == 3)
    # d3 = user_skill_table.delete(user_skill_table.c.user_id == 4)
    # db_session.execute(d0)
    # db_session.execute(d1)
    # db_session.execute(d2)
    # db_session.execute(d3)
    # db_session.commit()
    # db_session.delete(student)
    # db_session.delete(tutor1)
    # db_session.delete(tutor2)
    # db_session.delete(tutor3)
    # db_session.commit()
    
