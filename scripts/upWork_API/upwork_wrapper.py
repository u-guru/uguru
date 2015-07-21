import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import sys, pprint, json

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

#~016e686fe0d68ba380 --> ACTUAL SHIT
#jobs_list = client.hr.get_jobs('1850815','1','open')
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(jobs_list)

#list_of_companies = client.hr.get_companies()
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(list_of_companies)
#category = 'Web Development'
#sub_category = 'Web Programming'
#client.hr.update_job('~016e686fe0d68ba380','1850815','Heres my new titles','this be my new ssdescription','private',category,sub_category, duration = 100, status = 'open')
#job_key = '~016e686fe0d68ba380'

#skills_list = client.provider.get_skills_metadata()
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(skills_list)
#get_job_prof = client.job.get_job_profile(job_key)
#print get_job_prof
#freelancer_id = '7719882'
#profile_details = client.provider.get_provider('~011d8724f956a759b0')
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(profile_details)

category = 'Administrative Support'
sub_category = 'Data Entry'
owner = '1850815'
job_key = '~014754850f959aacfa'
context = {'related_jobcategory': '40'}
cover_message = 'Hello guys! I will be sending over google docs, shortly'
milestones = [
    {"milestone_description":"I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 500 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, July 20th 2015(California) by the end of the day", "deposit_amount":"5", "due_date":"08-01-2015"},
]
#ERROR - Samir I need help on client.offers.send_client_offer - Client_team_reference don't know how to get that value, in doc it says list items, I tried all the value from list items, doesn't work still!
description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 500 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, August first 2015(California) by the end of the day'

client.offers.send_client_offer('Data Scraping','fixed-price',5.0,description,'1850815','2405c762',context=context,contractor_username = 'layug_lorielyn',milestones=milestones )
# #
list_teams = client.hr.get_teams()
pp = pprint.PrettyPrinter(indent = 4)
pp.pprint(list_teams)
# list_teams = client.hr.get_teams()
# print list_teams
#owner12 = 'r9gf7hijszllyinylk0xrg'

# with open ('job_applications.json') as f:
# 	get_me_data = json.load(f)
# 	json_string = json.dumps(get_me_data, sort_keys = True, indent = 2)
# #	print json_string
# 	parent = get_me_data['applications']
# 	for item in parent:

# 		get_me_the_best_worker = client.provider.get_provider_brief(item['contractor_ciphertext'])
# 		#print get_me_the_best_worker
# 		parent_data =  get_me_the_best_worker['dev_adj_score']
	
# with open('job_applications.json') as f:
# 		freelancer_id = json.load(f)
# 		json_string = json.dumps(freelancer_id, sort_keys = True, indent = 2)
# 		parent = freelancer_id['applications']
# 	#	print parent
# 		for item in parent:
# 			contractor = item['contractor_ciphertext']
# 			hire_someone = client.hr_v1.invite_to_interview(job_key,cover_message,contractor)
# 			print contractor

# content = client.mc.get_tray_content('2405c762','inbox')
# with open('thread_id.json','w') as thread_ids:
# 	json.dump(content,thread_ids,indent = 4)
# 	print "Thread ID saved in a json FILE!"


# with open('thread_id.json') as fps:
# 		thread_id = json.load(fps)
# 		for items in thread_id:
# 			contractor = items['participants']
# 			for secondary_items in contractor:
# 				username = secondary_items[0]['username']
# 				print username

		# json_string = json.dumps(thread_id, sort_keys = True, indent = 2)
		# parent = thread_id['participants']
		# print parent
		# for item in parent:
		# 	contractor = item['username']
		# 	#hire_someone = client.hr_v1.invite_to_interview(job_key,cover_message,contractor)
		# 	print contractor




#object_client = client.hr.get_teams()
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(object_client)
#client_obj = client.mc.get_trays()
#clients = client.auth.get_info()

#client_def = client.mc.get_trays('2405c762')
freelancer_id_1 = '~011d8724f956a759b0'
freelancer_id_2 = '~019a997e9118c21d5a'
freelancer_id_3 = '~015f8632866ff09eb6'
freelancer_id_4 = '~012e08fb3ba663b8d6'
freelancer_id_5 = '~017258aba76e920733'
#send_message = client.mc.post_message('2405c762,')
#content = client.mc.get_tray_content('2405c762','inbox')
#job_key = '~014754850f959aacfa'
#client.mc.get_thread_by_context('2405c762','Interviews',job_key,last_posts=True)
#freelancer_link_1 = 'https://docs.google.com/spreadsheets/d/1zOoZE7hMkzG3AJqckEv0JCET4skT2L_TIDwE4HSkkk4/edit?usp=sharing'
#freelancer_link_2 = 
# owner = '7447474'
# # tray_name = 'inbox'
#another_id = '5585060'
#user_id = '2405c762'
# u'user__id': u'2405c762',
#thread_id = '48268566'
#content = client.mc.get_thread_content('Samir_Makhani','inbox')
#pp = pprint.PrettyPrinter(indent = 4)
#pp.pprint(content)
#content = client.mc.get_tray_content('1850815','inbox')
#client.mc.post_message('samir@uguru.me',['Marilyn'],'Hey! I would like to hire you to work for me!','Hey! I would like to hire you to work for me!')
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
		sys.stderr = DevNull()
		client.hr.post_job(owner,title,rate,description,private_or_not,category,sub_category,budget, skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
		print "Job successfully created!"
		return upwork_wrapper.post_a_job(client.hr.post_job)

def update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,duration = 100,status = 'open'):
		#sys.stderr = DevNull()
  		client.hr.update_job(job_key,owner,title,description,private_or_not,category,sub_category,duration=100,status='open')
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


def send_client_offer(title,hourly,budget,message_to_contractor,owner,contractor_name,context,milestones):
		sys.stderr = DevNull()
		client.offers.send_client_offer(title,hourly,budget,message_to_contractor,owner,contractor_name,context,milestones)
		print "Offer successfully sent!"
		return upwork_wrapper.send_client_offer(client.offers.send_client_offer)

def list_job_applications(owner,job_key):
		sys.stderr = DevNull()
		free_lancer_offers = client.hr_v3.list_client_applications(owner,job_key)
		with open('job_applications.json', 'w') as fp:
			json.dump(free_lancer_offers,fp,indent = 4)
		print "Job applications successfully loaded in a json file"
		return upwork_wrapper.list_job_applications(client.hr_v3.list_client_applications)

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
		content = client.mc.get_tray_content('2405c762','inbox')
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

