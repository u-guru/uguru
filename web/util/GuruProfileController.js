angular.module('uguru.shared.controllers')
// angular.module('uguru.shared.controllers')
.controller('GuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  'CategoryService',
  function($scope, $state, $timeout, SpecService, CategoryService) {
    var guru = this;
    guru.category = ($scope.splash && $scope.splash.category) || CategoryService.getLocalCategories()[0];
    guru.category = guru.category.name;
    guru.section_index = 0;

    // SpecService.initSpec('guru', $scope);

  }
]);

