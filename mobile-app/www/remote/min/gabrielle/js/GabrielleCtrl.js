angular.module('uguru.preApp')
.controller('GabrielleController', [
  '$scope',
  '$timeout',
  '$state',
  'KeyboardService',
  'SpecService',
  GabrielleController
  ]);

function GabrielleController($scope, $timeout, $state, KeyboardService, SpecService) {


    function switchState(index) {

    }
    $scope.switchState = switchState;

    function pauseTimer() {

    };
    SpecService.initSpec($scope, '#gabrie', 'gabrie', 'gabrie/index.html', 'controllers/util/GabrielleCtrl.js');
}
