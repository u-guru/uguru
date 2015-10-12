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

	return {
		readyDevice: readyDevice,
		getDevice: getDevice,
    getPlatform: getPlatform,
    getModel: getModel,
    getVersion: getVersion,
    getUUID: getUUID,
		isMobile: isMobile,
		isWeb: isWeb,
    isAndroidDevice: isAndroidDevice,
    isAndroidBrowser: isAndroidBrowser,
    isAndroid:isAndroid,
    ios: iOSService,
    getInfo: getInfo,
    checkUpdates: checkUpdates
	}

	function isMobile() {
		return ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone();
	}

  function isAndroidDevice() {
    var userAgent = navigator.userAgent;
    var androidWebViewAgents = ['Build/KLP', 'Version', 'wv'];
    var isWebView = false;
    for (var i = 0; i < androidWebViewAgents.length; i++ ) {
      var indexUA = androidWebViewAgents[i];
      if (userAgent.indexOf(indexUA) > -1) {
        isWebView = true;
      }
      break;
    }

    //needs to be both
    return ionic.Platform.isAndroid() && isWebView;
  }

  function isAndroid() {
    return ionic.Platform.isAndroid();
  }

  function isAndroidBrowser() {
    return !isAndroidDevice() && ionic.Platform.isAndroid();
  }

	function isWeb() {
		return !isMobile();
	}
  // returns object
	function getDevice() {
		return ionic.Platform.device();
	}
  // returns string value
  function getPlatform() {
    //console.log("getPlatform() returns: " + ionic.Platform.platform());
    return ionic.Platform.platform();
  }

  function getUUID() {
    console.log("getUUID() returns: " + ionic.Platform.device().uuid);
    return ionic.Platform.device().uuid;
  }

  function getVersion() {
    console.log("getVersion() returns: " + ionic.Platform.device().version);
    return ionic.Platform.device().version;
  }

  function getModel() {
    console.log("getVersion() returns: " + ionic.Platform.device().model);
    return ionic.Platform.device().model;
  }

  function getInfo() {
    var info =  ionic.Platform.device().model + "/" +
                ionic.Platform.device().platform + "/" +
                ionic.Platform.device().version + "/" +
                ionic.Platform.device().uuid
                                       ;
  console.log("Device info: " + info);
    return info;
  }



	function readyDevice(scope) {



    var userAgent = navigator.userAgent;


      if(userAgent.indexOf('wv')!==-1) {
        onDeviceReady(scope);
      }

      if (userAgent.indexOf('wv')===-1 || userAgent.indexOf('iPhone')===-1) {
        console.log("detected mobile app");
        onDeviceReady(scope);
      } else {
        console.log("did not detect mobile app");
      }
	}

	function onDeviceReady(scope) {
    console.log("DeviceService.onDeviceReady()");

    if(navigator.splashscreen) {
      console.log('Showing splash screen @:', calcTimeSinceInit(), 'seconds');

      //the delay is for preventing components from rendering on the first go
      $timeout(function() {
        navigator.splashscreen.show();
      }, 2000)
    }

		if(isMobile()) {

	 		var mobileOS = getPlatform().toLowerCase();
		  	switch(mobileOS) {
		  		case "ios":
		  			iOSService.ready();
			  		break;
		  		case "android":
            Geolocation.getLocation(scope);
		  			AndroidService.ready();
		  			break;
	  			case "windows":
	  				WindowsService.ready();
	  				break;
		  	}

		  	console.log("detected platform: " + getPlatform());

		}
		// if(typeof callback === 'function') {
		// 	callback();
		// }
	}
	function checkUpdates() {

    // don't update on local
    if (LOCAL) {
      console.log("running local: skipping over checkUpdates");

        // hide it otherwise it never would on emulators
       $timeout(function() {
          if (navigator && navigator.splashscreen && navigator.splashscreen.hide) {
            navigator.splashscreen.hide();
          }
        }, 2000)

      return;
    }
    console.log("did not detect local, checking for updates");



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

                  //doesn't work so here's my attempt
                  if (navigator && navigator.splashscreen && navigator.splashscreen.show) {
                    navigator.splashscreen.show();
                  }

                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $templateCache.removeAll();

                  // window.localStorage.clear();
                  //remove all angular templates

                  Version.setVersion(serverVersionNumber);
                  $localstorage.set('recently_updated', true);

                  console.log('V' + serverVersionNumber + 'stored to user');

                  //if windows
                  if (navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i)  || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent === 'Win32NT' || WINDOWS) {
                    window.location.replace(BASE_URL);
                  } else {
                    window.location = BASE_URL;
                    window.location.reload(true);
                  }

           	  } else {
                //the only place where this will
                $timeout(function() {
                  if (navigator && navigator.splashscreen && navigator.splashscreen.hide) {
                    navigator.splashscreen.hide();
                  }
                }, 2000)

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