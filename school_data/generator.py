import csv
from geopy.geocoders import GoogleV3, Nominatim, ArcGIS, OpenMapQuest, Yandex
from tld import get_tld
from datetime import datetime
import pickle
import time
import random

class School:
	def __init__(self, row):
		self.name = row["Institution_Name"]
		self.state = row["Institution_State"] 
		self.city = row["Institution_City"]
		self.address = row["Institution_Address"]
		self.website = row["Institution_Web_Address"]
		self.phone = row["Institution_Phone"]
		self.type = row["Accreditation_Type"]
		self.domain = get_tld("http://" + self.website, fail_silently=True) # Try to get likely email domain
		self.latitude = None
		self.longitude = None
		self.geocoder_used = None
		self.last_updated = datetime.now()

	def __repr__(self):
		return "<School - %s, %s, %s, %s, %s, %s, %s, %s, %s >" % (self.name, self.address, self.city, self.state, self.website, self.domain, self.phone, self.latitude, self.longitude)

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
	def nearby_schools(lat_long=(None, None), school_list=[], num_returned=3):
		from geopy.distance import vincenty

		discovered_schools = []
		for school in school_list: # TODO : This can be massively optimized.
			distance_between = vincenty(lat_long, (school.latitude, school.longitude) ).meters
			distance_to_school = (distance_between, school) # (123.134, <School>)
			discovered_schools.append(distance_to_school)

		sorted_schools = sorted(discovered_schools, key=lambda x: x[0])
		return sorted_schools[:num_returned]

def load_data():
	# Note : The most recent data can be pulled from this government accreditation site: 
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
	providers = [GoogleV3, Nominatim, ArcGIS, OpenMapQuest, Yandex]
	random.shuffle(providers) # To avoid take limiting
	location = None;
	for geolocator in providers:
		try:
			print "...trying prvider: "+ str(geolocator.__module__) + " for school " + str(school.name)
			location = geolocator().geocode(school.address + " " + school.city + " " + school.state, timeout=2) # Give them a shot to respond
		except Exception, e:
			print "......" + str(e)
			continue
		if location:
			school.latitude = location.latitude
			school.longitude = location.longitude
			school.geocoder_used = geolocator.__module__
			school.last_updated = datetime.now()
			return school
	return None

def run(batch_size=10):
	# Get all schools and get rid of non-institutions: trade schools, beauty schools, etc...
	schools = load_data()
	schools = filter(lambda x: x.type == "Institutional", schools)
	schools = list(set(schools)) # Remove duplicates 
	print "Total unique schools to fetch: " + str(len(schools))
	
	# Shuffle them so we dont get the same order every run
	random.shuffle(schools)
	schools = schools[:batch_size]
	
	school_cache = loadFromFile() # Pull in already computed schools from the cache

	# Remove already computed/cached schools from the list to be computed 
	intersection = list(set(schools) & set(school_cache))
	for c_school in intersection:
		schools.remove(c_school)

	schools_with_geo = []
	for school in schools:
		updated_school = fetch_geo_info(school)
		if not updated_school:
			print "FAIL: " + str(school)
		else:
			print "SUCCESS: " + str(updated_school)
			schools_with_geo.append(updated_school)
		time.sleep(2) # To avoid rate limiting

	all_schools = schools_with_geo + school_cache
	saveToFile(all_schools)
	# Beep
	import sys
	sys.stdout.write('\a')
	sys.stdout.flush()

def saveToFile(school_list):
	print "Schools saved: " + str(len(school_list))
	pickle.dump(school_list, open("schools.p", "wb"))

def loadFromFile():
	imported_schools = []
	try:
		imported_schools = pickle.load(open("schools.p", "rb"))
		print "Loaded "+str(len(imported_schools))+" schools from local file."
	except Exception:
		print "Failed to load schools from local file."
	return imported_schools

# Alternatives:
# Google Nearby Search API
# http://univ.cc/index.html
# http://www.nwstartups.com/api/find.php?table=school&gps=34.2521390,-118.4987880,0.05
# http://api.mygeoposition.com/geopicker/
# http://univ.cc/search.php?dom=edu&key=berkeley&start=51
# http://geoforms.org/country.php?uid=4ce32af065315&lang=en
# http://opengeocode.org
