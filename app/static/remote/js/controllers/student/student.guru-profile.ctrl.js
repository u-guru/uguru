angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentViewGuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory) {

      $scope.showContactGuru = null;
      if ($stateParams) {
        $scope.guru = JSON.parse($stateParams.guruObj);
        if ($stateParams.showContactGuru) {
          $scope.showContactGuru = JSON.parse($stateParams.showContactGuru);
        }
      }

      $scope.goBack = function() {
        $ionicHistory.goBack();
      }

      $scope.getNumber = function(num) {
        return new Array(num);
      }

  }

]);
