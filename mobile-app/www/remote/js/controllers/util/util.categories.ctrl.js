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
      $scope.active_category = category;
      $scope.categorySkillsModal.show();
    }

    $scope.static.categories = [
      {
        name: 'Academic Courses',
        _class: '',
        active:true,
        skills: $scope.user.guru_courses
      },
      {
        name: 'Consulting & Freelancing',
        _class: '',
        active: false,
        skills: ['Resume editing', 'Interview Preparation','Build a Website',
        'Design', 'Professional Writing/Copy Writing', 'Programming Questions',
        'Internship Mentorship']
      },
      {
        name: 'Baking',
        _class: '',
        active: false,
        skills: ['Brownies', 'Flan','Pie'],
      },
      {
        name: 'Photography',
        _class: '',
        active: false,
        skills: ['Professional', 'Outdoors','Headshot', 'Graduation', 'Fashion', '#Selfie'],
      },
      {
        name: 'Household',
        _class: '',
        active: false,
        skills: ['Laundry', 'Build Furniture (Ikea)', 'I have a Vacuum', 'Dirty Dishes',
        'Ironing/Drycleaning']
      },
      {
        name: 'Technology & IT',
        _class: '',
        active: false,
        skills: ['Laptop Repair','Hardware Upgrade', 'iPhone Screen Repair',
        'Sell iPhone Charges (we wholesale)', 'Software Performance']
      },
      {
        name: 'Sports & Muscle',
        _class: '',
        active: false,
        skills: ['Athletic Training','Specialized Dance', 'Help student move in/out',
        'Sell iPhone Charges (we wholesale)', 'Software Performance']
      },
      {
        name: 'On-demand Delivery',
        _class: '',
        active: false,
        skills: ['Walgreens', 'Local Convenience Stores',
        'Exam books', 'Textbooks', 'Late night coffee',
        'School supplies']
      }
    ];
  }


])