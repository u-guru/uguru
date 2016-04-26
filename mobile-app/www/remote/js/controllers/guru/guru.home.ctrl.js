angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruHomeController', [

	//All imported packages go here
	'$scope',
	'$state',
	'$ionicPopup',
	'$timeout',
	'$localstorage',
	'$ionicModal',
	'$ionicTabsDelegate',
	'$cordovaKeyboard',
	'$q',
	'University',
	'$templateCache',
	'$ionicHistory',
	'Popup',
	'$popover',
	'Popover',
	'$ionicBackdrop',
	'User',
	'Camera',
	'$cordovaPush',
	'$ionicViewSwitcher',
	'$cordovaStatusbar',
	'$ionicPlatform',
	'LoadingService',
	function($scope, $state, $ionicPopup, $timeout, $localstorage,
		$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $q,
		University, $templateCache, $ionicHistory, Popup, $popover, Popover,
		$ionicBackdrop, User, Camera, $cordovaPush, $ionicViewSwitcher, $cordovaStatusbar,
		$ionicPlatform, LoadingService) {
		$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
		$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom');
		$scope.base_url = BASE;
		$scope.progress_active = false;

		$ionicPlatform.ready(function() {

			if (window.StatusBar) {
				StatusBar.styleLightContent();
				StatusBar.overlaysWebView(true);
			}

		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/add-course.modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addCourseModal = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.addUniversityModal = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/become-guru.modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.becomeGuruModal = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.supportModal = modal;
		});


		// $scope.registerPushCordova = function () {
		$scope.user.summmer_15 = false;
		$scope.user.uber_friendly = false;

		// }

		$scope.measureCompletedProfile = function(user) {

			var attributes = ['name', 'email', 'majors', 'guru_courses', 'push_notifications', 'guru_description', 'summmer_15', 'uber_friendly', 'profile_url'];
			count = 0;
			if (user.name.length > 0) {
				count += 1;
			}

			if (user.email && user.email.length > 0) {
				count += 1;
			}

			if (user.majors && user.majors.length > 0) {
				count += 1;
			}

			if (user.guru_courses && user.guru_courses.length > 0) {
				count += 1;
			}

			if (user.current_device && user.current_device.push_notif_enabled) {
				count += 1;
			}

			if (user.guru_description && user.guru_description.length > 0) {
				count += 1
			}

			if (user.summer_15) {
				count += 1;
			}

			if (user.uber_friendly) {
				count += 1;
			}


			if (user.profile_url && user.profile_url !== "https://graph.facebook.com/10152573868267292/picture?width=100&height=100") {
				count += 1
			}


			return parseInt((count / attributes.length) * 100);

		}

		$scope.completedProfilePercentage = $scope.measureCompletedProfile($scope.user);


		$scope.registerPush = function() {
			if (!$scope.user.current_device.push_notif_enabled && !$scope.user.current_device.push_notif) {
				// $scope.user.current_device.push_notif_enabled = false;
				$scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
			}

			//if user is turning off push notifications because they are annoyed
			if (!$scope.user.current_device.push_notif_enabled && $scope.user.current_device.push_notif) {
				// $scope.user.current_device.push_notif_enabled = false;
				$scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
			}

			//if user is turning it back on again
			if ($scope.user.current_device.push_notif_enabled && $scope.user.current_device.push_notif) {
				// $scope.user.current_device.push_notif_enabled = true;
				var iosConfig = {
					"badge": true,
					"sound": true,
					"alert": true,
				}

				// $scope.user.current_device.push_notif_enabled = true;
				$cordovaPush.register(iosConfig).then(function(deviceToken) {
					// Success -- send deviceToken to server, and store for future use
					if ($scope.platform.ios) {
						$scope.user.push_notifications = true;
						$scope.user.current_device.push_notif = deviceToken;
						$scope.user.current_device.push_notif_enabled = true;
						$scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
					}

				}, function(err) {
					alert("Please go to your Settings > Notifications > Uguru and 'Allow Notifications'");
				});
			}

			//first time user is turning it on
			if ($scope.user.current_device.push_notif_enabled && !$scope.user.current_device.push_notif) {

				var iosConfig = {
					"badge": true,
					"sound": true,
					"alert": true,
				}

				// $scope.user.current_device.push_notif_enabled = true;
				$cordovaPush.register(iosConfig).then(function(deviceToken) {
					// Success -- send deviceToken to server, and store for future use
					$scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
					if ($scope.platform.ios) {
						$scope.user.push_notifications = true;
						$scope.user.current_device.push_notif = deviceToken;
						$scope.user.current_device.push_notif_enabled = true;
						$scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
					}

				}, function(err) {
					alert("Please go to your Settings > Notifications > Uguru and 'Allow Notifications'");
				});
			}
		}

		$scope.closeKeyboard = function() {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				$cordovaKeyboard.close();
			}
		}

		$scope.allProposals = function() {

		}

		$scope.switchToStudentMode = function() {
			// $ionicHistory.clearHistory();
			$scope.root.vars.recent_switched_modes = true;
			$scope.user.guru_mode = false;
			//Mixpanel Track
			mixpanel.track("Student.home");
			$state.go('^.student-home');
			// var goToGuruHome = function() {
			//   $scope.user.guru_mode = false;
			//   $scope.bottomTabsDelegate.select(1);

			// }
			// $scope.user.updateAttr('guru_mode', $scope.user, false, goToGuruHome, $scope);
		}

		$scope.goToTransferFunds = function() {

			if (!$scope.user.auth_token) {
				$scope.signupModal.show();
			} else {
				//Mixpanel Track
				mixpanel.track("Setting.transfer");
				$state.go('^.settings-transfer');
			}

		}

		$scope.showButtonPressed = function($event, class_name) {
			// $event.target.classList.add('active');
			document.getElementsByClassName(class_name)[0].classList.add('active')
				// $event.target.classList.add('active')
		}

		$scope.showButtonReleased = function($event, class_name) {
			// $event.target.classList.remove('active');
			document.getElementsByClassName(class_name)[0].classList.remove('active')
				// $event.target.classList.add('active')
		}
		$scope.goToIncreaseRanking = function() {
			$ionicViewSwitcher.nextDirection('forward');
			//Mixpanel Track
			mixpanel.track("Guru.verification");
			$state.go('^.guru-verification');
		}

		$scope.goToProfileEdit = function() {
			$ionicViewSwitcher.nextDirection('forward');
			//Mixpanel Track
			mixpanel.track("Guru.profile.edit");
			$state.go('^.guru-profile-edit');
		}


		$scope.goToRequestStatus = function(course) {
			//Mixpanel Track
			mixpanel.track("Reqiest.status");
			$state.go('^.request-status', {
				courseObj: JSON.stringify(course)
			});
		}

		$scope.goToActiveSession = function(session) {
			//Mixpanel Track
			mixpanel.track("Guru.active.session");
			$state.go('^.guru-active-session', {
				sessionObj: JSON.stringify(session)
			});
		}

		$scope.addGreenbar = function() {
			return
		}

		$scope.goToBecomeGuru = function() {
			//Mixpanel Track
			mixpanel.track("Guru.wizard");
			$state.go('^.guru.wizard');
			$timeout(function() {
				$scope.becomeGuruModal.hide();
			}, 300);
		}

		$scope.goToNotifications = function() {
			if (!$scope.user.auth_token) {
				$scope.signupModal.show()
			} else {
				if ($scope.user.guru_mode) {
					//Mixpanel Track
					mixpanel.track("Settings.notifications");
					$state.go('^.settings-notifications');

				} else {
					//Mixpanel Track
					mixpanel.track("Settings.notifications");
					$state.go('^.settings-notifications');
				}
			}
		}

		$scope.goToTransactions = function() {
			if (!$scope.user.auth_token) {
				$scope.signupModal.show()
			} else {
				if ($scope.user.guru_mode) {
					//Mixpanel Track
					mixpanel.track("Settings.notifications");
					$state.go('^.settings-transactions');
				} else {
					//Mixpanel Track
					mixpanel.track("Settings.notifications");
					$state.go('^.settings-transactions')
				}
			}
		}

		$scope.goToCards = function() {
			if (!$scope.user.auth_token) {
				$scope.signupModal.show();
			} else {
				if ($scope.user.guru_mode) {
					//Mixpanel Track
					mixpanel.track("Settings.cards");
					$state.go('^.settings-cards')
				} else {
					//Mixpanel Track
					mixpanel.track("Settings.cards");
					$state.go('^.settings-cards')
				}
			}
		}

		$scope.goToEditProfile = function() {
			if (!$scope.user.auth_token) {
				$scope.signupModal.show()
			} else {
				if ($scope.user.guru_mode) {
					//Mixpanel Track
					mixpanel.track("Settings.profile");
					$state.go('^.settings-profile');
				} else {
					//Mixpanel Track
					mixpanel.track("Settings.profile");
					$state.go('^.settings-profile');
				}
			}
		}

		$scope.clearCache = function() {

			$scope.user = {};
			$localstorage.removeObject('courses');
			$localstorage.removeObject('universities');
			$scope.rootUser.logout($scope.user);
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			window.localStorage.clear();
			$scope.bottomTabsDelegate.select(0);
			alert('Cache Cleared! Please close the app & open again');
		}

		$scope.guruDiscoverabilityChange = function() {
			$scope.rootUser.updateLocal($scope.user);
		}

		$scope.logoutUser = function() {


			LoadingService.showSuccess('You have been successfully logged out!', 1500);
			$localstorage.setObject('user', []);
			$scope.user.updateAttr = User.updateAttrUser;
			$scope.user.createObj = User.createObj;
			$scope.user.updateObj = User.updateObj;
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();

			$timeout(function() {
				$scope.user = User.getLocal();
				$state.go('^.student-home');
			}, 500);


			// $scope.signupModal.show();
			// $localstorage.setObject('user', []);
			// mixpanel.track("Student.home");
		}
		$scope.goToProposalDetails = function(proposal) {
			//Mixpanel Track
			mixpanel.track("Guru.proposal.detail");
			$state.go('^.guru-proposal-details', {
				proposalObj: JSON.stringify(proposal)
			});
		}

		$scope.goToPreviousSessionDetails = function(session) {
			//Mixpanel Track
			mixpanel.track("Previous.session.details");
			$state.go('^.previous-session-details', {
				sessionObj: JSON.stringify(session)
			});
		}

		$scope.showPopupDev = function() {
			// $scope.showTooltip();

			var welcomePopupOptions = {
				header: "Welcome!",
				body: "We'd like your location to help locate a nearby Guru. Allow us to request for your location?",
				positiveBtnText: "Sure!",
				negativeBtnText: "No Thanks",
				delay: 1500
			}

			Popup.options.show($scope, welcomePopupOptions);
		}

		$scope.calculateGuruProfilePercentage = function() {
			return 50;
		}

		$scope.$on('modal.shown', function() {
			$scope.ratingModalShown = true;
		});

		$scope.onCardInputSelect = function() {
			return
		}

		$scope.$on('modal.hidden', function() {
			$scope.ratingModalShown = false;
		});

		$scope.checkForRatings = function() {

			if (($scope.user.pending_guru_ratings || $scope.user.pending_student_ratings) &&
				(($scope.user.pending_guru_ratings.length > 0 && !$scope.user.guru_mode) ||
					($scope.user.pending_student_ratings.length > 0 && $scope.user.guru_mode))) {

				$ionicModal.fromTemplateUrl(BASE + 'templates/ratings.modal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.ratingModal = modal;
				});

				$timeout(function() {
					if (!$scope.ratingModal.isShown() && !$scope.ratingModalShown) {
						$scope.ratingModal.show();
					}
				}, 1000);


			}


		}

		$scope.$on('$ionicView.beforeEnter', function() {
			LoadingService.show();
			User.getUserFromServer($scope, null, $state);
			// $scope.guru.profile_percent_complete = $scope.calculateGuruProfilePercentage();
			if ($scope.root.vars.guru_selected_index) {
				$scope.bottomTabsDelegate.select($scope.root.vars.guru_selected_index);
			}

			if (window.StatusBar) {
				StatusBar.styleLightContent();
			}

		});

		$scope.$on('$ionicView.enter', function() {
			$scope.user.guru_mode = true;
			$scope.root.vars.guru_mode = true;


			$localstorage.setObject('user', $scope.user);


			User.getUserFromServer($scope, null, $state);

			initCTA();

		});

		$scope.$on('$ionicView.loaded', function() {
			LoadingService.hide();
		});
		$scope.$on('$ionicView.afterEnter', function() {
			LoadingService.hide();
		});


		$scope.launchSupport = function() {
			$scope.supportModal.show();
		}


		$scope.supportTicket = {
			message: null
		};

		$scope.submitSupport = function() {
			$scope.supportTicket.user_id = $scope.user.id;
			Support.create($scope.supportTicket).then(function() {
				LoadingService.showSuccess('Your support message has been submitted. We will get back to you very soon!', 2000);
				$scope.supportModal.hide();
			}, function(err) {
				console.error('error from server', err);
			});
		}




		$scope.$on('$ionicView.beforeLeave', function() {
			LoadingService.hide();
			if ($scope.bottomTabsDelegate) {
				$scope.root.vars.guru_selected_index = $scope.bottomTabsDelegate.selectedIndex();
			}
			$scope.checkForRatings();

		});

	}

]);