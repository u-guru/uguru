
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
  'PushService',
  'uTracker',
	DeviceService
	]);

function DeviceService($cordovaNgCardIO,
	AndroidService, iOSService, WindowsService, $timeout, Geolocation,
  University, Version, $ionicHistory, $templateCache, $localstorage, PushService, uTracker) {

  var currentDevice;
  var firstTime = true;
  var isReady = false;


  return {
    isFirstTime: isFirstTime,
    isReady: isReady,
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
    isAndroid: isAndroid,
    isIOSDevice: isIOSDevice,
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
    runTriggerSequence:runTriggerSequence
	};

  function isFirstTime() {
    if(firstTime) {
      firstTime = false;
      return true;
    } else return false;
  }


  function runTriggerSequence(arr_triggers) {
    var currentDelay = 0;
    var supportedTriggers = ['click'];
    for (var i = 0; i < arr_triggers.length; i++) {
      var indexTriggerString = arr_triggers[i];
      var indexTriggerSplit = indexTriggerString.split(':');
      if (indexTriggerSplit.length ===3) {
        var indexTrigger = indexTriggerSplit[0];
        var indexSelector = indexTriggerSplit[1];
        var indexDelay = indexTriggerSplit[2];
        var element = angular.element(indexSelector);
        if (!element) {
          console.log('TRIGGER ELEMENT ERROR:ELEMENT WITH SELECTOR DOES NOT EXIST:', indexSelector);
          return;
        }
        if (supportedTrigger.indexOf(indexTrigger) === -1) {
          console.log('TRIGGER ELEMENT ERROR:TRIGGER NOT SUPPORTED (YET):', indexTrigger);
          return;
        }
        currentDelay += parseInt(currentDelay);
        $timeout(function() {
          console.log(indexTrigger +'ing', 'element', indexSelector, 'in about', currentDelay, 'seconds');
          angular.element(element).triggerHandler(indexTrigger);
        }, currentDelay)
      } else {
        console.log('TRIGGER ERROR:INSUFFICIENT ARGS FOR ARG:', indexTriggerString);
        return;
      }
    }
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
    return (!(userAgent.toLowerCase().indexOf('safari') > -1) || userAgent.indexOf('iPad') > 0);
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
    return ionic.Platform.platform();
  }

  function getUUID() {
    return ionic.Platform.device().uuid;
  }

  function getVersion() {
    return ionic.Platform.device().version;
  }

  function getModel() {
    return ionic.Platform.device().model;
  }

  function getInfo() {
    var info =  ionic.Platform.device().model + "/" +
                ionic.Platform.device().platform + "/" +
                ionic.Platform.device().version + "/" +
                ionic.Platform.device().uuid
                                       ;
    return info;
  }


  function sendPlatform() {

    if(doesCordovaExist) {
      return getPlatform();
    }
    else {
      return navigator.userAgent;
    }

  }

	function readyDevice(scope) {
    isReady = true;
    var userAgent = navigator.userAgent;
      if (doesCordovaExist()) {
        onDeviceReady(scope);
      }

      else {
        var browser = getBrowser();
        var device = getDevice();
        uTracker.track(tracker, 'device', {
          "$Browser": browser,
          "$Device": device
        });
      }
	}

	function onDeviceReady(scope) {
    if(navigator.splashscreen) {
      //always show this until we have checked for updates && there are not any
      navigator.splashscreen.show();
    }

		if(isMobile()) {

	 		var mobileOS = getPlatform().toLowerCase();
      // if(doesCordovaExist()) {
      //   PushService.init();
      // }
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
		} else {

    }
		// if(typeof callback === 'function') {
		// 	callback();
		// }
    // checkUpdates();
	}
	function checkUpdates(url) {
    // don't update on local
    if (LOCAL && !url) {
        // hide it otherwise it never would on emulators
       $timeout(function() {
          if (navigator && navigator.splashscreen && navigator.splashscreen.hide) {
            navigator.splashscreen.hide();
          }
        }, 2000);

      return;
    }

      //set BASE_URL to prompted one
      BASE_URL =  url || BASE_URL;

	   Version.getUpdatedVersionNum().then(
          //if user gets the right version
          function(response) {
                var serverVersionNumber = JSON.parse(response).version;
                var currentVersion = Version.getVersion();

                //if brand new user with no version set
                if ((typeof currentVersion) === "undefined") {
                  currentVersion = 1.0;
                  Version.setVersion(1.0);
                }
                if (serverVersionNumber !== currentVersion) {
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
                }, 2000);

              }
          },
           //connectivity issues
          function(error) {
              console.error('Version not loaded');
          }
      	);
	}
}