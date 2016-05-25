var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}

angular.module('uguru', ['ionic', 'restangular', 'uguru.preApp',
  'uguru.shared.directives', 'uguru.shared.services',
  'uguru.shared.controllers'])

.run(function($ionicPlatform,
  $state, $ionicHistory, $rootScope,
  $templateCache, $injector) {

  $ionicPlatform.ready(function() {
  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider,
  $ionicConfigProvider, $compileProvider, $provide, $httpProvider,$sceDelegateProvider) {

   $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://uguru.me/static/**'
  ]);


  $httpProvider.useApplyAsync(true);

  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);





  // RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'min/shared/templates/root.html'
  })
  .state('root.splash', {
    parent: 'root',
    name: 'root.splash',
    url:'/',
    templateUrl: BASE + 'min/preapp/templates/splash.html'
  })
  .state('root.splash-madlib', {
    url:'/splash/madlib',
    templateUrl: BASE + 'min/preapp/templates/splash.madlib.html'
  })





  $urlRouterProvider.otherwise('/');


})