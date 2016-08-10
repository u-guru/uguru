import requests,json
from bs4 import BeautifulSoup



first_api_call = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=1000&q=*+&defType=edismax&bq=schoolname_sort_s%3A%22UC+%22%5E1000&qf=schoolname_autosuggest&bf=pow(total_number_of_ratings_i%2C1.9)&sort=score+desc&siteName=rmp&rows=5100&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL'


def getProfessorsForUniversityRMP():
	response = requests.get(first_api_call).text
	load_as_a_json_obj = json.loads(response)
	json_data = load_as_a_json_obj['response']['docs']
	for items in json_data:
		items_len =  items['pk_id']
		second_api_call = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&q=*%3A*+AND+schoolid_s%3A'+str(items_len)+'&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=500000&start=460&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s'
		response = requests.get(second_api_call).text
		load_as_a_json_obj = json.loads(response)
		json_data = load_as_a_json_obj['response']['docs']
		for professors in json_data:
			professor_information =  {}
			professor_information['pk_id'] = professors['pk_id']
			professor_information['professor_name'] = professors['teacherfirstname_t']
			return professor_information


def getRatingsFromProfessor(professor_rmp_id):
	for i in range(9000):
		ratings_api = 'http://www.ratemyprofessors.com/paginate/professors/ratings?tid='+professor_rmp_id+'&page='+str(i)
		response = requests.get(each_ratings).text
		load_as_a_json_obj = json.loads(response)
		json_keys_Data = load_as_a_json_obj['response']['docs']
		for each_items in json_keys_Data:
			ratings_dict = {}
			ratings_dict['comment'] = each_items['rComments']
			ratings_dict['attendance'] = each_items['attendance']
			ratings_dict['ClarityColor'] = each_items['ClarityColor']
			ratings_dict['easyColor'] = each_items['easyColor']
			ratings_dict['helpColor'] = each_items['helpColor']
			ratings_dict['helpCount'] = each_items['helpCount']
			ratings_dict['rInterest'] = each_items['rInterest']
			ratings_dict['sId'] = each_items['sID']
			return ratings_dict

def getCourseNameFromRating():
	response = requests.get(first_api_call).text
	load_as_a_json_obj = json.loads(response)
	json_data = load_as_a_json_obj['response']['docs']
	for items in json_data:
		items_len =  items['pk_id']
		second_api_call = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&q=*%3A*+AND+schoolid_s%3A'+str(items_len)+'&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=500000&start=460&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s'
		response = requests.get(second_api_call).text
		load_as_a_json_obj = json.loads(response)
		json_data = load_as_a_json_obj['response']['docs']
		for professors in json_data:
			professor_information =  {}
			professor_information['pk_id'] = professors['pk_id']
			for i in range(9000):
				ratings_api = 'http://www.ratemyprofessors.com/paginate/professors/ratings?tid='+professor_rmp_id+'&page='+str(i)
				response = requests.get(each_ratings).text
				load_as_a_json_obj = json.loads(response)
				json_keys_Data = load_as_a_json_obj['response']['docs']
				for each_items in json_keys_Data:
					courseName = {}
					courseName['courses'] = each_items['rClass']
					return courseName

def getAverageRatingProfessor(professor_info):
	all_professors = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&q=*%3A*+AND+schoolid_s%3A'+professor_info+'&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=500000&start=460&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s'
	response = requests.get(all_professors)
	load_as_json = json.loads(response)
	json_data = load_as_a_json['response']['docs']
	for average_rating in json_data:
		average_rating_for_each_professor = {}
		average_rating_for_each_professor['avg_rating'] = average_rating['averageratingscore_rf']
		return average_rating_for_each_professor


def scrapePopularCoursesRMP(us_news_arr):
	results = []
	
	for uni_info in us_news_arr:
		university_name = uni_info['name']
		arrProfessors = getProfessorsForUniversityRMP(university_name)
		
		professors = []
		for professor_info in arrProfessors:
			professor_id = professor_info['id']

			# professor_avg_rating = getAverageRatingProfessor(professor_info)
			
			professorRatings = getRatingsFromProfessor(professor_id)

			courses = []
			for course_info in professorRatings:
				course_name = getCourseNameFromRating()
				courses.append(course_name)

			professors.append({
				'courses': courses,
				'name': professor_info['name'],
				## add other professor characteristics if easy -- it should be easy but save it for ernd
				# 'avg_rating': # Bonus
			})

		results.append({
			'name': uni_info['name'],
			'professors': professors,
			})

	return results





		# try:
		# 	load_as_a_json_obj = json.loads(response)
		# 	json_data = load_as_a_json_obj['response']['docs']
		# 	for second_items in json_data:
		# 		professor_pk_id = second_items['pk_id']
		# 		professor_average_rating = second_items['averageratingscore_rf']
		# 		for i in range(90000):
		# 			each_ratings = 'http://www.ratemyprofessors.com/paginate/professors/ratings?tid='+str(professor_pk_id)+'&page='+str(i)
		# 			response = requests.get(each_ratings).text
		# 			load_as_a_json_obj = json.loads(response)
		# 			json_keys_Data = load_as_a_json_obj['ratings']
		# 			for items_info in json_keys_Data:
		# 				class_name = items_info['rClass']
						
				
		# except ValueError:
		# 	continue