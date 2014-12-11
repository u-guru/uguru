import csv
import geopy
# from geopy.geocoders import Nominatim
from geopy.geocoders import GoogleV3
from tld import get_tld

class School:
	def __init__(self, row):
		self.name=row["Institution_Name"]
		self.state = row["Institution_State"] 
		self.city = row["Institution_City"]
		self.address = row["Institution_Address"]
		self.website = row["Institution_Web_Address"]
		self.phone = row["Institution_Phone"]
		self.type = row["Accreditation_Type"]
		self.domain = get_tld("http://" + self.website, fail_silently=True) # Try to get likely email domain
		self.latitude = None
		self.longitude = None
		self.data = row

	def __repr__(self):
		return "<School %s, %s, %s, %s, %s, %s >" % (self.name, self.address, self.city, self.state, self.website, self.phone)


	@staticmethod
	def find_by_name(name, school_list=None):
		return filter(lambda school: name.lower() in school.name.lower() , school_list)



def load_data():
	# Note : The most recent data can be pulled from this 
	# government accreditation site: 
	# http://ope.ed.gov/accreditation/GetDownLoadFile.aspx 
	csv_file = "Accreditation_2014_10.csv"
	all_schools = []
	with open(csv_file) as csvfile:
	    reader = csv.DictReader(csvfile)
	    for row in reader:
	    	s = School(row=row)
	    	all_schools.append(s)
	return all_schools


def fetch_geo_info(school):
	geolocator = GoogleV3()
	print "fetching coordinates for " + str(school)
	try:
		location = geolocator.geocode(school.address + " " + school.city + " " + school.state)
		if not location:
			print "location not found!"
			return False
	except Exception, e:
		print e
		return False
	school.latitude = location.latitude
	school.longitude = location.longitude
	print "done."
	return True

def run_generator():
	
	# Get all the schools
	all_schools = load_data()

	# Filter out non-institutions: trade schools, beauty schools, etc...
	select_schools = filter(lambda x: x.type == "Institutional" , all_schools)

	schools_with_geo = []
	schools_without_geo = []
	for school in select_schools[:10]:
		success = fetch_geo_info(school)
		if success:
			print "SUCCESS: " + str(school)
			schools_with_geo.append(school)
		else:
			print "FAIL: " + str(school)
			schools_without_geo.append(school)

	# Try again with failed schools
	for school in schools_without_geo:
		success = fetch_geo_info(school)
		if success:
			print "SUCCESS 2nd time: " + str(school)
			schools_with_geo.append(school)
			schools_without_geo.remove(school)
		else:
			print "FAIL 2nd time: " + str(school)

	print
	print "Schools successfully located: " + str(len(schools_with_geo))
	print "Schools not located: " + str(len(schools_without_geo))

# Alternatives:
# Google Nearby Search API
# http://univ.cc/index.html
# http://www.nwstartups.com/api/find.php?table=school&gps=34.2521390,-118.4987880,0.05
# http://api.mygeoposition.com/geopicker/
# http://univ.cc/search.php?dom=edu&key=berkeley&start=51
# http://geoforms.org/country.php?uid=4ce32af065315&lang=en
# http://opengeocode.org

# # Abandoning this method 
# from bs4 import BeautifulSoup
# US_STATE_SCHOOLS_MOBILE_SITE = "http://en.m.wikipedia.org/wiki/List_of_state_universities_in_the_United_States"
# def soupFromUrl(url):
# 	soup = BeautifulSoup(open(url))
# 	return soup
