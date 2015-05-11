// Uguru upp
var LOCAL = false; //local to the 8100 codebasebirbir
var BASE_URL = 'http://uguru-rest.herokuapp.com/production/app/';
var REST_URL = 'http://uguru-rest.herokuapp.com'
// REST_URL = 'http://192.168.42.66:5000';
// BASE_URL = 'http://192.168.42.66:5000/app/production/';
var BASE = '';
if (LOCAL) {
  BASE = 'remote/';
 BASE_URL = 'http://192.168.42.66:8100';
 REST_URL = 'http://192.168.42.66:5000';
  // var REST_URL = 'http://uguru-rest.herokuapp.com'
   // var REST_URL = 'http://uguru-rest.herokuapp.com';
} else {
  img_base = '/static/'
}
mixpanel.track("App Launch");
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'fastMatcher',
  'ngAnimate', 'uguru.onboarding.controllers', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps',
  'uguru.directives', 'mgcrea.ngStrap', 'ionic.device', 'ui.bootstrap'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory,
  $cordovaDialogs, Version, $rootScope, $cordovaSplashscreen,
  $templateCache, Device, User, $cordovaLocalNotification,
  $cordovaGeolocation) {

$ionicPlatform.ready(function() {

  document.addEventListener("deviceready", function () {
        // console.log('list of all plugins checkpoint 2', JSON.stringify(cordova.require("cordova/plugin_list").metadata));

           $cordovaSplashscreen.hide();

            var posOptions = {
              timeout: 2000,
              enableHighAccuracy: false, //may cause high errors if true
            }

            $rootScope.platform = {
                ios: ionic.Platform.isIOS(),
                android: ionic.Platform.isAndroid(),
                mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid(),
                web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid()),
                device: ionic.Platform.device(),
            }

            // console.log('user is on device:', ionic.Platform.platform());
            //performing mobile tasks
            // console.log('STARTING MOBILE ONLY tasks below \n\n');

            if (!window.cordova) {
              // console.log('sorry aint no cordova up in here');
            }

            if (window.cordova && $rootScope.platform.mobile) {

                //hiding the splash screen
                // console.log('1. hiding splashscreen on mobile devices \n\n');

                if (navigator.splashscreen) {
                  // console.log('hide the splash screen on ios via cordova navigator v2');
                  navigator.splashscreen.hide();
                  // $cordovaSplashscreen.hide();
                } else {
                  // console.log('did not hide the splash screen on device since there is none?');
                }


                //grabbing nextwork speed
                if ($cordovaNetwork) {
                  $rootScope.network_speed = getNetworkSpeed();
                  // console.log('2. grabbing network speed which is: ', $rootScope.network_speed, '\n\n');
                }


                //save device
                // console.log('3. Saving device to server:', $rootScope.platform.device.model, '\n\n')
                $rootScope.current_device = ionic.Platform.device();


                //keyboard settings for android / ios
                // console.log('4. Setting up ios keyboard default + status bars..');
                if (window.cordova.plugins.Keyboard) {
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                  cordova.plugins.Keyboard.disableScroll(true);
                }

                //styling status bars
                if ($rootScope.platform.ios) {

                  if (window.StatusBar) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
                    StatusBar.styleDefault();
                    StatusBar.overlaysWebView(true);
                  }

                }
          }

    });
    // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
  });

})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider, $ionicConfigProvider, $compileProvider) {

  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbVersion);
  }

  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.tabs.position("bottom");

  // $compileProvider.imgSrcSanitizationWhitelist('Captu  redImagesCache/');

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
          RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
          CordovaPushWrapper, $cordovaPush, University, $cordovaStatusbar,
          $cordovaSplashscreen, $timeout, Geolocation, $cordovaPush) {


          // console.log('1. checking for app updates\n');
          // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage)


          $scope.network_speed = null;
          $scope.platform_ready = false;
          //how to make platform ready...
          $scope.user = User.getLocal();
          $scope.user.updateAttr = User.updateAttrUser;
          $scope.user.createObj = User.createObj;
          $scope.user.updateObj = User.updateObj;
          $scope.popupScope = {};

          if ($scope.user && $scope.user.id) {
            User.getUserFromServer($scope, null, $state);
          }


          if (LOCAL) {
            $scope.img_base = 'remote/'
          } else {
            $scope.img_base = '';
          }

          $scope.rootUser = User;
          $scope.root = RootService;
          $scope.root.vars = {};
          $scope.root.vars.onboarding = false;
          $scope.root.vars.request_cache = {};
          $scope.root.vars.onboarding_cache = {};
          $scope.root.vars.guru_mode = $scope.user.guru_mode;
          $scope.static = {};
          $scope.static.nearest_universities = [];
          $scope.static.universities = [];

          console.log('getting most up to date universities + user from server..')
          var local_universities = $localstorage.getObject('universities');
          if (!local_universities || local_universities.length === 0) {

            User.getUserFromServer($scope, null, $state);
            on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation);
          } else {
            $scope.static.universities = $localstorage.getObject('universities')
            if ($scope.static.universities && $scope.static.universities.length > 0) {
              console.log('universities already loaded');
            } else {
              console.log('something funky is going on...')
            }
          }

          $scope.loader = {
            show: function() {
              $ionicLoading.show({
                template: '<ion-spinner icon="lines" class="spinner-positive"></ion-spinner>'
              });
              $scope.root.vars.loaderOn = true;
              $timeout(function() {
                if ($scope.root.vars.loaderOn) {
                  $scope.loader.hide();
                  $scope.root.vars.loaderOn = false;
                  $scope.success.show(0, 2000, 'Something went wrong. Please try again or contact support.');
                }
              }, 10000);
            },
            hide: function(){
              $ionicLoading.hide();
              $scope.root.vars.loaderOn = false;
            }
          }

          // $scope.backgroundRefresh = function() {

          //   //check if they are in these particular views and user_refresh is false
          //    if (( $state.current.name === 'root.student-home' ||
          //         $state.current.name === 'root.guru-home') &&
          //         !$scope.root.vars.user_refresh) {

          //       $scope.root.vars.user_refresh = true;
          //       $timeout(function() {
          //         $scope.doRefresh(true);
          //       }, 15000)

          //    } else if ($scope.root.vars.user_refresh) {
          //       console.log('background refresh is already happening bro, check again in 15seconds');
          //    }
          // }

          $scope.doRefresh = function(repeat) {
            $scope.root.vars.user_refresh = true;
            if ($scope.root.vars.user_refresh || !repeat) {

              User.getUserFromServer($scope, null, $state);
              if (repeat) {
                $scope.root.vars.user_refresh = false;
              }
            }
          }

          $scope.success = {
            show: function(delay, duration, message) {
              if (!message) {
                  message = 'Saved!';
              }
              $ionicLoading.show({
                template: message,
                delay: delay,
                duration: duration
              });
            },
            hide: function(){
              $ionicLoading.hide();
            }
          }

          $scope.platform = {
            mobile:false,
            web:true,
            device: false,
            android: false,
            ios: false
          }

          $ionicPlatform.ready(function() {


            // console.log('ENDING MOBILE ONLY tasks below \n\n');
            $scope.platform = {
                ios: ionic.Platform.isIOS(),
                android: ionic.Platform.isAndroid(),
                windows: ionic.Platform.isWindowsPhone(),
                mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(),
                web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid()),
                device: ionic.Platform.device(),
            }

            if ($scope.platform.android) {

                  var androidConfig = {
                    "senderID": "413826461390",
                    'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                  }

                  $cordovaPush.register(androidConfig).then(function(deviceToken) {

                    console.log('android notifications');

                  }, function(err){

                    console.log(err)

                  });

                  console.log('Extra #2. Android push notifications need to be registered')
                  $rootScope.$on('pushNotificationReceived', function(event, notification) {
                    CordovaPushWrapper.received($rootScope, event, notification);
                    console.log('android notifications registered',event, notification);
                  });

                  //grab geolocation super early for android devices
                  on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation);

              }

            if ($scope.platform.windows && cordovaPush) {

                  $cordovaPush.register(
                      channelHandler,
                      errorHandler,
                      {
                          "channelName": "123723560",
                          "ecb": "onNotificationWP8",
                          "uccb": "channelHandler",
                          "errcb": "jsonErrorHandler"
                      });

              function channelHandler(event) {

                  console.log();
                  var uri = event.uri;
                  console.log("channelHandler uri: " + uri);

              }
              function errorHandler(error) {
                 // document.getElementById('app-status-ul').appendChild(document.createElement(error));
                  console.log("Error Handle :" ,error);
              }
              function onNotificationWP8(e) {

                  if (e.type == "toast" && e.jsonContent) {
                      pushNotification.showToastNotification(successHandler, errorHandler,
                      {
                          "Title": e.jsonContent["wp:Text1"],
                          "Subtitle": e.jsonContent["wp:Text2"],
                          "NavigationUri": e.jsonContent["wp:Param"]
                      });
                  }

                  if (e.type == "raw" && e.jsonContent) {
                      alert(e.jsonContent.Body);
                  }
              }
              function jsonErrorHandler(error) {
                  //document.getElementById('app-status-ul').appendChild(document.createElement(error.code));
                  //document.getElementById('app-status-ul').appendChild(document.createElement(error.message));
                  console.log("ERROR: ", error.code);
                  console.log("ERROR: ", error.message);
              }

            }

            if ($scope.platform && $scope.user) {
              $scope.user.current_device = ionic.Platform.device();
              $scope.user.current_device.user_id = $scope.user.id;
              $scope.user.createObj($scope.user, 'device', $scope.user.current_device, $scope);
            }




          });


          document.addEventListener("deviceready", function () {
            // console.log(JSON.stringify(ionic.Platform.device()));
            // User.getUserFromServer($scope, null, $state);
            document.addEventListener("resume", function() {

                // console.log('device is resuming....');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                User.getUserFromServer($scope, null, $state);

            }, false);

            document.addEventListener("online", function() {

                // console.log('device is online...');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('Getting user from server');
                User.getUserFromServer($scope, null, $state);

            }, false);

            document.addEventListener("offline", function() {

                // console.log('device is offline...');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('getting updated user from server...');
                // User.getUserFromServer($scope);

            }, false);

            document.addEventListener("pause", function() {
                // console.log('device is paused...');
              // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
            }, false);
          });

        }
  }).
  state('root.student-home', {
        url: '/home',
        templateUrl: BASE + 'templates/student.home.new.html',
        controller: 'StudentHomeController'
  }).
  state('root.onboarding-loading', {
        url: '/onboarding-loading',
        templateUrl: BASE + 'templates/onboarding.loading.html',
        controller: 'OnboardingLoadingController'
  }).
  state('root.onboarding-location', {
        url: '/onboarding-location',
        templateUrl: BASE + 'templates/onboarding.request-location.html',
        controller: 'OnboardingRequestLocationController'
  }).
  state('root.prompt-location', {
        url: '/prompt-location',
        templateUrl: BASE + 'templates/prompt.location.html',
        controller: 'PromptLocationController'
  }).
  state('root.onboarding-nearest-university', {
        url: '/onboarding-nearest',
        templateUrl: BASE + 'templates/onboarding.nearest-university.html',
        controller: 'OnboardingNearestUniversityController'
  }).
  state('root.onboarding-university', {
        url: '/onboarding-university',
        templateUrl: BASE + 'templates/onboarding.university.html',
        controller: function($scope, $cordovaStatusbar) {
          $scope.$on('$ionicView.beforeEnter', function(){
              console.log('before view has entered');
              $scope.universities = $scope.static.universities;

              if ($scope.platform.ios && window.StatusBar) {
                  StatusBar.styleLightContent();
              }
          });
        }
  }).
  state('root.student-request', {
        url: '/student-request:courseObj',
        templateUrl: BASE + 'templates/student.request.new.html',
        controller: 'StudentRequestController'
  }).
  state('root.request-guru-type', {
        url: '/request-guru-type',
        templateUrl: BASE + 'templates/student.request.guru-type.html',
        controller: 'StudentRequestGuruTypeController'
  }).
  state('root.request-session-length', {
        url: '/request-session-length',
        templateUrl: BASE + 'templates/student.request.session-length.html',
        controller: 'StudentRequestSessionLengthController'
  }).
  state('root.request-calendar', {
        url: '/request-calendar:proposalObj',
        templateUrl: BASE + 'templates/student.request.calendar.html',
        controller: 'CalendarModalController'
  }).
  state('root.request-contact-method', {
        url: '/request-contact-method',
        templateUrl: BASE + 'templates/student.contact.method.html',
        controller: 'StudentRequestContactController'
  }).
  state('root.request-location', {
        url: '/request-location',
        templateUrl: BASE + 'templates/student.request.location.html',
        controller: 'RequestLocationController'
  }).
  state('root.request-description', {
        url: '/request-description',
        templateUrl: BASE + 'templates/student.request.description.html',
        controller: 'AddNoteController'
  }).
  // state('root.guru.new-home', {
  //       url: '/onboarding-loading',
  //       templateUrl: BASE + 'templates/guru.home.new.html',
  //       // controller: 'OnboardingLoadingController'
  // }).
  state('root.guru-wizard', {
        url: '/wizard',
        templateUrl: BASE + 'templates/guru.onboarding.html',
        controller: 'BecomeGuruController'
  }).
  state('root.guru-home', {
        url: '/guru-home',
        templateUrl: BASE + 'templates/guru.home.new.html',
        controller: 'GuruHomeController'
  }).
  state('root.guru-verification', {
        url: '/guru-verification',
        templateUrl: BASE + 'templates/guru.verification.html',
        controller: 'GuruVerificationController'
  }).
  state('root.guru-opportunities', {
        url: '/guru-opportunities',
        templateUrl: BASE + 'templates/guru.opportunities.html',
        controller: 'GuruOpportunitiesController'
  }).
  state('root.guru-student-available', {
        url: '/guru-student-available/:requestObj:proposalObj',
        templateUrl: BASE + 'templates/guru.student-request.html',
        controller: 'GuruIncomingRequestController'
  }).
  // state('root.student.request', {
  //       url: '/request/:courseObj',
  //       templateUrl: BASE +  'templates/student.request.html',
  //       controller: 'StudentRequestController'
  // }).

  state('root.active-student-session', {
        url: '/student-active-session/:sessionObj',
        templateUrl: BASE +  'templates/student.active-session.html',
        controller: 'StudentActiveSession'
  }).
  state('root.guru-session-start', {
        url: '/start-session/:sessionObj',
        templateUrl: BASE +  'templates/guru.session-start.html',
        controller: 'GuruSessionStartController'
  }).
  state('root.guru-active-session', {
        url: '/guru-active-session/:sessionObj',
        templateUrl: BASE +  'templates/guru.active-session.html',
        controller: 'GuruActiveSession'
  }).
  state('root.student-settings', {
        url: '/settings',
        templateUrl: BASE + 'templates/student.settings.html'
  }).
  state('root.student-settings-cards', {
        url: '/settings-cards',
        templateUrl: BASE + 'templates/student.settings.cards.html',
        controller: 'SettingsCardController'
  }).
  state('root.settings-profile', {
        url: '/settings-profile',
        templateUrl: BASE + 'templates/student.settings.profile.html',
        controller: 'SettingsProfileController'
  }).
  state('root.settings-transactions', {
        url: '/settings-transactions',
        templateUrl: BASE + 'templates/student.settings.transactions.html',
        controller: 'SettingsTransactionsController'
  }).
  state('root.settings-transfer', {
        url: '/settings-transfer',
        templateUrl: BASE + 'templates/student.settings.transfers.html',
        controller: 'SettingsTransfersController'
  }).
  state('root.settings-notifications', {
        url: '/settings-notifications',
        templateUrl: BASE + 'templates/student.settings.notifications.html',
        controller: 'SettingsNotificationsController'
  }).
  state('root.settings-edit-courses', {
        url: '/settings-edit-courses',
        templateUrl: BASE + 'templates/student.settings.edit-courses.html',
        controller: 'SettingsEditCoursesController'
  }).
  state('root.settings-edit-university', {
        url: '/settings-edit-university',
        templateUrl: BASE + 'templates/student.settings.edit-university.html',
        controller: 'SettingsEditUniversityController'
  }).
  state('root.add-payment', {
        url: '/payment/:cardObj:debitCardOnly',
        templateUrl: BASE + 'templates/add-payment.html',
  }).
  state('root.student-request-status', {
        url: '/request-status/:requestObj',
        templateUrl: BASE + 'templates/student.request-status.html',
        controller: 'RequestStatusController'
  }).
  state('root.guru-proposal-details', {
        url: '/guru-proposal-details/:proposalObj',
        templateUrl: BASE + 'templates/guru.proposal-details.html',
        controller: 'ProposalDetailsActionController'
  }).
  state('root.guru-previous-session-details', {
        url: '/previous-session-details-guru/:sessionObj',
        templateUrl: BASE + 'templates/student.previous-session-details.html',
        controller: 'PreviousSessionDetailsController'
  }).
  state('root.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student.guru-available', {
        url: '/guru-available/:requestObj',
        templateUrl: BASE + 'templates/student.guru-available.html',
        controller: 'GuruAvailableController'
  }).
  state('root.guru-confirm-proposal', {
        url: '/guru-confirm-proposal/:proposalObj',
        templateUrl: BASE + 'templates/guru.confirm-proposal.html',
        controller: 'GuruConfirmProposalController'
  }).
  state('root.guru-profile-edit', {
        url: '/guru-profile-edit',
        templateUrl: BASE + 'templates/guru.edit-profile.html',
        controller: 'GuruEditProfileController'
  }).
  state('root.guru-profile', {
        url: '/guru-profile',
        templateUrl: BASE + 'templates/guru.profile.html',
        controller: 'GuruProfileController'
  }).
  state('root.student-guru-profile', {
        url: '/student-guru-profile/:guruObj:showContactGuru',
        templateUrl: BASE + 'templates/student.view-guru-profile.html',
        controller: 'StudentViewGuruProfileController'
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
  state('root.guru-mode', {
        url: '/guru-mode',
        templateUrl: BASE + 'templates/student.guru-mode.html'
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/onboarding-loading');
  // $urlRouterProvider.otherwise('/home');

});

var checkForAppUpdates = function (Version, $ionicHistory, $templateCache, $localstorage) {

            Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                    var serverVersionNumber = JSON.parse(response).version;
                    console.log('server number', serverVersionNumber);
                    var currentVersion = Version.getVersion();

                    //if brand new user with no version set
                    if ((typeof currentVersion) === "undefined") {
                      // console.log('First time opening app - set version to 1.0');
                      currentVersion = 1.0;
                      Version.setVersion(1.0);
                    }

                    if (LOCAL) {
                      console.log('it gets here');
                      $templateCache.removeAll();
                    }

                    if (serverVersionNumber != currentVersion) {

                      console.log('versions are different...\n');

                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      $localstorage.removeObject('user');
                      $localstorage.removeObject('courses');
                      $localstorage.removeObject('universities');
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
        };
//background loading stuff

var on_app_open_retrieve_objects = function($scope, $state, $localstorage, University, callback, Geolocation) {
  console.log('getting university from server');
  // $cordovaSplashscreen.hide();
  University.get().then(
      function(universities) {
          console.log('universities successfully loaded');
          universities = JSON.parse(universities);
          $scope.static.universities = universities;
          $localstorage.setObject('universities', $scope.static.universities);
          console.log($scope.static.universities.length + ' universities successfully loaded');
          if ($scope.user && $scope.user.position && $scope.user.position.coords) {
            getNearestUniversity($scope.user.position.coords.latitude, $scope.user.position.coords.longitude, $scope.static.universities, 100,
              $localstorage, $scope, callback, $state);
          } else
          if ($scope && $scope.platform && $scope.platform.android) {
            Geolocation.getUserPosition($scope, null, null, $state);
          }
      },
      function() {
          console.log('Universities NOT successfully loaded');
      }
  );
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

var getNetworkSpeed = function() {

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

    return networkState;

}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function getNearestUniversity(user_lat, user_long, uni_list, limit, local_storage, $scope, callback, $state) {


    var sort = function(array) {
      var len = array.length;
      if(len < 2) {
        return array;
      }
      var pivot = Math.ceil(len/2);
      var results = merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
      return results;
    };

    var merge = function(left, right) {
      var result = [];
      while((left.length > 0) && (right.length > 0)) {


            uni_1_lat = left[0].location.latitude;
            uni_1_long = left[0].location.longitude;
            uni_2_lat = right[0].location.latitude;
            uni_2_long = right[0].location.longitude;

            d1 = getDistanceFromLatLonInKm(user_lat, user_long, uni_1_lat, uni_1_long);
            d2 = getDistanceFromLatLonInKm(user_lat, user_long, uni_2_lat, uni_2_long);
            left[0].miles = parseInt(d1 / 0.62 * 10) / 10;
            right[0].miles = parseInt(d2 / 0.62 * 10) / 10;
            if ( d1 < d2 ) {
                result.push(left.shift());
            }
            else {
              result.push(right.shift());
            }
      }

      result = result.concat(left, right);
      return result;
    };

    var largeList = sort(uni_list);

    // $scope.nearest_universities = largeList;
    $scope.static.nearest_universities = largeList;
    if (callback) {
      callback($scope, $state);
    }
    return largeList.slice(0,10);

}