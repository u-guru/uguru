angular.module('uguru.util.controllers')

.controller('AdminController', [

	'$scope',
	'$state',
	'$stateParams',
	'AdminContent',
	'CTAService',
	'$timeout',
	'$compile',
	'Restangular',
	'LoadingService',
	'FileService',
	function($scope, $state, $stateParams, AdminContent, CTAService, $timeout, $compile, Restangular, LoadingService, FileService) {
		$scope.page = {
				layout: AdminContent.getMainLayout(),
				glossary: AdminContent.getGlosseryContent(),
				team_members: AdminContent.getMembers(),
				components: [],
				action_items: {},
				containers: AdminContent.getContainers(),
				layouts: AdminContent.getLayouts(),
				user_stories: AdminContent.getUserStories(),
				createObjects: AdminContent.getBaseObjects($scope),
				defaults: {
					tabsIndex: 4,
					sidebarIndex: 2
				},
				toggles: {
					showAddState: false,
					showAddSubstate: false
				}
			}
			// $scope.selected_component = $scope.page.components[4];

		$scope.toggleAddSubstate = false;
		$scope.toggleAddState = false;

		$scope.reference = AdminContent.getReference();

		$scope.elementCTATabOptions = {
			components: ['Demo', 'Attributes', 'States', 'Use Cases', 'Element Map', 'To Do'],
			layouts: ['Demo', 'Attributes', 'States', 'Use Cases', 'Element Map', 'To Do'],
		}


		// launchComponentCTAOnLoad('tabs', $scope.selected_component);

		$scope.initAndLaunchLayoutCTA = function($event, layout) {
			var targetElem = $event.target;
			$scope.selected_layout = layout;


			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-layout';
			CTAService.initSingleCTA('#' + targetElem.id, '#main-admin-content');
		}

		$scope.initAndLaunchDevToolsCTA = function($event) {
			var targetElem = $event.target;
			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-tool';

			CTAService.initSingleCTA('#' + targetElem.id, '#admin', null, ['esc']);
		}

		$scope.initAndLaunchSceneCTA = function($event, scene) {
			var targetElem = $event.target;
			$scope.selected_scene = scene;
			$scope.selectedSceneToggleAdd = false;

			$scope.lastCTABoxTargetElem = targetElem;
			$scope.lastCTABoxTargetElem.id = 'cta-box-selected-scene';

			CTAService.initSingleCTA('#' + targetElem.id, 'body');

			$scope.newScene = {
				description: '',
				name: '',
				estimated_time: 10
			}

			$scope.newSubScene = {
				description: '',
				name: '',
				estimated_time: 10
			}
		}

		function resetInitStateObjects() {
			$scope.newScene = {
				description: '',
				name: '',
				estimated_time: 10
			}
			$scope.newSubScene = {
				description: '',
				name: '',
				estimated_time: 10
			};
			$scope.page.toggles.showAddSubstate = false;
			$scope.page.toggles.showAddState = false;
			$scope.page.toggles.showAddScenario = false;
			$scope.page.toggles.showAddStep = false;
		}

		function reprocessAllElements(response, scope) {
			scope.page.components = response.components;
			scope.page.layouts = response.layouts;
			scope.page.scenes = response.scenes;
			scope.page.moodboard = response.moodboards;
			scope.page.user_stories = response.user_stories;
			scope.page.assets = response.assets;
			scope.page.action_items = response.action_items;
			scope.page.projects = response.projects;
			scope.page.action_items = response.action_items;

			var actionItemsSidebarTabSections = scope.page.layout.sections[0].tabs.options;
			for (var i = 0; i < actionItemsSidebarTabSections.length; i++) {
				var sideBarTabIndex = actionItemsSidebarTabSections[i];
				var memberTitle = sideBarTabIndex.title.toLowerCase();
				if (scope.page.action_items && memberTitle in scope.page.action_items) {
					scope.page.action_items[memberTitle] = response.action_items[memberTitle];
				}
			}
		}

		$scope.createStateElement = function(state, scene, scene_type) {
			LoadingService.showAmbig(5000);

			Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').customPOST(JSON.stringify({state: state, scene: scene, type: scene_type }))
			.then(function(response) {
				LoadingService.showSuccess('Scene ' + state.name + ' successfully saved', 2500);
				resetInitStateObjects();
				// reprocessAllElements(response.plain().admin_components, $scope);
				getAdminElements();
			},  function(err) {
				LoadingService.showMsg("Something went wrong tell Samir", 2500);
			});
		}

		$scope.createSubstateElement = function(substate, state, scene, scene_type) {
			LoadingService.showAmbig(5000);

			Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').customPOST(JSON.stringify({substate: substate, state: state, scene: scene, type: scene_type}))
			.then(function(response) {
				LoadingService.showSuccess('Subscene ' + scene.name + ' successfully saved', 2500);
				resetInitStateObjects();
				// reprocessAllElements(response.plain().admin_components, $scope);
				getAdminElements();
			},  function(err) {
				LoadingService.showMsg("Something went wrong tell Samir", 2500);
			});
		}

		$scope.updateStateField = function(state_field_name, currentValue, state, scene, scene_type) {

			var stateFieldResponse = prompt("Please edit the current value", currentValue);
			if (stateFieldResponse) {
				state[state_field_name] = stateFieldResponse;
				$scope.updateStateElement(state, scene, scene_type, false);
			}

		}

		$scope.updateSubStateField = function(substate_field_name, currentValue, substate, state, scene, scene_type) {

			var substateFieldResponse = prompt("Please edit the current value", currentValue);
			if (substateFieldResponse) {
				substate[substate_field_name] = substateFieldResponse;
				$scope.updateSubStateElement(substate, state, scene, scene_type, false);
			}

		}

		$scope.updateStateElement = function(state, scene, scene_type, is_remove) {
			var action = 'update';
			if (is_remove && !confirm('Are you sure you want to delete state ' + state.name + '? IMPT - this means ALL SUBSTATES WILL BE DELETED. Are you sure?')) {
				return;
			} else if (is_remove) {
				action = 'remove';
			}
			LoadingService.showAmbig(5000);
			Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').customPUT(JSON.stringify({action:action, state: state, scene: scene, type: scene_type}))
			.then(function(response) {
				if (is_remove) {
					LoadingService.showSuccess('State ' + state.name + ' successfully removed', 2500);
				} else {
					LoadingService.showSuccess('State ' + state.name + ' successfully updated', 2500);
				}
				resetInitStateObjects();
				getAdminElements();
			},  function(err) {
				LoadingService.showMsg("Something went wrong tell Samir", 2500);
			});
		}

		$scope.filename = 'layouts/splash.json'

		$scope.updateSubStateElement = function(index, test_state, platform_json, value, filename) {
			// if (platform && scene_type === 'testing') {
			// 	if (platform.test_status === 'fail' || platform.test_status === 'unsure') {
			// 		platform.test_status = 'pass';
			// 		platform.test_client = 'manual';
			// 	} else {
			// 		platform.test_status = 'fail';
			// 		platform.test_client = 'manual';
			// 	}
			// }

			// var action = 'update';
			// if (is_remove && !confirm('Are you sure you want to delete substate ' + substate.name + '?')) {
			// 	return;
			// }  else if (is_remove) {
			// 	action = 'remove';
			// }
			console.log("filename",filename)
			$timeout(function() {
				platform_json.passed = value;
				LoadingService.showAmbig(null, 10000);
				Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').customPUT(JSON.stringify({filename: filename, test_index: index, test_update:platform_json, scene:test_state}))
				.then(function(response) {
					$timeout(function() {
						console.log('response', response)
						LoadingService.hide();
					}, 2500)
					resetInitStateObjects();
					getAdminElements();
				},  function(err) {
					console.log('error', err);
					LoadingService.showMsg("Something went wrong tell Samir", 2500);
				});
			}, 100)
		}

		$scope.initAllPlatformDict = function() {
			browserTypes = ['chrome', 'safari', 'firefox'];
			browserScreens = ['mobile', 'desktop'];
			browserStates = ['small', 'medium', 'large', 'xl'];

			resultArr = [];
			for (var i = 0; i < browserTypes.length; i++) {

				for (var j = 0 ; j < browserScreens.length; j++ ) {
					for (var k = 0; k < browserStates.length; k++) {
						if ( j=== 1 && k===3) {
							continue;
						}
						resultArr.push({
							platform: browserTypes[k],
							screen_size: browserStates[i],
							type: browserScreens[j],
							test_status: 'unsure',
							test_client: 'manual'
						})
					}
				}
			}

			var iosVariants = [{platform: 'ios', type: 'app', screen_size:null}, {platform: 'ios', type: 'safari', screen_size:null}];
			var androidVariants = [{platform: 'android', type: 'app', screen_size:null}, {platform: 'ios', type: 'chrome', screen_size:null}];

			for (var i = 0; i < iosVariants.length; i++) {
				resultArr.push(iosVariants[i]);
			}

			for (var i = 0; i < androidVariants.length; i++) {
				resultArr.push(androidVariants[i]);
			}

			return resultArr;
		}

		$scope.updateCheckMark = function(user, status) {
			LoadingService.showAmbig(null, 10000);
			var firstName = $scope.user.name.split(' ')[0].toLowerCase();
			if (firstName === "asif") {
				firstName = "samir";
			}
			var action_items_str = JSON.stringify({action_items: $scope.page.action_items[firstName]});
			var s3Url = "https://uguru-admin.s3.amazonaws.com/" + firstName + "/actions.json"
			function hideLoader() {
				LoadingService.hide();
				$timeout(function() {
					LoadingService.showMsg('Progress Saved On Server')
				}, 100)

			}
			FileService.postS3JsonFile(action_items_str, firstName, s3Url, hideLoader);
		}

		function getAdminElements() {
			for (var i = 0; i < $scope.page.team_members.length; i++) {
				var indexMember = $scope.page.team_members[i];
				if (indexMember && indexMember.name && indexMember.name !== 'Girls') {
					var firstName = indexMember.name.split(' ')[0].toLowerCase();

					var s3Url = "https://uguru-admin.s3.amazonaws.com/" + firstName + "/actions.json"
					console.log(s3Url);
					function process_url(first_name, resp) {
						var title = first_name[0].toUpperCase + first_name.slice(1, first_name.length);
						$scope.page.action_items[first_name] = resp.action_items;


					}
					FileService.getS3JsonFile(firstName, s3Url, process_url);

				} else {
					continue;
				}


			}

			Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').get().then(function(response) {
				response = JSON.parse(response);

				// $timeout(function() {
				var parsed_components = [];
				for (var i = 0 ; i < response.components.length; i++) {
					var indexComponent = response.components[i];
					if (indexComponent.sample && indexComponent.active) {
						parsed_components.push(indexComponent);
					}
				}

				$scope.page.components = parsed_components;
				$scope.page.layouts = response.layouts;
				$scope.page.scenes = response.scenes;
				$scope.page.moodboard = response.moodboards;
				$scope.page.user_stories = response.user_stories;
				$scope.page.assets = response.assets;
				// $scope.page.action_items = response.action_items;
				$scope.page.projects = response.projects;
				// $scope.page.action_items = response.action_items;

				// console.log('page scenes', $scope.page.scenes);

				// var actionItemsSidebarTabSections = $scope.page.layout.sections[0].tabs.options;
				// for (var i = 0; i < actionItemsSidebarTabSections.length; i++) {
				// 	var sideBarTabIndex = actionItemsSidebarTabSections[i];
				// 	var memberTitle = sideBarTabIndex.title.toLowerCase();
				// 	$scope.page.action_items[memberTitle]= response.action_items[memberTitle];
				// 	console.log('member title', memberTitle, $scope.page.action_items[memberTitle]);
				// }

				$timeout(function() {
					$scope.$apply(function() {})
				});

				$scope.selected_scene = $scope.page.scenes[0];
				// $scope.selected_scene.tabIndex = 2;
				// var modalElem = document.querySelector('#cta-modal-selected-scene');
				// modalElem && modalElem.classList.add('show');
				// $scope.selected_scene = $scope.page.scenes[0];
				// $scope.selected_scene.tabIndex = 2;
				// if ($scope.selected_scene.element_states.testing && $scope.selected_scene.element_states.testing.length) {
				// 	for (var i = 0; i < $scope.selected_scene.element_states.testing.length; i++) {
				// 		var testStateIndex = $scope.selected_scene.element_states.testing[i];
				// 		if (testStateIndex && testStateIndex.substates && testStateIndex.substates.length) {
				// 			for (var j = 0; j < testStateIndex.substates.length; j++) {
				// 				var testSubstateIndex = testStateIndex.substates[j];
				// 				if (testSubstateIndex && (!testSubstateIndex.platforms || !testSubstateIndex.platforms.length)) {
				// 					testSubstateIndex.platforms = $scope.initAllPlatformDict();
				// 				}
				// 			}
				// 		}
				// 	}
				// }



			}, function(err) {
				console.error('error');
			})
		}



		$scope.initAndLaunchAdminItemCTA = function($event) {
			var targetElem = $event.target;
			$scope.adminItemCTAShown = true;
			$scope.lastCTABoxTargetElem = targetElem;
			$scope.admin_item = {
				dropdown_options: {
					index: 0,
					options: ['HTML Element', 'Moodboard', 'Bug Ticket', 'Action Item']
				},
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
				// var targetElem = document.querySelector('#cta-box-admin-item');
				// angular.element(targetElem).triggerHandler('click');
				// var modalElem = document.querySelector('#cta-modal-admin-item');
				// modalElem && modalElem.classList.add('show');
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
			$scope.adminItemCTAShown = false;
			var modalElem = document.querySelector('#cta-modal-admin-item');
			modalElem && modalElem.classList.remove('show');
			// modalElem && modalElem.classList.add('hide');
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

		function initNewBaseObjects() {
			var templateDict = AdminContent.getBaseObjects($scope);
			var templateDictKeys = Object.keys(templateDict);
			var resultObj = {};
			for (var i = 0; i < templateDictKeys.length; i++) {
				var templateIndexKey = templateDictKeys[i]
				var templateIndexObj = templateDict[templateIndexKey];
				resultObj[templateIndexKey] = JSON.parse(JSON.stringify(templateIndexObj));

			}
			return resultObj;
		}


		function getSceneStateStatus(states, elem, elem_type) {
			var resultDict = {
				priority: false,
				total_time: 0,
				time_created: states[0].time_created,
				count: states.length,
				name: elem.name,
				type: elem_type,
				completed: [],
				pending: []
			};
			for (var i = 0; i < states.length; i++) {
				var indexState = states[i];
				if (indexState.completed) {
					resultDict.completed.push(indexState);
				} else
				if (!indexState.completed && indexState.priority) {
					resultDict.pending.push(indexState);
					resultDict.priority = true;
					resultDict.total_time += indexState.estimated_time;
				}
			}
			return resultDict;
		}

		$timeout(function() {
			$scope.page.layout.sidebar.index = $scope.page.defaults.sidebarIndex;
			$scope.page.layout.sections[$scope.page.layout.sidebar.index].tabs.index =  $scope.page.defaults.tabsIndex;
			getAdminElements();

		}, 1000)
	}

]);