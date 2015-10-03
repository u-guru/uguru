import logging
import httplib2
import os
from apiclient import errors
from apiclient import http
from os import path
from apiclient.discovery import build
from apiclient.http import MediaFileUpload
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run
import io
import csv
import pprint
import json
import gspread
from oauth2client.client import SignedJwtAssertionCredentials
CREDENTIAL = 'drive.credential'
CLIENT_SECRET_JSON = 'google_drive_installed.json'
SCOPE = 'https://www.googleapis.com/auth/drive'
input_file_name = 'test1234.csv'

def get_service():

        filename = output_name
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
            parent_id = '0B-FlHhAl0D7_flpDNUh3MEJHLU11UUlJQzk2WG9qaEozWEpval9sWndSSVF5Z0FadVRzV1k'
            service = build('drive', 'v2', http=http) 
            media_body = MediaFileUpload(filename, mimetype='text/csv', resumable=True)
            body = {
                'mimeType' : 'text/csv',   
                'title': os.path.basename(filename),
                
            }
            if parent_id:
                body['parents'] =[{'id':parent_id},]
    
            req = service.files().insert(body=body, media_body=media_body)
            req.uri = req.uri + '&convert=true'
            resp = req.execute()
            assert resp['mimeType'] == u'application/vnd.google-apps.spreadsheet'
        except Exception, e:
            print e.message

def print_files_in_folder():
        logging.getLogger().setLevel(getattr(logging, 'ERROR'))   
        dictionary_for_file_id = {}
        array_append = []
        try:
            storage = Storage(CREDENTIAL)
            credentials = storage.get()

            if credentials is None or credentials.invalid:
                client_secret_json = path.join(
                    path.dirname(__file__), CLIENT_SECRET_JSON)
                flow = flow_from_clientsecrets(client_secret_json, scope=SCOPE)

                credentials = run(flow, storage)
            param = {}
            http = httplib2.Http()
            http = credentials.authorize(http)
            parent_id = '0B-FlHhAl0D7_flpDNUh3MEJHLU11UUlJQzk2WG9qaEozWEpval9sWndSSVF5Z0FadVRzV1k'
            service = build('drive', 'v2', http=http) 
            second_array = []
            with open('file_ids.json') as data_file:
                data_info = json.load(data_file)
                for info in data_info:
                    file_info = service.files().get(fileId=info).execute()
                    file_url = file_info['alternateLink']
                    second_array.append(file_url)
                    with open('google_sheets_url.json','w') as google_sheet_url:
                        json.dump(second_array,google_sheet_url,indent = 4)
            children = service.children() .list(folderId=parent_id, **param).execute()
            
            for child in children.get('items',[]):
                array_append.append(child['id'])
                with open('file_ids.json','w') as fp:
                    json.dump(array_append,fp,indent = 4)
        except Exception, e:
            print e.message


json_key = json.load(open('gdrive_client_id.json') )
scope = ['https://spreadsheets.google.com/feeds']
credentials = SignedJwtAssertionCredentials(json_key['client_email'], json_key['private_key'], scope)
gc = gspread.authorize(credentials)


for i in range(1):
    output_name = 'upwork_employee_number_%d.csv'%(i,)
    get_service()

    with open(output_name, 'wb') as f_out:
        writer = csv.writer(f_out)
        with open(input_file_name, 'rb') as mycsv:
            reader = csv.reader(mycsv)
            for counter, row in enumerate(reader):
                if counter<100: continue
                if counter>200:break
                with open('google_sheets_url.json') as google_sheet_data:
                        accurate_url = json.load(google_sheet_data)
                        for milestones_url in accurate_url:
                         
                            sht1 = gc.open('upwork_employee_number_1')
                            value = ['SAMPLE_UNIVERSITY','MONTH/DAY/YEAR']
                          #  worksheet = sht1.get_worksheet(0)
                            worksheet.append_row(value)
                            writer.writerow(row)


if __name__ == '__main__':
   get_service()

   print_files_in_folder()
  