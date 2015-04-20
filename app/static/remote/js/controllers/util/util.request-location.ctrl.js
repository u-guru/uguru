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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $compile, $ionicHistory) {

    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
    $scope.options = {scrollwheel: false};

    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    }

    $scope.validateForm = function() {

      if ($scope.root.vars.request.location) {
        $ionicHistory.goBack();
      } else {
        alert('Please select a location');
      }
    }

    $scope.searchbox =  {
        template: BASE + 'templates/searchbox.tpl.html',
        options: {
          autocomplete:true,
          types: ['(cities)'],
          componentRestrictions: {country: 'us'}
        },
        events: {
        place_changed: function (autocomplete){
            place = autocomplete.getPlace()
          }
        }
    }


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
        }, 300)
      } else {
        $scope.requestMapModal.hide();
      }
    }

    $scope.setLocation = function() {
      $scope.root.vars.request.position = $scope.requestPosition;
      $ionicHistory.goBack();
    }

    $scope.createGoogleLatLng = function(latCoord, longCoord) {
      return new google.maps.LatLng(latCoord, longCoord);
    }

    $scope.setMarkerPosition = function(marker, latCoord, longCoord) {
      marker.setPosition($scope.createGoogleLatLng(latCoord, longCoord));
    }

    $scope.getAddressFromLatLng = function(geocoderObj, latCoord, longCoord) {

      var googleLatLng = $scope.createGoogleLatLng(latCoord, longCoord);
      geocoderObj.geocode({'latLng': googleLatLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            // $scope.actual_map.setZoom(17);
            var formatted_address = results[0].formatted_address;
            $scope.root.vars.request.location = formatted_address;
            console.log($scope.root.vars.request.location);
            $scope.requestPosition.coords.latitude = latCoord;
            $scope.requestPosition.coords.longitude = longCoord;
            $timeout(function() {
              $scope.root.vars.request.location = formatted_address;
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
    }

    $scope.setMapCenter = function(map, latCoord, longCoord) {
      $scope.map.setCenter($scope.createGoogleLatLng(latCoord, longCoord));
    }

    $scope.fixInput = function() {
      $timeout(function() {
            container = document.getElementsByClassName('pac-container');
            console.log(container)
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function(){
                console.log('it was clicked');
                document.getElementById('type-selector').blur();
            });

          },1500);
    }

    $scope.$on('$ionicView.loaded', function() {

      // if ($scope.requestMapModal.isShown()) {

          var mapContainer = document.getElementsByTagName("ion-pane")[0];
          var initMapCoords;

          if ($scope.requestPosition) {
            initMapCoords = $scope.createGoogleLatLng(
                                $scope.requestPosition.coords.latitude,
                                $scope.requestPosition.coords.longitude
                            )
          } else {

            $scope.requestPosition = { coords: { latitude: $scope.user.university.latitude, longitude: $scope.user.university.longitude}}


            console.log($scope.user.university.latitude, $scope.user.university.longitude);
            initMapCoords = $scope.createGoogleLatLng(
                                $scope.user.university.latitude,
                                $scope.user.university.longitude
                            )

          }

          var mapOptions = {
            center: initMapCoords,
            zoom: 17,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
          }
          // console.log(mapOptions);
          // var actual_map = $scope.map.control.getGMap();
          actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          )

          $scope.actual_map = actual_map

          // var input = document.getElementById('search-box-input');
          // var searchBox = new google.maps.places.SearchBox(input);
          // var input = document.getElementById('search-box-input');
          // $scope.autocomplete = new google.maps.places.Autocomplete(input);
          // $scope.autocomplete.bindTo('bounds', actual_map);

          // google.maps.event.addListener($scope.autocomplete, 'place_changed', function() {
          //   console.log('place changed');
          // });

          $scope.marker = new google.maps.Marker({
            position: initMapCoords,
            map: actual_map,
            draggable:true,
            animation: google.maps.Animation.DROP
          });



          $scope.geocoder = new google.maps.Geocoder();
          if ($scope.requestPosition) {

            $scope.getAddressFromLatLng(
              $scope.geocoder,
              $scope.requestPosition.coords.latitude,
              $scope.requestPosition.coords.longitude
              );
          }

          // } else {

          //   $scope.getAddressFromLatLng(
          //     $scope.geocoder,
          //     $scope.user.university.location.latitude,
          //     $scope.user.university.location.longitude);

          // }

          google.maps.event.addListener($scope.marker, 'dragend', function()
          {
              $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
              $scope.getAddressFromLatLng($scope.geocoder, $scope.marker.getPosition().lat(), $scope.marker.getPosition().lng())

              $timeout(function() {
                $scope.marker.setAnimation(null);
              }, 1000)
          });

          // google.maps.event.addListener($scope.marker, 'drag', function()
          // {
          //     $scope.getAddressFromLatLng($scope.geocoder, $scope.marker.getPosition().lat(), $scope.marker.getPosition().lng())

          //     $timeout(function() {
          //       $scope.marker.setAnimation(null);
          //     }, 1000)
          // });

      // }

    });


  }


])