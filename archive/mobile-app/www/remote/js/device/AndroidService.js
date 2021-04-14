angular
.module('sharedServices')
.factory('AndroidService', [
  '$rootScope',
  '$state',
	'$cordovaPush',
	'Geolocation',
  'University',
  'Major',
  'Skill',
  'Profession',
	AndroidService
	]);

function AndroidService($rootScope, $state, $cordovaPush,
  Geolocation, University, Major, Skill, Profession) {

	return {
		ready: ready
	}

	function ready() {
		var androidConfig = {
      "senderID": "413826461390",
      'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
    }

    //check out the newer one https://github.com/phonegap/phonegap-plugin-push
    // or actually this one: https://github.com/berthnipub/phonegap-plugin-push
    // which is compatible with crosswalk and the latest cordova/android versions
    // current plugin is deprecated and no longer maintained.

      // $cordovaPush.register(androidConfig).then(function(deviceToken) {
      //   return
      // }, function(err){
      //   console.error(err);
      // });
      // $rootScope.$on('pushNotificationReceived', function(event, notification) {
      //   CordovaPushWrapper.received($rootScope, event, notification);
      //   if ($scope.user && $scope.user.id) {
      //     payload = {
      //       'push_notifications': true,
      //       'push_notifications_enabled': true
      //     }
      //     $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
      //   }
      // });

      if(cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      //grab geolocation super early for android devices
	}

}