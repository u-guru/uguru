### 
from collections import Counter
import json
### Takes a URL string and returns the main part

#   Examples

### http://docs.google.com   					 -> "google"
### www.google.com 								 -> "google"
### http://www.google.com   					 -> "google"
### http://www.google.io/pants/shirts/leggings   -> "google"
words_rep_array = []
biggest_array_of_words = []
title_full_array = []
root_domain_array = []
description_words_array = []
with open('uc_name.json') as data_file:
	load_file = json.load(data_file)
	for school_name in load_file:
		array = []
		query = school_name['name']
		with open('school_names.json') as data_file:
			load_data = json.load(data_file)['schools']
			for info in load_data:
				try:
					school_data = info[query]
					for root_domain in school_data:
						url_array = []
						word_array = []
						title_word_repetition_array = []
						root_url_dict = {}
						root_url_dict['root_domain'] = root_domain['description'].split(' ')[0]
						root_domain_array.append(root_url_dict)
					with open('root_domain_comparison.json','wb') as outfile:
						json.dump(root_domain_array,outfile,indent=4)
						description_words = {}
						description_words['words'] = root_domain['description'].split(' ')[-1]
						description_words_array.append(description_words)
					with open('description_words_comparison.json','wb') as outfile:
						json.dump(description_words_array,outfile,indent=4)
						title_reptition = {}
						title_reptition['full_title'] = root_domain['title']
						little_dict = {}
						little_dict['title_word_reptition_info'] = root_domain['title'].split(' ')
						biggest_array_of_words.append(little_dict)
						title_full_array.append(title_reptition)
					with open('title_full_url_comparison.json','wb') as outfile_1:
						json.dump(title_full_array,outfile_1,indent=4)
					
			
						 #(FULL TITLE COMPARISON)
					with open('title_words_comparison.json','wb') as outfile:
						json.dump(biggest_array_of_words,outfile,indent=4)
		
				except KeyError:
					continue



def count_title_words():					
	append_array = []					
	with open('title_words_comparison.json') as data_file:
		load_data = json.load(data_file)
		for info_for_freq in load_data:
			title = info_for_freq['title_word_reptition_info']
			for title_text in title:
				append_array.append(title_text)
				var = Counter(append_array)
				with open('title_word_repeated.json','wb') as data_file:
					json.dump(var,data_file,indent=4)
def full_title():					
	append_array = []
	with open('title_full_url_comparison.json') as data_file_1:
		load_data = json.load(data_file_1)
		for info_for_freq in load_data:
			title_full = info_for_freq['full_title']
			append_array.append(title_full)
			var = Counter(append_array)
			with open('full_title_repeated.json','wb') as data_file:
				json.dump(var,data_file,indent=4)
def root_url_comparison():
	append_array = []
	with open('root_domain_comparison.json') as data_file_2:
		load_data = json.load(data_file_2)
		for info_for_freq in load_data:
			full_root_domain = info_for_freq['root_domain']	
			append_array.append(full_root_domain)
			var = Counter(append_array)
			with open('full_root_domain_url_repeated.json','wb') as data_file:
				json.dump(var,data_file,indent=4)
def description_words_comparison():				
	append_array = []
	with open('description_words_comparison.json') as data_file_3:
		load_data = json.load(data_file_3)
		for info_for_freq in load_data:
			description_word = info_for_freq['words']
			append_array.append(description_word)
			var = Counter(append_array)
			with open('words_description_repeated.json','wb') as data_file:
				json.dump(var,data_file,indent=4)

def main_function():
	with open('full_root_domain_url_repeated.json') as outfile:
		load_freq = json.load(outfile)
		for key,value in load_freq.items():
			if value < 1:
				print key,value	


if __name__ == "__main__":
	main_function()

	