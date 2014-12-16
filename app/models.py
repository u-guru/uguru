from sqlalchemy import String, Integer, Column, ForeignKey, Float, SmallInteger, Boolean, Table, Unicode, DateTime
from flask import url_for
from sqlalchemy.orm import relationship, backref
from app.database import Base, db_session
from datetime import datetime
import os

# TODO create __dict__ for popular objects

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)