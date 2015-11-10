angular
.module('sound-guru')
.factory("Utilities", [
	Utilities
	]);

function Utilities() {

	return {
		nickMatcher: nickMatcher,
		doesCordovaExist: doesCordovaExist
	};

	function doesCordovaExist() {
	  return Object.keys(ionic.Platform.device()).length > 0;
	}

	// Pass in an optional ID parameter for specific case handling
	function nickMatcher(input, list, property, id) {

		var matcher = new FastMatcher(list, {
			selector: property,
			caseInsensitive: true,
			preserveOrder: true,
			anyWord: true,
			limit: 1000
		});

		if(id === 'university') matcher.preserveOrder = true;

		return matcher.getMatches(input);
	}


}