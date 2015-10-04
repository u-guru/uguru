import tor_client,json,requests
from bs4 import BeautifulSoup

huge_arr = []
zip_code_file = json.load(open('zip_code_parsed.json'))
for zip_code in zip_code_file:
	try:
		zip_code_info =zip_code['zip_codes']
		cookies = {'cookies':'.ASPXANONYMOUS=4s7KSfkz0QEkAAAANDIxZDhkMzYtOWUyNi00ZDZmLWE2MjQtMGYzNWI2NzczODlmEgYKy4RF3-mlUAoKrn5HBlOIW2I1; ASP.NET_SessionId=2srowyzvvs2dszuvcsk2jzyi; WyzAntRef=null; WyzAntGVal=; landingUrl=http://www.wyzant.com/; visitorID=d5c38f95-6e75-4742-bbfc-594890d1f0fc; lv=10/2/2015 6:09:54 PM; WyzAntFirstVisit=true; WyzantWWWAffinity=94ebc32265dc8e101a8eee8159749d8fb38c6357b8270ad09f040cc88ed18fe5; optimizelyEndUserId=oeu1443827395365r0.00015892763622105122; _cio=efc35a82-b1d2-ed22-6187-133f99e7508d; zip=94141; optimizely=3550520044; _gat=1; optimizelySegments=%7B%22173837634%22%3A%22campaign%22%2C%22173876126%22%3A%22false%22%2C%22173896022%22%3A%22gc%22%7D; optimizelyBuckets=%7B%2296710543%22%3A%220%22%2C%223550520044%22%3A%223555860014%22%7D; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22103377915%22; _ga=GA1.2.1912423747.1443827396; optimizelyPendingLogEvents=%5B%5D'}
		url = requests.get('https://www.wyzant.com/match?flow=search&kw=&z='+zip_code_info,cookies=cookies).text
		soup = BeautifulSoup(url)
		main_wrapper = soup.findAll('div', attrs = {'class':'searchResults'})
		for wrapper in main_wrapper:
			hyper_link = wrapper.findAll('div', attrs = {'class':'tutorLinkRow text-center spc-sm-n'})
			for url in hyper_link:
				url_info = url.findAll('a')
				for href_text in url_info:
					tutor_dict = {}
					response = 'https://www.wyzant.com' + href_text['href']
					print response
					tutor_dict['profile_url'] = response
					tutor_dict['resource'] = 'https://www.wyzant.com'
					soup = BeautifulSoup(tor_client.get(response).text)
					second_main_wrapper = soup.findAll('div', attrs = {'class':'column large-9 medium-8 small-8 profile-top-info'})
					for second_wrapper in second_main_wrapper:
						name = second_wrapper.findAll('h1',attrs =  {'itemprop':'name'})
						location = second_wrapper.findAll('h4', attrs = {'itemprop':'address'})
						price = second_wrapper.findAll('div', attrs =  {'class':'price'})
						tutor_dict['subjects'] = second_wrapper.findAll('h4', attrs = {'class':'light-header'})[-1].text.strip().replace('\n','')
						rating = second_wrapper.findAll('div', attrs = {'class':'tutor-stat tutor-stat-rating'})
						replies_times = second_wrapper.findAll('div', attrs = {'class':'tutor-stat tutor-stat-response'})
						for name_text,location_text,price_text,rating_text,replies_times_text in zip(name,location,price,rating,replies_times):
							tutor_dict['name'] = name_text.text.strip().replace('\n','')
							tutor_dict['location'] = location_text.text.strip().replace('\n','')
							tutor_dict['price'] = price_text.text.strip().replace('\n','')
							tutor_dict['ratings'] = rating_text.text.strip().replace('\n','')
							tutor_dict['replies'] = replies_times_text.text.strip().replace('\n','')
							huge_arr.append(tutor_dict)
			with open('wyzant_tutors.json','wb') as outfile:
				json.dump(huge_arr,outfile,indent=4)
	except requesocks.exceptions.ConnectionError:
		continue