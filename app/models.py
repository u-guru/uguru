from sqlalchemy import String, Integer, Column, ForeignKey, Float, SmallInteger, Boolean, Table, Unicode, DateTime
from flask import url_for
from sqlalchemy.orm import relationship, backref
from app.database import Base, db_session
from datetime import datetime
import os

# TODO create __dict__ for popular objects

# many-to-many relation tables
user_skill_table = Table('user-skill_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('skill_id', Integer, ForeignKey('skill.id'))
)

user_text_table = Table('user-text_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('text_id', Integer, ForeignKey('text.id'))
    )

user_promo_table = Table('user-promo_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('promo_id', Integer, ForeignKey('promo.id'))
    )

week_ranges_table = Table('week-ranges_assoc',
    Base.metadata,
    Column('week_id', Integer, ForeignKey('week.id')),
    Column('range_id', Integer, ForeignKey('range.id'))
)

request_weeks_table = Table('request-weeks_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('week_id', Integer, ForeignKey('week.id'))
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

user_email_table = Table('user-email_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('email_id', Integer, ForeignKey('email.id'))
)

request_email_table = Table('request-email_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('email_id', Integer, ForeignKey('email.id'))
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
    parent_name = Column(String)
    parent_email = Column(String)
    if os.environ.get('TESTING'):
        email = Column(String(64))
    else:
        email = Column(String(64), index = True, unique = True)

    school_email = Column(String(64))
    password = Column(String(64))
    is_a_tutor = Column(Boolean, default = False)
    fb_account = Column(Boolean, default = False)
    phone_number = Column(String(64), unique = True)
    time_created = Column(DateTime)
    email_notification = Column(Boolean, default = True)
    text_notification = Column(Boolean, default = True)
    push_notification = Column(Boolean, default = True)
    profile_url = Column(String, default='/static/img/default-photo.jpg')
    tutor_introduction = Column(String(1000))
    qualifications = Column(String(5000))
    advertised_rate = Column(Float, default = 10.0)
    max_price = Column(Float, default = 15.0)
    discoverability = Column(Boolean, default = True)
    referral_code = Column(String)
    user_referral_code = Column(String)
    last_active = Column(DateTime)
    approved_by_admin = Column(Boolean)

    auth_token = Column(String(64))
    apn_token = Column(String(64))

    #Tutor fields
    verified_tutor = Column(Boolean)
    balance = Column(Float, default = 0.0)
    credit = Column(Float, default = 0.0)
    pending = Column(Float, default = 0.0)
    total_earned = Column(Float, default = 0.0)
    discoverability = Column(Boolean, default = True)
    major = Column(String)
    year = Column(String)

    #Student Secret Codes
    secret_code = Column(String)

    previous_tutor = Column(Boolean, default = False)
    slc_tutor = Column(Boolean, default = False)
    hkn_tutor = Column(Boolean, default = False)
    ta_tutor = Column(Boolean, default = False)
    res_tutor = Column(Boolean, default = False)
    la_tutor = Column(Boolean, default = False)
    high_tutor = Column(Boolean, default = False)

    msg_notif = Column(Integer, default = 0)
    feed_notif = Column(Integer, default = 0)
    settings_notif = Column(Integer, default = 0)
    
    #Stripe Fields
    customer_id = Column(String)
    customer_last4 = Column(String(4))
    customer_card_type = Column(String(4))
    recipient_id = Column(String)
    recipient_last4 = Column(String(4))
    recipient_card_type = Column(String(4))
    
    outgoing_requests = relationship('Request', 
        secondary = student_request_table)
    incoming_requests_to_tutor = relationship('Request', 
        secondary = tutor_request_table,
        backref = backref('users', lazy='dynamic'))
    incoming_requests_from_tutors = relationship('Request', 
        secondary = committed_tutor_request_table)
    skills = relationship("Skill",
        secondary = user_skill_table,
        backref = backref('users', lazy='dynamic'))
    student_ratings = relationship('Rating',
        secondary = student_rating_table)
    tutor_ratings = relationship('Rating',
        secondary = tutor_rating_table)
    pending_ratings = relationship('Rating',
        secondary = pending_rating_table)
    mailbox = relationship("Mailbox",
        uselist = False,
        backref = backref("user", uselist = False))
    payments = relationship("Payment",
        secondary = user_payment_table)
    notifications = relationship("Notification",
        secondary = user_notification_table)
    emails = relationship("Email",
        secondary = user_email_table)
    promos = relationship("Promo",
        secondary = user_promo_table)
    texts = relationship("Text",
        secondary = user_text_table)


    def __init__(self, name = None, email = None, password = None, phone_number = None, is_a_tutor = None):
        self.name = name
        self.email = email
        self.password = password
        self.phone_number = phone_number
        self.time_created = datetime.now()
        self.last_active = datetime.now()

    def __repr__(self):
        return "<User " + str(self.id) + " " + str(self.name) + " " + str(self.email) + ">"

    
    # Returns [] if doesn't exist, otherwise User Object
    @staticmethod
    def does_email_exist(email):
        user = User.query.filter_by(email=email).first()
        return user


    @staticmethod
    def encrypted_password(password):
        from hashlib import md5
        return md5(password).hexdigest()

    @staticmethod
    def create_user(name, email, password):
        from datetime import datetime
        encrypted_password = User.encrypted_password(password)
        user = User(name=name, email=email, password=encrypted_password)

        try: 
            db_session.add(user)
            db_session.commit()
        except:
            db_session.rollback()
            raise 

        #TODO: Remove this later, I don't know why this prevents me from creating messages/
        user_mailbox = Mailbox(user)

        try: 
            db_session.add(user_mailbox)
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return user

    @staticmethod
    def login_user(email, password):
        encrypted_password = User.encrypted_password(password)
        user = User.query.filter_by(email=email, password=encrypted_password).first()
        return user

    @staticmethod
    def get_user(_id = None, _email = None):
        if _id:
            return User.query.get(_id)

    #TODO: Add more as needed
    def as_dict(self):
        u_dict = {
            'server_id': self.id,
            'name': self.get_first_name(),
            'profile_url': self.profile_url,
        }
        return u_dict

    def get_all_conversations(self, _dict=None):
        conversations = self.conversations
        if _dict:
            conversations = {
                'conversations': [conversation.as_dict() for conversation in conversations]
            }

        return conversations

    def authenticate(self):
        from flask import session
        session['user_id'] = self.id

    def logout_user(self):
        from flask import session
        session.pop('user_id')
    
    def get_first_name(self):
        return self.name.split(' ')[0].title()

    def calc_avg_ratings(self):
        rating_sum = 0.0
        for rating in self.tutor_ratings:
            rating_sum += rating.tutor_rating
        return rating_sum / len(self.tutor_rating)

    def add_skill(self, skill):
        self.skills.append(skill)
        try: 
            db_session.commit()
        except:
            db_session.rollback()
            raise 

    def add_request_to_pending_requests(self, _request):
        self.outgoing_requests.append(_request)
        try: 
            db_session.commit()
        except:
            db_session.rollback()
            raise 

    # Active requests is not expired, or not canceled (yet), or not matched.
    def get_pending_requests(self):
        return self.outgoing_requests

    #returns ten most recent notifications
    def get_recent_notifications(self):
        notifications = sorted(self.notifications, key=lambda n:n.id, reverse=True)[:10]
        return notifications

    def already_has_pending_request_for_skill(self, skill):
        pending_requests = self.get_pending_requests()
        if not pending_requests:
            return False
        pending_requests_skill_ids = [_request.skill_id for _request in pending_requests]
        if skill.id in pending_requests_skill_ids:
            return True
        

    #return all notifications
    def get_all_notifications(self):
        notifications = sorted(self.notifications, key=lambda n:n.id, reverse=True)
        return notifications

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

    is_read = Column(Boolean, default = False)
    is_active = Column(Boolean)
    last_updated = Column(DateTime)
    
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

    @staticmethod
    def create_conversation(skill, guru, student):
        conversation = Conversation(skill, guru, student)
        try:
            db_session.add(conversation)
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return conversation

    @staticmethod
    def get_conversation(_id):
        return Conversation.query.get(_id)

    def get_all_messages(self, _dict=False, sorted_by_time=False):
        messages = self.messages

        if sorted_by_time:
            messages = sorted(messages, key=lambda m:m.time_created)

        if _dict:
            messages = {
                'messages': [message.as_dict() for message in messages]
            }

        return messages


    #TODO: Return more relevant keys, like last message time.
    def as_dict(self):
        c_dict = {
            'server_id': self.id,
            'student': self.student.as_dict(),
            'tutor': self.guru.as_dict(),
            'is_active': self.is_active,
            'message_count': len(self.messages),
        }
        return c_dict

    def __init__(self, skill, guru, student):
        self.skill = skill
        self.skill_id = skill.id
        self.guru = guru
        self.is_active = False
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

    @staticmethod
    def create_message(contents, conversation, sender):
        if sender == conversation.student:
            receiver = conversation.guru
        else:
            receiver = conversation.student
        message = Message(contents, conversation, sender, receiver)
        try: 
            db_session.add(message)
            db_session.commit()
        except:
            db_session.rollback()
            raise 
        return message

    def as_dict(self):
        from lib.utils import python_datetime_to_js_date
        m_dict = {
            'server_id': self.id,
            'contents': self.contents,
            'sender': self.sender.as_dict(),
            'receiver': self.reciever.as_dict(),
            'write_time': python_datetime_to_js_date(self.write_time)
        }
        return m_dict

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

    extra_detail = Column(String(2500))
    
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
    time_amount = Column(Float)
    tutor_rate = Column(Float)
    student_paid_amount = Column(Float)
    tutor_received_amount = Column(Float)
    time_created = Column(DateTime)
    stripe_charge_id = Column(String)
    stripe_recipient_id = Column(String)

    student_description = Column(String)
    tutor_description = Column(String)
    tutor_confirmed = Column(Boolean)
    student_confirmed = Column(Boolean)
    confirmed_time_amount = Column(Float)
    confirmed_tutor_rate = Column(Float)
    confirmed_payment_id = Column(Integer)
    flag = Column(Boolean)
    refunded = Column(Boolean)
    status = Column(String)
    credits_used = Column(Integer)


    def __init__(self, request_id = None):
        if request_id:
            request = Request.query.get(request_id)
            self.student_id = request.student_id
            self.skill_id = request.skill_id
            self.tutor_id = request.connected_tutor_id
            self.time_amount = request.actual_time
            self.tutor_rate = request.actual_hourly
            self.time_created = datetime.now()

class Request(Base):
    __tablename__ = 'request'
    id = Column(Integer, primary_key = True)
    
    student_id = Column(Integer) 
    skill_id = Column(Integer)
    connected_tutor_id = Column(Integer) #Request is active if null
    connected_tutor_hourly = Column(Float)
    student_secret_code = Column(String)
    
    professor = Column(String)
    student_estimated_hour = Column(Integer)
    num_students = Column(Integer, default = 0)
    tutor_offer_hour = Column(Integer)

    description = Column(String)
    available_time = Column(String)
    location = Column(String)
    last_updated = Column(DateTime)
    start_time = Column(DateTime) #New
    remote = Column(Boolean) #Video-chat friendly

    cancellation_reason = Column(String)

    is_expired = Column(Boolean, default=False)
    urgency = Column(SmallInteger)
    frequency = Column(SmallInteger) # 0 is once, 1 is regular TO DROP
    time_estimate = Column(Float)
    time_created = Column(DateTime)
    time_connected = Column(DateTime)
    payment_id = Column(Integer)
    estimated_hourly = Column(Float) #TO DROP
    actual_hourly = Column(Float) 
    actual_time = Column(Float)

    weekly_availability = relationship('Week',
        secondary = request_weeks_table,
        backref='request', lazy='dynamic')

    requested_tutors = relationship('User', 
        secondary = tutor_request_table,
        backref = backref('requests', lazy='dynamic')
        )
 
    committed_tutors = relationship('User',
        secondary = committed_tutor_request_table,
        backref = backref('committed_requests', lazy='dynamic'))

    emails = relationship("Email",
        secondary = request_email_table)

    #TODO: make sure student_id doesn't already have a request for that skill_id

    def __init__(self, student_id, skill_id, description, time_estimate, \
        phone_number, location=None, remote=None, urgency=None, start_time=None):
        self.student_id = student_id
        self.skill_id = skill_id
        self.description = description
        self.urgency = urgency
        self.time_estimate = time_estimate
        self.time_created = datetime.now()
        self.start_time = start_time
        self.remote = remote
        self.location = location
        self.phone_number = phone_number
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

    def get_return_dict(self, skill=None, student=None, tutor=None):
        from lib.requests import request_obj_to_dict

        if not skill:
            skill = Skill.query.get(self.skill_id)
        if not student:
            student = User.query.get(self.student_id)
        if self.connected_tutor_id:
            tutor = User.query.get(self.connected_tutor_id)
        
        return request_obj_to_dict(self, skill, student, tutor)

    def get_tutor_count(self):
        return len(self.requested_tutors)

    def is_tutor_active(self, tutor):
        approved_tutors = self.approved_tutors()
        if tutor not in approved_tutors:
            return False
        else:
            return True

    def process_student_acceptance(self, tutor):
        from datetime import datetime
        
        #Update time connected and everything
        self.time_connected = datetime.now()
        self.connected_tutor_id = tutor.id

        student = User.get_user(self.student_id)
        skill = Skill.query.get(self.skill_id)

        #Create conversation
        conversation = Conversation.create_conversation(skill, tutor, student)
        conversation.requests.append(self)
        conversation.last_updated = datetime.now()

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def process_tutor_acceptance(self, tutor):
        self.committed_tutors.append(tutor)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    #TODO, we don't do anything yet, but we will in the near future.
    def process_tutor_reject(self,tutor):
        pass

    #TODO, we don't do anything yet, but we will in the near future.
    def process_tutor_reject(self,tutor):
        pass

    def get_interested_tutors(self):
        return self.committed_tutors

    def approved_tutors(self):
        from lib.requests import approved_tutors
        return approved_tutors(self)

    def approved_tutor_ids(self):
        tutor_ids = [tutor.id for tutor in self.approved_tutors()]
        return tutor_ids

    def get_student(self):
        return User.query.get(self.student_id)

    def get_connected_tutor(self):
        return User.query.get(self.connected_tutor_id)

    def is_canceled(self):
        return self.connected_tutor_id == self.student_id

    def get_status(self):
        if not self.connected_tutor_id:
            return 'pending'
        elif self.is_canceled():
            return 'canceled'
        else:
            return 'matched'
        
    @staticmethod
    def get_request_by_id(request_id):
        return Request.query.get(request_id)
    
    @staticmethod
    def create_request(student, skill_id, description, time_estimate, \
        phone_number, location, remote=None, urgency=None, start_time=None):
        
        #Convert from JS Date to Python Datetime
        from lib.utils import js_date_to_python_datetime
        start_time = js_date_to_python_datetime(start_time)

        _request = Request(
                student_id = student.id,
                skill_id = skill_id,
                description = description,
                time_estimate = time_estimate,
                phone_number = phone_number,
                location = location,
                remote = remote,
                urgency = urgency,
                start_time = start_time
            )

        try: 
            db_session.add(_request)
            db_session.commit()
        except:
            db_session.rollback()
            raise 

        return _request



    def convert_urgency_to_str(self, number):
        if number == 0:
            return "ASAP"
        if number == 1:
            return "by tomorrow"
        if number == 2:
            return "sometime this week"

    def generate_url(self):
        return url_for('confirm_tutor_interest', request_id=self.id, _external=True)


class Email(Base):
    __tablename__ = 'email'
    id = Column(Integer, primary_key = True)
    tag = Column(String)
    user_id = Column(Integer)
    time_created = Column(DateTime)
    mandrill_id = Column(String)

class Range(Base):
    __tablename__ = 'range'
    id = Column(Integer, primary_key = True)
    start_time = Column(SmallInteger) #0-23 hours of the day
    end_time = Column(SmallInteger) #0-23 hours of the day
    week_day = Column(SmallInteger) #0-6 days of the week

class Promo(Base):
    __tablename__ = 'promo'
    id = Column(Integer, primary_key = True)
    tag = Column(String)
    time_used = Column(DateTime)
    future_time_used = Column(DateTime)
    sender_id = Column(Integer)
    receiver_id = Column(Integer)

class Text(Base):
    __tablename__ = 'text'
    id = Column(Integer, primary_key = True)
    sid = Column(String)
    to_phone = Column(String)
    from_phone = Column(String)
    body = Column(Unicode(1600))
    status = Column(String)
    date_created = Column(DateTime)
    date_sent = Column(DateTime)
    date_updated = Column(DateTime)
    flags = Column(String)
    price = Column(String)
    uri = Column(String)
    account_sid = Column(String)


class Week(Base):
    __tablename__ = 'week'
    id = Column(Integer, primary_key = True)
    owner = Column(SmallInteger) #0 if student, 1 if tutor
    ranges = relationship('Range',
        secondary = week_ranges_table,
        backref = backref('week', lazy='dynamic')
        )

class Skill(Base):
    __tablename__ = 'skill'
    id = Column(Integer, primary_key = True)
    name = Column(Unicode(64))
    time_created = Column(DateTime)
    is_course = Column(Boolean, default = False)

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

    @staticmethod
    def get_skill_from_name(skill_name):
        #TODO: Organize skills in next iteration of Data Model
        from static.data.variations import courses_dict
        skill_id = courses_dict.get(skill_name.lower())
        if skill_id:
            skill = Skill.query.get(skill_id)
            return skill
        return False



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

    def __init__(self, request_id=None):
        if request_id:
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

class Unsubscribe(Base):
    __tablename__ = 'unsubscribe'
    id = Column(Integer, primary_key = True)
    email = Column(String)
    tag = Column(String)
    campaign = Column(String)
    time_created = Column(DateTime)


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
