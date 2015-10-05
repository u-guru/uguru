angular.module('uguru.directives')
.directive('submit', function ($parse) {

	function link ($scope, element, attr) {

		angular.element(element).bind('keyup', exec);
		var handler = $parse(attr.submit);

		function exec(e) {
			var key = e.keyCode || e.key || e.which;
			if (key === 13) {

				if ($scope.platform.mobile) {
				  cordova.plugins.Keyboard.close();
				}
				$scope.$apply(function() {
				handler($scope);
				});
			}
		}
	}

	return {

		link: link,
		restrict: 'A'
	}

})