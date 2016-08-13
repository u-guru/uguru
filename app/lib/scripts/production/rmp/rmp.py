import requests, json
from time import sleep

prioritized_ids = [1365,1427,1508,1718,1720,511,576,718,1661,2215,2739,945,9,20,1484,1866,2188,2300,1492,43,1228,1443,947,112,1025,84,167,102,821,149,1256,63,94,1288,1426,1623,1803,1875,56,53,2164,2361,327,2434,364,2469,106,2657,240,1493,1839,397,1859,2554,403,2635,2686,414,432,455,4,69,261,710,424,501,508,513,529,543,560,565,566,579,607,616,627,629,640,641,676,682,723,731,786,783,782,856,973,982,989,1038,1058,1154,1158,1181,1222,1267,1268,1270,1299,1313,1318,1345,1424,1425,1449,1460,1496,1499,1524,1532,1548,1562,1591,1629,1635,1684,1728,1746,1798,1860,1870,1883,1897,1908,1943,1980,1984,2006,2032,2045,2072,2081,2159,2236,2271,2278,2321,2332,2335,2365,2391,2394,2399,2414,2447,2464,2503,2530,2546,2600,2622,2641,2694,2704,2706,2749,7,1334,28,35,2116,133,200,208,58,159,898,924,1034,37,1127,1141,177,1342,1474,1583,246,1615,1789,1791,1817,1843,250,2033,252,264,2140,2142,263,2154,2155,2242,25,299,2409,165,2436,344,359,369,2587,91,95,294,398,404,405,411,416,427,452,462,233,374,738,496,524,532,537,614,645,674,683,712,728,752,767,772,826,827,834,854,872,915,916,927,936,960,975,1017,1041,1057,1059,1074,1098,1104,1164,1171,1209,1175,1217,1212,1350,1356,1401,1466,1468,1569,1595,1652,1668,1680,1698,1708,1712,1753,1765,1809,1811,1829,1844,1881,1887,1899,1955,1981,2000,2002,2005,2007,2035,2046,2052,2059,2078,2104,2150,2158,2163,2153,2196,2201,2202,2230,2238,2244,2250,2312,2324,2343,2360,2392,2425,2501,2606,2643,2682,2702,2715,2718,2733,2741,12,41,73,1645,209,111,57,824,863,895,903,920,961,968,1095,157,1213,1246,1253,1266,1273,1304,1305,1373,1464,1479,1481,1582,1602,1696,1730,1835,79,1951,1953,1970,1990,1993,2001,2026,2133,176,2134,2157,273,278,2285,2287,2347,2370,300,318,2376,324,333,331,2413,336,437,348,2463,2465,367,378,2515,371,380,2584,2604,2624,2650,2653,2697,313,2726,2745,308,410,409,412,418,423,440,448,467,110,471,470,482,489,500,502,515,521,523,547,549,554,555,563,1039,569,577,580,583,596,599,603,617,615,626,631,792,636,660,684,694,699,1040,707,705,709,725,720,741,743,747,749,751,750,757,758,774,800,814,830,847,861,862,884,902,907,909,944,952,958,971,980,986,997,984,992,1033,1035,1061,1140,1080,1086,1097,1101,1117,1123,1125,1134,1143,1157,1195,1200,1177,1230,1231,1258,1271,1272,1290,1306,1308,1326,1319,1346,1363,1379,1381,1402,1411,1386,1422,1435,1436,1440,1448,1454,1473,1490,1500,1514,1518,1531,1555,1588,1603,1608,1613,1633,1659,1670,1683,1693,1699,1703,1709,1758,1767,1768,1769,1771,1743,1763,1782,1795,1815,1823,1825,1841,1861,1865,1845,1882,1885,1894,1900,1909,1913,1921,1925,1926,1931,1945,2003,1975,2013,2024,2031,2053,2093,2103,2117,2122,2204,2222,2225,2253,2257,2259,2267,2272,2277,2298,2337,2341,2352,2386,2400,2423,2462,2466,2480,2471,2516,2525,2556,2562,2571,2573,2591,2593,2595,2597,2567,2663,2681,2683,2692,2689,2707,2714,2721,2746,2747,2755]

def saveUniversitiesToJson():
    universities = get_all_universities_metadata()
    saveObjToJson(universities, 'uni.json')
    print 'File saved'



####
#### Samir's util library
####

def uguruAPI(arg='', _json=None, _type='get'):
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

    if arg: arg = '/' + arg

    BASE_URL = 'http://localhost:5000/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities%s' % arg

    if _type == 'get':
        return json.loads(requests.get(BASE_URL).text)

    if _type =='put':
        return requests.put(url=BASE_URL, data=json.dumps(_json), headers=headers).text

    if _type =='post':
        return requests.post(url=BASE_URL, data=json.dumps(_json), headers=headers).text

def get_all_universities_metadata():
    import requests, json
    arr = json.loads(requests.get('https://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities').text)
    return arr

def getUniversity(uni_id):
    university = uguruAPI(str(uni_id))
    print university
    return university

def loadJsonArrayFromFile(filename):
    arr = json.load(open(filename))
    return arr

def loadJsonDictFromFile(filename):
    _dict = json.loads(open(filename))
    return _dict

def saveObjToJson(obj, filename):
    with open(filename + '.json', 'wb') as fp:
        json.dump(obj, fp, indent = 4)

def updateUniversity(uni_dict):
    university = uguruAPI(str(uni_dict['id']), uni_dict, 'put')

    return university

def postDepartments(uni_dict):
    response = uguruAPI(str(uni_dict['id']) + '/depts', uni_dict, 'post')
    print response
    return response

def formatNameForRMP(name):
    return name


def getRmpUniversityId(name, print_url=False):
    url ='http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=1&q=' + name + '&siteName=rmp&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL'
    if print_url:
        print url
    response = requests.get(url).text

    try:
        response_json = json.loads(response)['response']['docs'][0]
    except (IndexError, ValueError):
        return 0

    return response_json



## 1. Just try it
#### - Track, count, and save all misses
###2. Validate the hits are correct
###3. Print out the misses and look for correlations
#####- Take note of all the patterns


def filterWorkingRMPUnis(arr):
    from time import sleep
    count_error = 0
    for uni in arr:
        name = uni['name']
        print "Searching RMP for %s" % name
        result = getRmpUniversityId(name)
        sleep(0.25)
        if result:
            uni['rmp_name'] = result['schoolname_s']
            uni['rmp_school_id'] = result['pk_id']
            # print 'Found "%s" with query "%s"\n' % (uni['rmp_name'], name)
        else:
            count_error += 1
            uni['rmp_name'] = None
            uni['rmp_school_id'] = None
            print 'ERROR #%i: -----> %s \n' % (count_error, name)
    saveObjToJson(arr, 'uni')



# arr = loadJsonArrayFromFile('uni.json')
# filterWorkingRMPUnis(arr)


def getRmpUniversityProfessorIds(rmp_university_id):
    url = 'http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=2000&q=*%3A*+AND+schoolid_s%3A' + str(rmp_university_id) + '&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=10000&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s+department_s'
    details = requests.get(url).text
    response_arr = json.loads(details)['response']['docs']
    professor_ids = [response['pk_id'] for response in response_arr if response['total_number_of_ratings_i']]
    return professor_ids

def getProfessorCoursesCollection(rmp_professor_id):
    page_num = 0
    url = "http://www.ratemyprofessors.com/paginate/professors/ratings?tid=" + str(rmp_professor_id) + "&page=%s" % page_num
    response = json.loads(requests.get(url).text)
    ratings = response['ratings']
    remaining = response['remaining']
    total_ratings = 20 + remaining

    num_pages = int(total_ratings / 20) + 1
    all_ratings = []
    from time import sleep
    for page_num in range(1, num_pages + 1):
        url = "http://www.ratemyprofessors.com/paginate/professors/ratings?tid=" + str(rmp_professor_id) + "&page=%s" % page_num
        response = json.loads(requests.get(url).text)
        all_ratings += response['ratings']
        remaining = response['remaining']
        sleep(0.1)
    all_courses = [rating['rClass'] for rating in all_ratings]
    return all_courses

def processCourses(courses):
    def parseCourse(course):
        course = course.upper().replace("  ", " ").replace("  ", " ")
        return course

    from collections import Counter

    for course in courses:
        course = parseCourse(course)

    counter = Counter(courses)
    counter_items = counter.items()
    sorted_courses = sorted(counter_items, key=lambda k:k[1], reverse=True)
    eliminate_ones = [c for c in sorted_courses if c[1] > 1]
    return eliminate_ones

    # return courses


def get_null_rmp(uni_name='uni.json', _print=True):
    from pprint import pprint
    arr = loadJsonArrayFromFile(uni_name)
    arr = [_ for _ in arr if not _['rmp_school_id']]
    if _print:
        pprint([uni['name']for uni  in arr])
    return arr

def secondAttemptGetRmpUniversityId(uni_obj):
    ## last args -- enhancement #1
    filter_words = ['of', 'the', 'at', ':', '', 'college', 'and']

    name_arr = uni_obj['name'].replace(': ', ' ').replace('Saint', 'St.').replace(':', ' ').replace(',','').replace(' - ', '-').replace('- ', ' ').replace('-', ' ').replace('  ', ' ').split(' ')

    name_arr = [word for word in name_arr if word.lower() not in filter_words]
    print name_arr


    for word in name_arr:

        ## enhancement #2
        if name_arr.index(word) == 0:
            firstArg = word
        else:
            firstArg += ' ' + word

        print '============\nAttempting\n\nQuery -->', firstArg, '\nORIGINAL -->', uni_obj['name'], '\n', 'ORIGINAL CITY', uni_obj['city'],'\nORIGINAL STATE', uni_obj['state'], '\n\n'
        url = "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=10&q=" + firstArg+ "&defType=edismax&bq=schoolname_sort_s%3A%22" + firstArg + "%22%5E1000&qf=schoolname_autosuggest&bf=pow(total_number_of_ratings_i%2C1.9)&sort=score+desc&siteName=rmp&rows=20&group=off&group.field=content_type_s&group.limit=20&fq=content_type_s%3ASCHOOL"

        response = json.loads(requests.get(url).text)

        response_arr = response['response']['docs']

        if response_arr and len(response_arr) > 4:
            print "%s RESULTS FOUND ... SKIPPING (TOO MANY) \n============\n\n" % len(response_arr)
        elif response_arr and len(response_arr) <= 4 and len(response_arr) > 0:
            print "%s RESULTS FOUND --- time to investiage \n============\n\n" % len(response_arr)
        else:
            print "NO RESULTS FOUND...\n==========\n\n"
        if len(response_arr) < 10:

            ## enhancement #6
            if len(response_arr) == 1:
                city = response_arr[0]['schoolcity_s'].lower()
                state = response_arr[0]['schoolstate_s'].lower()
                school_name = response_arr[0]['schoolname_s'].lower()
                print 'FOUND w/ CITY. We matched <%s>, in %s, %s\n\n\n' % (school_name, city, state)
                uni_obj['rmp_name'] = response_arr[0]['schoolname_s']
                uni_obj['rmp_school_id'] = response_arr[0]['pk_id']
                return True, uni_obj

            else:
                index = 1
                for response in response_arr:
                    city = response['schoolcity_s'].lower()
                    state = response['schoolstate_s'].lower()
                    school_name = response['schoolname_s'].lower()
                    print 'Result #%s --> %s \nMatch --> %s \nMatch Location--> %s, %s\n' % (str(index), firstArg, school_name, city, state)

                    if uni_obj['city'].lower() == city and uni_obj['state'].lower() == state:

                        print 'FOUND w/ CITY. We matched <%s>, in %s, %s\n\n\n' % (school_name, city, state)

                        uni_obj['rmp_name'] = response['schoolname_s']
                        uni_obj['rmp_school_id'] = response['pk_id']
                        return True, uni_obj

                    index += 1

                ## enhancement # 7
                for response in response_arr:
                    if uni_obj['city'].lower() == city or uni_obj['state'].lower() == state:
                        uni_obj['rmp_school_id'] = True
                        uni_obj['rmp_name']
                        print 'FOUND w/ CITY. We matched <%s>, in %s, %s\n\n\n' % (school_name, city, state)

                        uni_obj['rmp_name'] = response['schoolname_s']
                        uni_obj['rmp_school_id'] = response['pk_id']
                        return True, uni_obj


                # ### enhancement # 8
                # if len(response_arr):
                #     response = response_arr[0]
                #     city = response['schoolcity_s'].lower()
                #     state = response['schoolstate_s'].lower()
                #     school_name = response['schoolname_s'].lower()
                #     print 'MAYBE FOUND w/ CITY. We matched <%s>, in %s, %s\n\n\n' % (school_name, city, state)
                #     uni_obj['rmp_name'] = response['schoolname_s']
                #     uni_obj['rmp_school_id'] = response['pk_id']
                #     return 1, uni_obj


    return False, uni_obj


def secondAttemptGetRmpUniversities(arr):
    success = 0
    index = 0
    error_unis = []
    error_count = 0
    for uni in arr[0:10]:
        # if uni.get('rmp_uni_id'):
        #     continue
        error_uni = []
        name = error_uni['name']
        error_count = 0
        result = getRmpUniversityId(error_uni['name'])
        print result
        if result:
            success += 1
            print result
        else:
            continue
            # print "trying a simpler query...\n\n"
            # enhancement #5 --> what if i want to store the results?
            results_exist, results = secondAttemptGetRmpUniversityId(error_uni)
            uni = results
            if results_exist:
                success += 1
            else:
                error_unis.append(results)

                ### Enhnacements #3
                ### Enhancements #4 -- do it at the end
                # print "found %s results!" % len(results)
                # str_raw_input = "%s === %s?\n\n" % (name, results['name'])
                # admin_response = raw_input(str_raw_input)
                # if admin_response.lower() == 'y':
                #     success += 1
                #     print "Success", "found a matching algorithm"
        index += 1
        print success, index
    print error_count, 'errors'
    saveObjToJson(arr, 'uni-2.json')
    saveObjToJson(error_unis, 'uni-2-errors.json')
arr = get_all_universities_metadata()
# arr = loadJsonArrayFromFile('uni.json')
secondAttemptGetRmpUniversities(arr)

#     print result

# arr = loadJsonArrayFromFile('uni.json')
# for uni in arr:
#     if uni.get('rmp_school_id'):
#         rmp_uni_id = uni.get('rmp_school_id')
#         professor_ids = getRmpUniversityProfessorIds(rmp_uni_id)
#         print "Sorting out", uni['name'], 'with', len(professor_ids), 'professors'
#         finalCourses = []
#         for p_id in professor_ids:
#             courses = getProfessorCoursesCollection(p_id)
#             finalCourses += processCourses(courses)

#         print '%s professors with %s courses' % (len(professor_ids), len(finalCourses))
#         filename = str(uni['id']) + '-' + uni['name'].replace(' ', '_')
#         payload = {
#             'id': uni['id'],
#             'name': uni['name'],
#             'popular_courses': finalCourses,
#             'num_popular_courses': len(finalCourses),
#         }
#         saveObjToJson(payload, filename)




#         print professor_ids.keys()
#         uni['professor_ids']


# arr = [_ for _ in arr if not _['rmp_name']]






