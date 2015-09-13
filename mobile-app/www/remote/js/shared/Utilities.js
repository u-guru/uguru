angular
.module('sharedServices')
.factory("Utilities", [
	'$cordovaSplashscreen',
	'Settings',
	Utilities
	]);

function Utilities($cordovaSplashscreen, Settings) {

	return {
		getNetworkSpeed: getNetworkSpeed,
		deg2rad: deg2rad,
		getDistanceInMiles: getDistanceInMiles,
		readError: readError,
		nickMatcher: nickMatcher,
		getFileName: getFileName
	}

	function getNetworkSpeed() {
	    var networkState = navigator.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.CELL]     = 'Cell generic connection';
	    states[Connection.NONE]     = 'No network connection';

	    console.log('Connection type: ' + states[networkState]);

	    return networkState;
	}

	function deg2rad(deg) {
  		return deg * (Math.PI/180);
	}

	function getDistanceInMiles(lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon/2) * Math.sin(dLon/2);

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c; // Distance in km
		var miles = d * 0.621371; // Convert to miles
		return miles;
	}

	function readError(type, code) {
		if(type==='geolocation') {
			switch(code) {
				case 1: console.log('user denied permission');
					break;
				case 2: console.log('user position is unavailable');
					break;
				case 3: console.log('GPS timed out');
					break;
			}
			Settings.location = false;
		}
	}

	function nickMatcher(input, list) {
		var matchedList = [];
		if (!input) {
			return;
		}
		var inputLowerCase = input.toLowerCase();
		for(var i=0; i<list.length; i++) {

			var nameLowerCase = list[i].name.toLowerCase();

			var inputLowerCase = input.toLowerCase();

			if(nameLowerCase.indexOf(inputLowerCase) !== -1) {

				matchedList.push(list[i]);
			};
		}
		return matchedList;
	}


	function getFileName(URI) {
		var indexSlash = URI.lastIndexOf("/");
		var fileName = URI.substring(indexSlash + 1);

		return fileName;
	}


}