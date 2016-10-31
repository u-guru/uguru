angular.module('uguru.preApp', ['ionic'])
.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$rootScope',
  'CategoryService',
  'UniversityService',
  'ContentService',
  function($scope, $state, $timeout, $rootScope, CategoryService, UniversityService, ContentService) {
    // Listen for the event.
    var splash = this;
    splash.state = {};
    splash.nav = {};
    splash.activate = {};
    splash.categories = CategoryService.getLocalCategories();
    splash.category = splash.categories[0];
    splash.universities = UniversityService.getTargetted().splice(0, 10);
    splash.university = splash.universities[0];



    // $scope.$watchCollection(angular.bind(this, function () {
    //   return this; // `this` IS the `this` above!!
    // }), function (newVal, oldVal) {

    //   // now we will pickup changes to newVal and oldVal
    // });

    splash.activate = splashActivateFunction


    splash.state.madlib = true;


    $scope.$watch('splash.category.update', function(category, old_category) {
      console.log('received update');
      splash.category.tags_data = ContentService.splashCategoryOptions[splash.category.name].madlib;
      splash.category.options = {one: splash.category.tags_data.blank_one_options, two: splash.category.tags_data.blank_two_options};
    });

    $timeout(function() {
      activateSidebar();
      splash.state.nav = true;
    })


    function activateSidebar() {
      splash.nav.activateSidebar = navActivateSidebarFunc;
      splash.nav.categoriesDropdown = {selectedIndex: 0, key:'name', options: splash.categories, onOptionClick: updateSelectedCategory};
      splash.nav.universitiesDropdown = {selectedIndex: 0, key:'name', options: processUniversityNames(splash.universities), onOptionClick: updateSelectedUniversity};
    }


    function navActivateSidebarFunc() {
        var splashSidebarParent = document.querySelector('#splash-sidebar')
        splashSidebarParent.classList.add('on-sidebar-enter');
    }

    function updateSelectedCategory(option, index) {
      if (option.name !== splash.category.name) {
        splash.category.update = true;
        $timeout(function() {
          splash.category.update = false;
        })
      }
      splash.category = option;
    }

    function updateSelectedUniversity(option, index) {
      if (index === nav.universitiesDropdown.options.length - 1) {
        $scope.root.public.customStates.when.whenSearchUniversityClicked = true;

      } else {
        $scope.splash.university = option;
      }
    }

    function processUniversityNames(uni_arr) {
      for (var i = 0; i < uni_arr.length; i++) {
        if (uni_arr[i].short_name && uni_arr[i].short_name) {
          uni_arr[i].name = uni_arr[i].short_name;
        }
        else if (uni_arr[i].name.length > 20 && !uni_arr[i].short_name) {
          uni_arr[i].name = uni_arr[i].school_casual_name || uni_arr[i].name.substring(0, 17) + '...';
        }
      }
      uni_arr.push({name: 'Search your school', skip:true})
      return uni_arr
    }

    function splashActivateFunction() {

      // if ($scope.root.devMode) {
          splash.state.nav = true;
          splash.state.madlib = true;
          splash.state.sidebar = true;
          splash.state.device = true;
          splash.state.powerups = true;
          splash.state.universitySearch = true;
      //     // SpecService.initSpec('splash', $scope);
      //     return;
      // }

    //   portalElem && portalElem.addEventListener('splashMainLoadingComplete', function (e) {


    //     var loaderPortal = document.querySelector('.loader-portal');
    //     if (loaderPortal) {
    //       loaderPortal.style.display = 'none';
    //       loaderPortal.parentNode.removeChild(loaderPortal);
    //     }

    //     document.querySelector('#loader-wrapper .pageload-overlay svg.transition').style.visibility = "hidden";
    //     document.querySelector('#loader-wrapper').style.visibility = "hidden"
    //     $scope.showScaleOutLoader = true;

    //     globalLoader.hide();
    //     splash.renderView = true;
    //     // $timeout(function() {
    //       splash.state.madlib = true;
    //     // }, 2500)
    //     // $timeout(function() {
    //       splash.state.nav = true;
    //     // }, 1000)
    //     splash.state.sidebar = true;
    //     splash.state.device = true;
    //     splash.state.powerups = true;
    //     splash.state.universitySearch = true;
    //     $timeout(function() {

    //       $scope.$apply();
    //     }, 100)
    //   }, false);

    // }
    }



  }
]);
