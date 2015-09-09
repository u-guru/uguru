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

  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate) {
    if ($scope.static.courses && $scope.static.courses.length > 0 && (!$scope.courses || !$scope.courses.length)) {
      $scope.courses = $scope.static.courses;
    }



    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

    if ($scope.root.vars.guru_mode || $state.current.name === 'root.become-guru') {
      $scope.editCourseMode = false;
      $scope.course_search_text = '';
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

    $scope.backToStudentEditProfile = function(is_saved) {


      if (is_saved) {
        $scope.success.show(0, 1500);
      } else {
        $scope.loader.show();
      }

      if ($scope.root.vars.guru_mode) {

        $state.go('^.guru-profile');

      } else {

        $timeout(function() {
          $ionicSideMenuDelegate.toggleRight();
        }, 500);

      }


      $timeout(function() {
        $scope.loader.hide();

      }, 500);
    }

    $scope.toggleEditGuru = function() {
      $scope.editCourseMode = !$scope.editCourseMode;

      if ($scope.editCourseMode) {
        $timeout(function() {
          $scope.focusCourseInput();
        }, 500)
      }
    }


    $scope.editCourses = function() {
      console.log('show delete should be here');
    }

    $scope.$on('$ionicView.beforeEnter', function() {
       $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.$on('$ionicView.leave', function() {
      $ionicSideMenuDelegate.canDragContent(true);
    });

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

      if ($state.current.name === 'root.become-guru' && !confirm('Remove ' + course.short_name + '?')) {
        return;
      }


      var removedCourse = $scope.user.guru_courses.splice(index, 1);
      $scope.courses.push(removeCourse)

      var confirmCallback = function() {
        $scope.loader.hide();
        $scope.success.show(0, 1000, course.short_name + ' successfully removed');
      }
      $scope.loader.show();

      $scope.user.updateAttr('remove_guru_course', $scope.user, course, confirmCallback, $scope);
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




      $scope.search_text = '';

      //set the course text to what it should be
      $scope.studentCourseInput.value = '';
      $scope.course_search_text = course.short_name

      $scope.user.student_courses.push(course);

      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update aduser
        $scope.root.vars.remote_cache.push({'add_student_course': course});
      }

    }

    $scope.addSelectedGuruCourse = function(course, input_text, $index) {


      //set the variable to this
      if ($index < 40) {
        var removedCourseFromPreselected = $scope.preSelectedGuruCourses.splice($index, 1);
        var removedCourseFromMain = $scope.courses.splice($index, 1);
      } else {
        var removedCourseFromMain = $scope.courses.splice($index, 1);
      }


      // $scope.search_text = '';

      // //set the course text to what it should be
      // document.getElementById('guru-course-input').value = '';
      // $scope.course_search_text = course.short_name
      if (!$scope.user.guru_courses) {
        $scope.user.guru_courses = [];
      }

      $scope.user.guru_courses.push(course);

      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update aduser
        $scope.root.vars.remote_cache.push({'add_guru_course': course});
      }

    }


     if ($scope.courses && $scope.courses.length > 0) {
        $scope.preSelectedGuruCourses = $scope.courses.slice(0, 40);
    }

    $scope.$on('$ionicView.enter', function() {


      $timeout(function() {
        console.log('view has entered');
        //add event listener
        $scope.guruCourseInput = document.getElementById('guru-course-input');
        $scope.studentCourseInput = document.getElementById('student-course-input');




        // if ($scope.studentCourseInput) {

        //   $scope.studentCourseInput.addEventListener("keyup", function() {
        //     alert($scope.studentCourseInput.value.length);
        //   });

        // }

      }, 1000);

    });





  }


])