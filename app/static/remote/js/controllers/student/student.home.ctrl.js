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
  function($scope, $state, $ionicPopup, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $cordovaKeyboard, $cordovaProgress, $q,
 	University, $templateCache) {

	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')
	$scope.base_url =  BASE;
	$scope.progress_active = false;

	console.log($templateCache);

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

	$scope.launchCourseModal = function() {
		console.log('clicked');
	}

	 // //show popup after 1 second
	 // $timeout(function() {
	 // 	$scope.showWelcomePopup();
	 // }, 1000);

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

    

  }

]);
