import requests,json
import sys

first_api = 'http://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e3/universities/us_news'
requests = requests.get(first_api).text
school_information = json.loads(requests)
school_name = {}
empty_array_dict = {}
outer_array = []
for items in school_information:
	index1 = 0
	index2 = 0
	index3 = 0
	index4 = 0
	index5 = 0
	index6 = 0
	index7 = 0
	index8 = 0
	index9 = 0
	index10 = 0
	field = {}
	array = []
	each_item_array = []
	missing_field_dict = {}

	field['banner_url'] = items['banner_url']
	if field['banner_url'] == None:
		name1 = "Banner_URL"
		each_item_array.append(name1)
		index1  = 1
		

	field['courses_sanitized'] = items['courses_sanitized']
	if field['courses_sanitized'] == False:
		name2 = "Courses Sanitzed"
		index2 = 7
		each_item_array.append(name2)


	field['departments_sanitized'] = items['departments_sanitized']
	if field['departments_sanitized'] == None:
		name3 = "Departments_sanitized"
		index3 = 11
		each_item_array.append(name3)


	field['logo_url'] = items['logo_url']
	if field['logo_url'] == None:
		name4 = "logo_url"
		index4 = 2
		each_item_array.append(name4)
	field['num_emails'] = items['num_emails']
	if field['num_emails'] == 0:
		name5 = "num_emails"
		index5 = 8	
		each_item_array.append(name5)

	field['population'] = items['population']
	if field['population'] == 0:
		name6 = "Populaion"
		index6	= 4
		each_item_array.append(name6)
	field['school_color_one'] = items['school_color_one']
	if field['school_color_one'] == None:
		name7 = "School Color One"
		index7 = 5
		each_item_array.append(name7)

	field['num_depts'] = items['num_depts']
	if field['num_depts'] == 0:
		name8 = "Num_depts"
		index9 = 8
		each_item_array.append(name8)
	field['num_courses'] = items['num_courses']
	if field['num_courses'] == 0:
		name9 = "Num_courses"
		index10 = 8
		each_item_array.append(name9)

	field['school_name'] = items['name']
	if items['banner_url'] == None:	
		new_field = {}
		new_field['name'] = items['name']
		new_field['id'] = items['id']
		new_field['missing_fields'] = each_item_array


		total =  index1 + index2 + index3 + index4 + index5 +  index6 + index7 + index8 + index9 + index10
		total_count = items['name'] + ' | ' + str(total)
		
		array.append(field)
		
		empty_array_dict[total_count] = new_field
		

		with open('school_data.json','wb') as outfile:
			json.dump(empty_array_dict,outfile,indent=4)


		 
			