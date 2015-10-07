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
      // UNCOMMENT THIS
      // $cordovaPush.register(androidConfig).then(function(deviceToken) {
      //   console.log('android notifications', deviceToken);
      // }, function(err){
      //   console.log(err);
      // });
      console.log('Extra #2. Android push notifications need to be registered')
      $rootScope.$on('pushNotificationReceived', function(event, notification) {
        CordovaPushWrapper.received($rootScope, event, notification);
        console.log('android notifications registered',event, notification);
        if ($scope.user && $scope.user.id) {
          payload = {
            'push_notifications': true,
            'push_notifications_enabled': true
          }
          $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
        }
      });

      if(cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      //grab geolocation super early for android devices
      // UNCOMMENT THIS
      // $rootScope.on_app_open_retrieve_objects($rootScope, $state, $localstorage, University, null, Geolocation,
      //   Major, Skill, Profession);
	}

}