angular
.module('sharedServices')
.factory("InAppMapService", [
	'University',
	'$timeout',
	'Restaurant',
  'DeviceService',
  	InAppMapService
	]);

function InAppMapService(University, $timeout, Restaurant, DeviceService) {

var map;
  return {

  	displayMap: displayMap,
  	enlarge: enlarge,
  	plotMarkers: plotMarkers,
    moveMap: moveMap,
    updateMap: updateMap

  };

  function updateMap() {

    if (DeviceService.doesCordovaExist()) {

    }

    else {



    }



  }

  //takes in an array of object markers
  function plotMarkers(markers) {

    if (DeviceService.doesCordovaExist() && typeof map !== 'undefined') {
      try {
          map.clear();

          for (var i = 0; i<markers.length; i++) {

            map.addMarker({
              'position': {
                lat: markers[i].latitude,
                lng: markers[i].longitude
              },
              'icon': {
                'url': markers[i].options.icon
               },
              'title': markers[i].name
            }, function(marker) {

              if (markers.length === 1) {
                marker.showInfoWindow();
              }

            });
          }


      } catch(e) {
        console.log("throw catch on gmap");
      }

    }




  }

  function enlarge() {
  	console.log("calling enlarge()");

    if (DeviceService.doesCordovaExist()) {
      document.querySelector('#home-courses').style.visibility = 'hidden';
    	map.showDialog();

    }
    else {

    }


  }

  function displayMap() {

    if (DeviceService.doesCordovaExist()) {

        navigator.splashscreen.hide();

        console.log("calling displayMap");
        var div = document.getElementById("map_canvas_home");
        map = plugin.google.maps.Map.getMap(div);
        map.refreshLayout();
        map.setVisible(true);

        moveMap(37.8718992, -122.2585399);
        map.setClickable(false);

        map.addEventListener(plugin.google.maps.event.MAP_CLOSE, function() {

          try {
            document.querySelector('#home-courses').style.visibility = 'visible';
          } catch (e) {
            console.log("try catch caught error during querySelector for map close");
          }

        });
    }
    else {
      console.log("desktop mode detected, initializing angular gmaps");


      var div = document.getElementById("map_canvas_home");
      try {
        div.style.paddingTop = '0px';
      } catch(e) {
        console.log('not on mobile device');
      }

      var gMaps = document.querySelector('ui-gmap-google-map');


    }

  }

  function moveMap(latitude, longitude) {
    if (DeviceService.doesCordovaExist()) {
      map.moveCamera({
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 13
      });

      plotMarkers(Restaurant.getAll);
      map.setClickable(false);
    }
    else {

    }



  }


}





