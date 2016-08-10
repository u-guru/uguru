var LOCAL = _local || false; //local to the 8100 codebasebirbirs
_startpage = _startpage || '';
var FIRST_PAGE='^.' + _startpage;

var BASE_URL = 'https://uguru.me/production/app/';
var REST_URL = 'https://uguru.me';

var BASE = '/static/remote/';
var img_base = '';
if (LOCAL) {

  BASE = 'remote/';
  REST_URL = "http://localhost:5000";

} else {
  img_base = '/static/';
}

if (window.location.href.indexOf('uguru-rest-test.herokuapp') > -1) {
  var REST_URL = 'https://uguru-rest-test.herokuapp.com';
} else if (window.location.href.indexOf('localhost:5000') > -1) {
  var REST_URL = 'https://uguru-rest-test.herokuapp.com';
}





var tracker = 'lo';
var stats = new Stats();


angular.module('uguru', ['ionic','ionic.utils', 'restangular', 'ngCordova',
  'ngAnimate',  'ngFx',  '720kb.fx', 'uguru.student.controllers','uguru.guru.controllers','uguru.version',
  'uguru.util.controllers', 'uguru.dev.controllers', 'uguru.desktop.controllers', 'uguru.rest', 'uguru.user', 'uguru.root.services',
  'mgcrea.ngStrap', 'ionic.device', 'sharedServices', 'uguru.directives', 'monospaced.elastic', 'uguru.components',
  'angularMoment','ngOpenFB', 'nemLogging', 'uiGmapgoogle-maps','uguru.apps.controllers','transit.services','base64','guru.food.services'])

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
  $ionicConfigProvider, $compileProvider, $provide, $httpProvider, uiGmapGoogleMapApiProvider,$sceDelegateProvider) {

  // uiGmapGoogleMapApiProvider.configure({
  //       key: 'AIzaSyDytQb8vjgkgYkAp7oVTjwIZkMtOE6xMZg',
  //       v: '3.21',
  //       libraries: 'places, weather,geometry,visualization'
  //   });

   $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://uguru.me/static/**'
  ]);


  $httpProvider.useApplyAsync(true);

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);




  $ionicConfigProvider.views.transition('platform');

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.maxCache(20);  //Default is 10
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.scrolling.jsScrolling(false);

  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');

  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: BASE + 'templates/root.html',
        controller: 'RootController'
  }).
  state('root.keys', {
        url: '/keys',
        templateUrl: BASE + 'templates/admin/keys.html',
        controller: 'KeyToolController'
  }).

  state('root.university', {
        url: '/university',
        templateUrl: BASE + 'templates/university.html',
        controller: 'AddUniversityCtrl'
  }).

  state('root.team', {
        url: '/team',
        templateUrl: BASE + 'templates/team.html'
  }).
  state('root.build', {
        url: '/build',
        templateUrl: BASE + 'templates/dev/tools.build.html',
        controller: 'DevToolsController'
  }).
  state('root.bugs', {
        url: '/bugs',
        templateUrl: BASE + 'templates/bugs.html'
  }).
  state('root.guru-validation', {
        url: '/guru-validation',
        templateUrl: BASE + 'templates/validation.guru.html'
  }).
  state('root.student-validation', {
        url: '/student-validation',
        templateUrl: BASE + 'templates/validation.student.html'
  }).
  state('root.my-requests', {
        url: '/my-requests',
        templateUrl: BASE + 'templates/student.requests.html'
  }).
  state('root.wallet', {
        url: '/wallet',
        templateUrl: BASE + 'templates/wallet.html'
  }).
  state('root.request-public', {
        url: '/request-public',
        templateUrl: BASE + 'templates/request.public.html'
  }).
  state('root.credit', {
        url: '/credit',
        templateUrl: BASE + 'templates/credit.html'
  }).
  state('root.splash-university', {
        url: '/splash/university',
        templateUrl: BASE + 'templates/splash/layout/university.search.html'
  }).
  state('root.splash-hiw', {
        url: '/splash/hiw',
        templateUrl: BASE + 'templates/splash/swiper/splash.hiw.container.html'
  }).
  state('root.splash-signup', {
        url: '/splash/signup',
        templateUrl: BASE + 'templates/splash/layout/splash.signup.html'
  }).
  state('root.splash-demographics', {
        url: '/splash/demographics',
        templateUrl: BASE + 'templates/splash/layout/splash.demographics.html'
  }).
  state('root.splash-courses', {
        url: '/splash/courses',
        templateUrl: BASE + 'templates/splash/layout/splash.student.courses.html'
  }).
  state('root.splash-access', {
        url: '/splash/access',
        templateUrl: BASE + 'templates/splash/layout/splash.access.html'
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
  state('root.admin', {
        url: '/admin',
        templateUrl: BASE + 'templates/admin/index.html',
        controller: 'AdminController'
  }).
  state('root.admin-universities', {
        url: '/admin-universities',
        templateUrl: BASE + 'templates/admin/admin.universities.html',
        controller: 'AdminUniversityController'
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

  state('root.content', {
    url:'/content',
    templateUrl: BASE + 'templates/content.general.html'
  }).
  state('root.desktop-login', {
    url:'/desktop-login',
    templateUrl: BASE + 'templates/desktop.login.html',
    controller: 'AccountPageController',
  }).
  state('root.mobile-login', {
    url:'/mobile-login',
    templateUrl: BASE + 'templates/signup.modal.html',
    controller: 'AccountPageController',
  }).
  state('root.student-helper', {
    url:'/student-helper',
    templateUrl: BASE + 'templates/student.helper.dashboard.html',
    controller: 'StudentHelperController',
  }).
  state('root.pricing', {
    url:'/pricing',
    templateUrl: BASE + 'templates/pricing.html',
    controller: 'PricingController'
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
  state('root.calendar', {
    url:'/calendar',
    templateUrl: BASE + 'templates/calendar.html'
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
    templateUrl: BASE + 'templates/timer.app.html',
    controller: 'TimerAppController'
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
  // state('root.cards', {
  //       url: '/cards',
  //       templateUrl: BASE + 'templates/cards.html',
  //       controller: 'CardListController'
  // }).
  state('root.payments', {
        url: '/payments:cardObj',
        templateUrl: BASE + 'templates/payments.html',
        controller: 'PaymentsController'
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
  state('root.map', {
        url: '/splash/maps',
        templateUrl: BASE + 'templates/splash/layout/splash.maps.html',
        controller: 'GMapController'
  }).
  state('root.universities', {
        url: '/university/:universityId',
        templateUrl: BASE + 'templates/one.university.html',
        controller: 'OneUniversityController'
  }).
  state('root.universities-admin', {
        url: '/university/:universityId/admin',
        templateUrl: BASE + 'templates/one.university.admin.html',
        controller: 'OneUniversityController'
  }).
  state('root.universities-animate', {
        url: '/university/:universityId/animate',
        templateUrl: BASE + 'templates/one.university.animations.html',
        controller: 'OneUniversityController'
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
  state('root.demos', {
        url: '/demos',
        templateUrl: BASE + 'templates/demos.html',
        controller: 'DemosController'
  }).
  // state('root.gpa', {
  //       url: '/gpa',
  //       templateUrl: BASE + 'templates/dev/archives/gpa.html',
  //       controller: 'gpaController'
  // }).
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
    state('root.munchies', {
        url: '/munchies',
        templateUrl: BASE + 'templates/elements/layouts/powerups.munchies.html'
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
        controller: 'MessagesController'
  }).
  state('root.messaging', {
        url: '/messaging',
        templateUrl: BASE + 'templates/dev/student.messaging.html',
        controller: 'DevController'
  }).
  state('root.splash-madlib', {
        url: '/splash-madlib:categoryId:universityId',
        templateUrl: BASE + 'templates/splash.madlib.html',
        params: {category: {name: 'Academic', id:5, hex_color:'academic'}, university: {latitude: "37.8718992", longitude: "-122.2585399",name: 'UC Berkeley', id:2307, school_color_dark: "#023360", school_tiny_name: 'Cal', school_color_light: "#FBB431", short_name: "UC Berkeley"}},
        controller: 'SplashController',
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
  state('root.guru-conversations', {
        url: '/guru-conversations',
        templateUrl: BASE + 'templates/guru.conversations.html'
  }).
  //GPA GURU
  state('root.gpa-title', {
        url: '/gpa-title',
        templateUrl: BASE + 'templates/dev/gpa/title.html',
        controller: 'GPAController'
  }).
  state('root.gpa-welcome', {
        url: '/gpa-welcome',
        templateUrl: BASE + 'templates/dev/gpa/welcome.gpa.html',
        controller: 'GPAController'
  }).
  state('root.gpa-demographic', {
        url: '/gpa-demographic',
        templateUrl: BASE + 'templates/dev/gpa/demographic.html',
        controller: 'GPAController'
  }).
  state('root.gpa-home', {
        url: '/gpa-home',
        templateUrl: BASE + 'templates/dev/gpa/gpa.home.html',
        controller: 'GPAController'
  }).
  state('root.grub-home', {
        url: '/grub-home',
        templateUrl: BASE + 'templates/dev/food/grub.home.html',
        controller: 'GrubHomeCtrl'
  }).
  state('sound-intro', {
    url: '/sound-intro',
    templateUrl: BASE + 'templates/dev/sound/intro.html',
    controller: 'IntroCtrl'
  }).
  state('sound-home', {
    url: '/sound-home',
    templateUrl: BASE + 'templates/dev/sound/music.home.html',
    controller: 'MusicHomeCtrl'
  }).
  state('sound-playlist', {
    url: '/playlist/:genre',
    params: {
      'genre': null
    },
    templateUrl: BASE + 'templates/dev/sound/playlist.html',
    controller: 'PlaylistCtrl'
  }).
  state('root.transit-home', {
        url: '/transit-home',
        templateUrl: BASE + 'templates/dev/transit/transit.home.html',
        controller: 'TransitHomeCtrl'
  }).
  state('root.youtube', {
        url: '/youtube',
        templateUrl: BASE + 'templates/dev/sound/youtubelist.html',
        controller: 'SoundController'
  }).
  state('root.jeselle', {
        url: '/jeselle',
        templateUrl: BASE + 'templates/jeselle/index.html',
        controller: 'JeselleController'
  }).
  state('root.gabrie', {
        url: '/gabrie',
        templateUrl: BASE + 'templates/gabrie/index.html',
        controller: 'GabrielleController'
  }).
  state('root.gabrie-project', {
        url: '/gabrie/project',
        templateUrl: BASE + 'templates/gabrie/project.html',
        controller: 'JeselleController'
  }).
  state('root.curtains', {
        url: '/curtains',
        templateUrl: BASE + 'templates/curtains.html'
  }).
  state('root.getting-started', {
        url: '/getting-started',
        templateUrl: BASE + 'templates/.html',
        params: {category: {name: 'Academic', id:5, hex_color:'academic'}, university: {latitude: "37.8718992", longitude: "-122.2585399",name: 'UC Berkeley', id:2307, school_color_dark: "#023360", school_tiny_name: 'Cal', school_color_light: "#FBB431", short_name: "UC Berkeley"}},
  }).
  state('root.splash', {
        url: '/:categoryId:universityId',
        templateUrl: BASE + 'templates/splash.html',
        params: {category: {name: 'Academic', id:5, hex_color:'academic'}, university: {latitude: "37.8718992", longitude: "-122.2585399",name: 'UC Berkeley', id:2307, school_color_dark: "#023360", school_tiny_name: 'Cal', school_color_light: "#FBB431", short_name: "UC Berkeley"}},
        controller: "SplashController"
  });



  $urlRouterProvider.otherwise('/' + _startpage);


});
