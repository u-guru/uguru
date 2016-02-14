  angular.module('uguru.util.controllers')

.controller('ShopController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$stateParams',
  'PaymentService',
  'CTAService',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $stateParams,
  PaymentService, CTAService, LoadingService) {
    CTAService.initSingleCTA('#cta-box-shop-billing', '#student-shop');

    $scope.studentPurchasesCredits = function(option_num) {
        LoadingService.showAmbig();
        PaymentService.purchaseCredits(option_num, $scope);
    }

  }
])