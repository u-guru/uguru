import requests

ADMIN_AUTH_TOKEN = 'a;dljasiodna90sdnaidna'

# POST request
def create_university(payload):
	pass

# POST Create university departments
def create_university_departments(u_id,payload):
	return []

# POST Create university departments
def create_university_dept_courses(u_id,dept_id, payload):
	pass

# PUT update university
def update_university(u_id, payload):
	pass

# GET universities higher level list
def get_universities(sort_by_rank=False):
	pass

# GET universities higher level list
def update_department(u_id, dept_id, payload):
	pass

# GET a universities departments, optional popular filter
def get_departments(u_id, popular_only=False):
	pass

# Get a list of courses for a university department
def get_courses_from_department(u_id, dept_id, popular_only=False):
	pass

def update_university_course(u_id, course_id, payload):
	pass

# GET update 
def create_university_dept_courses(u_id,dept_id, payload):
	pass