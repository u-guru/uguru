angular
.module('sharedServices')
.factory("AnimationService", [
	'DeviceService',
	'$timeout',
	AnimationService
		]);

function AnimationService(DeviceService, $timeout) {

	return {
		flip: flip
	}

	//customOptions is optional, if none are set then default options will be used
	function flip(customOptions) {

		if(DeviceService.isMobile()) {
	    	var options = {
		      "direction"      : "right", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
		      "duration"       :  600, // in milliseconds (ms), default 400
		      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
		      "androiddelay"   :  100,  // same as above but for Android, default 70
		      "winphonedelay"  :  150 // same as above but for Windows Phone, default 200
		    };

		    if(typeof customOptions !== 'undefined') {
		    	options.direction = customOptions.direction;
		    	options.duration = customOptions.duration;
		    	options.iosdelay = customOptions.iosdelay;
		    	options.androiddelay = customOptions.androiddelay;
		    	options.winphonedelay = customOptions.winphonedelay;
		    }
	      
	  		window.plugins.nativepagetransitions.flip(
		        options,
		        function (msg) {console.log("success: " + msg)}, // called when the animation has finished
		        function (msg) {alert("error: " + msg)} // called in case you pass in weird values
	      	);	
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

}