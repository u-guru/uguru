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
  function($scope, $state, $stateParams, University, uiGmapIsReady, $timeout, $compile){

      var styleOptions = [
        { featureType: 'water', elementType: 'geometry', stylers: [ { hue: '#50A5DD' }, { saturation: -50 },{ lightness: 0 }, { visibility: 'on' }]},
        { featureType: 'water', elementType: 'labels', stylers: [ { visibility: 'off' } ]},
        { featureType: 'landscape', elementType: 'all', stylers: [ {visibility: 'off'} ] },
        { featureType: 'poi', elementType: 'all', stylers: [ {visibility: 'off'} ] },
        { featureType: 'administrative.country', elementType: 'labels',stylers: [{visibility: 'off'} ] },
        { featureType: 'administrative.locality', elementType: 'labels', stylers: [ {visibility: 'off'} ]},
        { featureType: 'all', elementType: 'labels', stylers: [ {visibility: 'off'} ]}
      ];

      $scope.universities = University.getTargetted();

      var calcZoom = function() {
        if ($scope.desktopMode) {
          return 4;
        } else {
          return 2;
        }
      }

      var mapDefaults = {
        zoom: calcZoom(),
        options: { streetViewControl:false, scrollwheel:false, panControl:false, zoomControl:false, minZoom: 1, maxZoom: 7, styles: styleOptions,
                   scrollwheel: false, mapTypeControl:false, style:styleOptions, draggable:true, disableDoubleClickZoom:false, zoomControl: false
                 }
      }

      var windowCloseButtonIsClicked = function(e) {
        console.log(e);
      }

      var defaultWindowOptions = {
          pixelOffset: new google.maps.Size(0, -10, 'px', 'px'),
          closeclick: windowCloseButtonIsClicked
      }

      var closeInfoWindow = function() {
        $scope.map.window.show = false;
      }

      var refreshMap = function() {
        $scope.map.refresh = true;
        console.log('map is refreshing');
        $timeout(function() {
          $scope.map.refresh = false;
        })
      }
      function generateNullIcon() {
        return {
          "path": "M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0",
          "fillOpacity": 1,
          "strokeOpacity":1,
          "scale":0.4,
          "anchor": new google.maps.Point(100, 200),
          // "strokeColor": "transparent",
          // "fillColor": "transparent",
        }
      }

      var generateSVGLabelContent = function(dark_color, light_color, text) {
        var base_str = "data:image/svg+xml,"
        var base_svg = "data:image/svg+xml,<svg viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + dark_color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + dark_color +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + text + "</tspan></text></svg>"
        return base_str + base_svg;
      }

      var updateWindowToMarker = function(window_obj, model_obj) {
        window_obj.coords = {latitude:model_obj.latitude, longitude:model_obj.longitude};
        window_obj.university = model_obj.university;
      }

      var deleteWindowExtraCSS = function() {
          var elem = document.querySelector('.gm-style-iw');
          var children = elem.parentElement.childNodes;
          for (var i = 0; i < children.length; i++) {
              var indexChild = children[i];
              if (indexChild !== elem) {
                  indexChild.style.display = "none"
              }
          }
      }

      var onMarkerClick = function(marker, event_name, model) {
        updateWindowToMarker($scope.map.window, model);
        $scope.map.window.show = true;
        $timeout(function() {
          deleteWindowExtraCSS();
        }, 100)
        $timeout(function() {
          console.log('attempting to compile');
          $compile(document.getElementById('university-info-window-button'))($scope);
          $compile(document.getElementById('university-info-window-close-button'))($scope);
        }, 1000)
      }

      var createMarkerObj = function(obj) {
        return {
          id: obj.id,
          latitude: obj.latitude,
          longitude: obj.longitude,
          icon: {},
          // options: { //markerWithLabelOptions
          //   labelClass: 'university-svg-icon',
          //   labelContent: generateSVGLabelContent(obj.school_color_dark, obj.school_color_light, obj.school_tiny_name),
          //   labelAnchor: "0 200"
          // },
          events: {
            click: onMarkerClick
          },
          university: {
            school_color_light: obj.school_color_light,
            banner_url: obj.banner_url,
            school_color_dark: obj.school_color_dark,
            name: obj.name
          }
        }
      }

      var generateXMarkersFromUniversities = function(x, universities_arr) {
        var universities_arr = universities_arr.slice(0, x);
        var marker_obj_arr = [];
        for (var i = 0; i < universities_arr.length; i++) {
          marker_obj_arr.push(createMarkerObj(universities_arr[i]));
        }
        return marker_obj_arr;
      }

      var onMapRenderCompleteOnce = function(map) {
        if (!$scope.map.og_map) {
          $scope.mapHasRendered = true;
          $scope.map.og_map = map;
          // $timeout(function() {
            // $scope.map.markers =
          // }, 1000)
        }
      }

      $timeout(function() {
        $scope.map = {
          center: {latitude: $scope.universities[0].latitude, longitude: $scope.universities[0].longitude},
          control: {},
          zoom:  mapDefaults.zoom,
          dragging: true, //true while map is dragging state, false otherwise
          refresh: false,
          options: mapDefaults.options,
          events: {tilesloaded: onMapRenderCompleteOnce},
          bounds: null, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
          pan: true,
          markers: generateXMarkersFromUniversities(200, $scope.universities.slice()),
          rebuildMarkers: false,
          window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
        }
      })

      $scope.universityButtonClicked = function() {
        console.log('university button clicked');
      }


      // uiGmapIsReady.promise()                     // this gets all (ready) map instances - defaults to 1 for the first map
      // .then(function(instances) {                 // instances is an array object
      //     var maps = instances[0].map;            // if only 1 map it's found at index 0 of array
      //     google.maps.event.addListenerOnce(maps[0], 'idle', function(){
      //       onMapRenderComplete();
      //     });
      // });


    }

]);