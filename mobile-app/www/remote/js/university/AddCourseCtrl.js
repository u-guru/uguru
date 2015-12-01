angular.module('uguru.util.controllers')

.controller('CoursesController', [

  //All imported packages go here
  '$rootScope',
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  'University',
  'Utilities',
  'uTracker',
  'Course',
  'LoadingService',
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, University, Utilities, uTracker, Course, LoadingService) {


    $scope.courses = University.source.courses;

    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }

    $timeout(function() {

      if (!$scope.courses || !$scope.courses.length) {
        LoadingService.showAmbig("Loading Courses...", 10000);
        loadingCourseCallback = function(scope, courses) {
          scope.courses = courses;
          $timeout(function() {
            LoadingService.hide();
          }, 250)
        }

        University.getPopularCourses($scope.user.university_id, $scope, loadingCourseCallback);
      }

    }, 50)

    // $rootScope.$on('loadCourses', function() {
    //   console.log("heard loadCourses!");
    //   // $scope.courses = null;
    //   $scope.source = University.source;
    // });


    $scope.search_text = {
      course: ''
    };

    // $scope.refresh = {
    //   courses: '',
    //   coursesLength: $scope.courses.length
    // };

    function updateDOM() {
      if ($scope.courses.length > 0) {
          for(var j = 0; j < $scope.user.guru_courses.length; j++) {
            for(var k = 0; k < $scope.courses.length; k++) {
              if($scope.courses[k].id === $scope.user.guru_courses[j].id) {
                console.log("Duplicate course found, deleting...");
                $scope.courses.splice(k, 1);
              }
            }
          }
      }

      // $scope.refresh.coursesLength = $scope.courses.length;
      // University.refresh();
    }



    $scope.alwaysTrue = true;
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

    if ($scope.root.vars.guru_mode || $state.current.name === 'root.become-guru') {
      $scope.editCourseMode = false;
      //$scope.search_text.course = '';
    }

    $scope.swipeRightGoBack = function() {
      if (confirm('Exit become guru process?')) {
        LoadingService.show();
        $ionicSideMenuDelegate.toggleRight();
        $timeout(function() {
          LoadingService.hide();
        }, 500);
      }
    };

    $scope.clearSearchInput = function() {
      $scope.search_text.course = '';
    };

    $scope.editCourses = function() {
      console.log('show delete should be here');
    };



    $scope.updateProgress = function(input_text) {

      $scope.progress = (input_text.length > 0);
    };


    $scope.removeGuruCourseAndUpdate = function(course, index) {

      var courseName = course.title || course.name;

      if (!confirm('Remove ' + courseName + '?')) {
        return;
      }

      $scope.user.guru_courses.splice(index, 1);
      $scope.courses.push(course);
      $scope.$apply();
      // updateDOM();

      var confirmCallback = function() {

        uTracker.track(tracker, 'Course Guru Removed', {
          '$Course': course.name
        });
        //LoadingService.showSuccess(course.name + ' successfully removed', 1200);
      };

      $localstorage.setObject('user', $scope.user);

      $timeout(function() {
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, confirmCallback, $scope);
      }, 200);

    };


    $scope.cancelStudentAddCourse = function() {
      $scope.showCourseInput = !$scope.showCourseInput;
      $scope.studentCourseInput.value = "";
    };

    $scope.addSelectedStudentCourse = function(course, input_text, $index) {


      $scope.search_text.course = '';
      $scope.courses.splice($index, 1);
      //set the course text to what it should be
      // $scope.studentCourseInput.value = '';
      // $scope.search_text.course = course.name

      $scope.user.student_courses.push(course);

      $localstorage.setObject('user', $scope.user);

      $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);

      $scope.root.vars.remote_cache.push({'add_student_course': course});

    };

    $scope.addSelectedGuruCourse = function(course) {
      console.log("Add course :",course)

      for(var i=0; i < $scope.courses.length; i++) {
        if($scope.courses[i].id === course.id) {
          console.log("transferring course from source to user");
          $scope.courses.splice(i, 1);
        }
      }

      if (course.short_name && !course.name) {
        course.name = course.short_name;
      }

      $scope.user.guru_courses.push(course);
      // console.log("User courses ", $scope.user.guru_courses)
      $scope.search_text.course = '';
      // updateDOM();


      uTracker.track(tracker, 'Course Guru Added', {
        '$Course': course.name
      });

      $localstorage.setObject('user', $scope.user);
      //only if user has signed in
      if ($scope.user.id) {
        console.log("NOT UPDATE",$scope.user.id)
        //adds to database for user
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } //

    };


    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.courses && $scope.limit < $scope.courses.length) {
        $scope.limit += 10;
      }
    };

    $timeout(function() {
      document.querySelector('#desktop-courses-save-button').addEventListener('click', function() {

        LoadingService.showSuccess('Saved!', 1500);
        $timeout(function() {
          document.querySelector('#cta-modal-profile-courses').classList.remove('show');

        }, 500);

      });
    }, 1500);


  }


]);



