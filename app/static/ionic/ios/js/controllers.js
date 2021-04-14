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
	     okText: "YES!",
	     cancelText: "NO THANKS"
	   
	   }

	   //initialize the popup
	   var confirmPopup = $ionicPopup.show(popupOptions);

	   //After popup is clicked, this function is run
	   confirmPopup.then(function(res) {
	     if(res) {
	       console.log('Ok Pressed');
	     } else {
	       console.log('Cancel Pressed');
	     }
	   });
	 
	 };

	 //show popup after 1 second
	 $timeout(function() {
	 	$scope.showWelcomeConfirm();
	 }, 1000);
    

  }

]);

