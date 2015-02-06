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
  function($scope, $state, $ionicPopup, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $cordovaProgress, $q,
 	University, $templateCache, $ionicHistory, Popup, $popover, Popover, $ionicBackdrop) {

	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
	$scope.base_url =  BASE;
	$scope.progress_active = false;
    
    $scope.showWelcomePopup = function() {

		var popupOptions = {
	     
	     templateUrl: "templates/welcomePopup.html",
	     cssClass: "popup-uguru",
	     scope: $scope
	   }

	   //initialize the popup
	   $scope.popup = $ionicPopup.show(popupOptions);

	   	$timeout(function() {
	   		document.getElementById("popup-cancel-btn").addEventListener("click", function() {
                console.log('negative clicked');
                $scope.popup.close();
		    });
		    document.getElementById("popup-positive-btn").addEventListener("click", function() {
		        console.log('positive clicked');
		        $scope.popup.close();
		    });
	   	}, 500);

	 };	 

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

    console.log($scope.user.active_sessions)

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
      $state.go('^.request-status', {courseObj:JSON.stringify(course)});
    }

    $scope.goToActiveSession = function(session) {
      $state.go('^.active-session', {sessionObj:JSON.stringify(session)});
    }

    $scope.addGreenbar = function() {
      console.log('this was clicked');
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

    $scope.showPopoverDev = function() {
      // $scope.showTooltip();

          popoverOptions = {
            targetElement:'#home-header',
            title: 'Tap to request help',
            delay: 500,
            animation:null,
            placement: 'bottom',
            body: "We'll find a Guru to help you out <br> in a matter of minutes.<br>",
            buttonText: 'Got it',
            dropshadow: true
          }

          Popover.tutorial.show($scope, popoverOptions);
    }

    $scope.showGetStartedPopover = function() {

      getStartedPopoverOptions = {
            targetElement:'#home-header',
            title: 'Tap to get started',
            delay: 500,
            animation:"am-flip-x",
            placement: 'bottom',
            body: "Just enter a course code,Uguru uses <br>your university's course lists<br> to help keep things simple.",
            buttonText: 'Got it',
            dropshadow: true
          }

      Popover.tutorial.show($scope, getStartedPopoverOptions);

    }



    $scope.$on('$ionicView.enter', function(){
      
      if (!$scope.user.university_id && $scope.user.student_courses.length === 0) {
        $timeout(function() {
          $scope.showGetStartedPopover();
        }, 500)
      }
    });

  }

]);
