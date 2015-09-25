angular.module('cm')
.directive('cacheMoney', function (CacheMoneyService) {
	return {
		restrict: 'AEC',
		scope: {
			imgSrc: '=ngSrc'
		},
		link: function(scope, elem, attrs) {
			var imageSource = scope.imgSrc;


		}

	}
	
})




