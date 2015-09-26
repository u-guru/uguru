angular.module('ionic.device', [])
.factory('Device', ['Restangular', function(Restangular) {
    var Device;
    Device = {
        post: function(device) {
            return Restangular
                .one('devices')
                .customPOST(JSON.stringify(device));
        },
    };
    return Device;
}]);