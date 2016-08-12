import requests
from bs4 import BeautifulSoup
state_abbrv = []
url = 'https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population'
response = requests.get(url).text
soup = BeautifulSoup(response)
main_wrapper = soup.findAll('table', attrs = {'class':'wikitable'})[2].findAll('td')
for wrapper in main_wrapper:
	a_link_for_states = wrapper.findAll('a')
	for a_link_for_states_text in a_link_for_states:
		abberiviation = a_link_for_states_text.text.lower()
		state_abbrv.append(abberiviation)
print state_abbrv