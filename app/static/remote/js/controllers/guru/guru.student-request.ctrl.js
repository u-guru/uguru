angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruIncomingRequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$stateParams',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, $stateParams) {

    $scope.request = JSON.parse($stateParams.requestObj);
    $scope.proposal = JSON.parse($stateParams.proposalObj);


    $scope.user.cashout_cards = [];

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function() {
      $state.go('^.guru-profile', {guruObj:JSON.stringify($scope.guru)});
    }

    $scope.declineRequest = function() {
      $state.go('^.guru.home');
    }

    $scope.acceptGuru = function() {
      if ($scope.user.cashout_cards.length === 0) {
        $state.go('^.^.student.add-payment');
        return;
      }

      var session = {
          course: $scope.request.course,
          status: 'guru-transport',
          guru: $scope.guru,
          location: $scope.request.location,
          price: {amount: 5, minutes:15},
          messages: [],
      }

      $scope.user.sessions = [];
      $scope.user.active_sessions = [];
      $scope.user.sessions.push(session);
      $scope.user.active_sessions.push(session);
      $scope.rootUser.updateLocal($scope.user);
      $state.go('^.home');

    }

    $scope.acceptStudent = function() {
      proposalObj = $scope.proposal;
      proposalObj.status = 2; //guru accepted
      proposalObj.proposal = true;
      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      $state.go('^.home');
    }

    $scope.rejectStudent = function() {
      proposalObj = $scope.proposal;
      proposalObj.status = 3; //guru rejected
      proposalObj.proposal = true;

      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      $state.go('^.home');
    }

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

  }

]);
