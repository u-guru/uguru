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

  // $scope.user.active_requests = [];
  //   $scope.user.previous_requests = [];

  //   $scope.processStudentRequests = function(user_requests) {
  //       if (user_requests && $scope.user.requests.length > 0) {
  //           for (var i = 0; i < $scope.user.requests.length; i ++) {
  //             var index_request = user_requests[i];
  //             if (index_request.status === 0) {
  //               $scope.user.active_requests.push(index_request);
  //             } else {
  //               $scope.user.previous_requests.push(index_request);
  //         }
  //       }
  //   }

  // }

  $scope.checkCourseInActiveRequests = function(course) {
    var active_requests = $scope.user.active_requests;
    for (var i = 0; i < $scope.user.active_requests.length; i++) {
      var index_request = active_requests[i];
      if (index_request.course.short_name === course.short_name) {
        return true;
      }
    }
    return false;
  }



  $scope.getActiveRequestByCourse = function(course) {
    var active_requests = $scope.user.active_requests;
    for (var i = 0; i < $scope.user.active_requests.length; i++) {
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

  $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.ratingModal = modal;
  });

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
      $scope.user.guru_mode = true;
      $scope.rootUser.updateLocal($scope.user);
      $scope.user.updateAttr('guru_mode', $scope.user, true);
      $state.go('^.^.guru.home');
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

    $scope.addGreenbar = function() {
      console.log('this was clicked');
    }

    $scope.goToBecomeGuru = function() {
      $state.go('^.^.guru.wizard');
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
      console.log('student home view before Enter');
      User.getUserFromServer($scope);
    });

    $scope.$on('$ionicView.enter', function(){
      console.log('student home view has entered');

      var checkForIncomingRequests = function($scope) {
        if ($scope.user.incoming_requests && $scope.user.incoming_requests.length > 0) {

          // var course = $scope.course.active_requests[0];
          if ($scope.user.incoming_requests.length > 0) {
            var first_incoming_request = $scope.user.incoming_requests[0];

            var paramPayload = {
              requestObj:JSON.stringify(first_incoming_request),
            }

            $state.go('^.guru-available', paramPayload);
          }

        }
      }

      User.getUserFromServer($scope, checkForIncomingRequests);
    });

    $scope.$on('$ionicView.loaded', function(){
      console.log('view has loaded');
      if (!$scope.user.onboarding || !$scope.user.onboarding.get_started) {
        $scope.user.onboarding = {};
        $scope.user.onboarding.get_started = true;
        $timeout(function() {


          // getStartedPopoverOptions = {
          //   targetElement:'#home-header',
          //   title: 'Tap to get started',
          //   delay: 500,
          //   animation:"am-flip-x",
          //   placement: 'bottom',
          //   body: "Just enter a course code, Uguru uses <br>your university's course lists<br> to help keep things simple.",
          //   buttonText: 'Got it',
          //   dropshadow: true
          // }

          // var popover = Popover.tutorial.init($scope, getStartedPopoverOptions);

          // $scope.showTooltip = function() {
          //   popover.$promise.then(popover.show);
          // };
          // $scope.hideTooltip = function() {
          //   popover.$promise.then(popover.hide);
          // };

          // $scope.showTooltip();
          // $scope.hideTooltip();

        }, 500)
      }
    });

  }

]);
