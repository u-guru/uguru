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

    //onInit
    //onactivate
    //onhover
    //onClickOne
    //onClickTwo
    //onDeselect
    //onCategoryChange
    //TODO: onUniversitySwitch
    //onBothFilled


    madlib.onEnter = function() {

      if ($scope.splash && !$scope.splash.state) {
        $scope.$watch('splash.state.madlib', function(newVal, oldVal) { newVal && madlib.activate() && $timeout(function() {$scope.$apply()})});
      } else {
        madlib.activate();
      }

    };

    madlib.activate = function() {
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
    }, 1000)

    madlib.onEnter();

  }
])


