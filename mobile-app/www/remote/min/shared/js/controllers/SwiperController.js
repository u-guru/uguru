angular.module('uguru.shared.controllers')
.controller('SwiperController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var swiper = this;

    // var account.activate = AccountService.active();

    SpecService.initSpec('swiper', $scope);

  }
])


