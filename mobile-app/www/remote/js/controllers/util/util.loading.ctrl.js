angular.module('uguru.util.controllers')

.controller('PageLoadingController', [

	'$scope',
	'$state',
	'$stateParams',
	'CounterService',
	'$timeout',
	function($scope, $state, $stateParams, CounterService, $timeout) {
		var defaultLoaderSeconds = 5;



		$timeout(function() {
			var loadingPageCounter = CounterService.initCounter('loading-counter', 1.0, 100.0, 5);
			loadingPageCounter.start();
		}, 500)


	}

]);