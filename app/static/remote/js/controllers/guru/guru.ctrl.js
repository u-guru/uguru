angular.module('uguru.guru.controllers', [])

//ALL student controllers
.controller('GuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$timeout',
  '$q',
  'University',
  '$localstorage',
  '$ionicSideMenuDelegate',
  '$ionicBackdrop',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  'RankingService',
  'TipService',
  'ModalService',
  'PopupService',
  '$ionicSlideBoxDelegate',
  'DeviceService',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
  $ionicActionSheet, RankingService, TipService, ModalService, PopupService,
  $ionicSlideBoxDelegate, DeviceService) {

  $scope.refreshTipsAndRanking = function(user) {
    TipService.currentTips = TipService.generateTips(user);
    RankingService.refreshRanking(user);
  }



  $scope.data = {university_banner: $scope.img_base + "./img/guru/university-banner.png"};
  $scope.root.vars.guru_rank_initialized = false;
  $scope.showActive = true;
  $ionicSideMenuDelegate.canDragContent(false);


  if ($scope.user) {
    TipService.currentTips = TipService.generateTips($scope.user); //mastercopy
    $scope.guruHomeTips = TipService.currentTips; //local copy
  }

  ModalService.init('signup', $scope);

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  };


  $scope.root.vars.guru_mode = true;
  $scope.guru_mode = true;
  $scope.page = {guru_ranking: 0};
  $scope.user.guru_ranking = $scope.user.guru_ranking || 75;


  $scope.openModal = function(modalName) {
    ModalService.open(modalName, $scope);
  };


  $scope.launchWelcomeGuruPopup = function() {

    PopupService.init('welcomeGuru', 'home-uguru-popup');
    PopupService.open('welcomeGuru');
  }


      var getIonicSideMenuOpenRatio = function() {
          var openRatio = $ionicSideMenuDelegate.getOpenRatio();
          return openRatio;
      }

      var isSideMenuOpen = function(ratio) {
          if (!ratio && ratio !== -1) {
              $scope.sideMenuActive = false;
          } else {
              $timeout(function() {

                  if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {
                    if (window.StatusBar) {
                      window.StatusBar.styleLightContent();
                    }
                  }

                  $scope.sideMenuActive = true;
              }, 250)
          }
      }

      $scope.$watch(getIonicSideMenuOpenRatio, isSideMenuOpen);


        // $scope.launchGuruRankingPopup = function() {



        //   var homeCenterComponent = document.getElementById('guru-home');
        //   var uguruPopup = document.getElementById('guru-ranking-popup');
        //   $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
        //     function (modal){
        //       modal.classList.add('show');
        //     }
        //   );
        //   $scope.closeWelcomePopup = function() {
        //     if ($scope.reverseAnimatePopup) {
        //       $scope.reverseAnimatePopup();
        //     }
        //     var uguruPopup = document.getElementById('guru-ranking-popup');
        //     uguruPopup.classList.remove('show');

        //   }
        // }

        var initGuruRankProgress = function(selector, color, fillColor, setValue) {
          var circle = new ProgressBar.Circle(selector, {
              color: color || "rgba(255,255,255,1)",
              strokeWidth: 8,
              trailWidth: 8,
              trailColor:fillColor || "rgba(255,255,255,0.3)",
              duration: 1000,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                  var val = (bar.value() * 100).toFixed(0);
                  if (setValue) {
                    bar.setText(val);
                  } else {
                    bar.setText('');
                  }
              }
          });
          circle.text = document.getElementById('percentile-ranking');
          RankingService.guruHomeProgressCircle = circle;
          return circle;

        }

        var animateProgressCircle = function(circle ,percentage) {
          var index = 0
          setInterval(function() {
              if (index > percentage) {
                return
              }
              circle.animate(index / 100, function() {
                  $scope.page.guru_ranking = index
              });
              index ++
          }, 20);
        }

        var animateProgressLine = function(line, percentage) {
          var index = 0;
          setInterval(function() {
              if (index > percentage) {
                return;
              }
              line.animate(index / 100);
              index ++;
          }, 20);
        }

        var initGuruHorizontalProgress = function(selector, percentTextId) {
          var textElem = document.getElementById(percentTextId);

          var line = new ProgressBar.Line(selector, {
              color: "rgba(255,255,255,1)",
              strokeWidth: 10,
              trailWidth: 10,
              trailColor:"rgba(255,255,255,0.3)",
              duration: 1000,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                  var val = (bar.value() * 100).toFixed(0);
                  bar.setText(val)
                  // bar.setText((bar.value() * 100).toFixed(0));
              }

          });
          line.text = document.getElementById(percentTextId);
          return line;
        }

        $scope.initializeHorizontalProgressBars = function() {

          var guruCredibilityLine = initGuruHorizontalProgress('#guru-credibility-progress-bar', 'credibility-percent')
          animateProgressLine(guruCredibilityLine, $scope.user.current_credibility_percent || 60);

          var guruProfileLine = initGuruHorizontalProgress('#guru-profile-progress-bar', 'profile-percent');
          animateProgressLine(guruProfileLine, $scope.user.current_profile_percent || 40);

          var guruHourlyLine = initGuruHorizontalProgress('#guru-hourly-progress-bar', 'hourly-rate');
          animateProgressLine(guruHourlyLine, $scope.user.current_hourly || 80);

        }


        var haveProgressBarsBeenInitialized = function() {
          return document.querySelectorAll('.progressbar-text').length;
        }

        var checkIsFirstTimeGuruMode = function(appOnboardingObj) {
          console.log('checking...');
            if (!appOnboardingObj || appOnboardingObj === {} || !appOnboardingObj.guruWelcome) {
                console.log ('it is the first itme..');
                appOnboardingObj = {
                    guruWelcome: true
                }
                $localstorage.setObject('appOnboarding', appOnboardingObj);
                $scope.launchWelcomeGuruPopup();
            } else {
              console.log(appOnboardingObj);
            }
        }


        $scope.goToStateWithTransition = function(state_name, transition) {
          if (!$scope.user.id) {
            $scope.loader.showAmbig();

            //make it feel like its coming... when really its just signup ;)
            $timeout(function() {
              $scope.openModal('signup');
              $scope.loader.hide(100);
            }, 1000)
            return;
          }
          $ionicViewSwitcher.nextDirection(transition);
          $state.go(state_name);
        }

        $scope.$on('$ionicView.beforeEnter', function() {
          console.log($scope.user);
          $scope.sideMenuActive = false;
          // postponed to later
          // value counts up later -- hack for now
          // $scope.showVerifyToast = $scope.user.current_guru_ranking > 40 && !$scope.user.school_email_confirmed;

        })

        // GABRIELLE UN COMMENT THE SECTION BELOW
        $scope.$on('$ionicView.enter', function() {
          $scope.sideMenuActive = false;
          $scope.refreshTipsAndRanking($scope.user);
          $ionicSlideBoxDelegate.update();

          var appOnboardingObj = $localstorage.getObject('appOnboarding');

          $timeout(function() {

            //commented out until it's 100% so won't get in the way of other branches pulling mine.


            if (RankingService.recentlyUpdated || RankingService.refreshRanking($scope.user)) {
              RankingService.showPopover(RankingService.options.previousGuruRanking, RankingService.options.currentGuruRanking);
            }

            if (!haveProgressBarsBeenInitialized()) {
              $timeout(function() {


                var guruRankingCircle = initGuruRankProgress('#guru-ranking-progress-bar', null, null, true);
                animateProgressCircle(guruRankingCircle, $scope.user.current_guru_ranking);

                //show it after the progress is complete
                $scope.initializeHorizontalProgressBars();

                checkIsFirstTimeGuruMode(appOnboardingObj);

              }, 500)
            }

          }, 1000)

        })

        // $scope.$on('$ionicView.afterEnter', function() {

        //     var appOnboardingObj = $localstorage.getObject('appOnboarding');

        //     if (!haveProgressBarsBeenInitialized) {
        //       checkIsFirstTimeGuruMode(appOnboardingObj);
        //     } else {

        //       // wait til the bar is loaded
        //       $timeout(function() {
        //         checkIsFirstTimeGuruMode(appOnboardingObj);
        //       }, 5000)

        //     }
        // });







  }

]);
