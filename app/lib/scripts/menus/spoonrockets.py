import requests, json
from time import strftime
import datetime

# The latitude to use
LATITUDE = 37.77340877788322

# The longitude to use
LONGITUDE = -122.42621837183833

# The URL of the API
API_URL = "https://api.spoonrocket.com/userapi/menu.json?lat=" + str(LATITUDE) + "&lng=" + str(LONGITUDE)


	

# Get the JSON menu from the URL
def get_menu_json():
	return json.loads(requests.get(API_URL).text)['menu']

# Strip all unnecessary information from the menu
# param menu: the menu to strip
def get_necessary_information(menu):
	# An array to store outputted data in

	output_menu = []

	# Iterate through every item in the menu
	for item in menu:
		output_item = {}
		
		# Get the name of the item
		output_item['name'] = item['name']

		# Get the price of the item
		output_item['price'] = item['price']

		# Get the image URL of the item
		output_item['image_url'] = item['image_url']

		# Get the description of the item
		output_item['description'] = item['description']

		# Add the item to the array
		output_menu.append(output_item)

	return output_menu

# Save some information to a JSON file
# param path: the path to save the file at
# param information: the information to save
def save_information_to_json(path, information):
	print "Information saved as " + path

	# Open the path and dump the json
	with open(path, 'w') as outfile:
		json.dump(information, outfile, indent = 4)

if __name__ == "__main__":
	menu_json = get_menu_json()

	menu_json = get_necessary_information(menu_json)

	save_information_to_json('fixednewone.json', menu_json)	