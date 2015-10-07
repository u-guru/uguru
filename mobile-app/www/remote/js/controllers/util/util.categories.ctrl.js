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
  'Category',
  'Utilities',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, $ionicGesture, uTracker,
    Category, Utilities) {

    if (!img_base || !img_base.length) {
      categories_img_base = 'remote/';
    } else {
      categories_img_base = img_base + 'remote/';
    }


    //$scope.categories = Utilities.sortArrObjByKey(Category.categories, 'name');
    
    $scope.active_category = {name:'Select category', active:false};

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

      if($scope.active_category!==category){
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
      if (style.styleSheet){
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

    // $scope.updateCategoryCount = function(category, subcategory, index) {

    //   category.active_subcategories += 1;
    //   Category.categories = $scope.categories;
    //   $localstorage.setObject('categories', $scope.categories);

    //   if (subcategory.active) {
    //     addGuruSubcategory(subcategory);
    //   }
    //   //set to false
    //   else {
    //     removeGuruSubcategory(subcategory);
    //   }
    // }

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
        category.active_skills_count += skill.active ? 1 : -1;
        return;
    } else {
      category.active_skills_count += skill.active ? 1 : -1;
      $scope.user.categories[category.db_name][skill.name] = skill.active;
      $localstorage.setObject('user', $scope.user);
    }
  }


    var addGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('add_guru_subcategory', $scope.user, subcategory, null, $scope);
    }


    var removeGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('remove_guru_subcategory', $scope.user, subcategory, null, $scope);
    }

  }


])