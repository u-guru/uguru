import requests, json, time
from bs4 import BeautifulSoup

# The base Craiglist URL to use
BASE_URL = "http://sfbay.craigslist.org"

BASE_URL_CATEGORY = "http://sfbay.craigslist.org/search/tia"

# A list of queries to search for
SEARCH_QUERIES = ["electric daisy carnival", "edc"]

# Sanitise the search queries
def sanitise_search_queries():
	# Use the globally defined SEARCH_QUERIES array
	global SEARCH_QUERIES

	# An array to store the sanitised queries
	sanitised_queries = []
	
	# Iterate through every declared query
	for query in SEARCH_QUERIES:
		# Replace all spaces with '%20'
		sanitised_query = query.replace(' ', '%20')
		
		# Add the sanitised query to the array
		sanitised_queries.append(sanitised_query)
		
	# Replace the SEARCH_QUERIES array with the new array
	SEARCH_QUERIES = sanitised_queries
	
# Generate all the URLs
def generate_urls():
	# Use the globally defined URLS and SEARCH_QUERIES arrays
	global BASE_URL_CATEGORY, SEARCH_QUERIES
	
	# An array to store the generated URLs
	generated_urls = []
	
	# Iterate through every query
	for query in SEARCH_QUERIES:
		# Add the query to the url
		generated_url = BASE_URL_CATEGORY + "?sort=priceasc&query=" + query + "#list"
			
		# Add the generated url to the array
		generated_urls.append(generated_url)
			
	return generated_urls
	
# Get all Craigslist entries for an array of URLs
# param urls: the array of URLs
def get_craigslist_entries(urls):
	# An array to store the entries
	output = []
	
	# Iterate through every URL
	for url in urls:		
		# Create a BeautifulSoup object
		soup = BeautifulSoup(requests.get(url).text)
		
		# If there are no results, skip the URL
		if "Nothing found for that search. (All words must match.)" in soup.text:
			continue
			
		# Get all the entry rows from the page
		rows = soup.find('div', attrs = {'class': 'content'}).findAll('p', attrs = {'class': 'row'})
		
		# Iterate through every page
		for row in rows:
			entry = {}
			
			# Get the title of the entry
			entry['title'] = row.find('span', attrs = {'class': 'pl'}).a.text
			
			# Get the URL of the entry
			entry_url = row.find('span', attrs = {'class': 'pl'}).a['href']
			
			# If the URL is an independent URL, store it. If not, add the base url and store it
			if "http" in entry_url:
				entry['url'] = entry_url
			else:
				entry['url'] = BASE_URL + entry_url
			
			# Get the price, remove the dollar sign so it can be an integer
			entry['price_usd'] = row.find('span', attrs = {'class': 'l2'}).find('span', attrs = {'class': 'price'}).text.replace('$', '')
	
			# Append the entry
			output.append(entry)
		
		# Sleep for 2 seconds to be a nice scraper
		time.sleep(2)
		
	# Return the array of entries
	return output
		
# Sort an array of dictionaries by a given key
# param array: the array to search
# param sorter: the key to sort by
def sort_array_of_dictionaries(array, sorter):
	return sorted(array, key=lambda k: int(k[sorter])) 
		
# Dump the information to the JSON file
# param path: the path to dump the file to
# param output: the information to dump
def dump_to_json(path, output):
	with open(path, 'w') as outfile:
		json.dump(output, outfile, indent = 4)
	
if __name__ == "__main__":
	sanitise_search_queries()
	
	urls_to_search = generate_urls()
	
	craigslist_entries = sort_array_of_dictionaries(get_craigslist_entries(urls_to_search), 'price_usd')
	
	dump_to_json('output.json', craigslist_entries)