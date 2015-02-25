// Uguru upp
var LOCAL = false;
var REST_URL = 'http://uguru-rest.herokuapp.com'
var BASE_URL = 'http://uguru-rest.herokuapp.com/app/'
var BASE = '';
if (LOCAL) {
  BASE = 'remote/';
  // REST_URL = 'http://10.248.146.36:5000'
  var REST_URL = 'http://uguru-rest.herokuapp.com';
  BASE_URL = 'http://10.248.146.36:8100/remote/index.html#/student/home'
}
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'fastMatcher',
  'ngAnimate', 'uguru.student.controllers', 'uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps',
  'uguru.directives', 'mgcrea.ngStrap', 'ionic.contrib.frost', 'ionic.device', 'ui.bootstrap'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory,
  $cordovaDialogs, Version, $cordovaSplashscreen, $rootScope,
  $templateCache, Device, User) {
  $ionicPlatform.ready(function() {
    //Only when the app is opened after its been closed
    document.addEventListener("deviceready", function () {
        console.log('hiding splash screens..');
        $cordovaSplashscreen.hide();


        //Set platform in local store
        $localstorage.setObject('platform', ionic.Platform.platform());
        $localstorage.setObject('device', ionic.Platform.device());


        var local_user = $localstorage.getObject('user');
        if (!local_user.devices) {
          local_user.devices = [];
        }
        if (local_user && local_user.devices.length ===0) {
          var currentDevice = ionic.Platform.device();
          local_user.current_device = currentDevice;
          local_user.devices.push(currentDevice);
          $localstorage.setObject('user', local_user);

          if (!local_user.id) {
            console.log('saving device to server');
            Device.post(currentDevice).then(function(result) {
              console.log('result received');
              console.log(result.plain());
            })
          }
        }

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.overlaysWebView(true);
          StatusBar.styleLightContent();
        }



      checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);

    });

  })
})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v1.0"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbversion);
  }

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/student/home');

  //Set up restangular provider
  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');
  // RestangularProvider.setBaseUrl('http://10.193.138.226:5000/api/v1');

  //Client-side router
  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: 'templates/root.html',
        controller: function($scope, $state, $localstorage, User, RootService, Version, $ionicHistory, $templateCache) {

          // $localstorage.removeObject('user');
          $scope.user = User.getLocal();
          $scope.user.updateAttr = User.updateAttrUser;
          $scope.user.createObj = User.createObj;
          $scope.user.updateObj = User.updateObj;

          $scope.rootUser = User;
          $scope.root = RootService;

          document.addEventListener("deviceready", function () {

            User.getUserFromServer($scope, null, $state);
            document.addEventListener("resume", function() {

                console.log('device is resuming....')
                 checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // User.getUserFromServer($scope, null, $state);


            }, false);

            document.addEventListener("online", function() {

                console.log('device is online...')
              checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                console.log('Getting user from server')
                // User.getUserFromServer($scope);

            }, false);

            document.addEventListener("offline", function() {

                console.log('device is offline...');
                checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('getting updated user from server...');
                // User.getUserFromServer($scope);

            }, false);

            document.addEventListener("pause", function() {
                console.log('device is paused...')
              // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
            }, false);
          });

        }
  }).
  state('root.student', {
        url: '/student',
        abstract: true,
        templateUrl: 'templates/student-root.html'
  }).
  state('root.guru', {
        url: '/guru',
        abstract: true,
        templateUrl: 'templates/guru-root.html'
  }).
  state('root.guru.wizard', {
        url: '/wizard',
        templateUrl: BASE + 'templates/guru/guru.onboarding.html',
        controller: 'BecomeGuruController'
  }).
  state('root.guru.home', {
        url: '/home',
        templateUrl: BASE + 'templates/guru/guru.home.html',
        controller: 'GuruHomeController'
  }).
  state('root.guru.student-available', {
        url: '/student-available/:requestObj:proposalObj',
        templateUrl: BASE + 'templates/guru/guru.student-request.html',
        controller: 'GuruIncomingRequestController'
  }).
  state('root.student.home', {
        url: '/home',
        templateUrl: BASE + 'templates/student/student.home.html',
        controller: 'StudentHomeController'
  }).
  state('root.student.request', {
        url: '/request/:courseObj',
        templateUrl: BASE +  'templates/student/student.request.html',
        controller: 'StudentRequestController'
  }).
  state('root.student.active-session', {
        url: '/active-session/:sessionObj',
        templateUrl: BASE +  'templates/student/student.active-session.html',
        controller: 'StudentActiveSession'
  }).
  state('root.guru.session-start', {
        url: '/start-session/:sessionObj',
        templateUrl: BASE +  'templates/guru/guru.session-start.html',
        controller: 'GuruSessionStartController'
  }).
  state('root.guru.active-session', {
        url: '/active-session/:sessionObj',
        templateUrl: BASE +  'templates/guru/guru.active-session.html',
        controller: 'GuruActiveSession'
  }).
  state('root.student.settings', {
        url: '/settings',
        templateUrl: BASE + 'templates/student/student.settings.html'
  }).
  state('root.student.settings-cards', {
        url: '/settings-cards',
        templateUrl: BASE + 'templates/student/student.settings.cards.html',
        controller: 'SettingsCardController'
  }).
  state('root.student.settings-profile', {
        url: '/settings-profile',
        templateUrl: BASE + 'templates/student/student.settings.profile.html',
        controller: 'SettingsProfileController'
  }).
  state('root.student.settings-transactions', {
        url: '/settings-transactions',
        templateUrl: BASE + 'templates/student/student.settings.transactions.html'
  }).
  state('root.student.settings-notifications', {
        url: '/settings-notifications',
        templateUrl: BASE + 'templates/student/student.settings.notifications.html',
        controller: 'SettingsNotificationsController'
  }).
  state('root.student.settings-edit-courses', {
        url: '/settings-edit-courses',
        templateUrl: BASE + 'templates/student/student.settings.edit-courses.html',
        controller: 'SettingsEditCoursesController'
  }).
  state('root.student.settings-edit-university', {
        url: '/settings-edit-courses',
        templateUrl: BASE + 'templates/student/student.settings.edit-university.html',
        controller: 'SettingsEditUniversityController'
  }).
  state('root.student.directory', {
        url: '/directory',
        templateUrl: BASE + 'templates/student/directory.html',
  }).
  state('root.student.add-payment', {
        url: '/payment/:cardObj',
        templateUrl: BASE + 'templates/student/add-payment.html',
  }).
  state('root.student.request-status', {
        url: '/request-status/:requestObj',
        templateUrl: BASE + 'templates/student/student.request-status.html',
        controller: 'RequestStatusController'
  }).
  state('root.student.previous-session-details', {
        url: '/previous-session-details/:sessionObj',
        templateUrl: BASE + 'templates/student/student.previous-session-details.html',
        controller: 'PreviousSessionDetailsController'
  }).
  state('root.student.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student.guru-available', {
        url: '/guru-available/:requestObj',
        templateUrl: BASE + 'templates/student/student.guru-available.html',
        controller: 'GuruAvailableController'
  }).
  state('root.student.guru-profile', {
        url: '/guru-profile/:guruObj:showContactGuru',
        templateUrl: BASE + 'templates/student/student.guru-profile.html',
        controller: 'GuruProfileController'
  }).
  state('root.student.guru-home-page', {
        url: '/guru-home-page',
        templateUrl: BASE + 'templates/student/student.guru-home-page.html'
  }).
  state('root.student.guru-timer', {
        url: '/guru-timer',
        templateUrl: BASE + 'templates/student/student.guru-timer.html'
  }).
  state('root.student.new-settings', {
        url: '/new-settings',
        templateUrl: BASE + 'templates/student/student.new-settings.html'
  }).
  state('root.student.guru-mode', {
        url: '/guru-mode',
        templateUrl: BASE + 'templates/student/student.guru-mode.html'
  }).
  state('root.student.animations', {
        url: '/animations',
        templateUrl: BASE + 'templates/student/animations.html',
  }).
  state('root.student.animation1', {
      url: '/animation1',
      templateUrl: BASE + 'templates/student/animation1.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          var testarray = document.getElementsByClassName("sq");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].className += " active";
          }
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("sq");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");

          }
        }
      }
  }).
  state('root.student.animation2', {
      url: '/animation2',
      templateUrl: BASE + 'templates/student/animation2.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].className += " active";
          }
          document.getElementsByClassName("yon").className += " active";
          document.getElementsByClassName("goo").className += " active";
          document.getElementsByClassName("rok").className += " active";
          document.getElementsByClassName("ryk").className += " active";
          document.getElementsByClassName("x7").className += " active";
          document.getElementsByClassName("x8").className += " active";
          document.getElementsByClassName("x9").className += " active";
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }
        }
      }
  }).
  state('root.student.animation3', {
      url: '/animation3',
      templateUrl: BASE + 'templates/student/animation3.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          !function () {
            var boomTimeout;
            var p = document.querySelector('p');

            // dataset isn't well supported enough yet...
            p.setAttribute('data-content', p.textContent);

            function boom () {
              p.className = 'boom';
              window.clearTimeout(boomTimeout);
              boomTimeout = window.setTimeout(unboom, 300);
            }

            function unboom () {
              p.className = '';
            }

            setInterval(function () {r
              boom();
              setTimeout(boom, 400);
            }, 1800);

            boom();

            p.addEventListener('click', boom, false);
          }();
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }
        }
      }
  }).
  state('root.student.animation4', {
      url: '/animation4',
      templateUrl: BASE + 'templates/student/animation4.html',
      controller: function($scope) {
        $scope.startAnimation = function() {

              //Create the canvas
              var canvas = document.getElementById("canvas");
              var context = canvas.getContext("2d");
              document.getElementsByClassName('animation-box')[0].appendChild(canvas);

              setInterval(function() {
                  //Generating random positions
                  var posX = Math.floor(Math.random() * 200);
                  var posY = Math.floor(Math.random() * 200);

                  //Picking selected colors at random
                  var colors = ['rgba(220, 20, 60, 0.8)', 'rgba(255, 105, 180,0.6)', 'rgba(255, 20, 147, 0.8)', 'rgba(255, 140, 0,0.6)', 'rgba(143, 188, 143,0.7)'];
                  var color = Math.floor(Math.random() * colors.length);

                  //Drawing on the canvas
                  context.beginPath();
                  context.moveTo(200, 0);
                  context.lineTo(1, -1);
                  context.fillStyle = colors[color];
                  context.arc(posX, posY, 0, 0, Math.PI * 2, true);
                  context.closePath();
                  context.fill();
              }, 80);

        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }
        }
      }
  })
});

var checkForAppUpdates = function (Version, $ionicHistory, $templateCache, $localstorage) {

            console.log('checking for app updates...');
            Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                    var serverVersionNumber = JSON.parse(response).version;
                    var currentVersion = Version.getVersion()
                    //if brand new user with no version set
                    if ((typeof currentVersion) === "undefined") {
                      console.log('First time opening app - set version to 1.0');
                      currentVersion = 1.0
                      Version.setVersion(1.0);
                    }
                    console.log('user v:' + currentVersion.toString() + '. Server v:' + serverVersionNumber);
                    if (serverVersionNumber != currentVersion) {

                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      // $cordovaSplashscreen.show();
                      window.localStorage.clear();

                      //remove all angular templates
                      $templateCache.removeAll();

                      Version.setVersion(serverVersionNumber);
                      $localstorage.set('recently_updated', true);
                      console.log('V' + serverVersionNumber + 'stored to user');
                      window.location = BASE_URL;
                      window.location.reload(true);
                    }
               },

               //connectivity issues
              function(error) {
                  console.log(error);
                  console.log('Version not loaded');
              }
          );
        }
