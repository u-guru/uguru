angular.module('uguru.directives')
.directive('bufferedScroll', function ($parse, $timeout) {
	return function ($scope, element, attrs) {
		var handler = $parse(attrs.bufferedScroll);
		angular.element(element).bind('scroll', function () {
			var scrollTop = element[0].scrollTop;
			var scrollHeight = element[0].scrollHeight;
			var offsetHeight = element[0].offsetHeight;
			if(scrollTop >= ((scrollHeight - offsetHeight)*0.65)) {
				$timeout(function() {
					handler($scope);
				});
				// $scope.$apply(function() {
				// 	handler($scope);
				// });
			}
		});
	};
})




