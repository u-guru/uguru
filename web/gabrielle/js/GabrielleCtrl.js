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


    var gabrielle = this;
    var states = {};

    gabrielle.spec = {data: {toggleDev:false, toggleSpec: false}};
    $timeout(function() {
      SpecService.initSpec(gabrielle, $scope, '#gabrie-view', 'gabrielle', 'gabrielle/templates/index.html', 'gabrielle/js/GabrielleController.js', states)
    }, 1000);
}
