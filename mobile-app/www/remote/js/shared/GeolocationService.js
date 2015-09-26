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

  function getLocation() {
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false, //may cause high errors if true
    }
    return navigator.geolocation.getCurrentPosition(geoSuccess, geoError, posOptions);

    function geoSuccess(position) {
      console.log('location found!', position.coords.latitude, position.coords.longitude);
      var nearestResults = [];
      nearestResults = sortByLocation( position.coords.latitude,
                                position.coords.longitude,
                                University.getTargetted());

      return nearestResults;
      //$localstorage.setObject('nearest-universities', $scope.universities);
    } 
    function geoError(error) {

        switch(error.code) {
          case 1:
            alert('Sorry! Please enable your GPS settings.');
            break;
          case 2:
            alert('Sorry! Please check your GPS signal.');
            break;
          case 3:
            alert('Sorry! Please check your GPS signal.');
            break;
        }
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