var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}

angular.module('uguru', ['ionic', 'uguru.preApp'])

.run(function($ionicPlatform,
  $state, $ionicHistory, $rootScope,
  $templateCache, $injector) {

  $ionicPlatform.ready(function() {
  });
})

.config(function($stateProvider, $urlRouterProvider,
  $ionicConfigProvider, $compileProvider, $provide, $httpProvider,$sceDelegateProvider) {

   $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://uguru.me/static/**'
  ]);


  $httpProvider.useApplyAsync(true);

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);





  // RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'min/templates/root.html',
        controller: function($scope, $state) {
          $state.go('^.splash');
        }
  })
  .state('root.splash', {
    url:'/',
    templateUrl: BASE + 'min/templates/splash.html'
  })




  $urlRouterProvider.otherwise('/');


})