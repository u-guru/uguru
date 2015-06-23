import requests, json
from bs4 import BeautifulSoup
with open('cheggschools.json') as data_file:
	data = json.load(data_file)

for chegg_courses in data:
	API_URL = "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&q="+chegg_courses+"&siteName=rmp&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL"
	text_url = requests.get(API_URL).text
	print text_url
	