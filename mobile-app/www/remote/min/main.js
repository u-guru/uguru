var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}

angular.module('uguru', ['ionic', 'restangular', 'ngAnimate', 'uguru.preApp',
  'uguru.shared.directives', 'uguru.shared.services',
  'uguru.shared.directives.components', 'uguru.shared.directives.base.components', 'uguru.shared.controllers', 'uguru.admin'])

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
    'http://codepen.io/**'
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
    // parent: 'root',
    name: 'root.splash',
    url:'/',
    templateUrl: 'preapp/templates/splash.html'
  })
  .state('root.dev-splash', {
    parent: 'root',
    url:'/dev/splash',
    templateUrl:'preapp/templates/splash.html'
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
  // -- start DEV states
  .state('root.dev-splash-loader', {
    url:'/dev/splash/loader',
    templateUrl: 'preapp/templates/loaders/main.html'
  })
  .state('root.dev-splash-nav', {
    url:'/dev/splash/nav',
    template: '<ion-view ng-controller="SplashController as splash"> <ion-content><div class="full-xy" ng-include="' + "'" + "preapp/templates/splash.nav.html" + "'" + '"></div></ion-content></ion-view>'
  })
  .state('root.dev-splash-nav-mobile', {
    url:'/dev/splash/nav/mobile',
    template: '<ion-view ng-controller="SplashController as splash"> <ion-content><div class="full-xy" ng-include="' + "'" + "preapp/templates/splash.nav.mobile.html" + "'" + '"></div></ion-content></ion-view>'
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
    template: '<ion-view ng-controller="SplashController as splash"> <ion-content><div class="full-xy" ng-include="' + "'" + "preapp/templates/splash.nav.html" + "'" + '"></div><div class="full-xy" ng-include="' + "'" + "preapp/templates/splash.powerups.html" + "'" + '"></div></ion-content></ion-view>'
  })
  //@gabrielle --
  .state('root.dev-splash-powerups-gpa', {
    url: '/dev/splash/powerups/gpa',
    template: '<div init-with="send:[gpa-triggered:public:delay-250]" ng-include src="root.base_url + ' + "'" + "preapp/templates/powerups/gpa.html'" + '"></div>'
  })
  .state('root.dev-splash-powerups-munchies', {
    url: '/dev/splash/powerups/munchies',
    template: '<div init-with="send:[munchies-triggered:public:delay-250]" ng-include src="root.base_url + ' + "'" + "preapp/templates/powerups/munchies.html'" + '"></div>'
  })
  .state('root.dev-splash-powerups-sound', {
    url: '/dev/splash/powerups/sound',
    template: '<div init-with="send:[sound-triggered:public:delay-250]" ng-include src="root.base_url + ' + "'" + "preapp/templates/powerups/sound.html'" + '"></div>'
  })
  .state('root.dev-splash-powerups-transit', {
    url: '/dev/splash/powerups/transit',
    template: '<div init-with="send:[transit-triggered:public:delay-250]" ng-include src="root.base_url + ' + "'" + "preapp/templates/powerups/transit.html'" + '"></div>'
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
  .state('root.playground', {
    url:'/dev/playground/:name',
    templateUrl: 'admin/templates/playground.html',
    controller: function($scope, $stateParams) {
      $scope.name = $stateParams.name
    }
  })
  .state('root.playground-swiper', {
    url:'/dev/playground/modules/swiper',
    controller: 'SwiperController',
    templateUrl: 'admin/templates/swiper.html'
  })
  .state('root.playground-switches', {
    url:'/dev/playground/modules/switches',
    controller: function($scope) {
      var exampleArr = [];
      for (var i = 0; i < 5; i++) {
        exampleArr.push({id: i + 1})
      }
      $scope.examples = exampleArr;
      $scope.activeExample = exampleArr[2];

      $scope.setActiveExample = function(index) {$scope.activeExample = $scope.examples[index]; }
    },
    templateUrl: 'admin/templates/playgrounds/switch.html',
  })
  .state('root.demos', {
    url:'/dev/demos',
    templateUrl: 'admin/templates/demos.html',
  })
  .state('root.guru-head', {
    url:'/dev/guru-head',
    templateUrl: 'shared/templates/components/guru-head/main.html',
  })
  .state('root.cal', {
    url:'/cal',
    templateUrl: 'shared/templates/calendar.html'
  })
  .state('root.loaders', {
    url:'/dev/splash/loaders',
    templateUrl: 'preapp/templates/loaders/main.html'
  })
  .state('root.loaders-tech', {
    url:'/dev/splash/loaders/tech',
    templateUrl: 'preapp/templates/loaders/tech.html'
  })
  .state('root.base-milestones', {
    url:'/dev/milestones',
    templateUrl: 'admin/templates/milestones.html'
  })
  .state('root.milestones', {
    url:'/dev/milestones/:initial/:filter',
    templateUrl: 'admin/templates/milestones.html'
  })
  .state('root.milestones-filter', {
    url:'/dev/milestones/:initial/:filter/:type',
    templateUrl: 'admin/templates/milestones.html'
  })
  .state('root.svg-test', {
    url:'/svg-test',
    templateUrl: 'shared/templates/svg-test.html'
  })
  .state('root.base-components', {
    url:'/dev/base/components/:baseCompName',
    templateProvider: function(AdminDirectiveService, $stateParams) {
      var completedBaseComponents = Object.keys(AdminDirectiveService.getBaseComponents());
      var completedCustomComponents = Object.keys(AdminDirectiveService.getCustomComponents())
      var urlComponentParam = $stateParams.baseCompName;


      if (completedBaseComponents.indexOf(urlComponentParam.toLowerCase()) > -1 || completedCustomComponents.indexOf(urlComponentParam.toLowerCase()) > -1) {
        return AdminDirectiveService.getBaseComponentHtml(urlComponentParam);
      }
      return '<div> <span class="weight-700">' +  urlComponentParam + '</span> is not a base component </div> <div> <span class="weight-700">' +  completedBaseComponents.join(', ') + '<br>' + completedCustomComponents.join(', ') + '</span> </div>'
    }
  })


  $urlRouterProvider.otherwise('/');


});
