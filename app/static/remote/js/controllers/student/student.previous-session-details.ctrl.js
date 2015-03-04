angular.module('uguru.student.controllers')

//ALL student controllers
.controller('PreviousSessionDetailsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$cordovaProgress',
  '$timeout',
  '$ionicHistory',
  '$ionicModal',
  '$cordovaKeyboard',
  '$stateParams',
  function($scope, $state, $cordovaProgress, $timeout, $ionicHistory,
  	$ionicModal, $cordovaKeyboard, $stateParams) {


    $scope.session = JSON.parse($stateParams.sessionObj);

	  $scope.goToSessionMessages = function(session) {
      if ($scope.user.guru_mode) {
        $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
      } else {
        $state.go('^.messages', {sessionObj:JSON.stringify(session)});
      }
    }

  }

]);

