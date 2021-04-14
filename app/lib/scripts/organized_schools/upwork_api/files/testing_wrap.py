import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper

#post a job
#owner = '1850815'
title = '500 Colleges Data Scraping/Data Collection/Data Entry'
rate = 'fixed-price'
description = 'sup motherfucker'

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
cover_message = 'Hello!, Looking at your profile, Im interested in hiring you!'

freelancer_id_1 = '~011d8724f956a759b0'
freelancer_id_2 = '~019a997e9118c21d5a'
freelancer_id_3 = '~015f8632866ff09eb6'




#upwork_wrapper.get_profile_details(freelancer_id_2)
#upwork_wrapper.list_job_applications(owner,job_key)
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
