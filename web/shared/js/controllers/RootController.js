
angular.module('uguru.shared.controllers', [])
// angular.module('uguru.shared.controllers')
.controller('RootController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'RootService',
  'XHRService',
  '$compile',
  '$rootScope',
  '$window',
  function($scope, $state, $timeout, RootService, XHRService, $compile, $rootScope, $window) {
    var root = this;
    root.scope = $rootScope;
    root.scope.public = {customStates: {when: {}}};
    root.publicAttr = {};
    root.window = getBodyDimensions(_window);

    root.mainViews = [];
    root.customComponents = [];
    root.linkElemCache = {};
    console.log('initializing window')
    // _window = root.window;
    _window.browser = _browser;
    _window.tablet = _window.browser.size.tablet
    root.window.elemInfo = getElemWindowInfo(root.window);
    root.base_url = RootService.getBaseUrl();
    root.local = window.location.href.split(':8100').length > 1 || window.location.href.split(':8101').length > 1;;
    root.browserPrefix = RootService.getBrowserPrefix();
    root.docs = {items: RootService.getDocItems(), searchText:'', resultIds: [], resultItems:[]};
    root.devMode = window.location.href.split('/dev/').length > 1;
    root.milestones = [];
    root.animStatus = {off: false};
    root.inspectAnimations = [];
    root.inspectElements = [];
    root.broadcaster = {};
    root.easings = easings;
    root.public = {customStates: [], customShortcuts: {}};
    RootService.customShortcuts.getAnimProps = function () {return root.public.customShortcuts};
    root.pauseElement = pauseElement(root);
    RootService.setPauseElementFunc(root.pauseElement);
    RootService.viewPortSize = root.window;
    root.animationCounter = 0;
    root.transitionCounter = 0;
    root.inspector = {players:[], activePlayer: null, elements: [], preferences: {}};
    RootService._window = root.window;
    RootService.setGetInspector(getInspectorPrefs(root.inspector));
    RootService.setInspectableElements(pushElemPlayer(root.inspector));
    RootService.getCustomEasingAnimations(root)();

    var testURL = 'https://s3-us-west-1.amazonaws.com/ui-coach/users/' + '71ab4' + '/app.json'
    function putSuccessCallback(data) {
      console.log(data);
    }
    // XHRService.getJSONFile('GET', testURL, function(data) {
    //   data.testKey = 'yo this is a test key';
    //   XHRService.updateJSONFile(testURL, data, putSuccessCallback)

    //   // $rootScope.app = data; console.log('data received', $rootScope.app);

    // })



    // XHRService.updateJSONFile()

    $timeout(function() {
      RootService.animations = root.public;
      $scope.$apply();

      registerAnimationShortcuts();

    })

    function getElemWindowInfo(window) {

      return function(elem) {
        var eRect = elem.getBoundingClientRect();
        var result = {};
        result.bottom = window.height - eRect.top - eRect.height
        result.top = eRect.top * -1
        result.right =window.width - eRect.right;
        result.left = eRect.left * -1;
        result.rect = eRect;
        result.browser = bowser.bowser();

        return result;
      }
    }

    function registerAnimationShortcuts() {
      if (root.local) {
        var dataSets = ['api'];
        var callback = function(data) {root.data = {animations: {}}; root.data.animations = data;};
        XHRService.getJSONFile('get', 'admin/spec/animations.json', callback);
      }
    }


  }
]);

function pushElemPlayer(r_inspector) {
  return function(elem) {
    r_inspector.players.push(elem);
    r_inspector.activePlayer = elem;
    console.log('root inspector elems', r_inspector.players)
  }
}

function getInspectorPrefs(r_inspector) {
  return function() {
    return r_inspector.preferences;
  }
}



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


