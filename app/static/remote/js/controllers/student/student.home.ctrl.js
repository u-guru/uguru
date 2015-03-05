angular.module('uguru.student.controllers', [])

//ALL student controllers
.controller('StudentHomeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaKeyboard',
  '$cordovaProgress',
  '$q',
  'University',
  '$templateCache',
  '$ionicHistory',
  'Popup',
  '$popover',
  'Popover',
  '$ionicBackdrop',
  'User',
  '$ionicHistory',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $cordovaProgress, $q,
 	University, $templateCache, $ionaicHistory, Popup, $popover, Popover, $ionicBackdrop,
  User, $ionicHistory) {

	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
	$scope.base_url =  BASE;
	$scope.progress_active = false;

  $scope.getNumber = function(num) {
      return new Array(num);
  }

  $scope.checkCourseInActiveRequests = function(course) {
    var active_requests = $scope.user.active_requests || [];
    for (var i = 0; i < active_requests.length; i++) {
      var index_request = active_requests[i];
      if (index_request.course.short_name === course.short_name) {
        return true;
      }
    }
    return false;
  }

  $scope.getActiveRequestByCourse = function(course) {
    var active_requests = $scope.user.active_requests;
    for (var i = 0; i < active_requests.length; i++) {
      var index_request = active_requests[i];
      if (index_request.course.short_name === course.short_name) {
        return index_request;
      }
    }
    return false;
  }

	$ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/add-course.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addCourseModal = modal;
	});

	$ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/university.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addUniversityModal = modal;
	});

  // $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  // }).then(function(modal) {
  //     $scope.ratingModal = modal;
  // });

  $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/signup.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.signupModal = modal;
  });

  $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/become-guru.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.becomeGuruModal = modal;
  });

  	$scope.showSuccess = function(msg) {
      if (!$scope.progress_active)  {
      		$scope.progress_active = true;
      		$cordovaProgress.showSuccess(true, msg)
	      	$timeout(function() {
	        	$cordovaProgress.hide();
	        	$scope.progress_active = false;
	      	}, 1000);
      } else {

      	console.log('Show success cannot be shown because progress bar is already active');
      }
    }

    $scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
    }

    $scope.switchToGuruMode = function() {
      var goToGuruHome = function() {
        $scope.bottomTabsDelegate.select(0);
        $state.go('^.^.guru.home');
      }
      $scope.user.guru_mode = true;
      $scope.user.updateAttr('guru_mode', $scope.user, true, goToGuruHome, $scope);
    }

    $scope.goToRequest = function(course) {
      // $scope.root.button.showButtonPressedAndHide($event.target);
      $state.go('^.request', {courseObj:JSON.stringify(course)});
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

    $scope.goToRequestStatus = function(course) {
      var active_request = $scope.getActiveRequestByCourse(course);
      $state.go('^.request-status', {requestObj:JSON.stringify(active_request)});
    }

    $scope.goToActiveSession = function(session) {
      $state.go('^.active-session', {sessionObj:JSON.stringify(session)});
    }


    $scope.goToBecomeGuru = function() {
      $state.go('^.^.guru.wizard');
      $scope.bottomTabsDelegate.select(0);
      $timeout(function() {
        $scope.becomeGuruModal.hide();
      }, 300);
    }

    $scope.goToNotifications = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show()
      } else {
        $state.go('^.settings-notifications');
      }
    }

    $scope.goToGuruMode = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show();
      } else {
        $scope.becomeGuruModal.show();
      }
    }

    $scope.goToTransferFunds = function() {

      if (!$scope.user.auth_token) {
        $scope.signupModal.show();
      } else {
        $state.go('^.settings-transfer');
      }

    }

    $scope.goToTransactions = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show()
      } else {
        $state.go('^.settings-transactions')
      }
    }

    $scope.goToCards = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show();
      } else {
        $state.go('^.settings-cards')
      }
    }



    $scope.goToEditProfile = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show()
      } else {
        $state.go('^.settings-profile')
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
    	$scope.showSuccess('Cache Cleared! Please close the app & open again');
    }

    $scope.logoutUser = function() {
      $scope.rootUser.logout();
      $scope.user = {}
      $scope.showSuccess('You have been logged out!')
      $scope.signupModal.show();
    }


    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
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

    // $scope.showPopoverDev = function() {
    //   // $scope.showTooltip();

    //       popoverOptions = {
    //         targetElement:'#home-header',
    //         title: 'Tap to request help',
    //         delay: 500,
    //         animation:null,
    //         placement: 'bottom',
    //         body: "We'll find a Guru to help you out <br> in a matter of minutes.<br>",
    //         buttonText: 'Got it',
    //         dropshadow: true
    //       }

    //       Popover.tutorial.show($scope, popoverOptions);
    // }

    // $scope.processStudentRequests($scope.user.requests);

    $scope.$on('$ionicView.beforeEnter', function(){
      User.getUserFromServer($scope, null, $state);
      $scope.user.guru_mode = false;
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('leaving...');
    });

    $scope.$on('modal.shown', function() {
      $scope.ratingModalShown = true;
    });

    $scope.$on('modal.hidden', function() {
      $scope.ratingModalShown = false;
    });

    $scope.$on('$ionicView.loaded', function(){
      if (!$scope.user.onboarding || !$scope.user.onboarding.get_started) {
        $scope.user.onboarding = {};
        $scope.user.onboarding.get_started = true;
        options =  {
        desiredAccuracy: 5,
        stationaryRadius: 20,
        distanceFilter: 30,
        activityType: 'Fitness',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false
      }
      }
    });

  }

]);
