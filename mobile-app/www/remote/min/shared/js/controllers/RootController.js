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
    root.milestones = [];
    root.animStatus = {off: false};
    root.inspectAnimations = [];
    root.public = {customStates: []};
    root.pauseElement = pauseElement(root);
    RootService.setPauseElementFunc(root.pauseElement);
  }
]);

function pauseElement(scope) {
  return function(element, attr) {
    var animStartEvent = 'animation';
    var cssPrefix = ''

    if (scope.browserPrefix) {
      cssPrefix = '-' + scope.browserPrefix + '-';
      animStartEvent = 'webkitAnimation';
    }
    // console.log(animStartEvent + 'PlayState:paused' + '!important;');
    if (element[0].style) element[0].style.cssText += ';' + cssPrefix + 'animation-play-state:paused' + '!important;';
    if (element[0].style) element[0].style.cssText += ';' + cssPrefix + 'transition-duration:50ms' + '!important;';
    if (element[0].style) element[0].style.opacity = 0.2;
    // e.target.style.cssText += e.target.style[animStartEvent + 'Duration'] + '!important;'
    // e.target.style[animStartEvent + 'Delay'] = '-' +

    if (!scope.bodyListener) {
      document.body.addEventListener(animStartEvent + 'Start', function(e) {
        // console.log(e.target.style[animStartEvent + 'Delay']);

        if (e.target.style && 'style' in e.target) e.target.style.cssText += ';-webkit-animation-play-state:paused' + '!important;'
        if (e.target.style) element[0].style.opacity = 0.2;
        // e.target.style[animStartEvent + 'PlayState'] = 'paused';
      })
      scope.bodyListener = true;
    }




  }
}

function getBodyDimensions() {
    var desktopHeightLimit = 690;
    var desktopWidthLimit= 767;
    var bodyRect = document.body.getBoundingClientRect();
    var isDesktop = (bodyRect.height >= desktopHeightLimit && bodyRect.width >= desktopWidthLimit);
    return {height:bodyRect.height, width: bodyRect.width, desktop: isDesktop, mobile: !isDesktop}
};
