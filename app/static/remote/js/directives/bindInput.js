angular.module('uguru.directives')
.directive('bindInput', function($timeout, Utilities, Major, Course, University, $parse) {

	function link($scope, elem, attr) {

		var model, getSource, property, refreshModel;

		switch(attr.bindInput){
			case 'majors':
				model = 'search_text.major';
				refreshModel = 'refresh.majorsLength';
				property = ['title', 'name', 'abbr', 'code'];
				break;

			case 'courses':
				model = 'search_text.course';

				refreshModel = 'refresh.coursesLength';
				property = ['title', 'name', 'variations'];

				break;
		}

		$scope.$parent.$watch(
			refreshModel,
			function(newValue, oldValue) {
				$timeout(function() {
					try {
						$scope.listScope = Utilities.nickMatcher('', $scope.source, property, model);
					} catch(err) {
						console.error("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school.): " + err);
					}
				}, 0);


				if(newValue === 'update') {
					$timeout(function() {
						try {
							$scope.listScope = Utilities.nickMatcher('', $scope.source, property, model);
						} catch(err) {
							console.error("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school.): " + err);
						}
					}, 0);
				}

			}
		);

		var queryPromise = null;
		$scope.$parent.$watch(
			model,
			function(newValue, oldValue) {
			  if(newValue.length < oldValue.length) {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
			      try {
			      	$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, property, model);
			      } catch(err) {
			      	console.error("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school.): " + err);
			      }

			      queryPromise = null;
			    }, 90);
			  }

			  else if(newValue.length === 1) {

			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
		    		try{
		    			$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, property, model);
		    		} catch(err) {
		    			console.error("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school): " + err);
		    		}

			      queryPromise = null;
			    }, 50);
			  }

			  else {
			    if(queryPromise) {
			      $timeout.cancel(queryPromise);
			    }
			    queryPromise = $timeout(function() {
		    		try{
	    				$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, property, model);
		    		} catch(err) {
		    			console.error("fastmatcher slice error (most likely due to not being loaded yet): " + err);
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




