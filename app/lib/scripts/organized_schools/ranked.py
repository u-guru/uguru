import json, requests, urllib2
university_arr = json.load(urllib2.urlopen('http://www.uguru.me/static/data/fa15_targetted.json'))
sorted_university_arr = sorted(university_arr, key=lambda k:k['rank'])
for university_info in sorted_university_arr:
	print university_info['rank'], university_info['name'], university_info['population']