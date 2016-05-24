angular.module('uguru.preApp')
.controller('SplashMadlibController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'CategoryService',
  'UniversityService',
  'ContentService',
  function($scope, $state, $timeout, CategoryService, UniversityService, ContentService) {
    var madlib = this;
    madlib.category = CategoryService.getAcademicLocal();
    madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
    madlib.university = UniversityService.getBerkeleyLocal();
    //todo
    //get remainder categories
  }
])


