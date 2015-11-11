angular.module('uguru.rest')
.factory('Category', ['Restangular', function(Restangular) {
    var Category;
    var categories;
    Category = {
        categories:[],
        get: function() {
            return Restangular
                .one('categories').get();
        },
        mapActiveToSubcategories: function(categories, user) {
            categories_sliced = categories.slice();
            for (var i = 0; i < categories_sliced.length; i ++) {
                var indexCategory = categories_sliced[i];
                indexCategory.active_subcategories = 0;
            }
            if (!user.guru_subcategories || !user.guru_subcategories.length) {
                return;
            }
            for (var i = 0; i < user.guru_subcategories.length; i ++) {
                for (var j = 0; j < categories_sliced.length; j ++) {

                    var userSubcategory = user.guru_subcategories[i];
                    indexCategory = categories_sliced[j];

                    if (indexCategory.id === userSubcategory.category.id) {
                        indexCategory.active_subcategories += 1
                        for (var k = 0; k < indexCategory.subcategories.length; k++) {
                            var indexSubcategory = indexCategory.subcategories[k];

                            if (indexSubcategory.id === userSubcategory.id) {
                                categories[j].subcategories[k].active = true;
                            } else {
                                categories[j].subcategories[k].active = false;
                            }
                        }
                    }


                }
            }
        }
    };
    return Category;
}]);