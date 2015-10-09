# use the aws library
## http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html

## 


## Pass in any arguments as necessary
## Creates a new bucket
## Bonus points for creating a bucket within a bucket
## (This is basically like a cloud terminal)
def create_bucket(within_bucket=""):
	pass

## Returns an array of all items in bucket
def list_bucket_details():
	pass

## Returns a bucket by its name
def move_file(bucket1, bucket2):
	pass

## Returns an object of type <bucket> 
## by finding it via its name which is type <string>
def get_bucket(name):
	pass

## Returns all file information available via cloudfront API
## --> Type (image)
## --> Time uploaded
## --> Time modified
## --> The bucket it's in
## --> Get anything useful from the API (if you're not sure just include it anyways)
def get_details_file():
	pass

## Takes a static URL && uploads it 
## Returns the url
## The URL MUST BE 
## ---> https://
## ---> public, so we can open it && it works on incognito chrome
def store_file_from_url(image_url, permissions):
	# Define the main part in pillow and return it here
	# from u_pillow import ... 
	pass

## Takes a local file URL && uploads it to amazon s3
def store_file(_file, bucket):
	## Use pillow library for this
	pass

