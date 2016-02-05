angular.module('uguru.student.controllers', [])

//ALL student controllers
.controller('StudentHomeController', [
    //All imported packages go here
    '$scope',
    '$state',
    '$ionicSideMenuDelegate',
    '$ionicSlideBoxDelegate',
    'DeviceService',
    '$timeout',
    '$ionicModal',
    'GMapService',
    'LoadingService',
    '$ionicViewSwitcher',
    'AnimationService',
    '$localstorage',
    'TourService',
    'CTAService',
    'RequestService',
    function($scope, $state, $ionicSideMenuDelegate, $ionicSlideBoxDelegate,
        DeviceService, $timeout, $ionicModal, GMapService, LoadingService,
        $ionicViewSwitcher, AnimationService, $localstorage, TourService,
        CTAService, RequestService) {


        $scope.user.is_a_guru = false;

        function initStudentHomeModals() {
            $ionicModal.fromTemplateUrl(BASE + 'templates/student.courses.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.studentCoursesModal = modal;
            });

            $ionicModal.fromTemplateUrl(BASE + 'templates/student.request.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.studentRequestModal = modal;
            });
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
                $scope.root.vars.university = $scope.user.university;
                $scope.university = $scope.user.university;
                $localstorage.setObject('university', $scope.user.university);
                AnimationService.flip('^.desktop-become-guru');
            }, 0);


        }


        $scope.launchWelcomeStudentPopup = function() {
            PopupService.init('welcomeStudent', 'home-uguru-popup');
            PopupService.open('welcomeStudent');
        }



        $scope.$on('$ionicView.afterEnter', function() {
            if ($scope.desktopMode) {
                //initialize CTAS
                initAllCTAS();

                //remove-later
                $timeout(function() {
                    $ionicSlideBoxDelegate.$getByHandle('request-form').stop();
                }, 1000)
            }
        })


        function initAllCTAS() {
            //ngAnimate
            var parentRef = '#desktop-student-home'
            var elemRefArr = ['#cta-box-content', '#cta-box-student-courses', '#cta-box-student-request'];
            var cbOptions = {'#cta-box-student-request': triggerRequestFormCTA};
            $timeout(function() {
                CTAService.initArrCTASharedParent(parentRef, elemRefArr, cbOptions);
                $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'), $scope);
                $ionicSlideBoxDelegate.$getByHandle('request-form').enableSlide(false)
            })
            //request form
            //student files
            //messages + empty state
            //payments
            //files
            //courses
            //support
            //loaders
        }
        //mobile app specific

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
            $scope.root.loader.body.hide = true;
        })


        $scope.$on('$ionicView.enter', function() {
            $ionicSlideBoxDelegate.update();
        });


        function updateSlideBoxContainer () {
            $ionicSlideBoxDelegate.update();
        }

        function triggerRequestFormCTA() {

            $scope.disableSwipe = function(handle) {
                $ionicSlideBoxDelegate.$getByHandle(handle).enableSlide(false)
                // $ionicSlideBoxDelegate.$getByHandle(handle).stop();
            }
            $scope.slideTo = function(index, time) {
                time = time || 250;
                $ionicSlideBoxDelegate.slide(index, time);
            }
            $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'));
            updateSlideBoxContainer();
            $timeout(function() {
                $scope.disableSwipe('request-form');
                $ionicSlideBoxDelegate.$getByHandle('request-form').stop();
            }, 1000);
            // TODO check for previous requests
            // initialize category
        }

    }

]);
