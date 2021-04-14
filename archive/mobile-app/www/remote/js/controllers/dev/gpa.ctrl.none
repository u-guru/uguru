angular.module('uguru.util.controllers')

.controller('gpaController', [

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
  '$ionicActionSheet',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate,$ionicActionSheet, LoadingService)
  {

    $scope.gpaPage = {gpa:0};
    $scope.tempCourse = {courseGrade:'C', courseCredit:4, courseName:''};
    $scope.userCourses = [];

    $scope.validateAndSaveCourse = function(courseDict) {
      //case one --> user did not select a course || grade || did not finis
      validateResult = validateCourseInput(courseDict, $scope.userCourses);
      if (validateResult === false) {
        alert('please fill out all fields!');
        return;
      }
      if (validateResult === 0) {
        return;
      }

      var newCourseObj = {
        courseName: courseDict.courseName,
        courseGrade: courseDict.courseGrade,
        courseCredit: courseDict.courseCredit
      };

      $scope.userCourses.push(newCourseObj);
      $localstorage.setObject('userGPACourseList', $scope.userCourses);
      $scope.gpaPage.gpa = calculateGpa($scope.userCourses);
      $scope.tempCourse.courseName = '';
      LoadingService.showSuccess('Saved!', 1500);
      $scope.addCourseGPAModal.hide();

    };

    var calculateGpa = function(arrCourses) {
      sum = 0;
      grades = ['F', 'D', 'C', 'B', 'A'];
      for (i = 0; i < arrCourses.length; i ++) {
        course = arrCourses[i];
        courseGrade = course.courseGrade;
        numberGrade = grades.indexOf(courseGrade);
        sum += numberGrade;
      }

      return (sum / (arrCourses.length * 1.0)).toPrecision(2);

    }

    var validateCourseInput = function(courseDict, courseList) {
      for (i = 0; i < courseList.length; i++) {
        courseAlreadyAdded = courseList[i];
        if (courseAlreadyAdded.courseName.toLowerCase()
          === courseDict.courseName.toLowerCase()) {
          $scope.success.show('You have already added ' + courseDict.courseName + '!', 1500);
          $scope.tempCourse.courseName = '';
          return 0;
        }
      }
      return (courseDict.courseName && courseDict.courseCredit && courseDict.courseGrade);
    }

    //action
    $scope.showAttachActionSheet = function() {
       var options = [{text: 'A'},
                      {text: 'B'},
                      {text: 'C'},
                      {text: 'D'},
                     { text: 'F'}];

    // Show the action sheet
    $scope.closeAttachActionSheet = $ionicActionSheet.show({
        buttons: options,
        cancelText: 'Cancel',
        cancel: function() {
            $scope.closeAttachActionSheet();
        },
        buttonClicked: function(index) {
          ;
        }
    });
    }


    $scope.removeCourseList = function(tempCourse) {
      for (i = 0; i < $scope.userCourses.length; i++) {
        course = $scope.userCourses[i];
        if (course.courseName === tempCourse.courseName) {
          $scope.userCourses.splice(i, i+1);
          break;
        }
      }
      $scope.success.show('Course ' + tempCourse.courseName + ' removed!', 2000);
      $localstorage.setObject('userGPACourseList', $scope.userCourses);
      $scope.tempCourse.courseName = '';
      $scope.tempCourse.removeButton = null;
      $scope.addCourseGPAModal.hide();
    }


    $scope.launchAddCourseGPAModal = function(course) {
      if (course) {
        $scope.tempCourse = course;
        $scope.tempCourse.removeButton = true;
      }
          $ionicModal.fromTemplateUrl(BASE + 'templates/dev/archives/gpa.modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.addCourseGPAModal = modal;
            $scope.addCourseGPAModal.show();
          });
    }

    $scope.$on('$ionicView.enter', function() {
      $timeout(function() {
        $scope.userCourses = $localstorage.getObject('userGPACourseList');
        $scope.gpaPage.gpa = calculateGpa($scope.userCourses);
      }, 500)
    });
  }
]);