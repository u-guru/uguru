angular.module('uguru.preApp')
.controller('SplashNavController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var nav = this;

    nav.activateSidebar = navActivateSidebarFunc;

    nav.categoriesDropdown = {selectedIndex: 0, key:'name', options: $scope.splash.categories, onOptionClick: updateSelectedCategory};
    nav.universitiesDropdown = {selectedIndex: 0, key:'name', options: processUniversityNames($scope.splash.universities), onOptionClick: updateSelectedUniversity};
    SpecService.initSpec('nav', $scope);


    function navActivateSidebarFunc() {
        var splashSidebarParent = document.querySelector('#splash-sidebar')
        splashSidebarParent.classList.add('on-sidebar-enter');
    }

    function updateSelectedCategory(option, index) {
      $scope.splash.category = option;
    }

    function updateSelectedUniversity(option, index) {
      $scope.splash.university = option;
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
      return uni_arr
    }

  }
])


