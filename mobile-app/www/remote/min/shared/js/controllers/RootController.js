angular.module('uguru.shared.controllers', [])
angular.module('uguru.shared.controllers')
.controller('RootController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
    // Listen for the event.
    if (window.location.href.split('/').length > 5) {
      document.querySelector('.loader-portal').style.display = 'none';
    }
    var root = this;
    root.window = getBodyDimensions();
    //root.base_url = img_base + BASE;
  }
]);

function getBodyDimensions() {
    var desktopHeightLimit = 690;
    var desktopWidthLimit= 767;
    var bodyRect = document.body.getBoundingClientRect();
    var isDesktop = (bodyRect.height >= desktopHeightLimit && bodyRect.width >= desktopWidthLimit);
    return {height:bodyRect.height, width: bodyRect.width, desktop: isDesktop, mobile: !isDesktop}
};
