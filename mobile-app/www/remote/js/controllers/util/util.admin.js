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
	'$http',
	function($scope, $state, $stateParams, AdminContent, CTAService, $timeout, $compile, Restangular,$http) {
		$scope.page = {
			layout: AdminContent.getMainLayout(),
			glossary: AdminContent.getGlosseryContent(),
			team_members: AdminContent.getMembers(),
			components: [],
			containers: AdminContent.getContainers(),
			layouts: AdminContent.getLayouts(),
			user_stories: AdminContent.getUserStories(),
			createObjects: AdminContent.getBaseObjects($scope),
			defaults: {
				tabsIndex: 0,
				sidebarIndex: 0
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
			// $timeout(function() {
			// 	var targetElem = document.querySelector('#cta-box-selected-layout');
			// 	angular.element(targetElem).triggerHandler('click');
			// 	var modalElem = document.querySelector('#cta-modal-selected-layout');
			// 	modalElem && modalElem.classList.add('show');
			// })
		}

		function createAdminElement(element_details) {

		}

		function getAdminElements() {
			//Jason TRied


			// var TravisPublicToken = 'gHCrtop9ngfe4YygHesf'
			   // var TravisProToken = 'xakhz7UAQCdBXfPWqDJNQg'
			// var headers = 	{
			// 					'Accept' : 'application/vnd.travis-ci.2+json',
			// 					'User-Agent': 'Uguru/tests/1.0.0',
			// 					'Host': 'api.travis-ci.com',
			// 					'Authorization' : 'token '+TravisToken
			// 				}

			// console.log(headers.Authorization)
			// var headers = {
			// 				'Authorization': 'token ' + TravisProToken 
			// 			   }
			// console.log("HEAD",headers)
			// // Restangular.setBaseUrl('https://api.travis-ci.com/')
			// // Restangular.setDefaultHeaders(headers)
			// var reqTravis = Restangular.oneUrl('travis','https://api.travis-ci.com/',headers)
			// Restangular.setDefaultHeaders(headers);
			// // reqTravis.setDefaultHeaders({'Authorization': 'token ' + TravisProToken })
			// reqTravis.one('config').get().then(function(datas)
			// {
			// 	console.log("This is Config",datas.config)
			// })
			
			// reqTravis.one('users').get().then(function(datas)
			// {
			// 	console.log("User",datas.login)
			// 	console.log("User",datas.name)

			// })
			// reqTravis.one('accounts').get().then(function(datas)
			// {
			// 	console.log("accounts",datas)

			// })

			// Restangular.allUrl('travis', 'https://api.travis-ci.com/repos/sinatra/sinatra/builds').getList().then(function(datas)
			// 	{
			// 		console.log("OKAY",datas)
			// 	});

			//GET
			// var baseTravis = Restangular.allUrl('travis', 'https://api.travis-ci.com/').getList();
			// console.log("HIIHI",baseTravis)
			// baseTravis.getList().then(function(data) {
			// 	console.log(baseTravis)
			// });
			// $http({
			// 		method: 'GET',
			// 		url: 'https://api.travis-ci.com/'
			// 		// headers: 
			// 		// 	{
			// 		// 	  'Accept': 'application/vnd.travis-ci.2+json',
			// 		//   	  'Host': 'api.travis-ci.com',
			// 		//   	  'User-Agent': 'Uguru/tests/1.5.3',
			// 		//   	  'Authorization': 'token gHCrtop9ngfe4YygHesf'
			// 		// 	}
			// }).then(function successCallback(response) {
			//     // this callback will be called asynchronously
			//     // when the response is available
			//     console.log("SUC",response)
			//   }, function errorCallback(response) {
			//     // called asynchronously if an error occurs
			//     // or server returns response with an error status.
			//     console.log("RP",response)

			//   });
			Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('dashboard').get().then(function(response){
                    	// console.log(response);
                    	response = JSON.parse(response);

                    	// $timeout(function() {
                    		// $scope.$apply(function() {
                    			$scope.page.components = response.components;
		                    	$scope.page.layouts = response.layouts;
		                    	$scope.page.moodboard = response.moodboards;
		                    	$scope.page.user_stories = response.user_stories;
		                    	$scope.page.assets = response.assets;
		                    	$scope.page.action_items = response.action_items;
		                    	$scope.page.projects = response.projects;
                    		// })
                    		// $timeout(function() {
                    		// 	var allDemoElems = document.querySelectorAll('demo')
                    		// 	for (var i = 0; i < allDemoElems.length; i++) {
                    		// 		demoIndexElem = allDemoElems[i];

                    		// 		$compile(demoIndexElem)($scope);

                    		// 	}
                    		// })
                    	// })



                    	console.log(response);
                    }, function(err) {
                    	console.log('error');
                    })
		}



		$scope.initAndLaunchAdminItemCTA = function($event) {
			var targetElem = $event.target;
			$scope.adminItemCTAShown = true;
			$scope.lastCTABoxTargetElem = targetElem;
			$scope.admin_item = {
				dropdown_options: {index: 0, options: ['HTML Element', 'Moodboard','Bug Ticket', 'Action Item']},
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
			console.log('last ctaBox target elem', $scope.lastCTABoxTargetElem);
			$scope.adminItemCTAShown = false;
			var modalElem = document.querySelector('#cta-modal-admin-item');
			console.log(modalElem);
			modalElem && modalElem.classList.remove('show');
			// modalElem && modalElem.classList.add('hide');
			if ($scope.lastCTABoxTargetElem) {
				console.log('modal elem', modalElem);
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

		$timeout(function() {
			$scope.page.layout.sidebar.index = 1 || $scope.page.defaults.sidebarIndex;
			$scope.page.layout.sections[$scope.page.layout.sidebar.index].tabs.index = $scope.page.defaults.tabsIndex;
			getAdminElements();


		}, 1000)
	}

]);