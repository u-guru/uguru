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
    k.set_acl('public-read')
    return k

def delete_key(bucket_name, folder_name):
    bucket = conn.get_bucket(bucket_name)
    matching_keys = bucket.list(prefix=folder_name)
    for key in list(matching_keys):
        key.delete()
        print key



def create_static_file(bucket_name, path, file_name,
    file_contents="{}", file_metadata='application/json'):
    bucket = conn.get_bucket(bucket_name)
    key = bucket.new_key("/".join([path,file_name]))
    key.set_contents_from_string(file_contents)
    key.set_metadata('Content-Type', file_metadata)
    key.set_acl('public-read')
    return key

def get_folder_contents(bucket_name, folder_name):
    bucket = conn.get_bucket(bucket_name)
    # folder

def formatS3Time(s3_time):
    import time
    from time import mktime
    from datetime import datetime
    modified = time.strptime(s3_time[:19], "%Y-%m-%dT%H:%M:%S")
    return datetime.fromtimestamp(mktime(modified))

def uploadFileToAmazon(conn, file_path):
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_string(file_string)
    sml.set_metadata('Content-Type', 'image/jpeg')

def formatHourMinute(hour, minute):
    if len(str(minute)) == 1:
        minute = "0" + str(minute)
    result = str(hour) + ":" + str(minute)
    if (hour >= 12 or hour <= 23):
        return result + "pm"
    else:
        return result + "am"

def getAllAdminFiles(bucket_name="uguru-admin"):
    bucket = conn.get_bucket(bucket_name)
    result_dict = {}
    for key in bucket.get_all_keys():
        key_root_folder = key.name.split('/')[0]
        key_dict = {
            'name': key.name,
            'type': 'folder'
        }
        if ('json' in key.name or '.tpl' in key.name or '.html' in key.name):
            utc_time = formatS3Time(key.last_modified)
            key_dict['type'] = 'file'
            # key_dict['url'] = key.generate_url(10000)
            key_dict['url'] = "https://uguru-admin.s3.amazonaws.com/%s" % key.name
            key_dict['last_modified'] = str(utc_time)
            key_dict['last_modified_formatted'] = "%s/%s at %s" % (utc_time.month, utc_time.day, formatHourMinute(utc_time.hour, utc_time.minute))
            # key.set_acl('public-read')
        if not result_dict.get(key_root_folder):
            result_dict[key_root_folder] = {'files':[key_dict]}
        else:
            result_dict[key_root_folder]['files'].append(key_dict)
    return result_dict

def getTemplateFromPath(template_type, url):
    full_root_path = 'mobile-app/www/remote/templates/elements/' +  template_type + '/' + url
    _file = open(full_root_path)
    file_string = _file.read()
    return file_string


def syncMasterTemplatesWithAWS(username="master"):
    from mp_admin import getAllComponentsContainers
    from pprint import pprint
    match_dict = getAllComponentsContainers()
    for element_type in ["components", "containers", "layouts", "assets"]:
        for component in match_dict[element_type]:
            url = component['template_url'].replace('templates/', '')
            file_string = getTemplateFromPath(element_type, url)
            file_type = 'text/html'
            response = create_static_file('uguru-admin', username, '%s/%s' % (element_type, url), file_string, file_type)
            if response:
                print response.name, 'created'

    ## todo
    if match_dict.get('assets'):
        for layout in match_dict.get('assets'):
            pass

    ## todo
    if match_dict.get('layouts'):
        for layout in match_dict.get('layouts'):
            pass

import sys
from pprint import pprint
if sys.argv and '-i' in sys.argv:
    pprint(get_all_buckets())
    print "\n\n >>> commands \n\n"
    print "\n\n-- #1.  python -i --#|#| retrieves info for commands & all aws folders"
    print "\n\n-- #2.  python -b [bucket name] -c [create] --#|#| creates a bucket"
    print "\n\n-- #3.  python -f [folder name] -b [bucket name] -c [create] --#|#| creates a folder within a bucket"
    print "\n\n-- #4.  python -ua [uguru admin] get --#|#-- displays higher level directory details wihtin uguru-admin bucket"
    print "\n\n-- #5.  python -ua [uguru admin] sync -e --#|#-- syncs elements from component directory"

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
    result = create_static_file(bucket_name, folder_name, file_name, )
    pprint(result)

if sys.argv and '-b' in sys.argv and len(sys.argv) == 6 and '-d' in sys.argv and '-f' in sys.argv:
    bucket_name = sys.argv[2]
    file_name = sys.argv[4]
    print "deleting path %s within aws bucket named %s" % (file_name, bucket_name)
    result = delete_key(bucket_name, file_name)
    pprint(result)

if sys.argv and '-ua' in sys.argv and 'get' in sys.argv:

    if len(sys.argv) == 3:
        result = getAllAdminFiles()
    if len(sys.argv) == 4:
        name = sys.argv[-1]
        result = getAllAdminFiles(name)

        user_files = result.get(name)
        if user_files:
            pprint(user_files)

    if len(sys.argv) == 5:
        bucket_name = sys.argv[-1]
        result = getAllAdminFiles(bucket_name)
        pprint(result)

if sys.argv and '-ua' in sys.argv and 'sync' in sys.argv:
    if len(sys.argv) == 3:
        print "syncing all to master..."
        result = syncMasterTemplatesWithAWS()

    if len(sys.argv) == 4:
        print "username"
        user_name = sys.argv[-1]
        print "syncing all to %s..." % user_name
        result = syncMasterTemplatesWithAWS(user_name)


# if sys.argv and '-b' in sys.argv and '-k' in sys.argv:
#     bucket_name = sys.argv[-3]
#     key_name = sys.argv[-1]
#     print "printing keys with name %s in aws bucket named %s" % (key_name, bucket_name)
#     result = get_bucket_files(bucket_name, folder_name)
#     # pprint(result)
