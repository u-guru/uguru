# CSV comparison
# Author: James Monger
# Submission date: 4th Aug 2015
# Submission time: 17:00 PDT

import csv

CSV_FILE_MASTER = 'csv1.csv'
CSV_FILE_SLAVE = 'csv2.csv'

with open(CSV_FILE_MASTER, 'rb') as file_m, open(CSV_FILE_SLAVE, 'rb') as file_s:
	# Create a CSV reader for  
	reader_m = csv.reader(file_m)
	reader_s = csv.reader(file_s)

	pointer_line = 0

	mismatch_occured = False

	# Get the next master and slave line
	for line_m in reader_m:
		line_s = reader_s.next()

		# Get the number of columns in the master and slave lines
		count_col_m = len(line_m)
		count_col_s = len(line_s)

		# Check that the master and slave line have the same amount of columns
		if count_col_m == count_col_s:
 			# Iterate through every column
  			for col in range(0, count_col_m):
  				# Get the master and slave column values for the two lines
  				col_m = line_m[col]
  				col_s = line_s[col]
 
 				# If they don't match, print it and log it
  				if col_m != col_s:
  					print('ERROR: Column value mismatch on line ' + str(pointer_line) + ', column ' + str(col) + ' [m: \'' + col_m + '\', s: \'' + col_s + '\']')
  					mismatch_occured = True

  		else:
  			print('ERROR: Column count mismatch on line ' + str(pointer_line))
  			mismatch_occured = True

  		pointer_line = pointer_line + 1
	
	if mismatch_occured == False:
		print('SUCCESS: Files match with no errors')