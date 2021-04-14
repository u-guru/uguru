import json
from fuzzywuzzy import fuzz
from fuzzywuzzy import process



with open('uc_riverside_directory.json') as data_file:
	data = json.load(data_file)
	for first_name in data:
		first_name_data = first_name['first_name']
with open('riverside_tutors.json') as second_data_file:
	second_data = json.load(second_data_file)
	for second_data_name in second_data:
		second_name_data = second_data_name['first_name']
		print second_name_data