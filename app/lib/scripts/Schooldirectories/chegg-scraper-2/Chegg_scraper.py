import tor_client, json
from bs4 import BeautifulSoup

# An array of schools to get course data for
SCHOOLS_TO_SEARCH = [
	{'name': "Portland State University", 'id': "pdx"},
	{'name': "University of California - Irvine", 'id': "uci"},
	{'name': "UC Santa Cruz", 'id': "ucsc"},
	{'name': "University of California - Riverside", 'id': "ucr"},
	{'name': "California St University - Los Angeles", 'id': "calstatela"},
	{'name': "University of California - San Diego", 'id': "ucsd"},
	{'name': "UC Santa Barbara", 'id': "ucsb"},
	{'name': "University of Washington - Bothell Campus", 'id': '3671268'},
	{'name': "University of Oregon", 'id': "uoregon"},
	{'name': "Oregon State University", 'id': "oregonstate"},
	{'name': "Louisiana Tech University", 'id': "latech"},
	{'name': "Regent University", 'id': "regent"},
	{'name': "Brigham Young University - Provo", 'id': "byu"}
]

# Iterate through every school in the list of schools
for school in SCHOOLS_TO_SEARCH:
	print (school['name'] + " started")
	# Construct the school URL and create a BeautifulSoup object
	url = "http://www.chegg.com/courses/" + school['id']
	soup = BeautifulSoup(tor_client.get(url).text)
	
	# Get every subject list element from the page
	subjects = soup.find('div', attrs = {'class': 'subjects-list'}).findAll('li')
	
	# Create a dictionary to hold all the subject information
	subject_list = {}
	
	# Iterate through every subject list element
	for subject in subjects:
		# Get the URL of the specific subject information and create a BeautifulSoup object
		subject_url = subject.a['href']
		subject_soup = BeautifulSoup(tor_client.get(subject_url).text)
		
		# Get the name and code of the subject
		subject_name = subject.find('span', attrs = {'class': 'name'}).text.upper()
		subject_code = subject.find('span', attrs = {'class': 'code'}).text.upper()
		
		# Get the list of course list elements from the subject
		courses = subject_soup.find('div', attrs = {'class': 'courses-list'}).findAll('li')
		
		# Create an array to hold the course information
		course_array = []
		
		# Iterate through every course list element
		for course in courses:
			# Create a dictionary to hold the course information
			course_obj = {}
			
			# Find and store the course URL, code and name
			course_obj['url'] = course.a['href']
			course_obj['code'] = course.find('span', attrs = {'class': 'code'}).text
			course_obj['name'] = course.find('span', attrs = {'class': 'name'}).text
			
			# Append the course to the array
			course_array.append(course_obj)
			
		# Create a dictionary to hold the subject information
		subject = {}
		
		# Store the courses, subject URL and subject name
		subject['courses'] = course_array
		subject['url'] = subject_url
		subject['name'] = subject_name
		
		# Store the subject information in the subject dictionary
		subject_list[subject_code] = subject

	# Create the school file and dump the JSON data
	with open('schools/' + school['name'] + '.json', 'w') as outfile:
		json.dump(subject_list, outfile)
		
	print (school['name'] + " finished")