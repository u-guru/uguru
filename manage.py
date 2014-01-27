import sys, os

arg = sys.argv[1]

#Test whether DB is accurate
if arg == 'testdb':
    from app.database import *
    from app.models import *
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


# if arg == 'fakedata':
#     pass
#     #Generate fake tutors
