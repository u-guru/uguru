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
        templateUrl: 'templates/search-pane.html',
        controller: 'MainCtrl'
      })
      .when('/earn-pane', {
        templateUrl: 'templates/earn-pane.html',
        controller: 'MainCtrl'
      })
      .when('/start-pane', {
        templateUrl: 'templates/start-pane.html',
        controller: 'MainCtrl'
      })
      .when('/why-pane', {
        templateUrl: 'templates/why-pane.html',
        controller: 'MainCtrl'
      })      
      .when('/work-pane', {
        templateUrl: 'templates/work-pane.html',
        controller: 'MainCtrl'
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
