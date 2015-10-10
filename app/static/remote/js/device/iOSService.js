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

		showStatusBar();
		hide(hideSplashScreen(1000));

		if(cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}



	}

	function showStatusBar() {
		if(window.StatusBar) {
			StatusBar.overlaysWebView(false);
			StatusBar.styleLightContent();
			StatusBar.hide();
		}
	}

	function hideSplashScreen(delay) {
		delay = delay || 0;

		$timeout(function() {
			if (navigator.splashscreen && navigator.splashscreen.hide) {
            	navigator.splashscreen.hide();
        	}
		}, delay)
	}

	function showSplashScreen() {
		delay = delay || 0;

		$timeout(function() {
			if (navigator.splashscreen && navigator.splashscreen.show) {
            	navigator.splashscreen.show();
        	}
		}, delay)
	}

	function enableGPS() {
	    if (!Settings.get('locationMode')) {
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