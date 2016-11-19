angular.module('uguru.shared.controllers')

.controller('SingleViewController', [
  '$scope',
  '$state',
  '$timeout',
  '$filter',
  '$stateParams',
  'XHRService',
  'DataService',
  function($scope,  $state, $timeout, $filter, $stateParams, XHRService, DataService) {
    var pfx = $stateParams.prefix;
    eval('var ' + $stateParams.prefix  + '=this;');
    eval('var pfx=this');


    var listener = $scope.$watch('data', function(value) {
      if (value) {
        pfx.data = value;
        listener();
        DataService.parseAppDataJson(pfx.data);
      }
    })

  }

])
