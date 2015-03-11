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
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate) {

	$scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');
	$scope.bottomTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-bottom')

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

	$ionicModal.fromTemplateUrl('templates/add-course.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addCourseModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/addUniversityModal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.addUniversityModal = modal;
	});

	$scope.$on('addUniversityModal.hidden', function() {
    	console.log('University modal hidden');
    	//send to server
  	});

  	$scope.$on('addCourseModal.hidden', function() {
    	console.log('Add course modal hidden');
  	});


  }

]);

