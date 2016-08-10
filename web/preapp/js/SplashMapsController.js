angular.module('uguru.preApp')
.controller('SplashMapsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var device = this;

    SpecService.initSpec('splash_maps', $scope);
  }
])


