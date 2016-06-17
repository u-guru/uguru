angular.module('uguru.shared.controllers')
// angular.module('uguru.shared.controllers')
.controller('GuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
    var guru = this;
    guru.category = $scope.category.name;
    guru.section_index = 0;
  }
]);

