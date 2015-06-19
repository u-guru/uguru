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
  '$ionicViewSwitcher',
  '$cordovaGeolocation',
  'Major',
  'Skill',
  'Profession',
  function($ionicPlatform, $scope, $state, $localstorage, User,
          RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
          CordovaPushWrapper, $cordovaPush, University, $cordovaStatusbar,
          $cordovaSplashscreen, $timeout, Geolocation, $cordovaPush,
          $ionicSideMenuDelegate, $ionicViewSwitcher, $cordovaGeolocation, Major,
          Skill, Profession) {

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



          local_version = $localstorage.getObject('version');
          Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                var serverVersionNumber = parseFloat(JSON.parse(response).version);
                $scope.root.vars.version = serverVersionNumber;


                console.log('server', serverVersionNumber, typeof(serverVersionNumber));
                console.log('local', local_version, typeof(local_version));

                if (local_version !== serverVersionNumber) {
                      if ($scope.platform.mobile && $cordovaSplashscreen && $cordovaSplashscreen.show) {
                        $cordovaSplashscreen.show();
                      }

                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      $templateCache.removeAll();

                      // window.localStorage.clear();
                      //remove all angular templates

                      $localstorage.setObject('version', $scope.root.vars.version);
                      console.log('updating version to', serverVersionNumber, '...');

                      window.location = BASE_URL;
                      window.location.reload(true);

                }



                $localstorage.setObject('version', $scope.root.vars.version);

              }, function(err) {
                console.log(err);
              })




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
              $timeout(function() {
                $state.go('^.onboarding');
              }, 1000);
            }, 500);
          }




          //check if local courses exists
          if (!$scope.root.vars.courses) {
            University.getCourses(2732).then(
                  function(courses) {
                      $scope.root.vars.courses = courses;
                      $scope.root.vars.popular_courses = $scope.root.vars.courses.slice(0, 16);
                      $scope.static.courses = $scope.root.vars.courses;
                      $scope.static.popular_courses = $scope.root.vars.popular_courses;

                },
                  function(error) {
                      console.log('Courses NOT successfully loaded');
                      console.log(error);
                }
            );
          }

          $scope.toggleRightSideMenu = function() {
            $ionicSideMenuDelegate.toggleRight();
          };

          console.log('getting most up to date universities + user from server..')
          var local_universities = $localstorage.getObject('universities');
          if (!local_universities || local_universities.length === 0) {

            User.getUserFromServer($scope, null, $state);
            on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
              Major, Skill, Profession);
          } else {
            $scope.static.universities = $localstorage.getObject('universities')
            if ($scope.static.universities && $scope.static.universities.length > 0) {
              console.log('universities already loaded');
            } else {
              console.log('something funky is going on...')
            }
          }

          var local_majors = $localstorage.getObject('majors');
          var local_popular_majors = $localstorage.getObject('popular_majors');
          if (!local_majors || local_majors.length === 0 || !local_popular_majors || local_popular_majors.length === 0) {
            console.log('getting majors');
            on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
              Major, Skill, Profession);
          } else {
            $scope.root.vars.majors = local_majors;
            $scope.static.majors = local_majors;
            $scope.static.popular_majors = local_popular_majors;
            console.log(local_majors.length, 'majors already loaded');
          }

          var local_skills = $localstorage.getObject('skills');
          var local_popular_skills = $localstorage.getObject('local_popular_skills');
          if (!local_skills || local_skills.length === 0) {
            on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
              Major, Skill, Profession);
          } else {
            $scope.static.skills = local_skills;
            $scope.static.popular_skills = local_popular_skills;
            processSkills($scope);
            console.log('skills already loaded');
          }

          var local_professions = $localstorage.getObject('professions');
          var local_popular_professions = $localstorage.getObject('local_professions');
          if (!local_professions || local_professions.length === 0) {
            on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
              Major, Skill, Profession);
          } else {
            $scope.static.professions = local_professions;
            $scope.static.popular_professions = local_popular_professions;
            console.log('professions already loaded');
          }




          $scope.loader = {
            show: function() {
              $ionicLoading.show({
                template: '<ion-spinner icon="lines" class="spinner-positive"></ion-spinner>'
              });
              $scope.root.vars.loaderOn = true;
            },
            hide: function(){
              $ionicLoading.hide();
              $scope.root.vars.loaderOn = false;
            }
          }

          //if previous in guru mode
          if ($scope.user.guru_mode) {

            $scope.loader.show();
            $ionicViewSwitcher.nextDirection('enter');
            $state.go('^.guru');
            $timeout(function() {
              $scope.loader.hide();
            }, 1000);

          }
          else if ($scope.user && $scope.user.university_id) {
            $scope.loader.show();
            $ionicViewSwitcher.nextDirection('enter');
            $state.go('^.home');
            $timeout(function() {
              $scope.loader.hide();
            }, 1000);
          }


          $scope.doRefresh = function(repeat) {
            $scope.root.vars.user_refresh = true;
            if ($scope.root.vars.user_refresh || !repeat) {

              User.getUserFromServer($scope, null, $state);
              if (repeat) {
                $scope.root.vars.user_refresh = false;
              }
            }
          }



          $scope.togglePaymentSideBarView = function() {
            $scope.root.vars.show_price_fields = !$scope.root.vars.show_price_fields;
            console.log('this was clicked');
            if ($scope.root.vars.show_price_fields) {
              $timeout(function() {

                if ($scope.root.vars.price_modal_shown) {
                  $scope.root.vars.price_modal_shown = false;
                  var sidebar_input = document.getElementById('card-input');
                  document.getElementsByClassName('sidebar-card-input')

                  sidebar_input.focus();

                } else {
                  var sidebar_input = document.getElementById('card-input');

                  sidebar_input.focus();
                }

              }, 1000);
            }
          }

          $scope.requestPushNotifications = function() {

              if (!$scope.user.push_notifications) {
                console.log('push notifications are false');

                payload = {
                      'push_notifications': false
                    }
                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                return;
              }

              var iosConfig = {
                  "badge": true,
                  "sound": true,
                  "alert": true,
              }

              $cordovaPush.register(iosConfig).then(function(deviceToken) {
                // Success -- send deviceToken to server, and store for future use
                console.log("deviceToken: " + deviceToken)

                console.log("Register success " + deviceToken);


                if ($scope.platform.ios) {
                  console.log('updating the server...');
                    $scope.user.push_notifications = true;
                    $scope.user.current_device.push_notif = deviceToken;
                    $scope.user.current_device.push_notif_enabled = true;
                    $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);

                    payload = {
                      'push_notifications': true
                    }
                    $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                }

              }, function(err) {
                console.log(JSON.stringify(err));
                $scope.user.push_notifications = false;
                payload = {
                      'push_notifications': false
                    }
                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                alert('Please turn your Push Notifications ON in your settings.');
              });
            };

          //returns empty array of length
          $scope.getNumber = function(num) {
            return new Array(num);
          }

          $scope.checkCourses = function() {
            var is_courses_loaded = $scope.root.vars && $scope.root.vars.courses && $scope.root.vars.courses.length > 0;
            if (is_courses_loaded) {
              $ionicViewSwitcher.nextDirection('fade');
              $state.go('^.guru-courses');
            } else {
              $scope.success.show(0, 2000, 'Loading courses. One moment...');
              $timeout(function() {
                $scope.checkCourses();
              }, 2000);
            }
          };

           $scope.deleteProposalFromList = function(proposal, proposal_list) {
              for(i = 0; i < proposal_list.length; i++) {
                if(proposal_list[i].id === proposal.id) {
                  proposal_list.splice(i, i+1);
                  return;
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

            if ($scope.platform.mobile && $cordovaSplashscreen && $cordovaSplashscreen.hide) {
              $cordovaSplashscreen.hide();
            }

            if ($scope.platform.android) {

                  var androidConfig = {
                    "senderID": "413826461390",
                    'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                  }

                  $cordovaPush.register(androidConfig).then(function(deviceToken) {

                    console.log('android notifications');

                  }, function(err){

                    console.log(err);

                  });

                  console.log('Extra #2. Android push notifications need to be registered')
                  $rootScope.$on('pushNotificationReceived', function(event, notification) {
                    CordovaPushWrapper.received($rootScope, event, notification);
                    console.log('android notifications registered',event, notification);
                  });

                  //grab geolocation super early for android devices
                  on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
                    Major, Skill, Profession);

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


            $scope.toggleLightStatusBar = function() {


              if (window.StatusBar) {
                StatusBar.styleLightContent();
              }

            }

            document.addEventListener("resume", function() {

                // console.log('device is resuming....');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('device resumed');

                Version.getUpdatedVersionNum().then(
              //if user gets the right version
                    function(response) {
                      var serverVersionNumber = parseFloat(JSON.parse(response).version);
                      $scope.root.vars.version = serverVersionNumber;


                      console.log('server', serverVersionNumber, typeof(serverVersionNumber));
                      console.log('local', local_version, typeof(local_version));

                      if (local_version !== serverVersionNumber) {
                            if ($scope.platform.mobile && $cordovaSplashscreen && $cordovaSplashscreen.show) {
                              $cordovaSplashscreen.show();
                            }

                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                            $templateCache.removeAll();

                            // window.localStorage.clear();
                            //remove all angular templates

                            $localstorage.setObject('version', $scope.root.vars.version);
                            console.log('updating version to', serverVersionNumber, '...');

                            window.location = BASE_URL;
                            window.location.reload(true);

                      } else {
                        User.getUserFromServer($scope, null, $state);
                      }



                      $localstorage.setObject('version', $scope.root.vars.version);

                    }, function(err) {
                      console.log(err);
                    })

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
