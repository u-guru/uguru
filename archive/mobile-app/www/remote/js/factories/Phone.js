angular.module('ionic.phone', [])
.factory('Phone', ['Restangular', function(Restangular) {
    var Phone;
    Phone = {
        post: function(user) {
            return Restangular
                .one('phone').customPOST(JSON.stringify(user));
        },
    };
    return Phone;
}]);