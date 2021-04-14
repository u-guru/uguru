import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "university_of_louisville"

student_array = []

# Get all UL details
def get_ul_details():
	for name in school_scraper.popular_names:
		url = "http://louisville.edu/directory/index.php?query=" + name
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('div', attrs = {'id': 'resultData'})
		if wrapper is not None:
			rows = wrapper.findAll('div')
			
			for row in rows:
				student = {}
				email_found = 0
				
				student['name'] = row.find('a').text
				
				student_url = row.find('a')['href']
				
				student_soup = BeautifulSoup(requests.get(student_url).text)
				student_wrapper = student_soup.find('div', attrs = {'id': 'resultData'})
				
				attributes = student_wrapper.findAll('span')
				for attribute in attributes:
					if "@louisville.edu" in attribute.text:
						student['email'] = attribute.text
						email_found = 1
						
				if email_found == 1:
					school_scraper.store_student(student, student_array, SCHOOL_NAME)
					
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)
	
get_ul_details()