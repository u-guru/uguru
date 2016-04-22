angular.module('uguru.util.controllers')
	.controller('UniversitySearchController', [

		//All imported packages go here
		'$rootScope',
		'$scope',
		'$state',
		'$timeout',
		'University',
    '$compile',
    'LoadingService',
		AddUniversityCtrl
	]);

function AddUniversityCtrl($rootScope, $scope, $state, $timeout, University, $compile, LoadingService) {
  var uniSearch = this;

  uniSearch.user = $scope.user;
  $timeout(function() {
    uniSearch.layout = {
      init: initLayout,
      map: initHomeMap(),
      domReady: null,
      mapReady: null,
      edit_mode: determineEditMode(uniSearch.user),
    }
  })

  uniSearch.selectUniversityFromSearch = function(university) {
      $scope.selectUniversityGettingStarted(university);
      LoadingService.showAmbig(null, 1000, function() {
        uniSearch.layout.edit_mode = true;
        $timeout(function() {
          $scope.activate.searchUniversity = false;
          $scope.$apply();
          $timeout(function() {
            var dropdownUniversity = document.querySelector('#dropdown-university')
            dropdownUniversity && dropdownUniversity.classList.add('animated', 'tada');
            $timeout(function() {
              dropdownUniversity && dropdownUniversity.classList.remove('animated', 'tada');
            }, 1000);
          }, 1250);
          LoadingService.showAmbig(null, 1000);
        }, 1000)
      })
      return;

  }

  function determineEditMode() {
    return (uniSearch.user && (uniSearch.user.id || uniSearch.user.auth_token))

  }

  function initLayout() {
    return;
  }


  //read other options here https://developers.google.com/maps/documentation/static-maps/intro#MapTypes
    // function initUniversityMap() {


      $scope.universities = University.getTargetted();
      var staticMapOptions = {
        scale: 1, //up to 2, only whole values
        map_type: "roadmap", //hybrid, terrain, satellite, roadmap
        size: "1280x1280",
        zoom: 17
      }

      $scope.mapBounds = {
        desktop: {
          northeast: {latitude: 54, longitude:-61.50},
          southwest: {latitude:15, longitude: -125}
        },
        mobile: {
          northeast: {latitude: 20.70, longitude:-100.50},
          southwest: {latitude:48.85, longitude: -55.90}
        }
      }

      $scope.mapZoom = {
        initialMobile: 2,
        initialDesktop: 4,
        maxZoom: 9,
        minZoom: 1
      }

      var styleOptions = [{ featureType: 'water', elementType: 'geometry.fill', stylers: [
            { color: '#40484b' },
            { visibility: 'on' }
        ]},
        { featureType: 'landscape', elementType: 'geometry', stylers: [
            { color: '#51595c' },
            { visibility: 'on' }
        ]},
        { featureType: 'administrative', elementType: 'geometry.fill', stylers: [
            { color: '#51595c' },
            { visibility: 'on' }
        ]},
        { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [
            { color: '#FFFFFF' },
            { visibility: 'on' }
        ]},
        { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [
            { color: '#FFFFFF' },
            { visibility: 'on' }
        ]},
        { featureType: 'road', elementType: 'geometry', stylers: [
            { color: '#474e51' },
            { visibility: 'on' }
        ]},
        { featureType: 'transit', elementType: 'geometry', stylers: [
            { color: '#474e51' },
            { visibility: 'on' }
        ]},
        { featureType: 'poi', elementType: 'all', stylers: [ { visibility: 'off' } ]},
        { featureType: 'all', elementType: 'labels', stylers: [ {visibility: 'off'} ]}
      ];




      //init map helper functions
      var calcZoom = function() {
        if ($scope.desktopMode) {
          return 3;
        } else {
          return 2;
        }
      }

      var mapDefaults = {
        zoom: calcZoom(),
        options: { streetViewControl:false, scrollwheel:false, panControl:false,  minZoom: $scope.mapZoom.minZoom, maxZoom: $scope.mapZoom.maxZoom,
                   scrollwheel: false, mapTypeControl:false, styles:styleOptions, draggable:true, disableDoubleClickZoom:false, zoomControl: false
                 }
      }

      var generateClusterImgDataURI = function(obj) {
          var baseSVGURL = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="' + obj.bg_color + '"></circle></svg>'
          return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL);
      }

      var generateUniversityImgDataURI = function(obj) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }


      var clusterCalculator = function(markers, num_styles) {
        //The function used to determine the text to be displayed on a cluster marker and the index indicating which
        // style to use for the cluster marker.

        var markerValues = markers.values();
        var universityArr = getUniversitiesFromMarkers(markerValues)
        var stateDict = getMostCommonStateFromUniversities(universityArr);
        var getTopXStateStr = processStateDictToStr(stateDict);

        function processStateDictToStr(state_dict) {
          var results = [];
          for (var key in state_dict) results.push([key, state_dict[key]]);

          results.sort(function(a, b) {
              a = a[1];
              b = b[1];

              return a < b ? -1 : (a > b ? 1 : 0);
          }).reverse();
          result_str = "";
          if (results.length === 1) {
            return "<span>" + universityArr.length + "</span> <span> schools </span> <span>" + results[0][0] + "</span>"
          }
          if (results.length === 2) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';
          }
          if (results.length === 3 && universityArr.length >= cluster.styleThreshold[0]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + '</span>';
          }
          if (results.length === 4 && universityArr.length >= cluster.styleThreshold[1]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + '</span>';
          }
          if (results.length > 4 && universityArr.length >= cluster.styleThreshold[1]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + ", " + results[4][0] + '</span>';
          }
          return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';

        }

      function getUniversitiesFromMarkers(markers) {
        var arrUniversities = [];
        for (var i = 0; i < markers.length; i++) {
          var indexMarker = markers[i];
          arrUniversities.push(indexMarker.model.university);
        }
        return arrUniversities;
      }

      function getMostCommonStateFromUniversities(universities) {
        var stateDict = {};
        for (var i = 0; i < universities.length; i++) {
          var indexUniversity = universities[i];
          if (indexUniversity.state) {
            if (stateDict[indexUniversity.state]) {
              stateDict[indexUniversity.state] += 1;
            } else {
              stateDict[indexUniversity.state] = 1;
            }
          }
        }
        return stateDict;
      }



      if (universityArr.length > cluster.styleThreshold[2]) {
        var indexNumber = 1
      } else if (universityArr.length > cluster.styleThreshold[1] && universityArr.length <= cluster.styleThreshold[2]) {
        var indexNumber = 2
      } else if (universityArr.length > cluster.styleThreshold[0] && universityArr.length <= cluster.styleThreshold[1]) {
        var indexNumber = 3
      } else {
        var indexNumber = 4
      }


    var resultDict = {
        text: getTopXStateStr,
        title: '+more',
        index: indexNumber
      }
      return resultDict;
    }

    //end cluster calculator

    var cluster;
    function initClusterObj(marker_arr) {

        cluster = {
          style: {
            xl: {bg_color: '#d3242c', width:128, height:128, textSize: 18, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
            l: {bg_color: '#df433a', width:96, height:96, textSize: 16, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
            m: {bg_color: '#eb6248', width:84, height:84, textSize: 14, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
            s: {bg_color: '#E5753C', width:64, height:64, textSize: 12, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
          },
          minClusterSize: 4, //direct correlation
          zoomOnclick: true,
          maxZoom: 7,
          gridSize: 125, //direct correlation
          customClass: "university-svg-cluster",
          styleThreshold: [10,30,70,80] //direct correlation
        }


        var options_dict = {
            minimumClusterSize:cluster.minClusterSize,
            calculator: clusterCalculator,
            styles:[
              {
                width:cluster.style.xl.width,
                height:cluster.style.xl.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.xl.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.xl.fontWeight,
                textColor: cluster.style.xl.textColor,
                textSize: cluster.style.xl.textSize,
                anchorText: cluster.style.xl.anchorIcon
                // anchorIcon: "[0, 0]"
              },
              {
                width:cluster.style.l.width,
                height:cluster.style.l.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.l.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.l.fontWeight,
                textColor: cluster.style.l.textColor,
                textSize: cluster.style.l.textSize,
                anchorText: cluster.style.l.anchorIcon
                // anchorText: "[0, 0]"
              },
              {
                width:cluster.style.m.width,
                height:cluster.style.m.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.m.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.m.fontWeight,
                textColor: cluster.style.m.textColor,
                textSize: cluster.style.m.textSize,
                anchorText: cluster.style.m.anchorIcon
                // anchorText: "[0, 0]"
              },
              {
                width:cluster.style.s.width,
                height:cluster.style.s.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.s.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.s.fontWeight,
                textColor: cluster.style.s.textColor,
                textSize: cluster.style.s.textSize,
                anchorText: cluster.style.s.anchorIcon
              },
            ],
            // title: "",
            zoomOnClick: cluster.zoomOnClick,
            maxZoom: cluster.maxZoom,
            gridSize: cluster.gridSize,
            clusterClass: cluster.customClass,
            // batchSize:
            averageCenter: true
        }
        return options_dict
      }

      function hasMapBeenShown() {
        var splashMap = document.querySelector('#splash-university.opacity-1-impt');
        return splashMap;
      }
      function hideAllClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
              var indexCluster = allClusterElems[i];
              indexCluster.style.opacity = 0;
              if (!hasMapBeenShown()) {
                indexCluster.classList.add('opacity-0');
                indexCluster.setAttribute("class-on-activate", "bounceInUp:anim:keep");
                indexCluster.setAttribute("class-on-activate-delay", 1500 + (i * 50) + "");
              } else {
                indexCluster.classList.add('opacity-1', 'opacity-1-impt');
              }
              $compile(indexCluster)($scope);
          }
        }, 1000)
      }

      function setPulseClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
            var indexCluster = allClusterElems[i];
            indexCluster.classList.add('animated', 'pulse');
          }
        })
      }

      function initHomeMap() {
          var map = {
          center: {latitude: 42.5, longitude: -100},
          control: {},
          zoom:  4,
          dragging: true, //true while map is dragging state, false otherwise
          refresh: false,
          options: mapDefaults.options,
          events: {tilesloaded: onMapRenderCompleteOnce},
          clusterOptions: initClusterObj(),
          clusterEvents: {mouseover: function(cluster){ setPulseClusters('.university-svg-cluster') }, clusteringend: function(cluster) {hideAllClusters('.university-svg-cluster')}},
          bounds: $scope.mapBounds, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
          pan: true,
          bounds: $scope.mapBounds.desktop,
          markers: generateXMarkersFromUniversities(200, $scope.universities),
          rebuildMarkers: false,
          window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
        }
        if (!$scope.desktopMode) {
          uniSearch.layout.map.zoom = $scope.mapZoom.initialMobile
          uniSearch.layout.map.bounds = $scope.mapBounds.mobile
        }
        return map;
      }

      function createMarkerObj(obj) {

        var universityObj = {
            school_color_light: obj.school_color_light,
            banner_url: obj.banner_url,
            school_color_dark: obj.school_color_dark,
            name: obj.name,
            tiny_name: obj.school_tiny_name,
            city: obj.city,
            state: obj.state
        }
        return {
          id: obj.id,
          latitude: obj.latitude,
          longitude: obj.longitude,
          icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(60, 60), scaledSize: new google.maps.Size(60, 60)},
          events: {
            click: onMarkerClick
          },
          university: universityObj
        }
      }

      var generateXMarkersFromUniversities = function(x, universities_arr, with_interval) {

        var universities_arr = universities_arr.slice(0, x);
        var marker_obj_arr = [];
        for (var i = 0; i < universities_arr.length; i++) {
          marker_obj_arr.push(createMarkerObj(universities_arr[i]));
        }
        return marker_obj_arr;
      }

      var windowCloseButtonIsClicked = function(e) {
        console.log(e);
      }

      var defaultWindowOptions = {
          pixelOffset: new google.maps.Size(0, -10, 'px', 'px'),
          closeclick: windowCloseButtonIsClicked
      }

      var closeInfoWindow = function() {
        uniSearch.layout.map.window.show = false;
      }

      var refreshMap = function() {
        uniSearch.layout.map.refresh = true;
        $timeout(function() {
          uniSearch.layout.map.refresh = false;
        })
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

      function getUniversityFromOriginalArray(uni_arr, _id) {
        for (var i = 0; i < uni_arr.length; i++) {
          var indexUniversity = uni_arr[i];
          if (indexUniversity.id === _id) {
            return indexUniversity;
          }
        }
      }

      var onMarkerClick = function(marker, event_name, model) {
        LoadingService.showAmbig(null, 10000);
        $timeout(function() {
          var origUniversity = getUniversityFromOriginalArray($scope.universities, model.id);
          uniSearch.selectUniversityFromSearch(origUniversity);

          LoadingService.hide();
        }, 1000)

      }

      function onMapRenderCompleteOnce(map) {
        if (!uniSearch.layout.map.og_map) {
          uniSearch.mapHasRendered = true;
          uniSearch.layout.map.og_map = map;
          document.querySelector('#splash-university').classList.add('show-map');
        }
      }

  // }


};