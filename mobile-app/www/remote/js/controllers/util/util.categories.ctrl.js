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

  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate) {

    $scope.active_category = {name:'Select category', active:false};

    $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.categorySkillsModal = modal;
    });

    $scope.launchCategoryModal = function(category) {
      $scope.active_category.active = true;
      $scope.active_category = category;
      $scope.categorySkillsModal.show();
    }

    $scope.updateCategoryCount = function(category, skill, index) {
      if (category.name === 'Academic Courses'
        && confirm('Are you sure? This will remove ' + skill.name + ' from your courses'))
      {
        guru_courses = $scope.user.guru_courses;
        category.skills.splice(index, index + 1);
        for (var i = 0; i < $scope.user.guru_courses.length; i ++) {
          var guru_course = guru_courses[i];
          if (skill.id === guru_course.id) {
            $scope.user.guru_courses.splice(i, i+1);
          }
        }
        skill.active = false;
        return;
      }
      category.active_skills_count += skill.val ? 1 : -1;
    }
    var mapGuruCoursesToCategoriesObj = function(guru_courses) {
      guru_courses = [];
      guruCategoryCourses = [];
      for (var i = 0; i < guru_courses.length; i++) {
        var guru_course = guru_courses[i];
        guruCategoryCourses.push({
          name: guru_course.short_name,
          id: guru_course.id,
          active: true
        });
      }
      return guruCategoryCourses;
    }
    $scope.static.categories = [
      {
        name: 'Academic Courses',
        _class: '',
        active:true,
        active_skills_count:0,
        skills: mapGuruCoursesToCategoriesObj($scope.user.guru_courses)
      },
      {
        name: 'Freelancing',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Resume editing', 'Interview Preparation','Build a Website',
        'Design', 'Professional Writing/Copy Writing', 'Programming Questions',
        'Internship Mentorship']
      },
      {
        name: 'Baking',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Brownies', 'Flan','Pie'],
      },
      {
        name: 'Photography',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Professional', 'Outdoors','Headshot', 'Graduation', 'Fashion', '#Selfie'],
      },
      {
        name: 'Household',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Laundry', 'Build Furniture (Ikea)', 'I have a Vacuum', 'Dirty Dishes',
        'Ironing/Drycleaning']
      },
      {
        name: 'Technology & IT',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Laptop Repair','Hardware Upgrade', 'iPhone Screen Repair',
        'Sell iPhone Charges (we wholesale)', 'Software Performance']
      },
      {
        name: 'Sports & Muscle',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Athletic Training','Specialized Dance', 'Help student move in/out',
        'Sell iPhone Charges (we wholesale)', 'Software Performance']
      },
      {
        name: 'On-demand Delivery',
        _class: '',
        active: false,
        active_skills_count:0,
        skills: ['Walgreens', 'Local Convenience Stores',
        'Exam books', 'Textbooks', 'Late night coffee',
        'School supplies']
      }
    ];

    //temporary --> will send objects from server eventually
    var convertSkillsToClientObj = function(categories) {
      var allButFirstCategories = categories.slice(1, categories.length);
      for (var i = 0; i < allButFirstCategories.length; i ++) {
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