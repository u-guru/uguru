import requests, json

def uguruAPI(arg='', _json=None, _type='get'):
	if arg: arg = '/' + arg 
	BASE_URL = 'http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e3/universities%s' % arg
	print BASE_URL
	if _type == 'get':
		return json.loads(requests.get(BASE_URL).text)
	if _type =='put':
		headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
		return requests.put(url=BASE_URL, data=json.dumps(_json), headers=headers).text

## number of emails > 0, departments are sanitizied, courses are sanitized
def getMostUpdatedUniversities():
	university_arr = uguruAPI('prepared')
	print len(university_arr), 'universities prepared'
	return university_arr

def getAllUsNewsUniversities():
	university_arr = uguruAPI('us_news')
	print len(university_arr), 'universities prepared'
	return university_arr

def getUniversity(uni_id):
	university = uguruAPI(str(uni_id))
	print university
	return university

def updateUniversity(uni_dict):
	
	university = uguruAPI(str(uni_dict['id']), uni_dict, 'put')
	print university
	return university

def getUnsantisedAmountOfDepartments():
	departments_arr = uguruAPI('us_news')
	index = 0
	for departments in departments_arr:
		departments_info = departments['departments_sanitized']
		if departments_info == None:
			index += 1
	print index
	return index




if __name__ == '__main__':
    import sys
    args = sys.argv

    if args[1] in ['num-prepared', '-np']:
    	getMostUpdatedUniversities()

    if args[1] in ['num-all', '-na']:
    	getAllUsNewsUniversities()

    if args[1] in ['get-one', '-go']:
    	getUniversity(args[2])

    if args[1] in ['update-one', '-uo']:
    	pass
    if args[1] in ['unsantised-department','-ud']:
    	getUnsantisedAmountOfDepartments()
    	#updateUniversity({'id':2732, 'num_emails':10 })


