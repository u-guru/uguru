var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}

angular.module('uguru', ['ionic', 'uguru.preApp'])

.run(function($ionicPlatform, $localstorage,
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

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);





  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'templates/root.html',
        controller: function($scope, $state) {
          $scope.root = {};
          $scope.root.vars = {min:true};
        }
  })
  .state('root.splash', {
    url:'/',
    templateUrl: BASE + 'templates/splash.html',
    controller: 'SplashController'
  })




  $urlRouterProvider.otherwise('/');


})
.angular.module('uguru.preApp');