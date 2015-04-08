angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    '$cordovaGeolocation',
    'RootService',
    'Popup',
    function($localstorage, $timeout, $cordovaGeolocation, RootService, Popup) {

        var getLocation = function($scope, successCallback, failureCallback, $state) {
          var posOptions = {
              timeout: 10000,
              enableHighAccuracy: false, //may cause high errors if true
          };
          $scope.loader.show();
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
              getNearestUniversity(position.coords.latitude, position.coords.longitude, $scope.universities, 100, $localstorage, $scope, successCallback, $state);


              // if (successCallback) {
              //   successCallback();
              // }

              //TODO: user.last_positions.append(position + THE CURRENT TIME)
            }, function(err) {
              console.log(err);
              if (failureCallback) {
                  failureCallback();
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
                      getUserPosition: function($scope, successCallback, failureCallback, $state) {

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

                        else if ($scope.user.current_device.location_enabled) {

                          getLocation($scope, successCallback, failureCallback, $state);

                        }

                      }
                    };


        return deviceGPS;

}]);