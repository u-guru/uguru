angular.module('uguru.util.controllers')

.controller('AddCourseController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$q',
  '$cordovaKeyboard',
  'University',
  'Popover',
  '$cordovaStatusbar',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, University, Popover, $cordovaStatusbar, $ionicPlatform) {

    $scope.course_search_text = '';
    $scope.keyboard_force_off = false;

    $scope.setCourseFocus = function(target) {

      if ($scope.course_search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("course-input")[0].focus();
      }

      if ($scope.platform && $scope.platform.android) {
        $timeout(function() {
          if (!$cordovaKeyboard.isVisible) {
            $cordovaKeyboard.show();
          }
        }, 500);
      }
    };

    $scope.clearSearchInput = function() {
      $scope.course_search_text = '';
    }

    $scope.getCoursesFromServer = function(promise) {
        var university_title = $scope.user.university.title;
        var msg_details = "Retrieving all " + university_title + ' courses'

        $scope.loader.show();

        University.getCourses($scope.user.university_id).then(
                function(courses) {
                  $scope.loader.hide();
                  $scope.progress = false;
                    console.log(courses.length + ' courses uploaded from ' + $scope.user.university.title);

                    if (promise) {
                    promise.resolve(courses);
                }

                $timeout(function() {
                    $scope.setCourseFocus();
                  }, 1000);

              $scope.courses = courses;
              $localstorage.setObject('courses', $scope.courses);

                },
                function(error) {
                    console.log('Courses NOT successfully loaded');
                    console.log(error);
                }
        );

    }

    var GetCoursesList = function() {

      if ($localstorage.getObject('courses').length > 0) {

          $scope.$on('modal.shown', function() {

          if ($scope.addCourseModal.isShown() &&
            !$scope.addUniversityModal.isShown() &&
              $localstorage.getObject('courses').length > 0) {
              $scope.keyboard_force_off = false;

              $timeout(function() {
                $scope.setCourseFocus();
              }, 500);

            }
          });

          return $localstorage.getObject('courses');

      }

      var coursesLoaded = $q.defer();

      $scope.$on('modal.hidden', function() {

          if (!$scope.addUniversityModal.isShown() &&
            $scope.addCourseModal.isShown() &&
            $scope.user.university_id) {

              //if there are no courses after university modal is shown;
              if ($localstorage.getObject('courses').length === 0) {
                $scope.getCoursesFromServer(coursesLoaded);
              //if there are courses after the modal is shown
              } else {
                //show the keyboard
                $timeout(function() {
                  $scope.setCourseFocus();
                }, 500);
              }
          }

      });

      $ionicPlatform.ready(function() {

        $scope.switchStatusBariOS = function() {

          if (window.StatusBar) {
                        // console.log('Extra #1. Styling iOS status bar to black \n\n');
            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(true);
          }

        }
      });

      $scope.$on('modal.shown', function() {

        if ($scope.switchStatusBariOS) {
          $scope.switchStatusBariOS();
        }

        if ($scope.addCourseModal.isShown() &&
          !$scope.addUniversityModal.isShown() &&
          $localstorage.getObject('courses').length > 0) {
          $scope.keyboard_force_off = false;

          $timeout(function() {
            $scope.setCourseFocus();
          }, 500);

        } else

        if ($scope.addCourseModal.isShown() &&
          !$scope.addUniversityModal.isShown() &&
          $scope.user.university_id &&
          $localstorage.getObject('courses').length === 0) {

          $scope.getCoursesFromServer(coursesLoaded);
        }

      });

      return coursesLoaded.promise;
    }

    $scope.courses = GetCoursesList();

    $scope.hideCourseModal = function() {
      if ($scope.platform.mobile && $cordovaKeyboard.isVisible()) {

        $scope.keyboard_force_off = true;
        $scope.course_search_text = '';
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addCourseModal.hide();
        }, 300)
      } else {
        $scope.addCourseModal.hide();
      }
    }

    $scope.courseSelected = function(course) {

      var is_guru_mode = $scope.user.guru_mode || ($state.current.name === 'root.guru-wizard');

      if (!$scope.user.student_courses && !is_guru_mode) {
          $scope.user.student_courses = [];
      }

      if (!$scope.user.guru_courses && is_guru_mode) {
          $scope.user.guru_courses = [];
      }

      // console.log(course);
      // if () {

      // }

      // return;

      if (is_guru_mode) {
        $scope.user.guru_courses.push(course);
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } else {
        $scope.user.student_courses.push(course);

        if ($scope.user.student_courses.length === 1 && $scope.user.requests.length === 0) {
          $timeout(function() {
            var element = document.getElementsByClassName('course-item')[0];
            // if ($state.current.name === 'root.student-home') {
            //   // $scope.openPopoverTwo(element);
            // }
          }, 2000)
        }

        $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
      }
        document.getElementsByName("course-input")[0].blur();
        $scope.keyboard_force_off = true;
        $scope.rootUser.updateLocal($scope.user);
        payload = {
          add_student_course: true,
          course: course,
        }
        serverSuccess = function(user) {
          console.log(user);
        }

        $scope.course_search_text = '';
        $timeout(function() {
          $scope.closeKeyboard();
        },500)

        // $scope.showSuccess('Course Saved!');s
        $timeout(function() {
          $scope.addCourseModal.hide();
          $scope.success.show(0, 1500);
        }, 1000);
      }

      $scope.$on('modal.hidden', function() {
        if (window.StatusBar) {
              StatusBar.styleDefault();
          }
      });

  }


])