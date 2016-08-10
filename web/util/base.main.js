var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";}var LOCAL = true; _startpage = 'calendar'; var FIRST_PAGE='^.' + _startpage; var img_base = ''; if (LOCAL) {BASE = 'remote/';REST_URL = "http://localhost:5000";};

angular.module('uguru', ['ionic', 'restangular', 'ngAnimate',
  'uguru.shared.directives', 'uguru.shared.services','uguru.admin', 'uguru.preApp', 'uguru.shared.controllers', 'uguru.admin'])

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
    'http://uguru-rest-test.herokuapp.com/static/**',
  ]);

  $httpProvider.useApplyAsync(true);

  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  if ($ionicConfigProvider){$ionicConfigProvider.views.swipeBackEnabled(false);}

  $stateProvider
  .state('demo', {
    url:'/',
    templateUrl: 'demo.html',
    controller: function($scope, RootService) {

      $scope.root = {devMode: true};
      $scope.root.window = getBodyDimensions();
      $scope.root.base_url = RootService.getBaseUrl();
      $scope.root.local = window.location.href.split(':8100').length > 1;
      $scope.root.browserPrefix = RootService.getBrowserPrefix();
      $scope.root.docs = {items: RootService.getDocItems(), searchText:'', resultIds: [], resultItems:[]};
      $scope.root.devMode = window.location.href.split('/dev/').length > 1;
      $scope.root.public = {customStates: []};

    function getBodyDimensions() {
        var desktopHeightLimit = 690;
        var desktopWidthLimit= 767;
        var bodyRect = document.body.getBoundingClientRect();
        var isDesktop = (bodyRect.height >= desktopHeightLimit && bodyRect.width >= desktopWidthLimit);
        return {height:bodyRect.height, width: bodyRect.width, desktop: isDesktop, mobile: !isDesktop}
    };

    }
  });


  $urlRouterProvider.otherwise('/');


});
