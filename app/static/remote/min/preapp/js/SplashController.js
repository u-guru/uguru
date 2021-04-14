angular.module('uguru.preApp', ['ionic'])
.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$rootScope',
  'CategoryService',
  'UniversityService',
  'SpecService',
  function($scope, $state, $timeout, $rootScope, CategoryService, UniversityService, SpecService) {
    // Listen for the event.
    var splash = this;
    splash.state = {};
    splash.activate = {};
    splash.categories = CategoryService.getLocalCategories();
    splash.category = splash.categories[0];
    splash.universities = UniversityService.getTargetted().splice(0, 10);
    splash.university = splash.universities[0];



    // $scope.$watchCollection(angular.bind(this, function () {
    //   return this; // `this` IS the `this` above!!
    // }), function (newVal, oldVal) {

    //   // now we will pickup changes to newVal and oldVal
    // });

    splash.activate = splashActivateFunction




    function splashActivateFunction() {

      if ($scope.root.devMode) {
          splash.state.nav = true;
          splash.state.madlib = true;
          splash.state.sidebar = true;
          splash.state.device = true;
          splash.state.powerups = true;
          splash.state.universitySearch = true;
          SpecService.initSpec('splash', $scope);
          return;
      }

      portalElem && portalElem.addEventListener('splashMainLoadingComplete', function (e) {


        var loaderPortal = document.querySelector('.loader-portal');
        if (loaderPortal) {
          loaderPortal.style.display = 'none';
          loaderPortal.parentNode.removeChild(loaderPortal);
        }

        document.querySelector('#loader-wrapper .pageload-overlay svg.transition').style.visibility = "hidden";
        document.querySelector('#loader-wrapper').style.visibility = "hidden"
        $scope.showScaleOutLoader = true;

        globalLoader.hide();
        splash.renderView = true;
        $timeout(function() {
          splash.state.madlib = true;
        }, 2500)
        $timeout(function() {
          splash.state.nav = true;
        }, 1000)
        splash.state.sidebar = true;
        splash.state.device = true;
        splash.state.powerups = true;
        splash.state.universitySearch = true;
        $timeout(function() {

          $scope.$apply();
        }, 100)
      }, false);

    }



  }
]);
