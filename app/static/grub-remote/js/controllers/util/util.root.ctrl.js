angular.module('uguru.util.controllers')

.controller('RootController', [

    '$ionicPlatform',
    '$scope',
    '$state',
    '$localstorage',
    'User',
    'Version',
    '$ionicHistory',
    '$templateCache',
    '$ionicLoading',
    '$rootScope',
    '$cordovaPush',
    'University',
    '$cordovaSplashscreen',
    '$timeout',
    '$ionicSideMenuDelegate',
    '$ionicViewSwitcher',
    'DeviceService',
    'Utilities',
    'DownloadService',
    'PopupService',
    'KeyboardService',
    'ModalService',
    'Github',
    'LoadingService',
    'Food',
    function($ionicPlatform, $scope, $state, $localstorage, User, Version, $ionicHistory, $templateCache, $ionicLoading, $rootScope,
        $cordovaPush, University,
        $cordovaSplashscreen, $timeout,
        $ionicSideMenuDelegate, $ionicViewSwitcher, DeviceService,
         Utilities, DownloadService, PopupService,
         KeyboardService, ModalService, Github, LoadingService, Food) {

         var universityId = 2307;
         // Food.getFoodURL(universityId).then(function(data) {
         
         //     // Step 1: Retrieve && get static URL with rest of the data
         //     var foodUrl = JSON.parse(data).food_url;
         //     console.log("FOOD URL: ", foodUrl);
         //     // Step 2: Get all data
         //     Food.getAllFoodData(url).then(function(data) {
         //         console.log('WOOHOO WE HAVE DATA:' , data);
         //     }, function(err) {
         //         console.log(err);
         //     })
        
         //  }, function(err){
        
         //      // returns custom error of message of why there is no data.
         //     var errorResponse = JSON.parse(err.data).error;
         //     //try toggleing it to 2308, will throw an error && print below
         //     console.log('GET Food Data ERROR:',errorResponse);
         // });


        ModalService.init('university', $scope);
        ModalService.init('support', $scope);
        $scope.closeModal = function(modalName) {
            ModalService.close(modalName);
        };
        
        $scope.selectSettingsOption = function(option) {
            console.log("Selected settings option: " + option);
            switch(option) {

                case 'editUniversity':
                    ModalService.open('university');
                    break;

                case 'locationToggle':
                    break;

                case 'openSupport':
                    ModalService.open('support');
                    break;

                case 'clearSettings':
                    break;

                default:
                    break;

            }
        }

        $scope.saveSettings = function() {
            console.log("settings saved.");

        }


        var bodyRect;
        var windowHeight;
        var windowWidth;
        var initHeight = function() {
            bodyRect = document.querySelector('body').getBoundingClientRect();
            windowHeight = bodyRect.height;
            windowWidth = bodyRect.width;
        }

        initHeight();
        $scope.window = {
            width:windowWidth,
            height:windowHeight
        }

        console.log('Window size', $scope.window);

        // GABRIELLE TODO: Define these values
        var desktopHeightLimit = 699;
        var desktopWidthLimit= 767;

        $scope.isDesktopMode = function(height, width) {
            initHeight();
            height = height || windowHeight;
            width = width || windowWidth;
            return height > desktopHeightLimit && width > desktopWidthLimit;
        }

        $scope.desktopMode = $scope.isDesktopMode(windowHeight, windowWidth);

        // window.addEventListener('native.keyboardshow', keyboardShowHandler);
        // function keyboardShowHandler(e){
        //     console.log('native hardware keyboard is shown');
        //     KeyboardService.setDeviceKeyboardState(true);
        //     $scope.keyboardOpen = true;
        // }

        // window.addEventListener('native.keyboardhide', keyboardHideHandler);

        // function keyboardHideHandler(e){
        //     console.log('native hardware keyboard is hidden');
        //     KeyboardService.setDeviceKeyboardState(false);
        //     $scope.keyboardOpen = false;
        // }


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
        }



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
        $scope.user.grades = $scope.user.grades || [];
        $scope.user.User = User;
        $scope.user.categories = {academic:{}, freelancing:{}, baking:{},photography:{},household:{}, tech:{}, sports:{}, delivery:{}};
        $scope.popupScope = {};
        $scope.data = {};

        if ($scope.user && $scope.user.id) {
            User.getUserFromServer($scope, null, $state);
        }

        if (LOCAL) {
            $scope.img_base = 'remote/'
        } else {
            $scope.img_base = '';
        }




        $scope.rootUser = User;
        $scope.root = {};
        $scope.root.vars = {};
        $scope.root.vars.remote_cache = [];
        $scope.root.vars.onboarding = false;
        $scope.root.vars.request_cache = {};
        $scope.root.vars.onboarding_cache = {};
        $scope.root.vars.guru_mode = $scope.user.guru_mode;

        $scope.logoutUser = function(skipShowAlert) {
            if (skipShowAlert || confirm('Are you sure you want to log out?')) {
                  $scope.loader.show();
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
                        $scope.loader.showSuccess('You have been successfully logged out!', 2500);
                        // $state.go('^.university');
                        $ionicSideMenuDelegate.toggleLeft();
                  }, 1000);
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



        $scope.deleteProposalFromList = function(proposal, proposal_list) {
            for (i = 0; i < proposal_list.length; i++) {
                if (proposal_list[i].id === proposal.id) {
                    proposal_list.splice(i, i + 1);
                    return;
                }
            }
        }

        $scope.platform = {
            mobile: DeviceService.isMobile(),
            web: DeviceService.isWeb()
        }

        

        document.addEventListener("deviceready", function() {
            
            console.log('device is ready from the root controller');

            // ModalService.initGrubModal('filters', $scope);
            ModalService.initGrubModal('restaurant', $scope);

            // PopupService.initDefaults();
            DeviceService.readyDevice($scope);
            setTimeout(function() {
                DownloadService.testNetworkSpeed();
            }, 1000)
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

                $scope.loader.showSuccess('Connection Detected', 2000)
                $scope.transitionOfflineToOnline = true;
                $timeout(function() {
                    if ($scope.transitionOfflineToOnline) {
                        $scope.loader.showAmbig();
                        // fuck it if it hasn't been set false they are probably offline
                        $timeout(function() {
                            $state.go('^.offline');
                        }, 5000)
                    }
                }, 2000)
                var transitionToOnline = function() {
                    $timeout(function() {
                        $scope.loader.hide()
                        $scope.transitionOfflineToOnline = null;
                    }, 1000);
                    if ($scope.user && $scope.root.vars.guru_mode) {
                        $state.go('^.guru');
                    } else {
                        $state.go('^.home');
                    }
                }
                User.getUserFromServer($scope, transitionToOnline, $state);

            }, false);

            document.addEventListener("offline", function() {

                $scope.checkIfOnline = function() {
                    $scope.loader.showAmbig();
                    $timeout(function() {
                        //purposely showing the old one --> need to refactor to loader.fail..
                        $scope.loader.hide();
                        alert('Sorry - no connect detected! We miss you!');
                    }, 2000)
                }

                $state.go('^.offline');

            }, false);

            document.addEventListener("pause", function() {
                User.getUserFromServer($scope, null, $state);
            }, false);
        });


        //if previous in guru mode
        if ($scope.user && $scope.user.guru_mode) {

            $scope.loader.show();
            $ionicViewSwitcher.nextDirection('enter');
            if (LOCAL) {
                $state.go('^.' + _startpage);



        }
        else if ($scope.user && $scope.user.university_id) {
            $scope.loader.show();
            $ionicViewSwitcher.nextDirection('enter');
                $state.go('^.' + _startpage);


        }
        }



    }
]);