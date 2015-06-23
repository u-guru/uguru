from utils import *

# The file to output data to
OUTPUT_FILE = "output/uc_santa_barbara.json"

# The number of names to search for 
NAMES_TO_QUERY = 50

# Construct the URL for a given name
def construct_name_url(name):
	url = 'http://www.identity.ucsb.edu/people_finder/?rs=search_person_records&rsargs=["person","' + name + '"]'
	return url

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	time.sleep(3)
	
	response = requests.get(url).text
	
	response = ('[' + response.split('[')[1])[:-1].replace('\\', '')
	
	json_response = json.loads(response)
	
	for element in json_response:
		for e in element:
			person = {}
			
			person['name'] = element[e]['lname']
			
			person['email'] = element[e]['lemail']
			
			person['department'] = element[e]['ldept']
			
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