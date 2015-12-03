import requests, json
from time import sleep

def uguruAPI(arg='', _json=None, _type='get'):
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

	if arg: arg = '/' + arg
	BASE_URL = 'http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities%s' % arg

	if _type == 'get':
		print BASE_URL
        response = requests.get(BASE_URL).text
        return json.loads(response)



	if _type =='put':
		return requests.put(url=BASE_URL, data=json.dumps(_json), headers=headers).text

	if _type =='post':
		return requests.post(url=BASE_URL, data=json.dumps(_json), headers=headers, verify=False).text

## number of emails > 0, departments are sanitizied, courses are sanitized
def getMostUpdatedUniversities():
	university_arr = uguruAPI('prepared')
	print len(university_arr), 'universities prepared'
	return university_arr

def getPopularCourses(uni_id):
    url_extension = "%s/popular_courses" % uni_id
    university_arr = uguruAPI(url_extension)
    return university_arr

def getAllUsNewsUniversities():
	university_arr = uguruAPI('us_news')
	return university_arr

def getUniversity(uni_id):
	university = uguruAPI(str(uni_id))
	print university
	return university

def updateUniversity(uni_dict):
	university = uguruAPI(str(uni_dict['id']), uni_dict, 'put')
	print university
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
    from time import sleep
    args = sys.argv

    if args[1] in ['num-prepared', '-np']:
    	getMostUpdatedUniversities()

    if args[1] in ['num-all', '-na']:
    	getAllwUsNewsUniversities()

    if args[1] in ['get-one', '-go']:

    	getUniversity(args[2])


    if args[1] in ['update-one', '-uo']:


    	updateMascot = open('banner_url_for_each_college.json')
    	load_as_json_obj = json.load(updateMascot)
    	results_arr = [ load_as_json_obj[key] for key in load_as_json_obj.keys()]
    	for items_banner in results_arr:
    		if items_banner['banner_url']:
    			sleep(2)
     			updateUniversity({'id':str(items_banner['school_id']), 'university_banner':str(items_banner['banner_url'])})
     			print "updating.."



    	#updateUniversity({'id':2554,'university_banner':'https://farm3.staticflickr.com/2273/2036165954_ad762b4dc1_z.jpg'})

    if args[1] in ['update-emails', '-ue']:
		updateEmailsForMailgun()


