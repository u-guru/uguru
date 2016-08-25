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
  $ionicConfigProvider, $compileProvider, $provide, $locationProvider, $httpProvider,$sceDelegateProvider) {
   // $locationProvider.html5Mode({enabled: true, base:''});
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
  .state('root.dev', {
    parent: 'root',
    url:'/dev',
    abstract:true,
    template: '<ui-view class="overflow-auto"/>',
    controller: function($state, $scope, $anchorScroll) {
      $scope.$on('$locationChangeSuccess', function(info, url_before, url_after) {
        console.log('location change', info, url_before, url_after);

      });
    }
  })
  .state('root.dev.scroll', {
    name: 'root.dev.scroll',
    parent: 'root.dev',
    url:'/scroll',
    templateUrl: 'admin/templates/scroll.html',
    controller: function($state, $location, $timeout) {
      console.log($state.current.name);
    }
  })
    .state('root.api', {
    name: 'root.api',
    parent: 'root',
    url:'/admin/api/property',
    templateUrl: 'admin/templates/api/property.html',
    controller: ['$scope', '$timeout', 'TweenService', '$compile', 'PropertyService', function($scope, $timeout, TweenService, $compile, PropertyService) {
      $scope.refreshEasing = function(easing) {
        console.log(easing);
        var elemContainer = document.querySelector('#player-stage');
        $scope.property.examples[$scope.property.activeIndex].ease = easing;
        var temp = $scope.property.activeIndex;
        $scope.property.activeIndex = null;
        $timeout(function() {
          $scope.property.activeIndex = temp;
        })
      }
      function callback(responseDict) {
        $scope.property = {examples: responseDict.examples, activeIndex: responseDict.exampleIndex, easings: TweenService.getAllEasing()};
        $scope.templates = {components: responseDict};
      }
      PropertyService.getPropJson({}, callback);
    }]
  })
  .state('root.dev.inspect', {
    name: 'root.dev.inspect',
    parent: 'root.dev',
    url:'/inspect',
    templateUrl:'admin/templates/inspector.html',
    controller: function($scope, $timeout) {
      $timeout(function() {
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', '/admin/spec/component.json', true );


        xhr.onload = function () {
            var responseDict = JSON.parse(xhr.responseText);
            $scope.templates = {components: responseDict}

        };
        xhr.send();
      })
    }
  }).
  state('root.dev.demos', {
    name: 'root.dev.demos',
    parent: 'root.dev',
    url:'/svg-todo',
    templateUrl: 'admin/templates/demos/svg.todo.html'
  })
  .state('root.preapp', {
    name: 'root.preapp',
    parent: 'root',
    url:'/preapp',
    abstract:true,
    template: '<ui-view class="overflow-auto"/>',
    controller: 'SplashController'
  })

  .state('root.preapp.madlib', {
    name: 'root.preapp.madlib',
    parent: 'root.preapp',
    url:'/madlib',
    templateUrl: 'preapp/templates/splash.html',
    controller: 'SplashMadlibController'
  })
  .state('root.dev.components', {
    name: 'root.dev.components',
    parent: 'root.dev',
    url:'/components',
    abstract: true,
    template: '<ui-view class="flex-wrap-center ugrid-2 full-xy"><div class="flex-vertical-center full-y bg-shamrock"></div><div class="flex-vertical-center full-y bg-azure"></div></ui-view>',
    controller: function($state, $location, $timeout) {
      console.log($state.current.name);
    }
  })
  .state('root.dev.components.base', {
    name: 'root.dev.components.base',
    parent: 'root.dev.components',
    url:'/base',
    template: '<ui-view class="flex-wrap-center ugrid-2 full-xy"><div class="flex-vertical-center full-y bg-shamrock">Base Components</div><div class="flex-vertical-center full-y bg-azure"></div></ui-view>',
    controller: function($state, $location, $timeout) {
      console.log($state.current.name);
    }
  })
  .state('root.dev.components.base.component', {
    name: 'root.dev.components.base.component',
    parent: 'root.dev.components.base',
    url:'/:cName',
    templateUrl: 'admin/templates/components/index.html',
    controller: function($scope, $stateParams) {
       var componentName = $stateParams.cName
       $scope.component = {name: componentName, templateUrl: 'shared/templates/components/base/grid/' + $stateParams.cName.replace('-', '.') + '.html'}
    }
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
    // controller: 'AdminController',
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
  .state('root.animations', {
    url:'/dev/animations',
    templateUrl: 'admin/templates/animation.html'
  })
  .state('root.animations-demo', {
    url:'/dev/animations/demo-1',
    templateUrl: 'admin/templates/animation-tudor-demo.html'
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
  .state('root.components', {
    url:'/dev/components',
    templateUrl: 'admin/templates/components/index.tpl'
  })
  .state('root.single-components', {
    url: '/dev/components/:section/:name',
    templateProvider: function($stateParams) {
      return '<div ng-include="' + "'shared/templates/components/" + $stateParams.section + "/" + $stateParams.name + ".tpl'" + '"/> </div>'
    }
  })
  .state('root.single-components-version', {
    url: '/dev/components/:section/:name/:version',
    templateProvider: function($stateParams) {
      var section = $stateParams.section || '';
      var name = $stateParams.name || '';
      var version = $stateParams.version || '';
      if (!version.length || !name.length || !section.length) {
        $state.go('^.single-components', {section:section, name: name})
      }

      var fileName = $stateParams.name + '.' + $stateParams.version
      return '<div ng-if="' + version + '" ng-include="' + "'shared/templates/components/" + $stateParams.section + "/" + fileName + ".tpl'" + '"> </div> <component-status-bar' + " section='" + $stateParams.section + "' name='" + $stateParams.name  + "' version='" + $stateParams.version + "'/></component-status-bar>"
    }
  })
  .state('root.single-components-timeline', {
    url: '/dev/components/t/:section/:name',
    templateProvider: function($stateParams) {
      return '<timeline-inspector root="root" play="true" expand="all" template="shared/templates/components/' + $stateParams.section + "/" + $stateParams.name + ".tpl" + '"/> </timeline-inspector>'
    }
  })
  .state('root.base-components', {
    url:'/dev/base/components/:baseCompName?versionNumber',
    templateProvider: function(AdminDirectiveService, $stateParams) {
      var completedBaseComponents = Object.keys(AdminDirectiveService.getBaseComponents());
      var completedCustomComponents = Object.keys(AdminDirectiveService.getCustomComponents())
      var urlComponentParam = $stateParams.baseCompName;
      console.log($stateParams)

      if (completedBaseComponents.indexOf(urlComponentParam.toLowerCase()) > -1 || completedCustomComponents.indexOf(urlComponentParam.toLowerCase()) > -1) {
        return AdminDirectiveService.getBaseComponentHtml(urlComponentParam);
      }
      return '<div> <span class="weight-700">' +  urlComponentParam + '</span> is not a base component </div> <div> <span class="weight-700">' +  completedBaseComponents.join(', ') + '<br>' + completedCustomComponents.join(', ') + '</span> </div>'
    }
  })
  .state('root.base-components-version', {
    url:'/dev/base/components/:baseCompName/:compTypeName/:versionNumber',
    templateProvider: function(AdminDirectiveService, $stateParams, $state) {
      var completedBaseComponents = Object.keys(AdminDirectiveService.getBaseComponents());
      var completedCustomComponents = Object.keys(AdminDirectiveService.getCustomComponents())
      var urlComponentParam = $stateParams.baseCompName || '';
      var versionNumber = $stateParams.versionNumber || '';
      console.log(versionNumber, urlComponentParam)
      if (!urlComponentParam.length || !versionNumber.length) {
        console.log('redirecting')
        $state.go('^.base-components', {baseCompName:$stateParams.baseCompName})
        return;
      }


      if (completedBaseComponents.indexOf(urlComponentParam.toLowerCase()) > -1 || completedCustomComponents.indexOf(urlComponentParam.toLowerCase()) > -1) {
        return AdminDirectiveService.getBaseComponentHtml(urlComponentParam);
      }
      return '<div> <span class="weight-700">' +  urlComponentParam + '</span> is not a base component </div> <div> <span class="weight-700">' +  completedBaseComponents.join(', ') + '<br>' + completedCustomComponents.join(', ') + '</span> </div>'
    }
  })


  $urlRouterProvider.otherwise('/');


});
