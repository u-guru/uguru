angular
.module('sharedServices')
.factory("AppAvailability", [
  'DeviceService',
  AppAvailability
	]);

function AppAvailability(DeviceService) {


  return {

    checkFb: checkFb
    

  }

  function checkFb() {

    var scheme;

    if(DeviceService.isAndroid()) {
      scheme = "com.facebook.katana";

    }

    if(DeviceService.isIOS()) {
      scheme = "fb://"
      
    }

    appAvailability.check(scheme, successCallback, errorCallback);

    function successCallback() {
      return
    }

    function errorCallback() {
      return
    }
  

  }




}