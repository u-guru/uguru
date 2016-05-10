angular.module('uguru.util.controllers')

//ALL student controllers
.controller('GMapController', [
  '$scope',
  '$state',
  '$stateParams',
  'University',
  'uiGmapIsReady',
  '$timeout',
  '$compile',
  'GUtilService',
  'ContentService',
  function($scope, $state, $stateParams, University, uiGmapIsReady, $timeout, $compile, GUtilService, ContentService){

    var g = this;
    g.map = {};
    g.mapHasRendered;
    g.remote = {value: 0, text: 'blank', watcher:null, description: ''};
    g.universities = University.getTargetted();
    g.university = g.universities[0];

    g.category = ($scope.categories && $scope.categories[0]) || {name: 'Academic', hex_color: 'academic', id:5, splashData: ContentService.splashCategoryOptions['Academic']};

    function initUniversityMapOverlay(university) {
      university.og_map_overlay = new google.maps.OverlayView();
      university.og_map_overlay.draw = function() {};
      university.og_map_overlay.setMap(university.og_map);
    }

      function initializeDynamicSelectedUniversityMap(university, category, callback) {
          university.map = {
            control: {},
            coords: {latitude: university.latitude, longitude: university.longitude},
            markers: [],
            zoom: 16,
            category:category,
            domId: 'splash-google-map-selected-university',
            // options: {styles: selectedUniversityMapStyles, scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
            options: {styles: getSelectedUniversityMapStyles(university), scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
            pan: true,
            refresh: false,
            events: {tilesloaded: function(map) {
              university.og_map = map;
              g.university.og_map = map;
              g.mapHasRendered = true;
              initUniversityMapOverlay(g.university);


              function calcMarkerCoords(map) {
                return function () {
                  var mapBounds = map.getBounds().getSouthWest();
                  var mapCenter = map.getCenter();
                  var dx = mapBounds.lat() - mapCenter.lat();
                  var dy = mapBounds.lng() - mapCenter.lng();
                  var newMarkerLat = mapBounds.lat() - (dx/6);
                  var newMarkerLng = mapBounds.lng() - (dy/6); //purposely dx so its a square

                  return {latitude: newMarkerLat, longitude: newMarkerLng};
                }
              }
              $timeout(function() {
                $scope.$apply(function() {
                  university.map.marker = generateSelectedUniversityMapMarkerObj(university, calcMarkerCoords(map));
                  console.log(university.map.marker);
                  university.mapRendered = true;
                  university.map.markers = [];
                })
              })
              callback && callback();
            }},
          }
      }

      function addRandomGurusToMarkers(markers) {
      for (var i = 0; i < markers.length; i ++) {
        var indexMarker = markers[i];
        indexMarker.guru = {
          name: 'Samir M.',
          lastActive: 'Active 10 min ago',
          message: "<p>Hey there<br>, I can tutor you in bio class. We'll get you an A in no time</p>",
          profile_url: 'https://uguru.me/static/web/images/team/gabrielle.png',
          type: 'templates/svg/wwf/' + iconGPlaceMapping('cafe') +  '.html',
          subcategory: 'Bio 1a',
        }
      }

      function iconGPlaceMapping(place_type) {
        var placeIconDict = {
          'cafe': 'coffee',
          'meal_takeaway': 'food',
          'restaurant': 'food',
          'restaurant': 'coffee',
        }
        return placeIconDict[place_type]
      }
    }

      function getSelectedUniversityMapStyles(university) {
      var currentColor = university.school_color_light;
      var currentDarkColor = university.school_color_dark;

      var selectedUniversityMapStyles = [
          { featureType: 'all', elementType: 'labels', stylers: [
              { visibility: 'off' }
          ]},
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 14
            }, {
              "weight": 1.4
            }]
          }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
              "color": currentDarkColor
            }]
          }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 10
            }]
          }, {
            "featureType": "poi.school",
            "elementType": "geometry",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 15
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 80
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 50
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 80
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 50
            }]
          }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 80
            }]
          }, {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
              "stylers": [{
              "color": currentDarkColor
            }, {
              "lightness": 50
            }]
          }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
              "color": currentDarkColor
            }]
          }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
              "color": currentDarkColor
            }]
          }
      ];
      return selectedUniversityMapStyles
    }

    function updateMarkersOnUniversitySpecificMap(callback) {

      // panUniversityBy(university);
      return function(university, selectedCategory)

        {
          university.map.markers = [];
            var markerLabelDivs = [];
            for (var i = 0; i < 10; i++) {
              var indexPlace = university.place_results[i];
              var details = {
                place_name: indexPlace.name,
                open_now: indexPlace.opening_hours && indexPlace.opening_hours.open_now,
                type: indexPlace.types[0],
              }
              if (indexPlace.photos && indexPlace.photos.length) {
                for (var j = 0; j < indexPlace.photos.length; j++) {
                  var indexPhoto = indexPlace.photos[j];
                  if (indexPhoto && indexPhoto.getUrl) {
                    details.place_photo_url = indexPhoto.getUrl({'maxWidth': 260}, {'maxHeight': 90});
                    break;
                  }
                }
              }
              university.map.markers.push(generateMarkerObj(indexPlace.geometry.location.lat(), indexPlace.geometry.location.lng(), i, selectedCategory.hex_color, details));
            }

            addRandomGurusToMarkers(university.map.markers);

            if ($scope.desktopMode) {
              $timeout(function() {
                var selectedMarkerElems = document.querySelectorAll('.university-place-marker');
                if (!selectedMarkerElems) {
                  return;
                }
                var splashHeroMarkerElems = document.querySelectorAll('.splash-hero-marker')
                if (!splashHeroMarkerElems) {
                  return;
                }

                for (var i = 0; i < splashHeroMarkerElems.length; i++) {
                  var indexMarker = selectedMarkerElems[i];
                  $compile(indexMarker)($scope);
                  if (!indexMarker) {
                    continue;
                  }
                  indexMarker.id = 'university-place-marker-' + (i + 1);
                  var className = 'splash-hero-marker-' + (i+1);
                  var indexDOMElem = document.querySelector('.' + className);
                  indexDOMElem.classList.add('translate', 'marker-translate', 'a');
                }
              }, 2500);
            }
        callback && callback();
        }

    }


    var generateUniversityImgDataURI = function(obj) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }

    function generateMarkerObj(lat, lng, id, cat_hex, details) {
        var hexColorLookupDict = {'academic': '#e6389b'}
        var customIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeColor:'#e6389b',
          fillColor: hexColorLookupDict[cat_hex] || '#e6389b',
          size: new google.maps.Size(25, 25)
        }
        return {
          options: {
            labelClass: 'university-place-marker',
            icon: customIcon
          },
          coords: {latitude:lat, longitude:lng},
          id: id,
          details: details
          // place: place,
          // university: university
        }
      }
    function generateSelectedUniversityMapMarkerObj(university, calc_coords_func) {
        obj = university;
        var universityObj = {
            school_color_light: obj.school_color_light,
            banner_url: obj.banner_url,
            school_color_dark: obj.school_color_dark,
            name: obj.name,
            tiny_name: obj.school_tiny_name,
            city: obj.city,
            state: obj.state
        }
        var markerObj =  {
          coords: calc_coords_func(),
          id: university.id,
          control: {},
          options: {
            animation: google.maps.Animation.DROP,
            icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(100, 100)},//, scaledSize: new google.maps.Size(100, 100)
            labelClass: 'selected-university-svg-icon',
            labelVisible: false
          },
        }
        return markerObj;
      }


      // $scope.map.center = {latitude: university.latitude, university.longitude};
      // $scope.$on('$ionicView.loaded', function() {

      // });

      function initWatcher() {
        console.log('initializing watcher');
        g.remote.watcher = $scope.$watch('g.remote.value', function(newValue, oldValue) {
          switch (newValue) {
            case 1: //api call

              var placesCallback = timeStateCallback(2, 'getting places...');
              console.log(newValue, 'complete. Getting places..', g.university, placesCallback);
              getUniversityPlaces(g.university, placesCallback);
              break;

            case 2: //filtering
              var filteringPlaces = timeStateCallback(3, 'filtering ' + g.university.place_results.length + ' results');
              filterUniversityPlaces(g.university.place_results, g.university, $scope.desktopMode, filteringPlaces);
              break;

            case 3: //generating custom elements & compile
              var generateCallback = timeStateCallback(4, 'generating' + g.university.place_results.length + ' place markers');
              $timeout(function() {
                generateUniversityPlaceOverlayMarkers(g.university.map, g.university.place_results, '#map-parent-wrapper .ui-gmap-wrapper', generateCallback);
              }, 2000)
            case 4:

              var generatingMarkers = timeStateCallback(5, 'TODO: generating ' + g.university.place_results.length + ' markers');
              $timeout(function(){
                generatingMarkers();
              }, 3000);

            case 5:
              var transitionMarkersInvisible = timeStateCallback(6, 'TODO: transitioning markers for ' + g.university.place_results + ' markers');

            default:
              break;
          }
        })
      }

      function renderUniversityPlacesMap(university) {
        //state
        //in university map w/ styles --> invisible mode
        var initCallback = timeStateCallback(1, 'initializing university...');
        initializeDynamicSelectedUniversityMap(university, g.university, initCallback);

        //get places
















        function checkFilterCountAndRequest(places_arr) {
          return;
        }

        function getSplashMarkers() {
          return;
        }

        //state
      }

      function addXYCoordsToPlaces(g_overlay, places_arr, callback) {
          for (var i = 0; i < places_arr.length; i++) {
            var indexPlace = places_arr[i];
            var indexLatLng = new google.maps.LatLng(indexPlace.geometry.location.lat(), indexPlace.geometry.location.lng());
            var indexPoint = g_overlay.getProjection().fromLatLngToDivPixel(indexLatLng);
            places_arr[i].coords = {
              x: indexPoint.x,
              y: indexPoint.y
            }
          }
          callback && callback();
        }

      function extendMapBoundsForPlaces(map, places) {
          var bound = new google.maps.LatLngBounds();
          for(var i = 0; i < places.length; i++) {
            var indexPlace = places[i];
            var indexLatLng = new google.maps.LatLng(indexPlace.geometry.location.lat(), indexPlace.geometry.location.lng());
            bound.extend(indexLatLng);
          }

          map.fitBounds(bound);
        }

      function generateUniversityPlaceOverlayMarkers(map, places_arr, parent_elem_selector, callback) {
          var parentContainerElem = document.querySelector(parent_elem_selector);
          var hexColorLookupDict = {'academic': '#e6389b'};
          if (!parentContainerElem) {
            return;
          }
          for (var i = 0; i < places_arr.length; i++) {
            var indexPlace = places_arr[i];

            if (indexPlace && indexPlace.coords && indexPlace.coords.x && indexPlace.coords.y) {
              var div = document.createElement('div');
              var categoryBgCssText = 'background-color:' + hexColorLookupDict[map.category.hex_color] + ';background' + hexColorLookupDict[map.category.hex_color];
              var topCssText = 'top:' + indexPlace.coords.y  + 'px;';
              var leftCssText = 'left:' + indexPlace.coords.x  + 'px;';
              div.classList.add('high-z-index');
              div.style.cssText = 'color:white;padding:4px;font-size:12px;font-weight:700;position:absolute;' + topCssText + leftCssText + categoryBgCssText;
              div.innerHTML = indexPlace.name;
              parentContainerElem.appendChild(div);
            }
          }
          //
        }



      function constrainMapBoundsByWindow(university, places_arr) {
          var mapElem = document.getElementById(university.map.domId);
          var mapElemRect = mapElem.getBoundingClientRect();
        }




      function getUniversityPlaces(university, callback) {

          var options = {
            types: ['library', 'food', 'cafe', 'bus-stop', 'grocery'],
            radius:500
          }

          if (university.og_map  && (!university.place_results || !university.place_results.length)) {
          $timeout(function() {
            $scope.$apply(function() {
              GUtilService.getPlaceListByCoords(g, university.og_map, {latitude: university.latitude, longitude: university.longitude}, updateMarkersOnUniversitySpecificMap(callback), options);
              })
            })
          }
        }

      function timeStateCallback(num, description) {
        return function() {
          $timeout(function() {
            $scope.$apply(function() {
              g.remote.value = num;
              g.remote.description = description || '';
              console.log(g.remote.value);
              if (description.indexOf('TODO') > -1) {
                g.remote.watcher();
              }
            })
          })
        }
      }

      function filterUniversityPlaces(places_arr, university, desktop_mode, callback) {

        extendMapBoundsForPlaces(university.og_map, places_arr);

        google.maps.event.addListenerOnce(university.og_map, 'bounds_changed', function () {
          initUniversityMapOverlay(university);
          google.maps.event.addListenerOnce(university.og_map, 'tilesloaded', function() {
              addXYCoordsToPlaces(university.og_map_overlay, places_arr, callback);
          });
        });

        //step 2
        constrainMapBoundsByWindow(university, places_arr);
        //step 3
        //filter places by
        callback && callback();
        generateUniversityPlaceOverlayMarkers(g.university.map, g.university.place_results, '#map-parent-wrapper .ui-gmap-wrapper');
      }


      initWatcher();

      // $scope.loader = new SVGLoader( document.querySelector('#map-parent-wrapper .pageload-overlay'), { speedIn : 300, easingIn : mina.easeinout } );
      // $scope.loader.show();


      $scope.hideLoader = function() {
        document.querySelector('#cerise-bg-test').style.visibility = "hidden";
        document.querySelector('#map-parent-wrapper .pageload-overlay svg.transition').style.visibility = "visible";
        $scope.loader.hide();
      }

      $timeout(function() {
        // renderUniversityPlacesMap(g.university);

        $scope.showPageLoader = true;

        $timeout(function() {
          // loader.isHide = true;
        }, 1000)

      },3000)




    }

]);