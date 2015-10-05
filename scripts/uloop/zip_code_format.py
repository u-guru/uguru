import json
arr = []
with open('zip_code_list.json') as output_file:
	load_json = json.load(output_file)
	for zip_codes in load_json:
		zip_code = zip_codes['zip_code']
		if "googletag" in zip_code:
			pass
		else:
			dictionary = {}
			dictionary['zip_codes'] = zip_code
			arr.append(dictionary)
	with open('zip_code_parsed.json','wb') as outfile:
		json.dump(arr,outfile,indent=4)