angular.module('uguru.directives')
.directive('keyboardFocus', function (DeviceService, $timeout) {

	function link ($scope, element, attr) {

		angular.element(element).bind('click', callback);

		function callback(e) {
			if(element[0].tagName === 'input') {
				$timeout(function() {
					element[0].focus();
				}, 0);
				e.preventDefault();

			} else {
				var input = element[0].querySelector('input');
				$timeout(function() {
					input.focus();
				}, 0);
				e.preventDefault();
			}


		}
	}

	return {
		link: link,
		restrict: 'A'
	}

});