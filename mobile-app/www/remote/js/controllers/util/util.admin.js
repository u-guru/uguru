angular.module('uguru.util.controllers')

.controller('AdminController', [

	'$scope',
	'$state',
	'$stateParams',
	'AdminContent',
	'CTAService',
	'$timeout',
	'$compile',
	function($scope, $state, $stateParams, AdminContent, CTAService, $timeout, $compile) {

		$scope.page = {
			layout: AdminContent.getMainLayout(),
			glossary: AdminContent.getGlosseryContent(),
			team_members: AdminContent.getMembers(),
			components: AdminContent.getComponents()
		}


		$scope.selected_component = $scope.page.components[2];

		$scope.initAndLaunchComponentCTA = function($event, component) {
			var targetElem = $event.target;

			$timeout(function() {
				$scope.$apply(function() {
					$scope.selected_component = component;
					// $scope.selected_component.template = angular.element($scope.selected_component.template)[0];
					var demoComponentContainer = angular.element(document.querySelector('#demo-component-template'));
					demoComponentContainer.html($scope.selected_component.template);
					// angular.element($scope.selected_component.template).replaceWith($compile($scope.selected_component.template)($scope));
					$compile(demoComponentContainer.contents())($scope);
				})
			})

			// $compile($scope.selected_component.template.contents())($scope);
			// $compile($scope.selected_component.template.contents())($scope);

			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-component';
			CTAService.initSingleCTA('#' + targetElem.id, '#main-admin-content');
			$timeout(function() {
				var targetElem = document.querySelector('#cta-box-selected-component');
				angular.element(targetElem).triggerHandler('click');

				CTAService.showCTAManually(targetElem.id, function() {
					var modalElem = document.querySelector('#cta-modal-selected-component');
					$timeout(function() {
						modalElem && modalElem.classList.add('show');

					}, 100);
				});

			})
		}

		$scope.hideComponentCTA = function($event) {
			if ($scope.lastCTABoxTargetElem) {
				CTAService.closeCTAManually($scope.lastCTABoxTargetElem.id, function() {
					var modalElem = document.querySelector('#' + $scope.lastCTABoxTargetElem.id.replace('box', 'modal'));
					$scope.lastCTABoxTargetElem.id = null;
					if (modalElem) {
						modalElem.classList.remove('show');
					}
					$timeout(function() {
						$scope.lastCTABoxTargetElem = null;
					}, 500)
				})
				$timeout(function() {
					if ($scope.lastCTABoxTargetElem) {
						$scope.lastCTABoxTargetElem.id = null;
						$scope.lastCTABoxTargetElem = null;
					}
				}, 500)

			}
		}

		$timeout(function() {

		}, 1000)
	}

]);