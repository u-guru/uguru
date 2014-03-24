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

request_conversation_table = Table('request-convo_assoc',
    Base.metadata,
    Column('conversation_id', Integer, ForeignKey('conversation.id')),
    Column('request_id', Integer, ForeignKey('request.id'))
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

user_conversation_table = Table('user-conversation_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('conversation_id', Integer, ForeignKey('conversation.id'))
)
user_message_table = Table('user-message_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('message_id', Integer, ForeignKey('message.id'))
)
mailbox_conversation_table = Table('mailbox-conversation_assoc',
    Base.metadata,
    Column('mailbox_id', Integer, ForeignKey('mailbox.id')),
    Column('conversation_id', Integer, ForeignKey('conversation.id'))
)
mailbox_message_table = Table('mailbox-message_assoc',
    Base.metadata,
    Column('mailbox_id', Integer, ForeignKey('mailbox.id')),
    Column('message_id', Integer, ForeignKey('message.id'))
)
user_payment_table = Table('user-payment_assoc',
    Base.metadata,
    Column('payment_id', Integer, ForeignKey('payment.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
)
user_notification_table = Table('user-notification_assoc',
    Base.metadata,
    Column('notification_id', Integer, ForeignKey('notification.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    name = Column(String(64))
    email = Column(String(64), index = True, unique = True)
    password = Column(String(64))
    is_a_tutor = Column(Boolean, default = False)
    phone_number = Column(String(64), unique = True)
    time_created = Column(DateTime)
    email_notification = Column(Boolean, default = True)
    text_notification = Column(Boolean, default = True)
    profile_url = Column(String, default='/static/img/default-photo.jpg')
    tutor_introduction = Column(String(1000))
    advertised_rate = Column(Float, default = 10.0)
    max_price = Column(Float, default = 15.0)
    discoverability = Column(Boolean, default = True)
    referral_code = Column(String)

    #Tutor fields
    verified_tutor = Column(Boolean)
    balance = Column(Float, default = 0.0)
    discoverability = Column(Boolean, default = True)
    major = Column(String)
    year = Column(String)





    previous_tutor = Column(Boolean, default = False)
    slc_tutor = Column(Boolean, default = False)
    hkn_tutor = Column(Boolean, default = False)
    ta_tutor = Column(Boolean, default = False)
    res_tutor = Column(Boolean, default = False)

    msg_notif = Column(Integer, default = 0)
    feed_notif = Column(Integer, default = 0)
    settings_notif = Column(Integer, default = 0)
    
    #Stripe Fields
    customer_id = Column(String)
    customer_last4 = Column(String(4))
    recipient_id = Column(String)
    
    outgoing_requests = relationship('Request', 
        secondary = student_request_table,
        )
    incoming_requests_to_tutor = relationship('Request', 
        secondary = tutor_request_table,
        backref = backref('users', lazy='dynamic')
        )
    incoming_requests_from_tutors = relationship('Request', 
        secondary = committed_tutor_request_table,
        )
    skills = relationship("Skill",
        secondary = user_skill_table,
        backref = backref('users', lazy='dynamic')
        )
    student_ratings = relationship('Rating',
        secondary = student_rating_table,
        )
    tutor_ratings = relationship('Rating',
        secondary = tutor_rating_table,
        )
    pending_ratings = relationship('Rating',
        secondary = pending_rating_table,
        )
    mailbox = relationship("Mailbox",
        uselist = False,
        backref = backref("user", uselist = False))
    payments = relationship("Payment",
        secondary = user_payment_table
        )
    notifications = relationship("Notification",
        secondary = user_notification_table)

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

    def calc_avg_ratings(self):
        rating_sum = 0.0
        for rating in self.tutor_ratings:
            rating_sum += rating.tutor_rating
        return rating_sum / len(self.tutor_rating)

    def __repr__(self):
        return "<Name: %s, Email: %s, Phone: %s, Date: %s>" % (self.name, self.email,\
            str(self.phone_number), self.time_created.strftime('%b %d,%Y'))

class Mailbox(Base):
    __tablename__ = 'mailbox'
    id = Column(Integer, ForeignKey('user.id'), primary_key = True)

    def new_conversation(self, skill, guru, student):
        assert guru.id != student.id, \
            'guru and student must be different users'
        assert self.user in [guru, student], \
            'conversation must include a user of this mailbox'
        return Conversation(skill, guru, student)

    def __init__(self, user):
        self.id = user.id
        self.user = user

    def __repr__(self):
        return "<Mailbox for '%r'>" % (self.id)

class Conversation(Base):
    __tablename__ = 'conversation'
    id = Column(Integer, primary_key = True)


    skill_id = Column(Integer, ForeignKey('skill.id'))
    skill = relationship("Skill",
        uselist = False,
        primaryjoin = "Skill.id == Conversation.skill_id",
        backref = "conversations")

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User", 
        uselist = False, 
        primaryjoin = "User.id == Conversation.guru_id",
        backref = "guru_conversations")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User", 
        uselist = False, 
        primaryjoin = "User.id == Conversation.student_id",
        backref = "student_conversations")

    requests = relationship("Request",
        secondary = request_conversation_table)

    users = relationship("User",
        secondary = user_conversation_table,
        backref = "conversations")
    mailboxes = relationship("Mailbox",
        secondary = mailbox_conversation_table,
        backref = "conversations")

    def new_message(self, contents, sender, reciever):
        assert sender != reciever, \
            'sender and reciever must be different users'
        assert sender in [self.guru, self.student] or \
            reciever in [self.guru, self.student], \
            'sender or reciever must be in this conversation'
        return Message(contents, self, sender, reciever)

    def __init__(self, skill, guru, student):
        self.skill = skill
        self.skill_id = skill.id
        self.guru = guru
        self.guru_id = guru.id
        self.student = student
        self.student_id = student.id
        self.users.append(guru)
        self.users.append(student)
        self.mailboxes.append(guru.mailbox)
        self.mailboxes.append(student.mailbox)

    def __repr__(self):
        return "<Conversation between '%r' and '%r' about '%r'>" %\
              (self.guru_id, self.student_id, self.skill_id)

class Message(Base):
    __tablename__ = 'message'
    id = Column(Integer, primary_key = True)
    contents = Column(Unicode(1000))

    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User",
        primaryjoin = 'Message.sender_id == User.id',
        backref = "sent_messages")
    write_time = Column(DateTime)

    reciever_id = Column(Integer, ForeignKey('user.id'))
    reciever = relationship("User",
        primaryjoin = 'Message.reciever_id == User.id',
        backref = "recieved_messages")
    read_time = Column(DateTime)

    conversation_id = Column(Integer, ForeignKey('conversation.id'))
    conversation = relationship("Conversation",
        uselist = False,
        primaryjoin = 'Message.conversation_id == Conversation.id',
        backref = "messages")

    mailboxes = relationship("Mailbox", 
        secondary = mailbox_message_table,
        backref = "messages")
    users = relationship("User",
        secondary = user_message_table,
        backref = "messages")

    def __init__(self, contents, conversation, sender, reciever):
        self.contents = contents
        assert sender.id != reciever.id, 'sender and reciever must be different'
        self.sender = sender
        self.sender_id = sender.id
        self.reciever = reciever
        self.reciever_id = reciever.id
        self.conversation = conversation
        self.conversation_id = conversation.id
        self.write_time = datetime.now()
        self.users.append(sender)
        self.users.append(reciever)
        self.mailboxes.append(sender.mailbox)
        self.mailboxes.append(reciever.mailbox)

    def __str__(self):
        return self.contents

    def __repr__(self):
        return "<Message from '%r' to '%r' at '%s'>" %\
            (self.sender_id, self.reciever_id, str(self.write_time))

class Notification(Base):
    __tablename__ = 'notification'    
    id = Column(Integer, primary_key = True)
    feed_id = Column(Integer)
    
    request_id = Column(Integer)        
    request_tutor_amount_hourly = Column(Float)
    request_tutor_id = Column(Float)
    skill_name = Column(String)
    custom = Column(String(1000))
    custom_tag = Column(String)
    
    time_created = Column(DateTime)
    time_read = Column(DateTime) #Set to now if it doesn't need to be read
    
    feed_message = Column(String(1000))
    feed_message_subtitle = Column(String(1000))
    
    payment_id = Column(Integer)
    rating_id = Column(Integer)
    a_id_name = Column(String) #div to display
    image_url = Column(String)
    status = Column(String)

    def __init__(self, **kwargs):
        request = kwargs.get('request')
        payment = kwargs.get('payment')
        rating = kwargs.get('rating')
        other = kwargs.get('other')
        self.time_created = datetime.now()
        assert bool(request) ^ bool(payment) ^ bool(rating) ^ bool(other), \
        'kwargs must specify *either* a request, payment or a rating'
        
        if request:
            self.request_id = request.id
        if payment:
            self.payment_id = payment.id
        if rating:
            self.rating_id = rating.id
        if other:
            self.custom = other


class Tag(Base):
    __tablename__ = 'tag'
    name = Column(String(16))

    message_id = Column(Integer, 
        ForeignKey('message.id'), 
        primary_key = True, 
        default = 0)
    message = relationship("Message",
        uselist = False,
        primaryjoin = 'Tag.message_id == Message.id',
        backref = "tags")

    conversation_id = Column(Integer, 
        ForeignKey('conversation.id'), 
        primary_key = True,
        default = 0)
    conversation = relationship("Conversation",
        uselist = False,
        primaryjoin = 'Tag.conversation_id == Conversation.id',
        backref = "tags")

    def __init__(self, name, **kwargs):
        message = kwargs.get('message')
        conversation = kwargs.get('conversation')
        assert bool(message) ^ bool(conversation), \
            'kwargs must specify *either* a message or a conversation'
        self.name = name
        if message:
            self.message = message
            self.message_id = message.id
        elif conversation:
            self.conversation = conversation
            self.conversation_id = conversation.id

    def __repr__(self):
        return "<Tag %r>" % (self.name)


class Payment(Base):
    __tablename__ = 'payment'
    id = Column(Integer, primary_key = True)
    student_id = Column(Integer)
    tutor_id = Column(Integer)
    request_id = Column(Integer)
    skill_id = Column(Integer)    
    time_amount = Column(Integer)
    tutor_rate = Column(Float)
    student_paid_amount = Column(Float)
    tutor_received_amount = Column(Float)
    time_created = Column(DateTime)
    stripe_charge_id = Column(String)
    stripe_recipient_id = Column(String)

    def __init__(self, request):
        self.student_id = request.student_id
        self.skill_id = request.skill_id
        self.tutor_id = request.connected_tutor_id
        self.time_amount = request.actual_time
        self.tutor_rate = request.actual_hourly
        self.time_created = datetime.now()

    def __repr__(self):
        student_name = User.query.get(self.student_id).name
        skill_name = Skill.query.get(self.skill_id).name
        tutor_name = User.query.get(self.tutor_id).name
        
        # if self.connected_tutor_id: 
        #     tutor_name = User.query.filter_by(id=self.connected_tutor_id)\
        #     .first().name
        # else:
        #     tutor_name = "Inactive"
        
        return "PAYMENT: %s <Student: %s, Tutor: %s, Skill: %s,\
        \n Time Created: %s, Time Estimated: %s hours>" %\
        (str(self.id), student_name, tutor_name, skill_name, \
            self.time_created.strftime('%b %d,%Y'), self.time_amount)


class Request(Base):
    __tablename__ = 'request'
    id = Column(Integer, primary_key = True)
    
    student_id = Column(Integer) 
    skill_id = Column(Integer)
    connected_tutor_id = Column(Integer) #Request is active if null
    connected_tutor_hourly = Column(Float)
    student_secret_code = Column(String)
    
    student_estimated_hour = Column(Integer)
    num_students = Column(Integer, default = 0)
    tutor_offer_hour = Column(Integer)

    description = Column(String)
    available_time = Column(String)
    location = Column(String)


    urgency = Column(SmallInteger)
    frequency = Column(SmallInteger) # 0 is once, 1 is regular TO DROP
    time_estimate = Column(Float)
    time_created = Column(DateTime)
    time_connected = Column(DateTime)
    payment_id = Column(Integer)
    estimated_hourly = Column(Float) #TO DROP
    actual_hourly = Column(Float) 
    actual_time = Column(Float)

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

