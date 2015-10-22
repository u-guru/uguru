#! /usr/bin/env python
# -*- coding: utf-8 -*-

​from boto.s3.connection import S3Connection
from boto.s3.key import Key

​
​
## Pass in any arguments as necessary
## Creates a new bucket
## Bonus points for creating a bucket within a bucket
## (This is basically like a cloud terminal)
access_key = 'AKIAJTXCMXK5FHZY6YQA'
secret_key = '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'
conn = S3Connection(access_key,secret_key)


def create_bucket(within_bucket=""):
	bucket = conn.create_bucket(within_bucket)
	return bucket
​
## Returns an array of all items in bucket
def list_bucket_details():
	list_buckets = conn.get_all_buckets()
	return list_buckets
​
## Returns a bucket by its name
def move_file(bucket1, bucket2):
	bucket_one = conn.get_bucket(bucket1)
	bucket_two = conn.get_bucket(bucket2)
	return bucket_one,bucket_two
​
## Returns an object of type <bucket> 
## by finding it via its name which is type <string>
def get_bucket(name):
	get_bucket = conn.get_bucket(name)

	return get_bucket
​
## Returns all file information available via cloudfront API
## --> Type (image)
## --> Time uploaded
## --> Time modified
## --> The bucket it's in
## --> Get anything useful from the API (if you're not sure just include it anyways)
def get_details_file():
	buckets = conn.get_all_buckets()
	for items in bucket:
		item_name = items.name
		##NOT FINISHED
	## Takes a static URL && uploads it 
## Returns the urlw
## The URL MUST BE 
## ---> https://
## ---> public, so we can open it && it works on incognito chrome
def store_file_from_url(image_url):
	file_info  = Key(bucket)
	file_info.key = 'has_metadata'
	file_info.set_contents_from_string(image_url)
## Takes a local file URL && uploads it to amazon s3
def store_file(_file, bucket):
	
	## Use pillow library for this
	pass