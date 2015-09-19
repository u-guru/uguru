from utils import *

# The file to output data to
OUTPUT_FILE = "output/university_of_oregon.json"

# The number of names to search for
NAMES_TO_QUERY = 50

# Construct the URL for a given name
def construct_name_url(name):
	url = "https://uoregon.edu/findpeople/person/" + name
	return url

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	time.sleep(5)

	# Construct a BeautifulSoup object for the URL
	soup = BeautifulSoup(requests.get(url).text)

	# Try to find the wrapper and check that it exists
	wrapper = soup.find('div', attrs = {'class': 'findpeople-list'})
	if wrapper is not None:
		# Get the list of rows from the page
		rows = wrapper.findAll('div', attrs = {'class': 'row'})

		# Iterate through every row
		for row in rows:
			# Get the URL of the person
			person_url = "https://uoregon.edu" + row.find('div', attrs = {'class': 'name'}).find('a')['href']

			# Get the person's details
			get_single_person_details(person_url, output)

def get_single_person_details(url, output):
	time.sleep(3)
	
	person = {}

	# Construct a BeautifulSoup object for the URL
	soup = BeautifulSoup(requests.get(url).text)

	# Get the wrapper
	wrapper = soup.find('div', attrs = {'class': 'findpeople-person'})

	if wrapper is not None:
		# Get the name of the person
		person['name'] = wrapper.find('div', attrs = {'class': 'name'}).find('div', attrs = {'class': 'field-data'}).text

		department_wrapper = wrapper.find('div', attrs = {'class': 'department'})

		if department_wrapper is not None:
			# Get the department of the person
			person['department'] = department_wrapper.find('div', attrs = {'class': 'field-data'}).text
		else:
			person['department'] = ""

		# Get the email of the person
		person['email'] = wrapper.find('div', attrs = {'class': 'email'}).find('div', attrs = {'class': 'field-data'}).text

		output.append(person)

if __name__ == "__main__":
	# A list of person details
	person_details = []

	# A list of URLs for the selected names
	name_urls = []

	# Get a random list of names and iterate through them
	for name in get_random_names(NAMES_TO_QUERY):
		# Construct the URL for the name and add it to the array
		name_urls.append(construct_name_url(name))

	# Iterate through every constructed URL
	for url in name_urls:
		get_person_list_details(url, person_details)

	dump_json_to_file(OUTPUT_FILE, person_details)