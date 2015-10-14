angular
.module('sharedServices')
.factory("Utilities", [
	'$rootScope',
	'Settings',
	Utilities
	]);

function Utilities($rootScope, Settings) {

	return {
		getNetworkSpeed: getNetworkSpeed,
		deg2rad: deg2rad,
		getDistanceInMiles: getDistanceInMiles,
		readError: readError,
		nickMatcher: nickMatcher,
		getFileName: getFileName,
		isElementInViewport: isElementInViewport,
		transitionEndEventName: transitionEndEventName,
		fireBeforeEnter: fireBeforeEnter,
		rAF: rAF,
		sortArrObjByKey: sortArrObjByKey,
		checkFreeSpace: checkFreeSpace,
		getFreeSpace: getFreeSpace,
		clearLoader: clearLoader,
		validateEmail: validateEmail,
		validatePhone: validatePhone,
		validateCode: validateCode,
		validateName: validateName,
		validatePassword: validatePassword,
		keyboardExistsAndVisible: keyboardExistsAndVisible,
		keyboardExists: keyboardExists,
		cordovaExists: cordovaExists,
		numberWithCommas: numberWithCommas
	}

	function sortArrObjByKey(arr, key) {
		function compare(a,b) {
		  if (a[key] < b[key])
		    return -1;
		  if (a[key] > b[key])
		    return 1;
		  return 0;
		}
		arr.sort(compare);
		return arr
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

	// Pass in an optional ID parameter for specific case handling
	function nickMatcher(input, list, property, id) {
		//console.log("list: " + list + " property: " + property + " id: " + id);

		if (id && id.indexOf('major')) {
			property = ['title', 'name', 'abbr', 'code'];
		}


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


	function getFileName(URI) {
		var indexSlash = URI.lastIndexOf("/");
		var fileName = URI.substring(indexSlash + 1);

		return fileName;
	}

	function cordovaExists() {
		return (typeof cordova === 'undefined');
	}

	function keyboardExists() {
		return cordovaExists() && cordova.plugins && cordova.plugins.Keyboard;
	}

	function keyboardExistsAndVisible() {
		return keyboardExists && cordova.plugins.Keyboard.isVisible;
	}

	function isElementInViewport (el) {
	    var rect = el[0].getBoundingClientRect();

	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	}

	function transitionEndEventName() {
	    var i,
	        undefined,
	        el = document.createElement('div'),
	        transitions = {
	            'transition':'transitionend',
	            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
	            'MozTransition':'transitionend',
	            'WebkitTransition':'webkitTransitionEnd'
	        };

	    for (i in transitions) {
	        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
	            return transitions[i];
	        }
	    }
	}

	var BeforeEnterEvent = new CustomEvent("beforeEnter");

	function fireBeforeEnter() {
		return BeforeEnterEvent;
	}

	function rAF() {
	  return
	  	window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    function(callback) {
	      window.setTimeout(callback, 16);
	    };
	}


	function checkFreeSpace(size) {
		var size_b = size
		if(size_b === undefined) size_b = 300,000,000;
		var free = getFreeSpace(size_b);
		if (free === false) {
			console.log("No space available.");
		}
		return free;
	}

	function getFreeSpace(size_b) {

		var size_mb = size_b/1000/1000;
		cordova.exec(function(result) {
			var space_mb = result/1000;
		    //console.log("Free Disk Space: " + space_mb + "mb");
		    if(space_mb > size_mb) {
		    	return true;
		    } else {
		    	console.log("low on space: " + space_mb + 'mb');
		    	uTracker.track('Low Disk Space', {
		    		'$Free_Space': space_mb,
		    		'$File_Size': size_mb
		    	});
		    	return false;
		    }
		}, function(error) {
		    console.log("Error: " + error);
		    uTracker.track('Callback Error', {
		    	'$Message': error
		    });
		    return false;
		}, "File", "getFreeDiskSpace", []);
	}


	function clearLoader() {
		$rootScope.loader.hide();
	}

	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

	function validatePhone(phone) {
		var check =	phone.match(/\d/g)
		return check!==null && check.length===10;
	}

	function validateCode(code) {
		if(code!==null) {
			return code.length===4;
		} else return false;

	}

	function validateName(name) {
	   	var re= /^[A-z ]+$/;
   		return re.test(name);
	}

	function validatePassword(password) {
		if(password!==null) {
			return password.length>=6;
		} else return false;
	}

	function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];
}

}




