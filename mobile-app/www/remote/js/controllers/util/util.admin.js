angular.module('uguru.util.controllers')

.controller('AdminController', [

	'$scope',
	'$state',
	'$stateParams',
	'AdminContent',
	function($scope, $state, $stateParams, AdminContent) {

		$scope.page = {
			layout: AdminContent.getMainLayout(),
			glossary: AdminContent.getGlosseryContent(),
			team_members: AdminContent.getMembers(),
			components: AdminContent.getComponents()
		}

		$scope.selected_component = $scope.page.components[0];
	}

]);