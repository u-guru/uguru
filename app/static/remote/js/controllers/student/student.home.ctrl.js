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
  '$q',
  'University',
  '$templateCache',
  '$ionicHistory',
  '$ionicBackdrop',
  'User',
  '$ionicHistory',
  'CordovaPushWrapper',
  '$ionicPlatform',
  '$rootScope',
  '$cordovaPush',
  '$ionicPlatform',
  '$ionicBackdrop',
  '$document',
  '$ionicPopover',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $q,
 	University, $templateCache, $ionaicHistory, $ionicBackdrop,
  User, $ionicHistory, CordovaPushWrapper, $ionicPlatform, $rootScope, $cordovaPush,
  $ionicPlatform, $ionicBackdrop, $document, $ionicPopover, $cordovaStatusbar,
  $ionicViewSwitcher) {
    console.log($scope.user);
  // .fromTemplate() method

  // if (!$scope.user.university && !$scope.user.university_id) {
  //   $state.go('^.onboarding-location');
  // }

  // console.log($scope.user);

  $ionicPopover.fromTemplateUrl('templates/gettingStartedPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $ionicPopover.fromTemplateUrl('templates/gettingStartedRequestHelpPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverTwo = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.openPopoverTwo = function($event) {
    $scope.popoverTwo.show($event);
  };

  $scope.closePopoverTwo = function() {
    $scope.popoverTwo.hide();
  };

  $scope.testBackdrop = function($event) {

  }

  $scope.getNumber = function(num) {
      return new Array(num);
  }

  $scope.tabClicked = function() {
    console.log('sup');
  }

  // $scope.checkCourseInActiveRequests = function(course) {
  //   console.log(course);
  //   var active_requests = $scope.user.active_requests || [];
  //   for (var i = 0; i < active_requests.length; i++) {
  //     var index_request = active_requests[i];
  //     if (index_request.course.short_name === course.short_name) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

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

  // $ionicModal.fromTemplateUrl(BASE + 'templates/ratings.modal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  // }).then(function(modal) {
  //     $scope.ratingModal = modal;
  // });

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

  	// $scope.showSuccess = function(msg) {
   //    if ($scope.platform.web) {
   //      console.log('not showing loader because on the web')
   //      return;
   //    }
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
      if ((window.cordova && window.cordova.plugins.Keyboard) || $scope.platform && $scope.platform.android) {
          $cordovaKeyboard.close();
      }
    }

    $scope.switchToGuruMode = function() {
      var goToGuruHome = function() {
        $scope.bottomTabsDelegate.select(0);
        $state.go('^.guru-home');
      }
      $scope.user.guru_mode = true;
      $scope.user.updateAttr('guru_mode', $scope.user, true, goToGuruHome, $scope);
    }

    $scope.goToRequest = function(course) {
      // $scope.root.button.showButtonPressedAndHide($event.target);
      $scope.loader.show();
      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
      $state.go('^.student-request', {courseObj:JSON.stringify(course)});
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

    $scope.goToRequestStatus = function(request) {
      // var active_request = $scope.getActiveRequestByCourse(request);
      $state.go('^.student-request-status', {requestObj:JSON.stringify(request)});
    }

    $scope.goToActiveSession = function(session) {
      $state.go('^.active-student-session', {sessionObj:JSON.stringify(session)});
    }


    $scope.goToBecomeGuru = function() {
      $state.go('^.guru-wizard');
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

    $scope.showLoginModal = function() {
      $scope.userClickedLoginModal = true;
      $scope.signupModal.show();
    }

    $scope.showSignupModal = function() {
      $scope.userClickedLoginModal = false;
      $scope.signupModal.show();
    }



    $scope.goToEditProfile = function() {
      $state.go('^.settings-profile');
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

    $scope.logoutUser = function() {
      $localstorage.setObject('user', []);
      $scope.user = User.getLocal();
      $scope.user.updateAttr = User.updateAttrUser;
      $scope.user.createObj = User.createObj;
      $scope.user.updateObj = User.updateObj;
      alert('You have been logged out!')
      $scope.signupModal.show();
    }

    // $scope.bottomTabsDelegate.select(1);

    $scope.goToPreviousSessionDetails = function(session) {
      $state.go('^.previous-session-details', {sessionObj:JSON.stringify(session)});
    }



    $scope.$on('$ionicView.beforeEnter', function(){
      User.getUserFromServer($scope, null, $state);
      $scope.user.guru_mode = false;
      if (window.StatusBar) {
          StatusBar.styleDefault();
      }


      $scope.base_url =  BASE;
      $scope.progress_active = false;

    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log($state.current.name, 'leaving...');
    });

    $scope.$on('$ionicView.afterEnter', function(){
      $scope.loader.hide();
    });


    $scope.showOnboardingAddClass = function() {

      if ($scope.user.student_courses && $scope.user.student_courses.length === 0)
      $timeout(function() {
        var element = document.getElementById("add-course-item")
        $scope.openPopover(element);
      }, 1000);

    }

    $scope.showOnboardingRequestHelp = function() {

      if ($scope.user.student_courses && $scope.user.student_courses.length === 0)
      $timeout(function() {
        var element = document.getElementById("add-course-item")
        $scope.openPopover(element);
      }, 1000);

    }


    $scope.$on('modal.shown', function() {
      $scope.ratingModalShown = true;
    });

    $scope.$on('modal.hidden', function() {
      $scope.ratingModalShown = false;
    });

    $scope.loader.show();
    $timeout(function() {
      $scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
      $scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
      $scope.bottomTabsDelegate.select(1);
      $scope.showOnboardingAddClass();
      $scope.loader.hide();
      // $timeout(function() {
      //   document.querySelectorAll('.session-icon')[0].style.backgroundImage = "url('/remote/img/tabs-icon-1.svg')";
      //   document.querySelectorAll('.request-icon')[0].style.backgroundImage = "url('/remote/img/tabs-icon-3.svg')";
      //   document.querySelectorAll('.settings-icon')[0].style.backgroundImage = "url('/remote/img/tabs-icon-2.svg')";
      // }, 250);
    },1000)

  }

]);
