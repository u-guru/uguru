angular.module('uguru.guru.controllers')

.controller('BecomeGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$ionicSlideBoxDelegate',
  '$ionicViewSwitcher',
  '$window',
  'University',
  'uTracker',
  'AnimationService',
  'Category',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $ionicSlideBoxDelegate,
    $ionicViewSwitcher, $window, University, uTracker, AnimationService,
    Category) {
    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;

    $scope.search_text = '';

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
      $state.go('^.home');
      //AnimationService.slide('right');
    }

    $scope.removeUserGuruCoursesFromMasterCourses = function() {

      var guruIndicesToSlice = [];
      if ($scope.courses && $scope.user.guru_courses) {
        for (var i = 0; i < $scope.courses.length; i ++) {
          var indexCourse = $scope.courses[i];
          for (var j = 0; j < $scope.user.guru_courses.length; j++) {
            guru_course  = $scope.user.guru_courses[j];
            if (index_course.id === guru_course.id)
              guruIndicesToSlice.push(i);
          }
        }
        // tricky plz ask;
        var offset = 0;
        for (var i = 0; i < guruIndicesToSlice.length; i++) {
          $scope.guru_courses.splice(i - offset, i - offset + 1);
          offset++;
        }

      }


    }


    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.major_input=  {search_text:'', majors:$scope.root.vars.majors};

    $scope.getCoursesFromServer = function() {
            University.getCourses(2732).then(
                  function(courses) {
                      $scope.loader.hide();

                      $localstorage.setObject('courses', courses);
                      $scope.root.vars.courses = courses;
                      $scope.root.vars.popular_courses = $scope.root.vars.courses.slice(0, 16);

                },
                  function(error) {
                      console.log('Courses NOT successfully loaded');
                      console.log(error);
                      alert('Something went wrong - please contact support for further, quick assistance!')
                }
        );
      }

    $scope.activeSlideIndex = 0;
    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;

      if (index === 0) {

        uTracker.track(tracker, 'Become Guru: Majors');

        $ionicSideMenuDelegate.canDragContent(false);
      }

      if (index === 1) {

        uTracker.track(tracker, 'Become Guru: Courses');

        $scope.guruCoursesInput = document.getElementById('course-input-1');
        $scope.removeUserGuruCoursesFromMasterCourses()
      }

      if (index === 2) {

        uTracker.track(tracker, 'Become Guru: Skills');
        $ionicSideMenuDelegate.canDragContent(true);
      }

      if (index === 3) {

        uTracker.track(tracker, 'Become Guru: Photo');
        $ionicSideMenuDelegate.canDragContent(true);
      }
       else {
        $ionicSideMenuDelegate.canDragContent(true);
      }
    }

    $scope.onDragLeft = function() {

      $ionicSideMenuDelegate.canDragContent(false);
      $ionicSlideBoxDelegate.enableSlide(false);

      return;
    }

    $scope.onDragRight = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSlideBoxDelegate.enableSlide(false);
      }

      return;
    }
    $scope.onDragLeft = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSlideBoxDelegate.enableSlide(true);
      }
    }

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


    //



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

    $scope.$on('$ionicView.enter', function() {

      uni_id = ($scope.user.university&& $scope.user.university.id);
      //fallback --> to make sure courses are always there
      if (!uni_id && LOCAL) {
        LOCAL = 2307;
      }

      $scope.categories = Category.categories.slice() || $scope.getCategories();
      console.log($scope.categories.length, 'entering become guru');
      $scope.majors = University.majors.slice() || $scope.getMajorsForUniversityId(uni_id)
      console.log($scope.majors.length, 'entering become guru');
      $scope.courses = University.majors.slice() || $scope.getCoursesForUniversityId(uni_id)
      console.log($scope.courses.length, 'entering become guru');

    }, 500)
    $scope.$on('$ionicView.afterEnter', function() {

      $scope.majorInput = document.getElementById('major-input-1');

    })


  }


])