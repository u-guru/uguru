angular.module('uguru.util.controllers')

.controller('AdminUniversityController', [

	'$scope',
	'$state',
	'$stateParams',
	'Restangular',
	'University',
	function($scope, $state, $stateParams, Restangular, University) {


		Restangular.one('universities').get().then(function(result) {
			$scope.universities = result.plain()
			$scope.alreadyStartedUniversities = University.filterByAlreadyStarted($scope.universities);

			var universityDistDict = University.getUniversityDateDist($scope.alreadyStartedUniversities);

			$scope.universityDistArr = University.getUniversityDateDistArrFromDict(universityDistDict).reverse();
			console.log($scope.universityDistArr)
		});




	}

]);