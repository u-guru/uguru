import json,csv
array = []
with open('universities_list.json') as outfile:
	data_file = json.load(outfile)
	for non_school_shit in data_file:
		if non_school_shit['fa15_start'] == None:
			
			dictionary_item = {}
			dictionary_item['college_name'] = non_school_shit['name']
			array.append(dictionary_item)

with open('universities_names.json') as outfile_1:
		x = json.load(outfile_1)
		f = csv.writer(open("test.csv","wb+"))	
		f.writerow(["University","Fall Start", "Fall End"])
		for x in x:
			f.writerow([x["college_name"]])


