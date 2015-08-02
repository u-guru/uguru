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
  '$ionicSlideBoxDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate) {


    document.addEventListener("deviceready", function () {

      if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
        $cordovaKeyboard.hideAccessoryBar(false);
      }

    });


    $scope.activeSlideIndex = 0;
    $scope.injectAnimatedHand = false;
    $scope.injectAnimatedPhone = false;

    $scope.user_bgs = [{name: 'student'}, {name:'professional'}, {name:'HS student'}];
    $scope.selectedBg = $scope.user_bgs[0];

    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;


      if (index === 1) {
        $scope.universityInput = document.getElementById('university-input');
        if ($scope.universityInput) {

          $scope.universityInput.addEventListener("keyup", function() {
            if ($scope.universityInput.value && $scope.universityInput.value.length) {
              $ionicSlideBoxDelegate.enableSlide(false);
            } else {
              $ionicSlideBoxDelegate.enableSlide(true);
            }
          });

        }
      }

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



    $scope.$on('$ionicView.afterLeave', function(){
      if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
        $cordovaKeyboard.hideAccessoryBar(true);
      }
    });

    $scope.$on('$ionicView.loaded', function(){



          document.addEventListener("deviceready", function () {


            if ($scope.platform.mobile) {
              var time_delay = 1000;
            }
            $timeout(function() {
              $scope.injectAnimatedHand = true;
            }, time_delay);

            $timeout(function() {
              $scope.injectAnimatedPhone = true;
            }, time_delay);

          });


          $timeout(function() {

            if (!$scope.injectAnimatedHand || !$scope.injectAnimatedPhone) {
              $scope.injectAnimatedHand = true;
              $scope.injectAnimatedPhone = true;
            }

          }, 1250);


    });

  }


])