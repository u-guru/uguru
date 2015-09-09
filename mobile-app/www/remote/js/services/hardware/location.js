angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    '$cordovaGeolocation',
    'RootService',
    'Popup',
    'University',
    'Utilities',
    Geolocation]);

function Geolocation($localstorage, $timeout, $cordovaGeolocation, 
  RootService, Popup, University, Utilities) {


  var deviceGPS = {
    getUserPosition: getUserPosition,
    getNearestUniversity: getNearestUniversity
              };

  return deviceGPS;

  var failureCallbackLocal = function($scope, $state) {
    $scope.loader.hide();
    // $state.go('^.prompt-location');
  }

  var callbackSuccessLocal = function($scope, $state) {
    $scope.loader.hide();
    // $state.go('^.onboarding-nearest-university');
  }

  var getLocation = function($scope, successCallback, failureCallback, $state) {
    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false, //may cause high errors if true
    }
    if (!$scope.platform.android && !($state.current.name === 'root.onboarding-loading')) {
      $scope.loader.show();
    }
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        console.log('user is at ' + position.coords.latitude + ',' + position.coords.longitude);
        $scope.user.position = position;
        $scope.requestPosition = position;
        $scope.location_error = null;
        if ($scope.user && $scope.user.current_device) {
          $scope.user.current_device.location_enabled = true;
          $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        }
        // $scope.rootUser.updateLocal($scope.user);
        if ($scope.static.universities && $scope.static.universities.length > 0) {
          console.log('universities already loaded! Calculating nearest university...')
          if (!successCallback) {
            successCallback = callbackSuccessLocal;
          }
          getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.static.universities, 100, $localstorage, $scope, successCallback, $state);
        } else {
          console.log('universities not loaded :( :( trying to get again..')
          on_app_open_retrieve_objects($scope, $state, $localstorage, University, callbackSuccessLocal, $cordovaGeolocation);
        }

        // if (successCallback) {
        //   successCallback();
        // }

        //TODO: user.last_positions.append(position + THE CURRENT TIME)
      }, function(err) {
        $scope.loader.hide();
        console.log(err);
        if (failureCallback) {
            failureCallback($scope, $state);
        }
        if (err.code === 1) {
          console.log('user denied permission');
          $scope.location_error = 'denied';
          $scope.user.current_device.location_enabled = false;
          $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
        }
        if (err.code === 2) {
          console.log('user position is unavailable');
          $scope.user.current_device.location_enabled = false;
          $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
          $scope.location_error = 'unavailable';
        }
        if (err.code === 3) {
          console.log('GPS timed out');
          $scope.user.current_device.location_enabled = false;
          $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
          $scope.location_error = 'timeout';
        }
    });

  };

  function getUserPosition($scope, successCallback, failureCallback, $state) {
    if ($scope.platform.ios &&
      !$scope.user.current_device.location_enabled) {

      Popup.options.show($scope, {
        header: 'Mind if we use your location?',
        body: 'uGuru uses your location to match you up with students on campus.',
        positiveBtnText: 'SURE',
        negativeBtnText: 'NO THANKS',
        delay: 500,
        onFailure: function() {
          console.log('failed to get device location');
          $scope.user.current_device.location_enabled = false;
          if ($state.current.name !== 'root.onboarding-location') {
            $scope.user.updateObj($scope.user, 'devices', $scope.user.current_device, $scope);
          }
          failureCallback($scope, $state);
        },
        onSuccess: function() {
          console.log('succeeded in getting device location');
          getLocation($scope, successCallback, failureCallback, $state);
        },
      })

    }
    else if ($scope.user && $scope.user.current_device && $scope.user.current_device.location_enabled) {
      getLocation($scope, successCallback, failureCallback, $state);

    } else if ($scope.platform.android) {
      getLocation($scope, successCallback, failureCallback, $state);
    }
    //desktop version
    else if ($scope.platform.web && navigator.geolocation){
      console.log('user is on desktop');
      getLocation($scope, successCallback, failureCallback, $state);
    }
  }

  function getNearestUniversity(user_lat, user_long, uni_list, limit, local_storage, 
    $scope, callback, $state) {


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