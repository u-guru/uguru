var LOCAL = true; //local to the 8100 codebasebirbirs
var FIRST_PAGE='^.university';

var img_base;

// isAdmin = true;
// LOCAL_URL = 'http://192.168.42.78:5000/app/local/'
var BASE_URL = 'https://www.uguru.me/production/app/';
var REST_URL = 'https://www.uguru.me'


var BASE = '';
if (LOCAL) {

  BASE = 'remote/';
  BASE_URL = 'http://192.168.0.111:8100';
} else {
  img_base = '/static/'
}

mixpanel = window.mixpanel || null;

 //if (mixpanel) mixpanel.track("App Launch");

angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular',
  'ngAnimate', 'angular-velocity', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps',
  'mgcrea.ngStrap', 'ionic.device', 'sharedServices', 'uguru.directives'])


.run(function($ionicPlatform, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory,
  $cordovaDialogs, Version, $rootScope, $cordovaSplashscreen,
  $templateCache, Device, User, $cordovaLocalNotification,
  $cordovaGeolocation, $cordovaDevice, DeviceService) {

  var openKeyboard = null;

  DeviceService.readyDevice();


  // ga('create', 'UA-67802516-1', 'auto');
  // ga('send', 'event', 'App Start', 'action');
  // ga('send', 'pageview');



})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider, $ionicConfigProvider, $compileProvider, uiGmapGoogleMapApiProvider,
  $provide) {

  uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'places'
    });

  // $provide.decorator("$exceptionHandler", function($delegate, $injector) {
  //   return function(exception, cause) {
  //     $delegate(exception, cause);
  //   };
  // });

  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbVersion);
  }

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.maxCache(20);  //Default is 10
  $ionicConfigProvider.views.forwardCache(true);

  // $compileProvider.imgSrcSanitizationWhitelist('Captu  redImagesCache/');

  //Set up restangular provider
  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');
  // RestangularProvider.setBaseUrl('http://10.193.138.226:5000/api/v1');
  //Client-side router


//abstract
  // .state('admin', {
  //   url: '/admin',
  //   abstract: true,
  //   templateUrl: BASE + 'templates/admin/admin.html',
  //   controller: 'AdminCtrl'
  // })
  // .state('admin.admin-home', {
  //   url: '/admin/admin-home',
  //   templateUrl: BASE + 'templates/admin/admin.home.html',
  //   controller: 'AdminCtrl'
  // })




  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'templates/root.html',
        controller: 'RootController'
  }).

  // state('root.admin', {
  //   url: '/admin',
  //   templateUrl: BASE + 'templates/admin/admin.home.html',
  //   controller: 'AdminCtrl'
  // }).
  state('root.university', {
        url: '/university',
        templateUrl: BASE + 'templates/university.html',
        resolve: {
          loadCache: function($templateCache) {
            $templateCache.get(BASE + 'templates/university.html');
          }
        },
        controller: 'AddUniversityCtrl'
  }).
  state('root.university-container', {
        url: '/university-container',
        templateUrl: BASE + 'templates/university.container.html',
        controller: 'AddUniversityController'
  }).
  state('root.majors-container', {
        url: '/majors-container',
        templateUrl: BASE + 'templates/majors.container.html',
        controller: 'AddMajorController'
  }).
  state('root.guru-courses-container', {
        url: '/guru-courses-container',
        templateUrl: BASE + 'templates/guru.courses.container.html',
        controller: 'CoursesController'
  }).
  state('root.signup', {
        url: '/signup',
        templateUrl: BASE + 'templates/signup.html',
        controller: 'SignupController'
  }).
  // state('root.guru-remote', {
  //   url:'/guru-remote',
  //   templateUrl: BASE + 'templates/guru.remote.html',
  //   controller: 'GuruRemoteController'
  // }).
  state('root.guru-languages', {
    url:'/guru-languages',
    templateUrl: BASE + 'templates/guru.languages.container.html',
    controller: 'LanguagesController'
  }).
  state('root.guru-experiences', {
    url:'/guru-experiences',
    templateUrl: BASE + 'templates/guru.experiences.container.html',
    controller: 'ExperiencesController'
  }).
  state('root.payments', {
        url: '/payments:cardObj',
        templateUrl: BASE + 'templates/payments.html',
        controller: 'PaymentsController'
  }).
  state('root.home', {
        url: '/home',
        templateUrl: BASE + 'templates/home.html',
        controller: 'HomeController'
  }).
  // state('root.cashout', {
  //       url: '/cashout',
  //       templateUrl: BASE + 'templates/guru.cashout.html',
  //       controller: 'GuruCashoutController'
  // }).
  state('root.guru-questions', {
        url: '/guru-questions',
        templateUrl: BASE + 'templates/guru.questions.html',
        controller: 'GuruQuestionsController'
  }).
  state('root.become-guru', {
        url: '/become-guru',
        templateUrl: BASE + 'templates/become.guru.html',
        controller: 'BecomeGuruController'
  }).
  state('root.courses', {
        url: '/courses',
        templateUrl: BASE + 'templates/courses.html',
        controller: 'CoursesController'
  }).
  state('root.gpa', {
        url: '/gpa',
        templateUrl: BASE + 'templates/dev/gpa.html',
        controller: 'gpaController'
  }).
  state('root.student-session', {
        url: '/student-session:sessionObj',
        templateUrl: BASE + 'templates/student.session.html',
        controller: 'StudentSessionController'
  }).
  state('root.guru-session', {
        url: '/guru-session:sessionObj',
        templateUrl: BASE + 'templates/guru.session.html',
        controller: 'GuruSessionController'
  }).
  state('root.onboarding', {
        url: '/onboarding',
        templateUrl: BASE + 'templates/onboarding.html',
        controller: 'OnboardingController'
  }).
  state('root.browse', {
        url: '/browse',
        templateUrl: BASE + 'templates/browse.html',
        // controller: 'BrowseController'
  }).
  state('root.guru-ranking', {
        url: '/guru-ranking',
        templateUrl: BASE + 'templates/guru.ranking.html',
        controller: 'GuruRankingController'
  }).
  // state('root.guru-tasks', {
  //       url: '/guru-tasks',
  //       templateUrl: BASE + 'templates/guru.tasks.html',
  //       controller: 'GuruTaskController'
  // }).
  state('root.guru', {
        url: '/guru',
        templateUrl: BASE + 'templates/guru.html',
        controller: 'GuruController'
  }).
  state('root.guru-profile', {
        url: '/guru-profile',
        templateUrl: BASE + 'templates/guru.profile.html',
        controller: 'GuruProfileController'
  }).
  state('root.guru-credibility', {
        url: '/guru-credibility',
        templateUrl: BASE + 'templates/guru.credibility.html',
        controller: 'GuruProfileController'
  }).
  state('root.guru-courses', {
        url: '/guru-courses',
        templateUrl: BASE + 'templates/guru-courses.html',
        controller: 'CoursesController'
  }).
  state('root.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student-conversations', {
        url: '/student-conversations',
        templateUrl: BASE + 'templates/student.conversations.html'
  }).
  // state('root.bill-student', {
  //       url: '/bill-student',
  //       templateUrl: BASE + 'templates/guru.bill-student.html',
  //       controller: 'BillStudentController'
  // }).
  state('root.test-error', {
        url: '/test-error',
        templateUrl: BASE + 'templates/guru.bill-student.html',
        controller: function($scope) {
          throw "Test error";
        }
  }).
  state('root.access', {
        url: '/access',
        templateUrl: BASE + 'templates/access.html',
        controller: 'AccessController'
  }).
  state('root.guru-conversations', {
        url: '/guru-conversations',
        templateUrl: BASE + 'templates/guru.conversations.html'
  });



  $urlRouterProvider.otherwise('/university');


});

//background loading stuff

var processSkills = function($scope) {
  if (!$scope.static) {
    $scope.static = {skills: []}
  }

  if ($scope.static.skills && $scope.static.skills.length > 0) {

        $scope.static.professional_skills = [];
        $scope.static.specialized_skills = [];
        $scope.static.chores_skills = [];
        $scope.static.labor_skills = [];

        for (var i = 0; i < $scope.static.skills.length; i ++) {
          var skill = $scope.static.skills[i];
          if (skill.category === 'labor') {
            $scope.static.labor_skills.push(skill);
          }
          if (skill.category === 'specialized') {
            $scope.static.specialized_skills.push(skill);
          }
          if (skill.category === 'chores') {
            $scope.static.chores_skills.push(skill);
          }
          if (skill.category === 'professional') {
            $scope.static.professional_skills.push(skill);
          }
        }
    }
}

