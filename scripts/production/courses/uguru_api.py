import requests, os, json

ADMIN_AUTH_TOKEN = '9c1185a5c5e9fc54612808977ee8f548b2258d31'


def construct_url(args, production_flag = False):
	base_url = 'http://localhost:5000/api/admin/'
	if os.environ.get('production') or production_flag:
		base_url = 'http://uguru-rest.herokuapp.com/api/admin/'
	return base_url + ADMIN_AUTH_TOKEN + '/' + args

def parseResponse(payload):
	
	if payload.status_code != 200:
		print 'ERROR:', payload.text, '\n\n'
		raise
	else:
		return payload.json(), payload.status_code

# POST request
def create_university(payload):
	url = construct_url('universities')
	json_payload = json.dumps(payload)
	response, status = parseResponse(requests.post(url=url, json=json_payload))
	return response

# POST Create university departments
def create_university_departments(u_id,payload):
	url = construct_url('universities/' + str(u_id) + '/depts')
	json_payload = json.dumps(payload)
	response, status = parseResponse(requests.post(url=url, json=json_payload))
	return response

# POST Create university departments
def create_university_dept_courses(u_id,dept_id, payload):
	url = construct_url('universities/' + str(u_id) + '/depts/' + dept_id + '/courses')
	json_payload = json.dumps(payload)
	response, status = parseResponse(requests.post(url=url, json=json_payload))
	return response

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