from pydrive.auth import GoogleAuth
import httplib2, requests, urlparse
from pydrive.drive import GoogleDrive
import gspread, itertools
import csv

output_name = 'automation.csv'

httplib2.Http(disable_ssl_certificate_validation=True)



with open(output_name, 'wb') as f_out:
	writer = csv.writer(f_out)
	with open('check_purp.csv', 'rb') as mycsv:
		reader = csv.reader(mycsv)
		for counter, row in enumerate(reader):
			if counter<0: continue
			if counter>20:break
			writer.writerow(row)

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)
file1 = drive.CreateFile({'title':'thefirstten'})
file1.SetContentFile('automation.csv')
file1.Upload()

#def google_authentication_spreadsheet():


 
# f = csv.reader(open('check_purp.csv'))
# for  counter,row in enumerate(f):
# 	if counter<0:continue
# 	if counter>10:break

# 	with open(output_name, 'wb') as csvfile:
# 		a = csv.writer(csvfile)
# 		a.writerows(input_the_row_and_column)
		
	# drive = GoogleDrive(gauth)
	# file1 = drive.CreateFile({'title':'pleasework'}) 
	# file1.SetContentFile(input_the_row_and_column)
	# file1.Upload()



