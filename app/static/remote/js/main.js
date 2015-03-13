// Uguru upp
var LOCAL = false;
var BASE_URL = 'http://uguru-rest.herokuapp.com/app/';
var REST_URL = 'http://uguru-rest.herokuapp.com';
var BASE = '';
if (LOCAL) {
  BASE = 'remote/';
  BASE_URL = 'http://192.168.0.104:8100/remote/';
  REST_URL = 'http://192.168.0.104:5000'
}
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'fastMatcher',
  'ngAnimate', 'uguru.student.controllers', 'uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps',
  'uguru.directives', 'mgcrea.ngStrap', 'ionic.device', 'ui.bootstrap'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory,
  $cordovaDialogs, Version, $cordovaSplashscreen, $rootScope,
  $templateCache, Device, User, $cordovaLocalNotification, $cordovaPush) {
  $ionicPlatform.ready(function() {
    document.addEventListener("deviceready", function () {
        $cordovaSplashscreen.hide();

        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        console.log('Connection type: ' + states[networkState]);

        var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
        };

        //TODO put this somewhere else
          $cordovaPush.register(iosConfig).then(function(result) {
            // Success -- send deviceToken to server, and store for future use
            console.log("result: " + result)
            // $http.post("http://server.co/", {user: "Bob", tokenID: result.deviceToken})
          }, function(err) {
            console.log("Registration error: " + err)
          });



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
            });
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

  });
})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v1.0"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbVersion);
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
        controller: function($ionicPlatform, $scope, $state, $localstorage, User,
          RootService, Version, $ionicHistory, $templateCache, $ionicLoading) {

          // $localstorage.removeObject('user');
          $scope.user = User.getLocal();
          $scope.user.updateAttr = User.updateAttrUser;
          $scope.user.createObj = User.createObj;
          $scope.user.updateObj = User.updateObj;

          $scope.rootUser = User;
          $scope.root = RootService;

          $scope.loader = {
            show: function() {
              $ionicLoading.show({
                template: '<ion-spinner icon="lines" class="spinner-positive"></ion-spinner>'
              });
            },
            hide: function(){
              $ionicLoading.hide();
            }
          }

          $ionicPlatform.ready(function() {

              $scope.platform = {
                ios: ionic.Platform.isIOS(),
                android: ionic.Platform.isAndroid(),
                mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid(),
                web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid()),
              }
          });

          document.addEventListener("deviceready", function () {
            console.log(JSON.stringify(ionic.Platform.device()));
            // User.getUserFromServer($scope, null, $state);
            document.addEventListener("resume", function() {

                console.log('device is resuming....');
                 checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // User.getUserFromServer($scope, null, $state);


            }, false);

            document.addEventListener("online", function() {

                console.log('device is online...');
              checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                console.log('Getting user from server');

            }, false);

            document.addEventListener("offline", function() {

                console.log('device is offline...');
                checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('getting updated user from server...');
                // User.getUserFromServer($scope);

            }, false);

            document.addEventListener("pause", function() {
                console.log('device is paused...');
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
        templateUrl: BASE + 'templates/guru.onboarding.html',
        controller: 'BecomeGuruController'
  }).
  state('root.guru.home', {
        url: '/home',
        templateUrl: BASE + 'templates/guru.home.html',
        controller: 'GuruHomeController'
  }).
  state('root.guru.opportunities', {
        url: '/opportunities',
        templateUrl: BASE + 'templates/guru.opportunities.html',
        controller: 'GuruOpportunitiesController'
  }).
  state('root.guru.student-available', {
        url: '/student-available/:requestObj:proposalObj',
        templateUrl: BASE + 'templates/guru.student-request.html',
        controller: 'GuruIncomingRequestController'
  }).
  state('root.student.home', {
        url: '/home',
        templateUrl: BASE + 'templates/student.home.html',
        controller: 'StudentHomeController'
  }).
  state('root.student.request', {
        url: '/request/:courseObj',
        templateUrl: BASE +  'templates/student.request.html',
        controller: 'StudentRequestController'
  }).
  state('root.student.active-session', {
        url: '/active-session/:sessionObj',
        templateUrl: BASE +  'templates/student.active-session.html',
        controller: 'StudentActiveSession'
  }).
  state('root.guru.session-start', {
        url: '/start-session/:sessionObj',
        templateUrl: BASE +  'templates/guru.session-start.html',
        controller: 'GuruSessionStartController'
  }).
  state('root.guru.active-session', {
        url: '/active-session/:sessionObj',
        templateUrl: BASE +  'templates/guru.active-session.html',
        controller: 'GuruActiveSession'
  }).
  state('root.student.settings', {
        url: '/settings',
        templateUrl: BASE + 'templates/student.settings.html'
  }).
  state('root.student.settings-cards', {
        url: '/settings-cards',
        templateUrl: BASE + 'templates/student.settings.cards.html',
        controller: 'SettingsCardController'
  }).
  state('root.student.settings-profile', {
        url: '/settings-profile',
        templateUrl: BASE + 'templates/student.settings.profile.html',
        controller: 'SettingsProfileController'
  }).
  state('root.student.settings-transactions', {
        url: '/settings-transactions',
        templateUrl: BASE + 'templates/student.settings.transactions.html',
        controller: 'SettingsTransactionsController'
  }).
  state('root.student.settings-transfer', {
        url: '/settings-transfer',
        templateUrl: BASE + 'templates/student.settings.transfers.html',
        controller: 'SettingsTransfersController'
  }).
  state('root.student.settings-notifications', {
        url: '/settings-notifications',
        templateUrl: BASE + 'templates/student.settings.notifications.html',
        controller: 'SettingsNotificationsController'
  }).
  state('root.student.settings-edit-courses', {
        url: '/settings-edit-courses',
        templateUrl: BASE + 'templates/student.settings.edit-courses.html',
        controller: 'SettingsEditCoursesController'
  }).
  state('root.student.settings-edit-university', {
        url: '/settings-edit-courses',
        templateUrl: BASE + 'templates/student.settings.edit-university.html',
        controller: 'SettingsEditUniversityController'
  }).
  state('root.student.add-payment', {
        url: '/payment/:cardObj:debitCardOnly',
        templateUrl: BASE + 'templates/add-payment.html',
  }).
  state('root.student.request-status', {
        url: '/request-status/:requestObj',
        templateUrl: BASE + 'templates/student.request-status.html',
        controller: 'RequestStatusController'
  }).
  state('root.student.previous-session-details', {
        url: '/previous-session-details/:sessionObj',
        templateUrl: BASE + 'templates/student.previous-session-details.html',
        controller: 'PreviousSessionDetailsController'
  }).
  state('root.guru.previous-session-details', {
        url: '/previous-session-details-guru/:sessionObj',
        templateUrl: BASE + 'templates/student.previous-session-details.html',
        controller: 'PreviousSessionDetailsController'
  }).
  state('root.student.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student.guru-available', {
        url: '/guru-available/:requestObj',
        templateUrl: BASE + 'templates/student.guru-available.html',
        controller: 'GuruAvailableController'
  }).
  state('root.student.guru-profile', {
        url: '/guru-profile/:guruObj:showContactGuru',
        templateUrl: BASE + 'templates/student.guru-profile.html',
        controller: 'GuruProfileController'
  }).
  state('root.student.guru-home-page', {
        url: '/guru-home-page',
        templateUrl: BASE + 'templates/student.guru-home-page.html'
  }).
  state('root.student.guru-timer', {
        url: '/guru-timer',
        templateUrl: BASE + 'templates/student.guru-timer.html'
  }).
  state('root.student.new-settings', {
        url: '/new-settings',
        templateUrl: BASE + 'templates/student.new-settings.html'
  }).
  state('root.student.guru-mode', {
        url: '/guru-mode',
        templateUrl: BASE + 'templates/student.guru-mode.html'
  });
});

var checkForAppUpdates = function (Version, $ionicHistory, $templateCache, $localstorage) {

            console.log('checking for app updates...');
            Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                    var serverVersionNumber = JSON.parse(response).version;
                    var currentVersion = Version.getVersion();
                    //if brand new user with no version set
                    if ((typeof currentVersion) === "undefined") {
                      console.log('First time opening app - set version to 1.0');
                      currentVersion = 1.0;
                      Version.setVersion(1.0);
                    }
                    console.log('user v:' + currentVersion.toString() + '. Server v:' + serverVersionNumber);
                    if (serverVersionNumber != currentVersion) {

                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      // $cordovaSplashscreen.show();
                      window.localStorage.clear();

                      //remove all angular templates
                      // $templateCache.removeAll();

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
        };
