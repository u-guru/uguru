import json, glob, os
from uguru_api import *

# displays error nicely wrapped lol
def p_error(message):
	print "===" + ("=" * len(message)) + "==="
	print "=  " + (" " * len(message)) + "  ="
	print "=  " + message + "  ="
	print "=  " + (" " * len(message)) + "  ="
	print "===" + ("=" * len(message)) + "==="

def load_chegg_schools():
	
	try:
		return glob.glob("*.json")
	except:
		raise
		p_error('No school-data found')
	return #returns none

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def open_school_list(filename):
	with open(filename) as data_file:
		university_info = json.load(data_file)
		return university_info

def check_school_exists_before(school):
	from universities_efficient import universities_arr
	from fuzzywuzzy import fuzz, process

	previous_university_titles = [university['title'] for university in universities_arr]

	for title in previous_university_titles:
		if fuzz.partial_ratio(school.lower(), title.replace('-', ' ').lower()) == 100:
			print 'MATCH\n', school, '\n', title, '\n\n\n'
			school = title
			return school

	print "school not found", school
	return school

def process_school_info(school,info):
	

	school = check_school_exists_before(school)

	result = {
		'name': school,
		# 'num_popular_courses': info['all_stats']['popular_courses']['total'],
		'num_courses': info['all_stats']['num_courses'],
		'num_depts': info['all_stats']['num_departments']
	}

	if not is_number(info['name']):
		result['short_name'] = info['name']

	return result

def process_school_department(dept):
	popular_count = 0
	for course in dept['courses']:
		if course.get('is_popular'):
			popular_count += 1

	return {
		'source': dept['url'],
		'num_courses': len(dept['courses']),
		'abbr':dept['abbr'],
		'num_popular_courses': popular_count
	}

def university_already_processed(payload, reference):
	return payload.get('num_classes') < reference.get('num_classes')

def send_university_info(school):
	pass

	index += 1
	print(str(index) + " Attempting to load course information for " + school["name"])

if __name__ == '__main__':
	
	chegg_schools_list = load_chegg_schools()
	
	print len(chegg_schools_list), 'loaded, now checking for final results'
	

	for school_file in chegg_schools_list:
		
		school_name = school_file.replace('.json', '').replace('input-', '').replace('-', ' ').title()

		school_info = open_school_list(school_file)

		try:
			if not school_info.get('name'):
				print 'ERROR: look into this'
				print school_name
				continue
		except:
			print 'WIERD ERROR: look into this'
			print school_name
			continue
		
		# prepare school to get API 
		school_api_params = process_school_info(school_name, school_info)
	

		print '====PROCESSING', school_name
		print '='
		print '=' 
		print len(school_info['departments']), 'departments'
		print school_info['all_stats']['num_courses'], 'courses'
		
		## Find whether we can find the university or not

		university_response = create_university(school_api_params)
		

		if not university_response:
			print 'ERROR', school_name
			raise

		university_id = university_response.get('id')
		print 'SUCCESS', '/api/university [POST]'

		if university_already_processed(university_response, school_info):
			print 'SKIPPING', school_name
			continue

		department_payload = [process_school_department(department) for department in school_info['departments']]
		department_response = create_university_departments(university_id, department_payload)
		

		print 'SUCCESS', '/api/department [POST] x' + str(len(department_response))



		# for department in department_response:
		index = 0
		for department in department_response['departments']:
			
			if department_already_processed(department, department_payload):
				
				print 'SKIPPING', department['name']
				index += 1
				continue

			course_payload = department['courses']
			
			department_id = department['id']
			
			course_response = create_university_dept_courses(university_id, department_id, course_payload)

			print 'Success', '/api/courses [POST] x', len(course_params_arr)
			
			index += 1

		print '='
		print '='
		print '=====END===='
		print


# ## have we already scraped that schools chegg data?
# 	try:
# 	with open("results/input-" + school["name"] + ".json") as data_file:
# 		university_info = json.load(data_file)
# 	print("Loaded course information for " + school["name"])


	
# 	# Iterates through chegg courses
# 	index = 900
# 	for school in SCHOOLS[900:1000]: