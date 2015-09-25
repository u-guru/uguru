angular.module('uguru.student.controllers')

//ALL student controllers
.controller('PreviousSessionDetailsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$ionicHistory',
  '$ionicModal',
  '$cordovaKeyboard',
  '$stateParams',
  function($scope, $state, $timeout, $ionicHistory,
  	$ionicModal, $cordovaKeyboard, $stateParams) {


    $scope.session = JSON.parse($stateParams.sessionObj);

	  $scope.goToSessionMessages = function(session) {
	if ($scope.user.guru_mode) {
	    //mixpanel track
	    mixpanel.track("Student.messages");
        $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
	} else {
	    //mixpanel track
	    mixpanel.track("Message");
        $state.go('^.messages', {sessionObj:JSON.stringify(session)});
      }
    }

  }

]);

