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
  'LoadingService',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
  $ionicActionSheet, RankingService, TipService, ModalService, PopupService,
  $ionicSlideBoxDelegate, DeviceService, LoadingService) {

  $scope.refreshTipsAndRanking = function(user) {
    TipService.currentTips = TipService.generateTips(user);
    RankingService.refreshRanking(user);
  };



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
  $scope.showDesktopTranscriptModal = false;

  $scope.openModal = function(modalName) {
    ModalService.open(modalName, $scope);
  };


  $scope.goToDesktopGuruProfile = function() {
    $ionicViewSwitcher.nextDirection('enter');
    $state.go('^.desktop-guru-profile')
  }

  $scope.goToDesktopGuruCredibility = function() {
    $ionicViewSwitcher.nextDirection('enter');
    $state.go('^.guru-credibility');
  }




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
              if (index === 10) {
                $scope.showLoaders = true;
              }
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

          if (!$scope.user.current_credibility_percent) {
            $scope.user.current_credibility_percent = 0.0;
          }

          animateProgressLine(guruCredibilityLine, $scope.user.current_credibility_percent, 0);

          var guruProfileLine = initGuruHorizontalProgress('#guru-profile-progress-bar', 'profile-percent');

          $scope.user.current_profile_percent = RankingService.calcProfile($scope.user);
          animateProgressLine(guruProfileLine, $scope.user.current_profile_percent || 40);

          var guruHourlyLine = initGuruHorizontalProgress('#guru-hourly-progress-bar', 'hourly-rate');
          animateProgressLine(guruHourlyLine, $scope.user.current_hourly || 10);

        }


        var haveProgressBarsBeenInitialized = function() {
          return document.querySelectorAll('.progressbar-text').length;
        }


        var initAndLaunchWelcomePopup = function () {

          var openPopover = function() {

              function callback() {
                PopupService.close('welcomeGuru');
              }

              PopupService.open('welcomeGuru', callback, document.querySelector('.guru-tip-of-day-slide-box'));


          }

            PopupService.init('welcomeGuru', 'guru-uguru-popup', openPopover);

        }

        var checkIsFirstTimeGuruMode = function(is_first_time) {
            if (is_first_time) {
                console.log ('it is the first itme..');
                appOnboardingObj = {
                    guruWelcome: true
                }

                $timeout(function() {
                  initAndLaunchWelcomePopup();
                }, 1000);

                $localstorage.setObject('appOnboarding', appOnboardingObj);

            } else {
              console.log(appOnboardingObj);
            }
        }


        $scope.goToStateWithTransition = function(state_name, transition) {
          if (!$scope.user.id) {
            LoadingService.showAmbig();

            //make it feel like its coming... when really its just signup ;)
            $timeout(function() {
              $scope.openModal('signup');
              LoadingService.hide(100);
            }, 1000)
            return;
          }
          $ionicViewSwitcher.nextDirection(transition);
          $state.go(state_name);
        }

        // GABRIELLE UN COMMENT THE SECTION BELOW
        $scope.$on('$ionicView.enter', function() {

          if (DeviceService.isIOSDevice()) {
            DeviceService.ios.setStatusBarLightText();
          }

          $scope.refreshTipsAndRanking($scope.user);
          $ionicSlideBoxDelegate.update();

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
                if (!$scope.desktopMode) {
                  $scope.initializeHorizontalProgressBars();
                }

              }, 500)
            }

          }, 1000)

        })

        var appOnboardingObj;
        $scope.$on('$ionicView.afterEnter', function() {



            $timeout(function() {
              appOnboardingObj = $localstorage.getObject('appOnboarding');
            }, 250)

              // wait til the bar is loaded
              $timeout(function() {
                if (!appOnboardingObj) {
                  checkIsFirstTimeGuruMode(true);
                }
              }, 3000)
        });







  }

]);
