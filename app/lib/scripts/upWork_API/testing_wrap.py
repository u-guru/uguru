import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper
from twisted.internet import task
from twisted.internet import reactor

#post a job
#owner = '2103890'
owner = '1850815'
title = '50 Colleges Data Scraping/Data Collection/Data Entry'
rate = 'fixed-price'
#description = 'sup motherfucker'
category = 'Administrative Support'
sub_category = 'Data Entry'

#job_key = '~016e686fe0d68ba380'
budget = '1.05'
data = {'q':'python','title':'Web Developer'}
#id_job = '~01d7c4aaf7bf45158d'
reason_id = '67'
#freelancer_id = '~01e8243994efcf5de1'
private_or_not = 'public'
duration = ''
#job_key_id = '~016e686fe0d68ba380'
milestone_description = 'Very first milestone'
due_date = '08-15-2015'
job_key = '~014754850f959aacfa'
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
    {"milestone_description":"Every 10 school you get done, you will be awarded with 10 cents.\n\n Deadline: Sunday, July 23rd 2015(California) by the end of the day", "deposit_amount":".10", "due_date":"07-23-2015"},
]
message_content_body = 'Regarding the task'
message_content_bcc = 'Hello!, The task doc is here https://docs.google.com/spreadsheets/d/1ZvMta5p-B5_RS-7bwuk6xh9iFZciU8MNplderKoBm28/edit?usp=sharing, in my job thread, I have clearly elaborated everything what to do with these docs for instruction please refer back to the orgina job posting I made!'
#upwork_wrapper.send_message(main_owner,freelancer_id_1,body,bcc)
#upwork_wrapper.send_message(owner_id,recipients,message_content_body,message_content_bcc)
#upwork_wrapper.get_profile_details(freelancer_id_1)
# upwork_wrapper.list_job_applications(owner,job_key)
category = 'Administrative Support'
sub_category = 'Data Entry'
job_key = '~014754850f959aacfa'
context = {'related_jobcategory': '40'}
cover_message = 'Hello guys! I will be sending over google docs, shortly'
# upwork_wrapper.cancel_a_job(job_key,'2')
# upwork_wrapper.get_milestone_submission_list()
#pwork_wrapper.get_milestone_submission_list()
# with open('user_name_applications.json') as send_message:
# 	get_me_data = json.load(send_message)
# 	for item in get_me_data:
# 		get_me_worker_id = item[1]['participants']
# 		for send_message in get_me_worker_id:
# 			username = send_message['username']
# 				#upwork_wrapper.send_message('2405c762',username,'Regarding the new job', 'Hello there! I have got a very reasonable pricing job for you!, I apologise as I couldnt get back to you regarding my early job posting, here is the link to the new job posting /https://www.upwork.com/jobs/Colleges-Data-Scraping-Data-Collection-Data-Entry_~~f12cd1aa02b2bdde/, its a perfect deal')
# 			upwork_wrapper.send_client_offer('Data Scraping','fixed-price',1.0,description,'1850815','r9gf7hijszllyinylk0xrg',context=context,contractor_username = username,milestones=milestones )
# 			print "offer sent to", username
#~01482ead7845bf6cea
upwork_wrapper.send_message('2405c762','rashidhussain157','Regarding the new job', 'Hello there! Excellent job, all you need to do is paste your work on the respective google doc I sent you instead of excel sheet! for me to confirm things and pay you!, Thank you!')
# milestones = 
# [
#    	{"milestone_description":"Get the needed field data in the google sheet(https://docs.google.com/spreadsheets/d/1673EIcylaWhUSEFK0SglZ1YKQaqmn5fgQJ_icsMd_bQ/edit?usp=sharing) direction is written in job post and description above!\n\n Deadline: Sunday, July 23rd 2015(California) by the end of the day", "deposit_amount":"1", "due_date":"07-23-2015"},
# ]
#job_key = '~0183c00a03fa3ec592'
#ERROR - Samir I need help on client.offers.send_client_offer - Client_team_reference don't know how to get that value, in doc it says list items, I tried all the value from list items, doesn't work still!
# description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 50 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, July 23rd(California) by the end of the day'
# upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
#client.offers.send_client_offer('Data Scraping','fixed-price',5.0,description,'1850815','r9gf7hijszllyinylk0xrg',context=context,contractor_username = username,milestones=milestones )
#upwork_wrapper.hire_someone(job_key,cover_message,freelancer_id_3)
#upwork_wrapper.get_message_content(owner,'inbox')
#upwork_wrapper.get_client_offer(job_key)
#upwork_wrapper.create_a_mile_stone(owner,milestone_description,budget,due_date)
#upwork_wrapper.get_list_of_categories()
#upwork_wrapper.get_job_list_ids(owner)
#upwork_wrapper.get_freelancer_brief_info(freelancer_id)
#upwork_wrapper.get_job_profile(job_key)s
#upwork_wrapper.search_for_freelancer(data=data)
#upwork_wrapper.cancel_a_job(id_job,reason_id)




#upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,status = 'open')
# upwork_wrapper.list_job_applications(owner,job_key)
# def create_a_job():
# 	upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])

# def hire_proccess():
# 	with open('job_applications.json') as f:
# 			freelancer_id = json.load(f)
# 			json_string = json.dumps(freelancer_id, sort_keys = True, indent = 2)
# 			parent = freelancer_id['applications']
# 	#	print parent
# 			for item in parent:
# 				contractor = item['contractor_ciphertext'] # ->FREELANCER ID
# 				hire_someone = upwork_wrapper.hire_someone(job_key,cover_message,contractor)

# def send_a_message():
# 	with open('thread_id.json','w') as fps:
# 		thread_id = json.load(fps)
# 		thread_string = json.dumps(thread_id,sort_keys = True, indent = 2)
		




# def view_job_applications():
# 	upwork_wrapper.list_job_applications(owner,job_key)



# def check_job_application_every_certain_time(view_job_applications):
# 	timeout = 100
# 	l = task.LoopingCall(view_job_applications)
# 	l.start(timeout)
# 	reactor.run()



# check_job_application_every_certain_time(view_job_applications)