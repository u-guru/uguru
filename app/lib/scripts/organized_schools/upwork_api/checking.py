import upwork, httplib2, requests, urlparse, dryscrape
from urlparse import urlparse, parse_qs
import sys, pprint, json
data = []
with open ('job_applications.json') as f:
	get_me_data = json.load(f)
	json_string = json.dumps(get_me_data, sort_keys = True, indent = 2)
	print json_string
	parent = get_me_data['applications']
	for item in parent:
		print item['contractor_ciphertext']
	#print get_me_data['contractor_ciphertext']