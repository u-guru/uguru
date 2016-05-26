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
    //directives to create
    //svg
    //onhover w/delay
    //typewritten text
    //activate-on-class-ar

    //TO ADD Spec
    //transitions
    //onEnter
    //onHoverTag
    //onClickTag
    //onDeselectTag
    //onBothTagsSelected (put away the tags)
    //onCategorySwitched (all tags)
    //onUniversitySwitched (all tags)
    //onMapRender

    madlib.category = ($scope.splash && $scope.splash.category) || CategoryService.getLocalCategories()[0];

    madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
    madlib.university = UniversityService.getBerkeleyLocal();

    madlib.onEnter = function() {};

    madlib.activate = function() {};

    madlib.minifyForMap = function() {};

    //in case user switches category during map view
    madlib.returnNormalState = function() {};


    $scope.$watch('splash.category', function(newVal, oldVal) {
      if (!$scope.splash.state.madlib) return;
      var elem = document.querySelector('[on-category-switch-enter]')
      elem && elem.classList.add('on-category-switch-enter');
      // madlib.category = $scope.splash.category;
      // madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
      $timeout(function() {
        $scope.$apply();
      })
    })

    //todo samir
    madlib.onUniversityChanged = function() {};

  }
])


