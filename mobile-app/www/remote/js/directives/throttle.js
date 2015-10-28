angular.module('uguru.directives')
.directive('thrClick', function ($timeout, $parse) {

	function link ($scope, element, attr) {

		angular.element(element).bind('click', exec);

		var handler = $parse(attr.thrClick);
		var threshhold = 500;
		var last, promise;
		
		function exec() {
			var now = Date.now();
			if (last && now < last + threshhold) {
				$timeout.cancel(promise);
				promise = $timeout(function throttleTimeout() {
					last = now;
					$timeout(function() {
						handler($scope);
					}, 0);
					// $scope.$apply(function() {
					//   handler($scope);
					// });
				}, threshhold);
			} else {
				last = now;
				$timeout(function() {
					handler($scope);
				}, 0);
				// $scope.$apply(function() {
				//   handler($scope);
				// });
			}
		}
	}

	return {
		link: link,
		restrict: 'A'
	}

})





