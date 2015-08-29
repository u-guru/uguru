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

  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate,$ionicActionSheet)
  {

    $scope.gpaPage = {gpa:0};
    $scope.tempCourse = {courseGrade:'C', courseCredit:4, courseName:''};
    $scope.userCourses = [];

    $scope.validateAndSaveCourse = function(courseDict) {
      console.log(courseDict);
      //case one --> user did not select a course || grade || did not finis
      if (!validateCourseInput(courseDict)) {
        alert('please fill out all fields!');
        return;
      }

      $scope.userCourses.push(courseDict);
      $localstorage.setObject('userGPACourseList', $scope.userCourses);
      $scope.gpaPage.gpa = calculateGpa($scope.userCourses);

      $scope.success.show(0, 1000, 'Saved!');
      $scope.addCourseGPAModal.hide();

    }

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

    var validateCourseInput = function(courseDict) {
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
          console.log(index);
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
      $scope.success.show(0, 2000, 'Course ' + tempCourse.courseName + ' removed!');
      $localstorage.setObject('userGPACourseList', $scope.userCourses);
      $scope.tempCourse = {courseGrade:'C', courseCredit:4, courseName:''};
      $scope.addCourseGPAModal.hide();
    }


    $scope.launchAddCourseGPAModal = function(course) {
      if (course) {
        $scope.tempCourse = course;
        $scope.tempCourse.removeButton = true;
      }
          $ionicModal.fromTemplateUrl(BASE + 'templates/dev/gpa.modal.html', {
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