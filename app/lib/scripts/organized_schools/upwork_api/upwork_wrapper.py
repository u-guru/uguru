import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import sys, pprint, json
import pandas as pd
import csv
import re 

from pydrive.auth import GoogleAuth
import httplib2, requests, urlparse
from pydrive.drive import GoogleDrive


class DevNull:
	def write(self,msg):
		pass



#job_list = client.hr.get_jobs()
httplib2.Http(disable_ssl_certificate_validation=True)#.request('https://www.odesk.com:443')

key = '8945fabd1900de9746d74e5782d9b623'
secret = '918aeab388eeb19d'
client = upwork.Client(key,secret)
authorize_url =  client.auth.get_authorize_url()
print authorize_url
check_in = requests.get(authorize_url)
verifier = raw_input('Enter oauth_verifier: ')
oauth_access_token, oauth_access_token_secret = client.auth.get_access_token(verifier)
client = upwork.Client(key, secret,
                       oauth_access_token=oauth_access_token,
 	                   oauth_access_token_secret=oauth_access_token_secret)



def automate_every_thing():
	with open('engagements.json') as data_core:
		data_core = json.load(data_core)
		engagements = data_core['engagement']
		for info in engagements:
			milestones = info['active_milestones']
			if milestones['state'] == 'submitted'
			big_dictionary = {}
			big_dictionary['submitted_milestone_ids'] = milestones['id']
			with open ('saved_data_input.json','w') as submitted_file:
				json.dump(big_dictionary,submitted_file, indent = 4)

# with open('user_name_applications.json') as send_message:
# 	get_me_data = json.load(send_message)
# 	for item in get_me_data:
# 		get_me_worker_id = item['participants']
# 		for send_message in get_me_worker_id:
# 			username = send_message['username']
# 			client.mc.post_message('2405c762',username,'IMPORTANT NOTICE ON THE TASK', 'Hello there! I am NOT accepting any tasks with a wrong date format, PLEASE FOLLOW THIS FORMAT if you would like to get paid. month/day/year, example - 2/28/2015 ONLY THIS FORMAT IS ACCEPTED!')
# 			print "offer sent to", username

def save_user_name():

		user_name = client.mc.get_tray_content('2405c762','sent')
		with open('user_name_applications.json', 'w') as fp:
			json.dump(user_name,fp,indent = 4)
		print "usernames successfully saved!"
save_user_name()



context = {'related_jobcategory': '40'}
#description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 50 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n '

def get_me_submitted_milestone_ids():

	with open('engagements.json') as data_file:
		data_information = json.load(data_file)
		engagement = data_information['engagement']
		for info in engagement:
			milestones = info['active_milestone']
			if milestones['state'] == 'submitted':
				big_dictionary = {}
				big_dictionary['submitted_milestone_ids'] = milestones['id']
				print "file saved as submitted_milestone_ids"
				with open('submitted_milestone_ids.json','w') as submitted_m:
					json.dump(big_dictionary,submitted_m,indent = 4)
#	client.hr_v3.reject_submission(submission_id,'The work you submitted doesnt meet the requirements! Make sure the dates you provided are correct!')




def get_engangements():
		sys.stderr = DevNull()
		contract_reference = client.hr.get_engagements(status = 'active')
		with open('engagements.json', 'w') as fp:
			json.dump(contract_reference,fp,indent = 4)
		print "engagements saved in a json file!" 
		return upwork_wrapper.get_engangments()
#get_engangements()


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
#job_key = '~014754850f959aacfa'
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

message_content_body = 'Regarding the task'
message_content_bcc = 'Hello!, The task doc is here https://docs.google.com/spreadsheets/d/1ZvMta5p-B5_RS-7bwuk6xh9iFZciU8MNplderKoBm28/edit?usp=sharing, in my job thread, I have clearly elaborated everything what to do with these docs for instruction please refer back to the orgina job posting I made!'
#upwork_wrapper.send_message(main_owner,freelancer_id_1,body,bcc)
#upwork_wrapper.send_message(owner_id,recipients,message_content_body,message_content_bcc)
#upwork_wrapper.get_profile_details(freelancer_id_1)
# upwork_wrapper.list_job_applications(owner,job_key)
category = 'Administrative Support'
sub_category = 'Data Entry'
#job_key = '~014754850f959aacfa'
context = {'related_jobcategory': '40'}


#job_key = '~0118f300e961e66862'
owner = '1850815'
private_or_not = 'public'
category = 'Administrative Support'
sub_category = 'Data Entry'

message_content_body = 'Regarding the task'
message_content_bcc = 'Hello!, The task doc is here https://docs.google.com/spreadsheets/d/1ZvMta5p-B5_RS-7bwuk6xh9iFZciU8MNplderKoBm28/edit?usp=sharing, in my job thread, I have clearly elaborated everything what to do with these docs for instruction please refer back to the orgina job posting I made!'
#upwork_wrapper.send_message(main_owner,freelancer_id_1,body,bcc)
#upwork_wrapper.send_message(owner_id,recipients,message_content_body,message_content_bcc)
#upwork_wrapper.get_profile_details(freelancer_id_1)
# upwork_wrapper.list_job_applications(owner,job_key)
category = 'Administrative Support'
sub_category = 'Data Entry'
#job_key = '~014754850f959aacfa'
context = {'related_jobcategory': '40'}
cover_message = 'Hello guys! I will be sending over google docs, shortly'
title = 'Data Scraping'
job_type = 'fixed-price'
charge_rate = '1.00'
description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 125 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, July 31st(California) by the end of the day'
username = 'kkumar20'
#user1 = 'kkumar20'
#user1 = 'havingfun719'

with open('google_sheets_url.json') as google_sheet_data:
	accurate_url = json.load(google_sheet_data)
	for milestones_url in accurate_url:
		milestones = [
    		{"milestone_description":"once 100 school is completed, you will be awarded with 1 dollar.\n\nPLEASE use this URL : %r   doc link to fill in I WILL NOT ACCEPT your own excel sheet - use this URL to get started on the task \n\n Deadline: Monday, August 1st 2015(California) by the end of the day"	, "deposit_amount":"1", "due_date":"08-03-2015"},
		]

#print "Message Sent"


job_key = '~0124db4d6eaf66b9fe'
def automate_everything():
	
	with open('job_applications_check.json') as f:
		data = json.load(f)
		for info in data['applications']:
			user_name = info['contractor_portrait_url'].split(":")[2]
			client.offers.send_client_offer.append('Data Scraping','fixed-price',1.0,description,'1850815','r9gf7hijszllyinylk0xrg',context=context,contractor_username=username,milestones=milestones )

automate_everything()

service = GoogleAuth()
service.LocalWebserverAuth()		



def share_with_anyone(service, file_id):
  """Shares the file with anyone with the link

  Args:
    service: Drive API service instance.
    file_id: ID of the file to insert permission for.

  Returns:
    The inserted permission if successful, None otherwise.
  """
  new_permission = {
      'type': "anyone",
      'role': "writer",
      'withLink': True
  }
  try:
    return service.permissions().insert(
        fileId=file_id, body=new_permission).execute()
  except errors.HttpError, error:
    print 'An error occurred: %s' % error
  return None
share_with_anyone
	
def get_milestone_submission_list():

	big_second_array = []
	with open('submission_ids.json') as data_file:
		data_info = json.load(data_file)
		for data_main_info in data_info:
			milestones = data_main_info['milestone']
			id_in_milestones = milestones['id']
			get_me_submitted_milestones = client.hr_v3.get_milestone_submissions(id_in_milestones)
			big_second_array.append(get_me_submitted_milestones)
			with open('submitted_milestones.json','w') as submission:
				json.dump(big_second_array,submission, indent = 4)
			print "Subission list of milestones saved!"
			return upwork_wrapper.get_milestone_submission_list



def get_list_of_categories():
		sys.stderr = DevNull()
		meta_data = client.provider.get_categories_metadata()
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(meta_data)
		print "categories successfully loaded"
		return upwork_wrapper.get_list_of_categories(client.provider.get_categories_metadata)

def search_for_freelancer(data):
		sys.stderr = DevNull()
		search_data = client.provider_v2.search_providers(data)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(search_data)
		#print  search_data
		print "Successfully searched"
		return upwork_wrapper.search_for_freelancer(client.provider_v2.search_providers)

def get_freelancer_brief_info(freelancer_id):
		sys.stderr = DevNull()
		freelancer_info = client.provider.get_provider_brief(freelancer_id)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(freelancer_info)
		#print freelancer_info
		print "Successfully loaded freelancer information"
		return upwork_wrapper.get_freelancer_brief_info(client.provider.get_provider_brief)

def get_profile_details(freelancer_id):
		sys.stderr = DevNull()
		profile_details = client.provider.get_provider(freelancer_id)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(profile_details)
		#print profile_details
		print "Successfully loaded profile details"
		return upwork_wrapper.get_profile_details(client.provider.get_provider)

def post_a_job(owner,title,rate,description,private_or_not,category,sub_category,budget,skills):
		#sys.stderr = DevNull()
		client.hr.post_job(owner,title,rate,description,private_or_not,category,sub_category,budget, skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
		print "Job successfully created!"
		return upwork_wrapper.post_a_job(client.hr.post_job)




# client.hr.update_job(job_key,owner,title,description,private_or_not,category,sub_category,duration=100,status='open
def update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,budget = 1,duration = 100,status = 'open'):
		#sys.stderr = DevNull()
  		client.hr.update_job(job_key,owner,title,description,private_or_not,category,sub_category,budget = 1,duration=100,status='open')
  		print "Job successfully updated!"
  		return upwork_wrapper.update_a_job(client.hr.update_job)

def cancel_a_job(job_key,reason_id):
		sys.stderr = DevNull()
		client.hr.delete_job(job_key,reason_id)
		print "Job successfully deleted!"
		return upwork_wrapper.cancel_a_job(client.hr.delete_job)

def get_job_profile(job_key):
		sys.stderr = DevNull()
		get_job_profile = client.job.get_job_profile(job_key)
		print get_job_profile
		print "Job profile successfully loaded!"
		return upwork_wrapper.get_job_profile(client.job.get_job_profile)

def hire_someone(job_key,cover_message,freelancer_id):
		#sys.stderr = DevNull()
		client.hr_v1.invite_to_interview(job_key,cover_message,freelancer_id)
		print "Successfully hired!"
		return upwork_wrapper.hire_someone(client.hr_v1.invite_to_interview)

def get_client_offer(owner):
		list_client_offers = client.offers.get_client_offer(owner)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(list_client_offers)
		print "Client Offers successfully loaded"
		return upwork_wrapper.get_client_offer(client.offers.get_client_offer)

def list_client_offers(owner):
		sys.stderr = DevNull()
		client.offers.list_client_offers(owner)
		print "Client offers loaded!"
		return upwork_wrapper.list_client_offers(client.offers.list_client_offers)



def send_client_offer(title,hourly,budget,message_to_contractor,owner,client_ref,context,contractor_name,milestones):
# #
		#sys.stderr = DevNull()
		client.offers.send_client_offer(title,hourly,budget,message_to_contractor,owner,client_ref,context,contractor_name,milestones)
		print "Offer successfully sent!"
		return upwork_wrapper.send_client_offer(client.offers.send_client_offer)

def list_job_applications(owner,job_key):
		sys.stderr = DevNull()
		free_lancer_offers = client.hr_v3.list_client_applications(owner,job_key)
		with open('job_applications_check.json', 'w') as fp:
			json.dump(free_lancer_offers,fp,indent = 4)
		print "Job applications successfully loaded in a json file"
		return upwork_wrapper.list_job_applications(client.hr_v3.list_client_applications)
list_job_applications(owner,job_key)



def create_a_mile_stone(owner,milestones_descrption,deposit_amount,due_date):
		#sys.stderr = DevNull()
		client.hr_v3.create_milestone(owner,milestones_descrption,deposit_amount,due_date)
		print "Successfully created a milestones!"
		return upwork_wrapper.create_a_mile_stone(client.hr_v3.create_milestones)

def edit_a_mile_stone(milestone_id,milestones_descrption,deposit_amount,due_date,message):
		sys.stderr = DevNull()	
		client.hr_v3.edit_milestone(milestone_id,milestones_descrption,deposit_amount,due_date,message)
		print "Successfully edited a milestones!"
		return upwork_wrapper.edit_a_mile_stone(client.hr_v3.edit_milestone)

def activate_a_mile_stone(milestone_id,message):
		sys.stderr = DevNull()
		client.hr_v3.activate_a_mile_stone(milestone_id,message)
		print "Successfully activated milestones"
		return upwork_wrapper.activate_a_mile_stone(client.hr_v3.activate_a_mile_stone)

def approve_a_milestone(milestone_id,budget,bonus,message,under_payment_reason_message,note):
		sys.stderr = DevNull()
		client.hr_v3.approve_milestone(milestone_id,budget,bonus,message,under_payment_reason_message,note)
		print "Successfully approved a milestone"
		return upwork_wrapper.approve_a_milestone(client.hr_v3.approve_milestone)

def delete_a_milestone(milestone_id):

		sys.stderr = DevNull()
		client.hr_v3.delete_milestone(milestone_id)
		print "Successfully deleted the milestone"
		return upwork_wrapper.delete_a_milestone(client.hr_v3.delete_milestone)

def submit_work_to_a_milestone(milestone_id,message,budget):
		sys.stderr = DevNull()
		client.hr_v3.request_submission_approval(milestone_id,message,budget)
		print "Successfully submitted the work to a milestone"
		return upwork_wrapper.submit_work_to_a_milestone(client.hr_v3.request_submission_approval)

def approve_a_milestone_submission(submission_id,budget,bonus,pay_comments,under_payment_reason_message,note_to_freelancer):
		sys.stderr = DevNull()
		client.hr_v3.approve_submission(submission_id,budget,bonus,pay_comments,under_payment_reason_message,note_to_freelancer)
		print "Successfully approved and paid your freelancer!"
		return upwork_wrapper.approve_a_milestone_submission(client.hr_v3.approve_submission)

def reject_a_milestone_submission(submission_id,note_to_freelancer):
		sys.stderr = DevNull()
		client.hr_v3.reject_submission(submission_id,note_to_freelancer)
		print "Successfully rejected the offer!"
		return upwork_wrapper.reject_a_milestone_submission(client.hr_v3.reject_submission)

def get_active_messages(owner):
		#sys.stderr = DevNull()
		active_messages = client.mc.get_trays(owner)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(get_active_messages)
		return upwork_wrapper.get_active_messages(owner)

def get_message_content(owner,inbox):
		#sys.stderr = DevNull
		content = client.mc.get_tray_content('2405c762','sent')
		with open('thread_id.json','w') as thread_ids:
			json.dump(content,thread_ids,indent = 4)
		print "Thread ID saved in a json FILE!"
		#message_content = client.mc.get_tray_content(owner,inbox)
		#pp = pprint.PrettyPrinter(indent = 4)
		#pp.pprint(get_active_messages)
		return upwork_wrapper.get_message_content(owner,inbox)

def get_thread(owner,thread_id):
		sys.stderr = DevNull
		message_content = client.mc.get_thread_content(owner,thread_id)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(get_active_messages)
		return upwork_wrapper.get_message_content(owner,thread_id)

def send_message(owner,recipients,body,bcc):
		sys.stderr = DevNull
		client.mc.post_message(owner,recipients,body,bcc)
		print "message sent to", recipients
		client.mc.post_message(owner,recipients,body,bcc)
		return upwork_wrapper.send_message(owner,recipients,body,bcc)

