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

user_campaign_table = Table('user-campaign_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('campaign_id', Integer, ForeignKey('campaign.id'))
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
    password = Column(String)

    auth_token = Column(String)

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
    guru_mode = Column(Boolean, default = False)
    guru_discoverability = Column(Boolean, default = True)
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

    campaigns = relationship("Campaign",
        secondary = user_campaign_table,
        backref = "users"
        )


    #user hardware permissions
    location_services_enabled = Column(Boolean)
    push_notifications_enabled = Column(Boolean)

    #user notifications
    push_notifications = Column(Boolean, default = False)
    email_notifications = Column(Boolean, default = True)


    phone_number = Column(String)
    phone_number_confirmed = Column(Boolean)
    lower_pay_rate = Column(Float)
    upper_pay_rate = Column(Float)

    recent_latitude = Column(Float)
    recent_longitude = Column(Float)
    last_gps_activity = Column(DateTime)

    #Terms of service
    tos_version = Column(Integer)
    tos_signed_date = Column(DateTime)

    guru_score = Column(Float)
    referral_link = Column(String)

    deactivated = Column(Boolean, default=False)

    last_position = relationship("Position", uselist=False)

    def __init__(self, name=None, email=None, profile_url=None, \
        fb_id=None, password=None, gender=None):

        if not email: email = ''

        self.email = email
        self.name = name
        self.profile_url = profile_url
        self.fb_id = fb_id
        self.gender = gender
        self.password = password
        self.time_created = datetime.now()
        self.last_active = datetime.now()

        db_session.add(self)
        db_session.commit()

    def create_password(self, password):
        self.password = flask_bcrypt.generate_password_hash(password)
        db_session.commit()
        return self.password

    def request_active(self, course_id):
        for _request in self.requests:
            if _request.course_id == course_id and _request.is_active():
                return True
        return False

    def __repr__(self):
        return "<User '%r', '%r', '%r'>" %\
              (self.id, self.name, self.email)

class University(Base):
    __tablename__  = 'university'
    id = Column(Integer, primary_key=True)


    name = Column(String)
    short_name = Column(String)
    state = Column(String)
    city = Column(String)
    address = Column(String)
    website = Column(String)
    domain = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    population = Column(Integer)
    city_short = Column(String)
    state_short = Column(String)
    zip_code = Column(Integer)
    logo_url = Column(String)
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

    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer)

    num_courses = Column(Integer)
    num_students = Column(Integer)
    num_gurus = Column(Integer)
    num_majors = Column(Integer)
    num_emails = Column(Integer)

    # User contributed university
    def __init__(self, name=None, user_id=None, _id=None):
        if _id:
            self.id = _id
        self.name = name
        self.last_updated = datetime.now()
        self.contributed_user_id = user_id

        db_session.add(self)
        db_session.commit()

    @staticmethod
    def admin_create(args_dict, _id):
        u = University.admin_update(University(_id=_id), args_dict)
        return u

    @staticmethod
    def admin_update(u, args):

        u.name = args.get('title')
        # u.population = int(''.join(args.get('population').split(',')))
        # u.logo_url = args.get('logo_url')
        u.last_updated = datetime.now()
        u.city = args.get('city')
        u.state = args.get('state')
        u.admin_approved = True

        # if args.get('location'):
        #     u.address = args.get('location').get('full_address')
        #     u.state = args.get('location').get('state')
        #     u.short_state = args.get('location').get('state_short')
        #     u.city = args.get('location').get('city')
        #     u.city_short = args.get('location').get('city_short')
        #     u.latitude = args.get('location').get('latitude')
        #     u.longitude = args.get('location').get('longitude')
        #     u.latitude = args.get('location').get('latitude')
        #     if args.get('location').get('zip_code'):
        #         u.zip_code = int(args.get('location').get('zip_code').split("-")[0])

        db_session.commit()

        return u


    def __repr__(self):
        return str(
            {
                'id':self.id,
                'name':self.name,
                'state':self.state,
                'city':self.city,
            })



class Major(Base):
    __tablename__ = 'major'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    time_added = Column(DateTime)

    #Id of user that suggested this major
    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer, ForeignKey('user.id'))


    def __init__(self, name=None, admin_approved=False, \
        contributed_user_id=None, _id=None):
        if _id:
            self.id = _id
        self.name = name
        self.time_added = datetime.now()
        self.admin_approved = admin_approved
        self.contributed_user_id = contributed_user_id
        # db_session.add(self)

    def __repr__(self):
        return "<Major '%r', '%r'>" %\
              (self.id, self.name)

    @staticmethod
    def admin_create(name, _id=None):
        if _id:
            m = Major(_id=_id)
        else:
            m = Major()
        m.name = name
        m.admin_approved = True

        # db_session.commit()
        return m

    @staticmethod
    def user_create(name, contributed_user_id):
        c = Major(name=name,contributed_user_id=contributed_user_id)
        db_session.add(c)
        db_session.commit()
        return c


class Support(Base):
    __tablename__ = 'support'
    id = Column(Integer, primary_key=True)
    message = Column(String)
    user_id = Column(Integer, ForeignKey('user.id'))
    rating_id = Column(Integer, ForeignKey('rating.id'))
    time_created = Column(DateTime)
    time_resolved = Column(DateTime)

    def __init__(self, user_id, message):
        self.user_id = user_id
        self.time_created = datetime.now()
        self.message = message

class Department(Base):
    __tablename__ = "department"

    id = Column(Integer, primary_key=True)

    code = Column(String)
    title = Column(String)

    university_id = Column(Integer, ForeignKey('university.id'))
    university  = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Department.university_id",
        backref = "departments"
    )


class Campaign(Base):
    __tablename__ = 'campaign'
    id = Column(Integer, primary_key=True)
    # time_uploaded = Column(DateTime)
    time_scheduled = Column(DateTime)
    time_created = Column(DateTime)
    name = Column(String)

    important = Column(Boolean)
    track_opens = Column(Boolean)
    track_clicks = Column(Boolean)
    subject = Column(String)
    sender_email = Column(String)
    sender_name = Column(String)
    mandrill_template_id = Column(String)

    university_id = Column(Integer, ForeignKey('university.id'))
    university  = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Campaign.university_id",
        backref = "campaigns"
    )


class Position(Base):
    __tablename__ = 'position'
    id = Column(Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float) #TODO
    altitude = Column(Float)
    accuracy = Column(Float)
    altitude_accuracy = Column(Float)
    heading = Column(Float)
    speed = Column(Float)
    timestamp = Column(Float)

    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",
        uselist= False,
        primaryjoin = "User.id == Position.user_id",
        backref="positions"
    )

    session_id = Column(Integer, ForeignKey('session.id'))
    session = relationship("Session",
        uselist=False,
        primaryjoin = "Session.id == Position.session_id",
        backref="positions"
    )

    request_id = Column(Integer, ForeignKey("request.id"))

    @staticmethod
    def initFromJson(position_json):
        position = Position()
        position.latitute = position_json.get('latitude')
        position.longitude = position_json.get('longitude')
        position.altitude = position_json.get('altitude')
        position.accuracy = position_json.get('accuracy')
        position.altitude_accuracy = position_json.get('altitude_accuracy')
        position.heading = position_json.get('heading')
        position.speed = position_json.get('speed')
        position.timestamp = position_json.get('timestamp')
        db_session.add(position)
        db_session.commit()
        return position




class Request(Base):
    __tablename__ = 'request'

    PROCESSING_GURUS = 0
    STUDENT_RECEIVED_GURU = 1 #Guru accepted
    STUDENT_ACCEPTED_GURU = 2 #Best case
    STUDENT_CANCELED = 3
    GURU_CANCELED_SEARCHING_AGAIN = 4
    NO_GURUS_AVAILABLE = 4

    GURU_CANCEL_SESSION = 5
    STUDENT_RATED = 6
    GURU_RATED = 7
    BOTH_RATED = 8
    STUDENT_REFUND = 9
    GURU_NO_SHOW = 10
    STUDENT_NO_SHOW = 11

    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    description= Column(String)
    status = Column(Integer, default = 0) #0 = pending, # 1 = matched, # 2 = canceled, # 3 = expired
    position = relationship("Position", uselist=False, backref="request")

    in_person = Column(Boolean)
    online = Column(Boolean)
    time_estimate = Column(Integer)

    course_id = Column(Integer, ForeignKey('course.id'))
    course = relationship("Course",
        uselist=False,
        primaryjoin = "Course.id == Request.course_id",
        backref="requests"
    )

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        uselist=False,
        primaryjoin = "User.id == Request.student_id",
        backref="requests"
    )

    guru = relationship("User", uselist=False)

    def process_proposal(self, proposal_json):
        self.status = proposal_json.get('status')
        db_session.commit()
        return self

    def is_active(self):
        if self.status == 0 or self.status == 1:
            return True
        return False


class Proposal(Base):
    __tablename__ = 'proposal'
    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_updated = Column(DateTime)

    request_id = Column(Integer, ForeignKey('request.id'))
    request = relationship("Request",
        uselist=False,
        primaryjoin = "Request.id == Proposal.request_id",
        backref="proposals"
    )

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        uselist=False,
        primaryjoin = "User.id == Proposal.guru_id",
        backref="proposals"
    )
    guru_rank = Column(Integer)
    status = Column(Integer) # Active, expired, guru_accepted, guru_rejected, student_rejected

class File(Base):
    __tablename__ = 'file'
    id = Column(Integer, primary_key=True)

    description = Column(String)
    url = Column(String)
    _type = Column(String)
    size = Column(String)
    time_created = Column(String)
    time_updated = Column(String)
    name = Column(String)

    request_id = Column(Integer, ForeignKey("request.id"))
    request = relationship("Request",
        uselist = False,
        primaryjoin = "Request.id == File.request_id",
        backref = "files"
    )

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User",
        uselist = False,
        primaryjoin="User.id == File.user_id",
        backref= "files")

    relationship_id = Column(Integer, ForeignKey("relationship.id"))
    _relationship = relationship("Relationship",
        uselist = False,
        primaryjoin="Relationship.id == File.relationship_id",
        backref= "files")

    message_id = Column(Integer, ForeignKey("message.id"))

    @staticmethod
    def initFromJson(file_json):
        _file = File()
        _file.time_created = datetime.now()
        _file.url = file_json.get('url')
        _file._type = file_json.get('type')
        _file.size = file_json.get('size')
        _file.name = file_json.get('name')
        db_session.add(_file)
        db_session.commit()
        return _file


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    time_created = Column(DateTime)
    description = Column(DateTime)

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Event.user_id",
        backref = "events"
    )

    session_id = Column(Integer, ForeignKey("session.id"))
    session = relationship("Session",
        uselist = False,
        primaryjoin = "Session.id == Event.session_id",
        backref = "events"
    )

    request_id = Column(Integer, ForeignKey("request.id"))
    request = relationship("Request",
        uselist = False,
        primaryjoin = "Request.id == Event.request_id",
        backref = "events"
    )

    proposal_id = Column(Integer, ForeignKey("proposal.id"))
    proposal = relationship("Proposal",
        uselist = False,
        primaryjoin = "Proposal.id == Event.proposal_id",
        backref = "events"
    )

    relationship_id = Column(Integer, ForeignKey("relationship.id"))
    _relationship = relationship("Relationship",
        uselist = False,
        primaryjoin = "Relationship.id == Event.relationship_id",
        backref = "events"
    )

    status = Column(Integer)

    @staticmethod
    def initFromDict(event_json):
        event = Event()
        event.time_created = datetime.now()
        event.description = event_json.get('description')
        event.user_id = event_json.get('user_id')
        event.session_id = event_json.get('session_id')
        event.request_id = event_json.get('request_id')
        event.proposal_id = event_json.get('proposal_id')
        event.relationship_id = event_json.get('relationship_id')
        db_session.add(event)
        return event

class Session(Base):
    __tablename__ = 'session'
    id = Column(Integer, primary_key=True)

    WAITING_GURU_REPLY = 0
    GURU_ON_WAY = 1
    GURU_START_SESSION = 2
    GURU_END_SESSION = 3
    STUDENT_CANCEL_SESSION = 4
    GURU_CANCEL_SESSION = 5
    STUDENT_RATED = 6
    GURU_RATED = 7
    BOTH_RATED = 8
    STUDENT_REFUND = 9
    GURU_NO_SHOW = 10
    STUDENT_NO_SHOW = 11


    seconds = Column(Integer)
    minutes = Column(Integer)
    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Session.guru_id) & "\
                        "(User.is_a_guru==True)",
                        uselist=False,
                        backref="student_sessions")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Session.student_id) & "\
                        "(User.is_a_guru==False)",
                        uselist=False,
                        backref="guru_sessions")


    status = Column(Integer)

    guru_positions = relationship("Position",
        primaryjoin = "(Position.user_id == Session.guru_id) & "\
                        "(Session.id == Position.session_id)")

    student_positions = relationship("Position",
        primaryjoin = "(Position.user_id == Session.student_id) & "\
                        "(Session.id == Position.session_id)")

    # student_id = Column(Integer, ForeignKey('user.id'))
    # student = relationship("User",
    #     primaryjoin = "(User.id==Session.student_id) & "\
    #                     "(User.is_a_guru==False)",
    #                     uselist=False,
    #                     backref="sessions")

    relationship_id = Column(Integer, ForeignKey('relationship.id'))
    _relationship = relationship("Relationship",
        primaryjoin = "Relationship.id == Session.relationship_id",
                        uselist=False,
                        backref="sessions")

    rating_id = Column(Integer, ForeignKey("rating.id"))

    expiration_date = Column(DateTime) #TBD
    time_created = Column(DateTime)
    time_updated = Column(DateTime)

    displayed = Column(Boolean, default=True) #whether the user 'removed' this session

    @staticmethod
    def initFromJson(session_json):
        _session = Session()
        _session.seconds = session_json.get('seconds')
        _session.minutes = session_json.get('minutes')
        _session.guru_id = session_json.get('guru_id')
        _session.student_id = session_json.get('student_id')
        _session.status = session_json.get('status')
        _session.relationship_id = session_json.get('relationship_id')
        _session.expiration_date = session_json.get('expiration_date')
        _session.time_created = datetime.now()
        db_session.add(_session)
        db_session.commit()
        return _session


class Relationship(Base):
    __tablename__ = 'relationship'
    id = Column(Integer, primary_key=True)

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Relationship.guru_id) & "\
                        "(User.is_a_guru==True)",
                        uselist=False,
                        backref="student_relationships")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Relationship.student_id) & "\
                        "(User.is_a_guru==False)",
                        uselist=False,
                        backref="guru_relationships")

    @staticmethod
    def initFromSession(session):
        _relationship = Relationship()
        _relationship.guru_id = session.guru_id
        _relationship.student_id = session.student_id
        db_session.add(_relationship)
        db_session.commit()
        return _relationship



class Message(Base):
    __tablename__ = 'message'
    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_sent = Column(DateTime)
    time_seen = Column(DateTime)

    contents = Column(String)
    _type = Column(Integer, default = 0) #0, #1 = file


    relationship_id = Column(Integer, ForeignKey("relationship.id"))
    _relationship = relationship("Relationship",
        uselist = False,
        primaryjoin = "Relationship.id == Message.relationship_id",
        backref = "messages"
    )

    session_id = Column(Integer, ForeignKey("session.id"))
    session = relationship("Session",
        uselist = False,
        primaryjoin = "Session.id == Message.session_id",
        backref = "messages"
    )

    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User",
        primaryjoin = "(User.id==Message.sender_id)",
                        uselist=False)

    receiver_id = Column(Integer, ForeignKey('user.id'))
    receiver = relationship("User",
        primaryjoin="(User.id==Message.receiver_id)",
                        uselist=False)

    _file = relationship("File", uselist=False)

    @staticmethod
    def initFromJson(message_json):
        message = Message()
        message.time_created = datetime.now()
        message.time_sent = datetime.now()
        message.contents = message_json.get('contents')
        if message_json.get('type'):
            doNothing = False

        message.relationship_id = message_json.get('relationship_id')
        message.session_id = message_json.get('session_id')
        message.sender_id = message_json.get('sender_id')
        message.receiver_id = message_json.get('received_id')
        db_session.add(message)
        db_session.commit()


class Device(Base):
    __tablename__ = 'device'
    id = Column(Integer, primary_key=True)
    model = Column(String)
    cordova = Column(String)
    platform = Column(String)
    uuid = Column(String)
    version = Column(String)
    name = Column(String)

    time_created = Column(DateTime)
    last_accessed = Column(DateTime)

    user_id = Column(Integer, ForeignKey('user.id'))
    user  = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Device.user_id",
        backref = "devices"
    )

class Rating(Base):
    __tablename__ = 'rating'
    id = Column(Integer, primary_key=True)

    student_time_rated = Column(DateTime)
    guru_time_rated = Column(DateTime)

    student_rating = Column(Integer)
    guru_rating = Column(Integer)

    student_rating_description = Column(String)
    guru_rating_description = Column(String)

    support = relationship("Support", uselist=False, backref="rating")

    session = relationship("Session", uselist=False, backref="rating")


    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Rating.guru_id) & "\
                        "(User.is_a_guru==True)",
        uselist=False,
        backref="guru_ratings")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Rating.student_id) & "\
                        "(User.is_a_guru==False)",
        uselist=False,
        backref="student_ratings")

    @staticmethod
    def initFromSession(_session):
        rating = Rating()
        rating.guru_id = _session.guru_id
        rating.student_id = _session.student_id
        rating.session = _session
        db_session.add(_session)
        db_session.commit()
        return rating

class Batch(Base):
    __tablename__ = 'batch'
    id = Column(Integer, primary_key=True)
    name = Column(String)

    time_uploaded = Column(DateTime)
    time_sent = Column(DateTime)

    campaign_id = Column(Integer, ForeignKey('campaign.id'))
    campaign = relationship("Campaign",
        uselist = False,
        primaryjoin = "Campaign.id == Batch.campaign_id",
        backref = 'batches'
    )



class Recipient(Base):
    __tablename__ = 'recipient'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    fb_id = Column(String)

    time_sent = Column(DateTime)
    time_opened = Column(DateTime)

    # batch_id = Column(Integer, ForeignKey('batch.id'))
    # batch = relationship("Batch",
    #     uselist = False,
    #     primaryjoin = "Batch.id == Recipient.batch_id",
    #     backref = 'recipients'
    # )

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Recipient.university_id",
        backref = 'recipients'
    )
    admin_account = Column(Boolean, default = False)


class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)
    time_added = Column(DateTime)
    name = Column(String) #Usually department + course_number

    short_name = Column(String) #Casual shorted version that students use
    full_name = Column(String)

    department_id = ForeignKey("major.id")
    department_short = Column(String) #user generated
    department_long = Column(String)

    course_number = Column(String)
    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer, ForeignKey('user.id'))

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Course.university_id",
        backref = 'courses'
        )

    def __init__(self, name=None, university_id=None, admin_approved=False,\
        contributed_user_id=None, _id=None):
        if _id:
            self.id = _id
        self.name = name
        self.university_id = university_id
        self.admin_approved = admin_approved
        self.contributed_user_id = contributed_user_id
        # db_session.add(self)
        # db_session.commit()

    def __repr__(self):
        return "<Course '%r', '%r'>" %\
              (self.id, self.short_name)


    @staticmethod
    def admin_create(_id=None, department_short=None,
        department_long=None, course_number=None, full_name=None,\
        short_name = None):
        if _id:
            c = Course(_id=_id)
        else:
            c = Course()
        c.short_name = short_name
        c.full_name = full_name
        c.department_short = department_short
        c.department_long = department_long
        c.course_number = course_number
        c.admin_approved = True
        return c

    @staticmethod
    def user_create(name, university_id, contributed_user_id):
        c = Course(name=name, university_id=university_id\
            , contributed_user_id=contributed_user_id)
        return c


class Referral(Base):
    __tablename__ = 'referral'
    id = Column(Integer, primary_key=True)

    sender_id = Column(Integer, ForeignKey('user.id'))
    sender = relationship("User",
        primaryjoin = "User.id == Referral.sender_id",
        backref="referrals")

    receiver_id = Column(Integer, ForeignKey('user.id'))
    receiver = relationship("User",
        primaryjoin = "User.id == Referral.receiver_id")

    reward = Column(Float)
    details = Column(String)
    time_redeemed = Column(DateTime)

    def __init__(self, sender_id, receiver_id, ):

        self.sender_id = sender_id,
        self.received_id = receiver_id,
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


class Version(Base):
    __tablename__ = 'version'
    id = Column(Integer, primary_key=True)
    android = Column(Float)
    ios = Column(Float)
    ios_msg = Column(String)
    android_msg = Column(String)


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

    def __init__(self, user_id=None, card_last4=None, card_type=None,\
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

    @staticmethod
    def initFromJson(card_json):
        card = Card()
        card.stripe_recipient_id = card_json.get('stripe_recipient_id')
        card.stripe_customer_id = card_json.get('stripe_customer_id')
        card.card_last4 = card_json.get('card_last4')
        card.card_type = card_json.get('card_type')
        card.time_added = card_json.get('time_added')
        card.user_id = card_json.get('user').get('id')
        card.is_default = card_json.get('is_default')
        db_session.add(card)
        db_session.commit()
        return card

class Transaction(Base):
    __tablename__ = 'transaction'



    id = Column(Integer, primary_key=True)

    _type = Column(Integer) #session transaction, cashout transaction, credits purchase

    time_created = Column(DateTime)
    time_processed = Column(DateTime)
    time_disputed = Column(DateTime)
    time_refunded = Column(DateTime)

    deactivated = Column(Boolean, default=False)

    student_amount = Column(Float)
    guru_amount = Column(Float)
    stripe_amount = Column(Float)
    profit = Column(Float)

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Transaction.guru_id)",
                        uselist=False,
                        backref="guru_transactions")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Transaction.student_id)",
                        uselist=False,
                        backref="student_transactions")


    card_id = Column(Integer, ForeignKey('card.id'))
    card = relationship("Card",
        uselist = False,
        primaryjoin = "Card.id == Transaction.card_id",
        backref = 'transactions'
        )





