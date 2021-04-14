angular.module('uguru.preApp')
.controller('SplashSidebarController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
    var sidebar = this;

    sidebar.close = sidebarCloseFunc;
    sidebar.activate = true;


    function sidebarCloseFunc() {
        var splashSidebarParent = document.querySelector('#splash-sidebar')
        var elemStatesAttr = splashSidebarParent.classList.add('on-sidebar-exit');
    }
  }
])


