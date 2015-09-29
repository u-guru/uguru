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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, University, Utilities, uTracker) {

    $scope.courses = [];

    $scope.course_search_text = '';
    $scope.alwaysTrue = true;
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



    $scope.query = function(input) {
      $scope.courses = Utilities.nickMatcher(input, $scope.originalCourses);
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
      $scope.courses.push(removedCourse);


      var confirmCallback = function() {
        $scope.success.show(0, 2000, course.name + ' successfully removed');
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




      $scope.search_text = '';

      //set the course text to what it should be
      $scope.studentCourseInput.value = '';
      $scope.course_search_text = course.name

      $scope.user.student_courses.push(course);

      $localstorage.setObject('user', $scope.user);

      $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);

      $scope.root.vars.remote_cache.push({'add_student_course': course});

    }

    $scope.addSelectedGuruCourse = function(course, input_text, index) {

      $timeout(function() {
        $scope.loader.show();
      }, 250)

      //set the variable to this
      $timeout(function() {
        if (index < 40) {
          var removedCourseFromMain = $scope.courses.splice(index, 1);
        } else {
          var removedCourseFromMain = $scope.courses.splice(index, 1);
        }

        $scope.loader.hide()
        $scope.search_text = '';
      }, 500)


      $timeout(function() {
        if (!$scope.user.guru_courses) {
          $scope.user.guru_courses = [];
        }
      })

      $timeout(function() {

          $scope.user.guru_courses.push(course);
          $localstorage.setObject('user', $scope.user);
          //only if user has signed in
            if ($scope.user.id) {
              //adds to database for user
              $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
            } //

          }, 750)


      uTracker.track(tracker, 'Course Guru Added', {
        '$Course': course.name
      });

    }

    $scope.increaseLimit = function() {
      if($scope.courses && $scope.limit < $scope.courses.length) {
        $scope.limit += 10;
      }
    }

    var initializeCourses = function() {
        // they are already loaded
        var localStorageCourses = $localstorage.getObject('courses')
        if ($scope.courses && $scope.courses.length > 0) {
          $scope.originalCourses = $scope.courses.slice();
          // why forty? idk seems about right lol; feel free to change
          return;
        }else if (localStorageCourses && localStorageCourses.length > 0) {
          $scope.courses = localStorageCourses;
          $scope.originalCourses = $scope.courses.slice();
        } else if ($scope.static.courses && $scope.static.courses.length > 0) {
            $scope.courses = $scope.static.courses;
            $scope.originalCourses = $scope.courses.slice();
        } else {
          $scope.courses = [{name: 'loading', title:null}];
          $scope.checkCourses(localStorageCourses);
        }
      }

      $scope.getCoursesFromServer = function() {
            University.getCourses(2732).then(
                  function(courses) {
                      $scope.loader.hide();
                      $localstorage.setObject('courses', courses);
                      $scope.root.vars.courses = courses;
                      $scope.root.vars.popular_courses = $scope.root.vars.courses.slice(0, 16);
                      $scope.static.courses = $scope.root.vars.courses;
                      $scope.static.popular_courses = $scope.root.vars.popular_courses;
                      $scope.courses = $scope.static.courses;
                      $scope.originalCourses = $scope.courses.slice();

                },
                  function(error) {
                      console.log('Courses NOT successfully loaded');
                      console.log(error);
                      alert('Something went wrong - please contact support for further, quick assistance!')
                }
        );
      }

      $scope.checkCourses = function() {
          lsCourses = $localstorage.getObject('courses');
          //possible that is already cashed
          var is_courses_loaded = $scope.root.vars && $scope.root.vars.courses && $scope.root.vars.courses.length > 0;

          //only show if the university page is shown & we don't have coursers
          if ($scope.activeSlideIndex === 1) {
              $timeout(function() {
                  $scope.success.show(0, 500, 'Loading courses ...')
                  $scope.loader.show();
              }, 600)
          }

          if (is_courses_loaded) {
            $scope.courses = lsCourses;
            $scope.loader.hide();
          } else if ($scope.static.courses) {
            $scope.courses = $scope.static.courses;
            $scope.loader.hide();
          }
          else {
            console.log('grabbing courses from server');
            $scope.getCoursesFromServer();
            if ($scope.activeSlideIndex === 1) {
              $scope.success.show(0, 1000, 'One moment...');
            }
            $timeout(function() {
              $scope.checkCourses();
            }, 1500);
          }
      };
    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }
    $scope.guruCourseInput = document.getElementById('guru-course-input');
    $scope.studentCourseInput = document.getElementById('student-course-input');

    $timeout(function() {
      initializeCourses();
    }, 500)

  }


])