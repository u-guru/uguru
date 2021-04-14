import boto

S3_KEY='AKIAJTXCMXK5FHZY6YQA'
S3_SECRET='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'

def initAndReturnBotoConnection(s3_key=S3_KEY, s3_access=S3_SECRET):
    conn = boto.connect_s3(s3_key, s3_access)
    return conn

def upload_file_to_amazon(filename, file_string, s3_key, s3_secret, s3_bucket, content_type='application/json'):
    b = conn.get_bucket(s3_bucket)
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_string(file_string)
    sml.set_metadata('Content-Type', content_type)
    sml.set_acl('public-read')

def make_public(bucket, recursive=False):
    bucket.make_public(recursive)

def get_bucket_contents(bucket):
    return bucket.get_all_keys()

def get_bucket_urls(bucket):
    for item in get_bucket_contents(bucket)[0:1]:
        print item.generate_url(expires_in=0, query_auth=False)