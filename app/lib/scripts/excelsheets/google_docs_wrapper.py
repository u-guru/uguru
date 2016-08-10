from pydrive.auth import GoogleAuth
import httplib2, requests, urlparse
from pydrive.drive import GoogleDrive
import gspread, itertools
import csv


output_name = 'automation.csv'
httplib2.Http(disable_ssl_certificate_validation=True)
gauth = GoogleAuth()
gauth.LocalWebserverAuth()




def clone_excel_sheets():


	with open(output_name, 'wb') as f_out:
		writer = csv.writer(f_out)
		with open('check_purp.csv', 'rb') as mycsv:
			reader = csv.reader(mycsv)
			for counter, row in enumerate(reader):
				if counter<0: continue
				if counter>40:break
				writer.writerow(row)


def create_excel_sheets_in_google_drive():

	drive = GoogleDrive(gauth)
	file1 = drive.CreateFile({'title': 'withexcelsheets'})
	file1.SetContentFile('automation.csv')
	file1.Upload()

if __name__ == "__main__":

	clone_excel_sheets()
	create_excel_sheets_in_google_drive()




