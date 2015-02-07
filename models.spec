User
- last_position xx
- all_positions xx
- relationships xx
- devices xxx
- deactivated xxx
- requests xxx
- student_sessions xx
- guru_sessions xx
- student_ratings xx
- guru_ratings xx

Relationship

Message xx
- type (text, file) xx
- displayed / hidden xx
- time_created xx
- time_read xx

Conversation x
- sessions x
- messages (flat) x

Rating x
- Session x
- Support x

Position (all are doubles) xxx
- Longitude x
- Latitude x
- Altitude x
- Accuracy x
- Altitude Accuracy x
- Heading x
- Speed x
- Timestamp x

Session xxx
- length (int, minutes) x
- tutor x
- student x
- position x
- messages x
- displayed/hidden (to user) x
- expiration date x
- status (Guru is on the way, Guru has arrived, Session is ongoing) x
- events (ask rob) x

Proposal xxx
- guru xx
- student xx
- rank xx
- status (active, expired, guru_accepted, guru_rejected, student_rejected)
- events (sent to guru, opened by guru)

Event x
- user_id x

File xxx
- type
- name
- aws_url (where it's stored)
- size

Device xxxx
- model
- cordova (version)
- platform
- uuid
- version
- name

Request xxx
- position xxx
- proposals xxx
- status (complete, incomplete, canceled, expired) xxx
- files xxx
- course xxx
- student xxx
- gurus xxx

# Cases to solve
- Student pings tutor, then what?
- Student starts but doesn't finish

# Modular functions to create
- user.update() (whole user)
- user.updateAttr() part of a user