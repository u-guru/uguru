angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams) {
    	 
      if ($stateParams) {
        $scope.guru = JSON.parse($stateParams.guruObj);
        $scope.showContactGuru = JSON.parse($stateParams.showContactGuru);
      }
      
  }

]);
