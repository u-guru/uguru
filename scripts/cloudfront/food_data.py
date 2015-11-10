from aws import *
import boto

conn = initAndReturnBotoConnection()
all_buckets = conn.get_all_buckets()

bucket = conn.get_bucket('uguruprof')

for item in get_bucket_contents(bucket)[0:1]:
    print item.generate_url(expires_in=0, query_auth=False)