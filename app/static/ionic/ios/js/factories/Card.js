angular.module('ionic.card', [])
.factory('card', ['Restangular', function(Restangular) {
    var Card;
    Card = {
        post: function(stripe_token) {
            return Restangular
                .one('card').customPOST(JSON.stringify(stripe_token));
        },
    };
    return Card;
}]);