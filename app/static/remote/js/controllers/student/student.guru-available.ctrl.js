angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruAvailableController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$stateParams',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, $stateParams) {

    $scope.request = JSON.parse($stateParams.requestObj);
    $scope.guru = $scope.request.guru;

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function() {
      $state.go('^.guru-profile', {guruObj:JSON.stringify($scope.guru)});
    }

    $scope.acceptGuru = function() {
      if ($scope.user.cards.length === 0) {
        $state.go('^.add-payment');
        return;
      }

      $scope.request.status = 1;
      $scope.request.guru_id = $scope.guru.id;

      $scope.user.createObj($scope.user, 'sessions', $scope.request, $scope);
      $scope.updateUserRequest($scope,$scope.request, 0) //update back to processing gurus

      // $scope.user.sessions = [];
      // $scope.user.active_sessions = [];
      // $scope.user.sessions.push(session);
      // $scope.user.active_sessions.push(session);
      // $scope.rootUser.updateLocal($scope.user);
      // $state.go('^.home');

    }

    $scope.updateUserRequest = function(request, status) {
      var user_requests = $scope.user.requests;
      for (var i = 0; i < user_requests.length ; i++) {
        var index_request = user_requests[i];
        if (index_request.id === request.id) {
          $scope.user.requests[i].status = 0;
        }
      }
    }

    $scope.rejectGuru = function() {
      requestObj = $scope.request;
      requestObj.status = 3; //guru rejected
      $scope.user.updateObj($scope.user, 'requests', requestObj, $scope);
      $scope.updateUserRequest($scope,$scope.request, 0) //update back to processing gurus
      $state.go('^.home');
      // $state.go('^.home');
    }

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

  }

]);
