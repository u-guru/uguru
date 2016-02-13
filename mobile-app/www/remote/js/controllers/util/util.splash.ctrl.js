angular.module('uguru.util.controllers')

.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$interval',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform, $interval) {

    // $scope.request = RequestService.initStudentForm();

    $scope.$on('$ionicView.loaded', function() {
        $timeout(function() {
          // s.refresh();
          s = skrollr.init({
            skrollrBody:'skrollr-body'
          })
          s.refresh();
          // s.setScrollTop(1000);
          $interval(function() {
            console.log('max scrolling', s.getMaxScrollTop(), 'current:', s.getScrollTop());

            // s.setScrollTop(700);

          }, 1000)
        }, 5000)
    });


  }
])


