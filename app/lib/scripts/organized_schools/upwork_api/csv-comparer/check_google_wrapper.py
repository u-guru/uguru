import logging
import httplib2
import os
from os import path
from apiclient.discovery import build
from apiclient.http import MediaFileUpload
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run
import io
import csv
CREDENTIAL = 'drive.credential'
CLIENT_SECRET_JSON = 'google_drive_installed.json'
SCOPE = 'https://www.googleapis.com/auth/drive'


#output_name = 'check_123.csv'
input_file_name = 'test1234.csv'



for i in range(10):
    output_name = 'upwork_employee_number_%d.csv'%(i,)
    print output_name


def clone_excel_sheets():

    
        with open(output_name, 'wb') as f_out:
            writer = csv.writer(f_out)
            with open(input_file_name, 'rb') as mycsv:
                reader = csv.reader(mycsv)
                for counter, row in enumerate(reader):
                    if counter<399: continue
                    if counter>499:break
                    writer.writerow(row)


def get_service():
    logging.getLogger().setLevel(getattr(logging, 'ERROR'))
    filename = output_name
    description = "this file is used to test Google Drive API"
    mime_type = "text/plain"
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

        media_body = MediaFileUpload(filename, mimetype=mime_type, resumable=True)
        body = {
            'title': os.path.basename(filename),
            'description': mime_type,
            'mimeType': description,
        }
        FOLDER_ID = '0B-FlHhAl0D7_fjcxUUk3bUEwSEc0OThzTG9OTW5GVzU4MVBuRG5hd0dHZGhtckVqejdCc2M'
        parent_id = '0B-FlHhAl0D7_fjcxUUk3bUEwSEc0OThzTG9OTW5GVzU4MVBuRG5hd0dHZGhtckVqejdCc2M'
        if parent_id:
            body['parents'] =[{'id':parent_id},]
        return service.files().insert(body=body, media_body=media_body).execute()
        f = get_service(service=service,
                filename=filename,
                description=description,
                mime_type=mime_type,
                parent_id=FOLDER_ID)
        print f['alternateLink']

        print file
    except Exception, e:
        print e.message

if __name__ == '__main__':
    get_service()
    clone_excel_sheets()