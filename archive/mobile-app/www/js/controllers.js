angular.module('uguru.student.controllers', [])

//ALL student controllers
.controller('StudentHomeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  function($scope, $state, $ionicPopup, $timeout) {
    
    $scope.showWelcomeConfirm = function() {
	   
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
		    });
	   	}, 250);
	}

	 // show popup after 1 second
	 $timeout(function() {
	 	$scope.showWelcomeConfirm();
	 }, 1000);
  }
]);

