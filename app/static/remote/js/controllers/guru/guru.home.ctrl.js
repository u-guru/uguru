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
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $q,
 	University, $templateCache, $ionicHistory, Popup, $popover, Popover,
  $ionicBackdrop, User, Camera, $cordovaPush, $ionicViewSwitcher, $cordovaStatusbar,
  $ionicPlatform) {
  console.log($scope.user)
	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
	$scope.base_url =  BASE;
	$scope.progress_active = false;

  $ionicPlatform.ready(function() {

    if (window.StatusBar) {
                  // console.log('Extra #1. Styling iOS status bar to black \n\n');
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

  $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.signupModal = modal;
  });

  $ionicModal.fromTemplateUrl(BASE + 'templates/become-guru.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.becomeGuruModal = modal;
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
        console.log('user turning OFF first time, never even said yes');
        // $scope.user.current_device.push_notif_enabled = false;
        $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
      }

      //if user is turning off push notifications because they are annoyed
      if (!$scope.user.current_device.push_notif_enabled && $scope.user.current_device.push_notif) {
        console.log('user turning OFF push by choice');
        // $scope.user.current_device.push_notif_enabled = false;
        $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
      }

      //if user is turning it back on again
      if ($scope.user.current_device.push_notif_enabled && $scope.user.current_device.push_notif) {
        console.log('user turning on push.. again');
        // $scope.user.current_device.push_notif_enabled = true;
        var iosConfig = {
        "badge": true,
        "sound": true,
        "alert": true,
      }

        console.log('user turning on push for the first time');

        // $scope.user.current_device.push_notif_enabled = true;
        $cordovaPush.register(iosConfig).then(function(deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log("deviceToken: " + deviceToken)

        console.log("Register success " + deviceToken);

        if ($scope.platform.ios) {
          console.log('updating the server...');
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        }

      }, function(err) {
        console.log('there is an error');
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

        console.log('user turning on push for the first time');
        // $scope.user.current_device.push_notif_enabled = true;
        $cordovaPush.register(iosConfig).then(function(deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log("deviceToken: " + deviceToken)

        console.log("Register success " + deviceToken);
        $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        if ($scope.platform.ios) {
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        }

      }, function(err) {
        console.log('there is an error');
        alert("Please go to your Settings > Notifications > Uguru and 'Allow Notifications'");
      });
      }
  }

  	// $scope.showSuccess = function(msg) {
   //    if (!$scope.progress_active)  {
   //    		$scope.progress_active = true;

   //    		$cordovaProgress.showSuccess(true, msg)
	  //     	$timeout(function() {
	  //       	$cordovaProgress.hide();
	  //       	$scope.progress_active = false;
	  //     	}, 1000);
   //    } else {
   //    	console.log('Show success cannot be shown because progress bar is already active');
   //    }
   //  }

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
        $state.go('^.settings-transfer');
      }

    }

    $scope.showButtonPressed = function($event, class_name) {
      // console.log($event.target);
      // console.log($event.target.name)
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
      $state.go('^.guru-verification');
    }

    $scope.goToProfileEdit = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru-profile-edit');
    }


    $scope.goToRequestStatus = function(course) {
      $state.go('^.request-status', {courseObj:JSON.stringify(course)});
    }

    $scope.goToActiveSession = function(session) {
      $state.go('^.guru-active-session', {sessionObj:JSON.stringify(session)});
    }

    $scope.addGreenbar = function() {
      console.log('this was clicked');
    }

    $scope.goToBecomeGuru = function() {
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

          $state.go('^.settings-notifications');

        }
        else {
          $state.go('^.settings-notifications');
        }
      }
    }

    $scope.goToTransactions = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show()
      } else {
        if ($scope.user.guru_mode) {
          $state.go('^.settings-transactions');
        } else {
          $state.go('^.settings-transactions')
        }
      }
    }

    $scope.goToCards = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show();
      } else {
        if ($scope.user.guru_mode) {
          $state.go('^.settings-cards')
        } else {
          $state.go('^.settings-cards')
        }
      }
    }

    $scope.goToEditProfile = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show()
      } else {
        if ($scope.user.guru_mode) {
          $state.go('^.settings-profile');
        } else {
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
      //create a brand new user
      $scope.user = User.initUser();
      $scope.user.updateAttr = User.updateAttrUser;
      $scope.user.createObj = User.createObj;
      $scope.user.updateObj = User.updateObj;

      $localstorage.removeObject('courses');
      $localstorage.removeObject('universities');
      $localstorage.removeObject('user');


      alert('You have been logged out!');
      $scope.signupModal.show();
      $state.go('^.student-home');
    }
    $scope.goToProposalDetails = function(proposal) {
      $state.go('^.guru-proposal-details', {proposalObj:JSON.stringify(proposal)});
    }

    $scope.goToPreviousSessionDetails = function(session) {
      $state.go('^.previous-session-details', {sessionObj:JSON.stringify(session)});
    }

    $scope.showPopupDev = function() {
      // $scope.showTooltip();

          var welcomePopupOptions = {
              header:"Welcome!",
              body: "We'd like your location to help locate a nearby Guru. Allow us to request for your location?",
              positiveBtnText:"Sure!",
              negativeBtnText:"No Thanks",
              delay: 1500
            }

          Popup.options.show($scope, welcomePopupOptions);
    }

    $scope.calculateGuruProfilePercentage = function() {
      return 50;
    }

    $scope.$on('modal.shown', function() {
      $scope.backgroundRefresh = false;
      $scope.ratingModalShown = true;
      console.log('stopping background refresh');
    });



    $scope.$on('modal.hidden', function() {
      $scope.backgroundRefresh = true;
      $scope.ratingModalShown = false;
      console.log('starting background refresh');
    });

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.loader.show();
      User.getUserFromServer($scope, null, $state);
      // $scope.guru.profile_percent_complete = $scope.calculateGuruProfilePercentage();


      console.log('guru home view before Enter');
      if (window.StatusBar) {
          StatusBar.styleLightContent();
      }

      console.log(JSON.stringify($scope.user.current_device));
      // User.getUserFromServer($scope, null, $state);
    });

    $scope.$on('$ionicView.enter', function(){
      $scope.user.guru_mode = true;
      $scope.root.vars.guru_mode = true;
      $localstorage.setObject('user', $scope.user);
      console.log('printing guru stuff', $scope.user.active_proposals);

      //check if user already has push notification token

    });

    $scope.$on('$ionicView.loaded', function() {
      $scope.loader.hide();
    });
    $scope.$on('$ionicView.afterEnter', function() {
      $scope.loader.hide();
    });

  }

]);
