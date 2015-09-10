angular.module('uguru.directives')
.directive('bufferedScroll', function ($parse) {
	return function ($scope, element, attrs) {
		var handler = $parse(attrs.bufferedScroll);
		console.log("directive element: " + element);
		angular.element(element).bind('scroll', function () {
			var scrollTop = element[0].scrollTop;
			var scrollHeight = element[0].scrollHeight;
			var offsetHeight = element[0].offsetHeight;
			if(scrollTop === (scrollHeight - offsetHeight)) {
				$scope.$apply(function() {
					handler($scope);
				});
			}
		});
	};
})
// .directive('scrollToTop', function ($parse) {
// 	return function ($scope, element, attrs) {
// 		var handler = $parse(attrs.scrollToTop);
// 		console.log("directive element: " + element);
// 		angular.element(element)[0].scrollTop = 0;
// 	};
// })

// .directive('scrollToTop', function ($parse) {
// 	return {
// 		scope: {
// 			add: '&',
// 		},
// 		link: function(scope, elem) {
// 			scope.$watch('trigger', function() {
// 				angular.element(element)[0].scrollTop = 0;
// 			});
// 		}
// 	};
// })



