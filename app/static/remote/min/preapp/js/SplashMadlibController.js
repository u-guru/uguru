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
    madlib.university = UniversityService.getBerkeleyLocal();

    $scope.path_1 = "M120.543455,44.1654769 C120.543455,44.1654769 29.5163691,38.9274323 12.4796868,109.096741"
    madlib.onEnter = function() {

      if ($scope.splash && !$scope.splash.state) {
        $scope.$watch('splash.state.madlib', function(newVal, oldVal) { newVal && madlib.activate() && $timeout(function() {$scope.$apply()})});
      } else {
        madlib.activate();
      }

    };

    madlib.activate = function() {
      madlib.activated = true;
      var parentViewElement = document.querySelector('#splash-madlib');
      var allActivateElements = parentViewElement.querySelectorAll('[on-activate]');
      for (var i = 0; i < allActivateElements.length; i++) {
        allActivateElements[i].classList.add('activate');
      }
    };

    madlib.minifyForMap = function() {};

    //in case user switches category during map view
    madlib.returnNormalState = function() {};


    madlib.categorySwitch = function() {
      var elems = document.querySelectorAll('[on-category-switch-exit]')
      for (var i = 0; i < elems.length; i++) {
        var elemIndex = elems[i];
        console.log('on-category-switch-exit-elem', elems[i]);
        elemIndex.classList.add('on-category-switch-exit');
      }
    }


    //todo samir
    madlib.onUniversityChanged = function() {};
    madlib.spec = {data: {toggleDev:false, toggleSpec: false}};
    var states = {
      onInit: true,
      onHover: true,
      onClickOne: '[blank-num="1"] a',
      onClickTwo: '[blank-num="2"] a',
      onActivate: madlib.activate,
      onDeselectClickOne: '[blank-num="1"] .translate-blank-1',
      onDeselectClickTwo: '[blank-num="2"] .translate-blank-2',
      onCategorySwitch: madlib.categorySwitch
    }
    $timeout(function() {
      SpecService.initSpec(madlib, $scope, '#splash-madlib', 'madlib', 'preapp/templates/splash.madlib.html', 'preapp/js/SplashMadlibController.js', states)
      $timeout(function() {
        madlib.onEnter();
      }, 500)
    }, 1000)

  }
])


