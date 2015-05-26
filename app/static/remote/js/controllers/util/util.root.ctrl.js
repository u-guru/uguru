angular.module('uguru.util.controllers')

.controller('RootController', [

  '$ionicPlatform',
  '$scope',
  '$state',
  '$localstorage',
  'User',
  'RootService',
  'Version',
  '$ionicHistory',
  '$templateCache',
  '$ionicLoading',
  '$rootScope',
  'CordovaPushWrapper',
  '$cordovaPush',
  'University',
  '$cordovaStatusbar',
  '$cordovaSplashscreen',
  '$timeout',
  'Geolocation',
  '$cordovaPush',
  '$ionicSideMenuDelegate',
  function($ionicPlatform, $scope, $state, $localstorage, User,
          RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
          CordovaPushWrapper, $cordovaPush, University, $cordovaStatusbar,
          $cordovaSplashscreen, $timeout, Geolocation, $cordovaPush, $ionicSideMenuDelegate) {

          // console.log('1. checking for app updates\n');
          // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage)


          $scope.network_speed = null;
          $scope.window = {width: document.querySelector('body').getBoundingClientRect().width}

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
          $scope.root.vars.remote_cache = [];
          $scope.root.vars.onboarding = false;
          $scope.root.vars.request_cache = {};
          $scope.root.vars.onboarding_cache = {};
          $scope.root.vars.guru_mode = $scope.user.guru_mode;
          $scope.static = {};
          $scope.static.nearest_universities = [];
          $scope.static.universities = [];



          $scope.logoutUser = function() {
            $localstorage.setObject('user', []);
            // $scope.user = null;;
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $timeout(function() {
              $scope.user = User.getLocal();
              $scope.user.updateAttr = User.updateAttrUser;
              $scope.user.createObj = User.createObj;
              $scope.user.updateObj = User.updateObj;
              $scope.success.show(0, 1500, 'You have been successfully logged out!');
              $timeout(function() {
                $ionicSideMenuDelegate.toggleRight();
              })
            }, 500);

            // $timeout(function(){
            //   $scope.$apply();
            // }, 500);

          }


          //check if local courses exists
          if (!$scope.root.vars.courses) {
            University.getCourses(2732).then(
                  function(courses) {
                      $scope.root.vars.courses = courses;
                      console.log(courses.length, 'courses successfully loaded');
                },
                  function(error) {
                      console.log('Courses NOT successfully loaded');
                      console.log(error);
                }
            );
          }

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
              // $timeout(function() {
              //   if ($scope.root.vars.loaderOn) {
              //     $scope.loader.hide();
              //     $scope.root.vars.loaderOn = false;
              //     $scope.success.show(0, 2000, 'Something went wrong. Please try again or contact support.');
              //   }
              // }, 10000);
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
]);
