
angular
.module('sharedServices', ['ionic'])
.factory("DeviceService", [
	'AndroidService',
	'iOSService',
	'WindowsService',
  '$timeout',
  'University',
  'Version',
  '$ionicHistory',
  '$templateCache',
  '$localstorage',
  'Geolocation',
	DeviceService
	]);

function DeviceService(AndroidService, iOSService, WindowsService, $timeout,
  University, Version, $ionicHistory, $templateCache, $localstorage, Geolocation) {

  var currentDevice;
  var firstTime = true;
  var onDeviceReadyQueue = [];

  return {
    isFirstTime: isFirstTime,

		readyDevice: readyDevice,
		getDevice: getDevice,
    doesCordovaExist: doesCordovaExist,
    getPlatform: getPlatform,
    getModel: getModel,
    getVersion: getVersion,
    getUUID: getUUID,
		isMobile: isMobile,
		isWeb: isWeb,
    isAndroidDevice: isAndroidDevice,
    isAndroidBrowser: isAndroidBrowser,
    isAndroid:isAndroid,
    isIOSDevice:isIOSDevice,
    isIOSBrowser: isIOSBrowser,
    isIOS: isIOS,
    ios: iOSService,
    getInfo: getInfo,
    checkUpdates: checkUpdates,
    currentDevice: currentDevice,
    isFirefoxBrowser: isFirefoxBrowser,
    isChromeBrowser: isChromeBrowser,
    isIEBrowser: isIEBrowser,
    isSafariBrowser: isSafariBrowser,
    onDeviceReadyQueue: onDeviceReadyQueue
	}

  function isFirstTime() {
    console.log("isFirstTime");

    if(firstTime) {
      firstTime = false;
      return true;
    } else return false;

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
    return doesCordovaExist() && ionic.Platform.isAndroid() && isWebView;
  }



  function isIOSDevice() {
    var userAgent = navigator.userAgent;
    return !(userAgent.toLowerCase().indexOf('safari') > -1);
  }

  function isIOSBrowser () {
    return !isIOSDevice() && ionic.Platform.isIOS();

  }


  function isFirefoxBrowser() {
    if (getBrowser().name === 'Firefox') {
      return true;
    } else return false;
  }

  function isChromeBrowser() {
    if (getBrowser().name === 'Chrome') {
      return true;
    } else return false;
  }

  function isIEBrowser() {
    if (getBrowser().name === 'IE') {
      return true;
    } else return false;
  }

  function isSafariBrowser() {
    if (getBrowser().name === 'Safari') {
      return true;
    } else return false;
  }


  function isIOS() {
    return ionic.Platform.isIOS();
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
		currentDevice = ionic.Platform.device();
    return currentDevice;
	}

  function doesCordovaExist() {
    return Object.keys(ionic.Platform.device()).length > 0;
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
      if (doesCordovaExist()) {
        onDeviceReady(scope);
      }

      if(userAgent.indexOf('wv')!==-1) {
        onDeviceReady(scope);
      }

      if (userAgent.indexOf('wv')===-1 || userAgent.indexOf('iPhone')===-1) {
        console.log("detected mobile app");
        onDeviceReady(scope);
      } else {
        console.log("did not detect mobile app");
      }

      $timeout(function() {
        console.log('starting queue functions')
        for (var i = 0; i < onDeviceReadyQueue.length; i++) {
          indexFunction = onDeviceReadyQueue[i];
          indexFunction();
        }

      }, 2000)
	}

	function onDeviceReady(scope) {
    console.log("DeviceService.onDeviceReady()");
    console.log("Cordova File Plugin is ready: " + cordova.file);

    if(navigator.splashscreen) {
      console.log('Showing splash screen @:', calcTimeSinceInit(), 'seconds');

      //always show this until we have checked for updates && there are not any
      navigator.splashscreen.show();
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
        checkUpdates();
		  	console.log("detected platform: " + getPlatform());

		}
		// if(typeof callback === 'function') {
		// 	callback();
		// }
    // checkUpdates();
	}
	function checkUpdates(url) {

    // don't update on local
    if (LOCAL && !url) {
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

      //set BASE_URL to prompted one
      BASE_URL =  url || BASE_URL

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