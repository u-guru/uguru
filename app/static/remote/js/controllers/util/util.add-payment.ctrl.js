angular.module('uguru.util.controllers')

.controller('AddPaymentController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicHistory) {
    
    $scope.savePayment = function() {
      $scope.user.cards = [[]];
      $ionicHistory.goBack();
    }

  }


])