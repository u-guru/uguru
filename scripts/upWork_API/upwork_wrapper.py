import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import sys, pprint

class DevNull:
	def write(self,msg):
		pass




httplib2.Http(disable_ssl_certificate_validation=True)#.request('https://www.odesk.com:443')

key = '8945fabd1900de9746d74e5782d9b623'
secret = '918aeab388eeb19d'
client = upwork.Client(key,secret)
authorize_url =  client.auth.get_authorize_url()
print authorize_url
requests.get(authorize_url)
verifier = raw_input('Enter oauth_verifier: ')
oauth_access_token, oauth_access_token_secret = client.auth.get_access_token(verifier)
client = upwork.Client(key, secret,
                       oauth_access_token=oauth_access_token,
 	                   oauth_access_token_secret=oauth_access_token_secret)


# jobs_list = client.hr.get_jobs('1850815')
# print jobs_list
#category = 'Web Development'
#sub_category = 'Web Programming'
#client.hr.update_job('~016e686fe0d68ba380','1850815','Heres my new titles','this be my new ssdescription','private',category,sub_category, duration = 100, status = 'open')
job_key = '~016e686fe0d68ba380'

#get_job_prof = client.job.get_job_profile(job_key)
#print get_job_prof
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

def post_a_job(owner,title,rate,description,private_or_not,category,sub_category,budget,duration):
		sys.stderr = DevNull()
		client.hr.post_job(owner,title,rate,description,private_or_not,category,sub_category,budget,duration)
		print "Job successfully created!"
		return upwork_wrapper.post_a_job(client.hr.post_job)

def update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,duration = 100,status = 'open'):
		sys.stderr = DevNull()
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

def hire_someone(job_key,cover_message,owner):
		sys.stderr = DevNull()
		client.hr_v1.invite_to_interview(job_key,cover_message,owner)
		print "Successfully hired!"
		return upwork_wrapper.hire_someone(client.hr_v1.invite_to_interview)

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
		client.hr_v3.list_client_applications(owner,job_key)
		print "Job applications successfully loaded!"
		return upwork_wrapper.list_job_applications(client.hr_v3.list_client_applications)

def create_a_mile_stone(owner,milestones_descrption,deposit_amount,due_date):
		sys.stderr = DevNull()
		client.hr_v3.create_milestones(owner,milestones_descrption,deposit_amount,due_date)
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

