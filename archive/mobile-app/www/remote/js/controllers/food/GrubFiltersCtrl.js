angular.module('uguru.apps.controllers')
.controller('GrubFiltersCtrl', [
	'$scope',
	GrubFiltersCtrl
	]);


function GrubFiltersCtrl($scope) {


	$scope.addFilter = function(filter) {

		for (var i=0; i<$scope.availableFilters.length; i++) {

			if ($scope.availableFilters[i].name === filter.name) {
				$scope.availableFilters.splice(i, 1);
			}
		}

		$scope.selectedFilters.push(filter);

	};

	$scope.removeFilter = function(filter) {

		for (var i=0; i<$scope.selectedFilters.length; i++) {

			if ($scope.selectedFilters[i].name === filter.name) {
				$scope.selectedFilters.splice(i, 1);
			}
		}

		$scope.availableFilters.push(filter);

	};



}

