angular.module('ionic.university', [])
.factory('University', ['Restangular', function(Restangular) {
    var University;
    University = {
        get: function() {
            return Restangular
                .one('universities').get();
        },
        getMajors: function(uni_id) {
            return Restangular
                .one('universities', uni_id).customGET('majors');
        },
        getCourses: function(uni_id) {
            return Restangular
                .one('universities', uni_id).customGET('courses');
        }
    };
    return University;
}]);