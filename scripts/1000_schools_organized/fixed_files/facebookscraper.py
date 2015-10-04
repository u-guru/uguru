import time, dryscrape, json, math

# The username and password combination
USERNAME = "raisethehell_biplov@yahoo.com"
PASSWORD = "5102217320nm"

# The file to output the data to
OUTPUT_PATH = "output.json"

# The ID of the group ot scrape
GROUP_ID = "574916095895510"
strings_to_search_for = ['UCLA','University of Los Angeles']


def initialise_dryscrape_session():
	# set up a web scraping session
	return dryscrape.Session(base_url = 'https://www.facebook.com/')

def submit_login_form(session):
	# visit homepage and log in
	print "Logging in..."
	time.sleep(2)
	print "querying....", strings_to_search_for

	session.visit('/login.php?next=https://www.facebook.com/groups/' + GROUP_ID)

	# Set username and password
	username_field = session.at_css("#email")
	password_field = session.at_css("#pass")
	username_field.set(USERNAME)
	password_field.set(PASSWORD)


	# Submit the form
	username_field.form().submit()
	session.render('check1234.png')
	# Wait
	time.sleep(3)

def click_see_all_members(session):
	print "Visiting group!......"
	time.sleep(3)
	print "Viewing all members..."

	# Isolate the see all button and click it
	see_all_button = session.at_xpath("//*[@id='pagelet_group_profile_members']/div/div/div/div[1]/div/a")
	see_all_button.click()

	time.sleep(3)

def click_see_more_members(session):
	print "Viewing more members..."

	# Store a boolean about all pages being viewed
	all_pages_viewed = False

	# While all pages haven't been viewed, continue clicking see more
	while all_pages_viewed == False:
		# Isolate the button
		see_more_button = session.at_xpath("//a[@class='pam uiBoxLightblue uiMorePagerPrimary']")

		# Try to click the button. If an exception occurs, the button can't
		# be clicked, so change the boolean to stop the loop
		try:
			see_more_button.click()
			time.sleep(2)
		except Exception as e:
			all_pages_viewed = True
		

def extract_member_information(session, output):
	print "Extracting member information..."

	# Isolate all the member links on the page
	for member_link in session.xpath("//div[@class='fsl fwb fcb']/a"):
		member = {}

		# Store the name of the member
		member['name'] = member_link.text()

		# Isolate the user ID from the 'data-hovercard' attribute
		member['id'] = member_link['data-hovercard'].split('id=')[1].split('&')[0]

		# Add the user to the output
		output.append(member)

def save_information_to_json(path, information):
	print "Information saved as " + path

	# Open the path and dump the json
	with open(path, 'w') as outfile:
		json.dump(information, outfile,indent =5)
	print len(information)

if __name__ == "__main__":
	# Initialise the session
	session = initialise_dryscrape_session()

	# Submit the login form
	submit_login_form(session)

	# Click the "see all" button
	click_see_all_members(session)

	click_see_more_members(session)

	# Create an array to store the members and extract information on them
	members = []
	extract_member_information(session, members)

	# Save the information to a file
	save_information_to_json(OUTPUT_PATH, members)