angular
	.module('sharedServices')
	.factory('LoadingService',

		[
			'$ionicLoading',
			'$timeout',
			LoadingService

		]);

function LoadingService($ionicLoading, $timeout) {

	return {
		show: show,
		hide: hide,
		loadAndShowSuccess:loadAndShowSuccess
	}

	function show(delay, duration, message, scope, callback) {
		if(!message && message !== '') {
			message = 'Saved!';
		}
		scope.ambigLoaderText = message;
		$ionicLoading.show({
	        scope: scope,
	        templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
	        delay: delay,
	        duration: duration
		});

		$timeout(function(){
			callback && callback(delay, duration);
		}, 500 + duration + delay)
	}

	function loadAndShowSuccess(delay, duration, message, scope) {
		var callback = function(delay, duration) {
			showSuccess(delay, duration, message, scope, callback);
		}
		show(0, duration, '', scope, callback);

	}

	function showSuccess(delay, duration, message, scope, callback) {
		hide();
	    message = message || '';
	    scope.successLoaderText = message;
	    $ionicLoading.show({
	        scope: scope,
	        templateUrl: BASE + 'templates/u.loader.success.svg.html',
	        duration: duration || 1000,
	        delay: delay
	    });
    }



	function hide() {
		$ionicLoading.hide();
	}

}