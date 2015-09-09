angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    '$cordovaGeolocation',
    'Popup',
    'University',
    'Utilities',
    'Settings',
    Geolocation]);

function Geolocation($localstorage, $timeout, $cordovaGeolocation, 
  Popup, University, Utilities, Settings) {

  var deviceGPS = {
    getNearestUniversity: getNearestUniversity,
    getLocation: getLocation,
    enableGPS: enableGPS
  };

  return deviceGPS;

  function enableGPS(device) {
    Settings.location = true;
    if (device==='ios') {
      iOSService.enableGPS();
    }
    else {
      getLocation();
    }
  }

  var getLocation = function() {
    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false, //may cause high errors if true
    }

    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
        console.log('user is at ' + position.coords.latitude + ',' + position.coords.longitude);
        getNearestUniversity(position.coords.latitude, position.coords.longitude);
        // if ($scope.user && $scope.user.current_device) {
        //   Settings.location = true;
        //   $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        // }
        // if ($scope.static.universities && $scope.static.universities.length > 0) {
        //   console.log('universities already loaded! Calculating nearest university...')
        //   if (!successCallback) {
        //     successCallback = callbackSuccessLocal;
        //   }
        //   getNearestUniversity(position.coords.latitude, position.coords.longitude);
        // } else {
        //   console.log('universities not loaded :( :( trying to get again..')
        //   //on_app_open_retrieve_objects($scope, $state, $localstorage, University, callbackSuccessLocal, $cordovaGeolocation);
        // }
        //TODO: user.last_positions.append(position + THE CURRENT TIME)
      }, function(err) {
        Utilities.readError("geolocation", err.code);
    });

  };

  function getNearestUniversity(lat,long) {

      var sort = function(array) {
        var len = array.length;
        if(len < 2) {
          return array;
        }
        var pivot = Math.ceil(len/2);
        var results = merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
        return results;
      };

      var merge = function(left, right) {
        var result = [];
        while((left.length > 0) && (right.length > 0)) {

              uni_1_lat = left[0].location.latitude;
              uni_1_long = left[0].location.longitude;
              uni_2_lat = right[0].location.latitude;
              uni_2_long = right[0].location.longitude;

              d1 = Utilities.getDistanceFromLatLonInKm(user_lat, user_long, uni_1_lat, uni_1_long);
              d2 = Utilities.getDistanceFromLatLonInKm(user_lat, user_long, uni_2_lat, uni_2_long);
              left[0].miles = parseInt(d1 / 0.62 * 10) / 10;
              right[0].miles = parseInt(d2 / 0.62 * 10) / 10;
              if ( d1 < d2 ) {
                  result.push(left.shift());
              }
              else {
                result.push(right.shift());
              }
        }

        result = result.concat(left, right);
        return result;
      };

      var largeList = sort(uni_list);

      // $scope.nearest_universities = largeList;
      $scope.static.nearest_universities = largeList;
      if (callback) {
        callback($scope, $state);
      }

      return largeList.slice(0,10);

  };

}