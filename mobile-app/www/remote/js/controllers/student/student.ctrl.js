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
        $scope.root.vars.guru_mode = false;

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



        $scope.goToAdmin = function() {
            AnimationService.flip('^.admin');
        }

        $scope.$on('$ionicView.afterEnter', function() {
            if ($scope.desktopMode) {
                initAllCTAS();
            }
        })

        function initAllCTAS() {
            //ngAnimate
            var parentRef = '#desktop-student-home'
            var elemRefArr = ['#cta-box-content', '#cta-box-student-courses', '#cta-box-request-courses', '#cta-box-student-request','#cta-box-created-requests', '#cta-box-billing', '#cta-box-messages', '#cta-box-shop'];
            var cbOptions = {'#cta-box-student-request': triggerRequestFormCTA, '#cta-box-created-requests': initRequestDetailsCTA};
            CTAService.initArrCTASharedParent(parentRef, elemRefArr, cbOptions);
            // $timeout(function() {
            //     $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'), $scope, $scope.user.university.latitude, $scope.user.university.longitude, $scope.user.university.school_color_dark);
            //     $scope.requestForm.category = $scope.categories[0];
            //     $scope.requestForm.subcategory = $scope.requestForm.category.subcategories[0];
            //     $scope.requestForm.description.content = 'sample test';
            //     $scope.requestForm.tags.list = [{name: 'sample tag'}, {name: 'sample tag2'}, {name: 'sample tag3'}];
            //     $scope.requestForm.files = [{name: 'sample file', id: 32},{name: 'sample file', id: 55}];
            //     $scope.requestForm.address = 'sample address';
            //     $scope.requestForm.price.selected = 45;
            //     $scope.requestForm.payment_card = $scope.user.payment_cards[0];
            // }, 500);
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
            // $scope.root.loader.body.hide = true;
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
            $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'), $scope, $scope.user.university.latitude, $scope.user.university.longitude, $scope.user.university.school_color_dark);
            // $timeout(function() {
            //     $scope.requestForm = RequestService.initStudentForm($ionicSlideBoxDelegate.$getByHandle('request-form'), $scope, $scope.user.university.latitude, $scope.user.university.longitude, $scope.user.university.school_color_dark);
            //     $scope.requestForm.category = $scope.categories[0];
            //     $scope.requestForm.subcategory = $scope.requestForm.category.subcategories[0];
            //     $scope.requestForm.description.content = 'sample test';
            //     $scope.requestForm.tags.list = [{name: 'sample tag'}, {name: 'sample tag2'}, {name: 'sample tag3'}];
            //     $scope.requestForm.files = [{name: 'sample file', id: 32},{name: 'sample file', id: 55}];
            //     $scope.requestForm.address = 'sample address';
            //     $scope.requestForm.price.selected = 45;
            //     $scope.requestForm.payment_card = $scope.user.payment_cards[0];
            // }, 500);

            updateSlideBoxContainer();
            $timeout(function() {
                $scope.disableSwipe('request-form');
                $ionicSlideBoxDelegate.$getByHandle('request-form').stop();
                CTAService.initSingleCTA('#cta-box-request-payments', '#request-cta-payment', function() {
                  $scope.card = {exp: '', number: '', cvc: '', placeholder:"**** **** **** 4242"};
                  initHandlers($scope, '#request-cta-payment');
                });
            }, 1000);
            // TODO check for previous requests
            // initialize category
        }

        function initRequestDetailsCTA() {
            CTAService.initSingleCTA('.cta-box-request-details', '#student-request-details', function() {
                LoadingService.showAmbig(null, 750);
            })
        }

        $scope.$on('$ionicView.loaded', function() {
            initAllCTAS();
            $timeout(function() {
                var requestModalLink = document.querySelector('#cta-box-student-request');
                angular.element(requestModalLink).triggerHandler('click');
            }, 2000);
        })

    }

]);
