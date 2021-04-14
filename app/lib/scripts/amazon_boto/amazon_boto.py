from boto.s3.connection import S3Connection
import boto
from boto.s3.key import Key
from filechunkio import FileChunkIO
import math, os
from boto.s3.cors import CORSConfiguration

#initalise a connection
S3_KEY="AKIAJTXCMXK5FHZY6YQA"           
S3_SECRET="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"
c = S3Connection(S3_KEY,S3_SECRET)
#bu = conn.create_bucket('test_bucket_1234')
source_path = 'screen1.png'



def upload_file_to_bucket():
	b = c.get_bucket('test_bucket_1234')

	# Get file info
	source_size = os.stat(source_path).st_size

	# Create a multipart upload request
	mp = b.initiate_multipart_upload(os.path.basename(source_path))

	# Use a chunk size of 50 MiB (feel free to change this)
	chunk_size = 52428800
	chunk_count = int(math.ceil(source_size / float(chunk_size)))

	# Send the file parts, using FileChunkIO to create a file-like object
	# that points to a certain byte range within the original file. We
	# set bytes to never exceed the original file size.
	for i in range(chunk_count):
	     offset = chunk_size * i
	     bytes = min(chunk_size, source_size - offset)
	     with FileChunkIO(source_path, 'r', offset=offset,
	                         bytes=bytes) as fp:
	         mp.upload_part_from_file(fp, part_num=i + 1)

	# Finish the upload
	mp.complete_upload()

