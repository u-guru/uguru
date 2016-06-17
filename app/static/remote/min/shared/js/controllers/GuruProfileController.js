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
    guru.category = CategoryService.getLocalCategories().filter(function(el) {return el.name === $state.params.categoryName})[0];
    guru.category = guru.category.name;
    guru.section_index = 0;

    guru.spec = {data: {toggleDev:true, toggleSpec: false}};

    SpecService.initSpec(guru, $scope, '#guru-profile-view', 'guru', 'shared/templates/guru.profile.html', 'shared/js/controllers/GuruProfileController.js', {}, 'shared/css/scss/profiles.scss');

  }
]);

