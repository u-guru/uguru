import requests,json
from bs4 import BeautifulSoup
#from mailgun import *


name_arr = ['michael']
huge_array = []
#dictionary = {}
output = 'james_madison_data_output.json'
for names in name_arr:
	base_url = 'https://www.jmu.edu/cgi-bin/peoplestudentcms?pattern='+names
	wrapper = BeautifulSoup(requests.get(base_url).text)
	main_wrapper = wrapper.find('table', attrs = {'id':'names'}).findAll('a')
	for wrapper in main_wrapper:
		href = wrapper['href']
		print href