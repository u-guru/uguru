## Use pillow API to do the following
​from PIL import image
import requests
im = image.open('profile_pic.jpg')
## Feel free to add, modify, or remove arguments & functions. 
​
## Uses resize image
def resize_image(height, width, quality):
	image_resize =  image.resize(height,width, quality = 'PIL.Image.ANTALIAS')
	return image_resize
## Takes a url from lets say www.imgur.com/ && creates
## image object && returns
## Should be able to specify output format, like jpg, png,
## compressed
## 
def localImageCopyFromURL(url,file_name,file_type):
	image_file = open(file_name+file_type, 'wb')
	image_file.write(requests.urlopen(url).read())
	image_file.close
	return image_file
localImageCopyFromURL(url='https://static.xx.fbcdn.net/rsrc.php/v2/yx/r/pyNVUg5EM0j.png',file_name='facebook',file_name='jpg')
## Opens local file (like in this directory) && returns file object
## Does not need pillow 
def openLocalFile():
	pass
​
## Uses resize_image
def convertToLowQuality(image):
	pass