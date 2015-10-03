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
    'MapService',
    function($scope, $state, $ionicPlatform, $cordovaStatusbar,
        $ionicModal, $timeout, $q, University, $localstorage,
        $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
        $ionicActionSheet, $ionicPopover, uTracker, MapService) {

        $ionicSideMenuDelegate.canDragContent(true);

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


        $scope.launchRequestModal = function(index, verb_index) {


            uTracker(tracker, 'Request Modal');

            $scope.loader.showAmbig();

            $scope.root.vars.last_verb_index_clicked = index;
            if (verb_index) {
                $scope.root.vars.detailed_verbs_index_clicked = verb_index;
            }

            $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.requestModal = modal;
                // $scope.requestModal.show();

                // if ($scope.verbModal.isShown()) {
                //     $timeout(function() {
                //         $scope.verbModal.hide();
                //     }, 2000);
                // }

                // if ($scope.taskVerbModal.isShown()) {
                //     $timeout(function() {
                //         $scope.taskVerbModal.hide();
                //     }, 2000);
                // }

                // $timeout(function() {
                //     $scope.loader.hide();
                // }, 1500);

            });

        }



        $scope.closeVerbModal = function() {
            $scope.verbModal.hide();
        }

        $scope.goToBecomeGuru = function() {

            uTracker.track('Become Guru');

            $ionicViewSwitcher.nextDirection('forward');
            $state.go('^.become-guru');
        }


        $scope.launchWelcomeStudentPopup = function() {

            var homeCenterComponent = document.getElementById('home-content-header');
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
            var icon = {
                 title: "Guru Profile",
                 fillColor: "#c21f31",
                 fillOpacity: 0.8,
                 path: "M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z",
                 anchor: new google.maps.Point(0,0),
                 strokeWeight: 0,
                 scale: 1/4,
                 latitude: $scope.user.university.latitude,
                 longitude: $scope.user.university.longitude,
                 labelClass:'student-home-map-label'
            }

            var mapOptions = {
                "latitude": $scope.user.university.latitude,
                "longitude": $scope.user.university.longitude,
                "saturation": -100,
                "elemId": "student-home-map-container",
                "lightness": -5,
                "zoom": 15,
                "infoWindowHtml": "<span>Guru Profile would go here</span>",
                "scrollwheel":false,
                "icons": [icon],
                "title": "Student Home Map",
                styles: defaultMapStyles //see lib/angular-google-maps/default-map-styles.js
            }

            MapService.initMap(mapOptions);
        }


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

            if (!$scope.mapInitialized) {
                $scope.mapInitialized = true;
                $timeout(function() {
                    $scope.initStudentHomeMap();
                }, 1000)
            }
            // $timeout(function() {
            //     checkOnboardingStatus();
            // }, 1000);


            // $timeout(function() {
            //     $scope.launchRequestModal();
            // }, 1000);



            // $timeout(function() {
            //     $scope.launchRequestModal();
            // }, 1000);


        });

    }

]);