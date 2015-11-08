angular.module('uguru.rest')
.factory('Food', ['Restangular', function(Restangular) {
    var Food;
    Food = {
        getFoodURL: function(uni_id) {
            return Restangular
                .one('universities', uni_id).customGET('food_url');
        },
        getAllFoodData: function(url) {
            // return fakedata
            return Restangular.one('/', url).get();
        },
        getFakeData: function() {
            return Restaurant.getAll();
        }
    };
    return Food;



}]);


// fakedata = {insert fake data params here}