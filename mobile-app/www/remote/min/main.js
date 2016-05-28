var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}

angular.module('uguru', ['ionic', 'restangular', 'ngAnimate', 'uguru.preApp',
  'uguru.shared.directives', 'uguru.shared.services',
  'uguru.shared.controllers', 'uguru.admin'])

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
        templateUrl: 'shared/templates/root.html'
  })
  .state('root.splash', {
    parent: 'root',
    name: 'root.splash',
    url:'/',
    templateUrl: 'preapp/templates/splash.html'
  })
  .state('root.splash-device', {
    parent: 'root',
    url:'/dev/splash/device',
    templateUrl: 'preapp/templates/splash.device.html'
  })
  .state('root.splash-madlib', {
    url:'/dev/splash/madlib',
    templateUrl: 'preapp/templates/splash.madlib.html',
    controller: function($scope) {
      $scope.splash = {state: {madlib:true}};
    },
    templateUrl: 'preapp/templates/splash.madlib.html',
  })
  .state('root.admin', {
    url:'/admin',
    controller: 'AdminController',
    templateUrl: 'admin/templates/index.html',
  })
  .state('root.jeselle', {
    url:'/jeselle',
    // controller: 'JeselleController',
    templateUrl: 'jeselle/templates/index.html',
  })
  .state('root.gabrie', {
    url:'/gabrie',
    // controller: 'GabrielleController',
    templateUrl: 'gabrielle/templates/index.html',
  })

  $urlRouterProvider.otherwise('/');


})
