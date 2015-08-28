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
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router'
  ])
  .config(["$compileProvider", function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  }])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/search-pane");

    $stateProvider
    
   // .state("home", {
   //    url: "/",
   //    templateUrl: "templates/home/home.html",
   //    controller: "MainCtrl"
   //  })

    .state("search", {
      url: "/search-pane",
      templateUrl: "templates/home/search-pane.html",
      controller: "MainCtrl"
    })
   .state("earn", {
      url: "/earn-pane",
      templateUrl: "templates/home/earn-pane.html",
      controller: "MainCtrl"
    })
   .state("work", {
      url: "/work-pane",
      templateUrl: "templates/home/work-pane.html",
      controller: "MainCtrl"
    })
   .state("why", {
      url: "/why-pane",
      templateUrl: "templates/home/why-pane.html",
      controller: "MainCtrl"
    })


    .state("faq", {
      url: "/faq",
      templateUrl: "templates/faq.html",
      controller: "MainCtrl"
    })
    .state("team", {
      url: "/team",
      templateUrl: "templates/team.html",
      controller: "teamCtrl"
    })
    .state("manifest", {
      url: "/manifest",
      templateUrl: "templates/manifest.html",
      controller: "MainCtrl"
    });


  }]); 
