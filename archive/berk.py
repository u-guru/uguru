from app.models import *

berkeley_id = 2307

berkeley = University.query.get(2307)

active = []
count = 0

## Need to recover names
for u in User.query.all():
    if u.university_id == berkeley.id and (u.total_earned or u.balance):
        count += 1
        print u.email

print count