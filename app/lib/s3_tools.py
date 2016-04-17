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

def get_bugs_help():
    import json
    try:
        bugs = json.load(open('./app/lib/bugs.json'))
        if bugs.get('help'):
            print "######" * 10
            print ("######" * 2) + "      " * 6 + ("######" * 2)
            print ("######" * 3) + "      " * 4 + ("######" * 3)
            print ("######" * 3) + "####    Bugs Docs   ####" + "######" * 3
            print ("######" * 3) + "      " * 4 + ("######" * 3)
            print ("######" * 2) + "      " * 6 + ("######" * 2)
            print "######" * 10
            print "\n"
            index = 0
            for subject in bugs['help'].keys():
                print "#####" * 5
                print
                print "# Field: %s." % str((index + 1)) +  str(subject.title())
                print ("#####" * 5)
                print ">>>> " + str(bugs['help'].get(subject))
                print "#####" * 5
                print
                index += 1
    except:
        raise
        print "bugs.json does not exist"

def sync_bugs():
    pass

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

def getBugsFile(key_name="jason", bucket_name="uguru-admin", sorter="priority"):
    bucket = conn.get_bucket(bucket_name)
    all_keys = bucket.get_all_keys()
    for key in all_keys:
        if key_name in key.name and 'bugs.json' in key.name:
            import requests, json
            arr = json.loads(requests.get(url = "https://uguru-admin.s3.amazonaws.com/%s" % key.name).text)

            arr['bugs'] = sorted(arr['bugs'], key=lambda k:k[sorter], reverse=True)
            index = 1
            for item in arr['bugs']:
                print "#%s\n%s:%s\n%s\n\n" % (index, sorter, item[sorter], item['title'])
                index += 1


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

        if not result_dict.get(key_root_folder):
            result_dict[key_root_folder] = {'files':[key_dict]}
        else:
            result_dict[key_root_folder]['files'].append(key_dict)


    # for name_key in result_dict.keys():
    #     user_files = result_dict[name_key]['files']
    #     tree = {}
    #     all_folders = []
    #     for _file in user_files:
    #         if _file.get('type') == 'folder':
    #             all_folders.append(_file)
    #     for folder in all_folders:
    #         folder_name = folder.get('name').replace(name_key + '/', '')
    #         if folder_name:
    #             tree[folder_name] = []
    #     all_files = [_file for _file in user_files if _file.get('type') == "file"]
    #     for _file in all_files:
    #         tree_keys = tree.keys()
    #         print tree_keys, _file.get('name')

        # for item in user_files:



    return result_dict

def getTemplateFromPath(template_type, url):
    full_root_path = 'mobile-app/www/remote/templates/elements/' +  template_type + '/' + url
    try:
        _file = open(full_root_path)
        file_string = _file.read()
        return file_string
    except:
        return False

def getJsonBasedString(element_arr, url):
    for elem in element_arr:
        if elem['template_url'] == url:
            return elem
    return False

def syncMasterTemplatesWithAWS(username="master", file_type='application/json'):
    from mp_admin import getAllComponentsContainers, loadMostUpdatedElementsJson
    from pprint import pprint
    match_dict = getAllComponentsContainers()
    elements_dict = loadMostUpdatedElementsJson()
    for element_type in ["components", "containers", "layouts", "assets"]:
        for component in match_dict[element_type]:
            full_url = component['template_url']
            url = component['template_url'].replace('templates/', '')
            file_string = getTemplateFromPath(element_type, url)

            if not file_string:
                print "creating html/tpl/svg file: %s" % url
                response = create_static_file('uguru-admin', username, '%s/%s' % (element_type, url), file_string, file_type)
            else:
                print "skipping %s -- ALREADYEXISTS \n\n " % url

            json_url = component['template_url'].replace('templates/', '')
            json_url_split = json_url.split('/')
            json_url_path_only = "/".join(json_url_split[0: len(json_url_split) - 1])
            file_name = url.split("/")[-1].split('.')
            json_file_name = ".".join(file_name[0:len(file_name) - 1]) + '.json'
            json_full_url = json_url_path_only + '/' + json_file_name

            # json_file_string = getTemplateFromPath(element_type, json_full_url)
            # if not json_file_string:
            element_type_arr = elements_dict[element_type]
            json_type_string = getJsonBasedString(element_type_arr, full_url)
            import json
            json_type_string = json.dumps(json_type_string, indent=4)
            response = create_static_file('uguru-admin', username, '%s/%s' %(element_type, json_full_url), json_type_string, 'application/json')
                # print "creating json_file : %s" % json_full_url
                # response = create_static_file('uguru-admin', username, '%s/%s' % (element_type, json_full_url), json_file_string, 'application/json')
            # else:
            #     print "\n\nskipping %s JSON ALREADYE XISTS \n\n " % json_full_url



            # json_exists = getTemplateFromPath(element_type, json_file_name)
            # if not json_exists:
            #     print "creating json file: %s / %s \n\n\n " % (element_type, json_file_name)
            #     element_type_arr = elements_dict[element_type]
            #     json_type_string = getJsonBasedString(element_type_arr, full_url)
            #     response = create_static_file('uguru-admin', username, '%s/%s' %(element_type, json_file_name), json_type_string, 'application/json')
            # else:
            #     print "%s json already exists" % json_file_name


            # if response:
            #     print response.name, 'created'

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

print sys.argv
if '--bugs' in sys.argv:
    supported_commands= {
                            "cmd": "prints all the commands",
                            "sync [name|samir|jason]": "uploads your file to s3 cloud",
                            "verify [name|samir|jason]": "shows all bugs printed in order of priority & difficulty",
                            "pull [name|samir|jason]": "pulls most updated bugs for one person to your local repo",
                        }
    import json

    if len(sys.argv) == 2:
        get_bugs_help()

    if len(sys.argv) == 4 and 'verify' in sys.argv:

        bugs_file = getBugsFile()

    if len(sys.argv) == 4 and 'pull' in sys.argv:

        bugs_file = getBugsFile()

        # bugs = json.load(open('./app/lib/bugs.json'))
        # bugs = sorted()

    if len(sys.argv) == 3 and 'cmd' in sys.argv:
        print "#####" * 8
        print "#####" * 2 + " Supported Commands " + "#####" * 2
        print "#####" * 8
        print
        print
        index = 1
        for cmd in supported_commands.keys():
            print "\n\n"
            print "##" * 3
            print "# Command #%s: %s" % (str(index), cmd)
            print "##" * 3
            print "# " + supported_commands[cmd]
            print "#"
            print "# Example:\n"
            print "#\n>>> python ./s3_tools.py --bugs %s" % (cmd)
            index += 1

    if len(sys.argv) == 4 and 'sync' in sys.argv:
        user_name = sys.argv[-1].replace('-', '')
        bugs = json.load(open('./app/lib/bugs.json'))
        json_bugs_string = json.dumps(bugs, indent=4)
        print "uploading bugs to %s aws folder"
        response = create_static_file('uguru-admin', user_name, "bugs.json", json_bugs_string)
        print response
        print "upload successful"
        # username, '%s/%s' % (element_type, url), file_string, file_type



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
        result = getAllAdminFiles("uguru-admin")
        from pprint import pprint
        pprint(result)



    if len(sys.argv) == 4:
        name = sys.argv[-1]
        result = getAllAdminFiles("uguru-admin")
        user_files = result.get(name)
        if user_files:
            pprint(user_files)

    if len(sys.argv) == 5:
        bucket_name = sys.argv[-1]
        result = getAllAdminFiles(bucket_name)
        pprint(result)

if sys.argv and '-ua' in sys.argv and '--init' in sys.argv:
    if len(sys.argv) == 3:
        print "syncing all to master..."
        result = syncMasterTemplatesWithAWS()

    if len(sys.argv) == 4 and sys.argv[-1] in ['master', 'samir', 'gabrielle', 'jason', 'jeselle']:
        print "username"
        user_name = sys.argv[-1]
        print "syncing all to %s..." % user_name
        result = syncMasterTemplatesWithAWS(username=user_name, file_type='text/html')

    if len(sys.argv) == 4 and sys.argv[-1] == 'all':
        for user_name in ['master', 'samir', 'gabrielle', 'jason', 'jeselle']:
            result = syncMasterTemplatesWithAWS(username=user_name, file_type='text/html')


# if sys.argv and '-b' in sys.argv and '-k' in sys.argv:
#     bucket_name = sys.argv[-3]
#     key_name = sys.argv[-1]
#     print "printing keys with name %s in aws bucket named %s" % (key_name, bucket_name)
#     result = get_bucket_files(bucket_name, folder_name)
#     # pprint(result)
