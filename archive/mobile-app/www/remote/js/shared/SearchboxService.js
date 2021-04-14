angular
	.module('sharedServices')
	.factory("SearchboxService", [
		'GUtilService',
    '$timeout',
    SearchboxService
	]);

function SearchboxService(GUtilService, $timeout) {
  var autocompleteService, autocompleteOptions;

  return {
    placeToGPS: placeToGPS,
    initAutocomplete: initAutocomplete,
    queryAutocompleteService: queryAutocompleteService
  }



      // MVP -- will not work 100%
      function placeToGPS(local_name , city, country){

          var address = local_name + ", " + city +", "+ country;
          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
              var positionObj = {latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng()};
              return positionObj;
            }
          });
      }

      function initAutocomplete(options) {
        options = options || {};

        if (options.lat && options.lng) {
          options.location = GUtilService.latCoordToGoogleLatLng(options.lat, options.lng)
          delete options.lat;
          delete options.lng;
        }
        options.radius = options.radius || 1000 // 5 miles in radius
        autocompleteOptions = options;
        autocompleteService = new google.maps.places.AutocompleteService();
        return autocompleteService
      }

      function setAutocompleteRadius(val) {
        // if greater than 5 kilometers
        if (val && val >= 5000) {
          autocompleteOptions.radius = val;
        }
      }


      function createMarkersFromPredictions(predictions, map) {
        var newMarkers = [];

        for (var i = 0; i < predictions.length; i++) {
          var indexPrediction = predictions[i];
          if (indexPrediction.geometry && indexPrediction.geometry.location) {
            var marker = new google.maps.Marker({
              position: indexPrediction.geometry.location,
              map: map,
              title: indexPrediction.name
            });
            newMarkers.push(marker);
          }

        }

        return newMarkers
      }

      function queryAutocompleteService(query, scope, map, callback) {

        if (scope.map.control.getGMap) {
          lastPlaceService = GUtilService.initPlacesService(scope.map.control.getGMap());
        }
        if (map) {
          lastPlaceService = GUtilService.initPlacesService(map);
        }

        autocompleteOptions.input = query;
        autocompleteOptions.offset = 0;
        autocompleteOptions.types = ['establishment', 'geocode'];

        delete autocompleteOptions.bounds;


        function displaySuggestionsCallback(predictions, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }


            var new_markers;
            scope.page.dropdowns.location_search.predictions = predictions;
            scope.page.predictionMarkers = []
            // scope.instantiateAllMarkers(predictions);
            scope.page.dropdowns.location_search.predictions.forEach(function(prediction, index) {
              successCallback = function(placesResult, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                  alert(status);
                  return;
                }
                scope.page.dropdowns.location_search.predictions[index] = placesResult;
                if (scope.map.control.getGetMap) {
                  new_markers = createMarkersFromPredictions(predictions, scope.map.control.getGetMap());
                }
                if (map) {
                  new_markers = createMarkersFromPredictions(predictions, map);
                  scope.page.predictionMarkers = new_markers;
                }
              }
              var prediction_place_id = prediction.place_id;


              lastPlaceService.getDetails({placeId:prediction_place_id}, successCallback);

            });


        }

        autocompleteService.getPlacePredictions(autocompleteOptions, displaySuggestionsCallback);
      }

}