angular.module('uguru.util.controllers')

.controller('EssayStudentRequestController', [

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
  'SearchboxService',
  '$ionicSlideBoxDelegate',
  'ContentService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate, LoadingService, RequestService, University,
    SearchboxService, $ionicSlideBoxDelegate, ContentService) {

    //@gabrielle - this is how you disable the sidemenu
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.honorPledgeArr = ContentService.honorPledge;

    $scope.requestProgress = {value:1};
    $scope.maxHourArr = RequestService.getMaxNumHourArr();
    $scope.search_text = {
      course: '',
      matching: [],
      input_focused: false
    };

    $scope.predictionMarkers = [];

    $scope.page = {dropdowns: {}, predictionMarkers:[], animations: {}}
    $scope.page.dropdowns = {hour: false, minutes: false, location_search:{predictions:[], input:'phil'}}
    $scope.page.animations = {slideOne: ""}

    var initMapFromUniversity = function(university) {
      var latitude = parseFloat(university.latitude);
      var longitude = parseFloat(university.longitude);
      return  {
                    center:  {latitude: latitude, longitude:longitude },
                    zoom: 10,
                    control: {}
              };
    }
    $scope.showMarkerDetails = function(prediction) {
      LoadingService.showMsg('Coming Soon', 1000);
    }

    $scope.queryAutocompleteFromSearch = function(query) {

        query = $scope.page.dropdowns.location_search.input;
        if (query && query.length) {
          SearchboxService.queryAutocompleteService($scope.page.dropdowns.location_search.input, $scope, $scope.map.control.getGMap());
        } else {
          $scope.page.dropdowns.location_search.predictions = [];
        }

    }

    $scope.clearUniversityInput = function() {
      //clear text
      $scope.search_text.university = '';
      $scope.newRequest.university = null;
      $scope.newRequest.active_step = 1;
    }

    $scope.selectRequestSlideOneUniversity = function(university) {
      $scope.newRequest.university = university;
      $scope.search_text.university = university.name;
      $timeout(function() {
        LoadingService.showSuccess('Added ' + (university.short_name || university.name) + '!', 500);
      }, 250)
      $timeout(function() {
          $scope.newRequest.active_step = 2;
      }, 750)
    }

    $scope.validateRequestFormSlideOne = function() {
      var showInvalidAnimation = function(callback) {
        $scope.invalidSlideOne = true;
        $timeout(function() {
          $scope.invalidSlideOne = false;
          callback && callback();
        }, 250)
      }

      if (!$scope.newRequest.university || !$scope.newRequest.type || !$scope.newRequest.info.description.length || !$scope.newRequest.info.tags.length) {

        var callback  = function() {
          LoadingService.showMsg('Please fill in all steps', 1000, null);
        }

        showInvalidAnimation(callback);
      } else {
        $scope.nextSlide()
      }
    }

    $scope.removeTagFromRequest = function(index, tag) {
      if ($scope.newRequest.info.tags.length >= index) {
        $scope.newRequest.info.tags.splice(index, 1);
      }
    }

    $scope.focusInput = function() {
      $timeout(function() {
        $scope.universityInputFocused = true;
      }, 250)
    }

    $scope.blurInput = function() {
      $timeout(function() {
        $scope.universityInputFocused = false;
      }, 250)
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

    // $scope.map = initMapFromUniversity($scope.user.university)
    // uiGmapGoogleMapApi.then(function(maps) {
    //   maps.visualRefresh = true;

    //   // $scope.$on('$ionicView.loaded', function() {

    //     $scope.searchbox = initSearchboxGMap();

    //     SearchboxService.initAutocomplete({lat:$scope.user.university.latitude, lng:$scope.user.university.longitude})

    //   // })


    // });

    $scope.slideHasChanged = function($index) {
      $scope.activeSlideIndex = $index;
      if ($index > $scope.requestProgress.value - 1) {
        $scope.requestProgress.value = $scope.requestProgress.value + 1
      } else {
        $scope.requestProgress.value = $scope.requestProgress.value - 1;
      }
    }

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }
    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.jumpToSlide = function(index, recently_edited_component) {
      if (recently_edited_component === 'request-university') {
        $scope.newRequest.university = null;
      }
      if (recently_edited_component === 'textarea-description') {
        $scope.newRequest.university = null;
      }
      $ionicSlideBoxDelegate.slide(index - 1, 500)
    }

    $scope.addRequestTagAndInitEmpty = function($event, blur) {
      var emptyTagVal = $scope.newRequest.info.empty_tag.name;

      // check if greater than 3 characters
      if (emptyTagVal.length && emptyTagVal.length < 4) {
        LoadingService.showMsg(emptyTagVal + ' must be at least 4 characters', 2000);
      }
      // check if already exists
      else if (checkPropertyInArrayForDupes($scope.newRequest.info.tags, emptyTagVal, 'name')) {
        $scope.newRequest.info.tags.push(JSON.parse(JSON.stringify($scope.newRequest.info.empty_tag)))
        $scope.newRequest.info.empty_tag = {name: ''};
      }
      // it already exists
      else {
        if (!blur) {
          LoadingService.showMsg(emptyTagVal + ' already exists as a tag', 2000);
          $scope.newRequest.info.empty_tag = {name: ''};
        }
      }
    }

    var updateCoursesToScope = function(guru_courses) {
        $scope.courses = guru_courses;
    }
    $scope.courses = University.courses || $scope.getCoursesForUniversityId($scope.user.university_id, updateCoursesToScope) || [];



  }
])