
import requests
from bs4 import BeautifulSoup

first_api_call = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=1000&callback=jQuery111003018739989493042_1444415545511&q=*+&defType=edismax&bq=schoolname_sort_s%3A%22UC+%22%5E1000&qf=schoolname_autosuggest&bf=pow(total_number_of_ratings_i%2C1.9)&sort=score+desc&siteName=rmp&rows=5100&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL'
response = requests.get(first_api_call).text
print response
def getProfessorsForUniversityRMP(university_name):
	
	pass

def getRatingsFromProfessor(professor_rmp_id):
	pass

def getCourseNameFromRating():
	pass

## BONUS --> do this @ end
def getAverageRatingProfessor(professor_info):
	pass

### Scrape all popular courses
### Goal of this script is that this function should work if you've defined the ones above
def scrapePopularCoursesRMP(us_news_arr):
	results = []
	
	for uni_info in us_news_arr:
		university_name = uni_info['name']
		arrProfessors = getProfessorsForUniversityRMP(university_name)
		
		professors = []
		for professor_info in arrProfessors:
			professor_id = professor_info['id']

			# professor_avg_rating = getAverageRatingProfessor(professor_info)
			
			professorRatings = getRatingsFromProfessor(professor_id)

			courses = []
			for course_info in professorRatings:
				course_name = getCourseNameFromRating()
				courses.append(course_name)

			professors.append({
				'courses': courses,
				'name': professor_info['name'],
				## add other professor characteristics if easy -- it should be easy but save it for ernd
				# 'avg_rating': # Bonus
			})

		results.append({
			'name': uni_info['name'],
			'professors': professors,
			})

	return results
	## save to file

