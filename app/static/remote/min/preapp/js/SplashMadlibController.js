angular.module('uguru.preApp')
.controller('SplashMadlibController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'CategoryService',
  'UniversityService',
  'ContentService',
  'SpecService',
  function($scope, $state, $timeout, CategoryService, UniversityService, ContentService, SpecService) {
    var madlib = this;


    madlib.category = ($scope.splash && $scope.splash.category) || CategoryService.getLocalCategories()[0];
    madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
    madlib.options = {one: madlib.category.tags_data.blank_one_options, two: madlib.category.tags_data.blank_two_options}
    madlib.university = UniversityService.getBerkeleyLocal();



    // madlib.onEnter = function() {

    //   if ($scope.splash && !$scope.splash.state) {
    //     $scope.$watch('splash.state.madlib', function(newVal, oldVal) { newVal && madlib.activate() && $timeout(function() {$scope.$apply()})});
    //   } else {
    //     madlib.activate();
    //   }

    // };

    madlib.activate = function() {
      madlib.activated = true;
      var parentViewElement = document.querySelector('#splash-madlib');
      var allActivateElements = parentViewElement.querySelectorAll('[on-activate]');
      for (var i = 0; i < allActivateElements.length; i++) {
        allActivateElements[i].classList.add('activate');
      }
    };

    madlib.updateOptionByIndex = function(category, index, cb) {
      index = (index && parseInt(index)) || 0
      var blankNum = 'one';
      if (index > 3) {
        blankNum = 'two';
        index = index - 4
      }
      var newElem = ContentService.splashCategoryOptions[category.name].madlib['blank_' + blankNum + '_options'][index];
      madlib.options[blankNum][index] = newElem;
    }

    madlib.minifyForMap = function() {};

    //in case user switches category during map view
    madlib.returnNormalState = function() {};


    // madlib.categorySwitch = function() {

    //   // var elems = document.querySelectorAll('[on-category-switch-exit]')
    //   // for (var i = 0; i < elems.length; i++) {
    //   //   var elemIndex = elems[i];

    //   //   elemIndex.classList.add('on-category-switch-exit');
    //   // }
    // }

    // $scope.$watch('splash.category', function(newVal, oldVal) {
    //     madlib.category = newVal;
    //     madlib.category.tags_data = ContentService.splashCategoryOptions[madlib.category.name].madlib;
    // })


    //todo samir
    madlib.onUniversityChanged = function() {};
    madlib.spec = {data: {toggleDev:false, toggleSpec: false}};
    var states = {
      onClickOne: '[blank-num="1"] a',
      onClickTwo: '[blank-num="2"] a',
      onActivate: madlib.activate,
      onDeselectClickOne: '[blank-num="1"] .translate-blank-1',
      onDeselectClickTwo: '[blank-num="2"] .translate-blank-2',
      onCategorySwitch: madlib.categorySwitch
    }
    // SpecService.initSpec(madlib, $scope, '#splash-madlib', 'madlib', 'preapp/templates/splash.madlib.html', 'preapp/js/SplashMadlibController.js', states, 'preapp/css/scss/partials/adlib/_main.scss');
    SpecService.initSpec('madlib', $scope);
    // $timeout(function() {
    //       $scope.root.devMode && madlib.onEnter();
    // }, 2000);




  }
])
