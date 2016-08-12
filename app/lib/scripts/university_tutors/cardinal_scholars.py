import json
import tor_client
from bs4 import BeautifulSoup

abbr_arr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]




tutors = []
### for state in state abbr
for state_abbr in abbr_arr:
    base_state_url = 'http://www.cardinalscholars.com/%s/tutors/' % state_abbr
    response = tor_client.get(base_state_url).text
    soup = BeautifulSoup(response)
    city_wrapper = soup.findAll('div', attrs = {'class':'tutors-list'})
    for each_city in city_wrapper:
		each_city_hyper_link = each_city.findAll('a')
		for each_hyper_link in each_city_hyper_link:
   			url = 'http://www.cardinalscholars.com' + each_hyper_link['href']
   			print url
   			first_response = tor_client.get(url).text
   			first_soup = BeautifulSoup(first_response)
   			main_wrapper = first_soup.findAll('div', attrs = {'class':'tutor-list-item'})
   			for info in main_wrapper:

   				tutor_dict = {}
   				name = info.findAll('h3')
   				tutor_profile_url = info.findAll('h3')
   				school = info.findAll('p', attrs = {'class':'school'})
   				tutor_dict['major'] = info.findAll('tr')[0].text.replace('Major:','').strip().replace('\n','')
   				tutor_dict['resource'] = 'http://www.cardinalscholars.com/'
   				resource = "http://www.cardinalscholars.com/"
   				for name_text, tutor_profile_url, school_name in zip(name,tutor_profile_url,school):
   					tutor_dict['name'] = name_text.text.replace('\n','').strip()	
   					tutor_dict['university'] = school_name.text.replace('\n','').strip()	
   					profile_url = tutor_profile_url.findAll('a')
   					for profile_url_href in profile_url:
   						   tutor_dict['profile_url'] = "http://www.cardinalscholars.com" + profile_url_href['href'].replace('\n','').strip()	
                        tutors.append(tutor_dict)


	   	with open('card_school_json','wb') as outfile:
	   		json.dump(tutors,outfile,indent=4)


   				

   		
    # ### get all the cities for this sate by scraping
    # all_cities = [ .... ]

    # ## go through each city
    # for city in all_cities:


    #     base_city_url = 'http://www.cardinalscholars.com/%s/%s/tutors/' % (state_abbr , city_url)
    #     response = requests.get(base_city_url).text

    #     soup  = BeautifulSoup(response)



    #     ### go through each page in results
    #     for page in results ...