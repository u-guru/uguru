angular.module('uguru.util.controllers')

.controller('OnboardingController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$cordovaStatusbar',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar) {


    $scope.activeSlideIndex = 0;
    $scope.injectAnimatedHand = false;
    $scope.injectAnimatedPhone = false;

    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;
    }

    $scope.goToUniversity = function() {
      $state.go('^.university');
    }

    $ionicSideMenuDelegate.canDragContent(false);

    $ionicPlatform.ready(function() {

        $scope.turnStatusBarWhite = function() {

          if (window.StatusBar) {

            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(true);
          }

        }

        $scope.turnStatusBarBlack = function() {
          if (window.StatusBar) {
                      // console.log('Extra #1. Styling iOS status bar to black \n\n');

            StatusBar.styleDefault();
            StatusBar.overlaysWebView(true);
          }
        }

        $scope.turnStatusBarWhite();

    });

    $scope.$on('$ionicView.loaded', function(){
      var time_delay = 1000;
      if ($scope.platform.mobile) {
        var time_delay = 2000;
      }
      $timeout(function() {
        $scope.injectAnimatedHand = true;
      }, time_delay);

      $timeout(function() {
        $scope.injectAnimatedPhone = true;
      }, time_delay);

    });

  }


])