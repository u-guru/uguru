import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper
from twisted.internet import task
from twisted.internet import reactor

#post a job
#owner = '2103890'
owner = '1850815'
title = '500 Colleges Data Scraping/Data Collection/Data Entry'
rate = 'fixed-price'
#description = 'sup motherfucker'
description = 'I am looking to hires someone who can WEB RESEARCH + DATA ENTRY for 500 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, July 20th 2015(California) by the end of the day'
category = 'Administrative Support'
sub_category = 'Data Entry'
budget = '5'
#job_key = '~016e686fe0d68ba380'
budget = '5'
data = {'q':'python','title':'Web Developer'}
#id_job = '~01d7c4aaf7bf45158d'
reason_id = '67'
#freelancer_id = '~01e8243994efcf5de1'
private_or_not = 'private'
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
message_content_body = 'Regarding the task'
message_content_bcc = 'Hello!, The task doc is here https://docs.google.com/spreadsheets/d/1ZvMta5p-B5_RS-7bwuk6xh9iFZciU8MNplderKoBm28/edit?usp=sharing, in my job thread, I have clearly elaborated everything what to do with these docs for instruction please refer back to the orgina job posting I made!'
#upwork_wrapper.send_message(main_owner,freelancer_id_1,body,bcc)
#upwork_wrapper.send_message(owner_id,recipients,message_content_body,message_content_bcc)
#upwork_wrapper.get_profile_details(freelancer_id_1)
upwork_wrapper.list_job_applications(owner,job_key)
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
#upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
#upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,status = 'open')

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