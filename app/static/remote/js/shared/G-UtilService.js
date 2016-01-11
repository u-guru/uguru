

angular
	.module('sharedServices')
	.factory("GUtilService", [
		GUtilService
	]);

function GUtilService() {
  var publicPlaceService;


  function latCoordToGoogleLatLng(lat, lng) {
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }


  function initPlacesService(map) {
    return new google.maps.places.PlacesService(map);
  }

  function getNearestLocationOneMarker(map, lat, lng, scope) {
    if (!publicPlaceService) {
      publicPlaceService = initPlacesService(map, lat, lng);
    }
    var GLatLng = latCoordToGoogleLatLng(lat, lng);
    var requestPayload = {location: GLatLng, rankBy:google.maps.places.RankBy.DISTANCE, types:["restaurant", "cafe", "food", "bar" ,"point_of_interest", "establishment"]};
    publicPlaceService.nearbySearch(requestPayload,
      function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
           if (results.length) {
            var placeName = results[0].name;
            var placeObj = results[0];
            scope.map.centerMarker.windowText = placeName;
            scope.map.centerMarker.closestPlace = placeObj;
           }
        }
      }
    );
  }

  var createMarker = function(map, lat, lng, markerObj, iconUrl) {
    var gLocation = latCoordToGoogleLatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: gLocation,
        map: map,
        title: markerObj.name,
        animation: google.maps.Animation.BOUNCE,
        icon: iconUrl
      });
    return marker;
  }

  var chooseRandomIcon = function(scope) {
    // https://developers.google.com/maps/documentation/javascript/reference?hl=en#Symbol
    //rotation, scale, stroke color, stroke opacity, stroke weight, path, label origin, fillOpacity, fillColor, anchor
    var universityIconOne = {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: scope.university.school_color_two,
      fillColor:scope.university.school_color_one,
      fillOpacity: 1,
      scale: 15
    }
    var universityIconTwo = {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: scope.university.school_color_one,
      fillColor:scope.university.school_color_two,
      fillOpacity: 1,
      scale: 15
    }
    var randomIcons = [universityIconOne, universityIconTwo, 'marker.svg', 'location.svg', 'paperclip.svg', 'task.svg', 'question.svg', 'clock.svg'];
    var randItem = randomIcons[Math.floor(Math.random()*randomIcons.length)];
    if (randomIcons.indexOf(randItem) > 1) {
      return "https://uguru.me/static/remote/img/icons/" + randItem;
    } else {
      return randItem
    }
  }

  var nearbyLocationMarkers = [];
  function getNearestLocationManyMarkers(map, lat, lng, scope) {
    if (!publicPlaceService) {
      publicPlaceService = initPlacesService(map, lat, lng);
    }
    var GLatLng = latCoordToGoogleLatLng(lat, lng);
    var requestPayload = {location: GLatLng, rankBy:google.maps.places.RankBy.DISTANCE, types:["restaurant", "cafe", "food", "bar" ,"point_of_interest", "establishment"]};
    publicPlaceService.nearbySearch(requestPayload,
      function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
           if (results.length) {
            nearbyLocationMarkers = [];
            for (var i = 0; i < results.length; i++) {
              var placeName = results[i].name;
              var placeObj = results[i];
              var placeLat = results[i].geometry.location.G;
              var placeLng = results[i].geometry.location.K;
              var iconUrl = chooseRandomIcon(scope);
              var indexMarker = createMarker(map, placeLat, placeLng, placeObj, iconUrl);
              nearbyLocationMarkers.push(indexMarker);
            }
            scope.map.nearbyLocations.markers = JSON.parse(JSON.stringify(nearbyLocationMarkers));
           }
        }
      }
    );
  }

  return {
    latCoordToGoogleLatLng:latCoordToGoogleLatLng,
    initPlacesService:initPlacesService,
    getNearestLocationOneMarker: getNearestLocationOneMarker,
    getNearestLocationManyMarkers: getNearestLocationManyMarkers,
  }

}