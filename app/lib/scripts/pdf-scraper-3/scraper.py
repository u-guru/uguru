#
# pdf-scraper-3 
#

import requests, json
from bs4 import BeautifulSoup
from tld import get_tld
from tld.utils import update_tld_names

# The links to the file directories
LINKS = [
	"http://inst.eecs.berkeley.edu/~cs188/sp12//exams/",
	"https://web.archive.org/web/20140219211633/http://specter.erebus.feralhosting.com/flame/Ninja%20Exams/COMPSCI/",
	"https://web.archive.org/web/20140219211644/http://specter.erebus.feralhosting.com/flame/Ninja%20Exams/ELENG/",
	"https://web.archive.org/web/20140219211654/http://specter.erebus.feralhosting.com/flame/Ninja%20Exams/MATH/",
	"https://web.archive.org/web/20140219211703/http://specter.erebus.feralhosting.com/flame/Ninja%20Exams/PHYSICS/"
]

items = {}

# Get a list of files from each link
def get_files_from_links():
	# Iterate through every link
	for link in LINKS:
		# Request the link text
		request = requests.get(link).text
		
		# Create a BeautifulSoup object from the request
		soup = BeautifulSoup(request)
		
		print("Scraping " + link)
		
		# Get the files from the soup object
		get_files_from_soup(soup, link)
		
# Get a list of files from a given BeautifulSoup object
# param soup: the soup object to use
# param link: the link from which the soup was created
def get_files_from_soup(soup, link):
	# Get all tables on the page
	tables = soup.findAll('table')
	
	# Iterate through every table
	for table in tables:
		# Check that the second (index 1) th element in the table is
		# the word "Name". If not, or the second th element does not
		# exist, then the table is not valid
		try:
			if table.findAll('th')[1].text == "Name":
				get_files_from_table(table, link)
		except IndexError:
			pass

# Get a list of files from a given table
# param table: the table to use
# param link: the link from which the table was found			
def get_files_from_table(table, link):
	# Get all the rows in the table
	rows = table.findAll('tr')
	
	# Remove the first 3 rows
	rows = rows[3:]
	
	# Iterate through every row
	for row in rows:
		item = {}
		
		# Get all the cells in the row
		cells = row.findAll('td')
		
		# Remove the first cell
		cells = cells[1:]
		
		# Get the name of the item
		# 1. Get the href of the a tag in the first cell
		# 2. Replace '%20' with ' '
		# 3. Split it by '.'
		# 4. Remove the last element
		# 5. Join them with no delimiter
		item['name'] = "".join(cells[0].a['href'].replace('%20', ' ').split('.')[:-1])
		
		# Get the type of the item (capitalised)
		item['type'] = cells[0].a['href'].split('.')[-1].upper()
		
		# Get the link of the item
		item['link'] = link + cells[0].a['href']
		
		# Get the last modified date of the item
		item['modified'] = cells[1].text.strip()
		
		# Get the size of the item
		item['size'] = cells[2].text
		
		# Try to add the item to the array
		# If it fails, create the array first
		try:
			items[link].append(item)
		except KeyError:
			items[link] = []
			items[link].append(item)
		
def save_files_to_json(file_name = 'output.json'):
	with open(file_name, 'w') as outfile:
		json.dump(items, outfile, indent = 4)

if __name__ == "__main__":
	# Updates the TLD directory with the most recent ones
	update_tld_names()

	# Get all the files from the links and store them to the 'items' array
	get_files_from_links()
	
	# Save all the files to the JSON output
	save_files_to_json()