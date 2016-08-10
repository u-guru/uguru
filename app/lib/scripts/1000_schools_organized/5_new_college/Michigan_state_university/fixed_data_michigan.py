import requests,json
from bs4 import BeautifulSoup
from mailgun import*
 
 
huge_arr = []
 
 
 
with open('michigan_states_university_data.json') as datafile:
        json_data_file = json.load(datafile)
        for email in json_data_file:
                dictionary = {} 
                dictionary['email'] =  email['email'].strip()
                dictionary['first_name'] = email['first_name'].strip()
                dictionary['last_name'] = email['last_name'].strip()
                huge_arr.append(dictionary)
      	with open('fixed_michigan.json','wb') as outfile:
      		json.dump(huge_arr,outfile,indent=4)