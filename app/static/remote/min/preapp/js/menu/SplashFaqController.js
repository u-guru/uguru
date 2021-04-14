angular.module('uguru.preApp')
.controller('SplashFaqController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var device = this;

    SpecService.initSpec('faq', $scope);
  }
])


