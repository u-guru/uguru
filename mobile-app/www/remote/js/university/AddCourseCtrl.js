angular.module('uguru.util.controllers')

.controller('CoursesController', [

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
  'University',
  'Utilities',
  'uTracker',
  'Course',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, University, Utilities, uTracker, Course) {


    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }

    $scope.courses = [];

    $scope.search_text = {
      course: ''
    };
    $scope.alwaysTrue = true;
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

    if ($scope.root.vars.guru_mode || $state.current.name === 'root.become-guru') {
      $scope.editCourseMode = false;
      $scope.search_text.course = '';
    }

    $scope.swipeRightGoBack = function() {
      if (confirm('Exit become guru process?')) {
        $scope.loader.show();
        $ionicSideMenuDelegate.toggleRight();
        $timeout(function() {
          $scope.loader.hide();
        }, 500)
      }
    }


    $scope.editCourses = function() {
      console.log('show delete should be here');
    }



    $scope.updateProgress = function(input_text) {

      $scope.progress = (input_text.length > 0);
    }

    $scope.focusCourseInput = function () {
      var input = document.getElementById('guru-course-input');
      if (input) {
        input.focus();
      }
    }

    $scope.removeGuruCourseAndUpdate = function(course, index) {

      if (!confirm('Remove ' + course.name + '?')) {
        return;
      }


      var removedCourse = $scope.user.guru_courses.splice(index, 1);
      $scope.coursesSource.unshift(course);

      $timeout(function() {
        $scope.search_text.course = "   ";
      },0);

      $timeout(function() {
        $scope.search_text.course = "";
      }, 10);


      var confirmCallback = function() {
        $scope.loader.showSuccess(course.name + ' successfully removed', 2000);
      }

      //update local user object
      $localstorage.setObject('user', $scope.user);

      //update server user object
      $timeout(function() {
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, confirmCallback, $scope);
      }, 200);


      uTracker.track(tracker, 'Course Guru Removed', {
        '$Course': course.name
      });
    }

    $scope.addSelectedGuruSkill = function(skill, input_text, $index) {
      $scope.user.guru_skills.push(skill);

       if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_skill', $scope.user, skill, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update user
        $scope.root.vars.remote_cache.push({'add_guru_skill': skill});
      }

    }

    $scope.cancelStudentAddCourse = function() {
      $scope.showCourseInput = !$scope.showCourseInput;
      $scope.studentCourseInput.value = "";
    }

    $scope.addSelectedStudentCourse = function(course, input_text, $index) {


      $scope.search_text.course = '';

      //set the course text to what it should be
      $scope.studentCourseInput.value = '';
      $scope.search_text.course = course.name

      $scope.user.student_courses.push(course);

      $localstorage.setObject('user', $scope.user);

      $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);

      $scope.root.vars.remote_cache.push({'add_student_course': course});

    }

    $scope.addSelectedGuruCourse = function(course, input_text, index) {

      $scope.loader.show();

      for(var i=0; i < $scope.coursesSource.length; i++) {
        if($scope.coursesSource[i] === course) {
          console.log("found a match to remove!");
          $scope.coursesSource.splice(i, 1);
        }
      }

      $scope.user.guru_courses.push(course);
      $localstorage.setObject('user', $scope.user);
      //only if user has signed in
      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } //

      $timeout(function() {
        $scope.search_text.course = "   ";
      },0);
      $timeout(function() {
        $scope.search_text.course = "";
      }, 10);

      $timeout(function() {
        $scope.loader.hide()
      }, 500)




      uTracker.track(tracker, 'Course Guru Added', {
        '$Course': course.name
      });

    }

    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.courses && $scope.limit < $scope.courses.length) {
        $scope.limit += 10;
      }
    }


    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }


    //$scope.studentCourseInput = document.getElementById('student-course-input');


    var getCoursesBecomeGuru = function() {
      University.getCourses($scope.user.university_id).then(function(courses) {

        // courses = courses.plain();
        University.courses = courses;
        $scope.coursesSource = courses.plain().slice();
        $scope.courses = courses.plain().slice();

        $localstorage.setObject('universityCourses', courses.plain())

        console.log("$scope.courses.length: " + $scope.courses.length);
      },function(err) {

        alert('Something went wrong... Please contact support!');

      });
    }

    getCoursesBecomeGuru();




    $scope.afterEnter = function() {
      console.log("afterEnter works!");
    };

  }


])