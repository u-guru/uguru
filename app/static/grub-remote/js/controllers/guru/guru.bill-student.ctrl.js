angular.module('uguru.guru.controllers')

.controller('BillStudentController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, $ionicHistory) {


    $scope.goBack = function() {
      $ionicHistory.goBack();
    };

  }


])