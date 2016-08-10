import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "university_of_montana"

student_array = []
		
def get_um_details():
	for name in school_scraper.popular_names:
		url = "http://www.umt.edu/directory/search?q=" + name + "&s=1"
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('div', attrs = {'class': 'directory_results'}).find('table')
		if wrapper is not None:
			rows = wrapper.findAll('tr')
			
			# Remove the first index (header) from the list
			rows.pop(0)
			
			for row in rows:
				cells = row.findAll('td')
				
				student = {}
				email_found = 0
				
				student['name'] = cells[0].text.strip()
				
				email = cells[2].a
				if "mailto:" in email['href']:
					email_found = 1
					student['email'] = email.text.strip()
					
				if email_found == 1:
					school_scraper.store_student(student, student_array, SCHOOL_NAME)				
				
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)	
	
get_um_details()