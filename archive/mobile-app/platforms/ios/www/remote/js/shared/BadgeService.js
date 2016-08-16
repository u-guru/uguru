angular
.module('sharedServices')
.factory("BadgeService", [
  'DeviceService',
  'PushService',
  BadgeService
	]);

function BadgeService(DeviceService, PushService) {


  return {

    set: set,
    clear: clear

  }

  function set(number) {

    if(!DeviceService.isIOS() && DeviceService.doesCordovaExist()) {
        console.log("Detected non IOS device for Badge Service, running the default plugin");
        console.log("Setting badge count of " + number + " to the app icon.");
        cordova.plugins.notification.badge.set(number);
    }

    if(DeviceService.isIOS() && DeviceService.doesCordovaExist()){
        console.log("Detected IOS device for Badge Service, using the push plugin instead.");
        PushService.setIOSBadge(number);
    }
    
  }

  function clear() {
    console.log("Clearing badge count.");
    cordova.plugins.notification.badge.clear();
  }









}