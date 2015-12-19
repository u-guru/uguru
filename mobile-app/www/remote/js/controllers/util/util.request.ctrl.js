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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate, LoadingService, RequestService, University,
    uiGmapGoogleMapApi) {

    $scope.request = RequestService.initSample();
    $scope.requestProgress = {value:1};
    $scope.maxHourArr = RequestService.getMaxNumHourArr();
    $scope.search_text = {
      course: '',
      matching: [],
      input_focused: false
    };

    var initMapFromUniversity = function(university) {
      var latitude = parseFloat(university.latitude);
      var longitude = parseFloat(university.longitude);
      return  {
                    center:  {latitude: latitude, longitude:longitude },
                    zoom: 14
              };
    }

    $scope.removeTagFromRequest = function(index, tag) {
      if ($scope.request && $scope.request.info.tags.length >= index) {
        $scope.request.info.tags.splice(index, 1);
      }
    }

    $scope.map = initMapFromUniversity($scope.user.university)
    var events = { places_changed: function (searchBox) {}}

    var initSearchboxGMap = function() {
      var events = { places_changed: function (searchBox) {} }
      return { template:'request.slide.two.input.html', events:events, options:{autocomplete:true}};
    }

    $scope.searchbox = initSearchboxGMap();


    var checkPropertyInArrayForDupes = function(arr, val, property) {
      for (var i = 0; i < arr.length; i++) {
        var indexElem = arr[i];
        if (indexElem && indexElem[property] === val) {
          return false;
        }
      }
      return true;
    }

    uiGmapGoogleMapApi.then(function(maps) {
      console.log('this indicates that the map has been loaded')
    });

    $scope.slideHasChanged = function($index) {
      if ($index > $scope.requestProgress.value - 1) {
        $scope.requestProgress.value = $scope.requestProgress.value + 1
      } else {
        $scope.requestProgress.value = $scope.requestProgress.value - 1;
      }
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