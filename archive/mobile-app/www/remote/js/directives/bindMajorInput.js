angular.module('uguru.directives')
.directive('bindMajorInput', function($timeout, Utilities, Major, University) {

	function link($scope, elem, attr) {
		var queryPromise = null;
		$scope.$watch(
		'search_text.major',
		function(newValue, oldValue) {
			var allMajors = University.majors || Major.getGeneral()

		  if(newValue.length < oldValue.length) {
		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.majors = Utilities.nickMatcher(newValue, allMajors);
		      queryPromise = null;
		    }, 90);
		  }

		  else if(newValue.length === 1) {

		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.majors = Utilities.nickMatcher(newValue, allMajors);
		      queryPromise = null;
		    }, 50);
		  }

		  else {
		    if(queryPromise) {
		      $timeout.cancel(queryPromise);
		    }
		    queryPromise = $timeout(function() {
		      $scope.majors = Utilities.nickMatcher(newValue, allMajors);
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




