angular
.module('sharedServices')
.factory("BadgeService", [
  BadgeService
	]);

function BadgeService() {


  return {

    set: set,
    clear: clear

  }

  function set(number) {
    console.log("Setting badge count of " + number + " to the app icon.");
    cordova.plugins.notification.badge.set(number);

  }

  function clear() {
    console.log("Clearing badge count.");
    cordova.plugins.notification.badge.clear();
  }









}