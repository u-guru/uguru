angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    'Utilities',
    'Settings',
    Geolocation]);

function Geolocation($localstorage, $timeout,
  Utilities, Settings) {

  var deviceGPS = {
    sortByLocation: sortByLocation,
    enableGPS: enableGPS
  };

  return deviceGPS;

  function enableGPS(device) {
    if (device==='ios') {
      iOSService.enableGPS();
    }
    else {
      Settings.location = true;
    }
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);

    function geoSuccess(position) {
        
    }
  }

  function sortByLocation(userLat, userLong, list) {
    for(var i=0; i<list.length; i++) {
      list[i].miles = Math.round(Utilities.getDistanceInMiles(
                                    userLat, userLong, 
                                    list[i].latitude, list[i].longitude));
    }
    function compareDistance(a, b) {
      if (a.miles < b.miles)
        return -1;
      if (a.miles > b.miles)
        return 1;
      return 0;
    }
    return list.sort(compareDistance);
  }



}