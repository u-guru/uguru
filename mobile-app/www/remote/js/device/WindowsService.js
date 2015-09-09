angular
.module('sharedServices')
.factory('WindowsService', [
  '$rootScope',
  '$state',
  '$localstorage',
	'$cordovaPush',
	'Geolocation',
  'University',
  'Major',
  'Skill',
  'Profession',
	WindowsService
	]);

function WindowsService($rootScope, $state, $localstorage, $cordovaPush, 
  Geolocation, University, Major, Skill, Profession) {

	return {
		ready: ready
	}

	function ready() {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//);
	}

}