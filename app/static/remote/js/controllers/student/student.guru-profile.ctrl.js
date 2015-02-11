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
    	 
      $scope.showContactGuru = null;
      if ($stateParams) {
        $scope.guru = JSON.parse($stateParams.guruObj);
        if ($stateParams.showContactGuru) {
          $scope.showContactGuru = JSON.parse($stateParams.showContactGuru);
        }
      }

      $scope.getNumber = function(num) {
        return new Array(num);
      }
      
  }

]);
