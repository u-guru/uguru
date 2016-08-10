import requests, ast , json, string
from bs4 import BeautifulSoup
output = "wiki_actual_scraper.json"
with open('125_schools.json') as  data_file:
	data_info = json.load(data_file)
	for info in data_info:
		sanitized_name = info['University of Vermont']
		capt = string.capwords(sanitized_name)
		url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions%7Cinfo%7Cimages&titles="+capt+"&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&iiprop=url&rvparse"
		url = url + "&format=json"
		dictionary = ast.literal_eval(requests.get(url).text)['query']['pages']
		for page in dictionary:
			try:
				school = {}
				page_url = dictionary[page]['fullurl']
				college_name_array = []
				soup = BeautifulSoup(requests.get(page_url).text)
				table = soup.find('table', class_ = "infobox")
				rows = table.findAll('tr')
			except AttributeError:
				continue
				
				for row in rows:
				# Check that the row has a heading
					if row.th is not None:

			  			
						if row.th.text == "Location":
							longitude_latitude = {}
							location = []
							college_location = soup.find('span', attrs = {'class':'plainlinks nourlexpansion'})
							for actual_cord in college_location:
								try:

									longitude_latitude['Coordinates'] = college_location.find('span', attrs = {'class':'geo-default'}).text
									location.append(longitude_latitude)
								except:
									pass
								school['coords'] = location

						
						if row.th.text == "Nickname":
							endowmentz = []
							get_me_all_td = row.td.findAll('a')
							for college_nickname in get_me_all_td:
								try:
									college_hrefz = college_nickname['title']
									endowmentz.append(college_hrefz)
								except:
									pass
							school['Nick Name'] = endowmentz

				
					#    for longitude_location in college_location:


						if row.th.text == "Campus":
							mascotz = []
							mascots_all_tgs = row.td.findAll('a')
							for college_mascots in mascots_all_tgs:
								try:
									college_campus = college_mascots['title']
									mascotz.append(college_campus)
								except:
									pass
							school['Campus'] = mascotz

						if row.th.text == "Website":
							websitez = []
							websites_all_tgs = row.td.findAll('a')
							for college_website in websites_all_tgs:
								try:
									college_web = college_website['href']
									websitez.append(college_web)
								except:
									pass
							school['Website'] = websitez


						if row.th.text == "Students":
							student_population = []
							college_student_ammount = row.find('td').text
							student_population.append(college_student_ammount)
							school['Student Population'] = student_population
					

						if row.th.text == "Undergraduates":
							academic_staff = []
							academic_staff_college = row.find('td').text
							academic_staff.append(academic_staff_college)
							school['Undergraduates'] = academic_staff

						if row.th.text == "Postgraduates":
							graduates_staff =[]
							graduates_staff_college = row.find('td').text
							graduates_staff.append(graduates_staff_college)
							school['Postgraduates'] = graduates_staff

						if row.th.text == "Mascot":
							college_mascot = []
							college_mascot_college = row.find('td').text
							college_mascot.append(college_mascot_college)
							school['Mascot'] = college_mascot


						
					
				   
							if row.th.text == "Colors":
								# Create an array to hold the colors
									colors = []
							   
								# Get all spans in the table cell
									spans = row.td.findAll('span')
							   
								# Iterate through all the spans
									for span in spans:
										# Try to get the span style but catch the KeyError if the span has no style
											try:
												# Get the substring of the background colour
													style = span['style'][18:24]
											   
												# Add the colour to the array
													colors.append(style)
											except KeyError:
													pass
							   
								# Set the array into the dictionary
									school['colors'] = colors
				college_name_array.append(school)

			with open(output, 'w') as outfile:
				json.dump(college_name_array, outfile, indent = 4)