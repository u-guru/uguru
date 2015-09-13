angular.module('cm')
.directive('cacheMoney', function (CacheMoneyService) {
	return {
		restrict: 'AEC',
		scope: {

		},
		link: function(scope, elem, attrs) {


			attrs.$observe('ngSrc', function(src) {

				CacheMoney.isCached(src, function(path, success) {
					if(success) {
						CacheMoney.useCachedFile(el);
					} else {
						CacheMoney.cacheFile(src, function() {
							CacheMoney.useCachedFile(el);
						});
					}
				});
				
			});
		}

	};
	
});




