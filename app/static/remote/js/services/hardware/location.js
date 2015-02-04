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
                            // $scope.rootUser.updateLocal($scope.user);
                            if (callback) {
                              callback();
                            }

                            //TODO: user.last_positions.append(position + THE CURRENT TIME)
                          }, function(err) {
                            console.log(err);
                            if (err.PEMISSION_DENIED) {
                              console.log('user denied permission');
                            }
                            if (err.POSITION_UNAVAILABLE) {
                              console.log('user position is unavailable');
                            }
                            if (err.TIMEOUT) {
                              console.log('position is timed-out. try again?');
                            }
                        });
                    }
                };

        return deviceGPS; 
    
}]);