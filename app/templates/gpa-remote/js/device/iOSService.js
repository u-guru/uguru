angular
.module('sharedServices')
.factory('iOSService', [
	'$rootScope',
	'$state',
	'$localstorage',
	'$cordovaPush',
	'Settings',
	'$timeout',
	'$state',
	iOSService
	]);

function iOSService($rootScope, $state, $localstorage, $cordovaPush,
  Settings, $timeout, $state) {

	return {
		ready: ready,
		showStatusBar: showStatusBar,
		setStatusBarText:setStatusBarText,
		setStatusBarLightText: setStatusBarLightText,
		setStatusBarDarkText: setStatusBarDarkText,
	}

	function ready() {


		// hideSplashScreen(1000);
		$timeout(function() {
			showStatusBar();
		}, 3000)



		if( cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
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

	function setStatusBarLightText() {
		if(!window.StatusBar) {
			console.log('no status bar detected');
			return;
		}
		window.StatusBar.styleLightContent();
	}

	function setStatusBarDarkText() {
		if(!window.StatusBar) {
			console.log('no status bar detected');
			return;
		}
		window.StatusBar.styleDefault();
	}

	function setStatusBarText(state_name) {
		if(!window.StatusBar) {
			console.log('no status bar detected');
			return;
		}

		darkStates = ['root.intro-2'];
		darkStateIndex = darkStates.indexOf(state_name);

		if (darkStateIndex == -1) {
				window.StatusBar.styleLightContent();
		}
		else {
				window.StatusBar.styleDefault();
		}
	}

	function hideSplashScreen(delay) {
		delay = delay || 0;

		$timeout(function() {
			console.log('hidding splash screen')
			if (navigator.splashscreen && navigator.splashscreen.hide) {
				console.log('splash screen detected');
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



}