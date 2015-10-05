angular.module('uguru.util.controllers')

.controller('CategoriesController', [

    //All imported packages go here
    '$scope',
    '$state',
    '$timeout',
    '$localstorage',
    '$ionicPlatform',
    '$cordovaKeyboard',
    '$ionicModal',
    '$ionicTabsDelegate',
    '$ionicSideMenuDelegate',
    '$ionicGesture',
    'uTracker',
    function($scope, $state, $timeout, $localstorage, $ionicPlatform,
        $cordovaKeyboard, $ionicModal, $ionicTabsDelegate,
        $ionicSideMenuDelegate, $ionicGesture, uTracker) {


        if (!img_base || !img_base.length) {
            categories_img_base = 'remote/';
        } else {
            categories_img_base = img_base + 'remote/';
        }

        $scope.active_category = {
            name: 'Select category',
            active: false
        };

        $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.categorySkillsModal = modal;
        });

        $scope.onSwipeDown = function() {
            alert('user swiped down')
        }
        $scope.onDragDown = function() {
            alert('user swiped down')
        }

        $scope.launchCategoryModal = function(category) {

            if ($scope.active_category !== category) {
                $scope.active_category = category;
                updateMainBackground(category.bg_url);
            }


            uTracker.track(tracker, 'Category Modal', {
                '$Category': category.name
            });
            $scope.active_category.active = true;
            $scope.categorySkillsModal.show();
        }

        var updateMainBackground = function(url) {
            var headerElem = document.getElementById('category-skills');
            cssString = "#category-skills:before {background: url(" + url + ") no-repeat center center/cover !important;}";

            style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = cssString;
            } else {
                style.appendChild(document.createTextNode(cssString));
            }

            headerElem.appendChild(style);

        }

        $scope.skillsModalDrag = function(e) {
            if (e.gesture.deltaY > 175) {
                $scope.categorySkillsModal.hide();
            }
        }

        var mapGuruCoursesToCategoriesObj = function(guru_courses) {
            guruCategoryCourses = [];
            for (var i = 0; i < guru_courses.length; i++) {
                var guru_course = guru_courses[i];
                guruCategoryCourses.push({
                    name: guru_course.short_name || guru_course.name, //old data
                    id: guru_course.id,
                    active: true
                });
            }
            return guruCategoryCourses;
        }

        $scope.updateCategoryCount = function(category, skill, index) {
            if (category.name === 'Academic Courses' && confirm('Are you sure? This will remove ' + skill.name + ' from your courses')) {
                guru_courses = $scope.user.guru_courses;
                category.skills.splice(index, index + 1);
                for (var i = 0; i < $scope.user.guru_courses.length; i++) {
                    var guru_course = guru_courses[i];
                    if (skill.id === guru_course.id) {
                        $scope.user.guru_courses.splice(i, i + 1);
                    }
                }
                skill.active = false;
                category.active_skills_count += skill.active ? 1 : -1;
                return;
            } else {
                category.active_skills_count += skill.active ? 1 : -1;
                $scope.user.categories[category.db_name][skill.name] = skill.active;
                $localstorage.setObject('user', $scope.user);
            }
        }




        $scope.static.categories = [{
            name: 'Academic Courses',
            db_name: 'academic',
            _class: 'cerise',
            active: true,
            active_skills_count: 0,
            skills: mapGuruCoursesToCategoriesObj($scope.user.guru_courses),
            bg_url: categories_img_base + './img/categories/bg/academic.jpg',
            icon_url: categories_img_base + './img/categories/icon/academic.svg'
        }, {
            name: 'Freelancing',
            db_name: 'freelancing',
            _class: 'orange',
            active: false,
            active_skills_count: 0,
            skills: ['Resume editing', 'Interview Preparation', 'Build a Website',
                'Design', 'Professional Writing/Copy Writing', 'Programming Questions',
                'Internship Mentorship'
            ],
            bg_url: categories_img_base + './img/categories/bg/consulting.jpg',
            icon_url: categories_img_base + './img/categories/icon/consulting-small.svg'
        }, {
            name: 'Baking',
            _class: 'gold',
            db_name: 'baking',
            active: false,
            active_skills_count: 0,
            skills: ['Brownies', 'Flan', 'Pie'],
            bg_url: categories_img_base + './img/categories/bg/baking.jpg',
            icon_url: categories_img_base + './img/categories/icon/baking-small.svg'
        }, {
            name: 'Photography',
            db_name: 'photography',
            _class: 'moola',
            active: false,
            active_skills_count: 0,
            skills: ['Professional', 'Outdoors', 'Headshot', 'Graduation', 'Fashion', '#Selfie'],
            bg_url: categories_img_base + './img/categories/bg/photography.jpg',
            icon_url: categories_img_base + './img/categories/icon/photography-small.svg'
        }, {
            name: 'Household',
            _class: 'shamrock',
            db_name: 'household',
            active: false,
            active_skills_count: 0,
            skills: ['Laundry', 'Build Furniture (Ikea)', 'I have a Vacuum', 'Dirty Dishes',
                'Ironing/Drycleaning'
            ],
            bg_url: categories_img_base + './img/categories/bg/household.jpg',
            icon_url: categories_img_base + './img/categories/icon/household-small.svg'
        }, {
            name: 'Technology & IT',
            db_name: 'tech',
            _class: 'azure',
            active: false,
            active_skills_count: 0,
            skills: ['Laptop Repair', 'Hardware Upgrade', 'iPhone Screen Repair',
                'Sell iPhone Charges (we wholesale)', 'Software Performance'
            ],
            bg_url: categories_img_base + './img/categories/bg/tech.jpg',
            icon_url: categories_img_base + './img/categories/icon/technology-small.svg'
        }, {
            name: 'Sports & Muscle',
            db_name: 'sports',
            _class: 'lake',
            active: false,
            active_skills_count: 0,
            skills: ['Athletic Training', 'Specialized Dance', 'Help student move in/out',
                'Sell iPhone Charges (we wholesale)', 'Software Performance'
            ],
            bg_url: categories_img_base + './img/categories/bg/sports.jpg',
            icon_url: categories_img_base + './img/categories/icon/sports-small.svg'
        }, {
            name: 'On-demand Delivery',
            db_name: 'delivery',
            _class: 'eggplant',
            active: false,
            active_skills_count: 0,
            skills: ['Walgreens', 'Local Convenience Stores',
                'Exam books', 'Textbooks', 'Late night coffee',
                'School supplies'
            ],
            bg_url: categories_img_base + './img/categories/bg/delivery.jpg',
            icon_url: categories_img_base + './img/categories/icon/delivery-small.svg'
        }];

        //temporary --> will send objects from server eventually
        var convertSkillsToClientObj = function(categories) {
            var allButFirstCategories = categories.slice(1, categories.length);
            for (var i = 0; i < allButFirstCategories.length; i++) {
                category = allButFirstCategories[i];
                skillsObjArr = [];
                for (var j = 0; j < category.skills.length; j++) {
                    var skill = category.skills[j];
                    skillsObjArr.push({
                        name: skill,
                        active: false
                    })
                }
                category.skills = skillsObjArr;
            }
        }

        //temporary --> will send objects from server eventually

        convertSkillsToClientObj($scope.static.categories);

    }


])