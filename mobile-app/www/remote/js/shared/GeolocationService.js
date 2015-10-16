angular.module('uguru.root.services')
.factory('Geolocation',
    [
    '$rootScope',
    '$timeout',
    'University',
    'Utilities',
    'Settings',
    Geolocation]);

function Geolocation($rootScope, $timeout, University,
  Utilities, Settings) {
  var scope;
  var isLocated = null;

  var settings = {
    isActive: false,
    isAllowed: null
  }
  var coordinates = {
    lat: null,
    lon: null
  };

  var deviceGPS = {
    settings: settings,
    coordinates: coordinates,
    sortByLocation: sortByLocation,
    sortByDistance: sortByDistance,
    enableGPS: enableGPS,
    getLocation: getLocation
  };

  return deviceGPS;

  function enableGPS(device) {
    if (DeviceService.doesCordovaExist() && isIOSDevice()) {
      iOSService.enableGPS();
    }
    else {
      Settings.location = true;
    }
  }

  function getLocation(scope, list) {
    if (scope && list) {
      scope.loader.showAmbig();
      scope = scope;
      // list = list;
    }

    // @nicknaky we should have this within the {{Platform}}Service.js (i.e. ios)
    var posOptions = {
      timeout: 7000,
      enableHighAccuracy: false, //may cause high errors if true
      maximumAge: 3600000 // Accepts a cached position as long as it was within 1 hour
    }
    return navigator.geolocation.getCurrentPosition(geoSuccess, geoError, posOptions);

    function geoSuccess(position) {
      coordinates.lat = position.coords.latitude;
      coordinates.lon = position.coords.longitude;
      console.log('location found!', position.coords.latitude, position.coords.longitude);
      isLocated = true;
      var nearestResults = [];
      if (list) {
        nearestResults = sortByLocation( position.coords.latitude,
                                  position.coords.longitude,
                                  list);
      }

      if (scope) {
        scope.nearestResults = nearestResults;
        scope.user.last_position = position.coords;
        scope.loader.hide();
      }

      settings.isActive = true;
      settings.isAllowed = true;

      //$window.localStorage['nearest-universities'] = JSON.stringify(scope.universities);
    }
    function geoError(error) {
        console.log("geolocationError: " + error);
        scope.loader.hide();
        switch(error.code) {
          case 1: // PERMISSION_DENIED

            alert('Sorry! Please enable GPS permissions from your settings.');
            settings.isActive = false;
            settings.isAllowed = false;
            break;
          case 2: // POSITION_UNAVAILABLE
            alert('Sorry! Please check your GPS signal.');
            settings.isActive = false;
            break;
          case 3: // TIMEOUT
            alert('Sorry! Please check your GPS signal.');
            settings.isActive = false;
            break;
        }
    }
  }

  function sortByLocation(userLat, userLong, list) {

    for(var i=0; i<list.length; i++) {

      list[i].rawMiles = Utilities.getDistanceInMiles(
                                    userLat, userLong,
                                    list[i].latitude, list[i].longitude);

      list[i].miles = Utilities.numberWithCommas(list[i].rawMiles);

    }

    return list.sort(compareDistance);
  }

  function compareDistance(a, b) {
    if (a.rawMiles < b.rawMiles)
      return -1;
    if (a.rawMiles > b.rawMiles)
      return 1;
    return 0;
  }

  function sortByDistance(list) {
    return list.sort(compareDistance);

  }



}