angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentMessagesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  function($scope, $state, $timeout, $localstorage, 
  $ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams) {

    $scope.session = JSON.parse($stateParams.sessionObj);
    console.log($scope.session);

  }

]);

