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
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $cordovaSplashscreen) {

    $ionicPlatform.ready(function() {

          console.log('ready to hide the splash screen! We are currently in ', $state.current.name);
          console.log('waiting two seconds..');
          $timeout(function() {
            console.log('hiding splashscreen moving waiting one second before starting..');
            navigator.splashscreen.hide();
            $timeout(function() {

              var img_targets = getComponents();
              //
              $scope.startIntervals($scope.intervals, $scope.time_length, img_targets, $timeout);

              //automatically
              $timeout(function() {
                $state.go('^.onboarding-location');
              }, ($scope.intervals * $scope.time_length + 1000))

            }, 1000)
          },2000);
          // $state.go('^.onboarding-loading');
          // console.log('waiting four seconds to close');
          // $timeout(function() {
          //   $cordovaSplashscreen.hide();
          // },4000)
    });

    $scope.intervals = 10;
    $scope.time_length = 500;
    $scope.extra_delay = 3500;
    $scope.img_components = [];

    $scope.$on('$ionicView.loaded', function(){

    });



    $scope.startIntervals = function(intervals, time_length, targets, $timeout) {
      for (var i = 0; i < intervals; i++) {
        showTargetComponentAtIndex(targets[i], i, time_length * (i + 1), $timeout)
      }
    }

}]);

var showTargetComponentAtIndex = function (target, index, delay, $timeout) {
    $timeout(function() {
      target.style.display = 'block';
    }, delay);
}

var getComponents = function() {
  return document.getElementsByClassName('component');
}