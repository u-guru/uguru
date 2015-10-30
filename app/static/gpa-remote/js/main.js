
var LOCAL = _local || false; //local to the 8100 codebasebirbirs
_startpage = _startpage || 'intro';
var FIRST_PAGE='^.' + 'gpa-home';

// isAdmin = true;

var BASE_URL = 'https://www.uguru.me/production/app/';
var REST_URL = 'https://www.uguru.me';

var BASE = '';
var img_base = '';
if (LOCAL) {

  BASE = 'remote/';
  BASE_URL = _ipaddress;
  // REST_URL = "http://192.168.0.114:5000"

} else {
  img_base = '/static/';
}

var tracker = 'lo';
var stats = new Stats();


angular.module('uguru', ['ionic','ionic.utils', 'restangular', 'ngCordova',
  'ngAnimate', 'angular-velocity', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services',
  'mgcrea.ngStrap', 'ionic.device', 'sharedServices', 'uguru.directives'])


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

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $ionicConfigProvider, $compileProvider,
  $provide) {



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

  state('privacy', {
        url:'/privacy',
        templateUrl: BASE + 'templates/privacy-terms.modal.html'
  }).
  state('root.home', {
        url: '/home',
        templateUrl: BASE + 'templates/home.html',
        controller: 'HomeController'
  }).
  state('root.gpa-home', {
        url: '/gpa-home',
        templateUrl: BASE + 'templates/gpa.home.html',
        controller: 'GPAController'
  }).
  state('root.offline', {
        url: '/offline',
        templateUrl: BASE + 'templates/offline.html',
  }).
  state('root.courses', {
        url: '/courses',
        templateUrl: BASE + 'templates/courses.html',
        controller: 'CoursesController'
  });
  $urlRouterProvider.otherwise('/' + _startpage);


});
