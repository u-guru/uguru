import json
with open('wikiscrape123.json') as data_file:
	non_compressed = json.load(data_file)
	with open('non_compressed.json','w') as output:
		json.dump(non_compressed,output)