from pydrive.auth import GoogleAuth
import httplib2, requests, urlparse
from pydrive.drive import GoogleDrive
import gspread, itertools
import csv
from apiclient import errors

output_name = 'check_123.csv'
httplib2.Http(disable_ssl_certificate_validation=True)
gauth = GoogleAuth()
gauth.LocalWebserverAuth()




drive = GoogleDrive(gauth) # Create GoogleDrive instance with authenticated GoogleAuth instance

file1 = drive.CreateFile({'title': 'Hello.txt'}) # Create GoogleDriveFile instance with title 'Hello.txt'
file1.Upload()
file_id = file1['id'] # Upload it
print 'title: %s, id: %s' % (file1['title'], file1['id']) # title: Hello.txt, id: {{FILE_ID}}



# def share_with_anyone(gauth, file_id):
#   """Shares the file with anyone with the link

#   Args:
#     service: Drive API service instance.
#     file_id: ID of the file to insert permission for.

#   Returns:
#     The inserted permission if successful, None otherwise.
#   """
 
#   new_permission = {
#       'type': "anyone",
#       'role': "writer",
#       'withLink': True
#   }
#   try:
#     return gauth.permissions().insert(
#         fileId=file_id, body=new_permission).execute()
#   except errors.HttpError, error:
#     print 'An error occurred: %s' % error
#   return None
# share_with_anyone(gauth, file_id)



def clone_excel_sheets():


	with open(output_name, 'wb') as f_out:
		writer = csv.writer(f_out)
		with open('test1234.csv', 'rb') as mycsv:
			reader = csv.reader(mycsv)
			for counter, row in enumerate(reader):
				if counter<499: continue
				if counter>599:break
				writer.writerow(row)


def create_excel_sheets_in_google_drive():

	drive = GoogleDrive(gauth)
	file1 = drive.CreateFile({'title': 'reverify_1'})
	file1.SetContentFile('check_123.csv')
	file1.Upload()
	#file1.GetContentFile('download_content.csv')

if __name__ == "__main__":

	clone_excel_sheets()
	create_excel_sheets_in_google_drive()




