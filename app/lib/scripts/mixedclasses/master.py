import requests, json
from bs4 import BeautifulSoup

def get_school_url(id):
	return "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=2000&q=%2A%3A%2A+AND+schoolid_s%3A" + str(id) + "&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow%28total_number_of_ratings_i%2C2.1%29&sort=total_number_of_ratings_i+desc&siteName=rmp&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s"

def get_teacher_url(id):
	return "http://www.ratemyprofessors.com/paginate/professors/ratings?tid=" + str(id) + "&page=1"

def contains_number(string):
	return any(char.isdigit() for char in string)

def remove_non_alphanumeric(string):
	return ''.join(char for char in string if char.isalnum())

def remove_spaces(string):
	return string.replace(' ', '')


def format_class_name(class_name):
	# Remove all non-alphanumeric characters from the class name
	class_name = remove_non_alphanumeric(class_name)

	# Remove all spaces from the class name
	class_name = remove_spaces(class_name)

	formatted_name = ""

	for char in range(0, len(class_name)):
		character = class_name[char]

		# If we're not on the first character
		if char > 0:
			previous_character = class_name[char - 1]

			# If this character is a number and the previous was a letter
			if contains_number(character) == True and contains_number(previous_character) == False:
				formatted_name += " "

		formatted_name += character

	return formatted_name

#returns None if not found, or returns tuple of (DEPT_index, COURSE_index)
def link_rmp_with_chegg(class_name, university_info, index=None):



	class_abbr = class_name.split(' ')[0]
	class_number = class_name.split(' ')[1]
	all_university_abbrs = [dept['abbr'] for dept in university_info['departments']]
	all_university_dept_names = [dept['name'] for dept in university_info['departments']]


	all_university_abbrs = [dept['abbr'] for dept in university_info['departments']]
	all_university_dept_names = [dept['name'] for dept in university_info['departments']]



	#case one, traditional approach

	if class_abbr in all_university_abbrs:
		abbr_index = all_university_abbrs.index(class_abbr)
		dept_info = university_info['departments'][abbr_index]
		dept_courses = dept_info['courses']
		all_dept_course_codes = [dept_course['code'].upper() for dept_course in dept_courses]
		if class_name.upper() in all_dept_course_codes:

			class_name_index = all_dept_course_codes.index(class_name.upper())
			# print index, class_name, 'connected to chegg course', dept_courses[class_name_index]['code']
			dept_course_info = dept_courses[class_name_index]


			return (abbr_index, class_name_index, 'connected')


	#case three see if if the abbr is a subset of the word, or vice versa
	for department_name in all_university_abbrs:
		if class_abbr in department_name.upper() or department_name.upper() in class_abbr:
			abbr_index = all_university_abbrs.index(department_name.upper())
			dept_info = university_info['departments'][abbr_index]
			dept_courses = dept_info['courses']
			all_dept_course_num = [str(dept_course['code'].split(' ')[-1]) for dept_course in dept_courses]

			if str(class_number) in all_dept_course_num:
				course_index = all_dept_course_num.index(str(class_number))

				# print index, 'subset found with number for', class_name, 'with chegg course', dept_courses[course_index]['code']
				return (abbr_index, course_index, 'dept-variation')
			else:
				# print index, 'subset found without number', department_name, class_abbr, class_name
				return (abbr_index, None, 'rmp-dept-only')



	#case two, see if there is an acronym match with the abbreviation
	processed_department_name_acronyms = []

	for department_name in all_university_dept_names:
		if department_name:

			processed_dept_name = remove_special_chars_and_articles(department_name)

			processed_dept_name_acronym = ''.join([word[0] for word in processed_dept_name.split(' ')])

			processed_department_name_acronyms.append(processed_dept_name_acronym)
		else:
			processed_department_name_acronyms.append('')




	if class_abbr in processed_department_name_acronyms:

		abbr_index = processed_department_name_acronyms.index(class_abbr.upper())

		# print index, 'acronym found', class_abbr, class_name
		dept_info = university_info['departments'][abbr_index]
		dept_courses = dept_info['courses']
		all_dept_course_num = [str(dept_course['code'].split(' ')[-1]) for dept_course in dept_courses]

		if str(class_number) in all_dept_course_num:
			course_index = all_dept_course_num.index(str(class_number))
			# print index, 'acronym found with number for', class_name, 'with chegg course', dept_courses[course_index]['code']

			return (abbr_index, course_index, 'acronym-variation')
		else:
			# print index, 'acronym found without number', department_name, class_abbr, class_name
			return (abbr_index, None, 'rmp-abbr-only')


def get_chegg_course_descriptions(chegg_name):
	university_info = {'departments': [], 'name': chegg_name}

	url = "http://www.chegg.com/courses/" + chegg_name
	soup = BeautifulSoup(requests.get(url).text)

	subjects = soup.find('div', attrs = {'class': 'subjects-list'}).findAll('li')

	course_count = 0

	for subject in subjects:


		subject_url = subject.a["href"]
		subject_text = subject.find('span',attrs={'class':'name'}).text
		subject_abbr = subject.find('span',attrs={'class':'code'}).text

		subject_info = {'url':subject_url, 'name': subject_text, 'courses': [], 'abbr':subject_abbr}


		subject_soup = BeautifulSoup(requests.get(subject_url).text)
		try:
			courses = subject_soup.find('div', attrs = {'class': 'courses-list'}).findAll('li')
		except:
			continue

		for course in courses:
			course_count += 1

			if course_count % 1000 == 0:
				print(str(course_count) + " course descriptions scraped")

			course_code = course.find('span', attrs = {'class': 'code'}).text
			course_name = course.find('span', attrs = {'class': 'name'}).text
			course_url = course.a['href']
			course_info = {'code': course_code, 'name': course_name, 'course_url': course_url}

			subject_info['courses'].append(course_info)

		university_info['departments'].append(subject_info)
		university_info['all_stats'] = {
			'num_departments': len(university_info['departments']),
			'num_courses': sum([len(dept['courses']) for dept in university_info['departments']])
		}

	return university_info

def get_school_information():
	school_list = []

	soup = BeautifulSoup(requests.get('http://www.chegg.com/courses/').text)
	schools = soup.find('div', attrs = {'class': 'schools-list'}).findAll('li')

	for school in schools:
		sch = {}

		sch['chegg-name'] = school.find('a')['href'].split('/')[-1]

		sch['name'] = school.find('span', attrs = {'class': 'code'}).string.lower().replace(' ', '-')

		sch['id'] = int(get_school_id(school.find('span', attrs = {'class': 'code'}).string))

		if sch['id'] != -1:
			school_list.append(sch)

	return school_list

def remove_special_chars_and_articles(string):
	words_to_filter = [' AND ', ' OR ', ' Of ']
	words_to_replace = ['-', '&', '/', ',']

	upper_string = string.upper()

	# replace all special characters with a space
	for replace_word in words_to_replace:
		upper_string = upper_string.replace(replace_word, ' ')

	# filter our all articles

	for filter_word in words_to_filter:
		upper_string = upper_string.replace(filter_word, ' ')

	# parse out all extra spaces

	result_string = (' '.join(upper_string.split())).title()

	return result_string

def get_school_id(school_name):
	
	response = requests.get('http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=1&q=' + school_name + '&siteName=rmp&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL').text

	try:
		response_json = json.loads(response)['response']['docs'][0]
	except (IndexError, ValueError):
		return -1

	return response_json['pk_id']

if __name__ == '__main__':

	# Checks and see if local directory already has all chegg schools JSON file
	try:
		with open('school-data.json') as data_file:
			SCHOOLS = json.load(data_file)
		print("Loaded school data from file")
	except IOError:
		SCHOOLS = get_school_information()
		with open('school-data.json', 'w') as outfile:
			json.dump(SCHOOLS, outfile)
		print("Dumped school data to file")

	# Iterates through chegg courses
	index = 0
	for school in SCHOOLS:
		index += 1
		print(str(index) + " Attempting to load course information for " + school["name"])

		## have we already scraped that schools chegg data?
		try:
			with open("input-" + school["name"] + ".json") as data_file:
				university_info = json.load(data_file)
			print("Loaded course information for " + school["name"])
		except IOError:
			print("Getting course information from Chegg for " + school["name"])
			university_info = get_chegg_course_descriptions(school["chegg-name"])

			print("Writing course information for " + school["name"])

			with open("input-" + school["name"] + ".json", 'w') as outfile:
				# we're going to send this to the server, might as well make it look nice & easy to read
				json.dump(obj=university_info, fp=outfile, indent=4, sort_keys=True)


		# update master.json

		with open("master.json") as data_file:
			master_json = json.load(data_file)
			universities = master_json['universities']
			if not universities.get(school['name']):
				master_json['universities'][school['name']] = university_info
				master_json['universities'][school['name']].pop('departments') # dont want to make this a MASSIVE file
				master_json['all_stats']['num_courses'] = sum([master_json['universities'][uni]['all_stats']['num_courses'] for uni in master_json['universities'].keys()])
				master_json['all_stats']['num_departments'] = sum([master_json['universities'][uni]['all_stats']['num_departments'] for uni in master_json['universities'].keys()])
				#update this file
				with open("master.json", 'w') as outfile:
					json.dump(obj=master_json, fp=outfile, indent=4, sort_keys=True)

				with open("master_five.json", 'w') as outfile:
					json.dump(obj=master_json, fp=outfile, indent=4, sort_keys=True)

		# print("Getting teacher information from RateMyProfessor for " + school["name"])
		# teacher_ids = []
		# teacher_data = []

		# url = get_school_url(school["id"])

		# response = requests.get(url).text
		# try:

		# 	response = json.loads(response)["response"]["docs"]
		# except:
		# 	print response
		# 	raise

		# for teacher in response:

		# 	teacher_ids.append(teacher["pk_id"])
		# 	teacher_data.append(teacher)

		# class_information = {}
		# university_info['popular_courses'] = []

		# print("Getting teacher ratings from RateMyProfessor for " + school["name"])
		# popular_courses = 0
		# rmp_only = 0
		# for teacher in teacher_ids:
		# 	url = get_teacher_url(teacher)
		# 	from time import sleep
		# 	sleep(0.25)
		# 	response = json.loads(requests.get(url).text)["ratings"]
		# 	from pprint import pprint
		# 	# print len(response), 'ratings found'
		# 	index = 0
		# 	for rating in response:
		# 		index += 1
		# 		class_name = rating["rClass"]

		# 		# Skip the rating if the class doesn't contain a number
		# 		if contains_number(class_name) == False:
		# 			# print 'INVALID: doesnt contain number', class_name
		# 			continue

		# 		# Skip the rating if the first letter of the class name is a number
		# 		if contains_number(class_name[0]) == True:
		# 			# print 'INVALID: first is number', class_name
		# 			continue

		# 		class_name = format_class_name(class_name)

		# 		is_linked = link_rmp_with_chegg(class_name, university_info, index)

		# 		if is_linked:
		# 			dept_index, class_index, option = is_linked
		# 			from pprint import pprint

		# 			if option == 'connected':
		# 				course_obj = university_info['departments'][dept_index]['courses'][class_index]

		# 				if course_obj.get('frequency'):
		# 					course_obj['frequency'] += 1
		# 				else:
		# 					popular_courses += 1
		# 					course_obj['frequency'] = 1
		# 					course_obj['is_popular'] = True

		# 				if course_obj.get('variations') and class_name not in course_obj['variations']:
		# 					course_obj['variations'].append(class_name.upper())
		# 				else:
		# 					course_obj['variations'] = [class_name.upper()]

		# 				university_info['departments'][dept_index]['courses'][class_index] = course_obj

		# 				# pprint(university_info['departments'][dept_index]['courses'][class_index])
		# 				# print

		# 			#add to variations
		# 			elif option == 'dept-variation':
		# 				course_obj = university_info['departments'][dept_index]['courses'][class_index]
		# 				if course_obj.get('frequency'):
		# 					course_obj['frequency'] += 1
		# 				else:
		# 					popular_courses += 1
		# 					course_obj['frequency'] = 1
		# 					course_obj['is_popular'] = True

		# 				if course_obj.get('variations') and class_name not in course_obj['variations']:
		# 					course_obj['variations'].append(class_name.upper())
		# 				else:
		# 					course_obj['variations'] = [class_name.upper()]

		# 				university_info['departments'][dept_index]['courses'][class_index] = course_obj
		# 				# pprint(university_info['departments'][dept_index]['courses'][class_index])
		# 				# print

		# 			elif option == 'acronym-variation':

		# 				course_obj = university_info['departments'][dept_index]['courses'][class_index]
		# 				if course_obj.get('frequency'):
		# 					course_obj['frequency'] += 1
		# 				else:
		# 					popular_courses += 1
		# 					course_obj['frequency'] = 1
		# 					course_obj['is_popular'] = True

		# 				if course_obj.get('variations') and class_name not in course_obj['variations']:
		# 					course_obj['variations'].append(class_name.upper())
		# 				else:
		# 					course_obj['variations'] = [class_name.upper()]

		# 				university_info['departments'][dept_index]['courses'][class_index] = course_obj
		# 				# pprint(university_info['departments'][dept_index]['courses'][class_index])
		# 				# print


		# 			elif option == 'rmp-abbr-only':
		# 				popular_courses += 1
		# 				rmp_only += 1
		# 				university_info['departments'][dept_index]['courses'].append({'code': class_name, 'frequency': 1, 'is_popular' : True, 'rmp_only': True})
		# 				# pprint(university_info['departments'][dept_index]['courses'][len(university_info['departments'][dept_index]['courses']) - 1])
		# 				# print index, class_name, '--rmp only, abbr'
		# 				# print
		# 			elif option == 'rmp-dept-only':
		# 				popular_courses += 1
		# 				rmp_only += 1
		# 				university_info['departments'][dept_index]['courses'].append({'code': class_name, 'frequency': 1, 'is_popular' : True, 'rmp_only': True})
		# 				# pprint(university_info['departments'][dept_index]['courses'][len(university_info['departments'][dept_index]['courses']) - 1])
		# 				# print index, class_name, '--rmp only, department'
		# 				# print


		# 			# print class_abbr, university_info['all_stats']['num_departments'], len(all_university_abbrs)


		# 			# 	else:
		# 			# 		print class_name, 'not connected'
		# 			# else:
		# 			# 	print class_abbr, class_name, 'abbr not connected'

		# 			#case two, see if class ABBR is same as article-filtered PS for political science

		# 			#case three, see if rmp_abbr is subset of chegg or vice cersa
		# university_info['all_stats']['popular_courses'] = {'total': popular_courses,'rmp_only': rmp_only,'rmp_and_chegg': (popular_courses - rmp_only)}
		# with open("results/final-" + school["name"] + ".json", 'w') as outfile:
		# 	json.dump(obj=university_info, fp=outfile, indent=4, sort_keys=True)

		# # 		class_description_found = 1
		# # 		try:
		# # 			description = course_descriptions[class_name]
		# # 		except KeyError:
		# 			class_description_found = 0

		# 		if class_description_found == 1:
		# 			try:
		# 				frequency = class_information[class_name]["frequency"]
		# 			except KeyError:
		# 				frequency = 0
		# 				class_information[class_name] = {}

		# 			frequency += 1

		# 			class_information[class_name]["description"] = description
		# 			class_information[class_name]["frequency"] = frequency

		# print("Information dumped to output-" + school["name"] + ".json")