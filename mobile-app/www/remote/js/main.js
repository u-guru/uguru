
var LOCAL = _local || false; //local to the 8100 codebasebirbirs
_startpage = _startpage || 'university';
var FIRST_PAGE='^.' + _startpage;

var BASE_URL = 'https://uguru.me/production/app/';
var REST_URL = 'https://uguru.me';

var BASE = '';
var img_base = '';
if (LOCAL) {

  BASE = 'remote/';
  // BASE_URL = _ipaddress;
  REST_URL = "http://localhost:5000";

  // REST_URL = 'https://192.168.0.107:5000';

} else {
  img_base = '/static/';
}

var tracker = 'lo';
var stats = new Stats();


angular.module('uguru', ['ionic','ionic.utils', 'restangular', 'ngCordova',
  'ngAnimate', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.desktop.controllers', 'uguru.rest', 'uguru.user', 'uguru.root.services',
  'mgcrea.ngStrap', 'ionic.device', 'sharedServices', 'uguru.directives', 'monospaced.elastic',
  'angularMoment','ngOpenFB', 'fox.scrollReveal', 'uiGmapgoogle-maps'])


.run(function($ionicPlatform, $localstorage,
  $state, $ionicHistory,
   Version, $rootScope,
  $templateCache, Device, User,
  DeviceService, uTracker, $injector) {

  $ionicPlatform.ready(function() {
  });

  uTracker.init(tracker);
  Github = $injector.get("Github");
  Github.init();
  Github.setExceptionToGithubIssue(false);
})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $ionicConfigProvider, $compileProvider, $provide, $httpProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyD97om7R6sYXaUUgdNMdVjXWXviAFCF0u4',
        v: '3.20',
        libraries: 'places, weather,geometry,visualization'
    });


  $httpProvider.useApplyAsync(true);

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);

  $provide.decorator("$exceptionHandler", function($delegate, $injector) {

    return function(exception, cause) {

      Github = $injector.get("Github");

      Github.exceptionToGHIssue(exception, cause);

      $delegate(exception, cause);

    };

  });



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
        controller: 'AddUniversityCtrl'
  }).

  state('root.essay-guru-access', {
        url: '/essay-university',
        templateUrl: BASE + 'templates/university.html',
        controller: 'AddUniversityCtrl',
  }).
  state('root.essay-home', {
        url: '/essay-home',
        templateUrl: BASE + 'templates/essay.student.home.html',
        controller: "EssayStudentController"
  }).

  state('root.timeline', {
        url: '/timeline',
        templateUrl: BASE + 'templates/timeline.html',
        controller: 'TimelineController'
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
  state('root.content', {
    url:'/content',
    templateUrl: BASE + 'templates/content.general.html'
  }).
  state('root.desktop-login', {
    url:'/desktop-login',
    templateUrl: BASE + 'templates/desktop.login.html',
    controller: 'SignupController'
  }).
  state('root.pricing', {
    url:'/pricing',
    templateUrl: BASE + 'templates/pricing.html'
    // controller: 'PricingController'
  }).
  state('root.apply', {
    url:'/apply',
    templateUrl: BASE + 'templates/apply.html',
    controller: 'ApplyController'
  }).

  state('root.desktop-become-guru', {
    url:'/desktop-become-guru',
    templateUrl: BASE + 'templates/desktop.guru.onboarding.html',
    controller: 'DesktopBecomeGuruController'
  }).
  state('root.desktop-guru-profile', {
    url:'/desktop-guru-profile',
    templateUrl: BASE + 'templates/desktop.guru.profile.html',
    controller: 'GuruProfileController'
  }).
  state('root.desktop-settings', {
    url:'/desktop-settings',
    templateUrl: BASE + 'templates/desktop.settings.html',
    controller: "DesktopSettingsController"
  }).
  state('root.request', {
    url:'/request',
    templateUrl: BASE + 'templates/request.html',
    controller: "RequestController"
  }).
  state('root.request-student', {
    url:'/request-student',
    templateUrl: BASE + 'templates/request-student.html',
    controller: "RequestController"
  }).
  state('root.request-guru', {
    url:'/request-guru',
    templateUrl: BASE + 'templates/request-guru.html',
    controller: "RequestController"
  }).
  state('root.request-categories', {
    url:'/request-categories',
    templateUrl: BASE + 'templates/request-categories.html',
    controller: "RequestController"
  }).
  state('root.request-subcategories', {
    url:'/request-subcategories',
    templateUrl: BASE + 'templates/request-subcategories.html',
    controller: "RequestController"
  }).
  state('root.rating', {
    url:'/rating',
    templateUrl: BASE + 'templates/rating.html'
  }).
  state('root.request-calendar', {
    url:'/request-calendar',
    templateUrl: BASE + 'templates/request-calendar.html'
  }).
  state('root.request-price', {
    url:'/request-price',
    templateUrl: BASE + 'templates/request-price.html'
  }).
  state('root.billing', {
    url:'/billing',
    templateUrl: BASE + 'templates/billing.html'
  }).
  state('root.referrals', {
    url:'/referrals',
    templateUrl: BASE + 'templates/referrals.html'
  }).
  state('root.modal-test', {
    url:'/modal-test',
    templateUrl: BASE + 'templates/guru.balance.container.html'
  }).
  state('root.timer', {
    url:'/timer',
    templateUrl: BASE + 'templates/timer.html'
  }).
  state('root.student-home', {
    url:'/student-home',
    templateUrl: BASE + 'templates/home.desktop.student.html',
    controller: 'StudentHomeController'
  }).
  state('root.guru-home', {
    url:'/guru-home',
    templateUrl: BASE + 'templates/home.guru.html',
    controller: 'GuruController'
  }).
  state('root.profile-public', {
    url:'/profile-public',
    templateUrl: BASE + 'templates/profile.public.html',
    controller: 'PublicProfileController'
  }).
  state('root.profile-public-bakery', {
    url:'/profile-public-bakery',
    templateUrl: BASE + 'templates/profile.public.bakery.html',
    controller: 'PublicProfileController'
  }).
  state('root.profile-public-photo', {
    url:'/profile-public-photo',
    templateUrl: BASE + 'templates/profile.public.photo.html',
    controller: 'PublicProfileController'
  }).
  state('root.profile-modal', {
    url:'/profile-modal',
    templateUrl: BASE + 'templates/profile.modal.html'
  }).
  state('root.profile-modal-edit', {
    url:'/profile-modal-edit',
    templateUrl: BASE + 'templates/profile.modal.edit.html'
  }).
  state('root.profile-modal-cal', {
    url:'/profile-modal-cal',
    templateUrl: BASE + 'templates/profile.modal.cal.html'
  }).
  state('root.profile-modal-bakery', {
    url:'/profile-modal-bakery',
    templateUrl: BASE + 'templates/profile.modal.bakery.html'
  }).
  state('root.profile-modal-photo', {
    url:'/profile-modal-photo',
    templateUrl: BASE + 'templates/profile.modal.photo.html'
  }).
  state('root.profile-card', {
    url:'/profile-card',
    templateUrl: BASE + 'templates/profile.card.html'
  }).
  state('root.university-card', {
    url:'/university-card',
    templateUrl: BASE + 'templates/university.card.html',
    controller: 'AddUniversityCtrl'
  }).
  state('root.paper', {
    url:'/paper',
    templateUrl: BASE + 'templates/paper.html'
  }).
  state('root.color-picker', {
    url:'/color-picker',
    templateUrl: BASE + 'templates/color.picker.html'
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
  state('root.guru', {
        url: '/guru',
        templateUrl: BASE + 'templates/guru.html',
        controller: 'GuruController'
  }).
  state('root.profiles', {
        url: '/profiles/:profileId',
        templateUrl: BASE + 'templates/profile.public.html',
        controller: 'PublicProfileController'
  }).
  state('root.universities', {
        url: '/universities/:universityId',
        templateUrl: BASE + 'templates/one.university.html',
        controller: 'OneUniversityController'
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
  state('root.orientation', {
        url: '/orientation',
        templateUrl: BASE + 'templates/orientation.html',
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
  state('root.guru-messages-mobile', {
        url: '/messages/',
        templateUrl: BASE + 'templates/messaging.mobile.html',
        controller: 'GuruMessagesController'
  }).
  state('root.messaging', {
        url: '/messaging',
        templateUrl: BASE + 'templates/messaging.html'
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
