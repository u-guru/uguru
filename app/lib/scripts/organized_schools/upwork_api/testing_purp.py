import json


with open('submitted_milestone_ids.json') as data_file:
	data_info = json.load(data_file)
	print data_info['submitted_milestone_ids']