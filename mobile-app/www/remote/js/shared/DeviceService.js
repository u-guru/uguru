angular
.module('sharedServices', ['ionic'])
.factory("DeviceService", [
	'$cordovaSplashscreen',
	'$cordovaNgCardIO',
	'AndroidService',
	'iOSService',
	'WindowsService',
	DeviceService
	]);

function DeviceService($cordovaSplashscreen, $cordovaNgCardIO, 
	AndroidService, iOSService, WindowsService) {

	return {
		readyDevice: readyDevice,
		getDevice: getDevice,
		isMobile: isMobile,
		isWeb: isWeb
	}

	function isMobile() {
		return ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(); 	
	}

	function isWeb() {
		return !isMobile();
	}

	function getDevice() {
		console.log("getPlatform() returns: " + ionic.Platform.device());
		return ionic.Platform.platform();
	}

	function readyDevice(callback) {
		document.addEventListener("deviceready", onDeviceReady);
	}

	function onDeviceReady(callback) {
		//checkUpdates();

        if (calcTimeSinceInit) {
      		deviceReadyLoadTime = calcTimeSinceInit();
      		console.log('Device ready load time:', deviceReadyLoadTime, 'seconds');
        }
		if ($cordovaSplashscreen && $cordovaSplashscreen.hide) {
			$cordovaSplashscreen.hide();
		}

        var posOptions = {
      		timeout: 2000,
  			enableHighAccuracy: false, //may cause high errors if true
        }

		if(isMobile()) {
			console.log("DeviceSerivce detects mobile");
	  		console.log("navigator.geolocation works well");
			console.log("window.open works well");
			console.log("navigator.camera works well " + navigator.camera);
   			console.log("cardIO: " + $cordovaNgCardIO);
   			console.log('media is ready: ' + Media);

   			if(navigator.splashscreen) {
   				navigator.splashscreen.hide();
   			}

	 		var mobileOS = getDevice();
		  	switch(mobileOS) {
		  		case "ios":
		  			iOSService.ready();
			  		break;
		  		case "android":
		  			AndroidService.ready();
		  			break;
	  			case "windows":
	  				WindowsService.ready();
	  				break;
		  	}

		  	console.log("detected device: " + getDevice());	  
		}
		if(typeof callback === 'function') {
			callback();
		}
	}
	function checkUpdates() {
	   Version.getUpdatedVersionNum().then(
          //if user gets the right version
          function(response) {
                var serverVersionNumber = JSON.parse(response).version;
                console.log('server number', serverVersionNumber);
                var currentVersion = Version.getVersion();

                //if brand new user with no version set
                if ((typeof currentVersion) === "undefined") {
                  // console.log('First time opening app - set version to 1.0');
                  currentVersion = 1.0;
                  Version.setVersion(1.0);
                }
                if (serverVersionNumber != currentVersion) {

                  console.log('versions are different...\n');

                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $localstorage.removeObject('user');
                  $localstorage.removeObject('courses');
                  $localstorage.removeObject('universities');

                  if ($cordovaSplashscreen) {
                    $cordovaSplashscreen.show();
                  }
                  $templateCache.removeAll();
                  window.localStorage.clear();
                  //remove all angular templates

                  Version.setVersion(serverVersionNumber);
                  $localstorage.set('recently_updated', true);

                  console.log('V' + serverVersionNumber + 'stored to user');

                  window.location.href = BASE_URL;
                  window.location.replace(true);

                }
           	},
           //connectivity issues
          function(error) {
              console.log(error);
              console.log('Version not loaded');
          }
      	);
	}
}