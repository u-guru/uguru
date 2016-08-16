angular.module('uguru.rest')
.factory('Profession', ['Restangular', function(Restangular) {
    var Profession;
    Profession = {
        get: function() {
            return Restangular
                .one('professions').get();
        },
    };
    return Profession;
}]);