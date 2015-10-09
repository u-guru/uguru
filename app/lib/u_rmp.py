
### Searches rate my professor
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

