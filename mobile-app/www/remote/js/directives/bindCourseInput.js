angular.module('uguru.directives')
.directive('bindCourseInput', function($timeout, Utilities) {

	function link($scope, elem, attr) {
		var queryPromise = null;
		$scope.$watch(
		'search_text.course',
		function(newValue, oldValue) {

		  if(newValue.length < oldValue.length) {
		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.courses = Utilities.nickMatcher(newValue, $scope.originalCourses, 'name');
		      queryPromise = null;
		    }, 90);
		  }

		  else if(newValue.length === 1) {

		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.courses = Utilities.nickMatcher(newValue, $scope.originalCourses, 'name');
		      queryPromise = null;
		    }, 50);
		  }

		  else {
		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.courses = Utilities.nickMatcher(newValue, $scope.originalCourses, 'name');
		      queryPromise = null;

		    }, 50);
		  }
		}

		);

	}

	return {
		link: link,
		restrict: 'A'
	}

})




