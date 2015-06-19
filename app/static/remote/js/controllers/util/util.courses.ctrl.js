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

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

    if ($scope.root.vars.guru_mode || $state.current.name === 'root.become-guru') {
      $scope.editCourseMode = false;
      $scope.course_search_text = '';
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

    $scope.removeGuruCourseAndUpdate = function(index) {


      var guru_course = $scope.user.guru_courses[index];
      $scope.user.guru_courses.splice(index, 1);
      $scope.user.updateAttr('remove_guru_course', $scope.user, guru_course, null, $scope);
    }

    $scope.addSelectedGuruSkill = function(skill, input_text) {
      $scope.user.guru_skills.push(skill);

       if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_skill', $scope.user, skill, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update user
        $scope.root.vars.remote_cache.push({'add_guru_skill': skill});
      }

    }

    $scope.addSelectedGuruCourse = function(course, input_text) {
      // $scope.course_search_text = course.short_name.toUpperCase();


      //set the variable to this

      $scope.search_text = '';

      //set the course text to what it should be
      document.getElementById('guru-course-input').value = '';
      $scope.course_search_text = course.short_name
      //make progress false so we can hide all other elements
      // $scope.progress = false;

      //TODO JASON ADD TEST CASE: check if course is already in their courses


      //add to user local
      $scope.user.guru_courses.push(course);

      //JASON ADD TEST CASE: Check if length of student courses is now longer than one

      //if user is already logged in
      // $scope.course_search_text = '';

      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } else {
        //add to local cache so we can loop through it when it is time to update user
        $scope.root.vars.remote_cache.push({'add_guru_course': course});
      }

    }





  }


])