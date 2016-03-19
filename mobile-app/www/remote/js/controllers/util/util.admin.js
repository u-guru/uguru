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
			layouts: AdminContent.getLayouts(),
			user_stories: AdminContent.getUserStories(),
			defaults: {
				tabsIndex: 0,
				sidebarIndex: 1
			}
		}
		// $scope.selected_component = $scope.page.components[4];

		$scope.elementCTATabOptions = {
			components: ['Demo', 'Attributes', 'States', 'Use Cases', 'Element Map', 'To Do'],
			layouts: ['Demo', 'Attributes', 'States', 'Use Cases', 'Element Map', 'To Do'],
		}


		// launchComponentCTAOnLoad('tabs', $scope.selected_component);

		$scope.initAndLaunchLayoutCTA = function($event, layout) {
			var targetElem = $event.target;
			$scope.selected_layout = layout;
			// $scope.selected_layout = layout;
			// $timeout(function() {
			// 	$scope.$apply(function() {
			// 		$scope.selected_component = component;
			// 		var demoComponentContainer = angular.element(document.querySelector('#demo-component-template'));
			// 		demoComponentContainer.html($scope.selected_component.sample.template);
			// 		console.log(demoComponentContainer);
			// 		$compile(demoComponentContainer.contents())($scope);
			// 	})
			// })

			// $timeout(function() {
			// 	$scope.selected_component = component;
			// 	var demo = document.querySelector('#demo-template');
			// 	$compile(demo)($scope);
			// }, 1000)

			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-layout';
			CTAService.initSingleCTA('#' + targetElem.id, '#main-admin-content');
			$timeout(function() {
				var targetElem = document.querySelector('#cta-box-selected-layout');
				angular.element(targetElem).triggerHandler('click');
				var modalElem = document.querySelector('#cta-modal-selected-layout');
				modalElem && modalElem.classList.add('show');
			})
		}

		$scope.initAndLaunchAdminItemCTA = function($event) {
			var targetElem = $event.target;
			$scope.adminItemCTAShown = true;
			$scope.lastCTABoxTargetElem = targetElem;
			$scope.admin_item = {
				dropdown_options: {index: 3, options: ['Milestone', 'Element Revision', 'New Element or Asset', 'New Action Item', 'New Revision']},
				options: {
					element: {
						type: ['Component', 'Container', 'Layouts', 'User Stories', 'Assets'],
						name: '', // text input field
						description: [], // text input / textarea
						moodboard_refs: [], //
						components_within: [],
						tags: [],
					},
					moodboard: {
						name: '',
						reference_url: '',
						best_part: ['Component', 'Container', 'Layouts', 'User Stories', 'Assets'],
						description: '', // text input / textarea
						tags: []
					},
					element_revision: {
						select_element: ['Component', 'Container', 'Layouts', 'User Stories', 'Assets'],
						reference: {
							codepen_input_field: '',
							describe_bug_textarea: '',
						}
					},
					new_action_item: {
						select_section: ['Moodboard', 'Reference', 'Elements', 'Tools'],
						select_subsection: [], //another subdropdown
						description: '', //textarea
						tags: '', //textarea
						priority: 3, // (1 -- highest, 3 lowest)
						assign_to: [], //team members array or something easy to click
					},
					new_revision: {
						name: '',
						description: '',
						has_subsections: false
						//pretty open ended
					}
				}
			}

			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-admin-item';
			CTAService.initSingleCTA('#' + targetElem.id, 'body');
			$timeout(function() {
				var targetElem = document.querySelector('#cta-box-admin-item');
				angular.element(targetElem).triggerHandler('click');
				var modalElem = document.querySelector('#cta-modal-admin-item');
				modalElem && modalElem.classList.add('show');
			})
		}

		$scope.initAndLaunchComponentCTA = function($event, component) {
			var targetElem = $event.target;
			$scope.selected_component = component;
			// $timeout(function() {
			// 	$scope.$apply(function() {
			// 		$scope.selected_component = component;
			// 		var demoComponentContainer = angular.element(document.querySelector('#demo-component-template'));
			// 		demoComponentContainer.html($scope.selected_component.sample.template);
			// 		console.log(demoComponentContainer);
			// 		$compile(demoComponentContainer.contents())($scope);
			// 	})
			// })

			// $timeout(function() {
			// 	$scope.selected_component = component;
			// 	var demo = document.querySelector('#demo-template');
			// 	$compile(demo)($scope);
			// }, 1000)

			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-component';
			CTAService.initSingleCTA('#' + targetElem.id, '#main-admin-content');
			$timeout(function() {
				var targetElem = document.querySelector('#cta-box-selected-component');
				angular.element(targetElem).triggerHandler('click');
				var modalElem = document.querySelector('#cta-modal-selected-component');
				modalElem && modalElem.classList.add('show');
				// CTAService.showCTAManually(targetElem.id, function() {

				// 	$timeout(function() {
				// 		modalElem && modalElem.classList.add('show');

				// 	}, 100);
				// });

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

		$scope.hideAdminItemCTA = function($event) {
			if ($scope.lastCTABoxTargetElem) {
				$scope.adminItemCTAShown = false;
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

		// function launchComponentCTAOnLoad(ref_id, component) {
		// 	$timeout(function() {
		// 		$scope.$on('$ionicView.enter', function() {
		// 			var componentSelectedElem = document.querySelector('#component-' + ref_id);
		// 			$scope.initAndLaunchComponentCTA({target: componentSelectedElem}, component)
		// 		})
		// 	})
		// }

		$scope.hideLayoutCTA = function($event) {
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


			var adminItemElem = document.querySelector('#cta-box-admin-item');
			angular.element(adminItemElem).triggerHandler('click');

		}, 1000)
	}

]);