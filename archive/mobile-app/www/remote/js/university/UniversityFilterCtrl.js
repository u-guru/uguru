angular.module('uguru.util.controllers')
.controller('UniversityFilterCtrl', [
	'$scope',
	'UniversityMatcher',
	UniversityFilterCtrl
	])
.directive('bnLineItem', bnLineItem)
.directive('filterLineItem', filterLineItem);

function UniversityFilterCtrl($scope, UniversityMatcher) {

	$scope.isExcludedByFilter = applySearchFilter();
	$scope.$watch(
	  "search_text.university", 
	  function(newValue, oldValue) {
	    if (newValue === oldValue) {
	      return;
	    }
	    
	    applySearchFilter();
	  }
	);
	function applySearchFilter() {
		
		var filter = $scope.search_text.university.toLowerCase();
		var check = null;

		if(filter.length === 0) {
			var list = UniversityMatcher.cachedMatch("");
			if($scope.university.$index > 5) {
				$scope.isExcludedByFilter;
			}
		} else {
			var name = $scope.university.name.toLowerCase();
			var list = UniversityMatcher.cachedMatch(filter);
			
			for(var i=0; i<list.length; i++) {
				if (name === list[i].name) {
					check = true;
				} 
			}
			if (check !== true) {
				$scope.isExcludedByFilter = true;
			}	
		}
		
	}





	// $scope.isExcludedByFilter = applySearchFilter();
	// $scope.$watch(
	//   "search_text.university", 
	//   function(newValue, oldValue) {
	//     if (newValue === oldValue) {
	//       return;
	//     }
	//     applySearchFilter();
	//   }
	// );
	// function applySearchFilter() {
	//   var filter = $scope.search_text.university.toLowerCase();
	//   var name = $scope.university.name.toLowerCase();
	//   var isSubstring = ( name.indexOf(filter) !== -1 );

	//   if(!isSubstring) {
	//   	$scope.isExcludedByFilter = true;
	//   }
	//   //$scope.isExcludedByFilter = ! isSubstring;
	// }
}


function bnLineItem() {
	function link($scope, element, attributes) {
		// console.log("Linked: " + $scope.university.name );
	}
	return ({
		link: link,
		restrict: "A"
	});
}


function filterLineItem() {
	function link($scope, element, attributes) {

	}
}



