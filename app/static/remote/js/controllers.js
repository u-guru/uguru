angular.module('uguru.student.controllers', [])

//ALL student controllers
.controller('StudentHomeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$cordovaDialogs',
  'Version',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, 
  	$cordovaDialogs, Version) {


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

	 //show popup after 1 second
	 $timeout(function() {
	 	$scope.showWelcomePopup();
	 }, 1000);
    

  }

]);

