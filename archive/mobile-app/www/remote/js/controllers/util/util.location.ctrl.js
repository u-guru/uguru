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


    $scope.closeLocationModal = function() {
      $scope.locationModal.hide();
    }

    //close the modal
    $scope.saveLocationAndClose = function(location) {
      //temporary until tap bug is fixed/
      $scope.request.address = location.local_name;
      $scope.request.city_info = location.city_info;
      $scope.request.place_id = location.place_id;
      $scope.request.position = $scope.getGPSCoordsFromPlace(location.local_name, location.city_info, location.description);
      $scope.locationModal.hide();
    }


    $scope.getGPSCoordsFromPlace = function(local_name , city, country){

      var address = local_name + ", " + city +", "+ country;
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          $scope.request.position = {latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng()};

        } 
      });
    }



    /*

      START AUTOCOMPLETE CODE

    */

    //some options
    $scope.location_search_text = {value:null};
    $scope.current_city = 'San Francisco';
    $scope.locationInput = null;

    $scope.geocodeOptions = {autocomplete: true, location: {lat: 37.8700, lng: -122.2590 }}

    var options = {
        autocomplete:true,
        location: {lat: 37.8700, lng: -122.2590 },
    };

    var events = {
        place_changed: function (autocomplete) {
          place = autocomplete.getPlace();


          if (place.address_components) {

            newMarkers = [];
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(place.geometry.location);

            var place_id = place.place_id;
            var name =  place.address_components[0].long_name;
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();

        }
      }
    }

    // This is the main function that uses Google API to take a string 'Pizza' or maybe just 'Piz',
    // and returns up to 5 places based on the query. I believe this also takes into account user IP.

    $scope.queryAutocomplete = function(search_input) {

        var text = search_input;
        if (!search_input || search_input.length === 0) {
            var text = document.getElementById('location-input').value;
        }

        if (!text && !search_input) {
          search_input = 'a';
        }

          if (search_input.length > 0) {

            var user_location = $scope.user.recent_position;

            if (!user_location || Object.keys($scope.user.recent_position).length === 0) {
              //set to san francisco
              var user_location = new google.maps.LatLng(37.76999,-122.44696);
              $scope.request.position = {longitude: -122.44696, latitude: 37.76999};
            } else {
              $scope.request.position = {longitude: user_location.coords.longitude, latitude: user_location.coords.latitude};
              var user_location = new google.maps.LatLng(user_location.coords.latitude, user_location.coords.longitude);
            }
            $scope.service.getPlacePredictions({ input: text, location: user_location, radius:5000 }, $scope.autocompleteQuerycallback);
          }
    }


    //each time key is pressed for the input, this function is called
    $scope.autocompleteQuerycallback = function(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }

        // var results = document.getElementById('results');
        $scope.nearby_locations.matches = [];
        $scope.root.vars.nearby_locations = [];
        for (var i = 0, prediction; prediction = predictions[i]; i++) {
          //clear the list from before
          var payload = {
            'local_name': prediction.terms[0].value,
            'description': prediction.description,
            'terms': prediction.terms
          }

          all_but_first = prediction.terms.splice(1);

          result_str = '';
          for (var j = 0; j < all_but_first.length; j ++) {
            result_str += ' ' + all_but_first[j].value;
          }

          payload.city_info = result_str;
          payload.place_id = prediction.place_id;

          $scope.nearby_locations.matches.push(payload);
          $scope.root.vars.nearby_locations.push(payload);

        }

        if ($scope.auto_choose_first_location) {
          $scope.auto_choose_first_location = false;
          var location = $scope.root.vars.nearby_locations[0];

          $scope.request.address = location.local_name;
          $scope.request.city_info = location.city_info;
          $scope.request.place_id = location.place_id;
          $scope.closeLocationModal();
        }

        $timeout(function() {

        }, 0);
      }

    $scope.queryGooglePlacesOnKeyPress = function() {
      current_input_text = $scope.locationInput.value;
      $scope.queryAutocomplete(current_input_text);
    }

    /*

      END AUTOCOMPLETE CODE

    */


    $scope.$on('modal.shown', function() {

      //More than one modal can be shown / behind the scenes at once, so good to add this
      if ($scope.locationModal && $scope.locationModal.isShown()) {

        //Grab the location input with JS
        $scope.locationInput = document.getElementById('location-input');

        //Call the function 'Query GooglePlacesOnKeyPress' every time the user clicks a key
        $scope.locationInput.addEventListener('keyup', $scope.queryGooglePlacesOnKeyPress);


        //Make sure no value is already there, its completely empty
        if ($scope.locationInput && (!$scope.locationInput.value || $scope.locationInput.value.length === 0))

          //drop keyboard after 1 second
          $timeout(function() {

            $scope.locationInput.focus();

          }, 1000);
      }

    });




    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });




  }


])