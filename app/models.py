from sqlalchemy import String, Integer, Column, ForeignKey, Float, SmallInteger, Boolean, Table, Unicode, DateTime
from sqlalchemy.orm import relationship, backref
from app.database import Base, db_session
from datetime import datetime
import os

# TODO create __dict__ for popular objects

from app import flask_bcrypt
 
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    
    guru_courses = relationship('Course', backref='user', lazy='dynamic')
    semester_courses = relationship('Course', backref='user', lazy='dynamic')
 
    def __init__(self, email, password):
        self.email = email
        self.password = flask_bcrypt.generate_password_hash(password)
 
    def __repr__(self):
        return '<User %r>' % self.email
 
class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    created_at = Column(DateTime)
 
    def __init__(self, name):
        self.name = name
        self.created_at = datetime.now()
 
    def __repr__(self):
        return '<Course %r>' % self.name
