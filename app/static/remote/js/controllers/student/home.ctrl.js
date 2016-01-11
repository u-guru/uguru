angular.module('uguru.student.controllers', [])

//ALL student controllers
.controller('HomeController', [
    //All imported packages go here
    '$scope',
    '$state',
    '$ionicPlatform',
    '$cordovaStatusbar',
    '$ionicModal',
    '$timeout',
    '$q',
    'University',
    '$localstorage',
    '$ionicSideMenuDelegate',
    '$ionicBackdrop',
    '$ionicViewSwitcher',
    '$ionicActionSheet',
    '$ionicPopover',
    'uTracker',
    'AnimationService',
    'MapService',
    '$ionicSlideBoxDelegate',
    'DeviceService',
    'PopupService',
    'LoadingService',
    function($scope, $state, $ionicPlatform, $cordovaStatusbar,
        $ionicModal, $timeout, $q, University, $localstorage,
        $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
        $ionicActionSheet, $ionicPopover, uTracker, AnimationService, MapService, $ionicSlideBoxDelegate,
        DeviceService, PopupService, LoadingService) {

        if ($scope.desktopMode && $scope.autoRedirects) {
            LoadingService.showAmbig('Redirecting',1000);
            $ionicViewSwitcher.nextDirection('enter');
            $state.go('^.guru-home');
        }

        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSideMenuDelegate.enableSlide(false);

        $scope.user.is_a_guru = false;
        // var universityColor = $scope.user.university.school_color_one;


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

        //todo create service
        function initDesktopFunctions() {
            $scope.root.vars.showDesktopSettings = false;
            $scope.toggleDesktopSettings = function() {
                $scope.root.vars.showDesktopSettings = !$scope.root.vars.showDesktopSettings;
            }
        }

        if ($scope.isDesktopMode()) {
            initDesktopFunctions()
        }

        $scope.launchStudentCoursesModal = function() {
          $scope.guruCoursesModal.show();
          $timeout(function() {
            $scope.guruCoursesInput = document.querySelector('#course-input-2');
          }, 250)
        }

        // $scope.launchTaskVerbModal = function() {
        //     $timeout(function() {
        //         $scope.closeVerbModal();
        //     }, 500);
        //     $scope.taskVerbModal.show();
        // }

        $scope.hideTaskVerbModal = function() {
            $scope.taskVerbModal.hide();
            $ionicSlideBoxDelegate.update();
        }

        $scope.launchVerbModal = function() {
            $scope.verbModal.show();
        }



        var setStatusBarDarkText = function() {
            if (DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarText($state.current.name);
            }
        }

        var setStatusBarLightText = function() {

            if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {
                if (window.StatusBar) {
                  window.StatusBar.styleLightContent();
                }
            }

        }

        // $ionicModal.fromTemplateUrl(BASE + 'templates/availability.modal.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.availabilityModal = modal;
        // });

        // $scope.launchAvailabilityModal = function(index, verb_index) {

        //     uTracker.track(tracker, 'Request Modal');
        //     $scope.availabilityModal.show();
        // }

        $scope.closeRequestModal = function() {
            $scope.requestModal.hide();
            $ionicSlideBoxDelegate.update();
        }


        $scope.closeVerbModal = function() {
            $scope.verbModal.hide();
            $ionicSlideBoxDelegate.update();
        }

        $scope.goToBecomeGuru = function() {
            if (!$scope.user.university_id) {
                alert('Please add a university first!\n Settings > edit university');
                $scope.toggleRightSideMenu();
            } else {
                $scope.loader.showAmbig();
                $ionicViewSwitcher.nextDirection('forward');
                $state.go('^.become-guru')
            }


        }

        $scope.goToDesktopBecomeGuru = function() {
            LoadingService.showAmbig(null, 2000);
            $ionicSlideBoxDelegate.update();

            $timeout(function() {
                $ionicViewSwitcher.nextDirection('forward');

                $state.go('^.desktop-become-guru')
            }, 0);


        }


        $scope.launchWelcomeStudentPopup = function() {
            PopupService.init('welcomeStudent', 'home-uguru-popup');
            PopupService.open('welcomeStudent');
        }

        var checkOnboardingStatus = function() {

            var appOnboardingObj = $localstorage.getObject('appOnboarding');

            if (!appOnboardingObj || appOnboardingObj === {} || !appOnboardingObj.studentWelcome) {
                appOnboardingObj = {
                    studentWelcome: true
                }
                $scope.launchWelcomeStudentPopup();
                $localstorage.setObject('appOnboarding', appOnboardingObj);
            }
        }


        $scope.initStudentHomeMap = function() {
            var mapRenderCallback = function() {
                $scope.universityMapRendered = true;
            }
            // MapService.initStudentHomeMap($scope, mapRenderCallback);
        }

        $scope.$on('$ionicView.loaded', function() {
            $ionicSlideBoxDelegate.update();
            $scope.root.vars.guru_mode = false;
            if (!$scope.mapInitialized) {
                console.log('initializing map from load');
                $scope.mapInitialized = true;
            }
        });

        $scope.$on('$ionicView.afterLeave', function() {
            if (DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarLightText();
            }

        })

        $scope.$on('$ionicView.beforeEnter', function() {
            $ionicSlideBoxDelegate.update();
            $scope.universityMapRendered = false;
            if (DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarText($state.current.name);
            }

        })


        $scope.$on('$ionicView.enter', function() {
            $ionicSlideBoxDelegate.update();
        });
    }

]);
