import json
import urllib2,json,time
from bs4 import BeautifulSoup
import unicodedata

#load names
json_data=open('fa14-full-campus.json')
dict = json.load(json_data)

#break the url into parts before inserting student name in invalid
url1 = "https://calnet.berkeley.edu/directory/search.pl?search-type=lastfirst&search-base=student&search-term="
url2 = "%2C"
url3 = "&search=Search"

#check if student
def invalid(name):
    name = name.split()
    firstname = name[0]
    lastname = name[-1]
    fullurl = url1 + lastname + url2 + firstname + url3
    soup = BeautifulSoup(urllib2.urlopen(fullurl).read())
    match = "matching" in soup.get_text()
    if not match:
        return True
    return False


def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')

#main loop
start_time = time.time()
dict_len = len(dict)
count = 1
student_count = 0
for key in dict.keys():
    count = count + 1
    if invalid(strip_accents(unicode(key))):
        dict.pop(key)
    else:
        student_count += 1
    print count, "processed,", dict_len - count, "to go.", student_count, "students so far."
print len(dict)
end_time = time.time()

print "Total Time: " + str(end_time - start_time)

#write to another file
f = open("otherdata.json", "wb+")
f.write(json.dumps(dict,
        sort_keys = True,
        indent = 4,
        separators = (',', ': ')))