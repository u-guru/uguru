angular.module('uguru.rest')
.factory('Skill', ['Restangular', function(Restangular) {
    var Skill;
    Skill = {
        get: function() {
            return Restangular
                .one('skills').get();
        },
    };
    return Skill;
}]);