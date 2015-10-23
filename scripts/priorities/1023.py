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

### 1. wtf is this doing?
### Comment what it does in 1 sentence --> "this function will return me ... "
### Jeselle should understand what it does
### redefine the function so it doesn't include anything unnecessary
def random_func():
    from pprint import pprint
    print
    result = "".join([key+'\n' for key in get_all_universities_metadata()[0].keys()])
    title, _wat, body = random_func_2(result)
    print title
    return body[::-1]


def random_func_2(elem):
    a,b,c = "University fields available\n", str(id and dict), sorted(elem.split("\n"), reverse=True)
    return a, b + 'd', c


print "\n".join([_ for _ in random_func() if _])

