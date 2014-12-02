import sys, os
from app.database import init_db, db_session
from app.models import *
from hashlib import md5
from app import emails
from app import app
import mandrill

if len(sys.argv) > 1:
    arg = sys.argv[1]
else:
    arg = ''

def initialize():
    import os, json
    # TODO: check if it already exists
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

    from datetime import datetime

    #New Guru
    user = User(name='Tutor 1', email='makhani.samir1111@gmail.com', phone_number = '8135009853')
    user.approved_by_admin = True
    user.verified_tutor = True
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user = User(name='Tutor 2', email='sam1rm@berkeley.edu')
    r = Rating()
    r.tutor_rating = 5
    user.tutor_ratings.append(r)
    user.approved_by_admin = True
    user.verified_tutor = True
    user.profile_url = '/static/img/jenny.jpg'
    user.year = 'Freshman'
    user.tutor_introduction = 'I like tutoring'
    user.phone_number = '10dka0d-a'
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user.time_created = datetime.now()
    user.last_active = datetime.now()
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
    user = User(name='Student One', email='uguru.me@gmail.com')
    m = Mailbox(user)
    db_session.add(m)
    user.time_created = datetime.now()
    user.last_active = datetime.now()
    user.phone_number = '8135009853'
    db_session.add(user)
    db_session.commit()

def create_cs10_skill():
    from app.models import Skill
    from app.database import db_session
    skill = Skill(u'COMPSCI.10')
    db_session.add(skill)
    db_session.commit()
    skill.id = 6849
    db_session.commit()

if arg == 'initialize':
    initialize()