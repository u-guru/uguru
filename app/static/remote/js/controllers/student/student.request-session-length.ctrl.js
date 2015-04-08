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
    console.log($scope.root.vars.request);
    $scope.validateForm = function() {
      console.log($scope.root.vars.request._length.hours, $scope.root.vars.request._length.minutes);
      if (($scope.root.vars.request._length.hours !== null) && ($scope.root.vars.request._length.minutes !==null)) {
        $ionicHistory.goBack();
      } else {
        alert('Please select at least one option');
      }
    }

    $scope.goBackToGuruType = function() {
      // $state.go('^.request-guru-type');
      $ionicHistory.goBack();
    };

  }
]);

