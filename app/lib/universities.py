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
def filterPreparedWithEmails(universities_arr, num=1000):
    print
    def isPreparedWithEmails(u):
        return (u.courses_sanitized \
            and u.departments_sanitized \
            and u.banner_url \
            and u.logo_url
            and u.num_emails > 1000
            )
    sortedUniversities = sorted([u for u in universities_arr if isPreparedWithEmails(u)], key=lambda k:k.num_emails, reverse=True)
    return sortedUniversities

def filterStudentsWithBalance(students_arr, num=100):
    def hasBalanceGreaterThan(student, num):
        return (student.total_earned > num)

    students = [student for student in students_arr if hasBalanceGreaterThan(student, num)]
    return students

def calcAndSortedPrepared(universities):
    ## Returns preparedness of a universitiy from 0 to 1
    prepared_info = {}
    for university in universities:
        percentage, missing_fields = calcPreparedScore(university)
        prepared_info[university.id] = {'percentage': int(percentage * 100), 'missing':missing_fields}
    universities = sorted(universities, key=lambda uni:prepared_info[uni.id]['percentage'], reverse=True)
    print len(universities)
    return universities, prepared_info


## Returns number of total courses @ university using
## num_courses fields
def getTotalCourses(universities_arr):
    pass

## Returns number of total departments @ university using
## num_courses fields
def getTotalDepartments(universities_arr):
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

def calcPreparedScore(university):
        missing_fields = []
        total_fields = 11.0
        total = 0
        if university.num_courses:
            total += 1
        else:
            missing_fields.append('courses')
        if university.num_depts:
            total += 1
        else:
            missing_fields.append('departments')
        if university.departments_sanitized:
            total += 1
        else:
            missing_fields.append('sanitize dept')
        if university.courses_sanitized:
            total+= 1
        else:
            missing_fields.append('sanitize course')
        if university.school_color_one:
            total += 1
        else:
            missing_fields.append('school color')
        if university.school_mascot_name:
            total += 1
        else:
            missing_fields.append('mascot name')
        if university.school_casual_name:
            total += 1
        else:
            missing_fields.append('casual name')
        if university.latitude and university.longitude:
            total += 1
        else:
            missing_fields.append('lat / long')

        if university.seal_url or university.logo_url:
            total += 1
        else:
            missing_fields.append('logo img')

        if university.city and university.state:
            total += 1
        else:
            missing_fields.append('city/state')
        if university.banner_url:
            total += 1
        else:
            missing_fields.append('banner_url')
        percentage = float(total) / total_fields
        return percentage, missing_fields