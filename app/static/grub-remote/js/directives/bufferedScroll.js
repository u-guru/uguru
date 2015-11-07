angular.module('uguru.directives')
.directive('bufferedScroll', function ($parse) {
	return function ($scope, element, attrs) {
		var handler = $parse(attrs.bufferedScroll);
		//console.log("inside directive");
		//console.log("directive element: " + element);
		angular.element(element).bind('scroll', function () {
			var scrollTop = element[0].scrollTop;
			var scrollHeight = element[0].scrollHeight;
			var offsetHeight = element[0].offsetHeight;
			if(scrollTop >= ((scrollHeight - offsetHeight)*0.65)) {
				$scope.$apply(function() {
					//console.log("directive handler");
					handler($scope);
				});
			}
		});
	};
})




