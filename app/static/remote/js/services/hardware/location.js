angular.module('uguru.root.services')
.service('Geolocation',
    [
    '$localstorage',
    '$timeout',
    '$cordovaGeolocation',
    'RootService',
    function($localstorage, $timeout, $cordovaGeolocation, RootService) {

        deviceGPS = {
                    getUserPosition: function($scope, callback) {
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
                            }
                            if (err.code === 2) {
                              console.log('user position is unavailable');
                              $scope.location_error = 'unavailable';
                            }
                            if (err.code === 3) {
                              console.log('GPS timed out');
                              $scope.location_error = 'timeout';
                            }
                        });
                    }
                };

        return deviceGPS;

}]);