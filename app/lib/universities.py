## Learn more about all fields like courses_sanitized in models.py
## (also in this same directory)

def filterPrepared(universities_arr):

    def isPrepared(u):
        return (u.courses_sanitized \
            and u.departments_sanitized \
            and u.banner_url \
            and u.logo_url
            )

    return [u for u in universities_arr if isPrepared(u)]


## Returns all universities that are prepared && have more than X emails
def filterPreparedWithEmails(universities_arr):

    def isPreparedWithEmails(u):
        pass

    return []


## Returns number of total courses @ university using
## num_courses fields
def getTotalCourses(universities_arr):
    pass

## Returns number of total departments @ university using
## num_courses fields
def getTotalCourses(universities_arr):
    pass


def getAllNumberOfStudents(universities_arr):
    pass

def getAllNumberOfGurus(universities_arr):
    pass

### Return an array of all students who signed in the last week
def getAllActiveGurus(universities_arr):
    pass

### Return an array of all students who signed in the last week
def getAllActiveStudents(universities_arr):
    pass

### Return an array of most frequently appearing devices
### LATER
def getTop50ActiveDevices(universities_arr):
    pass

#########################
## University Specific ##
#########################

def getNumberOfStudents(university):
    pass

def getNumberOfGurus(university):
    pass

def getNumberOfActiveGurus(university):
    pass