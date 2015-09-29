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
    '$cordovaDevice',
    '$cordovaNetwork',
    '$cordovaNgCardIO',
    'DeviceService',
    'Utilities',
    function($ionicPlatform, $scope, $state, $localstorage, User,
        RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
        CordovaPushWrapper, $cordovaPush, University, $cordovaStatusbar,
        $cordovaSplashscreen, $timeout, Geolocation, $cordovaPush,
        $ionicSideMenuDelegate, $ionicViewSwitcher, $cordovaGeolocation, Major,
        Skill, Profession, $cordovaDevice, $cordovaNetwork, $cordovaNgCardIO, DeviceService, Utilities) {

        // console.log('1. checking for app updates\n');
        // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage)
        $scope.static = {
            skills: [],
            majors: [],
            professions: [],
            universities: []
        }

        $scope.isLocalServer = LOCAL || false;

        $scope.network_speed = null;
        $scope.window = {
            width: document.querySelector('body').getBoundingClientRect().width
        }

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

        $rootScope.on_app_open_retrieve_objects = function($scope, $state, $localstorage,
            University, callback, Geolocation, Major, Skill, Profession) {
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

            Major.get().then(
                function(majors) {
                    console.log('Majors successfully loaded');
                    majors = JSON.parse(majors)["majors"];

                    $scope.static.majors = majors;
                    $localstorage.setObject('majors', majors);
                    $scope.static.popular_majors = majors.slice(0, 16);
                    $localstorage.setObject('popular_majors', $scope.static.popular_majors);
                },
                function() {
                    console.log('Majors NOT successfully loaded');
                }
            );

            Skill.get().then(function(skills) {
                    var skills = skills.plain();
                    $scope.static.skills = skills;
                    $localstorage.setObject('skills', skills);
                    $scope.static.popular_skills = skills.slice(0, 16);
                    $localstorage.setObject('popular_skills', $scope.static.popular_skills);
                    processSkills($scope);

                },
                function() {
                    console.log('Skills NOT successfully loaded');
                })

            Profession.get().then(function(professions) {
                    var professions = professions.plain();
                    $scope.static.professions = professions;
                    $scope.static.popular_professions = professions.slice(0, 16);
                    $localstorage.setObject('professions', $scope.static.professions);
                    $localstorage.setObject('popular_professions', $scope.static.popular_professions);
                    console.log(professions.length, 'professions loaded')
                },
                function() {
                    console.log('professions NOT successfully loaded');
                })

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

                    if (navigator && navigator.splashscreen && navigator.splashscreen.show) {
                        navigator.splashscreen.show();
                    }

                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $templateCache.removeAll();

                    // window.localStorage.clear();
                    //remove all angular templates

                    $localstorage.setObject('version', $scope.root.vars.version);
                    console.log('updating version to', serverVersionNumber, '...');

                    if (navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent === 'Win32NT' || WINDOWS) {
                        window.location.replace(BASE_URL);
                    } else {
                        window.location = BASE_URL;
                        window.location.reload(true);
                    }

                }



                $localstorage.setObject('version', $scope.root.vars.version);

            },
            function(err) {
                console.log(err);
            })





          $scope.logoutUser = function(showAlert) {
            if (showAlert || confirm('Are you sure you want to log out?')) {
              if ($scope.settings && $scope.settings.icons) {
                $scope.settings.icons.profile = false;
              }
              $scope.loader.show();
              $localstorage.setObject('user', []);
              $localstorage.setObject('appOnboarding', null);
              // $scope.user = null;;
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              //toggle in the middle
              $timeout(function() {
                $scope.loader.hide();
                $scope.user = User.getLocal();
                $scope.user.updateAttr = User.updateAttrUser;
                $scope.user.createObj = User.createObj;
                $scope.user.updateObj = User.updateObj;
                $scope.root.vars.settings = {icons : {profile : true}};
                $scope.success.show(500, 2000, 'You have been successfully logged out!');
                $timeout(function(){
                  $ionicSideMenuDelegate.toggleRight();
                  $state.go('^.university');
                }, 600)
              }, 2000);


            }
        }




        //check if local courses exists
        if (!$scope.root.vars.courses) {
            University.getCourses(2732).then(
                function(courses) {
                    $localstorage.setObject('courses', courses);
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
            console.log('this is called');
            $ionicSideMenuDelegate.toggleRight();
            $timeout(function() {
                $scope.sideMenuActive = $ionicSideMenuDelegate.isOpen();
            }, 250);
        };



        console.log('getting most up to date universities + user from server..')
        var local_universities = $localstorage.getObject('universities');
        if (!local_universities || local_universities.length === 0) {

            User.getUserFromServer($scope, null, $state);
            $scope.on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
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
            $scope.on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
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
            $scope.on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
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
            $scope.on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
                Major, Skill, Profession);
        } else {
            $scope.static.professions = local_professions;
            $scope.static.popular_professions = local_popular_professions;
            console.log('professions already loaded');
        }

        $scope.loader = {
            show: function() {
                $ionicLoading.show({

                    templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html'
                });
                $scope.root.vars.loaderOn = true;
            },
            showAmbig: function() {
                $ionicLoading.show({
                    scope:$scope,
                    templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html'
                });
                $scope.root.vars.loaderOn = true;
            },
            showSuccess: function(text, duration) {

                $scope.successLoaderText = text || '';

                $ionicLoading.show({
                    scope: $scope,
                    templateUrl: BASE + 'templates/u.loader.success.svg.html',
                    duration: duration || 1000
                });
                $scope.root.vars.loaderOn = true;
            },
            hide: function() {
                $ionicLoading.hide();
                $scope.root.vars.loaderOn = false;
            }
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
                    $scope.user.updateObj($scope.user.current_device, 'device', $scope.user.current_device, $scope);

                    payload = {
                        'push_notifications': true,
                        'push_notifications_enabled': true
                    }
                    $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                }

            }, function(err) {
                console.log(JSON.stringify(err));
                $scope.user.push_notifications = false;
                payload = {
                    'push_notifications': false,
                    'push_notifications_enabled': false
                }
                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                alert('Please turn your Push Notifications ON in your settings.');
            });
        };

        //returns empty array of length
        $scope.getNumber = function(num) {
            if (!num) {
                return new Array(0);
            }
            if (typeof(num) === "string") {
                num = parseInt(num) | 0;
            }
            arr = new Array(num);
            return arr;
        }

        $scope.getGrayNumber = function(num) {
            if (!num) {
                return new Array(5);
            }
            if (typeof(num) === "string") {
                num = parseInt(num) | 0;
            }
            arr = new Array(5 - num);
            return arr;
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
            for (i = 0; i < proposal_list.length; i++) {
                if (proposal_list[i].id === proposal.id) {
                    proposal_list.splice(i, i + 1);
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
                    template: '<span id="E2E-msg" value="' + message + '" class="capitalized">' + message + '</span>',
                    delay: delay,
                    duration: duration
                });
            },
            hide: function() {
                $ionicLoading.hide();
            }
        }

        $scope.platform = {
            mobile: false,
            web: true,
            device: false,
            android: false,
            ios: false
        }

        DeviceService.readyDevice();

        document.addEventListener("deviceready", function() {

            $scope.platform.mobile = DeviceService.isMobile();
            $scope.platform.web = DeviceService.isWeb();
            $scope.platform.device = DeviceService.getDevice();

            if (DeviceService.getPlatform() === 'ios') {
              console.log('root.check', 'ios');
            }

            console.log('device is ready from the root controller');


            if ($scope.platform && $scope.user) {
                $scope.user.current_device = $scope.platform.device;
                $scope.user.current_device.user_id = $scope.user.id;
                if ($cordovaNetwork) {
                    $rootScope.network_speed = Utilities.getNetworkSpeed();
                    $scope.user.current_device.network_speed = $rootScope.network_speed;
                    console.log('network speed is currently', $rootScope.network_speed);
                    console.log('2. grabbing network speed which is: ', $rootScope.network_speed, '\n\n');
                }

                $scope.user.createObj($scope.user, 'device', $scope.user.current_device, $scope);
            }

            switch ($scope.platform.device) {

                case "android":
                    var androidConfig = {
                        "senderID": "413826461390",
                        'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                    }
                    $cordovaPush.register(androidConfig).then(function(deviceToken) {
                        console.log('android notifications', deviceToken);
                    }, function(err) {
                        console.log(err);
                    });
                    console.log('Extra #2. Android push notifications need to be registered')
                        // $rootScope.$on('pushNotificationReceived', function(event, notification) {
                        //   CordovaPushWrapper.received($rootScope, event, notification);
                        //   console.log('android notifications registered',event, notification);
                        //   if ($scope.user && $scope.user.id) {
                        //     payload = {
                        //       'push_notifications': true,
                        //       'push_notifications_enabled': true
                        //     }
                        //     $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);

                    //   }
                    // });
                    //grab geolocation super early for android devices
                    on_app_open_retrieve_objects($scope, $state, $localstorage, University, null, Geolocation,
                        Major, Skill, Profession);
                    break;

                case "windows":
                    if ($cordovaPush) {
                        console.log('we are updating the push notifications on windows device');
                        $cordovaPush.register(channelHandler, errorHandler, {
                            "channelName": "123723560",
                            "ecb": "onNotificationWP8",
                            "uccb": "channelHandler",
                            "errcb": "jsonErrorHandler"
                        });

                        function channelHandler(event) {
                            var uri = event.uri;
                            CordovaPushWrapper.received($rootScope, event, notification);
                            if ($scope.user && $scope.user.id) {
                                payload = {
                                    'push_notifications': true,
                                    'push_notifications_enabled': true
                                }
                                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                            }
                        }

                        function errorHandler(error) {
                            // document.getElementById('app-status-ul').appendChild(document.createElement(error));
                            console.log("Error Handle :", error);
                        }

                        function onNotificationWP8(e) {
                            if (e.type == "toast" && e.jsonContent) {
                                pushNotification.showToastNotification(successHandler, errorHandler, {
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
            }

            //update all new attribuets
            if ($scope.user && $scope.user.current_device) {
                $scope.user.updateObj($scope.user.current_device, 'device', $scope.user.current_device, $scope);
            }

        });


        document.addEventListener("deviceready", function() {

            document.addEventListener("resume", function() {

                // console.log('device is resuming....');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
                // console.log('device resumed');
                local_version = $localstorage.getObject('version');
                Version.getUpdatedVersionNum().then(
                    //if user gets the right version
                    function(response) {
                        var serverVersionNumber = parseFloat(JSON.parse(response).version);
                        $scope.root.vars.version = serverVersionNumber;


                        console.log('server', serverVersionNumber, typeof(serverVersionNumber));
                        console.log('local', local_version, typeof(local_version));

                        if (local_version !== serverVersionNumber) {

                            if (navigator && navigator.splashscreen && navigator.splashscreen.show) {
                                navigator.splashscreen.show();
                            }

                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                            $templateCache.removeAll();

                            Version.setVersion(serverVersionNumber);
                            $localstorage.set('recently_updated', true);

                            // window.localStorage.clear();
                            //remove all angular templates

                            $localstorage.setObject('version', $scope.root.vars.version);
                            console.log('updating version to', serverVersionNumber, '...');

                            //if windows
                            if (navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent === 'Win32NT' || WINDOWS) {
                                window.location.replace(BASE_URL);
                            } else {
                                window.location = BASE_URL;
                                window.location.reload(true);
                            }

                        } else {
                            User.getUserFromServer($scope, null, $state);
                        }



                        $localstorage.setObject('version', $scope.root.vars.version);

                    },
                    function(err) {
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




        //if previous in guru mode
          if ($scope.user && $scope.user.guru_mode) {

            $scope.loader.show();

            $state.go('^.' + _startpage)

            $timeout(function() {
                $scope.loader.hide();
            }, 1000);

        } else if ($scope.user && $scope.user.university_id) {
            $scope.loader.show();
            $ionicViewSwitcher.nextDirection('enter');
            $state.go('^.' + _startpage);
            $timeout(function() {
                $scope.loader.hide();
            }, 1000);
        }



    }
]);