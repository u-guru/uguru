angular.module('uguru.preApp')
.controller('JeselleController', [
  '$scope',
  '$timeout',
  '$state',
  'KeyboardService',
  'SpecService',
  JeselleController
  ]);

function JeselleController($scope, $timeout, $state, KeyboardService, SpecService) {
    var jeselle = this;
    var states = {};
    jeselle.spec = {data: {toggleDev:false, toggleSpec: false}};
    $timeout(function() {
      SpecService.initSpec(jeselle, $scope, '#jeselle-view', 'jeselle', 'jeselle/templates/index.html', 'jeselle/js/JeselleCtrl.js', states)
    }, 1000);
}
