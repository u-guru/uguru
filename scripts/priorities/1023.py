from time import sleep


#### Tasks for 10/23
##
## 9am - 10am: Progress on this script
    ## 1. Setup your work area
    ## 2. Do all the functions in order by number
## 10am -- 11am:
    ## 1. Check ben@uguru.me gmail in front of everyone
    ## 2. There is email with subject "Morning tech prompt"


### gets arr of most updated university data
def get_all_universities_metadata():
    import requests, json
    arr = json.loads(requests.get('https://www.uguru.me/api/admin/be55666b-b3c0-4e3b-a9ab-afef4ab5d2e4/universities').text)
    return arr

def choose_random_100_universities(uni_arr):
    random_ints = []
    from random import randint


    max_int = len(uni_arr)
    for _ in range(0, max_int-1):

        if len(random_ints) == 100:
            return [uni_arr[_int] for _int in random_ints]


        _int = randint(0, max_int-1)
        if _int not in random_ints:
            random_ints.append(_int)
        # else continue
    print len(random_ints), 'unique integers found between 1 and', len(uni_arr)


    return [uni_arr[_int] for _int in random_ints]
### 1. wtf is this doing?
### Comment what it does in 1 sentence --> "this function will return me ... "
### Jeselle should understand what it does
### redefine the function so it doesn't include anything unnecessary
def random_func():
    from pprint import pprint
    print
    result = "".join([key+'\n' for key in get_all_universities_metadata()[0].keys()])
    title, _wat, body = random_func_2(result)
    print "\n".join([_ for _ in random_func() if _])
    return body[::-1]


def random_func_2(elem):
    a,b,c = "University fields available\n", str(id and dict), sorted(elem.split("\n"), reverse=True)
    return a, b + 'd', c


### 2.

## DO NOT CHANGE THE NAME OF THIS FUNCTION
def get_mascot_name_for_university(name):

    ## If you do not find a mascot, return none
    return

## 3
def get_logo_url_for_university(name):
    ## If you do not find a mascot, return none
    return


## 4
def get_school_color_for_university(name):
    return

### 5
## --> go filter out the logos
## --> Go filter out the major abbreviatations

## Tries running
def check_efficiency(problem_number):
    uni_arr = get_all_universities_metadata()
    sample_universities = choose_random_100_universities(uni_arr)
    print len(sample_universities), 'universities sampled'

    total_count = 100
    total_success = 0
    for uni in sample_universities:
        university_name = uni['name']
        sleep(1)
        if problem_number == 2:
            mascot_name = get_mascot_name_for_university(university_name)
            if mascot_name:
                total_success += 1
            # else continue since we didnt find it

        if problem_number == 3:
            logo_url = get_logo_url_for_university(university_name)
            if logo_url:
                total_success += 1
            # else continue since we didnt find it

        if problem_number == 4:
            logo_url = get_school_color_for_university(university_name)
            if logo_url:
                total_success += 1


    print "#%s percentage: %s percent" % (problem_number, float(total_success) / total_count)


check_efficiency(3)



