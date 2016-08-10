angular.module('uguru.util.controllers')

.controller('RequestLocationController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$compile',
  '$ionicHistory',
  '$cordovaGeolocation',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $compile, $ionicHistory, $cordovaGeolocation, LoadingService) {


    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    };

    $scope.validateForm = function() {

      if ($scope.root.vars.request.location) {
        $ionicHistory.goBack();
      } else {
        alert('Please select a location');
      }
    };

    $scope.refresh_map = false;
    $scope.random  = null;

    $scope.hideRequestMapModal = function() {

      if (!$scope.request.location) {
        $scope.togglePersonGuru();
      }

      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.requestMapModal.hide();
        }, 300);
      } else {
        $scope.requestMapModal.hide();
      }
    };

    $scope.setLocation = function() {
      $scope.root.vars.request.position = $scope.requestPosition;
      $ionicHistory.goBack();
    };

    $scope.createGoogleLatLng = function(latCoord, longCoord) {
      return new google.maps.LatLng(latCoord, longCoord);
    };

    $scope.setMarkerPosition = function(marker, latCoord, longCoord) {
      marker.setPosition($scope.createGoogleLatLng(latCoord, longCoord));
    };

    $scope.getAddressFromLatLng = function(geocoderObj, latCoord, longCoord) {

      var googleLatLng = $scope.createGoogleLatLng(latCoord, longCoord);
      geocoderObj.geocode({'latLng': googleLatLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            // $scope.actual_map.setZoom(17);
            var formatted_address = results[0].formatted_address;
            $scope.root.vars.request.address = formatted_address;
            $scope.requestPosition.coords.latitude = latCoord;
            $scope.requestPosition.coords.longitude = longCoord;
            $timeout(function() {
              $scope.root.vars.request.address = formatted_address;
            }, 500);
            $scope.setMarkerPosition($scope.marker, latCoord, longCoord);
            // $scope.request.autocomplete = results[0].formatted_address;
            // var infowindow = new google.maps.InfoWindow();
            // infowindow.setContent(results[0].formatted_address);
            // infowindow.open($scope.map, $scope.marker);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    };

    $scope.setMapCenter = function(map, latCoord, longCoord) {
      $scope.map.setCenter($scope.createGoogleLatLng(latCoord, longCoord));
    };

    $scope.fixInput = function() {
      $timeout(function() {
            container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function(){
                document.getElementById('type-selector').blur();
            });

          },1500);
    };

    $scope.showGoogleMap = function() {
          $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
          $scope.options = {scrollwheel: false};

          var mapContainer = document.getElementsByTagName("ion-pane")[0];
          var initMapCoords;

          if ($scope.requestPosition) {
            initMapCoords = $scope.createGoogleLatLng(
                                $scope.requestPosition.coords.latitude,
                                $scope.requestPosition.coords.longitude
                            );

            $scope.root.vars.request.location = {latitude: $scope.requestPosition.coords.latitude, longitude: $scope.requestPosition.coords.longitude};
          }

          var mapOptions = {
            center: initMapCoords,
            zoom: 17,
            disableDefaultUI: true,
            zoomControl: false,
            // zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
          };

          actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          );

          $scope.actual_map = actual_map;

          $scope.marker = new google.maps.Marker({
            position: initMapCoords,
            map: actual_map,
            draggable:true,
            // animation: google.maps.Animation.DROP
          });

          $scope.geocoder = new google.maps.Geocoder();
          if ($scope.requestPosition) {

            $scope.getAddressFromLatLng(
              $scope.geocoder,
              $scope.requestPosition.coords.latitude,
              $scope.requestPosition.coords.longitude
              );
          }

          google.maps.event.addListener($scope.marker, 'dragend', function()
          {
              // $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
              $scope.getAddressFromLatLng($scope.geocoder, $scope.marker.getPosition().lat(), $scope.marker.getPosition().lng());


          });
    };

    $scope.$on('$ionicView.enter', function() {
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false, //may cause high errors if true
      };

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function( position) {

        //typical find GPS & show
          LoadingService.hide();
          $scope.user.last_position = position.coords;
          $scope.requestPosition = position;
          $scope.showGoogleMap();
      }, function(error) {

          //show & let them know we couldn't find it
          LoadingService.hide();
          $scope.requestPosition = { coords: { latitude: $scope.user.university.latitude, longitude: $scope.user.university.longitude}};
          $scope.success.show(0, 2000, "Sorry! We couldn't detect a strong enough GPS signal.");
          $scope.showGoogleMap();
      });

    });

  }


]);