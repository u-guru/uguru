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
      $scope.categories_img_base = 'remote/';
    } else {
      $scope.categories_img_base = img_base + 'remote/';
    }





    $scope.active_category = {name:'Select category', active:false};


    $scope.launchCategoryModal = function(category) {
      console.log('active_category', $scope.active_category);
      console.log('category', category);
      if($scope.active_category!==category){
        $scope.active_category = category;
        extension = $scope.guruSkillsModal && $scope.guruSkillsModal.isShown() && '-2';
        updateMainBackground($scope.categories_img_base + category.background_url, extension);
      }

      uTracker.track(tracker, 'Category Modal', {
        '$Category': category.name
      });
      console.log('post active_category');
      console.log('active_category', $scope.active_category);
      $scope.active_category.active = true;

      $scope.categorySkillsModal.show();

    }

    $scope.hideCategorySkillsModal = function() {
      $scope.categorySkillsModal.hide();
      $timeout(function() {
        $scope.active_category = {name:'Select category', active:false};
      }, 500);
    }

    var updateMainBackground = function(url, extension) {
      extension = extension || '';
      var headerElem = document.getElementById('category-skills' + extension);
      cssString = "#category-skills" + extension + ":before {background: url(" + url + ") no-repeat center center/cover !important;}";

      style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(document.createTextNode(cssString));
      }

      headerElem.appendChild(style);

    }

    $scope.$on('modal.hidden', function() {
      if ($scope.activeSlideIndex === 2 ) {
        $scope.active_category = {name:'Select category', active:false};
      }
    })

    $scope.$on('modal.hidden', function() {
      if ($scope.activeSlideIndex === 2 ) {
        $scope.active_category = {name:'Select category', active:false};
      }
    })

    $scope.skillsModalDrag = function(e) {
      if (e.gesture.deltaY > 175) {
        $scope.hideCategorySkillsModal();
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

    $scope.updateCategoryCount = function(category, subcategory, index) {

      category.active_subcategories += 1;
      Category.categories = $scope.categories;
      $localstorage.setObject('categories', $scope.categories);

      if (subcategory.active) {
        addGuruSubcategory(subcategory);
      }
      //set to false
      else {
        removeGuruSubcategory(subcategory);
      }
    }


    $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
          $scope.categorySkillsModal = modal;
    });


    var addGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('add_guru_subcategory', $scope.user, subcategory, null, $scope);
    }


    var removeGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('remove_guru_subcategory', $scope.user, subcategory, null, $scope);
    }



  }


])