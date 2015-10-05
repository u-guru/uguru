import json, requests
from bs4 import BeautifulSoup
 
output = []
name_array = ['ben','michael']
for names in name_array:
        url = 'http://google.ohio.edu/search?q='+names+'&btnG=People+Search&client=peoplesearch_frontend&proxystylesheet=peoplesearch_frontend&ulang=en&sort=date%3AD%3AL%3Ad1&entqr=3&entqrm=0&wc=200&wc_mc=0&oe=UTF-8&ie=UTF-8&ud=1&site=peoplesearch'
        soup = BeautifulSoup(requests.get(url).text)
 
        ps_main_div = soup.find('div', attrs = {'id': 'ps_main_div'})
 
        rows = ps_main_div.find('td').findAll('div')
 
        for row in rows:
                output.append(row.find('a').text)

        with open('ohio_unviersity_data.json','wb') as outfile:
        	json.dump(output,outfile,indent = 4)
