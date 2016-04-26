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
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate,
    $ionicViewSwitcher) {

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
              if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
                $cordovaKeyboard.hideAccessoryBar(true);
              }
            } else {
              $ionicSlideBoxDelegate.enableSlide(true);
              if ($scope.platform.ios && $cordovaKeyboard.hideAccessoryBar) {
                $cordovaKeyboard.hideAccessoryBar(true);
              }
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