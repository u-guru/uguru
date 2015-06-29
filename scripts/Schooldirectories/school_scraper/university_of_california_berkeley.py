import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "university_of_california_berkeley"

student_array = []

def get_uc_berkeley_details():
	for name in school_scraper.popular_names:
		url = "http://www.berkeley.edu/directory/results?search-term=" + name
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('section', attrs = {'class': 'search-results'}).find('ul')
		if wrapper is not None:
			rows = wrapper.findAll('li')
			
			for row in rows:
				url = "http://www.berkeley.edu/" + row.a['href']
				get_uc_berkeley_detail(url)
				
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)
	
def get_uc_berkeley_detail(url):
	soup = BeautifulSoup(requests.get(url).text)	
	wrapper = soup.find('section', attrs = {'class': 'search-results'})
	if wrapper is not None:
		student = {}
		email_found = 0
		
		student['name'] = wrapper.h2.text.title()
		
		rows = wrapper.findAll('p')
		for row in rows:
			if row.label is not None and row.a is not None:
				if row.label.text == "Email":
					email_found = 1
					student['email'] = row.a.text
				
		if email_found == 1:
			school_scraper.store_student(student, student_array, SCHOOL_NAME)
	
get_uc_berkeley_details()