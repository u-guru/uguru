import glob, json, os

if __name__ == '__main__':
	for file in glob.glob('*json'):
		with open(file) as data_file:
			_dict = json.load(data_file)
			if not _dict:
				print file, 'deleted'
				os.remove(file)