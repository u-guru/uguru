from sqlalchemy import String, Integer, Column
from app.database import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    name = Column(String(64), index = True)
    email = Column(String(64), index = True, unique = True)
    password = Column(String(64), index = True)

    def __repr__(self):
        return "Name: %s, Email: %s" % (self.name, self.email, self.password)