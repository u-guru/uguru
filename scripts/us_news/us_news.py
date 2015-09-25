from app.models import *
from pprint import pprint
import requests, json
from bs4 import BeautifulSoup
index = 0
pages = 11
us_news_url = 'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+'

results = []

# index = 0
results = []

for index in range(1, 13):
    if len(results) >= 200: break
    try:
        us_news_url = 'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+%d' % index
        soup = BeautifulSoup(requests.get(us_news_url).text)
        us_university_names = [a.text for a in soup.select('.college_name a') if a.text][1:]
        us_university_populations = [population.text.strip().replace(',', '') for population in soup.select('.total_all_students')[1:]]
        for name in us_university_names:
            uni_dict = {
                    'rank': len(results) + 1,
                    'name': name,
            }
            try:
                population = us_university_populations[us_university_names.index(name)]
                population = int(population)
                uni_dict['population'] = population
            except:
                print population, 'for', name, 'is invalid'

            results.append(uni_dict)
    except:
        print 'error occurred@', name, ' with rank ', len(results)
        continue
with open('app/static/data/us_news_2015.json', 'wb') as fp:
    json.dump(results, fp, indent = 4)