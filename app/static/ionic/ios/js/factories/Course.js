angular.module('ionic.course', [])
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