import requests,json
from bs4 import BeautifulSoup

array = []
school_names = json.load(open('school_data.json'))
for items in school_names:
	school_without_banner  = {}
	school_without_banner['name'] = items.split(' | ')[0]
	id_info = items[0]
	print id_info
	#school_without_banner['id'] =

# 	array.append(school_without_banner)
# with open('school_without_banner.json','wb') as outfile:
# 	json.dump(array,outfile,indent=4)
# name = json.load(open('school_without_banner.json'))
# for items in name:
#    item = items['name']

# print item