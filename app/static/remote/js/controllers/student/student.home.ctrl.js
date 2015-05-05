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
  'Camera',
function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $q,
 	University, $templateCache, $ionaicHistory, $ionicBackdrop,
  User, $ionicHistory, CordovaPushWrapper, $ionicPlatform, $rootScope, $cordovaPush,
  $ionicPlatform, $ionicBackdrop, $document, $ionicPopover, $cordovaStatusbar,
  $ionicViewSwitcher, Camera)     {
  // .fromTemplate() method
  // if (!$scope.user.university && !$scope.user.university_id) {
  //   $state.go('^.onboarding-location');
  // }

  // console.log($scope.user);t

  $ionicPlatform.ready(function() {

    $scope.turnStatusBarWhite = function() {
      if (window.StatusBar) {
                  // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }
    }

    $scope.turnStatusBarBlack = function() {
      if (window.StatusBar) {
                  // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleDefault();
        StatusBar.overlaysWebView(true);
      }
    }

  });

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

  $scope.openGeneralPopover = function($event, options) {
    $scope.genPopup = {options: options} ;
    $ionicPopover.fromTemplateUrl('templates/generalPopup.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.genPopup.popover = popover;
      //show immediately
      $scope.genPopup.popover.show($event);
    });

  }

  $scope.closeGenPopup = function() {
    $scope.genPopup.popover.hide();
  }

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
      $scope.bottomTabsDelegate.select(1);
      // var goToGuruHome = function() {

      // }
      // $ionicHistory.nextViewOptions({
      //   historyRoot: true
      // });
      $ionicViewSwitcher.nextDirection('forward');
      $scope.user.guru_mode = true;
      $state.go('^.guru-home');
    }

    $scope.goToRequest = function(course) {
      // $scope.root.button.showButtonPressedAndHide($event.target);
      $scope.loader.show();
      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
      $scope.root.vars.request = {
            type: {
              in_person: true,
              online: true
            },
            _length: {hours:2, minutes:1},
            calendar_selected:false,
            description:null,
            location: null,
            files: [],
            calendar: {
              data: {},
              calendar_selected: false
            },
            contact: {
              email:false,
              phone: false,
              push_notif: false,
              email_address: '',
              phone_number: ''
             }
          }
      $scope.root.vars.request.course = course;
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
      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
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
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.settings-notifications');
    }

    $scope.goToGuruMode = function() {
      if (!$scope.user.auth_token) {
        $scope.becomeGuruButtonClicked = true;
        $scope.signupModal.show();
      } else {
         if ($scope.turnStatusBarWhite) {
            $scope.turnStatusBarWhite();
        }
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

    // $scope.goToTransactions = function() {
    //   if (!$scope.user.auth_token) {
    //     $scope.signupModal.show()
    //   } else {
    //     $state.go('^.settings-transactions')
    //   }
    // }

    $scope.goToCards = function() {
      if (!$scope.user.auth_token) {
        $scope.signupModal.show();
      } else if ($scope.user.payment_cards && $scope.user.payment_cards.length === 0){
        $ionicViewSwitcher.nextDirection('forward')
        $state.go('^.add-payment');
      } else
       {
        $state.go('^.student-settings-cards');
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

    $scope.takePhoto = function() {
    if ($scope.platform.mobile) {
      Camera.takePicture($scope);
    } else {
      var element = document.getElementById('guru-file-input-web')
      element.click();
    }
  }

  $scope.file_changed = function(element) {
        var photofile = element.files[0];
        var reader = new FileReader();
        var image = document.getElementsByClassName('settings-prof-pic')[0];

        reader.onload = function(e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(photofile);
        // $scope.root.vars.request.files.push(true);

        var formData = new FormData();

        formData.append('file', photofile);
        // var file_name = new Date().getTime().toString();
        formData.append('profile_url', $scope.user.id);

        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };

    $scope.goToEditProfile = function() {
      $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
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
    	$scope.success.show(0,10000, 'Cache successfully cleared! Please close the app completely & open again.');
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
    };

    $scope.goToSettingsTab = function() {
      $scope.root.vars.select_bottom_three = true;
      $scope.bottomTabsDelegate.select(2);
    }


    $scope.$on('$ionicView.beforeEnter', function() {
      if ($scope.root.vars.select_bottom_one) {
        console.log('view before enter');
        $scope.bottomTabsDelegate.select(0);
        $scope.root.vars.select_bottom_one = null;
      } else if ($scope.root.vars.select_bottom_three) {
        $scope.bottomTabsDelegate.select(2);
        $scope.root.vars.select_bottom_three = null;
      }
        else if ($scope.root.vars.select_bottom_two) {
          $scope.bottomTabsDelegate.select(1);
          $scope.root.vars.select_bottom_two = null;
      }

    });

    $scope.$on('$ionicView.enter', function() {

      console.log('view has entered', $scope.root.vars.recent_switched_modes);
      $localstorage.setObject('user', $scope.user);
      User.getUserFromServer($scope, null, $state);
      $scope.root.vars.fetch_user_server_mutex = true;

      $scope.loader.hide();
      $scope.user.guru_mode = false;
      $scope.root.vars.guru_mode = false;



      // if ($scope.root.vars.request_form_recently_hidden) {
      //     //make it null after
      //     $scope.root.vars.request_form_recently_hidden = null;
      //     var showFor = 4500;
      //     var waitFor = 1500;
      //     $scope.showBouncingRedAlert(waitFor, showFor);
      //     $scope.showFirstTimeRequestSessionPopup()

      // }


    });

    $scope.$on('$ionicView.loaded', function(){
      console.log('view has loaded');
      User.getUserFromServer($scope, null, $state);
      console.log($scope.user.previous_requests);
      $scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
      $scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
      $scope.bottomTabsDelegate.select(1);


      if ($scope.bottomTabsDelegate.selectedIndex() === 1) {
        $scope.showOnboardingAddClass();
      }


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

    $scope.showBouncingRedAlert = function(wait_for, show_for) {
      $timeout(function() {
        console.log('this is when the animation should happen');
        document.querySelectorAll('.badge-danger')[0].className = "badge badge-danger animated bounce infinite";
        $timeout(function() {
          document.querySelectorAll('.badge-danger')[0].className = "badge badge-danger";
        }, show_for)
      },wait_for)
    };


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

        if ($scope.turnStatusBarWhite) {
          $scope.turnStatusBarWhite()
        }
        if (window.StatusBar) {
          console.log('status bar exists');
          StatusBar.styleLightContent();
        }
          $scope.ratingModalShown = false;
    });

    $scope.showFirstTimeRequestSessionPopup = function () {
      var options = {
          header: 'Sit back and relax',
          body: 'Anytime you request help, click here to check your status',
          closeButtonText: 'Got it',
          targetName: 'bottom-sessions-tab'
        }
        var element = document.getElementById("bottom-sessions-tab");
        $timeout(function() {
          $scope.openGeneralPopover(element, options);
        }, 3000);
    }

  }

]);
