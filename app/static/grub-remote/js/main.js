

var LOCAL = _local || false;
_startpage = _startpage || 'intro';
var FIRST_PAGE='^.' +  _startpage;

// isAdmin = true;

var BASE_URL = 'https://www.uguru.me/apps/grub/';
var REST_URL = 'https://www.uguru.me';

var BASE = '';
var img_base = '';
if (LOCAL) {

  BASE = 'remote/';
  // REST_URL = "http://192.168.42.66:5000"

} else {
  img_base = '/static/';
}

var tracker = 'lo';
var stats = new Stats();


angular.module('uguru', ['ionic','ionic.utils', 'restangular', 'ngCordova','uguru.root.services',
  'ngAnimate', 'angular-velocity', 'uguru.util.controllers','uguru.rest', 'uguru.user',
  'ionic.device', 'sharedServices', 'uguru.directives', 'uguru.version', 'gpa.controllers', 'food.controllers',
  'food.services', 'uiGmapgoogle-maps'])


.run(function($ionicPlatform, $localstorage,
  $state, $ionicHistory,
   Version, $rootScope,
  $templateCache, Device, User,
  DeviceService, uTracker, $injector) {

  uTracker.init(tracker);
  Github = $injector.get("Github");
  Github.init();
  Github.setExceptionToGithubIssue(false);

})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider,
  $ionicConfigProvider, $compileProvider, $provide, uiGmapGoogleMapApiProvider) {


  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCncWJhPbKL4iwqGv5qwSvfx8RW42XClEQ',
    v: '3.20',
    libraries: 'weather,geometry,visualization'
  });


  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);

  $provide.decorator("$exceptionHandler", function($delegate, $injector) {

    return function(exception, cause) {

      Github = $injector.get("Github");

      Github.exceptionToGHIssue(exception, cause);

      $delegate(exception, cause);

    };

  })

  //ASK-NICK: what does this mean?
  $ionicConfigProvider.views.transition('platform');

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.maxCache(20);  //Default is 10
  $ionicConfigProvider.views.forwardCache(false);

  // $compileProvider.imgSrcSanitizationWhitelist('Captu  redImagesCache/');

  //Set up restangular provider
  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');
  // RestangularProvider.setBaseUrl('http://10.193.138.226:5000/api/v1');
  //Client-side router

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'templates/root.html',
        controller: 'RootController'
  }).
  state('root.intro', {
        url: '/intro',
        templateUrl: BASE + 'templates/university.html',
        controller: 'AddUniversityCtrl'
  }).

  // state('privacy', {
  //       url:'/privacy',
  //       templateUrl: BASE + 'templates/privacy-terms.modal.html'
  // }).
  state('root.grub-home', {
        url: '/home',
        templateUrl: BASE + 'templates/food/grub.home.html',
        controller: 'GrubHomeCtrl'
  }).
  state('root.offline', {
        url: '/offline',
        templateUrl: BASE + 'templates/offline.html',
  });


  $urlRouterProvider.otherwise('/' + _startpage);


});
