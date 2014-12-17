from sqlalchemy import String, Integer, Column, ForeignKey, Float, SmallInteger, Boolean, Table, Unicode, DateTime
from sqlalchemy.orm import relationship, backref
from app.database import Base, db_session
from datetime import datetime
import os

# TODO create __dict__ for popular objects

from app import flask_bcrypt

####################
#Association Tables#
####################
guru_courses_table = Table('guru-course_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('course_id', Integer, ForeignKey('course.id'))
    )

student_courses_table = Table('student-course_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('course_id', Integer, ForeignKey('course.id'))
    )

user_major_table = Table('user-major_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('major_id', Integer, ForeignKey('major.id'))
    )

university_major_table = Table('university-major_assoc',
    Base.metadata,
    Column('university_id', Integer, ForeignKey('university.id')),
    Column('major_id', Integer, ForeignKey('major.id'))
    )
 
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    
    #FB Login IDs
    name = Column(String)
    email = Column(String, unique=True, nullable=False)
    profile_url = Column(String)
    fb_id = Column(String)
    gender = Column(String)
    password = Column(String, nullable=False)
    
    #Last active time 
    last_active = Column(DateTime)
    time_created = Column(DateTime)

    #Student fields
    student_introduction = Column(String)
    student_courses = relationship("Course", 
        secondary = student_courses_table,
        backref = backref('students', lazy='dynamic')
        )

    #Guru fields 
    is_a_guru = Column(Boolean, default = False)
    guru_introduction = Column(String) #TODO: Research sufficient length
    guru_courses = relationship("Course", 
        secondary = guru_courses_table,
        backref = backref('gurus', lazy='dynamic')
        )


    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University", 
        uselist = False,
        primaryjoin = "University.id == User.university_id",
        backref = 'all_students'
        )

    majors = relationship("Major", 
        secondary = user_major_table,
        backref = "users"
        )


    #Terms of service
    tos_version = Column(Integer)
    tos_signed_date = Column(DateTime)

    def __init__(self, email, password):
        self.email = email
        self.password = flask_bcrypt.generate_password_hash(password)
        self.time_created = datetime.now()
        self.last_active = datetime.now()
 
    def __repr__(self):
        return "<User '%r', '%r', '%r'>" %\
              (self.id, self.name, self.email)


class University(Base):
    __tablename__  = 'university'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    state = Column(String)
    city = Column(String)
    address = Column(String)
    website = Column(String)
    phone_number = Column(String)
    domain = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    
    last_updated = Column(DateTime)

    gurus = relationship("User",
        primaryjoin = "(User.university_id==University.id) & "\
                        "(User.is_a_guru==True)")

    students = relationship("User",
        primaryjoin = "(User.university_id==University.id) & "\
                        "(User.is_a_guru==False)")

    majors = relationship("Major", 
        secondary = university_major_table,
        backref = backref('universities', lazy='dynamic')
        )

    def __init__(self, name):
        self.name = name 
        self.last_updated = datetime.now()
 
    def __repr__(self):
        return "<University '%r', '%r'>" %\
              (self.id, self.name)



class Major(Base):
    __tablename__ = 'major'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    admin_approved = Column(Boolean, default = False)
    time_added = Column(DateTime)

    #Id of user that suggested this major
    contributed_user_id = Column(Integer, ForeignKey('user.id'))
    

    def __init__(self, name, admin_approved=False, \
        contributed_user_id=None):
        self.name = name 
        self.time_added = datetime.now()
        self.admin_approved = admin_approved
        self.contributed_user_id = contributed_user_id
 
    def __repr__(self):
        return "<Major '%r', '%r'>" %\
              (self.id, self.name)


class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)

    full_name = Column(String) #Usually department + course_number
    short_name = Column(String) #Casual shorted version that students use
    department = Column(String)
    course_number = Column(String)
    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer, ForeignKey('user.id'))

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University", 
        uselist = False,
        primaryjoin = "University.id == Course.university_id",
        backref = 'courses'
        )

    def __init__(self, name, university_id, admin_approved=False,\
        contributed_user_id=None):
        self.name = name 
        self.university_id = university_id
        self.admin_approved = admin_approved
        self.contributed_user_id = contributed_user_id
 
    def __repr__(self):
        return "<Major '%r', '%r', '%r'>" %\
              (self.id, self.name, self.university.name)


class Card(Base):
    __tablename__ = 'card'
    id = Column(Integer, primary_key=True)
    
    #For stripe recipients
    stripe_recipient_id = Column(String)

    #For stripe customers
    stripe_customer_id = Column(String)

    card_last4 = Column(String)
    card_type = Column(String) #i.e, Visa
    time_added = Column(String)
    
    is_payment_card = Column(Boolean)
    is_cashout_card = Column(Boolean)

    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User", 
        uselist = False,
        primaryjoin = "User.id == Card.user_id",
        backref = 'cards'
        )

    #If is card default 
    is_default = Column(Boolean, default=False)
    
    #If user has not removed/deleted the card yet
    active = Column(Boolean, default = True)

    def __init__(self, user_id, card_last4, card_type,\
        stripe_recipient_id=None, stripe_customer_id=None, \
        is_payment_card=False, is_cashout_card=False):
        
        self.user_id = user_id
        self.card_last4 = card_last4
        self.card_type = card_type
        self.stripe_recipient_id = stripe_recipient_id
        self.stripe_customer_id = stripe_customer_id
        self.time_added = datetime.now()
        self.is_payment_card = is_payment_card
        self.is_cashout_card = is_cashout_card
 
    def __repr__(self):
        return "<User Card '%r', '%r', '%r', '%r'>" %\
              (self.id, self.user.name, self.card_type, \
                self.card_last4)


