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

    $timeout(function() {
      CTAService.initSingleCTA('#cta-box-shop-billing', '#student-shop', function() {
        $scope.card = {exp: '', number: '', cvc: '', placeholder:"**** **** **** 4242"};
        initHandlers($scope, '#student-shop');
      });
    }, 500)

    $scope.studentPurchasesCredits = function(option_num) {
        LoadingService.showAmbig();
        PaymentService.purchaseCredits(option_num, $scope);
    }

  }
])