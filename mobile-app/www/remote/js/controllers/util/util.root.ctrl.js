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
    function($ionicPlatform, $scope, $state, $localstorage, User,
        RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
        CordovaPushWrapper, $cordovaPush, University,
        $cordovaSplashscreen, $timeout, Geolocation,
        $ionicSideMenuDelegate, $ionicViewSwitcher, Major,
        Skill, Profession, $cordovaNgCardIO, DeviceService,
         Utilities, Category, DownloadService, PopupService,
         KeyboardService, ModalService, Github, LoadingService) {


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

        console.log('Window size', $scope.window);

        // GABRIELLE TODO: Define these values
        var desktopHeightLimit = 700;
        var desktopWidthLimit= 700;

        $scope.isDesktopMode = function(height, width) {
            initHeight();
            height = height || windowHeight;
            width = width || windowWidth;
            return height > desktopHeightLimit && width > desktopWidthLimit;
        };

        $scope.desktopMode = $scope.isDesktopMode(windowHeight, windowWidth);

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
                        if($scope.user.phone_email_token) return 'Send';
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
        $scope.user.User = User;
        $scope.user.categories = {academic:{}, freelancing:{}, baking:{},photography:{},household:{}, tech:{}, sports:{}, delivery:{}};
        $scope.popupScope = {};
        $scope.data = {};

        if ($scope.user && $scope.user.id) {
            User.getUserFromServer($scope, null, $state);
        }

        if (LOCAL) {
            $scope.img_base = 'remote/';
        } else {
            $scope.img_base = '';
        }



        $scope.getCategories = function(callback) {
            console.log('retrieving categories for id');
            Category.get().then(function(categories) {
                Category.categories = Utilities.sortArrObjByKey(categories.plain(), 'name');
                Category.mapActiveToSubcategories(Category.categories, $scope.user);


                $scope.categories = Category.categories.slice();
                callback && callback(Category.categories);
                console.log($scope.categories.length, 'categories loaded');

            },
            function() {
                console.log("Categories NOT successfully loaded");
            });
        };



        if (!Category.categories || Category.categories.length === 0) {
            console.log('Categories not local, loading now..');
            $timeout(function() {
                $scope.getCategories();
            }, 0);
        } else {
            console.log(Category.categories.length, 'categories loaded');
        }


        $scope.rootUser = User;
        $scope.root = RootService;
        $scope.root.vars = {};
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
                  // $scope.user = null;;
                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  //toggle in the middle
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
                        $ionicSideMenuDelegate.toggleRight();
                  }, 1000);
            }
        };

        sideMenuWidth =  document.querySelector('body').getBoundingClientRect().width * 0.80; 

        $scope.toggleRightSideMenu = function() {
            console.log("sideMenuWidth should be: " + sideMenuWidth);
            var sideMenu = document.querySelectorAll('ion-side-menu')[0];

            if (sideMenu.style.width === (sideMenuWidth + 'px')) {
                sideMenu.style.width = 0 + 'px';
            } else {
                sideMenu.style.width = sideMenuWidth + 'px';    
            }
            

            $ionicSideMenuDelegate.toggleRight();
            $timeout(function() {
                $scope.sideMenuActive = $ionicSideMenuDelegate.isOpen();
            }, 250);
        };


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
                    if ($scope.user && $scope.root.vars.guru_mode) {
                        $state.go('^.guru');
                    } else {
                        $state.go('^.home');
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
                $state.go('^.guru');
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
                $state.go('^.home');
            }
            $timeout(function() {
                LoadingService.hide();
            }, 1000);
        }



    }
]);