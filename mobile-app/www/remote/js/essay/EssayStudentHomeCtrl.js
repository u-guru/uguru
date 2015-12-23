angular.module('uguru.util.controllers')
.controller('EssayStudentHomeController', [
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
    'TimelineService',
    function($scope, $state, $ionicPlatform, $cordovaStatusbar,
        $ionicModal, $timeout, $q, University, $localstorage,
        $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
        $ionicActionSheet, $ionicPopover, uTracker, AnimationService, MapService, $ionicSlideBoxDelegate,
        DeviceService, PopupService, LoadingService, TimelineService) {

      var CTA_PARENT_DICT = {
            'cta-box-essay-student-request':'#desktop-student-home .main',
            'cta-box-content': '#desktop-student-home .main',
            'cta-box-essay-student-universities': '#desktop-student-home .main',
            'cta-box-essay-student-timeline': '#desktop-student-home .main',
            'cta-box-essay-student-files': '#desktop-student-home .main',
            'cta-box-essay-student-messaging': '#desktop-student-home .main',
            'cta-box-essay-student-transaction': '#desktop-student-home .main'
        }

        var CTA_OPTIONS = {
            duration:0.5,
            extraTransitionDuration:1
        }

        $scope.launchCtaDict = {};
        $scope.closeCTADict = {};
        $scope.search_text = {university:''};

        function initCTA() {

            function getModalCTAElemID(cta_box_elem) {
                elem_id = cta_box_elem.id;
                modalID = elem_id.replace('box', 'modal');
                return modalID;
            }

            function addEventListenerToCTABox(box_elem, modal_elem_id, index) {
                $scope.launchCtaDict[box_elem.id] = function() {
                    var modal_elem = document.querySelector('#' + modal_elem_id);

                    var closeCTAModal = cta(box_elem, modal_elem, CTA_OPTIONS, function() {


                            $ionicSlideBoxDelegate.update();
                            modal_elem.classList.add('show');
                            // $timeout(function() {

                            // }, );

                          var close_icon = modal_elem.querySelector('.cta-modal-close');
                          if (close_icon) {
                              close_icon.addEventListener('click', function() {

                              //add callbacks here

                                closeCTAModal();
                                modal_elem.classList.remove('show');
                            });
                          }
                    }, CTA_PARENT_DICT[box_elem.id]);

                  }

                box_elem.addEventListener('click', $scope.launchCtaDict[box_elem.id]);
            }

            var allCTABoxes = document.querySelectorAll('.cta-box') || [];
            var allCTAModels = document.querySelectorAll('.cta-modal') || [];
            for (var i = 0; i < allCTABoxes.length; i++) {
                var indexCTABox = allCTABoxes[i];
                var indexCTAModalID = getModalCTAElemID(indexCTABox);
                addEventListenerToCTABox(indexCTABox, indexCTAModalID, i)
            }
        }

        function initStudentHomeModals() {
            $ionicModal.fromTemplateUrl(BASE + 'templates/student.courses.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.studentCoursesModal = modal;
            });

            // $ionicModal.fromTemplateUrl(BASE + 'templates/student.request.modal.html', {
            //     scope: $scope,
            //     animation: 'slide-in-up'
            // }).then(function(modal) {
            //     $scope.studentRequestModal = modal;
            // });
        }

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.user.is_a_guru = false;


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

            if ($scope.desktopMode) {
                $timeout(function() {
                    initCTA();
                }, 3000)
            } else {
                initStudentHomeModals();
            }

        })



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
            // $scope.studentRequestModal.show();
        });

  }



]);