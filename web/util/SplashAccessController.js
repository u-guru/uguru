angular.module('uguru.preApp')
.controller('SplashAccountController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var access = this;

    // var account.activate = AccountService.active();

    SpecService.initSpec('access', $scope);

  }
])


