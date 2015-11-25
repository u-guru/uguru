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
    '$cordovaSplashscreen',
    '$timeout',
    'Geolocation',
    '$ionicSideMenuDelegate',
    '$ionicViewSwitcher',
    'Major',
    'Skill',
    'Profession',
    '$cordovaNgCardIO',
    'DeviceService',
    'Utilities',
    'Category',
    'DownloadService',
    'PopupService',
    'KeyboardService',
    'ModalService',
    'Github',
    'LoadingService',
    '$ionicSlideBoxDelegate',
    function($ionicPlatform, $scope, $state, $localstorage, User,
        RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
        CordovaPushWrapper, $cordovaPush, University,
        $cordovaSplashscreen, $timeout, Geolocation,
        $ionicSideMenuDelegate, $ionicViewSwitcher, Major,
        Skill, Profession, $cordovaNgCardIO, DeviceService,
         Utilities, Category, DownloadService, PopupService,
         KeyboardService, ModalService, Github, LoadingService,
         $ionicSlideBoxDelegate) {


        var bodyRect;
        var windowHeight;
        var windowWidth;
        var initHeight = function() {
            bodyRect = document.querySelector('body').getBoundingClientRect();
            windowHeight = bodyRect.height;
            windowWidth = bodyRect.width;
        };

        initHeight();
        $scope.window = {
            width:windowWidth,
            height:windowHeight
        };

        var adminResponsePayload = Utilities.isAdminRequest();
        if (adminResponsePayload) {
            var loginPayload = adminResponsePayload;
            User.login(loginPayload).then(function(user) {
                var processed_user = User.process_results(user.plain());
                User.assign_properties_to_root_scope($scope, processed_user);
                location.href = window.location.origin + window.location.pathname + window.location.hash;
            },
            function(err) {
                console.log(err);
            })
        };


        // GABRIELLE TODO: Define these values
        var desktopHeightLimit = 690;
        var desktopWidthLimit= 767;

        $scope.isDesktopMode = function(height, width) {
            initHeight();
            // height = height || windowHeight;
            // width = width || windowWidth;
            height = window.window.outerHeight;
            width = window.window.outerWidth;
            return height >= desktopHeightLimit && width >= desktopWidthLimit;
        };
        $scope.desktopMode = $scope.isDesktopMode(windowHeight, windowWidth) && !(navigator.userAgent.indexOf('iPad') > 0);

        if ($scope.desktopMode) {
            document.body.classList.add('desktop-view');
        }
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        function keyboardShowHandler(e){
            console.log('native hardware keyboard is shown');
            KeyboardService.setDeviceKeyboardState(true);
            $scope.keyboardOpen = true;
        }

        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        function keyboardHideHandler(e){
            console.log('native hardware keyboard is hidden');
            KeyboardService.setDeviceKeyboardState(false);
            $scope.keyboardOpen = false;
        }


        // if it exists, always show it until we've either updated, or checked for updates recently
        // if (!LOCAL && navigator.splashscreen && navigator.splashscreen.show) {
        //     navigator.splashscreen.show();
        // }



        $scope.LOCAL = LOCAL || false;
        $ionicPlatform.registerBackButtonAction(function(e) {
            var popup = document.querySelectorAll('.uguru-popup.show')[0];
            if(popup !== null && popup !== undefined) {
                console.log("found popup");
                popup.classList.remove('show');
                e.stopPropagation();

                e.preventDefault();
                return false;
            } else {
                console.log("no popup found");
                $ionicHistory.goBack(-1);
            }
        }, 101);

        $scope.isLocalServer = LOCAL || false;

        $scope.user = {};

        $scope.popupInput = {
            emailConfirm: '',
            phoneConfirm: '',
            codeConfirm: '',
            editName: '',
            editEmail: '',
            editPhone: '',
            editPasswordOld: '',
            editPasswordNew: ''
        };

        $scope.popup = {
            email_confirm: getButtonLabel('emailConfirm'),
            phone_confirm: getButtonLabel('phoneConfirm')
        };

        function getButtonLabel(popup) {
            switch(popup) {
                case 'emailConfirm':
                        if($scope.user.school_email_token) return 'Send Confirmation';
                        else return 'Resend Confirmation';
                    break;
                case 'phoneConfirm':
                        if(!$scope.user.phone_number_token) return 'Send';
                        else return 'Verify';
                    break;
                default: break;
            }
        }

        //how to make platform ready...
        $scope.user = User.getLocal();
        $scope.user.is_admin = typeof LOCAL !== "undefined" && LOCAL;
        $scope.user.updateAttr = User.updateAttrUser;
        $scope.user.createObj = User.createObj;
        $scope.user.clearAttr = User.clearAttr;
        $scope.user.updateObj = User.updateObj;

        if ($scope.user.profile_url === 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100') {
            $scope.user.profile_url = img_base + BASE + "img/avatar.svg";
        }
        $scope.user.User = User;
        $scope.user.categories = {academic:{}, freelancing:{}, baking:{},photography:{},household:{}, tech:{}, sports:{}, delivery:{}};
        $scope.popupScope = {};
        $scope.data = {};

        if ($scope.user && $scope.user.id) {
            User.getUserFromServer($scope, null, $state);
            if($scope.user.phone_number)
                $scope.popupInput.phoneConfirm = $scope.user.phone_number;
        }


        if (LOCAL) {
            $scope.img_base = 'remote/';
        } else {
            $scope.img_base = '';
        }

        $scope.getCoursesForUniversityId = function(uni_id, callback) {
            if (!uni_id) {
                return;
            }
            University.getPopularCourses(uni_id);
        };

        $scope.getMajorsForUniversityId = function(uni_id, callback) {
            console.log("university id: " + uni_id);
            University.getMajors(uni_id);
        }

        $scope.getCategories = function(callback) {
            console.log('retrieving categories for id');
            Category.get().then(function(categories) {
                Category.categories = Utilities.sortArrObjByKey(categories.plain(), 'name');

                if ($scope.user && $scope.user.id) {
                    Category.mapActiveToSubcategories(Category.categories, $scope.user);
                }


                $scope.categories = Category.categories.slice();
                callback && callback(Category.categories);
                console.log($scope.categories.length, 'categories loaded');

            },
            function() {
                console.log("Categories NOT successfully loaded");

            });

        };


        if ($scope.user.university && $scope.user.university_id) {
             University.getPopularCourses($scope.user.university_id, $scope);
             University.getMajors($scope.user.university_id, $scope);
        }


        var saveCategoriesToRootScope = function(categories) {
            $scope.categories = categories;
        }
        $scope.getCategories(saveCategoriesToRootScope)

        $scope.rootUser = User;
        $scope.root = RootService;
        $scope.root.vars = {};
        $scope.root.vars.page_cache = {};
        $scope.root.vars.remote_cache = [];
        $scope.root.vars.onboarding = false;
        $scope.root.vars.request_cache = {};
        $scope.root.vars.onboarding_cache = {};
        $scope.root.vars.guru_mode = $scope.user.guru_mode;

        $scope.logoutUser = function(skipShowAlert) {
            if (skipShowAlert || confirm('Are you sure you want to log out?')) {
                  LoadingService.show();
                  $localstorage.setObject('user', []);
                  $localstorage.set('access', false);
                  $localstorage.setObject('appOnboarding', null);

                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $timeout(function() {
                        $scope.user = User.getLocal();
                        $scope.user.majors = [];
                        $scope.user.university = null;
                        $scope.user.university_id = null;
                        $scope.user.guru_courses = null;
                        $scope.user.updateAttr = User.updateAttrUser;
                        $scope.user.createObj = User.createObj;
                        $scope.user.updateObj = User.updateObj;
                        $scope.root.vars.settings = {icons : {profile : true}};
                        LoadingService.showSuccess('You have been successfully logged out!', 2500);
                        $state.go('^.university');
                        if (!$scope.desktopMode) {
                            $ionicSideMenuDelegate.toggleRight();
                        }
                  }, 1000);
            }
        };


        sideMenuWidth =  document.querySelector('body').getBoundingClientRect().width * 0.80;

        $scope.toggleRightSideMenu = function() {
            if (DeviceService.isReady && DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarDarkText();
            }
            if (DeviceService.isReady && DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarDarkText();
            }
            $ionicSideMenuDelegate.toggleRight();
            console.log("sideMenuWidth should be: " + sideMenuWidth);
            var sideMenu = document.querySelectorAll('ion-side-menu')[0];
            var mainMenu = document.querySelectorAll('ion-side-menu-content')[0];
            console.log("Before",sideMenu.style.width);
            if (sideMenu.style.width === (sideMenuWidth + 'px')) {

                sideMenu.style.width = 0 + 'px';
            } else {
                sideMenu.style.width = sideMenuWidth + 'px';

            }
        };



        var isSideMenuOpen = function(ratio) {
            if (!ratio && ratio !== -1) {
                console.log('status bar is closing');
                $scope.sideMenuActive = false;

                if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {

                    window.StatusBar.styleDefault();

                }

            } else {
                console.log('status bar is opening');
                $scope.sideMenuActive = true;
                // $scope.sideMenuActive = true;

                if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {

                    window.StatusBar.styleLightContent();

                }

            }
            $ionicSlideBoxDelegate.update();
        }


        //UGH I HATE MY LIFE FUCK YOU IONIC
        var getIonicSideMenuOpenRatio = function() {

            var openRatio = $ionicSideMenuDelegate.getOpenRatio();
            return openRatio;
        }

        $scope.$watch(getIonicSideMenuOpenRatio, isSideMenuOpen);

        $scope.loader = {
            showMsg: function(message, delay, duration) {
                $ionicLoading.show({
                    template: '<span id="E2E-msg" class="capitalized" value="message">' + message + '</span>',
                    duration: duration || 2000,
                    delay:delay
                })
            },
            show: function() {
                $ionicLoading.show({

                    templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html'
                });
                $scope.root.vars.loaderOn = true;
            },
            customShow: function(velocity_args) {
                $ionicLoading.show({
                    scope:$scope,
                    templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
                });
                $timeout(function() {

                    $scope.root.vars.loaderOn = true;
                    var loaderContainer = document.querySelector('.loading-container');
                    var loaderDiv = document.querySelector('.loading-container .loading');
                    loaderDiv.style.opacity = 0 ; //set it to zero
                    loaderContainer.className += ' active visible';

                    $timeout(function() {
                        var cssOptions = {};
                        var animateOptions = {duration:2000};
                        var animationName = "transition.bounceIn";
                        Velocity(loaderDiv, cssOptions, animateOptions, animationName);
                    }, 500);

                }, 300)
            },
            showAmbig: function(text, duration) {
                $scope.ambigLoaderText = text || '';

                $ionicLoading.show({
                    scope: $scope,
                    templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
                    duration: duration || 1000
                });
                $scope.root.vars.loaderOn = true;
            },
            showFailure: function(text, duration) {
                $scope.ambigLoaderText = text || '';

                $ionicLoading.show({
                    scope: $scope,
                    templateUrl: BASE + 'templates/u.loader.failure.svg.html',
                    duration: duration || 1000
                });
                $scope.root.vars.loaderOn = true;
            },
            showSuccess: function(text, duration, callback) {

                $scope.successLoaderText = text || '';

                $ionicLoading.show({
                    scope: $scope,
                    templateUrl: BASE + 'templates/u.loader.success.svg.html',
                    duration: duration || 1000
                });
                $scope.root.vars.loaderOn = true;
                callback && callback();
            },
            updateSuccessText: function(text) {
                $scope.successLoaderText = text || 'loading'
            },
            hide: function(delay) {
                $scope.ambigLoaderText = '';
                delay = delay || 0;
                $timeout(function() {
                    $ionicLoading.hide();
                    $scope.root.vars.loaderOn = false;
                }, delay)
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
        };




        $scope.togglePaymentSideBarView = function() {
            $scope.root.vars.show_price_fields = !$scope.root.vars.show_price_fields;
            console.log('this was clicked');
            if ($scope.root.vars.show_price_fields) {
                $timeout(function() {

                    var sidebarInput = document.getElementById('card-input');

                    if ($scope.root.vars.price_modal_shown) {
                        $scope.root.vars.price_modal_shown = false;

                        sidebarInput.focus();

                    } else {
                        sidebarInput.focus();
                    }

                }, 1000);
            }
        };

        $scope.requestPushNotifications = function() {

            if (!$scope.user.push_notifications) {
                console.log('push notifications are false');

                payload = {
                    'push_notifications': false
                };
                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                return;
            }

            var iosConfig = {
                "badge": true,
                "sound": true,
                "alert": true,
            };

            $cordovaPush.register(iosConfig).then(function(deviceToken) {
                // Success -- send deviceToken to server, and store for future use
                console.log("deviceToken: " + deviceToken);

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
                    };
                    $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
                }

            }, function(err) {
                console.log(JSON.stringify(err));
                $scope.user.push_notifications = false;
                payload = {
                    'push_notifications': false,
                    'push_notifications_enabled': false
                };
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
        };

        $scope.getGrayNumber = function(num) {
            if (!num) {
                return new Array(5);
            }
            if (typeof(num) === "string") {
                num = parseInt(num) | 0;
            }
            arr = new Array(5 - num);
            return arr;
        };

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
        };

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
        };

        $scope.platform = {
            mobile: DeviceService.isMobile(),
            web: DeviceService.isWeb()
        };

        document.addEventListener("deviceready", function() {
            console.log('device is ready from the root controller');

            PopupService.initDefaults();
            DeviceService.readyDevice($scope);
            setTimeout(function() {
                DownloadService.testNetworkSpeed();
            }, 1000);
            $scope.platform.mobile = DeviceService.isMobile();
            $scope.platform.web = DeviceService.isWeb();

            if ($scope.platform && $scope.user) {
                $scope.user.current_device = DeviceService.getDevice();
                $scope.user.current_device.user_id = $scope.user.id;

                $scope.user.createObj($scope.user, 'device', $scope.user.current_device, $scope);
            }

            //update all new attribuets
            if ($scope.user && $scope.user.current_device) {
                $scope.user.updateObj($scope.user.current_device, 'device', $scope.user.current_device, $scope);
            }

            document.addEventListener("pause", function() {
                // console.log('device is paused...');
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
            }, false);

            document.addEventListener("resume", function() {
                console.log('device is resuming....');

                DownloadService.testNetworkSpeed();
                DeviceService.checkUpdates();
            }, false);

            document.addEventListener("online", function() {
                // is this desktop only?
                if (!$scope.platform.web)
                {
                    return;
                }

                LoadingService.showSuccess('Connection Detected', 2000);
                $scope.transitionOfflineToOnline = true;
                $timeout(function() {
                    if ($scope.transitionOfflineToOnline) {
                        LoadingService.showAmbig();
                        // fuck it if it hasn't been set false they are probably offline
                        $timeout(function() {
                            $state.go('^.offline');
                        }, 5000);
                    }
                }, 2000);
                var transitionToOnline = function() {
                    $timeout(function() {
                        LoadingService.hide();
                        $scope.transitionOfflineToOnline = null;
                    }, 1000);
                    if ($scope.desktopMode) {
                        $state.go('^.guru-home');
                    } else {
                        $state.go('^.guru');
                    }
                };
                User.getUserFromServer($scope, transitionToOnline, $state);

            }, false);

            document.addEventListener("offline", function() {

                $scope.checkIfOnline = function() {
                    LoadingService.showAmbig();
                    $timeout(function() {
                        //purposely showing the old one --> need to refactor to loader.fail..
                        LoadingService.hide();
                        alert('Sorry - no connect detected! We miss you!');
                    }, 2000);
                };

                $state.go('^.offline');

            }, false);

            document.addEventListener("pause", function() {
                User.getUserFromServer($scope, null, $state);
            }, false);
        });


        //if previous in guru mode
        if ($scope.user && $scope.user.guru_mode) {


            LoadingService.show();
            $ionicViewSwitcher.nextDirection('enter');
            if (LOCAL) {
                $state.go('^.' + _startpage);
            } else {
                if ($scope.desktopMode) {
                    $state.go('^.guru-home');
                } else {
                    $state.go('^.guru');
                }

            }

            $timeout(function() {
                LoadingService.hide();
            }, 1000);

        }
        else if ($scope.user && $scope.user.university_id) {
            LoadingService.show();
            $ionicViewSwitcher.nextDirection('enter');
            if (LOCAL) {
                $state.go('^.' + _startpage);
            } else {
                if ($scope.desktopMode) {
                    $state.go('^.guru-home');
                } else {
                    $state.go('^.guru');
                }
            }
            $timeout(function() {
                LoadingService.hide();
            }, 1000);
        }



    }
]);