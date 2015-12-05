from sqlalchemy import String, Integer, Column, ForeignKey, Float, SmallInteger, Boolean, Table, Unicode, DateTime
from sqlalchemy.orm import relationship, backref
from app.database import Base, db_session
from datetime import datetime
import os

##
#### university --> departments
##### course DONE --> departments
##### course: source[string, default=chegg], variations, times_mentioned,
##### DONE department --> variations, name. abbreviation

from app import flask_bcrypt

####################
#Association Tables#
####################
guru_courses_table = Table('guru-course_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('course_id', Integer, ForeignKey('course.id'))
    )

user_department_table = Table('user-department_assoc',
    Base.metadata,
    Column('department_id', Integer, ForeignKey('department.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
    )

student_courses_table = Table('student-course_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('course_id', Integer, ForeignKey('course.id'))
    )

guru_languages_table = Table('guru-language_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('language_id', Integer, ForeignKey('language.id'))
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

guru_category_table = Table('user-category_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('category_id', Integer, ForeignKey('category.id'))
    )

guru_currency_table = Table('user-currency.id',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('currency_id', Integer, ForeignKey('currency.id'))
)

guru_subcategory_table = Table('user-subcategory_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('subcategory_id', Integer, ForeignKey('subcategory.id'))
    )

queue_guru_table = Table('guru-queue_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('queue_id', Integer, ForeignKey('queue.id'))
    )

request_tag_table = Table('request-tag_assoc',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('request.id')),
    Column('tag_id', Integer, ForeignKey('tag.id'))
    )

course_tag_table = Table('course-tag_assoc',
    Base.metadata,
    Column('course_id', Integer, ForeignKey('course.id')),
    Column('tag_id', Integer, ForeignKey('tag.id'))
    )

user_tag_table = Table('user-tag_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('tag_id', Integer, ForeignKey('tag.id')))

guru_skill_table = Table('user-skill_assoc',
    Base.metadata,
    Column('skill_id', Integer, ForeignKey('skill.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
    )

student_resource_table = Table('user-resource_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('resource_id', Integer, ForeignKey('resource.id')))

guru_resource_table = Table('guru-resource_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('resource_id', Integer, ForeignKey('resource.id'))
    )

resource_tag_table = Table('resource-tag_assoc',
    Base.metadata,
    Column('resource_id', Integer, ForeignKey('resource.id')),
    Column('tag_id', Integer, ForeignKey('tag.id')))

experience_portfolio_items_table = Table('experience-portfolio-items_assoc',
    Base.metadata,
    Column('portfolio_item_id', Integer, ForeignKey('portfolio_item.id')),
    Column('experience_id', Integer, ForeignKey('experience.id')))


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)

    #FB Login IDs
    name = Column(String)
    email = Column(String, unique=True, nullable=False)
    profile_url = Column(String, default="https://graph.facebook.com/10152573868267292/picture?width=100&height=100")


    #credibility confirmation
    school_email = Column(String)
    school_email_token = Column(String)
    school_email_confirmed = Column(Boolean, default = False)

    reset_password = Column(Boolean)



    #admin fields
    is_admin = Column(Boolean)
    is_support_admin = Column(Boolean)


    fb_id = Column(String)
    uber_id = Column(String)
    github_id = Column(String)
    linkedin_id = Column(String)
    instagram_id = Column(String)
    spotify_id = Column(String)

    gender = Column(String)
    password = Column(String)

    auth_token = Column(String)

    guru_deposit = Column(Boolean)

    #Last active time
    last_active = Column(DateTime)
    time_created = Column(DateTime)

    guru_profile_color = Column(String, default='shamrock')


    current_hourly = Column(Float, default= 10.0)
    max_hourly = Column(Float)

    uber_friendly = Column(Boolean)
    summer_15 = Column(Boolean)
    outside_university = Column(Boolean)

    #Student fields
    student_introduction = Column(String)
    student_courses = relationship("Course",
        secondary = student_courses_table,
        backref = backref('students', lazy='dynamic')
        )

    guru_skills = relationship("Skill",
        secondary = guru_skill_table,
        backref= backref('gurus', lazy='dynamic')
    )

    guru_languages = relationship("Language",
        secondary = guru_languages_table,
        backref= backref('gurus', lazy='dynamic')
    )

    guru_categories = relationship("Category",
        secondary = guru_category_table,
        backref= backref('gurus', lazy='dynamic')
    )

    guru_currencies = relationship("Currency",
        secondary = guru_currency_table,
        backref=backref('gurus', lazy='dynamic')
    )



    guru_subcategories = relationship("Subcategory",
        secondary = guru_subcategory_table,
        backref= backref('gurus', lazy='dynamic')
    )

    student_resources = relationship("Resource",
        secondary= student_resource_table,
        backref='students', lazy='dynamic')

    guru_resources = relationship("Resource",
        secondary= guru_resource_table,
        backref='gurus', lazy='dynamic')

    #Guru fields
    is_a_guru = Column(Boolean, default = False)
    guru_mode = Column(Boolean, default = False)
    is_activated = Column(Boolean, default = False)
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

    departments = relationship("Department",
        secondary = user_department_table,
        backref="users")

    campaigns = relationship("Campaign",
        secondary = user_campaign_table,
        backref = "users"
        )

    student_calendar_id = Column(Integer, ForeignKey('calendar.id'))
    student_calendar = relationship("Calendar",
        primaryjoin="Calendar.id==User.student_calendar_id",
        uselist=False)



    guru_calendar_id = Column(Integer, ForeignKey('calendar.id'))
    guru_calendar = relationship("Calendar",
        primaryjoin="Calendar.id==User.guru_calendar_id",
        uselist=False
        )

    current_device = relationship("Device", uselist=False)

    # conducted every night at midnight
    estimated_guru_score = Column(Integer)
    estimated_guru_rank = Column(Integer)
    estimated_guru_rank_last_updated = Column(DateTime)

    year = Column(String)
    major = Column(String)

    # conducted every night at midnight
    official_guru_score = Column(Integer)
    official_guru_rank = Column(Integer)
    official_guru_rank_last_updated = Column(DateTime)

    #user hardware permissions
    location_services_enabled = Column(Boolean)
    push_notifications_enabled = Column(Boolean)

    #user notifications
    push_notifications = Column(Boolean, default = False)
    email_notifications = Column(Boolean, default = True)
    text_notifications = Column(Boolean, default = False)

    debit_card_confirmed = Column(Boolean, default = False)
    tutoring_platforms_description = Column(String)
    tutoring_platforms_verified_by_admin = Column(Boolean, default=False)

    phone_number = Column(String)
    phone_number_confirmed = Column(Boolean, default = False)
    phone_number_token = Column(String)
    lower_pay_rate = Column(Float)
    upper_pay_rate = Column(Float)

    balance = Column(Float)
    total_earned = Column(Float, default = 0)
    total_cashed_out = Column(Float, default = 0)
    credits = Column(Float)



    recent_latitude = Column(Float)
    recent_longitude = Column(Float)
    last_gps_activity = Column(DateTime)

    #Terms of service
    tos_version = Column(Integer)
    tos_signed_date = Column(DateTime)

    guru_score = Column(Float)

    email_friendly = Column(Boolean, default = False)
    hangouts_friendly = Column(Boolean, default = False)
    skype_friendly = Column(Boolean, default = False)
    phone_friendly = Column(Boolean, default = False)
    facetime_friendly = Column(Boolean, default = False)
    messenger_friendly = Column(Boolean, default = False)
    person_friendly = Column(Boolean, default = False)
    text_friendly = Column(Boolean, default = False)

    #referral stuff
    referral_code = Column(String)
    profile_code = Column(String)

    #profile

    transcript_file = relationship("File", uselist=False)
    transcript_verified_by_admin = Column(Boolean, default = False)

    #referred_by
    referred_by_id = Column(Integer, ForeignKey('user.id'))
    referred_by = relationship("User", uselist=False, remote_side=[id])
    referral_limit = Column(Integer, default=5)
    first_degree_referrals = Column(Integer, default=0)
    second_degree_referrals = Column(Integer, default=0)

    deactivated = Column(Boolean, default=False)

    last_position = relationship("Position", uselist=False)



    guru_latest_time = Column(Integer)

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
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def reactivateUser(self):
        self.deactivated = False
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def getGuruCourses(self):
        return " ".join([course.short_name for course in self.guru_courses])

    def deactivateUser(self):
        self.deactivated = True
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def create_password(self, password):
        self.password = flask_bcrypt.generate_password_hash(password)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return self.password

    def num_payment_cards(self):
        count = 0
        for card in self.cards:
            if card.is_payment_card:
                count += 1
        return count




    def updateReferralCounts(self):
        if self.referrals:
            self.first_degree_referrals = len(self.referrals)
            second_degree_count = 0
            for referral in self.referrals:
                if referral.receiver:
                    second_degree_count += len(referral.receiver.referrals)
            self.second_degree_referrals =second_degree_count
        else:
            self.second_degree_referrals = 0
            self.first_degree_referrals = 0

        # update 2nd degree referrals for the guru who helped
        if self.referred_by and self.referred_by.referrals:
            self.referred_by.second_degree_referrals += 1


        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
    def num_transfer_cards(self):
        count = 0
        for card in self.cards:
            if card.is_transfer_card:
                count += 1
        return count

    def calculate_guru_rank_estimated(self):
        from app.lib.guru_rank import calculate_guru_score

        self.estimated_guru_rank = calculate_guru_score(user)
        self.estimated_guru_rank_last_updated = datetime.now()
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def get_payment_cards(self):
        return [card for card in self.cards if card.is_payment_card]

    def get_transfer_cards(self):
        return [card for card in self.cards if card.is_transfer_card]

    def request_active(self, course_id, _type):
        for _request in self.requests:
            if _request.course_id == course_id and _request.is_active() and _request._type == _type:
                return True
        return False

    def add_majors(self, major_ids):
        for major_id in major_ids:
            self.add_major(major_id)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def add_guru_courses(self, course_ids):
        for course_id in course_ids:
            self.add_guru_course(course_id)

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def getFirstName(self):
        return self.name.split(' ')[0].title()

    def add_guru_subcategories(self, subcategory_ids):
        for subcategory_id in subcategory_ids:
            self.add_guru_subcategory(subcategory_id)

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise


    def set_profile_url(self, profile_url):
        self.profile_url = profile_url
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def add_guru_subcategory(self, subcategory_id):
        subcategory = Subcategory.query.get(subcategory_id)
        if subcategory:
            self.guru_subcategories.append(subcategory)

            if subcategory.category not in self.guru_categories:
                self.guru_categories.append(subcategory.category)

                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise


    def add_guru_course(self, course_id):
        c = Course.query.get(int(course_id))
        self.guru_courses.append(c)
        db_session.commit()


    def add_major(self, major_id):
        major_obj = Department.query.get(int(major_id))
        self.departments.append(major_obj)
        db_session.commit()


    def average_guru_rating(self):
        _sum = 0.0
        num_ratings = 0.0
        all_guru_ratings = [rating.guru_rating for rating in self.guru_ratings if rating.guru_rating]
        num_ratings = num_ratings + len(all_guru_ratings)
        _sum = _sum + sum(all_guru_ratings)
        try:
            return float(_sum / num_ratings)
        except:
            return 0.0

    def average_student_rating(self):
        _sum = 0.0
        num_ratings = 0.0
        all_student_ratings = [rating.student_rating for rating in self.student_ratings if rating.student_rating]
        num_ratings = num_ratings + len(all_student_ratings)
        _sum = _sum + sum(all_student_ratings)
        try:
            return float(_sum / num_ratings)
        except:
            return 0.0

    @staticmethod
    def does_referral_exist(code):
        referral_exists = User.query.filter_by(referral_code = code).all()
        if referral_exists and len(referral_exists) == 1:
            return referral_exists[0]
        return False


    @staticmethod
    def generate_referral_code(name):
        first_name = name.split(" ")[0]
        referral_exists = User.query.filter_by(referral_code = first_name).all()
        if referral_exists:
            import uuid
            code = uuid.uuid4().hex[0:5]
            return code
        else:
            return first_name

    def __repr__(self):
        return "<User '%r', '%r', '%r'>" %\
              (self.id, self.name, self.email)

class Calendar(Base):

    __tablename__  = 'calendar'
    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_modified = Column(DateTime)

    # request_id = Column(Integer, ForeignKey('request.id'))
    # request = relationship("Request",
    #     uselist=False,
    #     primaryjoin = "Request.id == Calendar.request_id"
    # )


    # proposal_id = Column(Integer, ForeignKey('proposal.id'))
    # proposal = relationship("Proposal",
    #     uselist=False,
    #     primaryjoin = "Proposal.id == Calendar.proposal_id"
    # )

    start_day = Column(DateTime)
    number_of_days = Column(Integer)

    @staticmethod
    def initGuruCalendar(user):
        c = Calendar()
        c.time_created = datetime.now()
        try:
            db_session.add(c)
            db_session.commit()
        except:
            db_session.rollback()
            raise
        if user:
            user.guru_calendar_id = c.id
            db_session.commit()


    @staticmethod
    def initFromRequest(_request, number_of_days = 2):
        c = Calendar()
        c.time_created = datetime.now()
        # c.request_id = _request.id
        c.number_of_days = number_of_days
        db_session.add(c)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return c

    @staticmethod
    def initFromProposal(_proposal, number_of_days = 2):
        c = Calendar()
        c.time_created = datetime.now()
        c.proposal_id = _proposal.id
        c.number_of_days = number_of_days
        db_session.add(c)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return c

class Shop(Base):
    __tablename__ = 'shop'
    id = Column(Integer, primary_key=True)


    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Shop.guru_id)",
                        uselist=False,
                        backref="guru_shops")


    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category",
        primaryjoin = "Category.id == Shop.category_id",
        backref = 'guru_shops'
        )



    dark_mode = Column(Boolean, default=True)
    light_mode = Column(Boolean, default=False)

    banner_url = Column(String)
    is_featured = Column(Boolean)
    avg_rating = Column(Float)
    public_url = Column(String)



    title = Column(String)
    description = Column(String)




class Calendar_Event(Base):

    __tablename__  = 'calendar_event'
    id = Column(Integer, primary_key=True)


    calendar_id = Column(Integer, ForeignKey('calendar.id'))
    calendar = relationship("Calendar",
        primaryjoin = "Calendar.id == Calendar_Event.calendar_id",
        backref="calendar_events"
    )

    course_id = Column(Integer, ForeignKey('course.id'))
    course = relationship("Course",
        uselist=False,
        primaryjoin = "Course.id == Calendar_Event.course_id",
        backref="calendar_events"
    )


    # shop_id = Column(Integer, ForeignKey('shop.id'))
    # shop = relationship("Shop", uselist=False, backref="portfolio_items")

    time_created = Column(DateTime)
    is_student = Column(Boolean)
    is_guru = Column(Boolean)
    is_mutual = Column(Boolean)

    title = Column(String)
    _type = Column(String)
    description = Column(String)
    private = Column(Boolean)
    archived = Column(Boolean, default=False)

    start_time = Column(DateTime)
    end_time = Column(DateTime)
    location = Column(String)

    ### Todo
    ## -- Create one --> many relationship event.attendees (RSVP ability)
    ## -- Attachments
    ## -- Position object
    ## -- create Event Type object for oh hours, etc. String hack for now
    @staticmethod
    def createGuruOfficeHours(event_json, calendar):

        db_session.add(calendar_event)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        calendar_event = Calendar_Event()

        calendar_event.start_time = event_json.get('start_time')
        calendar_event.end_time = event_json.get('end_time')


        calendar_event.course_id = event_json.get('course_id')
        calendar_event.title = event_json.get('title')
        calendar_event._type = event_json.get('type')
        calendar_event.private = event_json.get('private')
        calendar_event.description = event_json.get('description')

        calendar_event.location = event_json.get('location')
        calendar_event.is_student = event_json.get('is_student')
        calendar_event.is_guru = event_json.get('is_guru')
        calendar_event.is_mutual = event_json.get('is_mutual')

        calendar_event.time_created = datetime.now()

        calendar_event.calendar_id = calendar.id

        db_session.add(calendar_event)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return calendar_event


    @staticmethod
    def initFromJson(event_json, calendar, day_offset):


        if not event_json.get('start_time'):
            return

        calendar_event = Calendar_Event()

        start_time = event_json.get('start_time')
        end_time = event_json.get('end_time')

        date_now = datetime.now()
        print 'date_now', date_now
        try:
            day_offset = date_now.replace(day=(date_now.day + day_offset - 1), minute=0, second=0, microsecond=0)
        except ValueError:
            print 'Value Error! Resolving it now...'
            if date_now.day >= 27:
                day_offset = date_now.replace(month=date_now.month + 1, day=day_offset, minute=0, second=0, microsecond=0)

        print 'day_offset', day_offset

        print start_time, end_time
        print type(start_time), type(end_time)

        calendar_event.start_time = day_offset.replace(hour=start_time.get('hours'), minute=start_time.get('minutes'))
        calendar_event.end_time = day_offset.replace(hour=end_time.get('hours'), minute=end_time.get('minutes'))


        calendar_event.location = event_json.get('location')
        calendar_event.is_student = event_json.get('is_student')
        calendar_event.is_guru = event_json.get('is_guru')
        calendar_event.is_mutual = event_json.get('is_mutual')

        calendar_event.time_created = datetime.now()

        calendar_event.calendar_id = calendar.id

        db_session.add(calendar_event)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return calendar_event




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
    svg_url = Column(String)
    last_updated = Column(DateTime)

    fa15_start = Column(DateTime)
    fa15_end = Column(DateTime)
    sp15_start = Column(DateTime)
    sp15_end = Column(DateTime)

    departments_sanitized = Column(Boolean, default=False)
    courses_sanitized = Column(Boolean, default=False)

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

    popular_courses = relationship("Course",
        primaryjoin = "(Course.university_id==University.id) & "\
                        "(Course.is_popular==True)")

    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer)

    num_popular_courses = Column(Integer, default = 0)
    num_courses = Column(Integer, default = 0)
    num_students = Column(Integer, default = 0)
    #num_depts = Column(Integer) # TODO SAMIR
    num_gurus = Column(Integer, default =0)
    num_depts = Column(Integer, default =0)
    num_majors = Column(Integer, default =0)
    num_emails = Column(Integer, default =0)
    banner_url = Column(String)
    banner_url_confirmed = Column(Boolean)
    seal_url = Column(String)

    ready_to_launch = Column(Boolean)
    is_targetted = Column(Boolean, default=False)

    # new
    email_attributes = Column(String)
    emails_student_only = Column(Boolean)

    us_news_ranking = Column(Integer)

    public_school_ranking = Column(Integer)
    notes = Column(String)

    school_color_one = Column(String)
    school_color_two = Column(String)
    school_logo_image_url = Column(String)
    variations = Column(String)

    school_casual_name = Column(String)
    school_mascot_name = Column(String)
    school_population = Column(Integer)
    is_public = Column(Boolean)


    @staticmethod
    def admin_create(args_dict, _id):
        u = University.admin_update(University(_id=_id), args_dict)
        return u

    def hasDefaultColorOne(self):
        return self.school_color_one == '#40484B'

    def hasDefaultColorTwo(self):
        return self.school_color_two == '#757575'

    def sanitizeCourses(self):
        count = 0
        for course in self.courses:
            if course.name or course.short_name or course.full_name:
                count += 1
        if count == len(self.courses):
            self.courses_sanitized = True
            db_session.commit()

    def sanitizeDepartments(self):
        count = 0
        for d in self.departments:
            if d.code or d.abbr or d.name or d.short_name or d.title or d.variations:
                count += 1
        if count == len(self.departments):
            self.departments_sanitized = True
            db_session.commit()

    @staticmethod
    def is_university_targetted(university):
        from datetime import datetime
        recent_month = datetime(year=2015, month=7, day =24)
        if university.fa15_start and university.fa15_start <= recent_month:
            university.is_targetted = True
            db_session.commit()


    @staticmethod
    def admin_update(u, args):

        u.name = args.get('title')
        # u.population = int(''.join(args.get('population').split(',')))
        # u.logo_url = args.get('logo_url')
        u.last_updated = datetime.now()
        u.city = args.get('city')
        u.state = args.get('state')
        u.admin_approved = True

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

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

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return m

    @staticmethod
    def user_create(name, contributed_user_id):
        c = Major(name=name,contributed_user_id=contributed_user_id)
        db_session.add(c)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return c


class Support(Base):
    __tablename__ = 'support'

    id = Column(Integer, primary_key=True)
    message = Column(String)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Support.user_id",
        backref = "support_tickets"
    )

    assigned_admin_id = Column(Integer, ForeignKey('user.id'))
    assigned_admin = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Support.assigned_admin_id",
        backref = "admin_support_tickets"
    )

    rating_id = Column(Integer, ForeignKey('rating.id'))
    transaction_id = Column(Integer, ForeignKey('transaction.id'))
    session_id = Column(Integer, ForeignKey('session.id'))
    time_created = Column(DateTime)
    time_resolved = Column(DateTime)
    time_updated = Column(DateTime)
    # category --> add the string
    # status --> ad more


    @staticmethod
    def init(user, message, support_json):
        support = Support()
        support.user_id = user.id
        support.time_created = datetime.now()
        support.transaction_id = support_json.get('transaction_id')
        support.session_id = support_json.get('session_id')
        support.rating_id = support_json.get('rating_id')
        support.message = message
        db_session.add(support)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return support

class Department(Base):
    __tablename__ = "department"

    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_updated = Column(DateTime)
    is_popular = Column(Boolean)
    source = Column(String, default = 'chegg')
    source_url = Column(String)

    times_mentioned = Column(Integer)

    num_courses = Column(Integer)
    num_popular_courses = Column(Integer)

    code = Column(String)
    abbr = Column(String)
    name = Column(String)
    short_name = Column(String)
    variations = Column(String)
    title = Column(String)

    university_id = Column(Integer, ForeignKey('university.id'))
    university  = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Department.university_id",
        backref = "departments"
    )

    popular_courses = relationship("Course",
        primaryjoin = "(Course.department_id==Department.id) & "\
                        "(Course.is_popular==True)")

    def __repr__(self):
        if self.title:
            return "<Department'%s', '%s'>" %\
              (str(self.id), str(self.title))
        if self.abbr:
            return "<Department'%s', '%s'>" %\
              (str(self.id), str(self.abbr))
        if self.name:
            return "<Department'%s', '%s'>" %\
              (str(self.id), str(self.name))
        if self.short_name:
            return "<Department'%s', '%s'>" %\
              (str(self.id), str(self.short_name))
        if self.code:
            return "<Department'%s', '%s'>" %\
              (str(self.id), str(self.code))
        return "EMPTY DEPARTMENT with %s courses" % len(self.courses)






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
    mandrill_tags = Column(String) # comma separated values
    templated_args = Column(String)

    directory_based = Column(Boolean)

    description = Column(String)

    university_id = Column(Integer, ForeignKey('university.id'))
    university  = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Campaign.university_id",
        backref = "campaigns"
    )


    @staticmethod
    def init(name, university_id, description=None, directory_based=True):
        c = Campaign()
        c.description = description
        c.name = name
        c.directory_based = directory_based
        c.time_created = datetime.now()
        try:
            db_session.add(c)
            db_session.commit()
            c.university_id = university_id
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return c





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
    def initFromJson(position_json, user_id):
        position = Position()
        position.latitude = position_json.get('latitude')
        position.longitude = position_json.get('longitude')
        position.altitude = position_json.get('altitude')
        position.accuracy = position_json.get('accuracy')
        position.altitude_accuracy = position_json.get('altitude_accuracy')
        position.heading = position_json.get('heading')
        position.speed = position_json.get('speed')
        position.timestamp = position_json.get('timestamp')
        position.user_id = user_id
        db_session.add(position)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return position






class Resource(Base):
    __tablename__ = 'resource'

    id = Column(Integer, primary_key=True)

    _type = Column(Integer, default = 0)
    status = Column(Integer, default = 0)

    file_type = Column(String)
    file_url = Column(String)
    file_size = Column(String)
    handwritten = Boolean(String)

    description = String(Base)

    root_domain_url = Column(String) ## linkedin
    site_url = Column(String) ## linkedin.com/profile
    icon_url = Column(String)

    is_tutoring_profile = Column(Boolean, default=False)
    is_profile = Column(Boolean, default=False)
    is_url = Column(Boolean, default=False)
    is_file = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)

    course_id = Column(Integer, ForeignKey('course.id'))
    course = relationship("Course",
        primaryjoin="Course.id==Resource.course_id",
        uselist=False)

    contributed_user_id = Column(Integer, ForeignKey('user.id'))
    contributed_user = relationship("User",
        primaryjoin="User.id==Resource.contributed_user_id",
        uselist=False)

    description = Column(String)
    title = Column(String)


    portfolio_item_id = Column(Integer, ForeignKey('portfolio_item.id'))
    portfolio_item = relationship("Portfolio_Item",
        primaryjoin = "(Portfolio_Item.id==Resource.portfolio_item_id)",
        uselist=False,
        backref="resources")

    time_uploaded = Column(DateTime)
    times_accessed = Column(Integer)
    upvotes = Column(Integer, default = 0)
    downvotes = Column(Integer, default = 0)

    file_id = Column(Integer, ForeignKey("file.id"))
    _file = relationship("File",
        primaryjoin="File.id==Resource.file_id")

    semester_id = Column(Integer)

    year_id = Column(Integer)

    professor_name = Column(String)

    course_string = Column(String)


class Language(Base):
    __tablename__ ='language'
    id = Column(Integer, primary_key = True)
    time_created = Column(DateTime)
    last_updated = Column(DateTime)
    name = Column(String)

class Experience(Base):
    __tablename__ ='experience'
    id = Column(Integer, primary_key = True)
    time_created = Column(DateTime)
    last_updated = Column(DateTime)
    name = Column(String)
    description = Column(String)
    years = Column(Integer)

    admin_approved = Column(Boolean, default=False)
    school_specific = Column(Boolean, default=False)

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        primaryjoin="University.id==Experience.university_id",
        backref='guru_experiences')

    contributed_user_id = Column(Integer, ForeignKey('user.id'))
    contributed_user = relationship("User",
        primaryjoin="User.id==Experience.contributed_user_id",
        backref='guru_experiences')


class Stats(Base):
    __tablename__ ='stats'
    id = Column(Integer, primary_key = True)
    last_updated = Column(DateTime)
    total_courses = Column(Integer, default=0)
    total_universities = Column(Integer, default=0)
    total_users = Column(Integer, default=0)
    total_gurus = Column(Integer, default=0)
    total_depts = Column(Integer, default=0)
    total_popular_courses = Column(Integer, default=0)
    gurus_24h = Column(Integer, default=0)
    users_24h = Column(Integer, default=0)
    visitors_24 = Column(Integer, default=0)


class Queue(Base):
    __tablename__ = 'queue'
    GURUS_ONLY = 0

    id = Column(Integer, primary_key = True)

    request_id = Column(Integer, ForeignKey("request.id"))

    _type = Column(Integer, default = 0)

    gurus = relationship("User",
        secondary= queue_guru_table,
        backref = backref('gurus', lazy='dynamic'))

    status = Column(Integer, default = 0)

    time_created = Column(DateTime)
    last_updated = Column(DateTime)

class Tag(Base):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key = True)

    times_referenced = Column(Integer)

    name = Column(String)
    time_created = Column(String)
    last_referenced = Column(String)

    linked_tags = Column(String)

    rank = Column(Integer)

    time_created = Column(DateTime)

    is_profession = Column(Boolean)

    is_sale_item = Column(Boolean)
    price = Column(Float)
    is_ingredient = Column(Boolean)

    admin_approved = Column(Boolean, default = False)

    creator_id = Column(Integer, ForeignKey('user.id'))
    creator = relationship("User",
        primaryjoin="User.id==Tag.creator_id",
        uselist=False)

    courses = relationship("Course",
        secondary= course_tag_table,
        backref = backref('tags', lazy="dynamic"))

    requests = relationship("Request",
        secondary= request_tag_table,
        backref = backref('tags', lazy="dynamic"))

    users = relationship("User",
        secondary = user_tag_table,
        backref = backref("tags", lazy="dynamic"))

    resources = relationship("Resource",
        secondary = resource_tag_table,
        backref = backref("tags", lazy="dynamic"))



    portfolio_item_id = Column(Integer, ForeignKey('portfolio_item.id'))
    portfolio_item = relationship("Portfolio_Item",
        primaryjoin = "(Portfolio_Item.id==Tag.portfolio_item_id)",
        uselist=False,
        backref="tags")







class Request(Base):
    __tablename__ = 'request'

    PROCESSING_GURUS = 0
    STUDENT_RECEIVED_GURU = 1 #Guru accepted
    STUDENT_ACCEPTED_GURU = 2 #Best case
    STUDENT_REJECTED_GURU = 3
    STUDENT_CANCELED = 4
    GURU_CANCELED_SEARCHING_AGAIN = 5
    NO_GURUS_AVAILABLE = 6

    GURU_CANCEL_SESSION = 7
    STUDENT_CANCEL_SESSION = 8

    GURU_RATED = 9
    STUDENT_RATED = 10
    BOTH_RATED = 11

    STUDENT_REFUND = 12
    GURU_NO_SHOW = 13
    STUDENT_NO_SHOW = 14
    DEFAULT_PRICE = 20

    # GURU_REQUEST = 0

    QUESTION_ACCEPTED = 15
    QUESTION_ANSWERED = 16
    QUESTION_COMPLETE = 17


    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_accepted = Column(DateTime)


    description= Column(String)
    status = Column(Integer, default = 0) #0 = pending, # 1 = matched, # 2 = canceled, # 3 = expired
    session = relationship("Session", uselist=False, backref="request")
    position = relationship("Position", uselist=False, backref="request")
    queue = relationship("Queue", uselist=False, backref="request")

    rating_id = Column(Integer, ForeignKey("rating.id"))
    transaction_id = Column(Integer, ForeignKey("transaction.id"))


    student_calendar_id = Column(Integer, ForeignKey('calendar.id'))
    student_calendar = relationship("Calendar",
        primaryjoin="Calendar.id==Request.student_calendar_id",
        uselist=False)


    guru_calendar_id = Column(Integer, ForeignKey('calendar.id'))
    guru_calendar = relationship("Calendar",
        primaryjoin="Calendar.id==Request.guru_calendar_id",
        uselist=False
        )

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        primaryjoin="University.id==Request.university_id",
        uselist=False,
        backref="requests")

    address = Column(String)
    in_person = Column(Boolean)
    online = Column(Boolean)
    time_estimate = Column(Integer)

    category = Column(String)

    contact_email = Column(Boolean)
    contact_push = Column(Boolean)
    contact_text = Column(Boolean)
    anonymous = Column(Boolean)
    public_post = Column(Boolean)
    urgency = Column(Integer, default = 0)

    student_price = Column(Float)

    guru_hourly = Column(Float)

    _type = Column(Integer, default = 0)

    task_title = Column(String)
    verb_image = Column(String)
    inital_status = Column(String) #TODO CURRENT STATUS


    giphy_url = Column(String)

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

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User", uselist=False,
        primaryjoin = "User.id == Request.guru_id")


    # selected_proposal_id = Column(Integer, ForeignKey('proposal.id'))
    selected_proposal =  relationship("Proposal", uselist=False)

    def process_proposal(self, proposal_json):
        self.status = proposal_json.get('status')
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return self

    def is_active(self):
        if self.status == 0 or self.status == 1:
            return True
        return False


class Proposal(Base):
    __tablename__ = 'proposal'
    id = Column(Integer, primary_key=True)

    if os.environ.get('PRODUCTION'):
        BUFFER = 30
        GURU_STATE_0_EXP_TIME = 300
        GURU_STATE_1_EXP_TIME = 300
        GURU_STATE_2_EXP_TIME = 3600
    else:
        BUFFER = 5
        GURU_STATE_0_EXP_TIME = 10
        GURU_STATE_1_EXP_TIME = 10
        GURU_STATE_2_EXP_TIME = 10

    GURU_STATE_EXP_TIME_ARR = [
        GURU_STATE_0_EXP_TIME + BUFFER,
        GURU_STATE_1_EXP_TIME + BUFFER,
        GURU_STATE_2_EXP_TIME + BUFFER
    ]
    GURU_STATE_EXP_TIME_ARR_WITHOUT_BUFFER = [
        GURU_STATE_0_EXP_TIME,
        GURU_STATE_1_EXP_TIME,
        GURU_STATE_2_EXP_TIME
    ]

    STUDENT_EXP_TIME_SECONDS = 10

    GURU_SENT = 0
    GURU_SEEN = 1
    GURU_ACCEPTED = 2
    GURU_REJECTED = 3
    GURU_EXPIRED = 4
    GURU_CHOSEN = 5
    GURU_ACCEPT_STUDENT_CANCELED = 6
    GURU_SENT_STUDENT_CANCELED = 7

    GURU_SENT_RECURRING = 8
    GURU_ACCEPTED_RECURRING = 9

    # end of the session
    GURU_REJECTED_RECURRING = 10

    GURU_NO_REPLY_RECURRING = 11

    QUESTION_TOO_LATE = 12

    QUESTION_GURU_CHOSEN = 13

    time_created = Column(DateTime)
    time_updated = Column(DateTime)
    time_answered = Column(DateTime)

    # is_task = Column(Boolean)
    # is_session = Column(Boolean)
    # is_question = Column(Boolean)

    student_price = Column(Float)
    guru_price = Column(Float)
    guru_proposed_price = Column(Float) #rebuttal
    guru_description = Column(String)
    question_response = Column(String)

    request_id = Column(Integer, ForeignKey('request.id'))
    request = relationship("Request",
        uselist=False,
        primaryjoin = "Request.id == Proposal.request_id",
        backref="proposals"
    )

    student_calendar_id = Column(Integer, ForeignKey('calendar.id'))
    student_calendar = relationship("Calendar",
        primaryjoin="Calendar.id==Proposal.student_calendar_id",
        uselist=False)

    session = relationship("Session", uselist=False, backref="proposal")

    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "User.id == Proposal.guru_id",
        backref="proposals"
    )

    guru_rank = Column(Integer)
    status = Column(Integer) # Active, expired, guru_accepted, guru_rejected, student_rejected

    def send_to_next_guru(self):
        _request = self.request
        pass

    @staticmethod
    def initRecurringSessionProposal(_session):
        proposal = Proposal()
        proposal.status = Proposal.GURU_SENT_RECURRING
        proposal.time_created = datetime.now()
        proposal.guru_id = _session.guru_id
        proposal.session = _session
        db_session.add(proposal)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return proposal

    @staticmethod
    def initProposal(request_id, guru_id, calendar_id):
        proposal = Proposal()
        proposal.status = 0
        proposal.student_calendar_id = calendar_id
        proposal.time_created = datetime.now()
        proposal.guru_id = guru_id
        proposal.request_id = request_id
        db_session.add(proposal)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return proposal

class Game(Base):
    __tablename__ = 'game'

    id = Column(Integer, primary_key = True)

    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",
        uselist=False,
        primaryjoin = "User.id == Game.user_id",
        backref="games"
    )

    _type = Column(Integer, default = 0)

    score = Column(Float)
    time = Column(Float)
    time_started = Column(DateTime)
    time_completed = Column(DateTime)
    length_seconds = Column(Integer)

    level_reached = Column(Integer)

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Game.university_id",
        backref = 'games'
    )


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

    proposal_id = Column(Integer, ForeignKey("proposal.id"))
    proposal = relationship("Proposal",
        uselist = False,
        primaryjoin = "Proposal.id == File.proposal_id",
        backref = "files"
    )

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User",
        uselist = False,
        primaryjoin="User.id == File.user_id",
        backref= "files")

    session_id = Column(Integer, ForeignKey("session.id"))
    session = relationship("Session",
        uselist = False,
        primaryjoin="Session.id == File.session_id",
        backref= "files")

    relationship_id = Column(Integer, ForeignKey("relationship.id"))
    _relationship = relationship("Relationship",
        uselist = False,
        primaryjoin="Relationship.id == File.relationship_id",
        backref= "files")

    message_id = Column(Integer, ForeignKey("message.id"))

    @staticmethod
    def initEmptyFile():
        _file = File()
        _file.time_created = datetime.now()
        # _file.url = s3_url
        # _file.user_id = user.id
        # _file._type = file_json.get('type')
        # _file.size = file_json.get('size')
        # _file.name = file_json.get('name')
        db_session.add(_file)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return _file


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    time_created = Column(DateTime)
    description = Column(DateTime)

    ## User that did the event
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Event.user_id",
        backref = "events"
    )

    ## User who was impacted by this events
    impacted_user_id = Column(Integer, ForeignKey("user.id"))
    impacted_user_notified = Column(Boolean, default=False)
    impacted_user = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Event.impacted_user_id",
        backref="impact_events")

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

    ## User that did the event
    rank_guru_id = Column(Integer, ForeignKey("user.id"))
    rank_guru = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Event.rank_guru_id",
        backref = "guru_rank_events"
    )

    ## User that did the event
    queue_id = Column(Integer, ForeignKey("queue.id"))
    queue = relationship("Queue",
        uselist = False,
        primaryjoin = "Queue.id == Event.queue_id",
        backref = "events"
    )

    #status = 0
    estimated_rank_before = Column(Integer)
    estimated_rank_after = Column(Integer)

    #status = 1
    official_rank_before = Column(Integer)
    official_rank_after = Column(Integer)

    status = Column(Integer)

    @staticmethod
    def initGuruRankEvent(guru_id, off_rank_before=None, off_rank_after=None,\
        est_rank_after=None, est_rank_before=None, status=None):
        event = Event()
        event.time_created = datetime.now()
        event.rank_guru_id = guru_id
        event.estimated_rank_before = est_rank_before
        event.estimated_rank_after = est_rank_after
        event.official_rank_before = off_rank_before
        event.official_rank_after = off_rank_after
        event.status = status
        db_session.add(event)
        return event


    @staticmethod
    def initFromDict(event_json):
        event = Event()
        event.time_created = datetime.now()
        event.description = event_json.get('description')
        event.user_id = event_json.get('user_id')
        event.impacted_user_id = event_json.get('impacted_user_id')
        event.session_id = event_json.get('session_id')
        event.status = event_json.get('status')
        event.request_id = event_json.get('request_id')
        event.proposal_id = event_json.get('proposal_id')
        event.relationship_id = event_json.get('relationship_id')
        db_session.add(event)
        return event

class Session(Base):
    __tablename__ = 'session'
    id = Column(Integer, primary_key=True)

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

    RECURRING_SESSION = 12
    GURU_ACCEPT_RECURRING_SESSION = 13
    GURU_REJECT_RECURRING_SESSION = 14
    GURU_PAUSED = 15
    STUDENT_PAUSED = 16


    seconds = Column(Integer)
    minutes = Column(Integer)
    hours = Column(Integer)


    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Session.guru_id) & "\
                        "(User.is_a_guru==True)",
                        uselist=False,
                        backref="guru_sessions")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Session.student_id)",
                        uselist=False,
                        backref="student_sessions")


    status = Column(Integer)

    address = Column(String)
    in_person = Column(Boolean)
    online = Column(Boolean)
    time_estimate = Column(Integer)

    description= Column(String)
    request_position = relationship("Position", uselist=False)

    guru_positions = relationship("Position",
        primaryjoin = "(Position.user_id == Session.guru_id) & "\
                        "(Session.id == Position.session_id)")

    student_positions = relationship("Position",
        primaryjoin = "(Position.user_id == Session.student_id) & "\
                        "(Session.id == Position.session_id)")

    relationship_id = Column(Integer, ForeignKey('relationship.id'))
    _relationship = relationship("Relationship",
        primaryjoin = "Relationship.id == Session.relationship_id",
                        uselist=False,
                        backref="sessions")

    card_id = Column(Integer, ForeignKey('card.id'))
    card = relationship("Card",
        uselist = False,
        primaryjoin = "Card.id == Session.card_id",
        backref = 'sessions'
        )

    rating_id = Column(Integer, ForeignKey("rating.id"))
    request_id = Column(Integer, ForeignKey("request.id"))
    transaction_id = Column(Integer, ForeignKey("transaction.id"))
    proposal_id = Column(Integer, ForeignKey("proposal.id"))

    support = relationship("Support", uselist=False, backref="session")

    expiration_date = Column(DateTime) #TBD
    time_created = Column(DateTime)


    time_updated = Column(DateTime) #alias for start time
    time_completed = Column(DateTime) # alias for pause / stop / cancel, etc

    displayed = Column(Boolean, default=True) #whether the user 'removed' this session

    @staticmethod
    def initFromJson(session_json, is_request_json = None):
        _session = Session()
        _session.seconds = session_json.get('time_estimate').get('seconds')
        _session.minutes = session_json.get('time_estimate').get('minutes')
        _session.hours = session_json.get('time_estimate').get('hours')
        _session.guru_id = session_json.get('guru_id')
        _session.student_id = session_json.get('student_id')
        _session.status = session_json.get('status')
        _session.relationship_id = session_json.get('relationship_id')
        _session.expiration_date = session_json.get('expiration_date')
        _session.time_created = datetime.now()
        if is_request_json:
            _session.request_id = session_json.get('id')
        _session.address = session_json.get('address')
        _session.in_person = session_json.get('in_person')
        _session.online = session_json.get('online')
        _session.time_estimate = int(session_json.get('time_estimate').get('hours')) * 60 + int(session_json.get('time_estimate').get('minutes'))
        db_session.add(_session)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return _session

    #TODO CLEAN UP THIS LATER
    @staticmethod
    def initRecurringSession(session_json):
        _session = Session()
        _session.guru_id = session_json.get('guru_id')
        _session.student_id = session_json.get('student_id')
        _session.status = Session.RECURRING_SESSION
        _session.relationship_id = session_json.get('relationship_id')
        _session.expiration_date = session_json.get('expiration_date')
        _session.time_created = datetime.now()
        _session.address = session_json.get('address')
        _session.in_person = session_json.get('in_person')
        _session.online = session_json.get('online')
        _session.time_estimate = session_json.get('time_estimate')
        _session.description = session_json.get('description')
        db_session.add(_session)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
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
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
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

    support_ticket_id = Column(Integer, ForeignKey("support.id"))
    support_ticket = relationship("Support",
        uselist = False,
        primaryjoin = "Support.id == Message.support_ticket_id",
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
    def initFromJson(message_json, optional):
        message = Message()
        message.time_created = datetime.now()
        message.time_sent = datetime.now()
        message.contents = message_json.get('contents')
        if message_json.get('type'):
            doNothing = False

        message.relationship_id = message_json.get('relationship_id')

        message.session_id = message_json.get('session_id')
        message.sender_id = message_json.get('sender_id')
        message.receiver_id = message_json.get('receiver_id')

        db_session.add(message)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return message


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

    body_load_time = Column(Float)
    update_load_time = Column(Float)
    is_test_device = Column(Boolean)

    device_load_time = Column(Float)
    network_speed = Column(String)
    typical_network_speed = Column(String)

    push_notif = Column(String)
    push_notif_enabled = Column(Boolean)
    location_enabled = Column(Boolean)
    background_location_enabled = Column(Boolean)
    camera_enabled = Column(Boolean)
    is_current = Column(Boolean, default= False)

    user_id = Column(Integer, ForeignKey('user.id'))
    user  = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Device.user_id",
        backref = "devices"
    )

    @staticmethod
    def getTestDevices():
        return Device.query.filter_by(is_test_device=True).all()
    @staticmethod
    def getNonTestDevices():
        return Device.query.filter_by(is_test_device=None).all()

    def isWindows(self):
        if not self.platform:
            return False
        return 'win32nt' in self.platform.lower()

    def isIOS(self):
        if not self.platform:
            return False
        return 'ios' in self.platform.lower()

    def isAndroid(self):
        if not self.platform:
            return False
        return 'android' in self.platform.lower()


class Portfolio_Item(Base):
    __tablename__ = 'portfolio_item'
    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)

    is_custom = Column(Boolean)
    admin_approved = Column(Boolean, default=False)

    skill_id = Column(Integer, ForeignKey('skill.id'))
    skill = relationship("Skill", uselist=False)

    course_id = Column(Integer, ForeignKey('course.id'))
    course = relationship("Course", uselist=False)

    subcategory_id = Column(Integer, ForeignKey('subcategory.id'))
    subcategory = relationship("Subcategory", uselist=False)

    description = Column(String)
    title = Column(String)

    avg_rating = Column(Float)

    hourly_price = Column(Float)
    max_hourly_price = Column(Float)

    unit_price = Column(Float)
    max_unit_price = Column(Float)

    title = Column(String)
    description = Column(String)


    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",
        primaryjoin = "(User.id==Portfolio_Item.user_id)",
        uselist=False,
        backref="portfolio_items")

    experiences = relationship("Experience",
        secondary = experience_portfolio_items_table,
        backref = backref("portfolio_items", lazy="dynamic")
        )


    shop_id = Column(Integer, ForeignKey('shop.id'))
    shop = relationship("Shop",
        primaryjoin = "(Shop.id==Portfolio_Item.shop_id)",
        uselist=False,
        backref="portfolio_items")


    ### user -- create custom portfolio item
    ###

    @staticmethod
    def initAllCourses(user):
        if not user or not user.guru_courses:
            return
        for course in user.guru_courses:
            pi = Portfolio_Item()
            pi.title = course.short_name
            pi.description = course.full_name
            pi.time_created = datetime.now()

            try:
                db_session.add(pi)
                db_session.commit()
            except:
                db_session.rollback()
                raise

    @staticmethod
    def getPortfolioItemByCourseId(user, course_id):
        for pi in user.portfolio_items:
            if pi.course_id == course_id:
                return pi.course

    @staticmethod
    def initFromCourse(user, course):
        if not user or not user.guru_courses:
            return

        portfolo_course_ids = [p.course_id for p in user.portfolio_items]

        if course.id in portfolo_course_ids:
            return

        pi = Portfolio_Item()
        pi.title = course.short_name
        pi.description = course.full_name

        try:
            db_session.add(pi)
            db_session.commit()
        except:
            db_session.rollback()
            raise

        pi.course_id = course.id
        pi.user_id = user.id
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def linkGuruResource(self, resource):
        resource.portfolio_id = self.id
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def linkGuruExperience(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience and experience not in self.experiences:
            self.experiences.append(experience)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise

    def removeGuruExperience(self, experience_id):
        for experience in self.experiences:
            if experience.id == experience_id:
                self.experiences.remove(experience)
                try:
                    db_session.commit()
                except:
                    db_session.rollback()
                    raise
                break

    def updateTitle(self, title):
        self.title = title
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def updateDescription(self, description):
        self.description = description
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def updateUnitPrice(self, price):
        if price > self.max_unit_price:
            self.unit_price = self.max_unit_price
        else:
            self.unit_price = price
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def updateHourlyPrice(self, price):
        if price > self.max_hourly_price:
            self.hourly_price = self.max_hourly_price
        else:
            self.hourly_price = price
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise


class Rating(Base):
    __tablename__ = 'rating'
    id = Column(Integer, primary_key=True)

    time_created = Column(DateTime)
    time_student_rated = Column(DateTime)
    time_guru_rated = Column(DateTime)

    student_time_rated = Column(DateTime)
    guru_time_rated = Column(DateTime)

    student_rating = Column(Integer)
    guru_rating = Column(Integer)

    student_rating_description = Column(String)
    guru_rating_description = Column(String)

    support = relationship("Support", uselist=False, backref="rating")

    session = relationship("Session", uselist=False, backref="rating")

    request = relationship("Request", uselist=False, backref="question_rating")

    transaction = relationship("Transaction", uselist=False, backref="rating")



    is_question = Column(Boolean)
    is_task = Column(Boolean)
    is_session = Column(Boolean)


    portfolio_item_id = Column(Integer, ForeignKey('portfolio_item.id'))
    portfolio_item = relationship("Portfolio_Item",
        primaryjoin = "(Portfolio_Item.id==Rating.portfolio_item_id)",
        uselist=False,
        backref="ratings")



    guru_id = Column(Integer, ForeignKey('user.id'))
    guru = relationship("User",
        primaryjoin = "(User.id==Rating.guru_id) & "\
                        "(User.is_a_guru==True)",
        uselist=False,
        backref="guru_ratings")

    student_id = Column(Integer, ForeignKey('user.id'))
    student = relationship("User",
        primaryjoin = "(User.id==Rating.student_id)",
        uselist=False,
        backref="student_ratings")

    @staticmethod
    def initFromSession(_session):
        rating = Rating()
        rating.guru_id = _session.guru_id
        rating.student_id = _session.student_id
        rating.is_session = True
        rating.session = _session
        db_session.add(rating)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return rating

    @staticmethod
    def initFromQuestion(_request):
        rating = Rating()
        rating.guru_id = _request.guru_id
        rating.student_id = _request.student_id
        rating.request = _request
        rating.is_question = True

        db_session.add(rating)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
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


class Email_User(Base):
    __tablename__ = 'email_user'
    id = Column(Integer, primary_key=True)

    #mandrill fields
    time_open = Column(DateTime)
    time_clicked = Column(DateTime)

    #after they visit the website
    time_visited = Column(DateTime)
    email = Column(String)

    call_to_action_clicked = Column(Boolean, default=False)
    signed_up = Column(Boolean, default=False)
    num_clicks = Column(Integer, default = 0)



    def increment_clicks(self):
        self.num_clicks += 1
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    @staticmethod
    def initEmailUser(email):

        #see if it already exists
        email_user = Email_User.query.filter_by(email = email).first()
        if email_user:
            email_user.num_clicks += 1
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise
            return

        email_user = Email_User()
        email_user.time_visited = datetime.now()
        email_user.num_clicks = 1
        email_user.email = email
        db_session.add(email_user)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return email_user



class Recipient(Base):
    __tablename__ = 'recipient'
    id = Column(Integer, primary_key=True)

    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    name = Column(String)
    major = Column(String)
    affiliations = Column(String)
    title = Column(String)

    campaign_args = Column(String)

    fb_id = Column(String)

    time_sent = Column(DateTime)
    time_opened = Column(DateTime)

    campaign_id = Column(Integer, ForeignKey('campaign.id'))
    campaign = relationship("Campaign",
        uselist = False,
        primaryjoin = "Campaign.id == Recipient.campaign_id",
        backref = 'recipients'
    )

    university_id = Column(Integer, ForeignKey('university.id'))
    university = relationship("University",
        uselist = False,
        primaryjoin = "University.id == Recipient.university_id",
        backref = 'recipients'
    )
    admin_account = Column(Boolean, default = False)

    @staticmethod
    def init(_dict):
        r = Recipient()
        r.university_id = _dict.get('university_id')
        r.admin_account = _dict.get('admin_account')
        r.time_opened = _dict.get('time_opened')
        r.time_sent = _dict.get('time_sent')
        r.fb_id = _dict.get('fb_id')
        r.title = _dict.get('title')
        r.major = _dict.get('string')
        r.name = _dict.get('name')
        r.first_name = _dict.get('first_name')
        r.last_name = _dict.get('last_name')
        r.email = _dict.get('email')
        r.campaign_args = _dict.get('campaign_args')
        try:
            db_session.add(r)
            db_session.commit()
            r.campaign_id = _dict.get('campaign_id')
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return r


class Skill(Base):
    __tablename__ = 'skill'

    id = Column(Integer, primary_key=True)
    time_added = Column(DateTime)
    name = Column(String) #Usually department + course_number

    category = Column(String)
    is_popular = Column(Boolean)

    short_name = Column(String) #Casual shorted version that students use
    full_name = Column(String)

    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer, ForeignKey('user.id'))

    def __init__(self, name=None, university_id=None, admin_approved=False,\
        contributed_user_id=None, _id=None):
        if _id:
            self.id = _id
        self.name = name
        self.admin_approved = admin_approved
        self.contributed_user_id = contributed_user_id

    def __repr__(self):
        return "<Skill '%r', '%r'>" %\
              (self.id, self.name)

class Currency(Base):
    __tablename__ ='currency'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    icon_url = Column(String)
    is_approved = Column(Boolean, default=False)


class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    background_url = Column(String)
    icon_url = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    is_approved = Column(Boolean, default=True)
    hex_color = Column(String)

    @staticmethod
    def create(name, icon_url=None, background_url='',
        description='', is_active=False, is_approved=False):

        category_arr = Category.query.filter_by(name=name).all()
        if category_arr:
            print 'category', name, 'already exists!'
            return category_arr[0]

        category = Category()
        category.icon_url = icon_url
        category.name = name
        category.background_url = background_url
        category.description = description
        category.is_active = is_active
        category.is_approved = is_approved

        db_session.add(category)

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return category

    def active_subcategories(self):
        return [subcategory for subcategory in self.subcategories if subcategory.is_active]

    def inactive_subcategories(self):
        return [subcategory for subcategory in self.subcategories if not subcategory.is_active]

    def set_inactive(self):
        self.is_active = False
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def set_active(self):
        self.is_active = True
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def approve(self):
        self.is_approved = True
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

class Subcategory(Base):
    __tablename__ = 'subcategory'
    id = Column(Integer, primary_key=True)
    name = Column(String)

    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category",
        primaryjoin = "Category.id == Subcategory.category_id",
        backref = 'subcategories'
        )
    icon_url = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    is_approved = Column(Boolean, default=False)

    @staticmethod
    def create(name, category_id, icon_url=None,
        description='', is_active=False, is_approved=False):

        subcategory_arr = Subcategory.query.filter_by(name=name).all()
        if subcategory_arr:
            print 'category', name, 'already exists!'
            return subcategory_arr[0]

        if not name or not category_id:
            raise

        subcategory = Subcategory()
        subcategory.category_id = category_id
        subcategory.icon_url = icon_url
        subcategory.name = name
        subcategory.description = description
        subcategory.is_active = is_active
        subcategory.is_approved = is_approved

        db_session.add(subcategory)

        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return subcategory


    def set_inactive(self):
        self.is_active = False
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def set_active(self):
        self.is_active = True
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

    def approve(self):
        self.is_approved = True
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise



class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)
    time_added = Column(DateTime)
    # time_created = Column(DateTime)
    # time_updated = Column(DateTime)
    name = Column(String) #Usually department + course_number

    short_name = Column(String) #Casual shorted version that students use
    full_name = Column(String)

    # department_id = ForeignKey("major.id")


    department_short = Column(String) #user generated
    department_long = Column(String)

    is_popular = Column(Boolean)

    code = Column(String)
    variations = Column(String)
    num_gurus = Column(Integer)

    times_mentioned = Column(Integer)
    source = Column(String, default="chegg")
    source_url = Column(String)
    rmp_only =  Column(Boolean)

    course_number = Column(String)
    admin_approved = Column(Boolean, default = False)
    contributed_user_id = Column(Integer, ForeignKey('user.id'))

    department_id = Column(Integer, ForeignKey('department.id'))
    department = relationship("Department",
        primaryjoin = "Department.id == Course.department_id",
        backref = 'courses'
        )

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
        # try:
        #     db_session.commit()
        # except:
        #     db_session.rollback()
        #     raise

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


###################
#### OUTDATED #####
#### NOT USED #####
###################

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

    @staticmethod
    def initAndApplyReferral(sender, receiver):
        referral = Referral()
        referral.sender_id = sender.id
        referral.receiver_id = receiver.id
        referral.time_redeemed = datetime.now()
        receiver.referred_by_id = sender.id
        try:
            db_session.add(referral)
            db_session.commit()
        except:
            db_session.rollback()
            raise
        sender.updateReferralCounts()

    # def __init__(self, sender_id, receiver_id, ):

    #     self.sender_id = sender_id,
    #     self.received_id = receiver_id,
    #     self.card_type = card_type
    #     self.stripe_recipient_id = stripe_recipient_id
    #     self.stripe_customer_id = stripe_customer_id
    #     self.time_added = datetime.now()
    #     self.is_payment_card = is_payment_card
    #     self.is_cashout_card = is_cashout_card

    # def __repr__(self):
    #     return "<User Referral '%r', '%r', '%r', '%r'>" %\
    #           (self.id, self.user.name, self.card_type, \
    #             self.card_last4)


class Version(Base):
    __tablename__ = 'version'
    id = Column(Integer, primary_key=True)
    android = Column(Float)
    ios = Column(Float)
    ios_msg = Column(String)
    android_msg = Column(String)
    latest_android = Column(String)
    latest_ios = Column(String)

    @staticmethod
    def most_recent_by_version(version_id, str_only=False):
        recent_build = Version.get_most_recent_major_build(version_id)
        if not recent_build:
            recent_build = Build.query.all()
            if not recent_build:
                return 1
            recent_build = recent_build[-1]
        result = [recent_build.version_id, recent_build.major_num, recent_build.minor_num, recent_build.message]
        if str_only:
            return "<v%r.%r.%r: %r>" %\
              (recent_build.version_id, recent_build.major_num, recent_build.minor_num, recent_build.message)
        return result

    def get_num_major_builds(self):

        version_query = Build.query.filter_by(version_id=self.id)
        total_version_builds = len(version_query.all())
        major_builds_count = len(version_query.filter_by(is_major =True).all())

        return major_builds_count

    @staticmethod
    def new_major_build(version_id, message):
        v = Version.query.get(version_id)
        num_major_builds = v.get_num_major_builds()
        new_major_build_num = num_major_builds + 1
        b = Build(message=message, is_major=True, is_minor = False,
            major_num=new_major_build_num, minor_num=0, version_id=version_id)
        return b

    @staticmethod
    def get_most_recent_major_build(version_id):
        v = Version.query.get(version_id)
        all_major_builds = Build.query.filter_by(version_id=version_id, is_major=True).all()
        if not all_major_builds:
            return None
        latest_major_build = sorted(all_major_builds, key=lambda k:k.id)[-1]
        return latest_major_build

    @staticmethod
    def new_minor_build(version_id, message):
        v = Version.query.get(version_id)
        latest_major_build = Version.get_most_recent_major_build(version_id)
        if not latest_major_build:
            new_major_build_num = 0
            latest_minor_build_num = sorted(Build.query.all(), key=lambda k:k.id)[-1].minor_num
        else:
            new_major_build_num = latest_major_build.major_num
            latest_minor_build_num = sorted(Build.query.filter_by(version_id=version_id,
                major_num=new_major_build_num).all(), key=lambda k:k.id)[-1].minor_num
        if latest_minor_build_num == 0:
            new_minor_build_num = 1
        else:
            new_minor_build_num = latest_minor_build_num + 1
        b = Build(message, is_major=False, is_minor = True,
            major_num=new_major_build_num, minor_num=new_minor_build_num,
            version_id=version_id)
        return b

    def get_version_by_build_id(self, build_id, str_only=False):
        builds = self.builds
        major_builds_count = 0
        minor_builds_count = 0
        for build in builds[0:build_id]:
            if build.is_minor:
                minor_builds_count += 1
            elif build.is_major:
                major_builds_count += 1
        version_id = self.id

        result = [version_id, major_builds_count, minor_builds_count]
        if str_only:
            result = [str(item) for item in [version_id, major_builds_count, minor_builds_count]]
            return '.'.join(result)
        return result


    def __repr__(self):
        recent_version =self.most_recent_by_version(self.id, True)
        return recent_version

class Build(Base):
    __tablename__ = 'build'
    id = Column(Integer, primary_key=True)
    message = Column(String)
    is_major = Column(Boolean, default=False)
    major_num = Column(Integer)
    minor_num = Column(Integer)
    time_created = Column(DateTime)
    is_minor = Column(Boolean, default=False)
    android_supported = Column(Boolean)
    ios_supported = Column(Boolean)
    _type = Column(Integer)

    version_id = Column(Integer, ForeignKey('version.id'))
    version = relationship("Version",
        uselist = False,
        primaryjoin="Version.id == Build.version_id",
        backref = 'builds')

    def __repr__(self):
        return "<v%r.%r.%r: %r>" %\
              (self.version_id, self.major_num, self.minor_num, self.message)

    def __init__(self, message, version_id = None, is_major = False, is_minor=True,
        android_supported=False, ios_supported=False, _type=None, major_num= 0, minor_num = 0):
        self.is_major = is_major
        self.message = message
        self.major_num = major_num
        self.minor_num = minor_num
        self.is_minor = is_minor
        self.android_supported = android_supported
        self.ios_supported = ios_supported
        self.time_created = datetime.now()
        self._type = _type
        self.version_id = version_id
        db_session.add(self)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise



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

    country = Column(String)
    customer_email = Column(String)
    recipient_email = Column(String)
    exp_month = Column(Integer)
    exp_year = Column(Integer)
    funding = Column(String)
    stripe_card_id = Column(String)

    ## bank fields
    bank_name = Column(String)
    bank_currency = Column(String)
    bank_last4 = Column(String)
    bank_routing_number = Column(String)
    stripe_bank_id = Column(String)

    is_payment_card = Column(Boolean, default=False)
    is_transfer_card = Column(Boolean, default=False)
    is_bank_account = Column(Boolean, default=False)

    stripe_token = Column(String)


    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",
        uselist = False,
        primaryjoin = "User.id == Card.user_id",
        backref = 'cards'
        )

    #If is card default payment
    is_default_payment = Column(Boolean, default=False)

    #If is card default transfer
    is_default_transfer = Column(Boolean, default=False)

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
        card_type = 'NULL'
        if self.is_transfer_card:
            card_type = 'Debit Card  --- %s' % self.stripe_recipient_id
        if self.is_bank_account:
            card_type = 'Bank Account --- %s' % self.stripe_recipient_id
        if self.is_payment_card:
            card_type = 'Payment Card --- %s' % self.stripe_customer_id
        return "\n<Card #%s: %s\n '%r', '%r', '%r'>\n\n" %\
              (self.id, card_type, self.user.name, self.card_type, \
                self.card_last4)

    @staticmethod
    def initFromJson(card_json, user):
        from app.lib.stripe_client import create_customer, create_recipient

        card = Card()
        card.stripe_token = card_json.get('stripe_token')
        if card_json.get('card'):
            card.stripe_customer_id = create_customer(user, card.stripe_token)
        if card_json.get('debit_card'):
            card.stripe_recipient_id = create_recipient(user, card.stripe_token)
        card.card_last4 = card_json.get('card_last4')
        card.card_type = card_json.get('card_type')
        card.time_added = card_json.get('time_added')
        card.is_transfer_card = card_json.get('is_transfer_card')
        card.is_payment_card = card_json.get('is_payment_card')
        card.user_id = user.id
        card.is_default_payment = card_json.get('is_default_payment')
        card.is_default_transfer = card_json.get('is_default_transfer')
        db_session.add(card)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return card

class   Transaction(Base):
    __tablename__ = 'transaction'

    # Types
    SESSION_TRANSACTION = 0
    CASHOUT_TRANSACTION = 1
    CREDIT_PURCHASE = 2


    TRANSFER_INITIATED = 3
    TRANSFER_PROCESSED = 4
    TRANSFER_ERROR = 5
    HOURLY_PRICE = 20

    id = Column(Integer, primary_key=True)

    _type = Column(Integer) #session transaction, cashout transaction, credits purchase

    time_created = Column(DateTime)
    time_processed = Column(DateTime)
    time_updated = Column(DateTime)
    time_disputed = Column(DateTime)
    time_refunded = Column(DateTime)

    deactivated = Column(Boolean, default=False)

    amount_refunded = Column(Float)
    student_amount = Column(Float)
    guru_amount = Column(Float)
    stripe_amount = Column(Float)
    stripe_error_string = Column(String)
    profit = Column(Float)

    charge_id = Column(String)
    transfer_id = Column(String)
    refund_id = Column(String)
    balance_transaction_id = Column(String)
    refunded = Column(Boolean, default=False)
    description = Column(String)


    balance_before = Column(Float)
    balance_after = Column(Float)

    transfer_status = Column(String)
    charge_status = Column(String)

    session = relationship("Session", uselist=False, backref="transaction")

    request = relationship("Request", uselist=False, backref="transaction")

    support = relationship("Support", uselist=False, backref="transaction")

    rating_id = Column(Integer, ForeignKey('rating.id'))

    is_task = Column(Boolean)
    is_question = Column(Boolean)
    is_session = Column(Boolean)

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

    cashout_guru_id = Column(Integer, ForeignKey('user.id'))
    cashout_guru = relationship("User",
        primaryjoin = "(User.id==Transaction.cashout_guru_id)",
                        uselist=False,
                        backref="transfer_transactions")


    card_id = Column(Integer, ForeignKey('card.id'))
    card = relationship("Card",
        uselist = False,
        primaryjoin = "Card.id == Transaction.card_id",
        backref = 'transactions'
        )


    @staticmethod
    def chargeGuruDeposit(deposit_amount, transfer_card, user, charge_id):
        transaction = Transaction()
        transaction.time_created = datetime.now()
        transaction.card_id = transfer_card.id
        transaction._type = 3

        transaction.guru_amount = deposit_amount

        transaction.guru = user

        transaction.charge_id = charge_id.id
        transaction.profit = deposit_amount
        transaction.guru_id = user.id
        db_session.add(transaction)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise
        return transaction

    @staticmethod
    def calculateStudentPriceFromSession(_session):
        minutes = _session.minutes
        hours = _session.hours
        seconds = _session.seconds

        total_hours = hours + (float(minutes / 60.0) ) + (float(seconds / 3600.00))
        total = Transaction.HOURLY_PRICE * total_hours
        return total

    @staticmethod
    def initTransferTransaction(user, card):
        from app.lib.stripe_client import transfer_funds

        transaction = Transaction()
        transaction.time_created = datetime.now()
        transaction._type = 1

        transaction.balance_before = user.balance

        stripe_transfer = transfer_funds(user, user.balance * 100)

        if type(stripe_transfer) is str:
            transaction.stripe_error_string = stripe_transfer
        else:
            transaction.transfer_id = stripe_transfer.id
            transaction.transfer_status = stripe_transfer.status
            transaction.stripe_fee = 0.25
            transaction.guru_amount = user.balance

            if not user.total_cashed_out: user.total_cashed_out = 0
            user.total_cashed_out += user.balance
            user.balance = 0

        transaction.card_id = card.id

        transaction.balance_after = user.balance

        transaction.guru_id = user.id
        transaction.cashout_guru_id = user.id

        db_session.add(transaction)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise


    @staticmethod
    def initFromSession(_session, user):
        from app.lib.stripe_client import charge_customer

        transaction = Transaction()
        transaction.time_created = datetime.now()
        transaction._type = 0
        transaction.is_session = True
        transaction.student_amount = Transaction.calculateStudentPriceFromSession(_session)

        transaction.guru = _session.guru
        transaction.guru_amount = transaction.student_amount * 0.8

        if not transaction.guru.total_earned: transaction.guru.total_earned = 0
        if not transaction.guru.balance: transaction.guru.balance = 0

        transaction.guru.balance += transaction.guru_amount

        transaction.guru.total_earned += transaction.guru_amount

        if _session.student.cards:
            stripe_charge = charge_customer(_session.student, transaction.student_amount)
            transaction.session = _session

            if type(stripe_charge) is str:
                transaction.stripe_error_string = stripe_charge

            else:
                transaction.charge_id = stripe_charge.id
                transaction.stripe_fee = (transaction.student_amount * .029) + 0.3
                transaction.profit = transaction.student_amount - transaction.guru_amount - transaction.stripe_fee

                transaction.guru_id = _session.guru_id
                transaction.student_id = _session.student_id
                transaction.card_id = _session.card_id
        else:
            transaction.stripe_error_string = 'Student does not have card'

        db_session.add(transaction)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return transaction

    @staticmethod
    def initFromQuestion(_request, user, rating):

        from app.lib.stripe_client import charge_customer

        transaction = Transaction()
        transaction.time_created = datetime.now()
        transaction.rating_id = rating.id
        transaction._type = 1
        transaction.is_question = True
        transaction.student_amount = float(_request.student_price)

        transaction.guru = _request.guru
        transaction.guru_amount = transaction.student_amount

        # initialize these in case they havent
        if not transaction.guru.total_earned: transaction.guru.total_earned = 0
        if not transaction.guru.balance: transaction.guru.balance = 0

        transaction.guru.balance += transaction.guru_amount

        transaction.guru.total_earned += transaction.guru_amount

        if _request.student.cards:
            stripe_charge = charge_customer(_request.student, transaction.student_amount)
            transaction.request = _request

            if type(stripe_charge) is str:
                transaction.stripe_error_string = stripe_charge

            else:
                transaction.charge_id = stripe_charge.id
                transaction.stripe_fee = (transaction.student_amount * .029) + 0.3
                transaction.profit = transaction.student_amount - transaction.guru_amount - transaction.stripe_fee

                transaction.guru_id = _request.guru_id
                transaction.student_id = _request.student_id

                # get default card real quick
                default_card = None
                for card in _request.student.cards:
                    if card.is_default_payment:
                        default_card = card

                if default_card:
                    transaction.card_id = default_card.id
        else:
            transaction.stripe_error_string = 'Student does not have card'

        db_session.add(transaction)
        try:
            db_session.commit()
        except:
            db_session.rollback()
            raise

        return transaction




