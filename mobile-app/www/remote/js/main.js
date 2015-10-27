
var LOCAL = _local || false; //local to the 8100 codebasebirbirs
_startpage = _startpage || 'university';
var FIRST_PAGE='^.' + _startpage;

// isAdmin = true;

var BASE_URL = 'https://www.uguru.me/production/app/';
var REST_URL = 'https://www.uguru.me'

var BASE = '';
var img_base = '';
if (LOCAL) {

  BASE = 'remote/';
  BASE_URL = _ipaddress;
  // REST_URL = "http://192.168.0.114:5000"

  //REST_URL = 'http://192.168.12.159:5000';

} else {
  img_base = '/static/'
}

var tracker = 'lo';
var stats = new Stats();


angular.module('uguru', ['ionic','ionic.utils', 'restangular', 'ngCordova',
  'ngAnimate', 'angular-velocity', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services',
  'mgcrea.ngStrap', 'ionic.device', 'sharedServices', 'uguru.directives', 'cordovaHTTP'])


.run(function($ionicPlatform, $localstorage,
  $state, $ionicHistory,
   Version, $rootScope,
  $templateCache, Device, User,
  DeviceService, uTracker, $injector) {

  uTracker.init(tracker);
  Github = $injector.get("Github");
  Github.init();
  Github.setExceptionToGithubIssue(false);



})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $ionicConfigProvider, $compileProvider,
  $provide) {



  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);

  $provide.decorator("$exceptionHandler", function($delegate, $injector) {

    return function(exception, cause) {

      Github = $injector.get("Github");

      Github.exceptionToGHIssue(exception, cause);

      $delegate(exception, cause);

    };

  })

  //ASK-NICK: what does this mean?
  //NICK-SAYS: it means use native style animations whenever we rely on ionic animations. (ios styles for ios, android for android)
  $ionicConfigProvider.views.transition('platform');

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.maxCache(20);  //Default is 10
  $ionicConfigProvider.views.forwardCache(false);

  // $compileProvider.imgSrcSanitizationWhitelist('Captu  redImagesCache/');

  //Set up restangular provider
  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');
  // RestangularProvider.setBaseUrl('http://10.193.138.226:5000/api/v1');
  //Client-side router

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'templates/root.html',
        controller: 'RootController'
  }).


  state('root.inappmap', {
        url: '/inappmap',
        templateUrl: BASE + 'templates/inappmap.html',
        controller: 'InAppMapController'
  }).


  state('root.university', {
        url: '/university',
        templateUrl: BASE + 'templates/university.html',
        controller: 'AddUniversityCtrl',
        resolve: {
          deviceInfo: function(DeviceService) {
            return DeviceService.getPlatform();
          }
        },
        controller: 'AddUniversityCtrl'
  }).

  state('privacy', {
        url:'/privacy',
        templateUrl: BASE + 'templates/privacy-terms.modal.html'
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
  state('root.guru-remote', {
    url:'/guru-remote',
    templateUrl: BASE + 'templates/guru.remote.html',
    controller: 'GuruRemoteController'
  }).
  state('root.desktop-login', {
    url:'/desktop-login',
    templateUrl: BASE + 'templates/desktop.login.html'
  }).
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
  state('root.cards', {
        url: '/cards',
        templateUrl: BASE + 'templates/cards.html',
        controller: 'CardListController'
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
  state('root.bakery-guru-profile', {
        url: '/bakery-guru-profile',
        templateUrl: BASE + 'templates/bakery.guru.profile.html',
  }).
  state('root.photo-guru-profile', {
        url: '/photo-guru-profile',
        templateUrl: BASE + 'templates/photo.guru.profile.html',
  }).
  state('root.guru', {
        url: '/guru',
        templateUrl: BASE + 'templates/guru.html',
        controller: 'GuruController'
  }).
  state('root.cashout', {
        url: '/cashout',
        templateUrl: BASE + 'templates/guru.cashout.html',
        controller: 'GuruCashoutController'
  }).
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
  state('root.offline', {
        url: '/offline',
        templateUrl: BASE + 'templates/offline.html',
  }).

  state('root.become-guru.photography', {
        url:'/photography',
        templateUrl: BASE + 'templates/category.skills.modal.html'
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
  state('root.guru-tasks', {
        url: '/guru-tasks',
        templateUrl: BASE + 'templates/guru.tasks.html',
        controller: 'GuruTaskController'
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
  state('root.bill-student', {
        url: '/bill-student',
        templateUrl: BASE + 'templates/guru.bill-student.html',
        controller: 'BillStudentController'
  }).
  state('root.test-error', {
        url: '/test-error',
        templateUrl: BASE + 'templates/guru.bill-student.html',
        controller: function($scope) {
          throw "Test error";
        }
  }).
  // state('root.access', {
  //       url: '/access',
  //       templateUrl: BASE + 'templates/access.html',
  //       controller: 'AccessController'
  // }).
  state('root.guru-conversations', {
        url: '/guru-conversations',
        templateUrl: BASE + 'templates/guru.conversations.html'
  });



  $urlRouterProvider.otherwise('/' + _startpage);


});
