angular.module('uguru.root.services')
.service('Geolocation',
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

  var isLocationActive = false;
  var isLocationGiven = false;
  var coordinates = {
    lat: null,
    lon: null
  };

  var deviceGPS = {
    isLocationActive: isLocationActive,
    isLocationGiven: isLocationGiven,
    coordinates: coordinates,
    sortByLocation: sortByLocation,
    sortByDistance: sortByDistance,
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

  function getLocation(scope, list) {
    if (scope && list) {
      scope.loader.showAmbig();
      scope = scope;  
      // list = list;
    }
    
    var posOptions = {
      timeout: 3000,
      enableHighAccuracy: false, //may cause high errors if true
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
        scope.isLocationActive = true;
        scope.isLocationGiven = true;
        isLocationActive = true;
        isLocationGiven = true;
        scope.loader.hide();
      }
      return nearestResults;
      //$window.localStorage['nearest-universities'] = JSON.stringify(scope.universities);
    }
    function geoError(error) {
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            alert('Sorry! Please enable your GPS settings.');
            scope.isLocationGiven = false;
            scope.isLocationActive = false;
            isLocationGiven = false;
            isLocationActive = false;
            break;
          case 2: // POSITION_UNAVAILABLE
            alert('Sorry! Please check your GPS signal.');
            scope.isLocationGiven = false;
            break;
          case 3: // TIMEOUT
            alert('Sorry! Please check your GPS signal.');
            scope.isLocationGiven = false;
            break;
        }
    }
  }

  function sortByLocation(userLat, userLong, list) {
    var numberFormatter = new Intl.NumberFormat();
    for(var i=0; i<list.length; i++) {

      list[i].rawMiles = Utilities.getDistanceInMiles(
                                    userLat, userLong, 
                                    list[i].latitude, list[i].longitude);

      list[i].miles = numberFormatter.format(Math.round(list[i].rawMiles));

    }
    // ASK HURSHAL ABOUT THIS
    // for(var i=0; i<list.length; i++) {
    //   var item = list[i];
    //   item.rawMiles = Utilities.getDistanceInMiles(
    //                                 userLat, userLong, 
    //                                 item.latitude, item.longitude);

    //   item.miles = numberFormatter.format(Math.round(item.rawMiles));
    // }

    $rootScope.$apply(function() {
     list.sort(compareDistance); 
     return;
    });
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