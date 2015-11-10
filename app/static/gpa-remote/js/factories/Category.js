angular.module('uguru.rest')
.factory('Category', ['Restangular', function(Restangular) {
    var Category;
    Category = {
        categories:[],
        get: function() {
            return Restangular
                .one('categories').get();
        },
        mapActiveToSubcategories: function(categories, user) {
            for (var i = 0; i < categories.length; i ++) {
                var indexCategory = categories[i];
                indexCategory.active_subcategories = 0;
            }
            if (!user.guru_subcategories || !user.guru_subcategories.length) {
                return;
            }
            for (var i = 0; i < user.guru_subcategories.length; i ++) {
                for (var j = 0; j < categories.length; j ++) {

                    var userSubcategory = user.guru_subcategories[i];
                    var indexCategory = categories[j];

                    if (indexCategory.id === userSubcategory.category.id) {
                        indexCategory.active_subcategories += 1
                        for (var k = 0; k < indexCategory.subcategories.length; k++) {
                            var indexSubcategory = indexCategory.subcategories[k];
                            if (indexSubcategory.id === userSubcategory.id) {
                                indexSubcategory.active = true;
                            } else {
                                indexSubcategory.active = false;
                            }
                        }
                    }


                }
            }
        }
    };
    return Category;
}]);