angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsTransactionsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicTabsDelegate',
  '$ionicHistory',
  function($scope, $state, $ionicTabsDelegate, $ionicHistory) {
    // $scope.transactionsDelegate = $ionicTabsDelegate.$getByHandle('transactions-delegate');
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
  }

]);

