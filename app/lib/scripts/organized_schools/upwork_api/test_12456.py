import logging
import httplib2

from os import path
from apiclient.discovery import build
from apiclient.http import MediaFileUpload
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run

CREDENTIAL = 'drive.credential'
CLIENT_SECRET_JSON = 'test12345.json'
SCOPE = 'https://www.googleapis.com/auth/drive'

FILE_NAME = 'sample.txt'

def main():
    logging.getLogger().setLevel(getattr(logging, 'ERROR'))

    try:
        storage = Storage(CREDENTIAL)
        credentials = storage.get()

        if credentials is None or credentials.invalid:
            client_secret_json = path.join(
                path.dirname(__file__), CLIENT_SECRET_JSON)
            flow = flow_from_clientsecrets(client_secret_json, scope=SCOPE)

            credentials = run(flow, storage)

        http = httplib2.Http()
        http = credentials.authorize(http)

        service = build('drive', 'v2', http=http)

        media_body = MediaFileUpload(
            FILE_NAME, mimetype='text/plain', resumable=True)
        body = {
            'title': 'My Document',
            'description': 'Test Document',
            'mimeType': 'text/plain',
        }

        file = service.files().insert(
            body=body, media_body=media_body).execute()
        print file
    except Exception, e:
        print e.message

if __name__ == '__main__':
    main()