angular
.module('sharedServices')
.factory("AnimationService", [
	'DeviceService',
	'$timeout',
	AnimationService
		]);

function AnimationService(DeviceService, $timeout) {

	var slideOptions = {
	  "direction"        : "right", // 'left|right|up|down', default 'left' (which is like 'next')
	  "duration"         :  400, // in milliseconds (ms), default 400
	  "slowdownfactor"   :  4, // overlap views (higher number is more) or no overlap (1), default 4
	  "iosdelay"         :  125, // ms to wait for the iOS webview to update before animation kicks in, default 60
	  "androiddelay"     :  175, // same as above but for Android, default 70
	  "winphonedelay"    :  200, // same as above but for Windows Phone, default 200,
	  "fixedPixelsTop"   :  0, // the number of pixels of your fixed header, default 0 (iOS and Android)
	  "fixedPixelsBottom":  0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
	};

	return {
		slide: slide,
		flip: flip
	}

	function slide(direction, slowdownFactor) {
		if(direction !== undefined) slideOptions.direction = direction;
		if(slowdownFactor !== undefined) slideOptions.slowdownFactor = slowdownFactor;
		if(DeviceService.isMobile()) {
			window.plugins.nativepagetransitions.slide(slideOptions, successMsg, errorMsg);
		}
	}

	//customOptions is optional, if none are set then default options will be used
	function flip(customOptions) {

		if(DeviceService.isMobile()) {
	    	var flipOptions = {
		      "direction"      : "right", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
		      "duration"       :  600, // in milliseconds (ms), default 400
		      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
		      "androiddelay"   :  100,  // same as above but for Android, default 70
		      "winphonedelay"  :  150 // same as above but for Windows Phone, default 200
		    };

		    if(typeof customOptions !== 'undefined') {
		    	flipOptions.direction = customOptions.direction;
		    	flipOptions.duration = customOptions.duration;
		    	flipOptions.iosdelay = customOptions.iosdelay;
		    	flipOptions.androiddelay = customOptions.androiddelay;
		    	flipOptions.winphonedelay = customOptions.winphonedelay;
		    }
	      
	  		window.plugins.nativepagetransitions.flip(flipOptions, successMsg, errorMsg);
		        
		} else if(!DeviceService.isMobile()) {
			// var pane = document.querySelectorAll('body')[0];
			// pane.style.transition = '3s';
			// if(pane.style.transform!=='rotateY(360deg)'){
			// 	pane.style.transform = 'rotateY(360deg)';
			// } else pane.style.transform = 'rotateY(0deg)';


			var pane = document.querySelectorAll('body')[0];
			
				pane.style.transition = '1s';
				pane.style.transform = 'rotateY(90deg)';

				$timeout(function() {
					pane.style.transition = '0s';
					pane.style.transform = 'rotateY(-90deg)';

					$timeout(function() {
						pane.style.transition = '1s';
						pane.style.transform = 'rotateY(0deg)';
					}, 100);
				}, 1100);

		}
	}

	function successMsg() {
	}

	function errorMsg(error) {
		console.log("Error with AnimationService: " + error);
	}

}






