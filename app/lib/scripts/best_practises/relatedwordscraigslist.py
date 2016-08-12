import requests, json, time
from bs4 import BeautifulSoup

# The pages to scrape the words from
PAGES = ["http://sfbay.craigslist.org/", "http://sfbay.craigslist.org/search/act", "http://sfbay.craigslist.org/search/ats", "http://sfbay.craigslist.org/search/kid", "http://sfbay.craigslist.org/search/cls", "http://sfbay.craigslist.org/search/eve", "http://sfbay.craigslist.org/search/com", "http://sfbay.craigslist.org/search/grp", "http://sfbay.craigslist.org/search/vnn", "http://sfbay.craigslist.org/search/laf", "http://sfbay.craigslist.org/search/muc", "http://sfbay.craigslist.org/search/pet", "http://sfbay.craigslist.org/search/pol", "http://sfbay.craigslist.org/search/rid", "http://sfbay.craigslist.org/search/vol", "http://sfbay.craigslist.org/i/personals?category=stp", "http://sfbay.craigslist.org/i/personals?category=w4w", "http://sfbay.craigslist.org/i/personals?category=w4m", "http://sfbay.craigslist.org/i/personals?category=m4w", "http://sfbay.craigslist.org/i/personals?category=m4m", "http://sfbay.craigslist.org/i/personals?category=msr", "http://sfbay.craigslist.org/i/personals?category=cas", "http://sfbay.craigslist.org/i/personals?category=mis", "http://sfbay.craigslist.org/i/personals?category=rnr", "https://forums.craigslist.org/?areaID=1&forumID=3232", "https://forums.craigslist.org/?areaID=1&forumID=49", "https://forums.craigslist.org/?areaID=1&forumID=78", "https://forums.craigslist.org/?areaID=1&forumID=5", "https://forums.craigslist.org/?areaID=1&forumID=88", "https://forums.craigslist.org/?areaID=1&forumID=95", "https://forums.craigslist.org/?areaID=1&forumID=47", "https://forums.craigslist.org/?areaID=1&forumID=34", "https://forums.craigslist.org/?areaID=1&forumID=83", "https://forums.craigslist.org/?areaID=1&forumID=122", "https://forums.craigslist.org/?areaID=1&forumID=76", "https://forums.craigslist.org/?areaID=1&forumID=130", "https://forums.craigslist.org/?areaID=1&forumID=99", "https://forums.craigslist.org/?areaID=1&forumID=90", "https://forums.craigslist.org/?areaID=1&forumID=8", "https://forums.craigslist.org/?areaID=1&forumID=41", "https://forums.craigslist.org/?areaID=1&forumID=92", "https://forums.craigslist.org/?areaID=1&forumID=64", "https://forums.craigslist.org/?areaID=1&forumID=22", "https://forums.craigslist.org/?areaID=1&forumID=2007", "https://forums.craigslist.org/?areaID=1&forumID=85", "https://forums.craigslist.org/?areaID=1&forumID=54", "https://forums.craigslist.org/?areaID=1&forumID=575", "https://forums.craigslist.org/?areaID=1&forumID=9", "https://forums.craigslist.org/?areaID=1&forumID=81", "https://forums.craigslist.org/?areaID=1&forumID=6", "https://forums.craigslist.org/?areaID=1&forumID=7", "https://forums.craigslist.org/?areaID=1&forumID=1257", "https://forums.craigslist.org/?areaID=1&forumID=200269", "https://forums.craigslist.org/?areaID=1&forumID=73", "https://forums.craigslist.org/?areaID=1&forumID=1991", "https://forums.craigslist.org/?areaID=1&forumID=72", "https://forums.craigslist.org/?areaID=1&forumID=79", "https://forums.craigslist.org/?areaID=1&forumID=1926", "https://forums.craigslist.org/?areaID=1&forumID=133", "https://forums.craigslist.org/?areaID=1&forumID=53", "https://forums.craigslist.org/?areaID=1&forumID=1947", "https://forums.craigslist.org/?areaID=1&forumID=24", "https://forums.craigslist.org/?areaID=1&forumID=501", "https://forums.craigslist.org/?areaID=1&forumID=4", "https://forums.craigslist.org/?areaID=1&forumID=16", "https://forums.craigslist.org/?areaID=1&forumID=50", "https://forums.craigslist.org/?areaID=1&forumID=39", "https://forums.craigslist.org/?areaID=1&forumID=26", "https://forums.craigslist.org/?areaID=1&forumID=71", "https://forums.craigslist.org/?areaID=1&forumID=5500", "https://forums.craigslist.org/?areaID=1&forumID=84", "https://forums.craigslist.org/?areaID=1&forumID=20", "https://forums.craigslist.org/?areaID=1&forumID=29", "https://forums.craigslist.org/?areaID=1&forumID=46", "https://forums.craigslist.org/?areaID=1&forumID=12", "https://forums.craigslist.org/?areaID=1&forumID=59", "https://forums.craigslist.org/?areaID=1&forumID=28", "https://forums.craigslist.org/?areaID=1&forumID=96", "https://forums.craigslist.org/?areaID=1&forumID=93", "https://forums.craigslist.org/?areaID=1&forumID=32", "https://forums.craigslist.org/?areaID=1&forumID=1040", "https://forums.craigslist.org/?areaID=1&forumID=42", "https://forums.craigslist.org/?areaID=1&forumID=98", "https://forums.craigslist.org/?areaID=1&forumID=2400", "https://forums.craigslist.org/?areaID=1&forumID=69", "https://forums.craigslist.org/?areaID=1&forumID=15", "https://forums.craigslist.org/?areaID=1&forumID=120", "https://forums.craigslist.org/?areaID=1&forumID=94", "https://forums.craigslist.org/?areaID=1&forumID=7000", "https://forums.craigslist.org/?areaID=1&forumID=27", "https://forums.craigslist.org/?areaID=1&forumID=8620", "http://sfbay.craigslist.org/search/apa", "http://sfbay.craigslist.org/search/swp", "http://sfbay.craigslist.org/search/hsw", "http://sfbay.craigslist.org/search/off", "http://sfbay.craigslist.org/search/prk", "http://sfbay.craigslist.org/search/rea", "http://sfbay.craigslist.org/search/roo", "http://sfbay.craigslist.org/search/sha", "http://sfbay.craigslist.org/search/sub", "http://sfbay.craigslist.org/search/vac", "http://sfbay.craigslist.org/search/ata", "http://sfbay.craigslist.org/search/ppa", "http://sfbay.craigslist.org/search/ara", "http://sfbay.craigslist.org/search/sna", "http://sfbay.craigslist.org/search/pta", "http://sfbay.craigslist.org/search/baa", "http://sfbay.craigslist.org/search/bar", "http://sfbay.craigslist.org/search/haa", "http://sfbay.craigslist.org/i/bikes", "http://sfbay.craigslist.org/i/boats", "http://sfbay.craigslist.org/search/bka", "http://sfbay.craigslist.org/search/bfa", "http://sfbay.craigslist.org/i/autos", "http://sfbay.craigslist.org/search/ema", "http://sfbay.craigslist.org/search/moa", "http://sfbay.craigslist.org/search/cla", "http://sfbay.craigslist.org/search/cba", "http://sfbay.craigslist.org/i/computers", "http://sfbay.craigslist.org/search/ela", "http://sfbay.craigslist.org/search/gra", "http://sfbay.craigslist.org/search/zip", "http://sfbay.craigslist.org/search/fua", "http://sfbay.craigslist.org/search/gms", "http://sfbay.craigslist.org/search/foa", "http://sfbay.craigslist.org/search/hva", "http://sfbay.craigslist.org/search/hsa", "http://sfbay.craigslist.org/search/jwa", "http://sfbay.craigslist.org/search/maa", "http://sfbay.craigslist.org/i/motorcycles", "http://sfbay.craigslist.org/search/msa", "http://sfbay.craigslist.org/search/pha", "http://sfbay.craigslist.org/search/rva", "http://sfbay.craigslist.org/search/sga", "http://sfbay.craigslist.org/search/tia", "http://sfbay.craigslist.org/search/tla", "http://sfbay.craigslist.org/search/taa", "http://sfbay.craigslist.org/search/vga", "http://sfbay.craigslist.org/search/waa", "http://sfbay.craigslist.org/search/aos", "http://sfbay.craigslist.org/search/bts", "http://sfbay.craigslist.org/search/cps", "http://sfbay.craigslist.org/search/crs", "http://sfbay.craigslist.org/search/cys", "http://sfbay.craigslist.org/search/evs", "http://sfbay.craigslist.org/search/fgs", "http://sfbay.craigslist.org/search/fns", "http://sfbay.craigslist.org/search/hss", "http://sfbay.craigslist.org/search/lbs", "http://sfbay.craigslist.org/search/lgs", "http://sfbay.craigslist.org/search/lss", "http://sfbay.craigslist.org/search/mas", "http://sfbay.craigslist.org/search/pas", "http://sfbay.craigslist.org/search/rts", "http://sfbay.craigslist.org/search/sks", "http://sfbay.craigslist.org/search/biz", "http://sfbay.craigslist.org/search/thp", "http://sfbay.craigslist.org/search/trv", "http://sfbay.craigslist.org/search/wet", "http://sfbay.craigslist.org/search/acc", "http://sfbay.craigslist.org/search/ofc", "http://sfbay.craigslist.org/search/egr", "http://sfbay.craigslist.org/search/med", "http://sfbay.craigslist.org/search/sci", "http://sfbay.craigslist.org/search/bus", "http://sfbay.craigslist.org/search/csr", "http://sfbay.craigslist.org/search/edu", "http://sfbay.craigslist.org/search/fbh", "http://sfbay.craigslist.org/search/lab", "http://sfbay.craigslist.org/search/gov", "http://sfbay.craigslist.org/search/hum", "http://sfbay.craigslist.org/search/eng", "http://sfbay.craigslist.org/search/lgl", "http://sfbay.craigslist.org/search/mnu", "http://sfbay.craigslist.org/search/mar", "http://sfbay.craigslist.org/search/hea", "http://sfbay.craigslist.org/search/npo", "http://sfbay.craigslist.org/search/rej", "http://sfbay.craigslist.org/search/ret", "http://sfbay.craigslist.org/search/sls", "http://sfbay.craigslist.org/search/spa", "http://sfbay.craigslist.org/search/sec", "http://sfbay.craigslist.org/search/trd", "http://sfbay.craigslist.org/search/sof", "http://sfbay.craigslist.org/search/sad", "http://sfbay.craigslist.org/search/tch", "http://sfbay.craigslist.org/search/trp", "http://sfbay.craigslist.org/search/tfr", "http://sfbay.craigslist.org/search/web", "http://sfbay.craigslist.org/search/wri", "http://sfbay.craigslist.org/search/etc", "http://sfbay.craigslist.org/search/jjj?is_parttime=1", "http://sfbay.craigslist.org/search/cpg", "http://sfbay.craigslist.org/search/crg", "http://sfbay.craigslist.org/search/cwg", "http://sfbay.craigslist.org/search/dmg", "http://sfbay.craigslist.org/search/evg", "http://sfbay.craigslist.org/search/lbg", "http://sfbay.craigslist.org/search/tlg", "http://sfbay.craigslist.org/search/wrg"]

# The path to dump the data to
OUTPUT_PATH = "output.json"

# Get the frequencies of all words appearing on Craigslist
def get_frequent_craigslist_words():
	output = {}
	
	# Iterate through every page in the array
	for page in PAGES:
		print(" ** Scraping " + page)
		
		time.sleep(1)
		
		# Skip the page if there's a connection error
		try:
			# Create a BeautifulSoup object for the page
			soup = BeautifulSoup(requests.get(page).text)
		except requests.exceptions.ConnectionError:
			continue
		
		# Remove all script tags from the soup
		[s.extract() for s in soup('script')]
		
		# Get the text from the page, strip it and replace all invalid characters
		words = soup.text.strip().replace('\n', ' ')
		
		# Remove all unicode characters
		words = ''.join([i if ord(i) < 128 else ' ' for i in words])
		
		# Split the words by a space to give a list of words
		words = words.split(" ")
		
		# Remove all invalid words from the list
		words = remove_invalid_words(words)
		
		# Remove all starting, finishing or inside brackets from the list of words
		words = strip_brackets(words)
		
		# Iterate through every word in the list of words
		for word in words:
			# Add the word to the output
			add_word_to_output(output, word)
			
	# Return the list of words
	return output
			
# Add a word to the output
# param output: the output to add the word to
# param word: the word to add
def add_word_to_output(output, word):
	# Try to get the frequency of the word from the dictionary.
	# If we can't get it, no words have been found yet so set it to 0.
	try:
		current_word_frequency = output[word]
	except KeyError:
		current_word_frequency = 0
		
	# Increase the frequency by 1 and store it in the output dictionary
	output[word] = current_word_frequency + 1

# Remove invalid words from the list
# param words: the words to strip invalid words from
def remove_invalid_words(words):
	# A list of invalid words
	INVALID_WORDS = ["", "-", "&", "/", ".", "'", "\"", " ", "[xundo]", "+", "~", "...", "<", ">"]
	
	# An array to store the valid words
	new_word_array = []
	
	# Iterate through every word in the array
	for word in words:
		# If the word isn't in the list of invalid words, append it to the array of valid words
		if word not in INVALID_WORDS:
			new_word_array.append(word)
	
	# Return the array of valid words
	return new_word_array
	
# Strip brackets from the word and handle inline brackets
# param words: the list of words to strip the brackets from
def strip_brackets(words):
	# An array to store the processed words in
	new_word_array = []

	# Iterate through every word in the list
	for word in words:
		try:
			# If the first character is an opening bracket, trim the first character
			if word[0] == "(":
				word = word[1:]
				
			# If the last character is a closing bracket, trim the last character
			if word[-1] == ")":
				word = word[:-1]
		except IndexError:
			pass
			
		# If there is a closing bracket within the word then split it around the bracket and add each word to the array
		if ")" in word:
			for split_word in word.split(')'):
				new_word_array.append(split_word)
		# If there is an opening bracket in the word then split it around the bracket and add each word to the array
		elif "(" in word:
			for split_word in word.split('('):
				new_word_array.append(split_word)
		# Otherwise add each word to the array
		else:
			new_word_array.append(word)
	
	# Return the array
	return new_word_array
	
# Get the x most frequent words in a list
# param words: the words to search through
# param count: the number of words to get
def get_most_frequent_words(frequent_words, count):
	# Initialise a counter
	counter = 0
	
	output_words = []
	
	# Sort the dictionary by its values in descending order
	for word in sorted(frequent_words, key = frequent_words.get, reverse=True):
		# Iterate the counter
		counter += 1
		
		output_words.append(word)
		
		# If the counter has reached the desired count, break the loop
		if counter == count:
			break
			
	return output_words
			
# Construct the URL for the word and return it
# param word: the word to use
def construct_word_url(word):
	return "http://www.macmillandictionary.com/dictionary/british/" + word
	
# Get the associated words for a given word
# param word: the word to search for
# param output: the dictionary to output data to
def get_associated_words(word, output):
	# Create a BeautifulSoup object for the given word
	soup = BeautifulSoup(requests.get(construct_word_url(word)).text)
	
	# Check that the word is valid
	if "Sorry, no search result for" in soup.text or "We're sorry but the page you have requested is not here." in soup.text:
		print(" ** '" + word + "' is not a valid word")
		return
	
	# Get the wrapper for the definition
	definition_wrapper = soup.find('span', attrs = {'class': 'DEFINITION'})
		
	# Check that the definition wrapper exists and get the text from it
	if definition_wrapper is not None:
		word_definition = definition_wrapper.text.strip().encode('cp850', errors='replace').decode('utf-8').replace("?s", "'s")
	else:
		word_definition = ""
	
	# Get the wrapper for the word type
	word_type_wrapper = soup.find('span', attrs = {'class': 'PART-OF-SPEECH'})
	
	# If the word type wrapper exists, grab it
	if word_type_wrapper is not None:
		word_type = word_type_wrapper.text.upper()
	else:
		word_type = ""
	
	# Get the thesaurus snippet
	thesaurus_snippet = soup.find('div', attrs = {'class': 'thessnippet'})
	
	# Check that the thesaurus snippet exists
	if thesaurus_snippet is not None:
		# Get the link to the thesaurus page
		thesaurus_link = thesaurus_snippet.find('a', attrs = {'class', 'moreButton'})['href']
		
		# Create a BeautifulSoup object for the thesaurus
		thesaurus_soup = BeautifulSoup(requests.get(thesaurus_link).text)
		
		# Get all entries from the page
		entries = thesaurus_soup.findAll('div', attrs = {'class': 'entry'})
		
		# An array to hold the related words
		related_words = []
		
		# Iterate through every thesaurus entry
		for entry in entries:
			# Create a dictionary to hold the word information
			entry_object = {}
			
			try:
				# Store the word
				entry_object['word'] = entry.find('h3').text.encode('cp850', errors='replace').decode('utf-8').replace("?s", "'s")
				
				# If the current word is the same as the original word, skip it
				if entry_object['word'].lower() == word.lower():
					continue
			except UnicodeDecodeError:
				continue
			
			# Get the wrapper for the definition
			definition_wrapper = entry.find('p', attrs = {'class': 'query'})
			
			# If there is a definition, store it, if not store an empty string
			if definition_wrapper is not None:
				entry_object['definition'] = definition_wrapper.text.strip().encode('cp850', errors='replace').decode('utf-8').replace("?s", "'s")
			else:
				entry_object['definition'] = ""
				
			# Get the wrapper for the word type
			type_wrapper = entry.find('p', attrs = {'class': 'part-of-speech'})
			
			# If there is a word type, store it, if not store an empty string
			if type_wrapper is not None:
				entry_object['type'] = type_wrapper.text.strip().upper()
			else:
				entry_object['type'] = ""
			
			# Append the word to the list of related words
			related_words.append(entry_object)
		
	# Create a dictionary to hold the word information
	word_object = {}
	
	# Store the word itself
	word_object['word'] = word
	
	# Store the word type
	word_object['type'] = word_type
	
	# Store the definition of the word
	word_object['definition'] = word_definition
	
	if thesaurus_snippet is not None:
		# Store the related words
		word_object['related'] = related_words
	else:
		word_object['related'] = []
	
	print(" ** Scraped information for '" + word + "'")
	
	# Store the word object
	output[word] = word_object

# Dump an object to JSON
# param output: the object to dump
def dump_to_json(output):
	# Open a file at a given path
	with open(OUTPUT_PATH, 'w') as outfile:
		# Dump the JSON to the opened file
		json.dump(output, outfile, indent = 4)
	
if __name__ == "__main__":
	print(" ** Getting Craigslist word frequencies...")
	# Get the frequencies of all the words on the page
	frequent_words = get_frequent_craigslist_words()
	
	print(" ** Getting associated words...")
	# A dictionary to store the related words
	output = {}
	
	# Iterate through the 100 most frequent words and get associated words
	for word in get_most_frequent_words(frequent_words, 100):
		get_associated_words(word.lower(), output)
	
	print(" ** Dumping data...")
	# Dump the associated words to JSON
	dump_to_json(output)
	
	print(" ** Data dumped to '" + OUTPUT_PATH + "'")