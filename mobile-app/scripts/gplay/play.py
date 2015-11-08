##

from apiclient.discovery import build
import httplib2, argparse
from oauth2client import client


SERVICE_ACCOUNT_EMAIL = ('413826461390-01a492pa907tscihbo8mndg7mn4mk02p@developer.gserviceaccount.com')
SUBMISSION_TYPES = ['alpha', 'beta', 'production', 'rollout']

## Defaults
DEFAULT_PACKAGE_NAME = 'com.beta.college.Uguru'
DEFAULT_TRACK = SUBMISSION_TYPES[0]
DEFAULT_DESCRIPTION = {'fullDescription': 'Uguru empowers college students to have access to on-demand academic support from their own peers. In this version, students can request for popular courses and ultimately meet with a guru who has aced the same EXACT course within minutes and only 1-2 blocks away. We are also testing the market for other services college students have found exciting, which include household chores, skilled specialties (baking, photography), and much, much more.', 'shortDescription': 'An affordable marketplace for college students to make side cash teaching peers.','title': 'Uguru - College Marketplace'}
DEFAULT_FILE_PATH = '../../platforms/android/build/outputs/apk'

def init_args_flags():
  argparser = argparse.ArgumentParser(add_help=False)
  argparser.add_argument('package_name',
                       help='The package name. Example: com.android.sample')
  return argparser

def get_current_description():
  print 'Coming Soon!'
  pass

def list_apks(service, package_name):
  edit_request = service.edits().insert(body={}, packageName=package_name)
  result = edit_request.execute()
  edit_id = result['id']

  apks_result = service.edits().apks().list(
      editId=edit_id, packageName=package_name).execute()

  index = 1
  for apk in apks_result['apks']:
    print '#%i. versionCode: %s, binary.sha1: %s' % (index,
        apk['versionCode'], apk['binary']['sha1'])
    index += 1

def upload_apk(service, package_name=DEFAULT_PACKAGE_NAME,
  apk_file_path=DEFAULT_FILE_PATH, track=DEFAULT_TRACK, filename='uguru-x86-signed.apk'):

  apk_file = apk_file_path + '/' + filename

  upload_request = service.edits().insert(body={}, packageName=package_name)
  result = upload_request.execute()
  edit_id = result['id']

  apk_response = service.edits().apks().upload(
    editId = edit_id,
    packageName=package_name,
    media_body=apk_file
    ).execute()

  print ('Uploaded .. here are the details\n')
  print ("All fields", apk_response['binary'].keys())
  # print ("size:", apk_response['binary']['body_size'])
  # print ("public_url:", apk_response['binary']['uri'])


  track_response = service.edits().tracks().update(
    editId=edit_id,
    track=track,
    packageName=package_name,
    body={u'versionCodes': [apk_response['versionCode']]}).execute()


  print 'Response received .. here are the details\n'
  print "other fields", apk_response['binary'].keys()
  # print "size:", apk_response['binary']['body_size']
  # print "public_url:", apk_response['binary']['uri']


  commit_request = service.edits().commit(
        editId=edit_id, packageName=package_name).execute()

  print 'Commit request\n'
  print "All fields", apk_response['binary'].keys()
  # print 'Edit "%s" has been committed' % (commit_request['id'])


def update_description(service):
  edit_request = service.edits().insert(body=DEFAULT_PACKAGE, packageName=DEFAULT_PACKAGE_NAME)
  result = edit_request.execute()
  edit_id = result['id']

  apks_result = service.edits().apks().list(
      editId=edit_id, packageName=package_name).execute()

  for apk in apks_result['apks']:
    print apk
    print 'versionCode: %s, binary.sha1: %s' % (
        apk['versionCode'], apk['binary']['sha1'])

def init_android_api_connection():
  f = file('key.p12', 'rb')
  key = f.read()
  f.close()

  credentials = client.SignedJwtAssertionCredentials(
      SERVICE_ACCOUNT_EMAIL,
      key,
      scope='https://www.googleapis.com/auth/androidpublisher')
  http = httplib2.Http(ca_certs='/usr/local/lib/python2.7/site-packages/httplib2/cacerts.txt')

  http = credentials.authorize(http)

  service = build('androidpublisher', 'v2', http=http)
  return service

def main():

  import sys

  service = init_android_api_connection()

  args = sys.argv

  try:

    if 'help' in args[1:]:
      print "\nHere are are all available commands\n\n"
      print "-u, upload -b[beta] -a[alpha] -p[production]  --- [apk file name] ## Assumes it's located in path:\n%s" % DEFAULT_FILE_PATH
    if '-u' in args[1:]:
      print "Uploading x87 device version... Make take a while"
      upload_apk(service, DEFAULT_PACKAGE_NAME, DEFAULT_FILE_PATH, DEFAULT_TRACK, 'uguru-x86-signed.apk')
      print "Uploading armv7 device version... Make take a while"
      upload_apk(service, DEFAULT_PACKAGE_NAME, DEFAULT_FILE_PATH, DEFAULT_TRACK, 'uguru-armv7-signed.apk')
    if '-l' in args[1:]:
      list_apks(service, DEFAULT_PACKAGE_NAME)



  except client.AccessTokenRefreshError:
    print ('The credentials have been revoked or expired, please re-run the '
           'application to re-authorize')
  except client.AccessTokenRefreshError:
    print ('Some shit went wrong, tell Samir')

if __name__ == '__main__':
  main()
