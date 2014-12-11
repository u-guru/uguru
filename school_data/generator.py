import csv
import json
# from geopy.geocoders import Nominatim
from geopy.geocoders import GoogleV3
from tld import get_tld
import pickle

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

	def __repr__(self):
		return "<School - %s, %s, %s, %s, %s, %s, %s, (%s, %s) >" % (self.name, self.address, self.city, self.state, self.website, self.domain, self.phone, self.latitude, self.longitude)

	def __hash__(self):
		return hash(self.name) ^ hash(self.address)

	def __eq__(self, other):
		if self.name == other.name or self.address == other.address:
			return True
		return False

	@staticmethod
	def find_by_name(name, school_list=[]):
		return filter(lambda school: name.lower() in school.name.lower(), school_list)
	
	@staticmethod
	def find_by_address(address, school_list=[]):
		return filter(lambda school: address.lower() in school.address.lower(), school_list)

	@staticmethod
	def nearbySchools(lat_long=(None, None), school_list=[], num_returned=3):
		from geopy.distance import vincenty

		discovered_schools = []
		for school in school_list: # TODO : This can be massively optimized.
			distance_between = vincenty(lat_long, (school.latitude, school.longitude) ).meters
			distance_to_school = (distance_between, school)
			discovered_schools.append(distance_to_school)

		sorted_schools = sorted(discovered_schools, key=lambda x: x[0])
		return sorted_schools[:num_returned]

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
	try:
		location = geolocator.geocode(school.address + " " + school.city + " " + school.state)
		if not location:
			raise
			return False
	except Exception, e:
		print e
		return False
	school.latitude = location.latitude
	school.longitude = location.longitude
	return True

def run(debug=False):
	# Get all schools and get rid of non-institutions: trade schools, beauty schools, etc...
	schools = load_data()
	schools = filter(lambda x: x.type == "Institutional", schools)
	schools = list(set(schools)) # Remove duplicates 
	print "Total unique schools to fetch: " + str(len(schools))
	
	if debug:
		print "DEBUG: Shuffling and limiting to 10 schools."
		import random
		random.shuffle(schools)
		schools = schools[:10]
	
	schools_with_geo = []
	schools_without_geo = []
	
	for school in schools:
		success = fetch_geo_info(school)
		if success:
			print "SUCCESS: " + str(school)
			schools_with_geo.append(school)
		else:
			print "FAIL: " + str(school)
			schools_without_geo.append(school)

	# TODO : Try failed schools again with a different geolocator provider...
	print "Schools located: " + str(len(schools_with_geo))
	print "Schools not located: " + str(len(schools_without_geo))
	saveToFile(schools_with_geo)
	return schools_with_geo

def saveToFile(school_list):
	pickle.dump(school_list, open("schools.p", "wb"))
	print "Saved to file."

def loadFromFile():
	imported_schools = pickle.load(open("schools.p", "rb"))
	print "Loaded from file."
	return imported_schools

# Alternatives:
# Google Nearby Search API
# http://univ.cc/index.html
# http://www.nwstartups.com/api/find.php?table=school&gps=34.2521390,-118.4987880,0.05
# http://api.mygeoposition.com/geopicker/
# http://univ.cc/search.php?dom=edu&key=berkeley&start=51
# http://geoforms.org/country.php?uid=4ce32af065315&lang=en
# http://opengeocode.org