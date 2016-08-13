angular.module('uguru.preApp')
.controller('SplashSidebarController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var sidebar = this;

    sidebar.close = sidebarCloseFunc;
    sidebar.activate = true;

    SpecService.initSpec('sidebar', $scope);

    function sidebarCloseFunc() {
        var splashSidebarParent = document.querySelector('#splash-sidebar')
        var elemStatesAttr = splashSidebarParent.classList.add('on-sidebar-exit');
    }
  }
])


