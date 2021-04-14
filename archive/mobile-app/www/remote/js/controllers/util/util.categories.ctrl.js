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
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, $ionicGesture, uTracker,
    Category, Utilities, LoadingService) {



    if (!img_base || !img_base.length) {
      $scope.categories_img_base = 'remote/';
    } else {
      $scope.categories_img_base = img_base + 'remote/';
    }

    $scope.showDesktopSubcategories = function (category, requestForm) {
      if (requestForm) {
        requestForm.category = category;
      }
      $scope.active_category = category;
      uTracker.track(tracker, 'Category Modal', {
        '$Category': category.name
      });
      $scope.active_category.active = true;
    }

    $scope.launchCategoryModal = function(category) {



      if($scope.active_category!==category){
      $scope.active_category = category;
      extension = $scope.guruSkillsModal && $scope.guruSkillsModal.isShown() && '-2';
        if (!$scope.desktopMode) {
          updateMainBackground($scope.categories_img_base + category.background_url, extension);
        }
      }

      uTracker.track(tracker, 'Category Modal', {
        '$Category': category.name
      });
      $scope.active_category.active = true;

      if (!$scope.desktopMode) {
        $scope.categorySkillsModal.show();
      }

    }

    $scope.hideCategorySkillsModal = function() {
      if ($scope.desktopMode) {
        $scope.active_category = {name:'Select category', active:false};
      } else {
        $scope.categorySkillsModal.hide();
        $timeout(function() {
          $scope.active_category = {name:'Select category', active:false};
        }, 500);
      }
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
   });
    // $scope.$on('modal.hidden', function() {
    //   if ($scope.activeSlideIndex === 2 ) {
    //     $scope.active_category = {name:'Select category', active:false};
    //   }
    // })

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


      Category.categories = $scope.categories;
      $localstorage.setObject('categories', $scope.categories);

      if (!category.active_subcategories && category.active_subcategories !== 0) {
        category.active_subcategories = 0;
      }

      if (subcategory.active) {
        category.active_subcategories += 1;
        addGuruSubcategory(subcategory);
      }
      //set to false
      else {
        category.active_subcategories -= 1;
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
      if ($scope.user.id) {
        $scope.user.updateAttr('add_guru_subcategory', $scope.user, subcategory, null, $scope);
     } else {
        if (!$scope.user.guru_subcategories) {
          $scope.user.guru_subcategories = [];
        }
        $scope.user.guru_subcategories.push(subcategory);
        // tempAddList.push(subcategory);
     }
    }


    var removeGuruSubcategory = function(subcategory) {
      if ($scope.user.id) {
        $scope.user.updateAttr('remove_guru_subcategory', $scope.user, subcategory, null, $scope);
      } else {
        var guru_subcategories = $scope.user.guru_subcategories.slice();
        for (var i = 0; i < guru_subcategories.length; i++) {
          if (guru_subcategories[i].id === subcategory.id) {
            $scope.user.guru_subcategories.splice(i, 1);
          }
        }

      }
    }

    if ($scope.desktopMode) {

        $timeout(function() {
          var saveButton = document.querySelector('#desktop-skills-save-button');
          if (!saveButton) {
            return;
          }
          saveButton.addEventListener('click', function() {

          LoadingService.showSuccess('Saved!', 1500);
          $timeout(function() {
            document.querySelector('#cta-modal-profile-skills').classList.remove('show');

          }, 500);

        });
      }, 1500);

    }

  }


])