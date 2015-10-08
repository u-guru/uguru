import flickr_api
import json, re
FLICKR_API_SECRET = '04496362f492984a'
FLICKR_API_KEY = '4ff14db4ee92b73b552d46bb559e6834'
flickr_api.set_keys(api_key = FLICKR_API_KEY, api_secret = FLICKR_API_SECRET)


from flickr_api.api import flickr
array = []

def generate_flickr_url(farm_id, server_id, photo_id, secret):
    return "https://farm%s.staticflickr.com/%s/%s_%s_z.jpg" %(farm_id, server_id, photo_id, secret)


def search_university_response_api(text):
    response = flickr.photos.search(
        api_key=FLICKR_API_KEY,
        # geo_context=2,
        tags='panorama',
        safe_search=1,
        tag_mode='all',
        content_type=1,
        text=text,
        # lat=university.latitude,You as
        # lon=university.longitude,
        # radius=20,
        sort='relevance',
        extras='description, tags, views',
        format='json')
    with open('flickr_response.json','wb') as outfile:
        json.dump(response,outfile,indent=4)
    return response
    

def parse_flickr_response(flickr_response):
    parsed_flickr_response = flickr_response.split('jsonFlickrApi(')[1].split('"})')[0] + '"}'
    photos_arr = json.loads(parsed_flickr_response)
    with open('parsed_flickr_response.json','wb') as outfile:
        json.dump(photos_arr['photos']['photo'],outfile,indent=4)
    print photos_arr['photos']['photo']
    return photos_arr['photos']['photo']
    
def process_returned_photos(photos_arr):
    result_photos = []
    for photo_obj in photos_arr:
        if photo_obj['ispublic']:
            result_photos.append({
                'title':photo_obj['title'],
                'url': generate_flickr_url(photo_obj['farm'], photo_obj['server'], photo_obj['id'], photo_obj['secret']),
                'views': int(photo_obj['views']),
                'description': photo_obj['description']
                })



    array.append(result_photos)
    print result_photos
    return result_photos

empty_array_dict = {}
  
if __name__ == "__main__":
    name = json.load(open('school_without_banner.json'))
    for items in name:
        name =  items['name']
        search_university_response_api(text=name)
        parse_flickr_response(flickr_response=json.load(open('flickr_response.json')))
        process_returned_photos(photos_arr=json.load(open('parsed_flickr_response.json')))
   

        empty_array_dict[name] = array
        array = []
        with open('school_flickr_url.json','wb') as outfile:
            json.dump(empty_array_dict,outfile,indent=4)
 

# print len(processed_arr)

# photo_urls = generate_flickr_url()
# print photos

# response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
# parsed_photos = response_parser.findall(flickr_response)
# print json.loads(str(parsed_photos))
# print photos