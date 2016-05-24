angular.module('uguru.preApp', ['ionic'])
.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
    // Listen for the event.
    var splash = this;
    splash.state = {};

    portalElem.addEventListener('splashMainLoadingComplete', function (e) {
      document.querySelector('#loader-wrapper').style.visibility = "hidden"
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


