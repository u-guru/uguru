import requests, json
from bs4 import BeautifulSoup


response = requests.get('https://collegegrad.com/careers/all')
soup = BeautifulSoup(response.text)

all_links = soup.select('.cletter li a')
all_careers = [link.text for link in all_links]


with open('careers.json', 'w') as outfile:
    json.dump(all_careers,outfile,indent = 4)

