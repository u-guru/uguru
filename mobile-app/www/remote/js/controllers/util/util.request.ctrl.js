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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate, LoadingService, RequestService, University) {

    $scope.request = RequestService.initSample();

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

    var checkPropertyInArrayForDupes = function(arr, val, property) {
      for (var i = 0; i < arr.length; i++) {
        var indexElem = arr[i];
        if (indexElem && indexElem[property] === val) {
          return false;
        }
      }
      return true;
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