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
  '$cordovaProgress',
  '$cordovaKeyboard',
  'University',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $q, $cordovaProgress,
  $cordovaKeyboard, University) {

    $scope.course_search_text = '';
    $scope.keyboard_force_off = false;
    
    $scope.setCourseFocus = function(target) {
      if ($scope.course_search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("course-input")[0].focus();  
      }
    };

    $scope.getCoursesFromServer = function(promise) {
        var university_title = $scope.user.university.title;
        var msg_details = "Retrieving all " + university_title + ' courses'
        
        if (!$scope.progress_active) {
          $scope.progress_active = true;
          $cordovaProgress.showSimpleWithLabelDetail(true, "Loading", msg_details);
        } else {
          console.log('progress spinner is already active!');
        }
        
        University.getCourses($scope.user.university_id).then(
                function(courses) {
                  $cordovaProgress.hide();
                  $scope.progress = false;
                    var courses = JSON.parse(courses);
                    console.log(courses.length + ' courses uploaded from ' + $scope.user.university.title);

                  $timeout(function() {
                      var courseSuccessMsg = courses.length + ' Courses Found!';
                      $scope.showSuccess(courseSuccessMsg);
                  }, 500)
                            
                    if (promise) {
                    promise.resolve(courses);
                }

                $timeout(function() {
                    $scope.setCourseFocus();
                  }, 1000);
                // $timeout(function() {
                //     $cordovaProgress.hide();
                //     $scope.showSuccess('Success!');
                // }, 500)

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
      if ($cordovaKeyboard.isVisible()) {
        
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


      if (!$scope.user.student_courses) {
          $scope.user.student_courses = [];
      }

        $scope.keyboard_force_off = true;
        $scope.user.student_courses.push(course);
        $scope.rootUser.updateLocal($scope.user);
        $scope.course_search_text = '';
        $scope.closeKeyboard();
        $scope.showSuccess('Course Saved!');
        $timeout(function() {
          $scope.addCourseModal.hide();
        }, 1000);
    }

  }


])