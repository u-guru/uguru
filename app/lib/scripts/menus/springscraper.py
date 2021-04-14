import dryscrape, time, json

# The name of the menu to scrape
MENU_NAME = "San Francisco"

# Initialise a Dryscrape session
def initialise_dryscrape_session():
	return dryscrape.Session(base_url = 'https://www.sprig.com/')

# Click the menu button
# param session: the session to use
def click_menu_button(session):
	# Visit the base URL
	session.visit('/#/')

	# Find the button and click it
	button = session.at_xpath('//section[@class="city-select"]/button[text() = "' + MENU_NAME + '"]')
	button.click()

# Get the items from the menu
# param session: the session to use
def get_menu_items(session):
	# Find the number of items on the page
	item_count = len(session.xpath('//*[@id="menu-section"]/ol/li'))

	# An array to store the items in
	items = []

	# Iterate through every item on the page
	for i in range(1, item_count + 1):
		item = {}

		provider = "Sprig"
		# Construct a base XPath reference
		xpath_base = '//*[@id="menu-section"]/ol/li[' + str(i) + ']'
	
		# Get the title of the item
		item['title'] = session.at_xpath(xpath_base + '/div[3]/div[1]').text()

		# Get the description of the item
		item['description'] = session.at_xpath(xpath_base + '/div[2]/div[1]/div').text()
		
		# Get the price of the item with dollar signs removed (in number form)
		item['price'] = session.at_xpath(xpath_base + '/div[3]/div[2]').text().replace('$', '')

		# Get the wrapper for the ingredients
		ingredients_wrapper = session.at_xpath(xpath_base + '/div[2]/div[2]/div/div')

		item['location'] = MENU_NAME

		item['Provider'] = provider 

		# If there is an ingredients wrapper, get the text from it
		if ingredients_wrapper is not None:
			item['ingredients'] = ingredients_wrapper.text()
		else:
			item['ingredients'] = provider

		item['image_url'] = "http:" + session.at_xpath(xpath_base + '/div[1]/img')['src']

		# Append the item to the array
		items.append(item)

	# Return the array of items
	return items

# Save some information to a JSON file
# param path: the path to save the file at
# param information: the information to save
def save_information_to_json(path, information):
	print "Information saved as " + path

	# Open the path and dump the json
	with open(path, 'w') as outfile:
		json.dump(information, outfile, indent = 4)

if __name__ == "__main__":
	session = initialise_dryscrape_session()

	time.sleep(3)

	click_menu_button(session)

	time.sleep(3)

	items = get_menu_items(session)

	print len(items)

	save_information_to_json('outputspring.json', items)