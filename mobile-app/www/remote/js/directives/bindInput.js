angular.module('uguru.directives')
.directive('bindInput', function($timeout, Utilities, Major, Course, University) {

	function link($scope, elem, attr) {

		var model, getSource;

		switch(attr.bindInput){
			case 'majors':
				model = 'search_text.major';
				getSource = function() {
					return University.majors;
				}
				break;
			case 'courses':
				model = 'search_text.course';
				getSource = function() {
					return $scope.$parent.coursesSource;
					//return University.getTargetted()[0].popular_courses;
				}
				break;
		}

		var queryPromise = null;
		$scope.$parent.$watch(
			model,
			function(newValue, oldValue) {

			  if(newValue.length < oldValue.length) {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      $scope.listScope = Utilities.nickMatcher(newValue, getSource(), 'name');
			      queryPromise = null;
			    }, 90);
			  }

			  else if(newValue.length === 1) {

			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      $scope.listScope = Utilities.nickMatcher(newValue, getSource(), 'name');
			      queryPromise = null;
			    }, 50);
			  }

			  else {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      $scope.listScope = Utilities.nickMatcher(newValue, getSource(), 'name');
			      queryPromise = null;

			    }, 50);
			  }
			}
		);
	}

	return {
		scope: {
			listScope: '=bindInput'
		},
		link: link,
		restrict: 'A'
	}

})




