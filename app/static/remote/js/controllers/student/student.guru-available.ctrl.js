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

    $scope.guru = {
      first_name: 'Shun',
      course:$scope.request.course.short_name,
      guru_courses: $scope.user.student_courses
    }

    $scope.goToGuruProfile = function() {
      $state.go('^.guru-profile', {guruObj:JSON.stringify($scope.guru)});
    }

    $scope.acceptGuru = function() {
      if ($scope.user.cards.length === 0) {
        $state.go('^.add-payment');
        return;
      }

      var session = {
          course: {short_name:'BIO101'},
          status: 'guru-transport',
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

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

  }

]);
