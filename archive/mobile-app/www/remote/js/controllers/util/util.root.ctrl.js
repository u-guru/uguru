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
    'AnimationService',
    'CTAService',
    function($ionicPlatform, $scope, $state, $localstorage, User,
        RootService, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
        CordovaPushWrapper, $cordovaPush, University,
        $cordovaSplashscreen, $timeout, Geolocation,
        $ionicSideMenuDelegate, $ionicViewSwitcher, Major,
        Skill, Profession, $cordovaNgCardIO, DeviceService,
         Utilities, Category, DownloadService, PopupService,
         KeyboardService, ModalService, Github, LoadingService,
         $ionicSlideBoxDelegate, AnimationService, CTAService) {


        // if (DeviceService.isIOSBrowser()) {
        //     document.body.parentElement.style.webkitOverflowScrolling = 'touch !important;';
        // }

        $scope.root = RootService;
        $scope.root.vars = {};
        $scope.root.parallax = {};
        $scope.root.vars.getUserFromServer = User.getUserFromServer;
        Utilities.compileToAngular('body-loading-div', $scope);
        $scope.root.loader = {body: {hide:false}};

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
                console.error(err);
            })
        };


        // GABRIELLE TODO: Define these values
        var desktopHeightLimit = 690;
        var desktopWidthLimit= 767;

        $scope.isDesktopMode = function(height, width) {
            initHeight();
            // height = height || windowHeight;
            // width = width || windowWidth;
            // var height = window.window.innerHeight || window.window.outerHeight;
             height = window.window.innerHeight || window.window.outerHeight;
             width = window.window.innerWidth || window.window.outerWidth;
            return height >= desktopHeightLimit && width >= desktopWidthLimit;
        };
        $scope.desktopMode = $scope.isDesktopMode(windowHeight, windowWidth) && !(navigator.userAgent.indexOf('iPad') > 0);

        if ($scope.desktopMode) {
            $ionicSideMenuDelegate.canDragContent(false);
        }

        if ($scope.desktopMode) {
            document.body.classList.add('desktop-view');
        }
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        function keyboardShowHandler(e){
            KeyboardService.setDeviceKeyboardState(true);
            $scope.keyboardOpen = true;
        }

        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        function keyboardHideHandler(e){
            KeyboardService.setDeviceKeyboardState(false);
            $scope.keyboardOpen = false;
        }

        var stateBeforeOrientation;
        if (!$scope.desktopMode) {
            window.addEventListener("orientationchange", function() {
                initHeight();
                $scope.window = {
                    width:windowWidth,
                    height:windowHeight
                };
                //mobile + horizontal
                if (!$scope.desktopMode && $scope.window.height < $scope.window.width && $state.current.name !== 'root.orientation') {
                    stateBeforeOrientation = $state.current.name;
                    $state.go('^.orientation');
                }

                if (!$scope.desktopMode && $scope.window.width < $scope.window.height && $state.current.name === 'root.orientation') {
                    LoadingService.showSuccess('Thank You', 1000, function() {
                        if (!stateBeforeOrientation) {
                            $state.go('^.home');
                        } else {
                            $state.go('^.' + stateBeforeOrientation.split('.')[1]);
                        }
                    })
                }
            // Announce the new orientation number
            }, false);
        }


        // if it exists, always show it until we've either updated, or checked for updates recently
        // if (!LOCAL && navigator.splashscreen && navigator.splashscreen.show) {
        //     navigator.splashscreen.show();
        // }



        $scope.LOCAL = LOCAL || false;
        $scope.autoRedirects = _autoredirects || false;
        $ionicPlatform.registerBackButtonAction(function(e) {
            var popup = document.querySelectorAll('.uguru-popup.show')[0];
            if(popup !== null && popup !== undefined) {
                popup.classList.remove('show');
                e.stopPropagation();

                e.preventDefault();
                return false;
            } else {
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
            $scope.img_base = '/static/remote/';
        }

        if (window.location.hostname.indexOf('hs') > -1 || window.location.pathname.indexOf('hs') > -1) {
          $scope.img_base = 'https://uguru.me/static/remote/';

          // BASE = '/static/';
        }

        $scope.getCoursesForUniversityId = function(uni_id, callback) {
            if (!uni_id) {
                return;
            }
            University.getPopularCourses(uni_id);
        };

        $scope.getMajorsForUniversityId = function(uni_id, callback) {
            University.getMajors(uni_id);
        }

        $scope.getCategories = function(callback) {
            Category.get().then(function(categories) {
                Category.categories = Utilities.sortArrObjByKey(categories.plain(), 'name');
                if ($scope.user && $scope.user.id) {
                    Category.mapActiveToSubcategories(Category.categories, $scope.user);
                }


                $scope.categories = Category.categories.slice();
                for (var i = 0; i < $scope.categories.length; i++) {
                    var indexCategory = $scope.categories[i];
                    if (indexCategory.id === 4) {
                        $scope.categories[i].name = 'Tech';
                    }
                }
                callback && callback(Category.categories);

            },
            function() {
                console.error("Categories NOT successfully loaded");

            });

        };


        // if ($state.current.name !== 'root.universities') {
        //     if (($scope.university && $scope.university.id)) {
        //         University.getPopularCourses($scope.university.id, $scope);
        //         University.getMajors($scope.university.id, $scope);
        //     } else if ($scope.user.university && $scope.user.university_id) {
        //         University.getPopularCourses($scope.user.university_id, $scope);
        //         University.getMajors($scope.user.university_id, $scope);
        //     }
        // }


        // var saveCategoriesToRootScope = function(categories) {

        //     $scope.categories = categories.filter(function(category, index) {
        //       return category.is_active;
        //     })
        // }
        // $scope.getCategories(saveCategoriesToRootScope)

        $scope.rootUser = User;


        if (window.location.hash.indexOf('essay') > -1 || window.location.hash.indexOf('hs') > -1 || $scope.user.hs_student) {
            $scope.root.vars.hs_mode = true;
        }

        //create indepedent thread since blocking fun
        $timeout(function() {
            $scope.root.vars.page_cache = $localstorage.getObject('page_cache') || {};
        }, 0)

        $scope.root.vars.remote_cache = [];
        $scope.root.vars.onboarding = false;
        $scope.root.vars.request_cache = {};
        $scope.root.vars.onboarding_cache = {};
        $scope.root.vars.guru_mode = $scope.user.guru_mode;

        $scope.logoutUser = function(skipShowAlert) {
            if ($scope.desktopMode) {
                $scope.root.vars.showDesktopSettings = false;
            }
            if (skipShowAlert || confirm('Are you sure you want to log out?')) {
                  LoadingService.show();
                  $localstorage.setObject('user', []);
                  $localstorage.set('access', false);
                  $localstorage.setObject('appOnboarding', null);
                  $localstorage.setObject('page_cache', null);
                  LoadingService.showAmbig(null, 10000);
                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  var tempUniversity = $scope.user.university;
                  $timeout(function() {
                        $scope.user = User.getLocal();
                        $scope.user.majors = [];
                        $scope.user.guru_subcategories = [];
                        $scope.user.university = null;
                        $scope.user.university_id = null;
                        $scope.user.guru_courses = null;
                        $scope.user.updateAttr = User.updateAttrUser;
                        $scope.user.createObj = User.createObj;
                        $scope.user.updateObj = User.updateObj;
                        $scope.root.vars.settings = {icons : {profile : true}};

                        LoadingService.showSuccess('You have been successfully logged out!', 2500);
                        if ($state.current.name === 'root.splash') {
                            var modalElemSidebar = document.querySelector('#cta-modal-sidebar');
                            modalElemSidebar && modalElemSidebar.classList.remove('show');
                            CTAService.closeCTAManually('#cta-box-sidebar');
                            return;
                        }
                        $timeout(function() {
                            if (!$scope.desktopMode) {
                                $scope.toggleRightSideMenu();
                            }
                            if (!tempUniversity) {
                                AnimationService.flip('^.splash');
                            } else {
                                $timeout(function() {
                                    $scope.root.vars.university = tempUniversity;
                                    $scope.user.university = tempUniversity;
                                    $scope.selectedUniversity = tempUniversity;
                                    $localstorage.setObject('university', tempUniversity);
                                    var category = {name: 'Academic', id:5, hex_color:'academic'};
                                    AnimationService.flip('^.splash', {}, {categoryId:category.id, category:category, universityId:tempUniversity.id, university:tempUniversity});
                                }, 2000)
                            }
                        }, 1000)

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
            var sideMenu = document.querySelectorAll('ion-side-menu')[0];
            var mainMenu = document.querySelectorAll('ion-side-menu-content')[0];
            if (sideMenu.style.width === (sideMenuWidth + 'px')) {

                sideMenu.style.width = 0 + 'px';
            } else {
                sideMenu.style.width = sideMenuWidth + 'px';

            }
        };


        $timeout(function() {
            if (!$scope.desktopMode && $state.current.name !== 'root.splash') {
                var isSideMenuOpen = function(ratio) {
            if (!ratio && ratio !== -1) {
                $scope.sideMenuActive = false;

                if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {

                    window.StatusBar.styleDefault();

                }

                } else {
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
            }
        }, 500);


        $scope.loader = {
            showMsg: function(message, delay, duration) {
                $ionicLoading.show({
                    template: '<span id="E2E-msg" class="capitalized">' + message + '</span>',
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
                if ($scope.platform.ios) {
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
                // $scope.success.show(0, 2000, 'Loading courses. One moment...');
                // $timeout(function() {
                //     $scope.checkCourses();
                // }, 2000);
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
                // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
            }, false);

            document.addEventListener("resume", function() {
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


        if ($state.current.name !== 'root.home') {
            $timeout(function() {
                $scope.root.loader.body.hide = true;
            }, TIMEOUT_UNTIL_END_OF_LOADER);
        }



    }
]);