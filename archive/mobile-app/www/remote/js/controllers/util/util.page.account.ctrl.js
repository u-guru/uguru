angular.module('uguru.util.controllers')

//ALL student controllers
.controller('AccountPageController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'AnimationService',
  '$localstorage',
  '$timeout',
  'University',
  function($scope, $state, $stateParams, Restangular, AnimationService, $localstorage, $timeout, University){

    if (!$scope.courses) {
      $scope.courses = [];
    }

      $scope.goBackOneLevel = function() {
        if ($scope.root.vars.university) {
          var university = $scope.root.vars.university;
          AnimationService.flip('^.universities', {}, {universityId:university.id, universityObj:university});
        } else {
          AnimationService.flip('^.home');
        }
      }


      function retrieveCourses() {
        if ($scope.root.vars.university) {
          $scope.university = $scope.root.vars.university;
        }
        if ($stateParams.universityObj && !$scope.root.vars.university) {
          $scope.university = $stateParams.universityObj;
        }
        $timeout(function() {
          var localCacheUniversity = $localstorage.getObject('university');
          if (localCacheUniversity) {

            $scope.university = localCacheUniversity;
            $scope.root.vars.university = localCacheUniversity;
            loadUniversityCourses($scope.university.id);
          }
        });
      }

      var loadUniversityCourses = function(university_id) {
        if (!$scope.courses.length) {
          var loadingCourseCallback = function(scope, courses) {
            $scope.university.popular_courses = courses;
          }
          University.getPopularCourses(university_id, $scope, loadingCourseCallback);
        }
      }



      //dev mode
    // $scope.$on('$ionicView.beforeEnter', function() {

    //     if (LOCAL && $state.current.name === 'root.desktop-login') {
    //       $scope.university = {
    //         courses: ["ESPM 165","IAS 115","ECON 119","ANTHRO 139","PSYCH 125","PACS 94","MUSIC 142",
    //             "MATH 98", "FILM 50","GEOG 130","CHEM 103","ART 8","GREEK 10","STAT 157","UGBA 103","EPS 3","DUTCH 166","GWS 103",
    //             "ISF 61","UGIS 112"],
    //         short_name: 'UC Berkeley',
    //         id:2307
    //       }
    //       var popular_courses = [];
    //       for (var i = 0; i < $scope.university.courses.length; i ++) {
    //         var fakeCourseIndex = $scope.university.courses[i];
    //         popular_courses.push({
    //           short_name: fakeCourseIndex,
    //           id: i
    //         })
    //       }
    //       // $scope.user.student_courses = popular_courses.splice(0, 5);
    //       $scope.university.popular_courses = popular_courses;
    //       $scope.root.vars.university = $scope.university;
    //     }
    // });




    }

]);