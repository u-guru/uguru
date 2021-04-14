import requests,json
from bs4 import BeautifulSoup
from mailgun import *

 
name_arr = ['ben']
huge_array = []
output = 'north_carolina.json'
 
for names in name_arr:
 
        base_url  = 'http://www.ncsu.edu/directory/?lastnametype=starts&lastname=&firstnametype=starts&firstname='+names+'&emailaddresstype=equals&emailaddress=&addresstype=contains&address=&phonenumbertype=ends&phonenumber=&departmenttype=contains&department=&titletype=contains&title=&searchtype=students&matchnicks=on&includevcard=on&matchprevlast=on&order=mixed&style=normal&search=Search'
        soup = BeautifulSoup(requests.get(base_url).text)
        main_wrapper = soup.find('div', attrs= {'class':'section-txt'})
        search_result = main_wrapper.findAll('div', attrs = {'class':'searchresult'})
        for name in search_result:
                dictionary = {}
                name_class = name.findAll('div', attrs = {'class':'row person'})
                for info in name_class:
                        first_name = info.findAll('div')[0]
                        name = first_name.text.split('\n')
                        dictionary['name'] = name[1].title()
                        dictionary['first_name'] = name[1].split(' ')[0].title()
                        dictionary['last_name'] = name[1].split(' ')[-1].title()
                        dictionary['type'] = name[3].replace('\t','')
                        dictionary['year'] = name[4]
                for email in name_class:
                        email_info = email.findAll('div', attrs = {'class':'col-sm-6 person__right'})
                        for email_detailed_info in email_info:
                                get_a_link = email_detailed_info.findAll('a')
                                for get_href in get_a_link:
                                        email = get_href['href']
                                        if "mailto:"  in email:
                                                dictionary['email'] = email.replace('mailto:','')
                        huge_array.append(dictionary)
                with open(output,'wb') as outfile:
                        json.dump(huge_array,outfile,indent = 4)
        add_students_to_mailing_list("Portland State Universityss", huge_array)