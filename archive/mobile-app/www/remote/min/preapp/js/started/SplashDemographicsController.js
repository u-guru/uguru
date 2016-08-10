angular.module('uguru.preApp')
.controller('SplashDemographics', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {

    var demographic = this;

    // var account.activate = AccountService.active();

    SpecService.initSpec('account', $scope);

  }
])


