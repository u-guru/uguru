import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper

#post a job
owner = '1850815'
title = '500 Colleges Data Scraping/Data Collection/Data Entry'
rate = 'fixed-price'
description = 'I am looking to hire someone who can WEB RESEARCH + DATA ENTRY for 500 schools.You are looking for the start and end date for the fall term and the spring term.\n\n However you can access this information is up to you(scraping,web searches, etc)\n\n This task is simple and anyone can do it.\n\n For example:\n\n1. Copy+Paste college name into web browser.\n\n2. Search for the fall and Spring term dates for when classes start and when they end.\n\n TIP: Information can be found by typing in school name and then writing the word academic calendar, for instance Adirondack Community College Academic Calender\n\n Once you are hired I will share you a google documents containing the school list!\n\n Deadline: Sunday, July 20th 2015(California) by the end of the day'
category = 'Administrative Support'
sub_category = 'Data Entry'
budget = '5'
job_key = '~016e686fe0d68ba380'
budget = '5'
data = {'q':'python','title':'Web Developer'}
#id_job = '~01d7c4aaf7bf45158d'
reason_id = '67'
freelancer_id = '~01e8243994efcf5de1'
private_or_not = 'public'
duration = ''
job_key_id = '~016e686fe0d68ba380'
milestone_description = 'Very first milestone'
due_date = '08-15-2015'
#upwork_wrapper.create_a_mile_stone(owner,milestone_description,budget,due_date)
#upwork_wrapper.get_list_of_categories()
#upwork_wrapper.get_job_list_ids(owner)
#upwork_wrapper.get_freelancer_brief_info(freelancer_id)
#upwork_wrapper.get_job_profile(job_key)s
#upwork_wrapper.search_for_freelancer(data=data)
#upwork_wrapper.cancel_a_job(id_job,reason_id)
#upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category, budget,skills = ['data-mining','data-scraping','google-docs','google-spreadsheet','internet-research','spreadsheets'])
upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,status = 'open')
