import requests, json
from bs4 import BeautifulSoup

OUTPUT_PATH = "cheggschools.json"
schools = []
school_list_soup = BeautifulSoup(requests.get("http://www.chegg.com/courses/").text)
school_list = school_list_soup.find('div', attrs = {'class': 'schools-list'}).findAll('li')

for every_univ in school_list:
    
	
	nameonly =  every_univ.find('span', attrs = {'class':'code'}).text
	schools.append(nameonly)

with open('cheggschools.json', 'w') as outfile:
	json.dump(schools,outfile,indent = 4)