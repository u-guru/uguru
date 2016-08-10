import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "university_of_alabama_huntsville"

student_array = []

# Get all UAH details
def get_uah_details():
	for name in school_scraper.popular_names:
		url = "http://www.uah.edu/directory?f=" + name
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('table', attrs = {'id': 'results_FacultyStaff'})
		if wrapper is not None:
			rows = wrapper.findAll('tr')
			
			# Remove the first index (header) from the list
			rows.pop(0)
			
			for row in rows:
				cells = row.findAll('td')
				
				student = {}
				student['name'] = cells[0].text
				
				# Email is dynamic so isolate it
				student['email'] = cells[1].script.text.split('"')[1][::-1]
				
				school_scraper.store_student(student, student_array, SCHOOL_NAME)
				
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)
	
get_uah_details()