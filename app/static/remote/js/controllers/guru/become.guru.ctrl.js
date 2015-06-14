angular.module('uguru.guru.controllers')

.controller('BecomeGuruController', [

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
    $scope.injectAnimated = false;

    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;
    }

    $scope.goToUniversity = function() {
      $state.go('^.university');
    }

    $ionicSideMenuDelegate.canDragContent(false);


    //

    //handles status bar for light / dark screens
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

    var injectClassIntoElement = function(e) {
      element = e.target
      console.log(element.className);
      if (element.className.indexOf('selected') === -1) {
        element.className += " animated flip";
        $scope.tempElement = element;
        $timeout(function() {
          $scope.tempElement.className += ' selected';
        }, 500);
      }
    }

    $scope.initiateSkillEventListeners = function() {

      var skill_elements = document.getElementsByClassName("course-tag");
      console.log(skill_elements.length, 'on course tag');

      for (var i = 0 ; i < skill_elements.length ; i++) {
        var element = skill_elements[i];
        ionic.onGesture('tap', injectClassIntoElement, element, {});
        // element.addEventListener("mouseleave", function(e) {
        //   console.log(this.className);
        //   if (this.className.indexOf('selected') === -1) {
        //     this.className += " animated flip";
        //     $scope.tempElement = this;
        //     $timeout(function() {
        //       $scope.tempElement.className += ' selected';
        //     }, 500);
        //   }
        // })
      }

    }

    $scope.$on('$ionicView.enter', function(){
      $timeout(function() {
        $scope.initiateSkillEventListeners();
      }, 500);
    });

  }


])