angular.module('sharedServices')
.factory("UniversityMatcher", [
	'University',
	'$q',
	UniversityMatcher
	]);

function UniversityMatcher(University, $q) {

	var list = University.getTargetted();
	sortByRank(list);
	var uniDictionary = null;
	init();

	var cachedInput = null;
	var cachedDictionary = null;

	return {
		getMatch: getMatch,
		match: match,
		init: init,
		cachedMatch: cachedMatch,
		clearCache: clearCache,
		list: list
	}

	function getMatch(input) {
		defer = $q.defer();
		worker.postMessage(input);
		return defer.promise;
	}

	function sortByRank(list) {
	  function compareRank(a, b) {
	    if (a.rank < b.rank)
	      return -1;
	    if (a.rank > b.rank)
	      return 1;

	    return 0;
	  }
	  return list.sort(compareRank);
	}

	function init() {
		uniDictionary = {};
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		for(var i=0; i<alphabet.length; i++) {
			var letter = alphabet[i];
			uniDictionary[letter] = match(letter, list);
		}
	}

	//we're going to keep calling $scope.query = UniversityMatcher.match(input) on every keyup
	//however we'll handle the actual uni list in this service for caching
	function cachedMatch(input) {
		var input = input.toLowerCase();
		if(input.length===0) {
			return list;
		}
		// if input is just one letter then we can return the matching list from the uniDictionary
		// property then we also store that list in a cachedDictionary
		else if(input.length===1) {
			cachedInput = input;
			return uniDictionary[input];
		}
		// if the user continues to type without deleting then we will continue to search
		// from within the cacheDictionary, and then replace it with the results while
		// saving it to the uniDictionary
		else if(cachedInput && input.length > cachedInput.length && input.indexOf(cachedInput) === 0) {

			cachedInput = input;
			if(uniDictionary[input]!== undefined) {
				cachedDictionary = uniDictionary[input];
				return cachedDictionary;
			} else {
				cachedInput = input;
				var subInput = input.substring(0, input.length -1);
				uniDictionary[input] = match(input, uniDictionary[subInput]);
				cachedDictionary = uniDictionary[input]
				return cachedDictionary;
			}
		}
		// if the user backspaces a part of the input then we can lookup the previous caches
		// if none was found then we can just search the entire list and create a new cache
		else if(cachedInput && input.length > 1 && input.length < cachedInput.length && cachedInput.indexOf(input) === 0) {

			cachedInput = input;
			if(uniDictionary[input]!== undefined) {
				cachedDictionary = uniDictionary[input];
				return cachedDictionary;
			} else {
				uniDictionary[input] = match(input, list);
				cachedDictionary = uniDictionary[input]
				return cachedDictionary;
			}
		}
		// in the event they do some weird stuff then we can just go back to searching by the first letter
		else if(input.length > 1) {
			cachedInput = input;
			uniDictionary[input] = match(input, list);
			cachedDictionary = uniDictionary[input];
			return cachedDictionary;
		}

	}
	function clearCache() {
		cachedInput = null;
		cachedDictionary = null;
		uniDictionary = null;
	}

	function match(input, passedList) {
		var list = passedList;
		if(!(list instanceof Array)) {
			list = University.getTargetted();
		}
		var matchedList = [];
		var inputLowerCase = input.toLowerCase();
		var firstLetterList = [];
		for(var i=0; i<list.length; i++) {
			var nameLowerCase = list[i].name.toLowerCase();
			//Give priority to schools that start with the input
			if(nameLowerCase.indexOf(inputLowerCase) === 0) {
				firstLetterList.push(list[i]);
			}
			else if(nameLowerCase.indexOf(inputLowerCase) !== -1) {
				matchedList.push(list[i]);
			}
		}
		matchedList = firstLetterList.concat(matchedList);
		return matchedList;
	}
	
	// onmessage = function(e) {
	// 	var input = e.data.input
	// 	var matches = cachedMatch(input);
	// 	postMessage(matches);
	// }

}


