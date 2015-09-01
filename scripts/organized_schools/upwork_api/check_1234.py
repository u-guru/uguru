import json


with open('user_name_applications.json') as send_message:
	get_me_data = json.load(send_message)
	for item in get_me_data:
		get_me_worker_id = item['participants']
		for send_message in get_me_worker_id:
			username = send_message['username']
			if not username.isalpha():
    #continue
				#upwork_wrapper.send_message('2405c762',username,'Regarding the new job', 'Hello there! I have got a very reasonable pricing job for you!, I apologise as I couldnt get back to you regarding my early job posting, here is the link to the new job posting /https://www.upwork.com/jobs/Colleges-Data-Scraping-Data-Collection-Data-Entry_~~f12cd1aa02b2bdde/, its a perfect deal')
				client.offers.send_client_offer('Data Scraping','fixed-price',1.0,description,'1850815','r9gf7hijszllyinylk0xrg',context=context,contractor_username = username,milestones=milestones )
				print "offer sent to", username



