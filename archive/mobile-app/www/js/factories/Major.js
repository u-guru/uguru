angular.module('ionic.major', [])
.factory('Major', ['Restangular', function(Restangular) {
    var Major;
    Major = {
        get: function() {
            return Restangular
                .one('majors').get();
        },
    };
    return Major;
}]);