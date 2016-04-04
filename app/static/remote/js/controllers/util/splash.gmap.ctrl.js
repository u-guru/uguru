angular.module('uguru.util.controllers')

//ALL student controllers
.controller('SplashGMapController', [
  '$scope',
  '$state',
  '$stateParams',
  'University',
  'uiGmapIsReady',
  '$timeout',
  '$compile',
  'GUtilService',
  'ContentService',
  '$localstorage',
  function($scope, $state, $stateParams, University, uiGmapIsReady, $timeout, $compile, GUtilService, ContentService, $localstorage){
      // initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
      $scope.time_state = {value: 0, text: 'blank', watcher:null, description: ''};
      $scope.universities = University.getTargetted();
      $scope.selectedUniversity = $scope.universities[0];

      function renderUniversityPlacesMap(university) {

        //state
        //in university map w/ styles --> invisible mode
        var initCallback = timeStateCallback(1, 'initializing university...');
        // initializeDynamicSelectedUniversityMap(university, $scope.selectedCategory, initCallback);

        //get places
        $scope.time_state.watcher = $scope.$watch('time_state.value', function(newValue, oldValue) {
          switch (newValue) {

            case 1: //api call
              var placesCallback = timeStateCallback(2, 'getting places...');
              getUniversityPlaces($scope.selectedUniversity, placesCallback);
              break;

            case 2: //filtering
              var filteringPlaces = timeStateCallback(3, 'filtering ' + university.place_results.length + ' results');
              filterUniversityPlaces($scope.selectedUniversity.place_results, $scope.selectedUniversity, $scope.desktopMode, filteringPlaces);
              break;

            case 3: //generating custom elements & compile
              var generateCallback = timeStateCallback(4, 'generating' + university.place_results.length + ' place markers');
              generateUniversityPlaceOverlayMarkers(university.map, $scope.selectedUniversity.place_results, '#map-parent-wrapper .ui-gmap-wrapper', generateCallback);
            case 4:

              var generatingMarkers = timeStateCallback(5, 'TODO: generating ' + university.place_results.length + ' markers');
              $timeout(function(){
                generatingMarkers();
              }, 3000);

            case 5:
              var transitionMarkersInvisible = timeStateCallback(6, 'TODO: transitioning markers for ' + university.place_results + ' markers');

            default:
              break;
          }
        })

        function timeStateCallback(num, description) {
          return function() {
            $timeout(function() {
              $scope.$apply(function() {
                $scope.time_state.value = num;
                $scope.time_state.description = description || '';
                if (description.indexOf('TODO') > -1) {
                  $scope.time_state.watcher();
                }
              })
            })
          }
        }

      }
      renderUniversityPlacesMap($scope.selectedUniversity)


      function updateMarkersOnUniversitySpecificMap(callback) {

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

      function generateUniversityImgDataURI(obj) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }

      function getAllCourses(university) {
        var areCoursesInCache = $localstorage.getObject('selected_university_courses');
        if (university.courses && university.courses.length) {
          return;
        }
        if (areCoursesInCache && areCoursesInCache.length) {
          university.courses = areCoursesInCache;
        } else {
          University.getPopularCoursesPromise(university.id).then(function(courses) {
            university.courses = courses.plain();
            $localstorage.setObject('selected_university_courses', university.courses);
          }, function(err) {console.log('ERROR FETCHING COURSES', err)});
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


        function initializeDynamicSelectedUniversityMap(university) {
            university.map = {
              control: {},
              coords: {latitude: university.latitude, longitude: university.longitude},
              markers: [],
              zoom: 16,
              // options: {styles: selectedUniversityMapStyles, scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
              options: {styles: getSelectedUniversityMapStyles(university), scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
              pan: true,
              refresh: false,
              events: {tilesloaded: function(map) {
                university.og_map = map;
                $scope.selectedUniversity.og_map = map;
                $scope.getUniversityPlaces($scope.selectedUniversity);
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
                    university.mapRendered = true;
                    university.map.markers = [];
                  })
                })

              }},
            }
            $timeout(function() {
              if (!$scope.selectedUniversity.courses || !$scope.selectedUniversity.courses.length) {
                getAllCourses($scope.selectedUniversity);
              }
            }, 5000);
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
          }

    $scope.getUniversityPlaces = function(university) {
      if (university.og_map  && (!university.place_results || !university.place_results.length)) {
        $timeout(function() {
          $scope.$apply(function() {
            GUtilService.getPlaceListByCoords($scope, university.og_map, {latitude: university.latitude, longitude: university.longitude}, updateMarkersOnUniversitySpecificMap);
          })
        })
      }
      // $scope.map.center = {latitude: university.latitude, university.longitude};
    }


  }


]);