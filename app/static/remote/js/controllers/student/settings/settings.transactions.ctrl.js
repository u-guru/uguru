angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsTransactionsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicTabsDelegate',
  function($scope, $state, $ionicTabsDelegate) {
    $scope.transactionsDelegate = $ionicTabsDelegate.$getByHandle('transactions-delegate');
    console.log($scope.user.guru_transactions);
  }

]);

