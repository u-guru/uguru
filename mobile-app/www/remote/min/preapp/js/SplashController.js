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

    portalElem.addEventListener('splashMainLoadingComplete', function (e) {

      var loaderPortal = document.querySelector('.loader-portal');
      loaderPortal.style.display = "none";
      loaderPortal.parentNode.removeChild(loaderPortal);

      document.querySelector('#loader-wrapper').style.visibility = "hidden";
      document.querySelector('#loader-wrapper .pageload-overlay svg.transition').style.visibility = "visible";

      globalLoader.hide();
      splash.renderView = true;
      splash.state.madlib = true;
      splash.state.device = false;
      $timeout(function() {
        $scope.$apply();
      })
    }, false);


    $scope.$watchCollection(angular.bind(this, function () {
      return this.state; // `this` IS the `this` above!!
    }), function (newVal, oldVal) {
      console.log('old state', oldVal, 'new state', newVal);
      // now we will pickup changes to newVal and oldVal
    });

  }
])
