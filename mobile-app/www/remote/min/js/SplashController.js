angular.module('uguru.preApp', ['ionic'])
.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
    // Listen for the event.
    var s = this;

    portalElem.addEventListener('shouldRenderView', function (e) {
      s.renderView = true;
      $timeout(function() {
        $scope.$apply();
      })
    }, false);

    // $scope.$on('$ionicView.enter', function() {

    // });

  }
])


