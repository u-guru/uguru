 import tor_client, json
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz, process

SCHOOLS = [
	{
		"id": 742, 
		"name": "oregon-state-university", 
		"chegg-name": "oregonstate"
	}, 
	{
		"id": 775, 
		"name": "portland-state-university",
		"chegg-name": "pdx"
	}, 
	{
		"id": 1074, 
		"name": "university-of-irvine",
		"chegg-name": "uci"
	}
]

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
	descriptions = {}

	url = "http://www.chegg.com/courses/" + chegg_name
	soup = BeautifulSoup(tor_client.get(url).text)
	
	subjects = soup.find('div', attrs = {'class': 'subjects-list'}).findAll('li')
	
	course_count = 0
	
	for subject in subjects:
		subject_url = subject.a["href"]
		
		subject_soup = BeautifulSoup(tor_client.get(subject_url).text)
		courses = subject_soup.find('div', attrs = {'class': 'courses-list'}).findAll('li')
		
		for course in courses:
			course_count += 1
			
			if course_count % 1000 == 0:
				print(str(course_count) + " course descriptions scraped")
			
			course_code = course.find('span', attrs = {'class': 'code'}).text
			course_name = course.find('span', attrs = {'class': 'name'}).text
			
			descriptions[course_code] = course_name
			
	return descriptions
	
if __name__ == '__main__':
	for school in SCHOOLS:
		print("Attempting to load course information for " + school["name"])
		try:
			with open("input-" + school["name"] + ".json") as data_file:    
				course_descriptions = json.load(data_file)
			print("Loaded course information for " + school["name"])
		except FileNotFoundError:
			print("Getting course information from Chegg for " + school["name"])
			course_descriptions = get_chegg_course_descriptions(school["chegg-name"])
		
		print("Writing course information for " + school["name"])
		with open("input-" + school["name"] + ".json", 'w') as outfile:
			json.dump(course_descriptions, outfile)
	
		print("Getting teacher information from RateMyProfessor for " + school["name"])		
		teacher_ids = []
		
		url = get_school_url(school["id"])
		
		response = json.loads(requests.get(url).text)["response"]["docs"]
		
		for teacher in response:
			teacher_ids.append(teacher["pk_id"])
			
		class_information = {}
			
		print("Getting teacher ratings from RateMyProfessor for " + school["name"])
		for teacher in teacher_ids:
			url = get_teacher_url(teacher)
			
			response = json.loads(requests.get(url).text)["ratings"]
			
			for rating in response:
				class_name = rating["rClass"]
				
				# Skip the rating if the class doesn't contain a number
				if contains_number(class_name) == False:
					continue
					
				# Skip the rating if the first letter of the class name is a number
				if contains_number(class_name[0]) == True:
					continue
					
				class_name = format_class_name(class_name)
				
				# As we're directly comparing the class names to Chegg details,
				# we don't need to compare using Fuzzywuzzy.
				'''				
				class_already_found = 0
				class_already_found_name = ""
				
				# Iterate through every recorded class and store the name if
				# the name matches the current class name
				for clazz in class_information:
					fuzzy_ratio = fuzz.partial_ratio(class_name, clazz)
					if fuzzy_ratio == 100:
						class_already_found = 1
						class_already_found_name = clazz						
						break
				
				# If we've found a matching class name, use that. If not, store
				# a new one
				if class_already_found == 1:
					class_frequencies[class_already_found_name] += 1
				else:
				'''
				
				class_description_found = 1
				try:
					description = course_descriptions[class_name]
				except KeyError:
					class_description_found = 0
				
				if class_description_found == 1:
					try:
						frequency = class_information[class_name]["frequency"]
					except KeyError:
						frequency = 0
						class_information[class_name] = {}
							
					frequency += 1
							
					class_information[class_name]["description"] = description
					class_information[class_name]["frequency"] = frequency
				
		with open("output-" + school["name"] + ".json", 'w') as outfile:
			json.dump(class_information, outfile)
		
		print("Information dumped to output-" + school["name"] + ".json")
	