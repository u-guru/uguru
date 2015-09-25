angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestGuruTypeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicHistory) {

    $scope.validateForm = function() {
      if ($scope.root.vars.request.type.in_person || $scope.root.vars.request.type.online) {
        $ionicHistory.goBack();
      } else {
        alert('Please select at least one option');
      }
    }

    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    };

  }
]);

