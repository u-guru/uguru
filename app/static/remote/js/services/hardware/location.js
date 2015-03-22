angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    '$cordovaGeolocation',
    'RootService',
    'Popup',
    function($localstorage, $timeout, $cordovaGeolocation, RootService, Popup) {

        var getLocation = function($scope, callback) {
          var posOptions = {
              timeout: 10000,
              enableHighAccuracy: false, //may cause high errors if true
          };
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              console.log('user is at ' + position.coords.latitude + ',' + position.coords.longitude);
              $scope.user.position = position;
              $scope.requestPosition = position;
              $scope.location_error = null;
              $scope.user.current_device.location_enabled = true;
              $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);
              // $scope.rootUser.updateLocal($scope.user);
              if (callback) {
                callback();
              }

              //TODO: user.last_positions.append(position + THE CURRENT TIME)
            }, function(err) {
              console.log(err);
              if (callback) {
                  callback();
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

        }

        deviceGPS = {
                      getUserPosition: function($scope, callback) {
                        console.log('location')
                        if ($scope.platform.ios &&
                          !$scope.user.current_device.location_enabled) {

                          Popup.options.show($scope, {
                            header: 'Mind if we grab your location',
                            body: 'We need it just cuz',
                            positiveBtnText: 'OK',
                            negativeBtnText: 'Nah',
                            delay: 500,
                            onFailure: function() {
                              $scope.user.current_device.location_enabled = false;
                              $scope.user.updateObj($scope.user, 'devices', $scope.user.current_device, $scope);
                            },
                            onSuccess: function() {getLocation($scope, callback)},
                          })

                        }

                        else if ($scope.user.current_device.location_enabled) {

                          getLocation($scope, callback);

                        }

                      }
                    };


        return deviceGPS;

}]);