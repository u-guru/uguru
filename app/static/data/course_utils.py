
####
## To become popular
## - Department long
## - Department short
## - short_name
## - long_name
## - code
## - Variations

####
## - Gameplan
## [x] Set a benchmark - more than 200 popular courses
## [ ] Create base dept_lookup dictionary
## [ ] Single out universities < popular course benchmark
## [ ] Resolve one of those && add to department
    ## [ ]

## - Build up lookup_dict while counting all university courses that are already valid
## - Attempt to convert previous popular courses

def openDeptLookup():
    import json
    file = open('app/static/data/dept_lookup.json')
    dept_dict = json.load(file)
    return dept_dict

def saveErrors():
    pass

def updateDeptLookupThroughUniversity():
    pass

def saveDeptLookup(dept_dict):
    import json
    with open('app/static/data/dept_lookup.json', 'wb') as fp:
        json.dump(dept_dict, fp, sort_keys = True, indent = 4)
    print "Department lookup dictionary saved"

def checkIfDepartmentExists(dept_str):
    dept_dict = openDeptLookup()
    if dept_str in dept_dict['lookup']:
        dept_master_ref = dept_dict['lookup'][dept_str]
        dept_master_dict = dept_dict['master'][dept_master_ref]
        dept_str_variations = dept_master_dict['variations']
        return dept_str_variations
    return False

## Step one -- to be valid
def countValidCourses(courses):
    department_dict = openDeptLookup()
    count = 0
    for course in courses:
        if course.short_name and course.full_name and course.code and course.variations:
            count += 1
    return count

def runUniversityBenchmark(universities, benchmark):
    import json
    stats = {}
    below_benchmark_courses = []
    below_benchmark_popular_courses = []
    sum_courses = 0
    sum_popular_courses = 0
    for u in universities:
        sum_popular_courses += u.num_popular_courses
        sum_courses += u.num_courses
        if u.num_courses < benchmark:
            below_benchmark_courses.append((u.id, u.name, u.num_popular_courses, u.num_courses))
        if u.num_popular_courses < benchmark:
            below_benchmark_popular_courses.append((u.id, u.name, u.num_popular_courses, u.num_courses))

    stats['stats'] = {
        'total': len(universities),
        'avg_popular': sum_popular_courses / len(universities),
        'avg_courses': sum_courses / len(universities),
        'Courses < benchmark': len(below_benchmark_courses),
        'Popular Courses < benchmark': len(below_benchmark_popular_courses)
    }
    stats['below_courses'] = below_benchmark_courses
    stats['below_popular_courses'] = below_benchmark_popular_courses
    with open('app/static/data/dept_report.json', 'wb') as fp:
        json.dump(stats, fp, sort_keys = True, indent = 4)
    return stats

def getNonNumericalPartOfCourse(course_string):
    import re
    match = re.match(r"([a-z]+)([0-9]+)", course_string, re.I)
    if match:
        items = match.groups()
        return items[0]

def getFilledFields(course):
    fields = []
    if course.short_name:
        fields.append('short_name')
    if course.full_name:
        fields.append('full_name')
    if course.name:
        fields.append('name')
    if course.department_long:
        fields.append('department_long')
    if course.department_short:
        fields.append('department_short')
    if course.variations:
        fields.append('variations')
    if course.code:
        fields.append('code')
    if course.times_mentioned:
        fields.append('times_mentioned')
    if course.course_number:
        fields.append('course_number')
    return fields

def resolveUniversityToPopular(university):
    lookup_dict = openDeptLookup()
    master_dict = lookup_dict['master']
    lookup_dict = lookup_dict['lookup']
    university_courses = university.courses
    audit_popular_courses = 0
    resolved_courses_count = 0
    for course in university.courses:
        if course.short_name and not course.is_popular:
            course_short_name = course.short_name.replace(' ', '').replace('  ', '')
            course_dept = getNonNumericalPartOfCourse(course_short_name.lower())
            if course_dept:
                if course_dept.upper() in lookup_dict:
                    resolved_courses_count += 1
                    dept_long = lookup_dict[course_dept.upper()]
                    variations = master_dict[dept_long]['variations']
                    code = course_short_name.replace(course_dept, '')
                    dept_short = min(variations)
                    full_name = None
                    short_name = None
                    if not course.full_name:
                        full_name = dept_long.upper() + ' ' + code
                    if not course.short_name:
                        short_name = dept_str_variations + ' ' + code
                    new_course = convertCourseToPopular(dept_long, dept_short, variations, code, course, full_name, short_name)
                    new_course.is_popular = True
                    # print "%s + %s ---> %s, %s, %s, %s" % (course.short_name, course.full_name, dept_long, dept_short, variations, code)
    # print "\nAudit popular course results: %s\n" % audit_popular_courses

    # print "\n\n%s:\nInitial resolved: %s;\nAfter Resolve: %s out of %s total\n\n" % (university.name, audit_popular_courses, resolved_courses_count, university.num_courses)
    return resolved_courses_count

def updateLookupDict(university):
    lookup_dict = openDeptLookup()
    master_dict = lookup_dict['master']
    lookup_dict = lookup_dict['lookup']
    popular_course_count = 0
    variation_count = 0
    for popular_course in university.courses:
        if isCoursePopular(popular_course):
            popular_course_count += 1
            dept_long = popular_course.department_long
            dept_long_first_letter = dept_long[0].lower()
            popular_course_variations = popular_course.variations.split(', ')
            variations = [variation for variation in popular_course_variations if variation[0].lower() == dept_long_first_letter]
            for variation in variations:
                variation_dept_only = getNonNumericalPartOfCourse(variation.replace(' ', '').replace('  ', ''))
                if variation_dept_only and not variation_dept_only in lookup_dict:
                    lookup_dict[variation_dept_only] = dept_long
                    if not master_dict.get(dept_long):
                        master_dict[dept_long] = {'variations': [variation_dept_only]}
                    else:
                        if variation_dept_only not in master_dict[dept_long]['variations']:
                            master_dict[dept_long]['variations'].append(variation_dept_only)
                    print "%s added to %s in lookup dict" % (variation_dept_only, dept_long)
            # print "%s relevant variations found for department %s and letter %s w/ all variations %s" % (variations, dept_long, dept_long_first_letter, popular_course.variations)
            variation_count += len(variations)
    final_lookup_dict = {'lookup': lookup_dict, 'master':master_dict}
    saveDeptLookup(final_lookup_dict)
    print "%s valid courses found for %s" % (popular_course_count, university.name)
    print "%s variations saved to lookup_dict found for %s" % (len(lookup_dict.keys()), university.name)

def isCoursePopular(course):
    return course.department_long and course.department_short \
    and course.short_name and course.full_name and course.code \
    and course.variations

## After department is matched
def convertCourseToPopular(dept_long, dept_short, variations, code, course, full_name=None, short_name=None):
    course.department_short = dept_short
    course.department_long = dept_long
    if short_name:
        course.short_name = short_name
    if full_name:
        course.full_name = full_name
    course.variations = variations
    course.code = code
    course.course_string = code
    return course