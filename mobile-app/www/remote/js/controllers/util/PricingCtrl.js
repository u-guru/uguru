angular.module('uguru.util.controllers')

.controller('BugsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'CounterService',
  function($scope, $state, $timeout, CounterService) {

    $scope.$on('$ionicView.loaded', function() {

      // $timeout(function() {
      //   var feeCounter = CounterService.initCounter(document.getElementById('our-fees'), 40, 0, 10, '%');
      //   CounterService.startCounter(feeCounter);
      //   var pricingCounter = CounterService.initCounter(document.getElementById('students-pay'), 100, 14, 10, '/hr', '$');
      //   CounterService.startCounter(pricingCounter);
      //   var chargeCounter = CounterService.initCounter(document.getElementById('guru-charge'), 100, 20, 10, '/hr', '&lsaquo;$');
      //   CounterService.startCounter(chargeCounter);
      // }, 5000)


    })



  }


])