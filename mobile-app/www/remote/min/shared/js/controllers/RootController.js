angular.module('uguru.shared.controllers', [])
// angular.module('uguru.shared.controllers')
.controller('RootController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'RootService',
  function($scope, $state, $timeout, RootService) {
    // Listen for the event.
    // if (window.location.href.split('/').length > 5 || window.location.href.split('admin').length > 1) {
    //   var loaderPortal = document.querySelector('.loader-portal');
    //   var loaderWrapper = document.querySelector('#loader-wrapper');
    //   loaderPortal.parentNode.removeChild(loaderPortal);
    //   loaderWrapper.parentNode.removeChild(loaderWrapper);
    //   console.log(loaderWrapper, 'removed');
    // }
    var root = this;
    root.window = getBodyDimensions();
    root.base_url = RootService.getBaseUrl();
    root.local = window.location.href.split(':8100').length > 1;
    root.browserPrefix = RootService.getBrowserPrefix();
  }
]);

function getBodyDimensions() {
    var desktopHeightLimit = 690;
    var desktopWidthLimit= 767;
    var bodyRect = document.body.getBoundingClientRect();
    var isDesktop = (bodyRect.height >= desktopHeightLimit && bodyRect.width >= desktopWidthLimit);
    return {height:bodyRect.height, width: bodyRect.width, desktop: isDesktop, mobile: !isDesktop}
};
