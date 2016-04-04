from boto.s3.connection import S3Connection
access_key = 'AKIAJTXCMXK5FHZY6YQA'
secret_key = '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'
conn = S3Connection(access_key,secret_key)

def upload_file_to_amazon(filename, file_string, s3_key, s3_secret, s3_bucket):
    conn = boto.connect_s3(s3_key, s3_secret)
    b = conn.get_bucket(s3_bucket)
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_string(file_string)
    sml.set_metadata('Content-Type', 'image/jpeg')
    sml.set_acl('public-read')


def create_bucket(within_bucket=""):
    bucket = conn.create_bucket(within_bucket)
    return bucket

def list_bucket_details():
    list_buckets = conn.get_all_buckets()
    return list_buckets

def get_all_buckets():
    buckets = conn.get_all_buckets()
    for bucket in buckets:
        print bucket.name

def get_bucket(name):
    bucket = conn.get_bucket(name)
    return bucket

def get_bucket_files(bucket_name, nest_path=None):
    bucket = conn.get_bucket(bucket_name)
    for key in bucket.get_all_keys():
        print key.name

def create_folder(bucket_name, folder_name):
    bucket = conn.get_bucket(bucket_name)
    k = bucket.new_key('/' + folder_name + '/')
    k.set_contents_from_string('')
    # k.set_acl('public-read')
    return k

def create_static_file(bucket_name, path, file_name, file_contents="{}"):
    bucket = conn.get_bucket(bucket_name)
    key = bucket.new_key("/".join([path,file_name]))
    key.set_contents_from_string(file_contents)
    key.set_metadata('Content-Type', 'application/json')
    key.set_acl('public-read')
    return key

def get_folder_contents(bucket_name, folder_name):
    bucket = conn.get_bucket(bucket_name)
    # folder

def uploadFileToAmazon(conn, file_path):
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_string(file_string)
    sml.set_metadata('Content-Type', 'image/jpeg')

def getAllAdminFiles():
    bucket = conn.get_bucket('uguru-admin')
    result_dict = {}
    for key in bucket.get_all_keys():
        key_root_folder = key.name.split('/')[0]
        key_dict = {
            'name': key.name,
            'type': 'folder'
        }
        if ('json' in key.name):
            key_dict['type'] = 'file'
            key_dict['url'] = key.generate_url(10000)
            key.set_acl('public-read')
        if not result_dict.get(key_root_folder):
            result_dict[key_root_folder] = {'files':[key_dict]}
        else:
            result_dict[key_root_folder]['files'].append(key_dict)
    return result_dict


import sys
from pprint import pprint
if sys.argv and '-i' in sys.argv:
    get_all_buckets()

if sys.argv and '-b' in sys.argv and '-c' in sys.argv and len(sys.argv) == 5:
    bucket_name = sys.argv[-3]
    folder_name = sys.argv[-1]
    print "creating %s in aws bucket named %s" % (folder_name, bucket_name)
    result = create_folder(bucket_name, folder_name)
    pprint(result)

if sys.argv and '-b' in sys.argv and '-p' in sys.argv and len(sys.argv) == 7 and '-f' in sys.argv:
    bucket_name = sys.argv[-5]
    folder_name = sys.argv[-3]
    file_name = sys.argv[-1]
    print "creating file %s in folder %s within aws bucket named %s" % (file_name, folder_name, bucket_name)
    result = create_static_file(bucket_name, folder_name, file_name)
    pprint(result)

if sys.argv and 'uguru-admin' in sys.argv and 'get' in sys.argv:
    result = getAllAdminFiles()
    pprint(result)

# if sys.argv and '-b' in sys.argv and '-k' in sys.argv:
#     bucket_name = sys.argv[-3]
#     key_name = sys.argv[-1]
#     print "printing keys with name %s in aws bucket named %s" % (key_name, bucket_name)
#     result = get_bucket_files(bucket_name, folder_name)
#     # pprint(result)
