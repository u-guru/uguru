angular.module('uguru.shared.services')
.factory('CategoryService', ['Restangular', function(Restangular) {
    var Category;
    var categories;
    CategoryService = {
        categories:[],
        get: function() {
            return Restangular
                .one('categories').get();
        },
        getAcademic: function() {
            if (Category.categories && Category.categories.length) {
                copied_categories = Category.categories.slice();
                for (var i = 0; i < copied_categories.length; i ++) {
                    var indexCategory = copied_categories[i]
                    if (indexCategory.hex_color === 'academic') {
                        return indexCategory;
                    }
                }
            }
        },
        getAcademicLocal: function() {
            return {"name": "Academic", "background_url":"./img/categories/bg/academic.jpg","description":"Share your wisdom by tutoring courses you've mastered","hex_color":"academic","icon_url":"./img/categories/icon/academic.svg","id":5,"is_active":true,"is_approved":true,"num_gurus":103,"num_subcategories":4,"subcategories":[{"avg_hourly":6,"avg_hourly_higher":8,"avg_hourly_lower":0,"description":"Share your wisdom by tutoring courses you've mastered","icon_url":"templates/svg/subcategories/academic/tutoring.svg","id":26,"is_active":true,"is_approved":true,"name":"In Person","num_gurus":45,"unit_name":"hour"},{"avg_hourly":6,"avg_hourly_higher":8,"avg_hourly_lower":0,"description":"Share your wisdom by tutoring courses you've mastered","icon_url":"templates/svg/subcategories/academic/video-outline.svg","id":27,"is_active":true,"is_approved":true,"name":"Remote (Video Chat)","num_gurus":99,"unit_name":"hour"},{"avg_hourly":6,"avg_hourly_higher":8,"avg_hourly_lower":0,"description":"Share your wisdom by tutoring courses you've mastered","icon_url":"templates/svg/subcategories/academic/answerquestions.svg","id":28,"is_active":true,"is_approved":true,"name":"Q&A","num_gurus":96,"unit_name":"hour"},{"avg_hourly":6,"avg_hourly_higher":8,"avg_hourly_lower":0,"description":"Share your wisdom by tutoring courses you've mastered","icon_url":"templates/svg/subcategories/academic/tutorpeers.svg","id":29,"is_active":true,"is_approved":true,"name":"Office Hours","num_gurus":38,"unit_name":"hour"}]};
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
                    if (!userSubcategory.category || !indexCategory) {
                        continue;
                    }
                    if (indexCategory.id === userSubcategory.category.id) {
                        indexCategory.active_subcategories += 1
                        for (var k = 0; k < indexCategory.subcategories.length; k++) {
                            var indexSubcategory = indexCategory.subcategories[k];

                            if (indexSubcategory.id === userSubcategory.id)
                                categories[j].subcategories[k].active = true;

                        }
                    }
                }
            }
        }
    };
    return CategoryService;
}]);