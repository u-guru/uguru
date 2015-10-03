import csv

match = True

with open('asshole_1.csv', 'rU') as input_1_csv:
    with open ("Workbook2.csv", "rU") as input_2_csv:
        reader_1 = csv.reader(input_1_csv)
        reader_2 = csv.reader(input_2_csv)
        
        rows_1 = [row for row in reader_1]
        rows_2 = [row for row in reader_2]
        
        for i in range(0, len(rows_1)):
            if rows_1[i] != rows_2[i]:
                match = False
                
if match == True:
    print("The CSV files match")
else:
    print("The CSV files do not match")