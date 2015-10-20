import requests, json
from time import sleep

def uguruAPI(arg='', _json=None, _type='get'):
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	if arg: arg = '/' + arg 
	BASE_URL = 'http://localhost:5000/admin/stats/universities%s' % arg
	
	if _type == 'get':
		return json.loads(requests.get(BASE_URL).text)
	
	if _type =='put':
		return requests.put(url=BASE_URL, data=json.dumps(_json), headers=headers).text
	
	if _type =='post':
		return requests.post(url=BASE_URL, data=json.dumps(_json), headers=headers).text

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
	
	return university

def postDepartments(uni_dict):
	response = uguruAPI(str(uni_dict['id']) + '/depts', uni_dict, 'post')
	print response
	return response

def updateEmailsForMailgun():
	from data_utils import updateMailgunJsonWithFreshData
	mailgun_universities = updateMailgunJsonWithFreshData(1000)
	for university in mailgun_universities:
		payload = {
			'id':university.get('id'),
			'num_emails' : university.get('count')
			}
		updateUniversity(payload)
		sleep(1)


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
    	updateUniversity({'id':381, 'school_mascot_name':'the Pilgrim' })

    if args[1] in ['update-emails', '-ue']:
		updateEmailsForMailgun()    	


