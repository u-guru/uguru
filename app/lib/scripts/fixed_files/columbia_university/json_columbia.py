import requests,json
from bs4 import BeautifulSoup

with open('columbia_university_data.json') as data_file:
	load_data = json.load(data_file)
	for info in load_data:
		print info['email']