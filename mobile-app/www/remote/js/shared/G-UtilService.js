

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

  function getMapIconPath(keyVal, stroke_hex, fill_hex) {
    var mapIconDict = {
      "bus-stop": '<path d="M33.4454342,33.1111111 C31.5542205,33.1111111 30,34.3572253 30,35.8990022 L30,49.8795222 C30,51.4212991 31.5542205,52.6666667 33.4454342,52.6666667 L66.5794259,52.6666667 C68.4715604,52.6666667 70,51.4212991 70,49.8795222 L70,35.8990022 C70,34.3572253 68.4715604,33.1111111 66.5794259,33.1111111 L33.4454342,33.1111111 L33.4454342,33.1111111 L33.4454342,33.1111111 Z M27.1810466,18 L73.8200621,18 C76.1583881,18 78,19.7325373 78,21.8989747 L78,70.9909352 C78,73.1277652 76.2215861,74.8317162 73.9442406,74.8888889 L73.8211708,74.8888889 L73.6648389,74.8888889 L65.6464541,74.8888889 C65.5233843,74.8603025 65.3969883,74.8603025 65.271701,74.8888889 L35.6972544,74.8888889 L35.3546547,74.8888889 L27.3052252,74.8888889 C27.2120913,74.8603025 27.1488933,74.8603025 27.0557594,74.8603025 L27.0247148,74.8603025 C24.7784139,74.7735225 23,73.0981579 23,70.9909352 L23,21.8979537 C23.0011087,19.7325373 24.8416119,18 27.1810466,18 L27.1810466,18 L27.1810466,18 Z M35.0135856,60.6666667 C37.2523047,60.6666667 39,62.2224603 39,64.2099486 C39,66.1728895 37.2523047,67.7777778 35.0135856,67.7777778 C32.7738962,67.7777778 31,66.1728895 31,64.2099486 C31,62.2224603 32.7748666,60.6666667 35.0135856,60.6666667 L35.0135856,60.6666667 L35.0135856,60.6666667 Z M66.0009671,60.6666667 C68.2321083,60.6666667 70,62.2224603 70,64.2099486 C70,66.1728895 68.2321083,67.7777778 66.0009671,67.7777778 C63.7678917,67.7777778 62,66.1728895 62,64.2099486 C62,62.2224603 63.7678917,60.6666667 66.0009671,60.6666667 L66.0009671,60.6666667 L66.0009671,60.6666667 Z M29,74.8888889 L37,74.8888889 L37,80.7125876 C37,81.4484067 36.3213747,82 35.4536463,82 L30.5476949,82 C29.6799665,82 29.0013412,81.447323 29.0013412,80.7125876 L29.0013412,74.8888889 L29,74.8888889 L29,74.8888889 Z M64,74.8888889 L72,74.8888889 L72,80.7125876 C72,81.4484067 71.3213747,82 70.4536463,82 L65.5476949,82 C64.6799665,82 64.0013412,81.447323 64.0013412,80.7125876 L64.0013412,74.8888889 L64,74.8888889 L64,74.8888889 Z M38,25.1111111 C38,23.6383518 39.1889834,22.4444444 40.6754379,22.4444444 L60.3245621,22.4444444 C61.8021656,22.4444444 63,23.6413485 63,25.1111111 L63,25.1111111 C63,26.5838704 61.8110166,27.7777778 60.3245621,27.7777778 L40.6754379,27.7777778 C39.1978344,27.7777778 38,26.5808737 38,25.1111111 L38,25.1111111 Z" fill="{{FILL_HEX}}" stroke="{{STROKE_HEX}}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>',
      "cafe": "",
      "establishment": "",
      "grocery": "",
      "library": "",
      "lodging": "",
      "parking": "",
      "restaurant": "",
      "theater": "",
      "weight": ""
    }
    var templatedPathValue = mapIconDict[keyVal];
    if (stroke_hex) {
      templatedPathValue.replace("{{STROKE_HEX}}", stroke_hex);
    } else {
      templatedPathValue.replace("{{STROKE_HEX}}", "#000000");
    }

    if (fill_hex) {
      templatedPathValue.replace("{{STROKE_HEX}}", fill_hex);
    } else {
      templatedPathValue.replace("{{FILL_HEX}}", "none");
    }

    return templatedPathValue;
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