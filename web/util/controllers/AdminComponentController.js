angular.module('uguru.admin')

.controller('AdminComponentController', [
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {

      var base_comp = this;

      SpecService.initSpec('base_comp', $scope);

  }

])