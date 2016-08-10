angular.module('uguru.shared.controllers')
.controller('TourGuideController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var guide = this;

    // var account.activate = AccountService.active();

    SpecService.initSpec('guide', $scope);

  }
])


