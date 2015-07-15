import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import upwork_wrapper

#post a job

owner = '1850815'
title = 'Updated new title wooho!'
rate = 'hourly'
description = 'Wassup fam'
private_or_not = 'private'
category = 'Web Development'
sub_category = 'Web Programming'
budget = '10'
job_key = '~016e686fe0d68ba380'
budget = '10'
data = {'q':'python','title':'Web Developer'}
id_job = '~01d7c4aaf7bf45158d'
reason_id = '67'
freelancer_id = '~01e8243994efcf5de1'
upwork_wrapper.get_freelancer_brief_info(freelancer_id)

#upwork_wrapper.get_job_profile(job_key)
#upwork_wrapper.search_for_freelancer(data=data)
#upwork_wrapper.cancel_a_job(id_job,reason_id)
#upwork_wrapper.post_a_job(owner,title,rate,description,private_or_not,category,sub_category,budget,duration = 100)
#upwork_wrapper.update_a_job(job_key,owner,title,description,private_or_not,category,sub_category,duration = 100,status = 'open')
