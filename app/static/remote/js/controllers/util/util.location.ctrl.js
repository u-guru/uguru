angular.module('uguru.util.controllers')

.controller('LocationController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  'uiGmapGoogleMapApi',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, uiGmapGoogleMapApi) {

    $scope.location_search_text = {value:null};
    $scope.current_city = 'San Francisco';
    $scope.locationInput = null;

    // $scope.locations = [
    //   {'name': 'Ferry Building', 'city': 'San Francisco', 'state': 'CA', 'country': 'US'},
    //   {'name': 'Ferry Plaza Farmers Market',  'city': 'San Francisco, CA', 'state': 'California', 'country': 'United States'}
    // ];
    $scope.closeLocationModal = function() {
      $scope.locationModal.hide();
    }

    $scope.saveLocationAndClose = function(location) {
      //temporary until tap bug is fixed/
      $scope.request.address = location.local_name;
      $scope.request.city_info = location.city_info;
      $scope.request.place_id = location.place_id;
      $scope.locationModal.hide();
    }






    var events = {
              place_changed: function (autocomplete) {
                console.log('place_changed is called');
                place = autocomplete.getPlace();


                if (place.address_components) {

                  newMarkers = [];
                  var bounds = new google.maps.LatLngBounds();
                  bounds.extend(place.geometry.location);

                  var place_id = place.place_id;
                  console.log(place.address_components);
                  var name =  place.address_components[0].long_name;
                  var latitude = place.geometry.location.lat();
                  var longitude = place.geometry.location.lng();

                  // $scope.map.bounds = {
                  //   northeast: {
                  //     latitude: bounds.getNorthEast().lat(),
                  //     longitude: bounds.getNorthEast().lng()
                  //   },
                  //   southwest: {
                  //     latitude: bounds.getSouthWest().lat(),
                  //     longitude: bounds.getSouthWest().lng()
                  //   }
                  // }
              }
            }
    }

    $scope.geocodeOptions = {autocomplete: true, location: {lat: 37.8700, lng: -122.2590 }}

    var options = {
        autocomplete:true,
        location: {lat: 37.8700, lng: -122.2590 },
        // radius:10000
    };

     // $scope.disableTap = function(){
     //      $timeout(function() {

     //        container = document.getElementsByClassName('pac-container');

     //        // disable ionic data tab
     //        angular.element(container).attr('data-tap-disabled', 'true');

     //        console.log('disabled the data attr');
     //        // leave input field if google-address-entry is selected
     //         angular.element(container).on("click", function(){
     //          document.getElementById('place-search').blur();
     //        });

     //      })
     //  };
    // $scope.searchbox = { template: BASE + 'templates/searchbox.tpl.html', events:events, parentDiv: 'searchBoxParent', options:options};

    $scope.queryGooglePlacesOnKeyPress = function() {
      current_input_text = $scope.locationInput.value;
      $scope.queryAutocomplete(current_input_text);
    }

    $scope.$on('modal.shown', function() {

      if ($scope.locationModal && $scope.locationModal.isShown()) {

        $scope.locationInput = document.getElementById('location-input');
        $scope.locationInput.addEventListener('keyup', $scope.queryGooglePlacesOnKeyPress);

      }
    });




    // $scope.addSelectedLocation = function(location) {

    //   $scope.request.location = location;
    //   $scope.locationModal.hide();

    // }

    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

    $scope.updateProgress = function() {
      var courseInput = document.getElementById('course-input');
      if (courseInput == document.activeElement) {
        $scope.progress = true;
      } else {
        $scope.progress = false;
      }
    }

    $scope.setCourseFocus = function(target) {
        var courseInput = document.getElementById('course-input');
        if (courseInput !== document.activeElement && !$scope.keyboard_force_off) {
          $scope.progress = false;
          return;
        }

        if ($scope.course_search_text.value.length === 0 && !$scope.keyboard_force_off) {
          document.getElementsByName("course-input")[0].focus();
        }


        if ($scope.platform && $scope.platform.android) {
          $timeout(function() {
            if (!$cordovaKeyboard.isVisible) {
              $cordovaKeyboard.show();
            }
          }, 500);
        }
      };



  }


])