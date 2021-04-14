import urllib
import ImageFile
import Image



def get_image_info(uri):
	dictionary = {}
	file = urllib.urlopen(uri)
	type_info = file.headers.get("content-type")
	print type_info
	size = file.headers.get("content-length")
	if size:
		size = int(size)
	p = ImageFile.Parser()
	while 1:
		data = file.read(1024)
		if not data:
			break
		p.feed(data)
		if p.image:
			mb = float(size/1024)
			dictionary['megabytes'] = mb
			dictionary['bytes'] = size
			dictionary['width'] = p.image.size[0]
			dictionary['height'] = p.image.size[-1]
			dictionary['image_type'] = type_info
			return dictionary
			break
	file.close()
	return size, None

def store_to_amazon(uri):
	img_scraper = {}
	img_scrapter['name'] = width
	img_scraper['img_height'] = height
	img_scraper['type'] = file.headers.get("cotent-type")
	print img_scraper

def call_img_function(uri):
	dictionary.get('content-headers')
	params = {}
	huge_arr = []
	if (os.file.exists == output):
		huge_arr.append(params)
	else:
		pass



def resize_image(get_image_info):
	width = ""
	height = ""
	url_retrive = urllib.urlretrieve(uri)
	im1 = Image.open(uri)
	im_small = im1.resize((width,height), Image.ANTIALIAS)
	im_small.save(uri)
	return im_small
resize_image(get_image_info)

def store_to_amazon():
	save_image()
def filter_the_image():
	add_to_professional()



