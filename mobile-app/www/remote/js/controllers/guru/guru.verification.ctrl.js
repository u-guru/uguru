angular.module('uguru.guru.controllers')

.controller('GuruVerificationController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  '$cordovaOauth',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, $cordovaOauth) {

    var UBER_CLIENT_ID = "f6pThzslRv6jZomDd4npfQfejIeY7pHc";

    $scope.$on('modal.shown', function() {
      if ($scope.becomeGuruModal.isShown()) {
        StatusBar.styleLightContent();

      }
    });




    $scope.fireUberApi = function() {
      $cordovaOauth.uber(UBER_CLIENT_ID, $scope, {}).then(function(result) {
          return
      }, function(err) {
        console.error(err);
      });
    }


  }


]);