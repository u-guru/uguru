angular.module('uguru.directives')
.directive('bindInput', function($timeout, Utilities, Major, Course, University) {

	function link($scope, elem, attr) {

		var model, getSource;

		switch(attr.bindInput){
			case 'majors':
				model = 'search_text.major';
				//$scope.source = University.majors;
				// getSource = function() {
				// }
				break;
			case 'courses':
				model = 'search_text.course';
				// getSource = function() {
				// 	return $scope.$parent.coursesSource;
				// 	//return University.getTargetted()[0].popular_courses;
				// }
				break;
		}

		var queryPromise = null;
		$scope.$parent.$watch(
			model,
			function(newValue, oldValue) {
				 console.log("its changed!");

			  if(newValue.length < oldValue.length) {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);
			      queryPromise = null;
			    }, 90);
			  }

			  else if(newValue.length === 1) {

			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);
			      queryPromise = null;
			    }, 50);
			  }

			  else {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
		    		try{
	    				$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);		
		    		} catch(err) {
		    			console.log("fastmatcher slice error (most likely due to not being loaded yet): " + err)
		    		}
			      
			      queryPromise = null;

			    }, 50);
			  }
			}
		);
	}

	return {
		scope: {
			listScope: '=bindInput',
			source: '=source'
		},
		link: link,
		restrict: 'A'
	}

})




