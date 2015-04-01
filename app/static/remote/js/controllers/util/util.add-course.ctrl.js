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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, University, Popover) {

    $scope.course_search_text = '';
    $scope.keyboard_force_off = false;

    $scope.setCourseFocus = function(target) {
      if ($scope.course_search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("course-input")[0].focus();
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

      $scope.$on('modal.shown', function() {

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

      var is_guru_mode = $state.current.name === 'root.guru.wizard';

      if (!$scope.user.student_courses && !is_guru_mode) {
          $scope.user.student_courses = [];
      }

      if (!$scope.user.guru_courses && is_guru_mode) {
          $scope.user.guru_courses = [];
      }

      if (is_guru_mode) {
        $scope.calculateProgress($scope.user);
        $scope.user.guru_courses.push(course);
        $scope.user.updateAttr('add_guru_course', $scope.user, course, null, $scope);
      } else {
        $scope.user.student_courses.push(course);
        $scope.user.updateAttr('add_student_course', $scope.user, course, null, $scope);
      }

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
        $scope.closeKeyboard();
        // $scope.showSuccess('Course Saved!');s
        $timeout(function() {
          $scope.addCourseModal.hide();
        }, 1000);
      }

  }


])