import requests, school_scraper
from bs4 import BeautifulSoup

SCHOOL_NAME = "utah_state_university"

student_array = []
		
# Get all USU details
def get_usu_details():
	for name in school_scraper.popular_names:
		url = "https://directory.usu.edu/search/" + name + "/?"
		soup = BeautifulSoup(requests.get(url).text)
		
		wrapper = soup.find('table', attrs = {'id': 'personSearchResults'})
		if wrapper is not None:
			rows = wrapper.findAll('tr')
			
			# Remove the first index (header) from the list
			rows.pop(0)
			
			# Remove the last index (footer) from the list
			rows.pop()
			
			for row in rows:
				cells = row.findAll('td')
				row_url = "https://directory.usu.edu/" + cells[0].find('a')['href']
				row_soup = BeautifulSoup(requests.get(row_url).text)
				get_usu_detail(row_soup)
				
	school_scraper.dump_school_emails(SCHOOL_NAME, student_array)	
			
# Get a single USU detail collection	
# param profile_soup: The soup of the person's profile
def get_usu_detail(profile_soup):
	student = {}
	email_found = 0
	
	wrapper = profile_soup.find('div', attrs = {'id': 'contentInner'})
	student['name'] = wrapper.find('h2').text
	
	links = wrapper.findAll('a')
	for link in links:
		if "mailto:" in link['href']:
			email_found = 1
			student['email'] = link.text
			
	if email_found == 1:
		school_scraper.store_student(student, student_array, SCHOOL_NAME)
	
get_usu_details()