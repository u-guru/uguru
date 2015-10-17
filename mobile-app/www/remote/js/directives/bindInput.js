angular.module('uguru.directives')
.directive('bindInput', function($timeout, Utilities, Major, Course, University, $parse) {

	function link($scope, elem, attr) {

		var model, getSource;

		switch(attr.bindInput){
			case 'majors':
				model = 'search_text.major';
				refreshModel = 'refresh.majors';

				break;
			case 'courses':
				model = 'search_text.course';
				refreshModel = 'refresh.courses';

				break;
		}

		$scope.$parent.$watch(
			refreshModel,
			function(newValue, oldValue) {
				
				if(newValue === 'update') {
					console.log("heard something from " + refreshModel + "!");
					$timeout(function() {
						try {
							$scope.listScope = Utilities.nickMatcher('', $scope.source, 'name', model);	
						} catch(err) {
							console.log("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school.): " + err);
						}
					}, 0);
				}

			}
		);

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
			      try {
			      	$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);	
			      } catch(err) {
			      	console.log("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school.): " + err);
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
		    			$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);
		    		} catch(err) {
		    			console.log("fastmatcher slice error (if it's courses related, make sure we have the actual data for that school): " + err);
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
	    				$scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name', model);
		    		} catch(err) {
		    			console.log("fastmatcher slice error (most likely due to not being loaded yet): " + err);
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




