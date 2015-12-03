import requests, json
from bs4 import BeautifulSoup

soup = BeautifulSoup(requests.get('http://biology.cornell.edu/advising/student-advisors').text)

all_tutor_profiles = soup.select('.view-student-advisors .view-content div')
formatted_result = []
for profile in all_tutor_profiles:
	formatted_result.append({
			'full_name':profile.select('h2')[0].string,
			# 'college': profile.select('.field-name-field-sadvisor-college .field-type-list-text div')[1],
			# 'profile_url': profile.select('.field-name-field-sadvisor-image .field-type-image img')[0]['src']
		})

print formatted_result

	# introduction = profile
	# courses = profile
	# image_url = 
	# office_hours = profile
	# office_hours_time = profile
	# email_address = profile
