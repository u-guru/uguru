angular
.module('sharedServices', ['ionic'])
.factory("DeviceService", [
	'$cordovaNgCardIO',
	'AndroidService',
	'iOSService',
	'WindowsService',
  '$timeout',
	DeviceService
	]);

function DeviceService( $cordovaNgCardIO,
	AndroidService, iOSService, WindowsService, $timeout) {

	return {
		readyDevice: readyDevice,
		getDevice: getDevice,
    getPlatform: getPlatform,
    getModel: getModel,
    getVersion: getVersion,
    getUUID: getUUID,
		isMobile: isMobile,
		isWeb: isWeb,
    ios: iOSService,
    getInfo: getInfo
	}

	function isMobile() {
		return ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone();
	}

	function isWeb() {
		return !isMobile();
	}
  // returns object
	function getDevice() {
		console.log("getDevice() returns: " + ionic.Platform.device());
		return ionic.Platform.device();
	}
  // returns string value
  function getPlatform() {
    console.log("getPlatform() returns: " + ionic.Platform.platform());
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


  //doesn't work for emulators!
	function readyDevice(callback) {
    var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if(app) {
      console.log("Running on mobile");

      document.addEventListener("deviceready", onDeviceReady);
    } else {
      console.log("Detected desktop browser");
      if (LOCAL && isMobile()) {
        onDeviceReady();
      }

    }

	}

	function onDeviceReady(callback) {
		//checkUpdates();



        //Ugh --> they overroad the native js OnDOMContentLoaded ...
        ionic.DomUtil.ready(function(){
          if(navigator.splashscreen) {

            //offset is to avoid the sidebar showing last second before
            $timeout(function() {
              console.log('Hiding splashscreen @:', calcTimeSinceInit(), 'seconds');
              navigator.splashscreen.hide();
            }, 3000);
          }
        })

        if(navigator.splashscreen) {
          console.log('Showing splash screen @:', calcTimeSinceInit(), 'seconds');
          navigator.splashscreen.show();
        }

        var posOptions = {
      		timeout: 2000,
  			enableHighAccuracy: false, //may cause high errors if true
        }

		if(isMobile()) {

	 		var mobileOS = getPlatform().toLowerCase();
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

		  	console.log("detected platform: " + getPlatform());

		}
		if(typeof callback === 'function') {
			callback();
		}
	}
	function checkUpdates() {

    // don't update on local
    if (LOCAL) {
      return;
    }

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