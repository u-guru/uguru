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


        $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
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

        $timeout(function() {
            AnimationService.initSlide();
        }, 500);
        $scope.goToBecomeGuru = function() {


            //uTracker.track(tracker, 'Become Guru');
            
            //$ionicViewSwitcher.nextDirection('none');


            $timeout(function() {
                $state.go('^.become-guru');
                AnimationService.slide('left');
            }, 0);
            
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
            var drop = {
                 title: "",
                 fillColor: "#69B3A5",
                 fillOpacity: 1,
                 path: "M24.2857143,39.7142857 L24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 L24.2857143,39.7142857 L24.2857143,39.7142857 Z",
                 anchor: new google.maps.Point(0,0),
                 strokeWeight: 0,
                 scale: 1/2,
                 latitude: $scope.user.university.latitude,
                 longitude: $scope.user.university.longitude,
                 labelClass: 'student-home-map-label'
            }

            var guru = {
                 title: "",
                 fillColor: "white",
                 fillOpacity: 1,
                 path: "M35.8571107,34.0035265 C37.7287417,27.7848815 43.5096666,23.4529613 50.0301876,23.4529613 C56.4601458,23.4529613 62.1806955,27.6641311 64.1277955,33.7620258 C65.2598304,33.8827762 66.4371467,34.0789955 67.6597444,34.3657777 L67.2974932,36.7355041 C66.9503359,36.7355041 66.3616777,36.8713483 66.3465839,37.5354754 C66.2409273,40.0712336 65.8786762,41.988146 64.988142,43.2862127 C65.2598304,43.5126197 65.4560498,43.7692143 65.5315188,44.0559964 C65.5315188,44.0559964 64.4145777,44.0258088 64.3089211,44.161653 C64.3089211,44.161653 65.969239,47.08985 65.7126444,49.0067624 L64.7164537,48.4030104 C64.7164537,48.4030104 65.3051118,53.0368066 64.2485459,54.4858113 C64.2485459,54.4858113 63.4334808,53.2934012 63.2372614,53.1273694 C63.2372614,53.1273694 62.4674777,57.6253214 61.7882567,58.5309493 C61.7882567,58.5309493 61.169411,57.6404152 60.8826288,57.4140082 C60.8826288,57.4140082 60.5505652,60.2969238 59.1015606,61.927054 L58.467621,60.9157695 C58.467621,60.9157695 56.9280536,64.5684688 57.3204923,66.3193494 C57.3204923,66.3193494 56.1582698,65.3835339 56.1582698,65.0816579 C56.1582698,65.0816579 56.0224257,67.0740394 53.5621365,68.1909805 C53.5621365,68.1909805 53.6074179,67.3004463 53.3659171,67.0438518 C53.3659171,67.0438518 50.9056279,69.126796 52.2640698,70.5305193 C52.2640698,70.5305193 50.4980954,70.7871138 49.9547186,69.277734 C49.3962481,70.7871138 47.6453674,70.5305193 47.6453674,70.5305193 C49.0038093,69.126796 46.5435201,67.0438518 46.5435201,67.0438518 C46.3020193,67.3004463 46.3473007,68.1909805 46.3473007,68.1909805 C43.8870116,67.0740394 43.7511674,65.0816579 43.7511674,65.0816579 C43.7511674,65.3835339 42.5889449,66.3193494 42.5889449,66.3193494 C42.9813836,64.5684688 41.4418162,60.9157695 41.4418162,60.9157695 L40.8078766,61.927054 C39.358872,60.2969238 39.0268084,57.4140082 39.0268084,57.4140082 C38.7400262,57.6404152 38.1060867,58.5309493 38.1060867,58.5309493 C37.4419595,57.6253214 36.6721758,53.1273694 36.6721758,53.1273694 C36.4759564,53.2934012 35.6608913,54.4858113 35.6608913,54.4858113 C34.6043254,53.0368066 35.1929835,48.4030104 35.1929835,48.4030104 L34.181699,48.9916686 C33.9251044,47.0747562 35.6005161,44.1465592 35.6005161,44.1465592 C35.4797657,44.010715 34.3628246,44.0258088 34.3628246,44.0258088 C34.4533874,43.6937453 34.6797944,43.4220569 35.011858,43.1805561 C34.1364176,41.5806135 34.1213238,39.4523879 33.6383223,37.8977266 C33.4571967,37.339256 33.2609773,37.0373801 32.6421316,37.0222863 L32.3402556,34.6676537 C33.4873843,34.4110591 34.6647006,34.1846521 35.8571107,34.0035265 M50.0301876,24.3585892 C44.0530433,24.3585892 38.7249324,28.2376955 36.8533014,33.8827762 C39.5399975,33.5658064 42.4380069,33.595994 45.7888302,34.4412467 C47.1472721,34.7884041 48.7019333,35.1355614 50.0905628,35.09028 C50.9207217,35.0600924 51.7055992,34.8638731 52.4602892,34.6978413 C56.0828009,33.8525886 59.4487179,33.3846808 63.1316048,33.671463 C61.1995986,28.1471327 55.9318629,24.3585892 50.0301876,24.3585892 M47.5397108,42.0787088 C47.7057426,42.0787088 47.8717744,42.139084 48.0227124,42.139084 L48.0227124,42.139084 C48.7774023,42.139084 48.5811829,42.7579298 50.0301876,42.7579298 C50.6641271,42.7579298 51.1773163,42.1692716 51.5697551,42.1541778 C51.8112558,42.1239902 52.3848202,42.0938026 52.3848202,42.0938026 L52.3848202,42.0787088 C52.626321,42.063615 52.7621652,41.8070204 52.626321,41.5957073 C51.8263496,40.3127344 51.4791923,39.0146677 51.3282543,38.2297902 C51.1471287,37.2034119 50.6188457,37.0977553 50.0301876,37.0826615 C48.9736217,37.0524739 48.8528713,37.8222576 48.6717457,38.2901654 C48.1585566,39.5731382 47.7057426,40.6447979 47.2378348,41.5202383 C47.1170845,41.7466452 47.2680224,42.063615 47.5397108,42.0787088 M65.9239576,35.8751576 C66.4220529,35.8751576 66.8295855,35.769501 66.8295855,35.6487506 C66.8295855,35.5129064 66.4220529,35.4223436 65.9239576,35.4223436 C65.4258622,35.4223436 65.0183296,35.5280002 65.0183296,35.6487506 C65.0183296,35.769501 65.4258622,35.8751576 65.9239576,35.8751576 M59.5241869,44.5540918 C63.3731056,44.5540918 64.4900467,43.8446833 65.0032358,39.3618251 C65.0032358,36.3430653 65.1994552,34.5770909 59.4939993,34.5921847 C55.6450807,34.9695297 51.5999427,34.9242483 53.1546039,39.5278568 C54.120607,42.3805848 55.6299869,44.4484352 59.5241869,44.5540918 M45.0794216,48.2369787 C45.7737364,49.8369213 47.7057426,50.9538624 49.9849062,50.9538624 C52.2791636,50.9538624 54.2262636,49.8520151 54.9205784,48.2520725 C55.1922667,47.6332267 54.724359,46.9841934 54.045138,46.9841934 L45.9397682,46.9841934 C45.275641,46.9841934 44.8077333,47.6181329 45.0794216,48.2369787 M34.9514828,39.3618251 C35.4646719,43.8446833 36.581613,44.5540918 40.4305317,44.5540918 C44.3096379,44.4484352 45.8341116,42.3805848 46.7850209,39.5278568 C48.3547759,34.9242483 44.3096379,34.9695297 40.4607193,34.5921847 C34.7552634,34.5921847 34.9514828,36.3430653 34.9514828,39.3618251 M33.9854796,36.1015646 C34.483575,36.1015646 34.8760138,36.0110018 34.8760138,35.8751576 C34.8760138,35.7544072 34.483575,35.6487506 33.9854796,35.6487506 C33.4873843,35.6487506 33.0798517,35.7544072 33.0798517,35.8751576 C33.0798517,36.0110018 33.4873843,36.1015646 33.9854796,36.1015646",
                 anchor: new google.maps.Point(0,0),
                 strokeWeight: 0,
                 scale: 1/2,
                 latitude: $scope.user.university.latitude,
                 longitude: $scope.user.university.longitude,
                 labelClass: 'student-home-map-label'
            }

            var mapOptions = {
                "latitude": $scope.user.university.latitude,
                "longitude": $scope.user.university.longitude,
                "saturation": -100,
                "elemId": "student-home-map-container",
                "lightness": -5,
                "zoom": 15,
                "infoWindowHtml": "<span>Guru Profile would go here</span>",
                "scrollwheel": false,
                "icons": [drop, guru],
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


        });

    }

]);