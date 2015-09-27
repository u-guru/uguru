angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    'University',
    'Utilities',
    'Settings',
    Geolocation]);

function Geolocation($localstorage, $timeout, University,
  Utilities, Settings) {
  var scope;
  var deviceGPS = {
    sortByLocation: sortByLocation,
    enableGPS: enableGPS,
    getLocation: getLocation
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

  function getLocation(scope) {
    scope.loader.showAmbig();
    scope = scope;
    var posOptions = {
      timeout: 3000,
      enableHighAccuracy: false, //may cause high errors if true
    }
    return navigator.geolocation.getCurrentPosition(geoSuccess, geoError, posOptions);

    function geoSuccess(position) {
      console.log('location found!', position.coords.latitude, position.coords.longitude);

      var nearestResults = [];
      nearestResults = sortByLocation( position.coords.latitude,
                                position.coords.longitude,
                                University.getTargetted());
      if (scope) {
        scope.nearestResults = nearestResults;
        scope.user.last_position = position.coords;
        scope.isLocationActive = true;
        scope.isLocationGiven = true;
        scope.loader.hide();
      }
      return nearestResults;
      //$localstorage.setObject('nearest-universities', $scope.universities);
    }
    function geoError(error) {
        if (scope) {
          scope.isLocationActive = false;
          scope.isLocationGiven = false;
          scope.loader.hide();
        }
        alert('Sorry! Please check your privacy settings check your GPS signal.');
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