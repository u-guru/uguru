angular
.module('sharedServices', ['ionic'])
.factory("DeviceService", [
	'$cordovaSplashscreen',
	'$cordovaNgCardIO',
	'AndroidService',
	DeviceService
	]);

function DeviceService($cordovaSplashscreen, $cordovaNgCardIO, AndroidService) {

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

	 		var mobileOS = getDevice();
		  	switch(mobileOS) {
		  		case "ios":
	  			    if (window.StatusBar) {
				      StatusBar.styleLightContent();
				      StatusBar.overlaysWebView(true);
			    	}
			   	 	if (cordova.plugins.Keyboard) {
			      		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			    	}
			  		break;
		  		case "android":
		  			AndroidService.ready();
		  			break;
	  			case "windows":
	  				break;
		  	}

		  	console.log("detected device: " + getDevice());	  
		}
		if(typeof callback === 'function') {
			callback();
		}

	}
}