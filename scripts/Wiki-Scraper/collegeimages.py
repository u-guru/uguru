import tor_module, ast, json
from bs4 import BeautifulSoup

SHCHOOL_ARRAY = ['ucla']


OUTPUT_PATH = "wikiscrape.json"
# Change this URL
#Url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions%7Cinfo%7Cimages&titles=UCLA&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&iiprop=url&rvparse"
#url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions%7Cinfo%7Cimages&titles=UCLA&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&iiprop=url&rvparse"
for college_url in SHCHOOL_ARRAY:

	url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions%7Cinfo%7Cimages&titles="+college_url+"&rvprop=timestamp%7Cuser%7Ccomment%7Ccontent&inprop=url&redirects&iiprop=url&rvparse"
# Request the page formatted for JSON viewing
	url = url + "&format=json"
 
# Construct the dictionary from the JSON data and isolate the query.pages array
	dictionary = ast.literal_eval(tor_module.get(url).text)['query']['pages']
 
# Iterate through every page
	for page in dictionary:
			school = {}
 
		# Get the URL for the current page
			page_url = dictionary[page]['fullurl']
	   
		# Construct the beautiful soup object for the current page
			soup = BeautifulSoup(tor_module.get(page_url).text)
	   
		# Get the table on the right hand side of the page
			table = soup.find('table', class_ = "infobox")
	   
		# Get all the rows for the table
			rows = table.findAll('tr')
	

		# Iterate through every row
			for row in rows:
				# Check that the row has a heading
					if row.th is not None:

						if row.th.text == "Chancellor":
							Chancellorz = []
							a = row.td.findAll('a')
                            
							for chance in a:
								try:
									href = chance['title']
									Chancellorz.append(href)
								except:
									pass
							school['Chancellor'] = Chancellorz

			  
						if row.th.text == "Location
                        ":
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

						
						if row.th.text == "Type":
							typez = []
							college_type = row.td.findAll('a')
							for different_college_types in college_type:
								try:
									hrefz = different_college_types['title']
									typez.append(hrefz)
								except:
									pass
							school['CollegeTypes'] = typez

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


						if row.th.text == "Newspaper":
							newspaperz = []
							newspapers_all_tags = row.td.findAll('a')
							for college_newspaper in newspapers_all_tags:
								try:
									college_news_href = college_newspaper['title']
									newspaperz.append(college_news_href)
								except:
									pass
							school['News Paper'] = newspaperz

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

						if row.th.text == "Athletics":
							Athleticsz = []
							athletics_all_tgs = row.td.findAll('a')
							for college_atheltics in athletics_all_tgs:
								try:
									college_ath = college_atheltics['title']
									Athleticsz.append(college_ath)
								except:
									pass
							school['Atheltics'] = Athleticsz
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
					
						if row.th.text == "Established":
							college_established = []
							college_established_message = row.find('td').text
							college_established.append(college_established_message)
							school['Established Message'] = college_established

						if row.th.text == "Endowment":
							college_endowment = []
							college_student_endowment = row.find('td').text
							college_endowment.append(college_student_endowment)
							school['Endownment'] = college_endowment

						if row.th.text == "Budget":
							college_budget = []
							college_student_budget = row.find('td').text
							college_budget.append(college_student_budget)
							school['Budget'] = college_budget

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

						if row.th.text == "Sports":
							sports_team = []	
							sports_team_college = row.find('td').text
							sports_team.append(sports_team_college)
							school['Sports'] = sports_team
						if row.th.text == "Mascot":
							college_mascot = []
							college_mascot_college = row.find('td').text
							college_mascot.append(college_mascot_college)
							school['Mascot'] = college_mascot


						if row.th.text == "Affiliations":
							affiliationsz = []
							affiliaitons_all_tgs = row.td.findAll('a')
							for college_affiliaiton in affiliaitons_all_tgs:
								try:
									college_aff = college_affiliaiton['title']
									affiliationsz.append(college_aff)
								except:
									pass
							school['Affiliaitons'] = affiliationsz
						

					
				   
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
			with open(OUTPUT_PATH, 'w') as outfile:
				json.dump(school, outfile, indent = 4)