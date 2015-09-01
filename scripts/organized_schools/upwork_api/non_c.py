import json
with open('wikipedia_university_11.json') as data_file:
	non_compressed = json.load(data_file)
	print len(non_compressed)