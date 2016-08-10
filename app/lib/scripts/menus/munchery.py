import requests, json, time

API_URL = "https://munchery.com/menus.json?page=1"

def get_menu_json():
	return json.loads(requests.get(API_URL).text)['menu']

def get_necessary_information(menu):
	output_menu = []
	for item in menu:
		output_item['name'] = item['name']
		output_menu.append(output_item)
	return output_menu
def save_information_to_json(path, information):
	print "information saved as" + path
	with open(path,'w') as outfile:
		json.dump(information, outfile, indent = 4)

if __name__ == "__main__":
	menu_json = get_menu_json()
	menu_json = get_necessary_information(menu_json)
	save_information_to_json('muncheryz.json', menu_json)