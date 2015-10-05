import os
import io
import csv


input_file_name = 'test1234.csv'
for i in range(10):
        output_name = 'upwork_employee_number_%d.csv'%(i,)
        with open(output_name, 'wb') as f_out:
            writer = csv.writer(f_out)
            with open(input_file_name, 'rb') as mycsv:
                reader = csv.reader(mycsv)
                for counter, row in enumerate(reader):
                    if counter<399: continue
                    if counter>499:break
                    writer.writerow(row)