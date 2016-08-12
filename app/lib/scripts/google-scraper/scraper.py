import requests, urllib.request, os, time, json, os.path, sys
from urllib.parse import urlsplit
from bs4 import BeautifulSoup
from tld import get_tld
from tld.utils import update_tld_names
import pprint

# Save an object to a file in JSON format
# param file_path: the path to save the file at
# param storage_obj: the object to save
def save_json_obj(file_name, storage_obj):
    with open(file_name, 'w') as outfile:
        json.dump(storage_obj, outfile, indent = 4)

# Detect the data if it already exists
# param path: the path to search for the file at
def detect_existing_data(path):
	if os.path.isfile(path) and  os.access(path, os.R_OK):
		print ("HEY! WE ALREADY HAVE A DATA FOR THIS FILE!.....LOADING...LOADING...")
		time.sleep(5)
		json_data = open('./output.json').read()
		data = json.loads(json_data)
		pp = pprint.PrettyPrinter(indent = 4)
		pp.pprint(data)
		sys.exit()
	else:
		print ("Checking ---.... Oh! We do not have data for this, let's go get them!")

# Search Google for files relating to certain keywords from certain schools
# param school_names: a list of school names
# param search_keywords: a list of keywords to search for
# param file_name: the name of the file to output the data to
# param save_interval: the interval to save the file at
def search(school_names = [], search_keywords = [], output_file_name = 'berkeleytest.json', save_interval = 10, page_count = 3):
    # An array to store the files in
	file_array = {}

	# An array to store the constructed URLs
	url_array = []
	
	print("Constructing URLs to search")
	
	# Iterate through every school in the list of names
	for school in school_names:
		# Iterate through every keyword to be searched for
		for keyword in search_keywords:
			# Iterate through every page in the page count
			for page in range(0, page_count):
				# A dictionary to store the URL information
				url_info = {}
					
				# Construct the Google URL with the school name, keyword and file type
				url_info['url'] = "https://www.google.com/search?q=" + school + "+" + keyword + "+filetype:pdf&start=" + str(page * 10)
					
				# Add the URL into the array
				url_array.append(url_info)
			
	print("Searching URLs")
		
	# Store a counter to save the file every save_interval files
	url_counter = 0
	
	# Store a counter for the number of unique links
	unique_links = 0
		
	# Iterate through every constructed URL
	for url in url_array:
		url_counter += 1
		
		# Create a BeautifulSoup object for the given URL
		soup = BeautifulSoup(requests.get(url['url']).text)
		
		# Isolate the results wrapper
		results_wrapper = soup.find('ol')
		
		# Isolate every h3 link title
		links_wrappers = results_wrapper.findAll('h3')

		# Iterate through every link title
		for link_wrapper in links_wrappers:
			# Create a dictionary to store the file information
			file_info = {}
			
			# Get the link from the link wrapper
			link = link_wrapper.a
			
			# Extract the file URL from the link URL
			file_url = link['href'][7:].split('.pdf')[0] + '.pdf'
			
			# Store the TLD of the file URL
			url_tld = get_tld(file_url)
			
			# Get the file name from the URL
			file_name = file_url.split('/')[-1]
			
			# Try to get the number of occurrences of the file.
			# If a KeyError is thrown, the file doesn't exist
			# in the array so there have been 0 occurrences
			try:
				file_occurrences = file_array[url_tld][file_name]['occurrences']
			except KeyError:
				file_occurrences = 0
				
				# Increase the number of unique links dumped
				unique_links += 1
				
			# Increase the number of occurrences by 1
			file_occurrences += 1
			
			# Store the name of the file
			file_info['name'] = link.text
			
			# Store the full URL of the file
			file_info['url'] = file_url
			
			# Store the occurrences
			file_info['occurrences'] = file_occurrences

			# Try to store the information under the TLD.
			# If it doesn't exist then create the dictionary
			# and add the file information
			try:
				# Add the file information into the array
				file_array[url_tld][file_name] = file_info
			except KeyError:
				file_array[url_tld] = {}
				file_array[url_tld][file_name] = file_info
		
		# Check if save_interval URLs have been processed
		if url_counter % save_interval == 0:
			# Save the file
			save_json_obj(output_file_name, file_array)
			
			print(str(save_interval) + " more result pages dumped, " + str(unique_links) + " links total")
			
		time.sleep(3)
			
	print("Dump completed, " + str(unique_links) + " unique links total")		
	
	# Save the file
	save_json_obj(output_file_name, file_array)

if __name__ == "__main__":
	# Updates the TLD directory with the most recent ones
	update_tld_names()
	
	# Scan for an existing file
	detect_existing_data('./berkeleytest.json')

	search(
		school_names = ["UCB","UC Berkeley","Berkeley"],
		search_keywords = ["name studentid exams"],
	)

# Notes:
# 1. As the output contains many schools, it does not make sense to store it under the name of a school. A more appropriate name is "output.json" and so this is the new name of the output file.
# 2. "query_params" was not used in the Google search and so has been removed from the code.
# 3. Within the output, there is no need to have "file" in every dictionary key, if we were dumping a large amount of data this could use a lot of space.
# 4. I changed "course_subjects" to be "search_keywords" to create a more generic application to allow it to be used for a variety of purposes