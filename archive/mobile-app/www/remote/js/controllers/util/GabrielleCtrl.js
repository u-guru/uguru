angular.module('uguru.util.controllers')
.controller('GabrielleController', [
  '$scope',
  '$timeout',
  '$state',
  'KeyboardService',
  'SpecService',
  JeselleController
  ]);

function JeselleController($scope, $timeout, $state, KeyboardService, SpecService) {


    function switchState(index) {

    }
    $scope.switchState = switchState;

    function pauseTimer() {

    };
    SpecService.initSpec($scope, '#gabrie', 'gabrie', 'gabrie/index.html', 'controllers/util/GabrielleCtrl.js');
}
