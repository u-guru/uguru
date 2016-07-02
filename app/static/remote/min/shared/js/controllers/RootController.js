angular.module('uguru.shared.controllers', [])
// angular.module('uguru.shared.controllers')
.controller('RootController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'RootService',
  function($scope, $state, $timeout, RootService) {
    var root = this;
    root.window = getBodyDimensions();
    root.base_url = RootService.getBaseUrl();
    root.local = window.location.href.split(':8100').length > 1;
    root.browserPrefix = RootService.getBrowserPrefix();
    root.docs = {items: RootService.getDocItems(), searchText:'', resultIds: [], resultItems:[]};
    root.devMode = window.location.href.split('/dev/').length > 1;
  }
]);

function getBodyDimensions() {
    var desktopHeightLimit = 690;
    var desktopWidthLimit= 767;
    var bodyRect = document.body.getBoundingClientRect();
    var isDesktop = (bodyRect.height >= desktopHeightLimit && bodyRect.width >= desktopWidthLimit);
    return {height:bodyRect.height, width: bodyRect.width, desktop: isDesktop, mobile: !isDesktop}
};
