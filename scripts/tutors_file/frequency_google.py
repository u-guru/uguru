### 

import json
### Takes a URL string and returns the main part

#   Examples

### http://docs.google.com   					 -> "google"
### www.google.com 								 -> "google"
### http://www.google.com   					 -> "google"
### http://www.google.io/pants/shirts/leggings   -> "google"
with open('google_query.json') as data_file:
	load_data = json.load(data_file)
	for url in load_data:
		href =  url['href'].split('url=')
		print href
	
def get_root_domain(url_string):

	pass


### Takes in an ARRAY of strings & returns number of occurranges
### 

#   Examples

# ['google', 'yahoo', 'yahoo', 'time', 'banana'] --> {'yahoo': 2, 'google': 1, 'time': banana}
def count_frequencies(arr_string):
	pass

###
### Takes a Key[String], Value[Integer] dictionary and returns an array of tuples of format ([String], [Integer])
### that are greater than X 

# Example

### sample = {'google':3, 'yahoo': 2, 'time':1, 'facebook':1} 
### threshold = 2
### get_repeat_elements(sample, threshold) --> [ ('google', 2), ('yahoo', 2) ]

def get_repeated_elements(data_dict, min_threshold):
	pass


### Takes a JSON file (array of objects) && returns the URLS that are repeated more than once for all 50 schools
def main_function(file_name):
	pass

