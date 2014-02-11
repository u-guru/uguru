from sqlalchemy import String, Integer, Column, ForeignKey, Float,\
 SmallInteger, Boolean, Table, Unicode, DateTime
from flask import url_for
from sqlalchemy.orm import relationship, backref
from app.database import Base
from app import db
from datetime import datetime



#Many to #Many relation tables
user_skill_table = Table('user-skill_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('skill_id', Integer, ForeignKey('skill.id'))
)

student_request_table = Table('student-skill_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('student_id', Integer, ForeignKey('user.id'))
)

tutor_request_table = Table('tutor-skill_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('student_id', Integer, ForeignKey('user.id'))
)

committed_tutor_request_table = Table('committed-tutor-skill_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('student_id', Integer, ForeignKey('user.id'))
)

tutor_rating_table = Table('tutor-rating-table',
    Base.metadata,
    Column('tutor_id', Integer, ForeignKey('user.id')),
    Column('rating_id', Integer, ForeignKey('rating.id'))
)

student_rating_table = Table('student-rating-table',
    Base.metadata,
    Column('student_id', Integer, ForeignKey('user.id')),
    Column('rating_id', Integer, ForeignKey('rating.id'))
)

pending_rating_table = Table('pending-rating-table',
    Base.metadata,
    Column('student_id', Integer, ForeignKey('user.id')),
    Column('rating_id', Integer, ForeignKey('rating.id'))
)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    name = Column(String(64))
    email = Column(String(64), index = True, unique = True)
    password = Column(String(64))
    is_a_tutor = Column(Boolean, default = False)

    phone_number = Column(String(64), unique = True)

    # student_ratings = Column(Integer)
    # tutor_ratings = 

    time_created = Column(DateTime)
    email_notification = Column(Boolean, default = True)
    text_notification = Column(Boolean, default = True)
    #is_active = (email_notification OR text_notification)
    
    #Requests for tutoring
    outgoing_requests = relationship('Request', 
        secondary = student_request_table,
        # backref = backref('student', lazy='dynamic')
        )

    incoming_requests_to_tutor = relationship('Request', 
        secondary = tutor_request_table,
        backref = backref('users', lazy='dynamic')
        )

    incoming_requests_from_tutors = relationship('Request', 
        secondary = committed_tutor_request_table,
        # backref = backref('users', lazy='dynamic')
        )

    skills = relationship("Skill",
        secondary = user_skill_table,
        backref = backref('users', lazy='dynamic')
        )

    student_ratings = relationship('Rating',
        secondary = student_rating_table,
        # backref = backref('users', lazy='dynamic')
        )

    tutor_ratings = relationship('Rating',
        secondary = tutor_rating_table,
        # backref = backref('users', lazy='dynamic')
        )

    pending_ratings = relationship('Rating',
        secondary = pending_rating_table,
        # backref = backref('users', lazy='dynamic'))
        )

    def __init__(self, name, email, password, phone_number, is_a_tutor = None):
        self.name = name
        self.email = email
        self.password = password
        self.phone_number = phone_number
        self.time_created = datetime.now()

        if is_a_tutor:
            pass
            #TODO Pass in skills and Create skill objects and append them to user skills
            #TODO See if any of their skills are needed right now and 
                #add to their incoming requests

    def __repr__(self):
        return "<Name: %s, Email: %s, Phone: %s, Date: %s>" % (self.name, self.email,\
            str(self.phone_number), self.time_created.strftime('%b %d,%Y'))

class Request(Base):
    __tablename__ = 'request'
    id = Column(Integer, primary_key = True)
    
    student_id = Column(Integer) 
    skill_id = Column(Integer)
    connected_tutor_id = Column(Integer) #Request is active if null
    description = Column(String)
    urgency = Column(SmallInteger)
    frequency = Column(SmallInteger) # 0 is once, 1 is regular
    time_estimate = Column(Float)
    time_created = Column(DateTime)
    time_connected = Column(DateTime)

    requested_tutors = relationship('User', 
        secondary = tutor_request_table,
        backref = backref('requests', lazy='dynamic')
        )

    committed_tutors = relationship('User',
        secondary = committed_tutor_request_table,
        backref = backref('committed_requests', lazy='dynamic'))

    #To do: make sure student_id doesn't already have a request for that skill_id

    def __init__(self, student_id, skill_id, description, urgency, \
        frequency, time_estimate):
        self.student_id = student_id
        self.skill_id = skill_id
        self.description = description
        self.urgency = urgency
        self.frequency = frequency
        self.time_estimate = time_estimate
        self.time_created = datetime.now()
        self.requested_tutors = Skill.query.get(skill_id).tutors
        

    def __repr__(self):
        student_name = User.query.get(self.student_id).name
        skill_name = Skill.query.get(self.skill_id).name
        
        if self.connected_tutor_id: 
            tutor_name = User.query.filter_by(id=self.connected_tutor_id)\
            .first().name
        else:
            tutor_name = "Inactive"
        
        return "%s <Student: %s, Tutor: %s, Skill: %s,\
        \n Time Created: %s, Time Estimated: %s hours>" %\
        (str(self.id), student_name, tutor_name, skill_name, \
            self.time_created.strftime('%b %d,%Y'), self.time_estimate)

    def convert_urgency_to_str(self, number):
        if number == 0:
            return "ASAP"
        if number == 1:
            return "by tomorrow"
        if number == 2:
            return "sometime this week"

    def generate_url(self):
        return url_for('confirm_tutor_interest', request_id=self.id, _external=True)


class Skill(Base):
    __tablename__ = 'skill'
    id = Column(Integer, primary_key = True)
    name = Column(Unicode(64))
    time_created = Column(DateTime)
    is_course = Column(Boolean, default = False)

    #TODO List of all tutors with a skill

    course = relationship("Course",
        primaryjoin = 'Skill.id == Course.skill_id',
        uselist = False,
        backref = backref("skill", uselist = False))

    tutors = relationship("User",
        secondary = user_skill_table,
        backref = backref('tutors', lazy='dynamic')
        )

    def __init__(self, name, is_course = False):
        self.name = name
        self.time_created = datetime.now()
        self.is_course = is_course

    def __repr__(self):
        if self.is_course:
            return u"<Skill for Course '%r'>" % (self.name)
        return u"<Skill '%r'>" % (self.name)

class Rating(Base):
    __tablename__ = 'rating'
    id = Column(Integer, primary_key = True)
    request_id = Column(Integer)
    student_id = Column(Integer)
    tutor_id = Column(Integer)
    skill_id = Column(Integer)
    time_created = Column(DateTime)
    student_rating = Column(Float)
    tutor_rating = Column(Float)
    meeting_exist = Column(Boolean, default = True)
    student_rating_description = Column(String(256))
    tutor_rating_description = Column(String(256))
    tutor_no_meet_description = Column(String(256))
    student_no_meet_description = Column(String(256))

    def __init__(self, request_id):
        r = Request.query.get(request_id)

        self.request_id = request_id
        self.student_id = r.student_id
        self.tutor_id = r.connected_tutor_id
        self.skill_id = r.skill_id
        self.time_created = datetime.now()

    def __repr__(self):
        student_name = User.query.get(self.student_id).name
        tutor_name = User.query.get(self.tutor_id).name
        skill_name = Skill.query.get(self.skill_id).name

        return "%s <Student: %s, Tutor: %s, Skill: %s,\n Time: %s>" %\
        (str(self.id), student_name, tutor_name, skill_name, \
            self.time_created.strftime('%b %d,%Y'))




class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key = True)
    name = Column(String(64))

    skill_id = Column(Integer, ForeignKey('skill.id'))

    def __init__(self, name):
        self.name = name
        self.skill = Skill(name, True)
        self.skill_id = self.skill.id

    def __repr__(self):
        return '<Course %r>' % (self.name)


