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
    function($scope, $state, $ionicPlatform, $cordovaStatusbar,
        $ionicModal, $timeout, $q, University, $localstorage,
        $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
        $ionicActionSheet, $ionicPopover, uTracker, AnimationService, MapService) {

        $ionicSideMenuDelegate.canDragContent(false);

        $ionicModal.fromTemplateUrl(BASE + 'templates/verb.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.verbModal = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/contacting.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.contactingModal = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/task_verbs.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.taskVerbModal = modal;
        });

         $ionicModal.fromTemplateUrl(BASE + 'templates/task_verbs.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.taskVerbModal = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/student.courses.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruCoursesModal = modal;
        })

        $scope.launchStudentCoursesModal = function() {
          $scope.guruCoursesModal.show();
          $timeout(function() {
            $scope.guruCoursesInput = document.querySelector('#course-input-2');
          }, 250)
        }

        $scope.launchTaskVerbModal = function() {
            $timeout(function() {
                $scope.closeVerbModal();
            }, 500);
            $scope.taskVerbModal.show();
        }

        $scope.hideTaskVerbModal = function() {
            $scope.taskVerbModal.hide();
        }

        $scope.launchVerbModal = function() {
            $scope.verbModal.show();
        }

        //UGH I HATE MY LIFE FUCK YOU IONIC
        var getIonicSideMenuOpenRatio = function() {
            var openRatio = $ionicSideMenuDelegate.getOpenRatio();
            return openRatio;
        }
        var isSideMenuOpen = function(ratio) {
            if (!ratio && ratio !== -1) {
                $scope.sideMenuActive = false;
            } else {
                $timeout(function() {
                    $scope.sideMenuActive = true;
                }, 250)
            }
        }
        $scope.$watch(getIonicSideMenuOpenRatio, isSideMenuOpen);


        $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.requestModal = modal;
        });

        $scope.launchRequestModal = function(index, verb_index) {

            uTracker.track(tracker, 'Request Modal');
            $scope.requestModal.show();
        }

        $scope.closeRequestModal = function() {
            $scope.requestModal.hide();
        }


        $scope.closeVerbModal = function() {
            $scope.verbModal.hide();
        }

        $scope.goToBecomeGuru = function() {


            //uTracker.track(tracker, 'Become Guru');

            //$ionicViewSwitcher.nextDirection('none');

            $ionicViewSwitcher.nextDirection('forward');
            $state.go('^.become-guru')

        }


        $scope.launchWelcomeStudentPopup = function() {

            var homeCenterComponent = document.getElementById('home-content');
            var uguruPopup = document.getElementById('home-uguru-popup');
            $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {
                    duration: 1
                },
                function(modal) {
                    modal.classList.add('show');
                }
            );
            $scope.closeWelcomePopup = function() {
                if ($scope.reverseAnimatePopup) {
                    $scope.reverseAnimatePopup();
                }
                var uguruPopup = document.getElementById('home-uguru-popup');
                uguruPopup.classList.remove('show');

            }
        }

        var checkOnboardingStatus = function() {

            var appOnboardingObj = $localstorage.getObject('appOnboarding');

            if (!appOnboardingObj || appOnboardingObj === {} || !appOnboardingObj.studentWelcome) {
                appOnboardingObj = {
                    studentWelcome: true
                }
                $localstorage.setObject('appOnboarding', appOnboardingObj);
                $scope.launchWelcomeStudentPopup();
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

        $scope.$on('$ionicView.enter', function() {

            $scope.loader.hide();

            if (!$scope.mapInitialized && !MapService.studentHomeMap) {
                $scope.mapInitialized = true;
                $timeout(function() {
                    $scope.initStudentHomeMap();
                }, 1000)
            }
            $timeout(function() {
                checkOnboardingStatus();
            }, 1000);

            $timeout(function() {
                $scope.launchRequestModal();
            }, 1000);

        });

    }

]);
