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
  '$ionicSlideBoxDelegate',
  '$ionicViewSwitcher',
  '$window',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicSlideBoxDelegate,
    $ionicViewSwitcher, $window) {

    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;
    $scope.majors = $scope.static.majors;
    $scope.courses = $scope.static.courses;



    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.goBackToStudentHome = function() {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.home');
    }


    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.major_input=  {search_text:'', majors:$scope.root.vars.majors};

    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;
    }

    $scope.goToUniversity = function() {
      $state.go('^.university');
    }

    $scope.goToGuruMode = function() {
      $scope.root.vars.guru_mode = true;
      $state.go('^.guru');
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
        element.className += " animated pulse";
        $scope.tempElement = element;
        $timeout(function() {
          $scope.tempElement.className += ' selected';
        }, 500);
      }
    }

    $scope.initiateSkillEventListeners = function() {

      var skill_elements = document.getElementsByClassName("skill-tag");

      for (var i = 0 ; i < skill_elements.length ; i++) {
        var element = skill_elements[i];
        ionic.onGesture('tap', injectClassIntoElement, element, {});
      }

      var major_elements = document.getElementsByClassName("major-tag");

      for (var j = 0 ; j < major_elements.length ; j++) {
        var major_element = major_elements[j];
        ionic.onGesture('tap', injectClassIntoElement, major_element, {});
      }

      var course_elements = document.getElementsByClassName("popular-course-tag");

      for (var k = 0 ; k < course_elements.length ; k++) {
        var course_element = course_elements[k];
        ionic.onGesture('tap', injectClassIntoElement, course_element, {});
      }

    }

    var incrementProgressBar = function(elemId, value) {
      console.log(document.querySelector('#become-guru-progress'));
      document.querySelector('#become-guru-progress').setAttribute("value", value);
    }

    var initProgressBar = function(elemId,width, value) {
      var progressBarTag = document.getElementById(elemId);
      progressBarTag.style.width = width + 'px';
    }


    $scope.$on('$ionicView.beforeEnter', function(){


      initProgressBar('become-guru-progress', window.innerWidth);

    });

    $scope.$on('$ionicView.enter', function(){

      $timeout(function() {
        $scope.initiateSkillEventListeners();
      }, 500);

      $timeout(function(){
        console.log('calling incrementProgressBar')
        incrementProgressBar('become-guru-progress', 30);
      }, 500);


      $scope.slidebox_handle = $ionicSlideBoxDelegate.$getByHandle('become-guru-slide-box');


    });


  }


])