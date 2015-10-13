
angular
.module('sharedServices', ['ionic'])
.factory("DeviceService", [
	'$cordovaNgCardIO',
	'AndroidService',
	'iOSService',
	'WindowsService',
  '$timeout',
  'Geolocation',
  'University',
  'Version',
  '$ionicHistory',
  '$templateCache',
  '$localstorage',
	DeviceService
	]);

function DeviceService($cordovaNgCardIO,
	AndroidService, iOSService, WindowsService, $timeout, Geolocation,
  University, Version, $ionicHistory, $templateCache, $localstorage) {

  
}