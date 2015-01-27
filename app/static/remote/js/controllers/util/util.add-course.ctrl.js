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

	  $localstorage.setObject('courses', []);
    $scope.course_search_text = '';

    $scope.setCourseFocus = function() {
      if ($scope.course_search_text.length === 0) {
          document.getElementsByName("course-input")[0].focus();
        }
    }

    $scope.getCoursesFromServer = function(promise) {
        var university_title = $scope.user.university.title;
        var msg_details = "Retrieving all " + university_title + ' courses'
        $cordovaProgress.showSimpleWithLabelDetail(true, "Loading", msg_details);
        
        University.getCourses($scope.user.university_id).then(
                function(courses) {
                  $cordovaProgress.hide();
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
                console.log(courses[0]);
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
              
          return $localstorage.getObject('courses');

      }

      var coursesLoaded = $q.defer();

      $scope.$on('modal.hidden', function() {

          if (!$scope.addUniversityModal.isShown() && 
            $scope.addCourseModal.isShown() &&
            $scope.user.university_id &&
              $localstorage.getObject('courses').length === 0) {
              
              $scope.getCoursesFromServer(coursesLoaded);
          }

      });

      return coursesLoaded.promise;
    }

    $scope.$on('modal.shown', function() {

        if ($scope.addCourseModal.isShown() && 
          !$scope.addUniversityModal.isShown() &&
          $localstorage.getObject('courses').length > 0) {


          $timeout(function() {
            $scope.setCourseFocus();
          }, 500);

        }

    });

    $scope.hideCourseModal = function() {
      if ($cordovaKeyboard.isVisible()) {
        console.log('keyboard is showing');
        $scope.course_search_text = '';
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addCourseModal.hide();
        }, 300)
      } else {
        $scope.addCourseModal.hide();
      }
    }
    
    $scope.courses = GetCoursesList();

    $scope.courseSelected = function(course) {


      if (!$scope.user.student_courses) {
          console.log('user added their first course');
          $scope.user.student_courses = [];
      }

        $scope.user.student_courses.push(course);
        $scope.course_search_text = '';
        $scope.closeKeyboard();
        $scope.showSuccess('Course Saved!');
        $timeout(function() {
          $scope.addCourseModal.hide();
        }, 1000);
    }

  }


])