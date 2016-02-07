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

    // $scope.request = RequestService.initStudentForm();

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

    var updateCoursesToScope = function(guru_courses) {
        $scope.courses = guru_courses;
    }




  }
])


