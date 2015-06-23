import json, requests, time
from sys import exit
from bs4 import BeautifulSoup

# The location of the course information input file
INPUT_FILE = "course_info.json"

# A list of schools to search through
SCHOOLS = ["berkeley"]

# An array to store the course information
COURSE_INFORMATION = []

# An array to store the search URLs
SEARCH_URLS = []

# An array to store the search results
search_results = []

# Load the course information from the file
def load_course_info():
	# Use the globally declared COURSE_INFORMATION array
	global COURSE_INFORMATION
	
	# Try to find the file
	try:
		# Load the data from the file
		file_data = open(INPUT_FILE, 'r').read()
		
		# Parse it as a JSON document
		COURSE_INFORMATION = json.loads(file_data)
	except FileNotFoundError:
		# If the file is not found, inform the user and exit the script
		print("=" * 40)
		print("Course information file not found at: '" + INPUT_FILE + "'")
		print("=" * 40)
		exit()
	
# Construct the search URL for ever course
def construct_search_urls():
	# Use the globally declared SEARCH_URLS array
	global SEARCH_URLS
	
	# Iterate through each school in the list of schools
	for school in SCHOOLS:
		# Iterate through every course in the course information
		for course in COURSE_INFORMATION:
			# Create a dictionary to store the search information
			search_info = {}
			
			# Store the URL of the search
			search_info['url'] = "https://www.google.com/search?&q=exams+" + school + "+studentid+name+" + course['short_name'].replace(' ', '+') + "+filetype:pdf"
			
			# Store the course of the search
			search_info['course'] = course['short_name']
			
			# Append the search to the array
			SEARCH_URLS.append(search_info)
			
# Get search results for all search URLs
def get_search_results():
	# Iterate through every search
	for search in SEARCH_URLS:
		print("Searching for '" + search['course'] + "'")
		# Create a BeautifulSoup object from the page
		soup = BeautifulSoup(requests.get(search['url']).text)
		
		# Get the result wrapper
		result_wrapper = soup.find('ol')
		
		# Get all the title wrappers
		title_wrappers = result_wrapper.findAll('h3')
		
		# Iterate through every title wrapper
		for title in title_wrappers:
			# Extract the a tag
			link = title.a
			
			# Extract the file URL from the link URL
			file_url = link['href'][7:].split('.pdf')[0] + '.pdf'
			
			# Extract the file name
			file_name = link.text
			
			# Create a dictionary to store the file
			file = {}
			
			# Store the file URL
			file['url'] = file_url
			
			# Store the file name
			file['name'] = file_name
			
			# Use the globally defined search_results array
			global search_results
			
			# Add the file to the array
			search_results.append(file)
		
		time.sleep(2)
		
if __name__ == "__main__":	
	# Load the courses
	load_course_info()
	
	# Construct the search URLs
	construct_search_urls()
	
	# Get the search results
	get_search_results()
	
	with open('output.json', 'w') as outfile:
		json.dump(search_results, outfile, indent = 4)