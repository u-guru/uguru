import requests, json, sys
from bs4 import BeautifulSoup

WORDS = ["haircut", "happy"]

OUTPUT_PATH = "output.json"

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
	
	# Get the word definition
	word_definition = soup.find('span', attrs = {'class': 'DEFINITION'}).text.strip().encode('cp850', errors='replace').decode('utf-8').replace("?s", "'s")
	
	# Get the wrapper for the word type
	word_type_wrapper = soup.find('span', attrs = {'class': 'PART-OF-SPEECH'})
	
	# If the word type wrapper exists, grab it
	if word_type_wrapper is not None:
		word_type = word_type_wrapper.text.upper()
	else:
		word_type = ""
	
	# Get the link to the thesaurus page
	thesaurus_link = soup.find('div', attrs = {'class': 'thessnippet'}).find('a', attrs = {'class', 'moreButton'})['href']
	
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
		
		# Store the word
		entry_object['word'] = entry.find('h3').text.encode('cp850', errors='replace').decode('utf-8').replace("?s", "'s")
		
		# If the current word is the same as the original word, skip it
		if entry_object['word'].lower() == word.lower():
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
	
	# Store the related words
	word_object['related'] = related_words
	
	# Store the word object
	output[word] = word_object
	
# Dump the words to the JSON file
def dump_to_json(output):
	with open(OUTPUT_PATH, 'w') as outfile:
		json.dump(output, outfile, indent = 4)
	
if __name__ == "__main__":
	output = {}
	
	for word in WORDS:
		get_associated_words(word.lower(), output)
		
	dump_to_json(output)