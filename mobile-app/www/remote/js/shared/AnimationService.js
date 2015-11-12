angular
.module('sharedServices')
.factory("AnimationService", [
	'DeviceService',
	'$ionicViewSwitcher',
	'$timeout',
	'uTracker',
	'$state',
	'InAppMapService',
	AnimationService
		]);

function AnimationService(DeviceService, $ionicViewSwitcher, $timeout, uTracker, $state, InAppMapService) {

	var slideOptions = {
	  "direction"        : "right", // 'left|right|up|down', default 'left' (which is like 'next')
	  "duration"         :  200, // in milliseconds (ms), default 400
	  "slowdownfactor"   :  1, // overlap views (higher number is more) or no overlap (1), default 4
	  "iosdelay"         :  125, // ms to wait for the iOS webview to update before animation kicks in, default 60
	  "androiddelay"     :  200, // same as above but for Android, default 70
	  "winphonedelay"    :  200, // same as above but for Windows Phone, default 200,
	  "fixedPixelsTop"   :  0, // the number of pixels of your fixed header, default 0 (iOS and Android)
	  "fixedPixelsBottom":  0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
	};

	return {
		initSlide: initSlide,
		slide: slide,
		flip: flip,
		shakeElem: shakeElem,
		fadeOutElem: fadeOutElem
	}

	function initSlide() {
		if(DeviceService.isMobile() && window.plugins.nativepagetransitions) {
			window.plugins.nativepagetransitions.slide({
				"direction": "right",
				"duration" : 10,
				"slowdownfactor": 1,
				"iosdelay": 10,
				"androiddelay": 10
			}, successMsg, errorMsg);
		}

	}

	function shakeElem(elem, duration, callback) {

	    Velocity(elem, "transition.expandIn", {duration:duration});
	    callback && callback();
	}

	function fadeOutElem(elem, duration) {
		Velocity(elem, "fadeOut", {duration:duration});
	}

	function slide(direction, target, slowdownFactor) {
		if(DeviceService.isMobile()) {
			if(direction !== undefined) slideOptions.direction = direction;
			if(slowdownFactor !== undefined) slideOptions.slowdownFactor = slowdownFactor;
			if(DeviceService.isMobile()) {

				window.plugins.nativepagetransitions.slide(slideOptions, successMsg, errorMsg);
				var start = null;
				var fpsArray = [];
				function step(timestamp) {
				  stats.begin();
				  stats.end();
				  if (!start) start = timestamp;
				  var progress = timestamp - start;
				  fpsArray.push(stats.getFPS());
				  //console.log("FPS: " + stats.getFPS());
				  if(progress < 200) {
				    requestAnimationFrame(step);
				  } else {
				  	var total = 0;
				  	for (var i = 0; i < fpsArray.length; i++) {
				  	  total += fpsArray[i];
				  	}
				  	//we are disregarding the first value since it's most likely 0 due to initial transition
				  	fpsArray.shift();
				  	var meanFPS = Math.round(total / (fpsArray.length));
				  	console.log("meanFPS: " + meanFPS);
				  	//console.log("fpsArray: " + fpsArray);

			  		if(target !== undefined) {
			  			var performance = 'pass';
			  			if(meanFPS < 10) performance = 'fail';
			  			uTracker.track(tracker, target, {
			  			  "$Mean_FPS": meanFPS,
			  			  "$FPS_Array": fpsArray.toString(),
			  			  "$Performance": performance
			  			});
			  		}

				  }

				}
				requestAnimationFrame(step);
				//window.plugins.nativepagetransitions.slide(slideOptions, successMsg, errorMsg);
			}
		}

	}

	//customOptions is optional, if none are set then default options will be used
	function flip(target, customOptions) {

		var pane = document.querySelectorAll('body')[0];

		pane.style.transition = '.400s';
		pane.style.transform = 'rotateY(90deg)';
		pane.style.webkitkitTransition = '.400s';
		pane.style.webkitTransform = 'rotateY(90deg)';

		$timeout(function() {
			pane.style.transition = '0.00s';
			pane.style.transform = 'rotateY(-90deg)';
			pane.style.webkitTtransition = '0.00s';
			pane.style.webkitTransform = 'rotateY(-90deg)';
			$ionicViewSwitcher.nextDirection('none');
			$state.go(target);
			$timeout(function() {
				
				pane.style.transition = '.400s';
				pane.style.transform = 'rotateY(0deg)';
				pane.style.webkitTransition = '.400s';
				pane.style.webkitTransform = 'rotateY(0deg)';
			}, 40);
		}, 440);

	}

	function successMsg() {
	}

	function errorMsg(error) {
		console.log("Error with AnimationService: " + error);
	}

}






