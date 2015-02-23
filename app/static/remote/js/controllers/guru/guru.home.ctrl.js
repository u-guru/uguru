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
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $cordovaProgress, $q,
 	University, $templateCache, $ionicHistory, Popup, $popover, Popover,
  $ionicBackdrop, User) {

	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
	$scope.base_url =  BASE;
	$scope.progress_active = false;

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

    $scope.allProposals = function() {

    }

    $scope.switchToStudentMode = function() {
      $scope.user.guru_mode = false;
      $scope.user.updateAttr('guru_mode', $scope.user, false, goToGuruHome, $scope);
      var goToGuruHome = function() {
        $state.go('^.^.student.home');
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

    $scope.goToRequestStatus = function(course) {
      $state.go('^.request-status', {courseObj:JSON.stringify(course)});
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
        if ($scope.user.guru_mode) {

          $state.go('^.^.student.settings-notifications');

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
          $state.go('^.^.student.settings-transactions');
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
          $state.go('^.^.student.settings-cards')
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
          $state.go('^.^.student.settings-profile');
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
    	$scope.showSuccess('Cache Cleared! Please close the app & open again');
    }

    $scope.guruDiscoverabilityChange = function() {
      $scope.rootUser.updateLocal($scope.user);
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

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('guru home view before Enter');
      User.getUserFromServer($scope, null, $state);
    });

    $scope.$on('$ionicView.enter', function(){

      $scope.user.guru_mode = true;
      $scope.user.updateAttr('is_a_guru', $scope.user, true);
      $scope.user.updateAttr('guru_mode', $scope.user, true);
      $scope.user.is_a_guru = true;
      console.log('view enter is entering ')
      console.log($scope.user);
    });

  }

]);
