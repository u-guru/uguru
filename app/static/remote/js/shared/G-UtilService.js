

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

  function getNearestLocation(map, lat, lng, scope) {
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
  return {
    latCoordToGoogleLatLng:latCoordToGoogleLatLng,
    initPlacesService:initPlacesService,
    getNearestLocation: getNearestLocation
  }

}