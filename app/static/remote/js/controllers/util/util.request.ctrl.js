angular.module('uguru.util.controllers')

.controller('RequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicGesture',
  '$cordovaGeolocation',
  '$ionicSideMenuDelegate',
  'LoadingService',
  'RequestService',
  'University',
  'uiGmapGoogleMapApi',
  'SearchboxService',
  'GMapService',
  '$ionicSlideBoxDelegate',
  'GUtilService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate, LoadingService, RequestService, University,
    uiGmapGoogleMapApi, SearchboxService, GMapService, $ionicSlideBoxDelegate,
    GUtilService) {

    $scope.request = RequestService.initStudentForm();

    $scope.maxHourArr = RequestService.getMaxNumHourArr();
    $scope.search_text = {
      course: '',
      matching: [],
      input_focused: false
    };


    $scope.removeTagFromRequest = function(index, tag) {
      if ($scope.request && $scope.request.info.tags.length >= index) {
        $scope.request.info.tags.splice(index, 1);
      }
    }


    $scope.setHourDropdownValue = function(value) {
      $scope.page.dropdowns.hour = false;
      $scope.request.user.time_estimate.hours = value;
      $scope.toggleHourDropdown = !$scope.toggleHourDropdown;
    }
    $scope.setMinDropdownValue = function(value) {
      $scope.page.dropdowns.minutes = false;
      $scope.request.user.time_estimate.min = value;
      $scope.toggleMinDropdown = !$scope.toggleMinDropdown;
    }

    $scope.addRequestTagAndInitEmpty = function() {
      var emptyTagVal = $scope.request.info.empty_tag.name;
      if (checkPropertyInArrayForDupes($scope.request.info.tags, emptyTagVal, 'name')) {
        $scope.request.info.tags.push(JSON.parse(JSON.stringify($scope.request.info.empty_tag)))
        $scope.request.info.empty_tag = {name: ''};
      } else {
        LoadingService.showMsg(emptyTagVal + ' already exists as a tag', 2000);
        $scope.request.info.empty_tag = {name: ''};
      }
    }

    var updateCoursesToScope = function(guru_courses) {
        $scope.courses = guru_courses;
    }
    $scope.courses = University.courses || $scope.getCoursesForUniversityId($scope.user.university_id, updateCoursesToScope) || [];



  }
])


