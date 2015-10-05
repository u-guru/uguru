angular.module('uguru.guru.controllers', [])

//ALL student controllers
.controller('GuruController', [

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
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
  $ionicActionSheet)     {


  $scope.data = {university_banner: $scope.img_base + "./img/guru/university-banner.png"};
  $scope.root.vars.guru_rank_initialized = false;
  $scope.showActive = true;
  $ionicSideMenuDelegate.canDragContent(false);


  $scope.tip_of_day = 'Your profile is not complete. Completing your profile will increase your ranking by a lot'


  $scope.root.vars.guru_mode = true;
  $scope.guru_mode = true;
  $scope.page = {guru_ranking: 0};
  $scope.user.guru_ranking = $scope.user.guru_ranking || 75;

  $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.signupModal = modal;
  });


  $scope.launchSignupModal = function() {
      $scope.signupModal.show();
  }





  $ionicModal.fromTemplateUrl(BASE + 'templates/guru.request.incoming.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.incomingStudentSessionProposal = modal;

    });






        $scope.launchWelcomeGuruPopup = function() {

          var homeCenterComponent = document.getElementById('guru-home');
          var uguruPopup = document.getElementById('home-uguru-popup');
          $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
            function (modal){
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

        $scope.launchGuruRankingPopup = function() {

          var homeCenterComponent = document.getElementById('guru-home');
          var uguruPopup = document.getElementById('guru-ranking-popup');
          $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
            function (modal){
              modal.classList.add('show');
            }
          );
          $scope.closeWelcomePopup = function() {
            if ($scope.reverseAnimatePopup) {
              $scope.reverseAnimatePopup();
            }
            var uguruPopup = document.getElementById('guru-ranking-popup');
            uguruPopup.classList.remove('show');

          }
        }

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

        $ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
        }).then(function(modal) {
            $scope.privacyModal = modal;
        });

        $scope.launchPrivacyModal = function() {
          $scope.privacyModal.show();
        }

        $scope.initializeProgressBars = function() {
          var guruRankingCircle = initGuruRankProgress('#guru-ranking-progress-bar');
          animateProgressCircle(guruRankingCircle, $scope.user.guru_ranking, true);

          var guruCredibilityLine = initGuruHorizontalProgress('#guru-credibility-progress-bar', 'credibility-percent')
          animateProgressLine(guruCredibilityLine, $scope.user.current_credibility_percent || 60);

          var guruProfileLine = initGuruHorizontalProgress('#guru-profile-progress-bar', 'profile-percent');
          animateProgressLine(guruProfileLine, $scope.user.current_profile_percent || 40);

          var guruHourlyLine = initGuruHorizontalProgress('#guru-hourly-progress-bar', 'hourly-rate');
          animateProgressLine(guruHourlyLine, $scope.user.current_hourly || 80);
        }

        var initGuruRankingCircleProgress = function() {

        }

        var haveProgressBarsBeenInitialized = function() {
          return document.querySelectorAll('.progressbar-text').length;
        }


        $scope.$on('$ionicView.beforeEnter', function() {

          console.log($scope.user);

            if (!haveProgressBarsBeenInitialized()) {
              $timeout(function() {
                $scope.initializeProgressBars();
              }, 500)
            }

        });

        // GABRIELLE UN COMMENT THE SECTION BELOW
        // $scope.$on('$ionicView.enter', function() {
        //   $timeout(function() {
        //       $scope.launchGuruRankingPopup();

        //       $timeout(function() {
        //         var guruRankingPopupCircle = initGuruRankProgress('#guru-ranking-popup-progress-bar', '#2B3234','#69B3A5');

        //         animateProgressCircle(guruRankingPopupCircle, 75);
        //       }, 1000 )

        //   }, 1000)
        // }, 1000)






  }

]);
