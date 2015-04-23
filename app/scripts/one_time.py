
===Todo features end-to-end(priority)===
- finish calendar (guru/student availability) [come back to this!]
- push notifications
- timer (javascript)
- guru re-request
- forms css

===feature (functionality / interface )===
[major, server] - calendar
    - spec it out [9:48]
        - data-model  (request_calendar, proposal_calendar)
            - Calendar
                - time_zone
                - status
                - request_id / request
                - start_day
                - number_of_days
                - time_created
                - time_modified
            - Events
                - start_date
                - end_date
                - location
        - rest-api
            - student adds calendar
            - student modifies calendar
            - guru readjusts calendar
        - client-side (when get here scope it out)
            - calendar view
            - edit-mode (+ save)
            - view-mode

    - implement server side
    - client-side
[medium] -- add your own major/course / university
[settings for guru courses + major]
[major, server] - push notification
[minor] - create an account promo code
[minor] - forgot password
[minor, client] - student's time does not update like it should'

===bug===
[minor, client] - $scope.user is not an object
[minor, client] - user geocode error + set location not set after that
[minor] - remove clear local cache (logout)
[minor] - login should go to login
[minor] - after become a guru is & asked to log in, it should go to want to make some moolah
[minor, client] - student client looks hella jank after they add their card
[minor] - student / guru relationships are created twice
[medium, client] - student client looks hella jank after they add their card
[medium, server] - timezone not supported

===ux / appearance / style / enhancements===

===performance===
[major] add loaders where they need to be
[medium] - get rid of all the other requests (CDN or package together)


==enhancement==
[medium] if location not found, let user enter their location after default is the university location
[client, minor] switch debit card phone input to pin mode
[client, minor] background location, when to turn off & on
[calendar for gurus, students, etc]

==edge cases==
- what if user turns off location during the active session

==unrelated but important==
- build script should delete all the html files after compressed & sent to production build

===DONE===
### 1. finish script + update production database
### 2. submit to production & test
### 3. Create new accounts to test (immediately go to later in the workflow).


===Varada screens===
- First time user workflow when they download the app
- Promo code?
- First time for everyone (high school parent, teacher, etc)
- Homepage when there is a request + courses
- Message empty state
- calendar views


===Samir Product===
Take a first pass on
- On guru homepage should their active sessions if possible424

===Business Model===
- guru
    - We take tips
    - work your way up to awesome rewards (give students the ability to instant book!)
    -
- student
    - business model mocks

- community average is this amount


===Flex todo===
--> https://github.com/postcss/autoprefixer
--> Gulp watch
--> look into flex grid

===Flex cool resources===
http://www.smashingmagazine.com/2015/03/02/harnessing-flexbox-for-todays-web-apps/


import time
from apns import APNs, Frame, Payload
apns = APNs(use_sandbox=True, cert_file='push_cert.pem', key_file='push_key_no_pass.pem')
token_hex = '22def699260bb1b43666e6ec89074bd1bc1134ad70108ac27272a9d01680ae58'
payload = Payload(alert="Hello World!", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)

android_api_key = "AIzaSyDwyrdLCMru6MrmFZqAjIDEwRsPTON4lPc"

from gcm import GCM

gcm = GCM(API_KEY)
data = {'message': 'Hello World', 'message': 'value2'}

# Plaintext request
reg_id = ''
gcm.plaintext_request(registration_id=reg_id, data=data)

## Push for Android
##

## Push
## [MVP] Student needs help --> you can make this much
## [MVP] Guru can help! --> You can make this much
## [MVP] Student you need this many messages
## [TODO: Your session is starting in 15 minutes]
## Push (full feature)
## - detect when student / user has not enabled push notifications
## -


=== push notification resources ====



from app.models import User
from app.lib.push_notif import *
user = User.query.get(130)
notif_key = 'student_request'
args_tuple = ('50', 'CS10', 'Mami', '20min')
send_push_for_user_devices(user, notif_key, args_tuple)

from app.tasks import *
from app.models import *
student = User.query.get(1)
course = Course.query.get(139)
available_gurus = _request.course.gurus.all()
print available_gurus

import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
all_virginia_emails_sent = []
from pprint import pprint
message_results = mandrill_client.messages.search(query="email:virginia.edu",limit=1000)
for email in message_results:
    all_virginia_emails_sent.append(email['email'])
with open('emails_sent/university_of_virginia.json', 'wb') as fp:
    json.dump(all_virginia_emails_sent, fp, indent = 4)

import requests, json
url = 'https://api.sendgrid.com/api/newsletter/lists/email/add.json'
api_user = 'sam1rm'
api_password = 'launchuguru1'
params = {"list":"virginia_sent_emails", "api_user":api_user,"api_key":api_password, "data":all_virginia_emails_sent[:50]}
result = requests.post(url=url, params=params)

import requests
def create_mailing_list():
    return requests.post(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'address': 'LIST@berkeleyguru.org',
              'description': "Mailgun developers list"})

# create a list
#

import requests
url = 'https://api.sendgrid.com/api/newsletter/lists/add.json'
api_user = 'sam1rm'
api_password = 'launchuguru1'
params = {"list": "virginia_sent_emails", "api_user": api_user, "api_key": api_password}
result = requests.get(url=url, params=params)

# add emails to a list



import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
all_templates = mandrill_client.templates.list()
all_relevant_templates = []
all_relevant_template_slugs = []
for template in all_templates:
    if 't' in template['name'].lower()[0:1] and ':' in template['name'].lower():
        all_relevant_templates.append(template)
        all_relevant_template_slugs(template['slug'])
        print template['slug']


all_tds = [template for template in all_relevant_templates if 'D:' in template['name']]
all_t1s = [template for template in all_relevant_templates if 'D:' not in template['name']]
all_t1_slugs = [template['slug'] for template in all_relevant_templates]
# print len(all_tds)
# print len(all_t1s)
# for t1 in all_t1s:
#     print t1.keys()
    # get all recipients
    # send to all recipients
# from pprint import pprint
# for td in all_tds:
    # get all recipients
    # send to all recipients

# search messages YESTERDAY --> filter by subject tag, print tags joined by a space


[]
['t10-frats-use-this-to-get-perfect-grades', 't11-perfect-grades-and-parties-at-the-same-damn', 't12-urgent-uva-students-needed-at-20-hour', 't8-hear-about-the-uva-kid-who-partied-too-hard', 't9-uva-it-s-like-cheating-but-we-encourage-i']




import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
messages = mandrill_client.messages.search(limit=1000, date_from='2015-03-27', date_to='2015-03-28', query='email:virginia.ed')
index = 0
_dict = {}
for m in messages:
    index += 1
    template_name = m['template']
    subject_name = m['subject']
    if not _dict.get(template_name):
        _dict[template_name] = [m]
    else:
        _dict[template_name].append(m)


import datetime
one_day_later = datetime.datetime.now() + datetime.timedelta(days=1)
one_day_later.utcnow()
import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
message = {
    'subject': 'test',
    'from_email': 'samir@uguru.me',
    'from_name': 'samir makhani',
    'to': [{'email':'makhani.samir@gmail.com', 'type':'to'}],
    'headers': {'Reply-To': 'samir@uguru.me'},
    'important': True,
    'track_opens': True,
    'track_clicks': True,
    'preserve_recipients':False,
    'tags':['test']
}

import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
messages = mandrill_client.messages.list_scheduled()
batch_14_message_template = messages[50:51][0]
batch_15_message_template = messages[150:151][0]
batch_16_message_template = messages[250:251][0]
batch_17_message_template = messages[350:351][0]
batch_18_message_template = messages[450:451][0]
all_batches_scheduled = [batch_14_message_template, batch_15_message_template,\
batch_16_message_template, batch_17_message_template, batch_18_message_template]
all_batches_scheduled_subjects = [template['subject'] for template in all_batches_scheduled]
for batch_template in all_batches_scheduled:
    print batch_template['subject'], batch_template['send_at'], batch_template['created_at']



#send out test RIGHT NOW for batch 16 + batch 17

# get all templates by name
#




import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
message = {
        'subject': '[URGENT] UVA Students Needed at $20/hour',
        'from_email': 'chloe@uguru.me',
        'from_name': 'chloe',
        'to': [{'type':'to', 'email':'batch-16@uguru.me'}],
        'headers': {'Reply-To': 'chlose@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['TEST'],
        'metadata': {
            'batch_id': 16
        }
    }
message = mandrill_client.messages.send(message=message)


for message in mandrill_client.messages.list_scheduled():
    m = mandrill_client.messages.cancel_scheduled(id=message['_id'])
    print m

from app.lib.mailgun import *
import json
result = list_members('virginia')
f = json.loads(result.content)
all_emails = f['items']

from app.lib.mailgun import *
all_members = get_n_list_members(750)


m = mandrill_client.messages.search(query='u_batch_id:17')





def mailgun_list_to_mandrill_recipients(arr):
    result = []
    for recipient in arr:
        result.append{
            'email': recipient['address']
        }


from app.lib.mailgun import *
all_members = get_n_list_members(3100)

messages = mandrill_client.messages.list_scheduled()
for m in messages:
    mandrill_client.messages.cancel_scheduled(id=m['_id'])

import mandrill, json
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
messages = mandrill_client.messages.list_scheduled()
batch_14_message_template = messages[50:51][0]
batch_15_message_template = messages[150:151][0]
batch_16_message_template = messages[250:251][0]
batch_17_message_template = messages[350:351][0]
batch_18_message_template = messages[450:451][0]
all_batches_scheduled = [batch_14_message_template, batch_15_message_template,\
batch_16_message_template, batch_18_message_template, batch_17_message_template]
all_batches_lengths = [(0,750), (750, 1500), (1500, 2250), (2250, 3000), (3000,3100)]
all_batches_subjects = ['[URGENT] UVA Students Needed at $20/hour','Hear about the UVA kid who partied too hard?', 'Hear about the UVA kid who partied too hard?','Hear about the UVA kid who partied too hard?', 'This UVA kid parties way too hard']
all_batches_templates = ['T19: [URGENT] UVA Students Needed at $20/hour','Hear about the UVA kid who partied too hard?', 'Hear about the UVA kid who partied too hard?','Hear about the UVA kid who partied too hard?', 'T18: This UVA kid parties way too hard']
all_batches_scheduled_subjects = [template['subject'] for template in all_batches_scheduled]
for batch_template in all_batches_scheduled:
    print batch_template['subject'], batch_template['send_at'], batch_template['created_at']



for index in range(14,19):
    batch_template = all_batches_scheduled[index - 14]
    recipients = all_members[all_batches_lengths[index-14][0]:all_batches_lengths[index-14][1]]
    recipients.append({'name': 'uguru batch tracker', 'email':'batch-' + str(index) + '@uguru.me'})
    tags = ['Virginia', 'Mar-30']
    message = {
        'from_email': 'chloe@uguru.me',
        'from_name': 'Chloe',
        'headers': {'Reply-To': 'chloe@uguru.me'},
        'important': True,
        'track_opens': True,
        'subject': all_batches_subjects[index - 14],
        'track_clicks': True,
        'preserve_recipients': False,
        'tags': tags,
        'to': recipients,
        'metadata': {
            'batch_size': len(recipients) - 1,
            'tags': ' '.join(tags),
            'batch_id': index,
            'campaign_id': index,
            'batch_campaign_id': 1,
            'university': "virginia"
        }
    }
    template_name =all_batches_templates[index - 14]
    send_at = '2015-03-31 20:00:00'
    result = mandrill_client.messages.send_template(message=message, template_name=template_name, template_content=[], send_at=send_at)
    print
    pprint(result)



for member in all_members:
    delete_member_in_list(member['email'], 'virginia')


def add_members_from_arr(arr):
    formatted_arr = format_json_to_mailgun_member_format(arr, "university_of_virginia")

    return requests.post(
        "https://api.mailgun.net/v2/lists/virginia-already-sent@nationalacademicresearch.org/members.json",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'upsert': True,
              'members': json.dumps(formatted_arr)})


    # result = mandrill_client.messages.send(message=message, template_name=template_name, send_at=send_at)


# guru page MVP (20 minutes)
# student page MVP (20 minutes)
# we're at ... MVP (20 minutes + modals)
# components polishing / css / friendly



import json
f = open('university_data_dict_more_condensed.json')
school_dict = json.load(f)
new_dict = {}
for school_id in school_dict.keys():
    new_dict[str(school_id)] = {
            'id': int(school_id),
            'professors': school_dict[school_id]['top_professors_names'],
            'title': school_dict[school_id]['title'],
            'city': school_dict[school_id]['city'],
            'state': school_dict[school_id]['state'],
            'popular_courses': school_dict[school_id]['unique_courses'][0:24],
            'thumbnail': school_dict[school_id]['thumbnail']
    }

with open('all_schools_updated.py', 'wb') as fp:
    json.dump(new_dict, fp, indent = 4)


import json
f = open('ucla.json')
school_arr = json.load(f)
new_arr = []
for user_info in school_arr:
    if 'ucla.edu' not in user_info.get('email').lower():
        split_name = user_info.get('name').lower().replace(',','').split(' ')
        new_arr.append({'first_name': split_name[1],'last_name': split_name[0],'name': split_name[1] + ' ' split_name[0],'email': user_info.get('email').lower()})
with open('ucla_reg_emails.py', 'wb') as fp:
    json.dump(new_arr, fp, indent = 4)
print len(new_arr), 'emails processed'



import json
f = open('all_schools_updated.json')
school_dict = json.load(f)
new_dict = {}
for school_id in school_dict.keys():
    new_dict[str(school_id)] = {
            'id': int(school_id),
            'professors': school_dict[school_id]['top_professors_names'],
            'title': school_dict[school_id]['title'],
            'city': school_dict[school_id]['city'],
            'state': school_dict[school_id]['state'],
            'popular_courses': school_dict[school_id]['unique_courses'][0:24],
            'thumbnail': school_dict[school_id]['thumbnail']
    }

import json
from all_schools_updated import school_dict
school_dict = json.loads(f)
final_arr = []
for school_id in school_dict.keys():
    final_arr.append({
            'id': int(school_id),
            'title': school_dict[school_id]['title'],
            'city': school_dict[school_id]['city'],
            'state': school_dict[school_id]['state'],
            'thumbnail': school_dict[school_id]['thumbnail']
    })
with open('universities_web2.json', 'wb') as fp:
    json.dump(final_arr, fp, indent = 4)


web3_dict =  {
        "id": 1948,
        "city": "Baltimore",
        "state": "MD",
        "thumbnail": {
            "source": "http://upload.wikimedia.org/wikipedia/commons/thumb/0/06/UMB_Davidge_Hall.jpg/50px-UMB_Davidge_Hall.jpg",
            "width": 50,
            "height": 35
        },
        "title": "University of Maryland, Baltimore"
}

import json
wikipedia_data = open('wikipedia_university_data.json')
wiki_json = json.load(wikipedia_data)
from app.models import *
from app.lib.all_schools_updated import school_dict
for school in wiki_json:

    #import the id

    title = school.get('db_name')
    u = University.query.filter_by(name=title).all()
    if u and len(u) == 1:
        school['id'] = u[0].id
    if len(u) > 1:
        print "more than one ", title
    if not u:
        print "none for", title


    if school['id']:
        uni_school_dict = school_dict(str(school['id']))
        school['popular_courses'] = uni_school_dict['school_dict']
        school['professors'] = uni_school_dict['professors']
        school['rmp_title'] = uni_school_dict['title']
        if uni_school_dict.get('thumbnail'):
            thumbnail = uni_school_dict.get('thumbnail')
            school['images']['all'].append({
                'url': thumbnail['source'],
                'height': thumbnail['height'],
                'width': thumbnail['width']
            })


    school['variations'] = []
    articles = ['of', ',', 'and', '-', 'the']
    # website shortened name
    if school.get('website'):
        school['variations'].append(school.get('website'))

    school_title = school['title']

    #normalized version
    normalized_version = school_title.replace('of', '').replace(',','').replace('and','').replace('-','').replace('the', '').replace('  ',' ')
    school['variations'].append(normalized_version)

    # acronym version
    first_letter_normalized = [word[0][0] for word in normalized_version]
    school['variations'].append(''.join(first_letter_normalized))

    print ' '.join(school['variations'])




    # sanitize all dashes + print the one's with dashes

    # add the website
    # add the acronym without articles

    # add local variations


import json
from app.models import *
f = open('app/static/data/universities_web3.json')
arr = json.load(f)
web_unis = arr
web_ids = [uni['id'] for uni in arr]
f = open('web_university4.json')
arr = json.load(f)
wiki_unis = arr
wiki_ids = [uni['id'] for uni in wiki_unis]
count = 0
index = 0
for _id in wiki_ids:
    if _id not in web_ids:
        web_unis.append({
            "id": wiki_unis[index]['id'],
            "thumbnail": wiki_unis[index]["logo"],
            "title": wiki_unis[index]["title"],
            "city": wiki_unis[index]["city"],
            "state": wiki_unis[index]["state"],
            "variations": wiki_unis[index]["variations"]
        })
    else:
        web_index = web_ids.index(_id)
        web_uni = web_unis[web_index]
        web_uni['variations'] = wiki_unis[index]["variations"]
        web_uni['thumbnail'] = wiki_unis[index]["logo"]
    index += 1
with open('web_university5.json', 'wb') as fp:
    json.dump(web_unis, fp, indent = 4)

# local variations
# append url from before w/ width & height
# append popular courses here from schools_updated



from pprint import pprint
import json
from app.models import *
from app.lib.all_schools_updated import school_dict
arr = json.load(open('wikipedia_university_data.json'))
count = 0
for uni in arr:
    u = University.query.filter_by(name=uni['db_name']).first()
    uni['state'] = u.state
    uni['city'] = u.city
    school_dict_uni = school_dict.get(str(u.id))
    if school_dict_uni and school_dict_uni.get('popular_courses') and school_dict_uni.get('professors'):
        uni['popular_courses'] = school_dict[str(u.id)]["popular_courses"]
        uni['id'] = u.id
        uni['title'] = u.name
        uni['professors'] = school_dict[str(u.id)]["professors"]
        if uni.get('images') and not uni['images'].get('all') and school_dict_uni.get('thumbnail'):
            uni['images']['all'] = [school_dict_uni.get('thumbnail')]
        count += 1

with open('university_master_data.json', 'wb') as fp:
    json.dump(arr, fp, indent = 4)