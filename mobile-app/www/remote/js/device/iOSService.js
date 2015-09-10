angular
.module('sharedServices')
.factory('iOSService', [
	'$rootScope',
	'$state',
	'$localstorage',
	'$cordovaPush',
	'Geolocation',
	'Settings',
	'Popup',
	iOSService
	]);

function iOSService($rootScope, $state, $localstorage, $cordovaPush,
  Geolocation, Settings, Popup) {

	return {
		ready: ready,
		showStatusBar: showStatusBar,
		enableGPS: enableGPS
	}

	function ready() {
	    if(window.StatusBar) {
			StatusBar.styleLightContent();
			StatusBar.hide();
		}
		if(cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(StatusBar) {
			StatusBar.styleDefault();
			StatusBar.overlaysWebView(true);
		}
	}

	function showStatusBar() {
		if(window.StatusBar) {
			StatusBar.styleLightContent();
			StatusBar.show();
		}
	}

	function enableGPS() {
	    if (!Settings.location) {
	      Popup.options.show($rootScope, {
	        header: 'Mind if we use your location?',
	        body: 'uGuru uses your location to match you up with students on campus.',
	        positiveBtnText: 'SURE',
	        negativeBtnText: 'NO THANKS',
	        delay: 500,
	        onFailure: function() {
	          console.log('failed to get device location');
	          Settings.location = false;
	          // UNCOMMENT
	          // if ($state.current.name !== 'root.onboarding-location') {
	          //   $scope.user.updateObj($scope.user, 'devices', $scope.user.current_device, $scope);
	          // }
	          // failureCallback($scope, $state);
	        },
	        onSuccess: function() {
	          console.log('succeeded in getting device location');
	          Settings.location = true;
	          Geolocation.getCurrentPosition();
	        },
	      })
	    }
	}

}