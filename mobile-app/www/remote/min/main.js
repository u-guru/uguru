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
    'https://uguru.me/static/**',
    'https://docs.google.com/**',
    'http://bouncejs.com/**',
    'http://cubic-bezier.com/**',
  ]);

  $httpProvider.useApplyAsync(true);

  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  if ($ionicConfigProvider){$ionicConfigProvider.views.swipeBackEnabled(false);}





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
    template: '<ion-view> <ion-content><div class="full-xy" ng-include="' + "'" + "preapp/templates/splash.device.html" + "'" + '"></div></ion-content></ion-view>'
  })
  .state('root.splash-madlib', {
    url:'/dev/splash/madlib',
    templateUrl: 'preapp/templates/splash.madlib.html',
    controller: function($scope) {
      $scope.splash = {state: {madlib:true}};
    }
  })
  .state('root.admin', {
    url:'/admin',
    controller: 'AdminController',
    templateUrl: 'admin/templates/index.html',
  })
  .state('root.admin-docs', {
    url:'/admin/docs',
    controller: 'AdminDocsController as docs',
    templateUrl: 'admin/templates/docs/docs.html',
  })
  .state('root.bugs', {
    url:'/admin/bugs/:id',
    controller: 'AdminBugsController',
    templateUrl: 'admin/templates/bugs.html',
  })
  .state('root.profiles', {
    url:'/dev/admin/profiles/:categoryName',
    templateUrl: 'shared/templates/guru.profile.html',
    resolve: {categoryName: function($stateParams) {
      return $stateParams.categoryName;
    }}
  })
  .state('root.base-components', {
    url:'/dev/admin/components/base',
    templateUrl: 'admin/templates/components/base.tpl'
  })
  // -- start DEV states
  .state('root.dev-splash-loader', {
    url:'/dev/splash/loader',
    templateUrl: 'preapp/templates/loaders/main.html',
    controller: 'SplashLoaderController'
  })
  .state('root.dev-splash-nav', {
    url:'/dev/splash/nav',
    templateUrl: 'preapp/templates/splash.nav.html'
  })
  .state('root.dev-splash-map', {
    url:'/dev/splash/map',
    templateUrl: 'preapp/templates/splash.map.html'
  })
  .state('root.dev-splash-sidebar', {
    url:'/dev/splash/sidebar',
    templateUrl: 'preapp/templates/splash.sidebar.html'
  })
  .state('root.dev-splash-faq', {
    url:'/dev/splash/faq',
    templateUrl: 'preapp/templates/sidebar/faq.html'
  })
  .state('root.dev-splash-pricing', {
    url:'/dev/splash/pricing',
    templateUrl: 'preapp/templates/sidebar/pricing.html'
  })
  .state('root.dev-splash-team', {
    url:'/dev/splash/team',
    templateUrl: 'preapp/templates/sidebar/team.html'
  })
  .state('root.dev-splash-about', {
    url:'/dev/splash/about',
    templateUrl: 'preapp/templates/sidebar/about.html'
  })
  .state('root.dev-splash-powerups', {
    url:'/dev/splash/powerups',
    templateUrl: 'preapp/templates/splash.powerups.html'
  })
  .state('root.dev-splash-tour', {
    url:'/dev/splash/tour',
    templateUrl: 'preapp/templates/splash.tour.html'
  })
  .state('root.dev-projector', {
    url:'/dev/splash/projector',
    templateUrl: 'preapp/templates/started/getting-started.html'
  })
  .state('root.dev-splash-access', {
    url:'/dev/splash/access',
    templateUrl: 'preapp/templates/started/access.html'
  })
  .state('root.dev-splash-accounts', {
    url:'/dev/splash/account',
    templateUrl: 'preapp/templates/started/account.html'
  })
  .state('root.dev-splash-demographic', {
    url:'/dev/splash/demographic',
    templateUrl: 'preapp/templates/started/demographics.html'
  })
  .state('root.dev-splash-university-search', {
    url:'/dev/splash/university-search',
    templateUrl: 'preapp/templates/started/university-search.html'
  })
  .state('root.dev-splash-university-courses', {
    url:'/dev/splash/university-courses',
    templateUrl: 'preapp/templates/started/university-courses.html'
  })
  .state('root.dev-splash-hiw', {
    url:'/dev/splash/hiw',
    templateUrl: 'preapp/templates/splash.hiw.html'
  })
  // -- end dev states
  .state('root.jeselle', {
    url:'/dev/jeselle',
    templateUrl: 'jeselle/templates/index.html'
  })
  .state('root.gabrielle', {
    url:'/dev/gabrielle',
    templateUrl: 'gabrielle/templates/index.html',
  })
  .state('root.demos', {
    url:'/dev/demos',
    templateUrl: 'admin/templates/demos.html',
  })
  .state('root.loaders', {
    url:'/dev/splash/loaders',
    templateUrl: 'preapp/templates/loaders/main.html'
  });


  $urlRouterProvider.otherwise('/');


});
