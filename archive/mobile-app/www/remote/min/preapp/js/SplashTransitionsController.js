angular.module('uguru.preApp')
.controller('SplashTransitionsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var device = this;

    SpecService.initSpec('transitions', $scope);
  }
])


