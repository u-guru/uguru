import requests,json


names_arr = ['Michael','Ben','David']
last_names_arr = ['a','b','c']

for names in names_arr:
	for last_names in last_names_arr:
		url = 'https://www.cornell.edu/search/people.cfm?q='+names+' '+last_names
		print url