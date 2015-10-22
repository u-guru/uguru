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
    function($scope, $state, $ionicPlatform, $cordovaStatusbar,
        $ionicModal, $timeout, $q, University, $localstorage,
        $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
        $ionicActionSheet, $ionicPopover, uTracker, AnimationService, MapService, $ionicSlideBoxDelegate,
        DeviceService, PopupService) {

        $ionicSideMenuDelegate.canDragContent(false);



        // $ionicModal.fromTemplateUrl(BASE + 'templates/student.courses.modal.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.guruCoursesModal = modal;
        // })

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

        //UGH I HATE MY LIFE FUCK YOU IONIC
        var getIonicSideMenuOpenRatio = function() {
            var openRatio = $ionicSideMenuDelegate.getOpenRatio();
            $ionicSlideBoxDelegate.update();
            return openRatio;
        }
        var isSideMenuOpen = function(ratio) {
            if (!ratio && ratio !== -1) {
                $scope.sideMenuActive = false;
                $ionicSlideBoxDelegate.update();
            } else {
                $timeout(function() {
                    $scope.sideMenuActive = true;
                }, 250)
                $ionicSlideBoxDelegate.update();
            }
        }
        $scope.$watch(getIonicSideMenuOpenRatio, isSideMenuOpen);


        // $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.requestModal = modal;
        // });

        $scope.launchRequestModal = function(index, verb_index) {

            uTracker.track(tracker, 'Request Modal');
            $scope.requestModal.show();
        }

        $scope.closeRequestModal = function() {
            $scope.requestModal.hide();
            $ionicSlideBoxDelegate.update();
        }


        $scope.closeVerbModal = function() {
            $scope.verbModal.hide();
            $ionicSlideBoxDelegate.update();
        }

        $scope.goToBecomeGuru = function() {
            $ionicSlideBoxDelegate.update();

            //uTracker.track(tracker, 'Become Guru');

            //$ionicViewSwitcher.nextDirection('none');

            $timeout(function() {
                $ionicViewSwitcher.nextDirection('forward');
                $state.go('^.become-guru')
            }, 30);

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
            MapService.initStudentHomeMap($scope.user);
        }

        console.log($scope.user);
        $scope.$on('$ionicView.loaded', function() {

            $scope.root.vars.guru_mode = false;
            if (!$scope.mapInitialized) {
                $scope.mapInitialized = true;
                $timeout(function() {
                    $scope.initStudentHomeMap();
                }, 1000)
            }

        })

        $scope.$on('$ionicView.beforeEnter', function() {

            if (DeviceService.isIOSDevice()) {
                DeviceService.ios.setStatusBarText($state.current.name);
            }

        })

        $scope.$on('$ionicView.afterEnter', function() {
            console.log('after enter');
            $ionicSlideBoxDelegate.update();
        });

        $scope.$on('$ionicView.enter', function() {

            $scope.loader.hide();

            if (!$scope.mapInitialized && !MapService.studentHomeMap) {
                $scope.mapInitialized = true;
                $timeout(function() {
                    // $scope.initStudentHomeMap();
                }, 1000)
            }
            $timeout(function() {
                checkOnboardingStatus();
            }, 500);


        });

    }

]);
