angular
	.module('sharedServices')
	.factory('LoadingService', ['$ionicLoading', LoadingService]);

function LoadingService($ionicLoading) {

	return {
		show: show,
		hide: hide
	}

	function show(delay, duration, message) {
		if(!message) {
			message = 'Saved!';
		}
		console.log("ionicLoading.show()");
		$ionicLoading.show({
	 		//template: '<span id="E2E-msg" value="' + message + '" class="capitalized">'  + message + '</span>',
	        template: message,
	        delay: delay,
	        duration: duration
		});
	}

	function hide() {
		$ionicLoading.hide();
	}

}