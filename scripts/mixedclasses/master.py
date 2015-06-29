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

def get_school_id(school_name):
	print(school_name)
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
	for school in SCHOOLS[1500:1900]:
		print("Attempting to load course information for " + school["name"])

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

		# url = get_school_url(school["id"])

		# response = json.loads(requests.get(url).text)["response"]["docs"]

		# for teacher in response:
		# 	teacher_ids.append(teacher["pk_id"])

		# class_information = {}

		# print("Getting teacher ratings from RateMyProfessor for " + school["name"])
		# for teacher in teacher_ids:
		# 	url = get_teacher_url(teacher)

		# 	response = json.loads(requests.get(url).text)["ratings"]

		# 	for rating in response:
		# 		class_name = rating["rClass"]

		# 		# Skip the rating if the class doesn't contain a number
		# 		if contains_number(class_name) == False:
		# 			continue

		# 		# Skip the rating if the first letter of the class name is a number
		# 		if contains_number(class_name[0]) == True:
		# 			continue

		# 		class_name = format_class_name(class_name)

		# 		class_description_found = 1
		# 		try:
		# 			description = course_descriptions[class_name]
		# 		except KeyError:
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

		# with open("output-" + school["name"] + ".json", 'w') as outfile:
		# 	json.dump(class_information, outfile)

		# print("Information dumped to output-" + school["name"] + ".json")