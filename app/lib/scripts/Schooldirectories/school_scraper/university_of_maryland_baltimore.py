import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "university_of_maryland_baltimore"

student_array = []

# Get all UMBC details
def get_umbc_details():
	for name in school_scraper.popular_names:
		url = "http://www.umbc.edu/search/directory/?search=" + name
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('div', attrs = {'id': 'results'})
		if wrapper is not None:
			rows = wrapper.findAll('div', attrs = {'class': 'person'})
			
			for row in rows:
				student = {}
				email_found = 0
				
				student['name'] = row.find('div', attrs = {'class': 'name'}).text
				
				email_container = row.find('div', attrs = {'class': 'email'})
				if email_container is not None:
					email_found = 1
					student['email'] = email_container.text
						
				if email_found == 1:
					school_scraper.store_student(student, student_array, SCHOOL_NAME)
					
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)
	
get_umbc_details()