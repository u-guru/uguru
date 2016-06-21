angular.module('uguru.preApp', ['ionic'])
.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$rootScope',
  'CategoryService',
  'UniversityService',
  function($scope, $state, $timeout, $rootScope) {
    // Listen for the event.
    var splash = this;
    splash.state = {};
    splash.categories = CategoryService.getLocalCategories();
    splash.category = splash.categories[0];
    console.log(splash.category);
    portalElem.addEventListener('splashMainLoadingComplete', function (e) {

      var loaderPortal = document.querySelector('.loader-portal');
      if (loaderPortal) {
        loaderPortal.style.display = 'none';
        loaderPortal.parentNode.removeChild(loaderPortal);
      }

      document.querySelector('#loader-wrapper .pageload-overlay svg.transition').style.visibility = "visible";
      document.querySelector('#loader-wrapper').style.visibility = "hidden"
      globalLoader.hide();
      splash.renderView = true;
      splash.state.madlib = true;
      splash.state.device = false;
      $timeout(function() {

        $scope.$apply();
      }, 100)
    }, false);


    $scope.$watchCollection(angular.bind(this, function () {
      return this.state; // `this` IS the `this` above!!
    }), function (newVal, oldVal) {
      // now we will pickup changes to newVal and oldVal
    });

  }
])
