angular.module('uguru.directives')
.directive('keyboardFocus', function (DeviceService) {

	function link ($scope, element, attr) {

		angular.element(element).bind('click', exec);

		function exec(e) {
			element.focus();
		}
	}

	return {
		link: link,
		restrict: 'A'
	}

});