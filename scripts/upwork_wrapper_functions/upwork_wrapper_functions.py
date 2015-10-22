import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import sys, pprint, json



httplib2.Http(".cache", disable_ssl_certificate_validation=True)
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




def save_user_name():
		user_name = client.mc.get_tray_content('2405c762','inbox')
		with open('user_name_applications.json', 'w') as fp:
			json.dump(user_name,fp,indent = 4)
		print "usernames successfully saved!"


def get_engangements():
		contract_reference = client.hr.get_engagements()
		with open('engagements.json', 'w') as fp:
			json.dump(contract_reference,fp,indent = 4)
		print "engagements saved in a json file!" 
		return contract_reference

def get_submission_ids():

	with open('engagements.json') as data_file:
		load_data = json.load(data_file)['engagement']
		big_array = []
		for ref_ids in load_data:
			ref_id = ref_ids['reference']
			object_oreinted = client.hr_v3.get_active_milestone(ref_id)
			big_array.append(object_oreinted)
			with open('submission_ids.json','w') as submission_id:
				json.dump(big_array,submission_id,indent = 4)
			print "Id's are saved!"
			return big_array



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
			return big_second_array



def get_list_of_categories():
		
		meta_data = client.provider.get_categories_metadata()
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(meta_data)
		print "categories successfully loaded"
		return meta_data

def search_for_freelancer(data):

		search_data = client.provider_v2.search_providers(data)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(search_data)
		print "Successfully searched"
		return search_data
def get_freelancer_brief_info(freelancer_id):
	
		freelancer_info = client.provider.get_provider_brief(freelancer_id)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(freelancer_info)
		print "Successfully loaded freelancer information"
		return freelancer_info

def get_profile_details(freelancer_id):
	
		profile_details = client.provider.get_provider(freelancer_id)
		pp = pprint.PrettyPrinter(indent = 4)
		print "Successfully loaded profile details"
		return profile_details

def post_a_job(owner,title,rate,description,private_or_not,category,sub_category,budget,skills):

		post_a_job = client.hr.post_job(owner,title,rate,description,private_or_not,category,sub_category,budget, skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
		print "Job successfully created!"
		return post_job

def update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,duration = 100,status = 'open'):
  		update_job = client.hr.update_job(job_key,owner,title,description,private_or_not,category,sub_category,duration=100,status='open')
  		print "Job successfully updated!"
  		return update_job

def cancel_a_job(job_key,reason_id):
		
		delete_job = client.hr.delete_job(job_key,reason_id)
		print "Job successfully deleted!"
		return delete_job

def get_job_profile(job_key):
		
		get_job_profile = client.job.get_job_profile(job_key)
		print get_job_profile
		print "Job profile successfully loaded!"
		return get_job_profile

def hire_someone(job_key,cover_message,freelancer_id):
		invite_someone = client.hr_v1.invite_to_interview(job_key,cover_message,freelancer_id)
		print "Successfully hired!"
		return invite_someone

def get_client_offer(owner):
		list_client_offers = client.offers.get_client_offer(owner)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(list_client_offers)
		print "Client Offers successfully loaded"
		return list_client_offers

def list_client_offers(owner):

		client_offers_list = client.offers.list_client_offers(owner)
		print "Client offers loaded!"
		return client_offers_list


def send_client_offer(title,hourly,budget,message_to_contractor,owner,contractor_name,context,contracter_username,milestones):
		send_offer = client.offers.send_client_offer(title,hourly,budget,message_to_contractor,owner,contractor_name,context,milestones)
		print "Offer successfully sent!"
		return send_offer

def list_job_applications(owner,job_key):
		free_lancer_offers = client.hr_v3.list_client_applications(owner,job_key)
		with open('job_applications.json', 'w') as fp:
			json.dump(free_lancer_offers,fp,indent = 4)
		print "Job applications successfully loaded in a json file"
		return free_lancer_offers

def create_a_mile_stone(owner,milestones_descrption,deposit_amount,due_date):
		mile_stone = client.hr_v3.create_milestone(owner,milestones_descrption,deposit_amount,due_date)
		print "Successfully created a milestones!"
		return mile_stone

def edit_a_mile_stone(milestone_id,milestones_descrption,deposit_amount,due_date,message):
		editMilestone = client.hr_v3.edit_milestone(milestone_id,milestones_descrption,deposit_amount,due_date,message)
		print "Successfully edited a milestones!"
		return editMilestone

def activate_a_mile_stone(milestone_id,message):
		activate = client.hr_v3.activate_a_mile_stone(milestone_id,message)
		print "Successfully activated milestones"
		return activate

def approve_a_milestone(milestone_id,budget,bonus,message,under_payment_reason_message,note):
		approve = client.hr_v3.approve_milestone(milestone_id,budget,bonus,message,under_payment_reason_message,note)
		print "Successfully approved a milestone"
		return approve

def delete_a_milestone(milestone_id):
		delete = client.hr_v3.delete_milestone(milestone_id)
		print "Successfully deleted the milestone"
		return delete

def submit_work_to_a_milestone(milestone_id,message,budget):
		submit_milestone = client.hr_v3.request_submission_approval(milestone_id,message,budget)
		print "Successfully submitted the work to a milestone"
		return submit_milestone

def approve_a_milestone_submission(submission_id,budget,bonus,pay_comments,under_payment_reason_message,note_to_freelancer):
		approve_submission = client.hr_v3.approve_submission(submission_id,budget,bonus,pay_comments,under_payment_reason_message,note_to_freelancer)
		print "Successfully approved and paid your freelancer!"
		return approve_submission

def reject_a_milestone_submission(submission_id,note_to_freelancer):
		reject_milestone_sumbission = client.hr_v3.reject_submission(submission_id,note_to_freelancer)
		print "Successfully rejected the offer!"
		return reject_milestone_submission

def get_active_messages(owner):
		active_messages = client.mc.get_trays(owner)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(active_messages)
		return active_messages

def get_message_content(owner,inbox):
		content = client.mc.get_tray_content('2405c762','inbox')
		with open('thread_id.json','w') as thread_ids:
			json.dump(content,thread_ids,indent = 4)
		print "Thread ID saved in a json FILE!"
		return content

def get_thread(owner,thread_id):
		message_content = client.mc.get_thread_content(owner,thread_id)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(get_active_messages)
		return message_content

def send_message(owner,recipients,body,bcc):
		send_message = client.mc.post_message(owner,recipients,body,bcc)
		print "message sent to", recipients
		client.mc.post_message(owner,recipients,body,bcc)
		return send_message


