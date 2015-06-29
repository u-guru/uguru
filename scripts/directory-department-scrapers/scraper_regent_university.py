from utils import *

# The file to output data to
OUTPUT_FILE = "output/regent_university.json"

# Get the list of personal details from the URL
def get_person_list_details(url, output):
	soup = BeautifulSoup(requests.get(url).text)

	wrapper = soup.find('table', attrs = {'class': 'text'})
	
	rows = wrapper.findAll('tr')
	
	for row in rows[1:]:
		cells = row.findAll('td')
		
		person = {}
		
		person['name'] = cells[0].string.strip()
		
		person['department'] = cells[1].string.strip()
		
		# Get the email from the script
		email = BeautifulSoup(cells[6].script.string.strip().replace('document.write(', '')[:-1].replace('"', '').replace(' + ', ''))
		
		person['email'] = email.string.strip()
		
		output.append(person)

if __name__ == "__main__":
	# A list of person details
	person_details = []

	get_person_list_details('https://www.regent.edu/general/employee_directory.cfm', person_details)

	dump_json_to_file(OUTPUT_FILE, person_details)