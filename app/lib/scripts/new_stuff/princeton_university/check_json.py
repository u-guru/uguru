import json
array = []
with open('princeton_university_data.json') as outfile:
			load_data = json.load(outfile)
			for info in load_data:
				name = info['first_name']
				print name