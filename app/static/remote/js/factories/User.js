angular.module('uguru.user', [])
.factory('User', ['$localstorage', 'Restangular', function($localstorage, Restangular) {
    var User;
    User = {
        create: function(user) {
            return Restangular
                .one('users')
                .customPOST(JSON.stringify(user));
        },
        update: function(user) {
            console.log('user saved remotely!');
           return Restangular
                .one('users')
                .customPUT(JSON.stringify(user));
        },
        updateLocal: function(user) {
           console.log('user saved locally!');
           $localstorage.setObject('user', user);
        },
        logout: function(user) {
           $localstorage.removeObject('user');
        }
    };
    return User;
}]);