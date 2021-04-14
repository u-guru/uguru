from PIL import Image
import requests
import PIL
import os



def resize_image(file_name,height,width):
	im = Image.open(file_name)
	im.thumbnail((height,width), Image.ANTIALIAS)
	im.save(file_name,quality=0)
	return im


def localImageCopyFromURL(url,file_name,file_type):
	image_file = open(file_name+'.' + file_type,'wb')
	image_file.write(requests.get(url).content)
	image_file.close
	return image_file


def openLocalFile(file_name):
	file_info = os.stat(file_name).st_size
	return file_info


def convertToLowQuality(file_name,height,width):
	image = image.open(file_name)
	image = image.resize((height,width), Image.ANTIALIAS)
	quality_val = 20
	image.save(file_name,'JPEG',quality=quality_val)
	return image
