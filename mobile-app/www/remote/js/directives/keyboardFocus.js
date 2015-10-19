angular.module('uguru.directives')
.directive('keyboardFocus', function (DeviceService, $timeout) {

	function link ($scope, element, attr) {

		angular.element(element).bind('click', callback);

		function callback(e) {
			var input = element[0].querySelector('input');
			$timeout(function() {
				input.focus();
			}, 0);
			
		}
	}

	return {
		link: link,
		restrict: 'A'
	}

});