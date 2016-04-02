angular.module('uguru.util.controllers')

.controller('PageLoadingController', [

	'$scope',
	'$state',
	'$stateParams',
	'CounterService',
	'$timeout',
	'$localstorage',
	function($scope, $state, $stateParams, CounterService, $timeout, $localstorage) {
		var defaultLoaderSeconds = 5;

	    if ($stateParams.universityObj) {
	      $scope.university = $scope.universityObj;
	    }
	    if ($scope.root.vars.university && !$stateParams.universityObj) {
	      $scope.university = $scope.root.vars.university;
	    }

	    $timeout(function() {
	      var localCacheUniversity = $localstorage.getObject('university');
	      if (localCacheUniversity) {
	        $scope.university = localCacheUniversity;
	        $scope.root.vars.university = localCacheUniversity
	      }
	    });

		$timeout(function() {
			var loadingElem = document.getElementById('loading-counter');
			var loadingPageCounter = CounterService.initCounter(loadingElem, 1.0, 100.0, 5, '%');
			loadingPageCounter.start();
		}, 500)


	}

]);