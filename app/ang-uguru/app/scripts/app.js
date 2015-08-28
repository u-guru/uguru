'use strict';

/**
 * @ngdoc overview
 * @name angUguruApp
 * @description
 * # angUguruApp
 *
 * Main module of the application.
 */
angular
  .module('angUguruApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
    // 'ui.router'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/manifest',{
        templateUrl: 'templates/manifest.html',
        controller : 'teamCtrl'
      })
       .when('/team',{
        templateUrl: 'templates/team.html',
        controller : 'teamCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
