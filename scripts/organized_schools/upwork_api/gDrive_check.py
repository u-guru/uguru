import httplib2
import os

from apiclient import discovery
from apiclient import errors
import oauth2client
from oauth2client import client
from oauth2client import tools
from apiclient.http import BatchHttpRequest
try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

from pydrive.auth import GoogleAuth
import httplib2, requests, urlparse
from pydrive.drive import GoogleDrive









SCOPES = 'https://www.googleapis.com/auth/drive.file'
CLIENT_SECRET_FILE = 'client_scrents.json'
APPLICATION_NAME = 'Drive API Quickstart'
FILE_ID = '1C-GNBAcKHm7RYJG5K8qQAjtAAfiUiGQdy__4GNITOn4'
file_id = '1C-GNBAcKHm7RYJG5K8qQAjtAAfiUiGQdy__4GNITOn4'
def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'drive-quickstart.json')

    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatability with Python 2.6
            credentials = tools.run(flow, store)
        print 'Storing credentials to ' + credential_path
    return credentials



credentials = get_credentials()
http = credentials.authorize(httplib2.Http())
service = discovery.build('drive', 'v2', http=http)
results = service.files().list(maxResults=10).execute()



def share_with_anyone(service, file_id):
  """Shares the file with anyone with the link

  Args:
    service: Drive API service instance.
    file_id: ID of the file to insert permission for.

  Returns:
    The inserted permission if successful, None otherwise.
  """
  credentials = get_credentials()
  new_permission = {
      'type': "anyone",
      'role': "reader",
      'withLink': True
  }
  try:
    return service.permissions().insert(
        fileId=file_id, body=new_permission).execute()
  except errors.HttpError, error:
    print 'An error occurred: %s' % error
  return None

if __name__ == '__main__':
    get_credentials()
    share_with_anyone(service,file_id)

  