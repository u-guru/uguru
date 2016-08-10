import json

# with open('google_sheets_url.json') as google_sheet_data:
# 	accurate_url = json.load(google_sheet_data)
# 	for milestones_url in accurate_url:
# 		print "URL IS AS FOLLOS %s" %(milestones_url,	)

with open('job_applications_check.json') as f:
		data = json.load(f)
		for info in data['applications']:
			user_name = info['contractor_portrait_url'].split(":")[2]
			print user_name