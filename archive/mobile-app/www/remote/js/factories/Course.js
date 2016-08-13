angular.module('uguru.rest')
.factory('Course', ['Restangular', function(Restangular) {
    var Course;
    Course = {
        get: function() {
            return Restangular
                .one('courses').get();
        },
    };
    return Course;
}]);