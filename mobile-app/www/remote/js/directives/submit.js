angular.module('uguru.directives')
.directive('submit', function ($parse, DeviceService, $timeout) {

	function link ($scope, element, attr) {

		angular.element(element).bind('keyup', exec);
		var handler = $parse(attr.submit);

		function exec(e) {

			var key = e.keyCode || e.key || e.which;
			if (key === 13) {

				if (DeviceService.doesCordovaExist()) {
				  cordova.plugins.Keyboard.close();
				}
				$timeout(function() {
					handler($scope);
				}, 0);
				// $scope.$apply(function() {
				// handler($scope);
				// });
			}
			e.stopPropagation();
			e.preventDefault();
		}
	}

	return {
		link: link,
		restrict: 'A'
	}

});