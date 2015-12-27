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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, $ionicGesture, $cordovaGeolocation,
    $ionicSideMenuDelegate, LoadingService, RequestService, University,
    uiGmapGoogleMapApi, SearchboxService) {

    $scope.request = RequestService.initSample();
    $scope.requestProgress = {value:1};
    $scope.maxHourArr = RequestService.getMaxNumHourArr();
    $scope.search_text = {
      course: '',
      matching: [],
      input_focused: false
    };

    $scope.predictionMarkers = [];

    $scope.page = {dropdowns: {}, predictionMarkers:[]}
    $scope.page.dropdowns = {hour: false, minutes: false, location_search:{predictions:[], input:'phil'}}

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
        console.log('querying', $scope.page.dropdowns.location_search.input)
        if (query && query.length) {
          SearchboxService.queryAutocompleteService($scope.page.dropdowns.location_search.input, $scope, $scope.map.control.getGMap());
        } else {
          $scope.page.dropdowns.location_search.predictions = [];
        }

    }

    $scope.removeTagFromRequest = function(index, tag) {
      if ($scope.request && $scope.request.info.tags.length >= index) {
        $scope.request.info.tags.splice(index, 1);
      }
    }

    var processSearchBoxResults = function(results) {
      alert('is this real')
      console.log(results);
    }


    var initSearchboxGMap = function() {
      // var events = { places_changed: function (searchBox) { processSearchBoxResults(searchBox); } }

        var searchboxInstantiateDict = {
            template:'request.slide.two.input.html',
            // https://developers.google.com/places/supported_types
            options: { autocomplete:true, types: ['establishment'] },
            events: { place_changed: function (autocomplete) {

                         place = autocomplete.getPlace()
                         console.log(place)
                          // if (place.address_components) {

                          //   newMarkers = [];
                          //   var bounds = new google.maps.LatLngBounds();

                          //   var marker = {
                          //     id:place.place_id,
                          //     place_id: place.place_id,
                          //     name: place.address_components[0].long_name,
                          //     latitude: place.geometry.location.lat(),
                          //     longitude: place.geometry.location.lng(),
                          //     options: {
                          //       visible:false
                          //     },
                          //     // templateurl:'window.tpl.html',
                          //     // templateparameter: place
                          //   };


                          // }

                  }
              }
          }

          return searchboxInstantiateDict;
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

    $scope.map = initMapFromUniversity($scope.user.university)
    uiGmapGoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;

      // $scope.$on('$ionicView.loaded', function() {

        $scope.searchbox = initSearchboxGMap();

        SearchboxService.initAutocomplete({lat:$scope.user.university.latitude, lng:$scope.user.university.longitude})

      // })


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


      // }




        //     place = autocomplete.getPlace()

        //   if (place.address_components) {

        //     newMarkers = [];
        //     var bounds = new google.maps.LatLngBounds();

        //     var marker = {
        //       id:place.place_id,
        //       place_id: place.place_id,
        //       name: place.address_components[0].long_name,
        //       latitude: place.geometry.location.lat(),
        //       longitude: place.geometry.location.lng(),
        //       options: {
        //         visible:false
        //       },
        //       templateurl:'window.tpl.html',
        //       templateparameter: place
        //     };

        //     newMarkers.push(marker);

        //     bounds.extend(place.geometry.location);

        //     $scope.map.bounds = {
        //       northeast: {
        //         latitude: bounds.getNorthEast().lat(),
        //         longitude: bounds.getNorthEast().lng()
        //       },
        //       southwest: {
        //         latitude: bounds.getSouthWest().lat(),
        //         longitude: bounds.getSouthWest().lng()
        //       }
        //     }

        //     _.each(newMarkers, function(marker) {
        //       marker.closeClick = function() {
        //         $scope.selected.options.visible = false;
        //         marker.options.visble = false;
        //         return $scope.$apply();
        //       };
        //       marker.onClicked = function() {
        //         $scope.selected.options.visible = false;
        //         $scope.selected = marker;
        //         $scope.selected.options.visible = true;
        //       };
        //     });

        //     $scope.map.markers = newMarkers;
        //   } else {
        //     console.log("do something else with the search string: " + place.name);
        //   }
        // }
        // };

    //     return searchboxInstantiateDict;
    // }





    // $scope.searchbox.addListener('places_changed', function() {
    //   var places = searchBox.getPlaces();
    //   alert('received places changed')
    //   if (places.length == 0) {
    //     return;
    //   }
    // })