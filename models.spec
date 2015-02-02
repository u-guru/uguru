User
- student_sessions
- guru_sessions
- requests
- student_ratings
- guru_ratings
- last_position
- all_positions
- gurus
- conversations
- devices
- deactivated

Session
- length (int, minutes)
- tutor 
- student
- active
- position
- messages
- displayed/hidden (to user)
- expiration date
- status (Guru is on the way, Guru has arrived, Session is ongoing)

Request
- position
- proposals
- status (complete, incomplete, canceled, expired)
- file

Proposal
- guru
- student
- rank
- status (active, expired, guru_accepted, guru_rejected, student_rejected)
- events (sent to guru, opened by guru)

Event
- user_id

File
- type
- name 
- aws_url (where it's stored)
- size

Position (all are doubles)
- Longitude
- Latitude
- Altitude
- Accuracy
- Altitude Accuracy
- Heading
- Speed
- Timestamp

Device
- model
- cordova (version)
- platform
- uuid
- version
- name

Conversation
- sessions
- messages (flat)

Message
- type (text, file)
- 

# Cases to solve
- Student pings tutor, then what?
- Student starts but doesn't finish

# Modular functions to create
- user.update() (whole user)
- user.updateAttr() part of a user

	