angular.module('uguru.guru.controllers')

.controller('BecomeGuruController', [

  //All imported packages go here
  '$rootScope',
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicSlideBoxDelegate',
  '$ionicViewSwitcher',
  '$window',
  'University',
  'uTracker',
  'AnimationService',
  'Category',
  'DeviceService',
  'Utilities',
  '$interval',
  'KeyboardService',
  'LoadingService',
  '$stateParams',
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicSlideBoxDelegate, $ionicViewSwitcher, $window, University, uTracker, AnimationService,
    Category,DeviceService, Utilities, $interval, KeyboardService, LoadingService, $stateParams) {
    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;

    var startScanner;
    $scope.courses = [];

    if ($stateParams.universityObj) {
      $scope.university = $scope.universityObj;
      $scope.root.vars.university = $scope.university;
      $localstorage.setObject('university', $scope.university || $scope.user.university);
      $scope.user.university = $scope.university;
    }
    if ($scope.root.vars.university && !$stateParams.universityObj) {
      $scope.university = $scope.root.vars.university;
      $localstorage.setObject('university', $scope.university);
      $scope.user.university = $scope.university;
    }

    $timeout(function() {
      var localCacheUniversity = $localstorage.getObject('university');
      if (localCacheUniversity) {
        $scope.university = localCacheUniversity;
        $scope.root.vars.university = localCacheUniversity
        $localstorage.setObject('university', $scope.university);
        $scope.user.university = $scope.university;
      }
    });

    $scope.goBackOneLevel = function() {
      if ($scope.root.vars.university || $scope.university) {
        var university = $scope.university || $scope.root.vars.university;
        AnimationService.flip('^.universities', {}, {universityId:university.id, universityObj:university});
      } else {
        AnimationService.flip('^.home');
      }
    }

    $timeout(function() {
      $scope.courses = University.source.courses;

      if (!$scope.courses || !$scope.courses.length) {
        LoadingService.showAmbig("Loading Courses...", 10000);
        loadingCourseCallback = function(scope, courses) {
          scope.courses = courses;
          $scope.university.popular_courses = courses;
          $timeout(function() {
            LoadingService.hide();
          }, 250)
        }

        University.getPopularCourses($scope.user.university_id || $scope.university.id, $scope, loadingCourseCallback);
      }

    }, 50)



    var mapGuruCoursesToCategoriesObj = function(guru_courses) {
      guruCategoryCourses = [];
      for (var i = 0; i < guru_courses.length; i++) {
        var guru_course = guru_courses[i];
        guruCategoryCourses.push({
          name: guru_course.name,
          id: guru_course.id,
          active: true
        });
      }
      return guruCategoryCourses;
    }

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.goBackToStudentHome = function() {

      if (confirm('Are you sure? All progress will be lost')) {
        AnimationService.flip('^.university');
        return;
      }

      $ionicViewSwitcher.nextDirection('back');
      $ionicSlideBoxDelegate.update();

      // $timeout(function() {
      //   // var slidebox = document.querySelectorAll('.become-guru-slidebox-container')[0];
      //   // if (slidebox) slidebox.remove();
      //   $scope.$destroy;
      // }, 400);
    }
    var clearAllSearchInputs = function() {
      var inputs = document.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i ++) {
        var currentIndexInput = inputs[i];
        currentIndexInput.value = '';
      }

    }

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    if ($scope.user.profile_url) {
      $scope.root.vars.showFinishBecomeGuruButton = true;
    }

    $scope.activeSlideIndex = 0;
    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;

      KeyboardService.closeKeyboardIfExists();
      // clearAllSearchInputs();

       if (index === 1) {

          // uTracker.track(tracker, 'Become Guru: Courses');

          // var coursesList = document.querySelectorAll('#courses-list');

        if (index === 2) {
          $ionicSlideBoxDelegate.update();
          $scope.categories = Category.categories;

        }
        else if (index === 3) {

          uTracker.track(tracker, 'Become Guru: Photo');
          $ionicSideMenuDelegate.canDragContent(false);
          if ($scope.user.profile_url) {
            $scope.root.vars.showFinishBecomeGuruButton = true;
          }
        }
        else {
          $ionicSideMenuDelegate.canDragContent(true);
        }
      }
    }

    $scope.onDragLeft = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicSlideBoxDelegate.enableSlide(true);
      }
      if ($scope.activeSlideIndex === 3) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSlideBoxDelegate.enableSlide(false);
      }

      return;
    }

    $scope.onDragRight = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSlideBoxDelegate.enableSlide(false);
      }
      if ($scope.activeSlideIndex === 3) {
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicSlideBoxDelegate.enableSlide(true);
      }

      return;
    }

    $scope.goToUniversity = function() {

      uTracker.track(tracker, 'University List');
      $state.go('^.university');
    }

    $scope.goToGuruMode = function() {

      uTracker.track(tracker, 'Guru Mode');
      $scope.root.vars.guru_mode = true;
      $ionicViewSwitcher.nextDirection('forward');

      if ($scope.desktopMode) {
        $state.go('^.guru-home');
      } else {
        $state.go('^.guru');
      }

    }

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.$on('$ionicView.enter', function() {
        // $timeout(function() {
        //   $ionicSlideBoxDelegate.update();
        // }, 500)
    });

    $scope.hideLoader = function() {
      $timeout(function() {
        LoadingService();
      }, 1000)
    }

    // $scope.$on('$ionicView.beforeEnter', function() {
    //     if (!$scope.root.vars.becomeGuruCached) {
    //       $scope.root.vars.becomeGuruCached = true;
    //       LoadingService.showAmbig(null, 10000);
    //     }
    // });

  }



])