angular.module('uguru.onboarding.controllers')

.controller('OnboardingLoadingController', [
    '$scope',
    '$state',
    '$timeout',
    '$localstorage',
    'Geolocation',
    '$ionicPosition',
    '$cordovaDialogs',
    '$cordovaGeolocation',
    '$ionicPlatform',
    '$cordovaSplashscreen',
    '$cordovaStatusbar',
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar) {

    $scope.intervals = 10;
    $scope.time_length = 500;
    $scope.root.vars.onboarding = true;
    $scope.extra_delay = 3500;
    $scope.img_components = [];

    $scope.startIntervals = function(intervals, time_length, targets, $timeout) {
      for (var i = 0; i < intervals; i++) {
        showTargetComponentAtIndex(targets[i], i, time_length * (i + 1), $timeout)
      }
    }

    $timeout(function() {

        var img_targets = getComponents();


        $scope.startIntervals($scope.intervals, $scope.time_length, img_targets, $timeout);

        //automatically
        $timeout(function() {
          if ($scope.user.university_id) {
            $state.go('^.student-home');
            $scope.loader.show();
          } else {
            $state.go('^.onboarding-location');
          }
        }, ($scope.intervals * $scope.time_length + 1000))

    }, 1000);

}]);

var showTargetComponentAtIndex = function (target, index, delay, $timeout) {
    $timeout(function() {
      target.style.display = 'block';
    }, delay);
}

var getComponents = function() {
  return document.getElementsByClassName('component');
}