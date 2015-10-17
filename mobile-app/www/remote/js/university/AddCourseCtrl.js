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
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, University, Utilities, uTracker, Course) {


    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }

    $scope.search_text = {
      course: ''
    };
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
        $scope.loader.show();
        $ionicSideMenuDelegate.toggleRight();
        $timeout(function() {
          $scope.loader.hide();
        }, 500)
      }
    }

    $scope.clearSearchInput = function() {
      $scope.search_text.course = '';
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

      var courseName = course.title || course.name;

      if (!confirm('Remove ' + courseName + '?')) {
        return;
      }

      $scope.user.guru_courses.splice(index, 1)
      $scope.coursesSource.unshift(course);

      refreshCourses();


      var confirmCallback = function() {

        uTracker.track(tracker, 'Course Guru Removed', {
          '$Course': course.name
        });
        //$scope.loader.showSuccess(course.name + ' successfully removed', 1200);
      }

      $localstorage.setObject('user', $scope.user);

      $timeout(function() {
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, confirmCallback, $scope);
      }, 200);

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
      // $scope.studentCourseInput.value = '';
      // $scope.search_text.course = course.name

      $scope.user.student_courses.push(course);

      $localstorage.setObject('user', $scope.user);

      $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);

      $scope.root.vars.remote_cache.push({'add_student_course': course});

    }

    $scope.addSelectedGuruCourse = function(course) {

      for(var i=0; i < $scope.coursesSource.length; i++) {
        if($scope.coursesSource[i].id === course.id) {
          console.log("transferring course from source to user");
          $scope.coursesSource.splice(i, 1);
        }
      }
      $scope.user.guru_courses.push(course);
      refreshCourses();

      uTracker.track(tracker, 'Course Guru Added', {
        '$Course': course.name
      });

      $localstorage.setObject('user', $scope.user);
      //only if user has signed in
      if ($scope.user.id) {
        //adds to database for user
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } //


    }


    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.courses && $scope.limit < $scope.coursesSource.length) {
        $scope.limit += 10;
      }
    }





    var getCoursesBecomeGuru = function() {

      $scope.search_text.course = '';
      //$scope.loader.showAmbig("Fetching courses...", 60000);
      University.getCourses($scope.user.university_id).then(function(courses) {

        University.courses = courses;
        $scope.coursesSource = courses.plain().slice();


        $timeout(function() {
          for(var j = 0; j < $scope.user.guru_courses.length; j++) {
            for(var k = 0; k < $scope.coursesSource.length; k++) {
              if($scope.coursesSource[k].id === $scope.user.guru_courses[j].id) {
                console.log("Deleting duplicate course found.");
                  $scope.coursesSource.splice(k, 1);
              }
            }
          }
          refreshCourses();

        }, 400);


        $localstorage.setObject('universityCourses', courses.plain());
        refreshCourses();
        //$scope.loader.hide();

        console.log("$scope.coursesSources.length: " + $scope.coursesSource.length);
      },function(err) {

        alert('Something went wrong... Please contact support!');

      });
    }

    if(!$scope.coursesSource) {
      if($scope.data.courses) {
        console.log("setting coursesSource with root scope data");
        // $scope.coursesSource = $scope.data.courses;
      } else {
        console.log("couldn't find course data thru root scope, so calling manually via CourseCtrl");
        getCoursesBecomeGuru();
      }

    }



    $rootScope.$on('schoolChange', function(event) {
      console.log("courses: heard schoolChange event!");
      $scope.user.guru_courses.splice(0, $scope.user.guru_courses.length);
      getCoursesBecomeGuru();
      refreshCourses();
    });

    $rootScope.$on('refreshCourses', function(event) {
      console.log("courses: heard refreshCourses event!");
      getCoursesBecomeGuru();
      refreshCourses();
    });

    $scope.refresh = {
      courses: ''
    };


    function refreshCourses() {


      $timeout(function() {
        $scope.search_text.course += ' ';
        $scope.search_text.course = '';
        try {
          $scope.courses = Utilities.nickMatcher('', $scope.coursesSource, 'name', 'course');
        } catch (err) {
          console.log("fastmatcher slice error (threw from inside CoruseCtrl, probably due to trying to load too fast): " + err)
        }

      }, 0)

    }

    $scope.afterEnter = function() {
      console.log("afterEnter works!");
    };

  }


])