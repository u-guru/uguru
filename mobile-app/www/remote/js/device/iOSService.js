angular
.module('sharedServices')
.factory('iOSService', [
	'$rootScope',
	'$state',
	'$localstorage',
	'$cordovaPush',
	'Geolocation',
	'University',
	'Major',
	'Skill',
	'Profession',
	iOSService
	]);

function iOSService($rootScope, $state, $localstorage, $cordovaPush, 
  Geolocation, University, Major, Skill, Profession) {

	return {
		ready: ready
	}

	function ready() {
	    if(window.StatusBar) {
			StatusBar.styleLightContent();
			StatusBar.overlaysWebView(true);
		}
		if(cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
			StatusBar.overlaysWebView(true);
		}

	}

}