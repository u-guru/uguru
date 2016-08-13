angular.module('uguru')
.factory('User', ['Restangular', function(Restangular) {
    var User;
    User = {
        create: function(user) {
            return Restangular
                .one('users')
                .customPOST(JSON.stringify(user));
        },
        update: function(user) {
           return Restangular
                .one('users')
                .customPUT(JSON.stringify(user));
        }
    };
    return User;
}]);