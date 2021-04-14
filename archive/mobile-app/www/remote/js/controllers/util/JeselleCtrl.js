angular.module('uguru.util.controllers')
.controller('JeselleController', [
  '$scope',
  '$timeout',
  '$state',
  'KeyboardService',
  'SpecService',
  JeselleController
  ]);

function JeselleController($scope, $timeout, $state, KeyboardService, SpecService) {


    function switchState(index) {
        // switch (index) {

        // }
    }
    $scope.switchState = switchState;

    function pauseTimer() {

    };

    SpecService.initSpec($scope, '#jeselle-view', 'jeselle', 'jeselle/index.html', 'controllers/util/JeselleCtrl.js');
}
