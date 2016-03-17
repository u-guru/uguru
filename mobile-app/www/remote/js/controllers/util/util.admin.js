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
			components: AdminContent.getComponents(),
			user_stories: AdminContent.getUserStories(),
			defaults: {
				tabsIndex: 0,
				sidebarIndex: 1
			}
		}
		$scope.selected_component = $scope.page.components[2];

		$scope.initAndLaunchComponentCTA = function($event, component) {
			var targetElem = $event.target;

			$timeout(function() {
				$scope.$apply(function() {
					$scope.selected_component = component;
					var demoComponentContainer = angular.element(document.querySelector('#demo-component-template'));
					demoComponentContainer.html($scope.selected_component.sample.template);
					console.log(demoComponentContainer);
					$compile(demoComponentContainer.contents())($scope);
				})
			})

			$timeout(function() {
				$scope.selected_component = component;
				var demo = document.querySelector('#demo-template');
				$compile(demo)($scope);
			}, 1000)

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

		$scope.initAndLaunchAssetCTA = function($event, asset) {
			var targetElem = $event.target;
			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-asset-action';
			$scope.selected_asset = asset;
			CTAService.initSingleCTA('#' + targetElem.id, '#main-admin-content');
			$timeout(function() {
				var targetElem = document.querySelector('#cta-box-selected-asset-action');
				angular.element(targetElem).triggerHandler('click');

				CTAService.showCTAManually(targetElem.id, function() {
					var modalElem = document.querySelector('#cta-modal-selected-assect-action');
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
			$scope.page.layout.sidebar.index = $scope.page.defaults.sidebarIndex;
			$scope.page.layout.sections[$scope.page.layout.sidebar.index].tabs.index = $scope.page.defaults.tabsIndex;
		}, 1000)
	}

]);