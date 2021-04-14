angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestSessionLengthController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicHistory) {

    $scope.indexToValueMinutes = [null, 0, 15, 30, 45];

    $scope.validateForm = function() {
      if (($scope.root.vars.request._length.hours !== null) && ($scope.root.vars.request._length.minutes !==null)) {
        $ionicHistory.goBack();
      } else {
        alert('Please select at least one option');
      }
    }

    if (!$scope.root.vars.request._length.hours) {
      $scope.root.vars.request._length.hours = 2;
    }

    if (!$scope.root.vars.request._length.minutes) {
      $scope.root.vars.request._length.minutes = 0;
    }

    $scope.incrementHour = function() {
      if ($scope.root.vars.request._length.hours <= 9) {
        $scope.root.vars.request._length.hours += 1;
      }
    }

    $scope.decrementHour = function() {
      if ($scope.root.vars.request._length.hours > 0) {
        $scope.root.vars.request._length.hours -= 1;
      }
    }

    $scope.decrementMinute = function() {
      if ($scope.root.vars.request._length.minutes > 1 ) {
        $scope.root.vars.request._length.minutes -= 1;
      }
    }

    $scope.incrementMinute = function() {
      if ($scope.root.vars.request._length.minutes <= 3) {
        $scope.root.vars.request._length.minutes += 1;
      }
    }

    $scope.goBackToGuruType = function() {
      // $state.go('^.request-guru-type');
      $ionicHistory.goBack();
    };

  }
]);

