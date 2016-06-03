var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";};

angular.module('uguru', ['ionic', 'restangular', 'ngAnimate',
  'uguru.shared.directives', 'uguru.shared.services','uguru.admin', 'uguru.preApp'])

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

  if ($ionicConfigProvider){$ionicConfigProvider.views.swipeBackEnabled(false);}

  $stateProvider
  .state('demo', {
    url:'/',
    templateUrl: 'demo.html'
  });


  $urlRouterProvider.otherwise('/');


});
