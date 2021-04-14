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
	'$timeout',
	'$state',
	iOSService
	]);

function iOSService($rootScope, $state, $localstorage, $cordovaPush,
  Geolocation, Settings, Popup, $timeout, $state) {

	return {
		ready: ready,
		showStatusBar: showStatusBar,
		enableGPS: enableGPS,
		setStatusBarText:setStatusBarText,
		setStatusBarLightText:setStatusBarLightText,
		setStatusBarDarkText:setStatusBarDarkText
	}

	function ready() {


		// hideSplashScreen(1000);
		$timeout(function() {
			showStatusBar();
		}, 3000)



		if( cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(false);
			// cordova.plugins.Keyboard.disableScroll(true);
		}




	}

	function showStatusBar() {
		if(window.StatusBar) {
			window.StatusBar.show();
			window.StatusBar.overlaysWebView(true);
			setStatusBarText($state.current.name); //light
		}
	}

	function hideStatusBar() {
		if (window.StatusBar) {
			window.StatusBar.hide();
		}
	}

	function setStatusBarText(state_name) {
		if(!window.StatusBar) {
			return;
		}

		darkStates = ['root.home'];
		darkStateIndex = darkStates.indexOf(state_name);

		if (darkStateIndex == -1) {
				window.StatusBar.styleLightContent();
		}
		else {
				window.StatusBar.styleDefault();
		}
	}

	function setStatusBarLightText() {
		if(!window.StatusBar) {
			return;
		}
		window.StatusBar.styleLightContent();
	}

	function setStatusBarDarkText() {
		if(!window.StatusBar) {
			return;
		}
		window.StatusBar.styleDefault();
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
	          Settings.location = false;
	          // UNCOMMENT
	          // if ($state.current.name !== 'root.onboarding-location') {
	          //   $scope.user.updateObj($scope.user, 'devices', $scope.user.current_device, $scope);
	          // }
	          // failureCallback($scope, $state);
	        },
	        onSuccess: function() {
	          Settings.location = true;
	          Geolocation.getCurrentPosition();
	        },
	      })
	    }
	}

}