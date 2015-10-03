import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper
from twisted.internet import task
from twisted.internet import reactor

#post a job
#owner = '2103890'
owner = '1850815'
title = '125 Colleges Data Scraping/Data Collection/Data Entry[Needed ASAP]'
rate = 'fixed-price'
#description = 'sup motherfucker'
category = 'Administrative Support'
sub_category = 'Data Entry'

#job_key = '~016e686fe0d68ba380'
budget = '1'
data = {'q':'python','title':'Web Developer'}
#id_job = '~01d7c4aaf7bf45158d'
reason_id = '67'
#freelancer_id = '~01e8243994efcf5de1'
private_or_not = 'public'
duration = ''
#job_key_id = '~016e686fe0d68ba380'
milestone_description = 'Very first milestone'
due_date = '08-15-2015'
#job_key = '~0118f300e961e66862'
status = 'shortlisted'
page = '1'
cover_message = 'Hello!, Looking at your profile, I am interested in hiring you!'

freelancer_id_1 = '~011d8724f956a759b0'
freelancer_id_2 = '~019a997e9118c21d5a'
freelancer_id_3 = '~015f8632866ff09eb6'
body = 'Hello, I would like for you to get me school datas!'
bcc = 'Hello, I would like for you to get me school datas!'
main_owner = 'Samir Makhani'
owner_id = '2405c762'
recipients = 'layug_lorielyn'
#recipients = 'rashidhussain157'
share_docs_array=['https://docs.google.com/spreadsheets/d/1673EIcylaWhUSEFK0SglZ1YKQaqmn5fgQJ_icsMd_bQ/edit?usp=sharing','https://docs.google.com/spreadsheets/d/1BHFRaPYAKv7-s7cMN5Psb4Io7yWwFuAmTHn3I9JQ5r8/edit?usp=sharing','https://docs.google.com/spreadsheets/d/1U-SvLqvDanU50JuGPiG2e_ghqMhT0tTL9ZpWQA4OzCQ/edit?usp=sharing','https://docs.google.com/spreadsheets/d/1aZdvv3h-3InMwAUlObn_b0Qu48XD-kCzgK6AseAGJOc/edit?usp=sharing']
milestones = [
    {"milestone_description":"once 100 school is completed, you will be awarded with 1 dollar.\n\nPLEASE use this doc link to fill in I WILL NOT ACCEPT your own excel sheet - use this URL to get started on the task URL :https://docs.google.com/spreadsheets/d/1pgidch9DHaaL_-xl9oOVB9jAsW0WGO-3t063DYpVt0s/edit?usp=sharing\n\n Deadline: Sunday, July 23rd 2015(California) by the end of the day\n\n", "deposit_amount":"1", "due_date":"07-23-2015"},
]
# description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 100 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n \n\n There are two milestones and each milestone completion is at 50 schools and will be awarded with .50 cents.\n\n Deadline: Sunday, July 31st(California) by the end of the day'
#upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
# upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category, budget = 1,duration = 100,status = 'open')
message_content_body = 'Regarding the task'
message_content_bcc = 'Hello!, The task doc is here https://docs.google.com/spreadsheets/d/1ZvMta5p-B5_RS-7bwuk6xh9iFZciU8MNplderKoBm28/edit?usp=sharing, in my job thread, I have clearly elaborated everything what to do with these docs for instruction please refer back to the orgina job posting I made!'
#upwork_wrapper.send_message(main_owner,freelancer_id_1,body,bcc)
#upwork_wrapper.send_message(owner_id,recipients,message_content_body,message_content_bcc)
#upwork_wrapper.get_profile_details(freelancer_id_1)
# upwork_wrapper.list_job_applications(owner,job_key)
category = 'Administrative Support'
sub_category = 'Data Entry'
job_key = '~0124db4d6eaf66b9fe'
context = {'related_jobcategory': '40'}
cover_message = 'Hello guys! I will be sending over google docs, shortly'
#title = 'Data Scraping'
job_type = 'fixed-price'
charge_rate = '1.00'
description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 100 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n DATE FORMAT SHOULD BE LIKE THIS \b[0/0/2015] - NOT LIKE THIS [Wednesday - 08 - 2015]  - \n\n Deadline: Sunday, August 3rd(California) by the end of the day'
username = 'kkumar20'
#upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category, budget = 1,duration = 100,status = 'open')
#upwork_wrapper.list_job_applications(owner,job_key)




#upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])

# upwork_wrapper.send_client_offer('Data Scraping','fixed-price',1.0,description,'1850815','r9gf7hijszllyinylk0xrg',context=context,contractor_name='sa_shahin',milestones=milestones )
# print "Message Sent"


with open('user_name_applications.json') as send_message:
	get_me_data = json.load(send_message)
	for item in get_me_data:
		get_me_worker_id = item['participants']
		for send_message in get_me_worker_id:
			username = send_message['username']
			upwork_wrapper.send_message('2405c762',username,'IMPORTANT NOTICE ON THE TASK', 'Hello there! I am NOT accepting any tasks with a wrong date format, PLEASE FOLLOW THIS FORMAT if you would like to get paid. month/day/year, example - 2/28/2015 ONLY THIS FORMAT IS ACCEPTED!')
			print "offer sent to", username





				
