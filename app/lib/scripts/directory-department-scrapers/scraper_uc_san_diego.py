from utils import *

# The file to output data to
OUTPUT_FILE = "output/uc_san_diego.json"

# The number of names to search for
NAMES_TO_QUERY = 50

# Construct the URL for a given name
def construct_name_url(name):
	url = "http://www.ucsd.edu/directory/search?last&first=" + name + "&email&title&phone&fax&dept2&mail&searchType=0"
	return url

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	time.sleep(3)

	# Construct a BeautifulSoup object for the URL
	soup = BeautifulSoup(requests.get(url).text)

	wrapper = soup.find('table', attrs = {'class': 'datatable'})
	
	# Check that the wrapper exists
	if wrapper is not None:
		rows = wrapper.find('tbody').findAll('tr')
		
		for row in rows:
			person = {}
			
			cells = row.findAll('td')
			
			person['name'] = cells[0].string.strip().replace('\r\n\t\t', '')
			
			email = cells[4].string
			
			if email is not None:
				person['email'] = email.strip()
			else:
				person['email'] = ""
			
			person['department'] = cells[5].string.strip()
			
			output.append(person)

if __name__ == "__main__":
	person_details = []

	name_urls = []

	# Get a random list of names and iterate through them
	for name in get_random_names(NAMES_TO_QUERY):
		# Construct the URL for the name and add it to the array
		name_urls.append(construct_name_url(name))

	# Iterate through every constructed URL and get the details
	for url in name_urls:
		get_person_list_details(url, person_details)

	dump_json_to_file(OUTPUT_FILE, person_details)