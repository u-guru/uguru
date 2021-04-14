from utils import *

# The file to output data to
OUTPUT_FILE = "output/portland_state_university.json"

# The number of names to search for
NAMES_TO_QUERY = 50

# Construct the URL for a given name
def construct_name_url(name):
	url = "http://www.pdx.edu/directory/search/" + name
	return url

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	time.sleep(5)
	
	# Construct a BeautifulSoup object for the URL
	soup = BeautifulSoup(requests.get(url).text)

	# Check whether the result is a single person or a list of people
	if soup.title.text != "Portland State University | Search Directory":
		get_single_person_details(soup, output)
	else:
		# Get a list of results
		persons = soup.find('ol', attrs = {'class': 'directory-search-results'}).findAll('li', attrs = {'class': 'directory-search-result'})

		# Iterate through every person in the list
		for element in persons:
			person = {}

			# Get the name
			person['name'] = element.find('h3', attrs = {'class': 'title'}).text.strip()

			# Get the department
			person['department'] = element.findAll('p')[0].text

			# Get the email and check that it exists
			email_wrapper = element.findAll('p')[1].find('a')
			if email_wrapper is not None:
				person['email'] = email_wrapper.text

				# Append the person to the list
				output.append(person)

# Get the details of a single person
def get_single_person_details(soup, output):
	time.sleep(5)
	
	person = {}

	# Get the name
	person['name'] = soup.find('h1', attrs = {'class': 'title'}).text

	# Get the main wrapper
	wrapper = soup.find('div', attrs = {'class': 'directory-entry-name-detail'})

	# Get the department of the person
	department_wrapper = wrapper.find('h3')
	if department_wrapper is not None:
		person['department'] = department_wrapper.text
	else:
		person['department'] = ""

	# Get the email of the person
	person['email'] = wrapper.find('div', attrs = {'class': 'directory-contact-info'}).find('ul').findAll('a')[0].text

	# Append the person to the list
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