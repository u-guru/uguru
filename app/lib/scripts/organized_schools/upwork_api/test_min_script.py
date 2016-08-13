import re
import json

with open('job_applications_check.json') as f:
	data = json.load(f)
	for info in data['applications']:
		entire_data = info['contractor_portrait_url'].split(":")[2]
		print entire_data
