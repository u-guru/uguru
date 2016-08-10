from utils import *

# The file to output data to
OUTPUT_FILE = "output/uc_irvine.json"

# The number of names to search for
NAMES_TO_QUERY = 50

# Construct the URL for a given name
def construct_name_url(name):
	url = "http://directory.uci.edu/?basic_keywords=" + name + "&modifier=Starts+With&basic_submit=Search&checkbox_students=Students&form_type=basic_search"
	return url

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	time.sleep(5)

	# Store the request text	
	request_text = requests.get(url).text

	# Extract the 'tpyrcne' variable from the page to scrape emails
	tpyrcne = request_text.split("var tpyrcne = '")[1].split("';")[0]

	# Construct a BeautifulSoup object for the URL
	soup = BeautifulSoup(request_text)

	# Get the search result wrapper from the soup
	wrapper = soup.find('div', attrs = {'class': 'search-table'})

	# Check that the wrapper exists
	if wrapper is not None:
		# Get every row from the wrapper
		persons = wrapper.findAll('tr')

		# Iterate through every row
		for element in persons:
			person = {}

			# Get the cells from the row
			cells = element.findAll('td')

			# Find and store the name
			person['name'] = cells[0].find('a').text

			# Get the department wrapper
			department_wrapper = cells[0].findAll('span', attrs = {'class': 'departmentmajor'})[0].text.strip()

			# If the wrapper exists, store it
			if department_wrapper is not None:
				person['department'] = department_wrapper
			else:
				person['department'] = ""

			# Extract the encoded email from the text
			if "E-mail" in cells[1].text:
				encoded_email = cells[1].text.split("denc('")[1].split("',1));")[0]

				# Decode the email using the extracted tpyrcne variable and store it
				person['email'] = decode(encoded_email, tpyrcne)

				# Append the person to the list if an email was found
				output.append(person)

# Translated from the UC Irvine website
def decode(input, tpyrcne):
	fixed = '&#;0987654321'
	decoded = ''

	for char in input:
		decoded += tpyrcne[fixed.index(char)]

	array = decoded[:-1].replace('&#', '').split(';')

	number_array = []

	for element in array:
		number_array.append(int(element))
	
	return ''.join(map(chr,number_array))

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