import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "kent_state_university"

student_array = []

def get_ksu_details():
	url = "http://www.library.kent.edu/about/faculty-and-staff"
	soup = BeautifulSoup(requests.get(url).text)
		
	wrapper = soup.find('div', attrs = {'class': 'ul-staff-directory-list'})
	if wrapper is not None:
		rows = wrapper.findAll('li', attrs = {'class': 'views-row'})
			
		for row in rows:
			student = {}
			
			student['name'] = row.find('div', attrs = {'class': 'views-field-title'}).text.strip()
			
			student['email'] = row.find('div', attrs = {'class': 'views-field-field-profile-email-work'}).text.strip()
				
			school_scraper.store_student(student, student_array, SCHOOL_NAME)
			
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)
	
get_ksu_details()