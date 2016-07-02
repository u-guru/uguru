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

    nav.categoriesDropdown = {selectedIndex: 0, key:'name', options: $scope.splash.categories, onOptionClick: updateSelectedCategories};

    SpecService.initSpec('nav', $scope);

    function navActivateSidebarFunc() {
        var splashSidebarParent = document.querySelector('#splash-sidebar')
        splashSidebarParent.classList.add('on-sidebar-enter');
    }

    function updateSelectedCategories() {
      console.log('updating selected categories');
    }
  }
])


