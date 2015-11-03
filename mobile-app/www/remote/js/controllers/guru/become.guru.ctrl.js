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
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicSlideBoxDelegate, $ionicViewSwitcher, $window, University, uTracker, AnimationService,
    Category,DeviceService, Utilities, $interval, KeyboardService, LoadingService) {
    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;

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

      uTracker.track(tracker, 'Student Home');
      $ionicViewSwitcher.nextDirection('back');
      $ionicSlideBoxDelegate.update();
      $state.go('^.home');

      $timeout(function() {
        // var slidebox = document.querySelectorAll('.become-guru-slidebox-container')[0];
        // if (slidebox) slidebox.remove();
        $scope.$destroy;
      }, 400);
    }
    var clearAllSearchInputs = function() {
      var inputs = document.querySelectorAll('input');
      console.log(inputs.length, 'found');
      for (var i = 0; i < inputs.length; i ++) {
        var currentIndexInput = inputs[i];
        currentIndexInput.value = '';
      }

    }

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }



    $scope.activeSlideIndex = 0;
    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;

      KeyboardService.closeKeyboardIfExists();
      clearAllSearchInputs();

      if (index === 0) {
        $timeout(function() {
          console.log("broadcasting schoolChange!");
          $rootScope.$emit('schoolChange');
        }, 0);

        $timeout(function() {
          $scope.loader.hide();
        }, 500)

        uTracker.track(tracker, 'Become Guru: Majors');

        var majorsList = document.querySelectorAll('#major-list');

        $timeout(function() {
          if (Utilities.isElementInViewport(majorsList)) {
            var majors = majorsList[0].querySelectorAll('ul li');
            if(majors.length === 0) {
              var timer = 10;
              LoadingService.showAmbig('Fetching majors...', (timer * 1000));
              var counter = 0;
              var startScanner = $interval(function() {
                University.refresh();
                console.log("Waiting for majors to load...");
                var majors = majorsList[0].querySelectorAll('ul li');
                counter++;
                if (majors.length !== 0 || counter === timer) {
                  console.log("stopping loader");
                  LoadingService.hide();
                  stopLoader();
                }
              }, 1000)

              function stopLoader() {
                $interval.cancel(startScanner);
              }
            }
          }
        }, 500)

        $ionicSideMenuDelegate.canDragContent(false);
      }

      else if (index === 1) {
        $timeout(function() {
          console.log("broadcasting schoolChange!");
          $rootScope.$emit('schoolChange');
        }, 0);

        uTracker.track(tracker, 'Become Guru: Courses');
        console.log("inside courses slide");

        $scope.init

        var coursesList = document.querySelectorAll('#courses-list');

        $timeout(function() {
          if (Utilities.isElementInViewport(coursesList)) {


            var items = coursesList[0].querySelectorAll('ul li');

            if (items.length === 0) {
              $rootScope.$emit('refreshCourses');
              $rootScope.$emit('loadCourses');
              var timer = 10;
              LoadingService.showAmbig('Fetching courses...', (timer * 1000));
              var counter = 0;
              var startScanner = $interval(function() {
                
                University.refresh();
                console.log("checking if courses are loaded...");
                var items = coursesList[0].querySelectorAll('ul li');
                console.log("items.length: " + items.length);
                counter++;
                if (items.length !== 0 || counter === timer) {
                  console.log("stopping loader");
                  LoadingService.hide();
                  stopLoader();
                }
              }, 1000);


              function stopLoader() {
                $interval.cancel(startScanner);
                // Display a message about being unable to fetch data and possibly a button to attempt to reconnect.

              }
            }
          }
        }, 500);
      }

      else if (index === 2) {
          $ionicSlideBoxDelegate.update();
          $scope.categories = Category.categories;
        try {
          $interval.cancel(startScanner)
        } catch (err) {
          console.log("Error in canceling interval startScanner: " + err);
        }

        uTracker.track(tracker, 'Become Guru: Skills');
        $ionicSideMenuDelegate.canDragContent(true);
      }

      else if (index === 3) {

        uTracker.track(tracker, 'Become Guru: Photo');
        $ionicSideMenuDelegate.canDragContent(false);
      }
       else {
        $ionicSideMenuDelegate.canDragContent(true);
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
    // $scope.onDragLeft = function() {

    //   if ($scope.activeSlideIndex === 0) {
    //     $ionicSlideBoxDelegate.enableSlide(true);
    //   }
    // }

    $scope.goToUniversity = function() {

      uTracker.track(tracker, 'University List');
      $state.go('^.university');
    }

    $scope.goToGuruMode = function() {

      uTracker.track(tracker, 'Guru Mode');
      $scope.root.vars.guru_mode = true;
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru');
    }

    $ionicSideMenuDelegate.canDragContent(false);


    $scope.initSlideBoxModals = function() {


      // $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
      //       scope: $scope,
      //       animation: 'slide-in-up'
      // }).then(function(modal) {
      //     $scope.categorySkillsModal = modal;
      // });


    }


    // var injectClassIntoElement = function(e) {
    //   element = e.target
    //   console.log(element.className);
    //   if (element.className.indexOf('selected') === -1) {
    //     element.className += " animated pulse";
    //     $scope.tempElement = element;
    //     $timeout(function() {
    //       $scope.tempElement.className += ' selected';
    //     }, 500);
    //   }
    // }

    // var incrementProgressBar = function(elemId, value) {
    //   console.log(document.querySelector('#become-guru-progress'));
    //   document.querySelector('#become-guru-progress').setAttribute("value", value);
    // }

    // var initProgressBar = function(elemId,width, value) {
    //   var progressBarTag = document.getElementById(elemId);
    //   progressBarTag.style.width = width + 'px';
    // }

    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {

          $scope.initSlideBoxModals();
        }, 500);
    });


    // $scope.$on('$ionicView.beforeEnter', function() {
    //   $ionicSlideBoxDelegate.update();
    //   //since this is the same as entering the slidebox
    //   var universityId = $scope.user.university && $scope.user.university_id || 2307;

    //   if (DeviceService.isIOSDevice()) {
    //     DeviceService.ios.setStatusBarText($state.current.name);
    //   }

    //   $timeout(function() {

    //     $scope.initSlideBoxModals();
    //   }, 500);


    // }, 500)


  }



])