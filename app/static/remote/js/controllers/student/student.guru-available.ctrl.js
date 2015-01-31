angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruAvailableController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  function($scope, $state, $ionicPopup, $timeout, $localstorage) {

    $scope.acceptGuru = function() {
      if ($scope.user.cards.length === 0) {
        $state.go('^.add-payment');
        return;
      }

      var session = {
          course: {short_name:'BIO101'},
          status: 'Guru En Route',
          guru: {name: 'Shun Kurosaki', guru_rating:4, id: 2},
          location: {address: '198 Church St'},
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

    $scope.rejectGuru = function() {
      $state.go('^.home');
    }

  }

]);
