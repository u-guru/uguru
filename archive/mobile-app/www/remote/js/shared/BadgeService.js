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
        cordova.plugins.notification.badge.set(number);
    }

    if(DeviceService.isIOS() && DeviceService.doesCordovaExist()){
        PushService.setIOSBadge(number);
    }
    
  }

  function clear() {
    cordova.plugins.notification.badge.clear();
  }









}