angular.module('uguru.util.controllers')

.controller('TimelineController', [

	'$scope',
	'$state',
	'$stateParams',
	'Restangular',
	'User',
	'$ionicSideMenuDelegate',
	'LoadingService',
	'$timeout',
	'University',
	'TimelineService',
	function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout, University, TimelineService) {

		//first format by


		$scope.user.timeline_universities = TimelineService.formatUniversitiesByDueDate($scope.user.universities);
		$scope.user.timeline_universities = TimelineService.formatTimelineUniversitiesForHSStudent($scope.user.timeline_universities);
		$scope.header = {
			timestamp: TimelineService.todaysDateShortFormat()
		}



	}

]);