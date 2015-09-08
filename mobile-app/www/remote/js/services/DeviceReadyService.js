angular
	.module('uguru.services')
	.factory("DeviceReadyService", DeviceReadyService);

function DeviceReadyService() {

	var device = {
		readyDevice: readyDevice
	}

	return device;

	function readyDevice() {
		document.addEventListner("deviceready", onDeviceReady);
	}


	function onDeviceReady() {

		if($scope.platform.mobile) {
		  console.log("navigator.geolocation works well");
		  console.log("window.open works well");
		  console.log(navigator.camera);

		  if($scope.platform.ios) {
		    if (window.StatusBar) {
		      StatusBar.styleLightContent();
		      StatusBar.overlaysWebView(true);
		    }
		    if (cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		  }

		  if ($scope.platform.android) {

		  }
		}
	}



}