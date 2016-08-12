angular.module('uguru.root.services')
.factory('Geolocation', [
    '$timeout',
    'University',
    'Utilities',
    'Settings',
    'LoadingService',
    Geolocation]);

function Geolocation($timeout, University, Utilities, Settings, LoadingService) {

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

  function getLocation(scope, list, callback, is_ios) {
    var posOptions = {
      enableHighAccuracy: false, //may cause high errors if true
      maximumAge: 3600000 // Accepts a cached position as long as it was within 1 hour
    }

    if (!settings.isAllowed && is_ios) {
      LoadingService.showAmbig('Calculating distance...', 5000);
    }

    return navigator.geolocation.getCurrentPosition(geoSuccess, geoError, posOptions);

    function geoSuccess(position) {
      coordinates.lat = position.coords.latitude;
      coordinates.lon = position.coords.longitude;
      isLocated = true;

      if (list) {
        sortByLocation( position.coords.latitude,
                                  position.coords.longitude,
                                  list);
      }
      if (callback) {
        callback(list);
      }

      settings.isActive = true;
      settings.isAllowed = true;
      LoadingService.hide();

    }
    function geoError(error) {
        LoadingService.hide();
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
    list.sort(compareDistance);
    deviceGPS.settings.isActive = true;

    return list
  }

  function compareDistance(a, b) {
    if (a.rawMiles < b.rawMiles)
      return -1;
    if (a.rawMiles > b.rawMiles)
      return 1;
    return 0;
  }




}