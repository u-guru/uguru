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

def process_school_info(school,info):
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

def university_already_processed(payload):
	return False


def send_university_info(school):
	pass

	index += 1
	print(str(index) + " Attempting to load course information for " + school["name"])

if __name__ == '__main__':
	
	chegg_schools_list = load_chegg_schools()
	
	print len(chegg_schools_list), 'loaded, now checking for final results'
	

	for school_file in chegg_schools_list[0:1]:
		
		school_name = school_file.replace('.json', '').replace('input-', '').replace('-', ' ').title()

		school_info = open_school_list(school_file)
		
		# prepare school to get API 
		school_api_params = process_school_info(school_file, school_info)

		print '====PROCESSING', school_name
		print '='
		print '='
		print len(school_info['departments']), 'departments'
		print school_info['all_stats']['num_courses'], 'courses'
		
		# return university json DB JSON 
		university_response = create_university(school_api_params)
		university_id = university_response and university_response.get('id')
		print 'SUCCESS', '/api/university [POST]'

		if university_already_processed(university_response):
			print 'SKIPPING', school_name
			continue

		department_payload = [process_school_department(department) for department in school_info['departments']]
		department_response = create_university_departments(university_id, department_payload)
		

		print 'SUCCESS', '/api/department [POST] x' + str(len(department_response))



		# for department in department_response:
		for department in school_info['departments']:
			
			course_payload = department['courses']
			
			department_id = department['id']
			
			course_response = create_university_dept_courses(university_id, department_id, course_payload)

			print 'Success', '/api/courses [POST] x', len(course_params_arr)
			

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