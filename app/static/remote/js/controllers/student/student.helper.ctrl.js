angular.module('uguru.student.controllers')

.controller('StudentHelperController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  function($scope, $state, $timeout, $localstorage) {
    $scope.helperIndex = 0;
    $scope.options = {
        emails: {locked: true},
        notifications: {locked:false},
        request_referrals: {locked:false},
        complete_profile: {locked:false},
        create_request: {locked:true},
    };
    $scope.setHelperIndex = function(index) {
        $scope.helperIndex = index;
    }
  }
])