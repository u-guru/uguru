angular.module('uguru')
.factory('Support', ['Restangular', function(Restangular) {
    var Support;
    Support = {
        create: function(user) {
            return Restangular
                .one('support')
                .customPOST(JSON.stringify(user));
        }
    };
    return Support;
}]);