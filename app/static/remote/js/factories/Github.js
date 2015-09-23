angular.module('uguru.rest')
.factory('Github', ['Restangular', function(Restangular) {
    var Github;
    Github = {
        post: function(gh_payload) {
            return Restangular
                .one('github')
                .customPOST(JSON.stringify(gh_payload));
        },
    };
    return Github;
}]);