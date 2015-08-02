import requests, json
from bs4 import BeautifulSoup

headers={"content-type":"text", "User-   Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5"}
response = requests.get('https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers', headers=headers)
soup = BeautifulSoup(response.text)

all_trs = soup.select('table.wikitable tr > td:nth-of-type(1)')
all_languages = [tr.string for tr in all_trs]
print len(all_languages), 'found'


with open('languages.json', 'w') as outfile:
    json.dump(all_languages,outfile,indent = 4)

