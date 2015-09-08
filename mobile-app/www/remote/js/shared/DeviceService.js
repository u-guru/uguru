angular
	.module('sharedServices', ['ionic'])
	.factory("DeviceService", DeviceService);

function DeviceService() {

	return {
		readyDevice: readyDevice,
		isMobile: isMobile,
		getDevice: getDevice
	}

	function isMobile() {
		return ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(); 	
	}

	function getDevice() {
		console.log("getPlatform() returns: " + ionic.Platform.device());
		return ionic.Platform.device();
	}

	function readyDevice() {
		document.addEventListener("deviceready", onDeviceReady);
	}

	function onDeviceReady() {

		if(isMobile()) {
		  console.log("navigator.geolocation works well");
		  console.log("window.open works well");
		  console.log("navigator.camera works well " + navigator.camera);

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
	  			break;
  			case "windows":
  				break;
		  }
		  
		}

	}
}