

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
        animation: google.maps.Animation.DROP,
        icon: iconUrl
      });
    return marker;
  }

  var getRelevantIcon = function(scope, g_types) {
    // https://developers.google.com/maps/documentation/javascript/reference?hl=en#Symbol
    //rotation, scale, stroke color, stroke opacity, stroke weight, path, label origin, fillOpacity, fillColor, anchor
    var formatIconSvgUrl = function(iconName,scope) {
      return scope.img_base + 'templates/svg/map/' + iconName + '.svg'
    }
    var supportedIcons = ["bus-stop", "cafe", "establishment", "grocery", "library", "lodging", "parking", "restaurant", "theater", "weight"];

    for (var i = 0; i < g_types.length; i++) {
      var gTypeIndex = g_types[i];
      var matchedIndex = supportedIcons.indexOf(gTypeIndex)
      if (matchedIndex > -1) {
        return formatIconSvgUrl(supportedIcons[matchedIndex], scope);
      }
    }

    var randItem = randomIcons[Math.floor(Math.random()*randomIcons.length)];
    return formatIconSvgUrl(iconName)
  }

  var nearbyLocationMarkers = [];
  function getNearestLocationManyMarkers(map, lat, lng, scope) {
    if (!publicPlaceService) {
      publicPlaceService = initPlacesService(map, lat, lng);
    }
    var GLatLng = latCoordToGoogleLatLng(lat, lng);
    var requestPayload = {location: GLatLng, rankBy:google.maps.places.RankBy.DISTANCE, types:["restaurant", "cafe", "food", "bar"]};
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
              var iconUrl = getRelevantIcon(scope, placeObj.types);
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