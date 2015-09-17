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
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
  $ionicActionSheet, $ionicPopover)     {

  // var n = x + 1;
  $scope.showUpcoming = true;
  $scope.root.vars.show_price_fields = false;

  $scope.showPreviousRequests = function() {
      if (!$scope.user.previous_requests || $scope.user.previous_requests.length === 0) {
        $scope.success.show(0, 2000, 'Sorry! Please make a request first.');
      } else {
        $scope.showUpcomingToggle();
      }
    }


  //case-specific functions

    $scope.showUpcomingToggle = function() {
      $scope.showUpcoming = !$scope.showUpcoming;
    }

    $scope.goBackToStudentHome = function() {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.home');
    }

    $scope.cancelRequest = function(request) {
      if (confirm('Are you sure you want to cancel this request?')) {
        request.status = 4;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);


        if (request._type !== 2) {
          var cancelMsg = request.course.short_name + ' request canceled';
        } else {
          var cancelMsg = request.category +  ' Task request canceled';
        }

        $scope.success.show(0, 2000, cancelMsg);
        $scope.root.util.removeObjectByKey($scope.user.active_requests, 'id', request.id);
      }
    }


  $scope.goToSessionDetails = function(session) {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.student-session', {sessionObj:JSON.stringify(session)})
  }

  $scope.goToPendingRequestDetails = function(request) {

      var session = {
        request: request
      }

      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.student-session', {sessionObj:JSON.stringify(session)})
  }

    $scope.launchStudentInSessionModal = function() {


      $ionicModal.fromTemplateUrl(BASE + 'templates/student.in-session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.studentInSessionModal = modal;
            $scope.studentInSessionModal.show();
        });

    }

    $scope.launchStudentSessionDetailsModal = function() {


      $ionicModal.fromTemplateUrl(BASE + 'templates/student.session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
      }).then(function(modal) {
            $scope.studentSessionDetailsModal = modal;
            $scope.studentSessionDetailsModal.show();
      });

    }


    $scope.launchStudentRatingsModal = function(rating) {


            $ionicModal.fromTemplateUrl(BASE + 'templates/student.ratings.modal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(function(modal) {
                  $scope.pending_rating = rating;
                  $scope.starsSelected;
                  $scope.studentRatingsModal = modal;
                  $scope.studentRatingsModal.show();
              });
    }

    $scope.closeStudentRatingsModal = function() {

        $scope.loader.show();
        $scope.studentRatingsModal.hide();

        $scope.submitStudentRatingServer();

    }

    $scope.goBack = function() {
            $scope.studentSessionDetailsModal.hide();
    }


    $scope.goToBecomeGuru = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.become-guru');
    }
    $scope.cancelStudentActiveSession = function(session) {

              //guru goes back to session 'pending', maybe clicked start by accident
              $scope.session.status = 1;

              var sessionPayload = {session: $scope.session}

                //Mixpanel Track

              $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);

              $scope.closeAttachActionSheet();

              $ionicViewSwitcher.nextDirection('forward');
              $state.go('^.student-session', {sessionObj:JSON.stringify(session)})

              $timeout(function() {
                $scope.studentInSessionModal.hide()
              }, 500)


    }


    $scope.submitStudentRatingServer = function () {
        if ($scope.root.vars.guru_mode) {

          $scope.pending_rating.guru_rate_student = true;
          $scope.pending_rating.student_rating = parseInt($scope.root.vars.starsSelected);


        } else {
          $scope.pending_rating.student_rate_guru = true;
          $scope.pending_rating.guru_rating = parseInt($scope.root.vars.starsSelected);
        }

        var ratingPayload = $scope.pending_rating;

        var serverCallback = function() {
          $scope.loader.hide();
          // $timeout(function() {
          //   $scope.launchPendingActions();
          // }, 500);
        }

        $scope.success.show(0, 1500, 'Rating Saved!');

        $scope.loader.show();

        console.log('payload to be submitted', ratingPayload);

        $scope.user.updateObj($scope.user, 'ratings', ratingPayload, $scope, serverCallback);
      }

      $scope.showAttachActionSheet = function() {

            var options = [{ text: 'Undo Start Session' }, {text: 'View Session Details'}, { text: 'Support' }];

              // Show the action sheet
              $scope.closeAttachActionSheet = $ionicActionSheet.show({
                  buttons: options,
                  cancelText: 'Cancel',
                  cancel: function() {
                      $scope.closeAttachActionSheet();
                  },
                  buttonClicked: function(index) {
                    console.log(index);
                    if (index === 0) {

                      // $scope.success.show(0, 2000, 'Your guru must cancel the session. Contact support if your guru is not around');

                      $scope.closeAttachActionSheet();
                      if (confirm('Are you sure? You will lose all session progress')) {

                        $timeout(function() {
                          $scope.cancelStudentActiveSession($scope.session);
                        }, 500)

                       }

                    }
                    if (index === 1) {
                      $scope.launchStudentSessionDetailsModal();
                      $scope.closeAttachActionSheet();
                    }

                    if (index === 2) {
                      $scope.success.show(0, 2000, 'Coming Soon!');
                      $scope.closeAttachActionSheet();
                    }
                  }
            });
    }



    $scope.root.vars.launchPendingActions = function() {

            //priority 1: see if any ratings are allowed

      if ($scope.user.pending_guru_ratings.length > 0) {

        var rating = $scope.user.pending_guru_ratings[0];
        //pop the first item

        // $scope.user.pending_guru_ratings.shift();

        $scope.pending_rating = rating;

        // $scope.launchStudentRatingsModal(rating);

        if(!$scope.studentRatingsModal || !$scope.studentRatingsModal.isShown()) {
          $scope.launchStudentRatingsModal(rating);
        }

        //no reason to
        return;

      }
      //see if any sessions are going on right now

      for (var i = 0 ; i < $scope.user.active_student_sessions.length; i ++) {

            var session = $scope.user.active_student_sessions[i];
            if (session.status === 2) {
              $scope.session = session;
              $timeout(function() {

                $scope.details = {show: true};


                $scope.launchStudentInSessionModal();


              }, 500);
            }

      }

    }
    $scope.launchPendingActions = $scope.root.vars.launchPendingActions;

  $ionicPlatform.ready(function() {

        $scope.turnStatusBarWhite = function() {

          if (window.StatusBar) {

            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(true);
          }

        }
        $scope.turnStatusBarBlack = function() {
          if (window.StatusBar) {
                      // console.log('Extra #1. Styling iOS status bar to black \n\n');

            StatusBar.styleDefault();
            StatusBar.overlaysWebView(true);
          }
        }

        $scope.turnStatusBarWhite();
    });

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

    $scope.toggleRightSideMenu = function() {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.launchRequestModal = function(index, verb_index) {
      //UNDO
      // if ($scope.root.vars.courses) {

          $scope.root.vars.last_verb_index_clicked = index;
          if (verb_index) {
            $scope.root.vars.detailed_verbs_index_clicked = verb_index;
          }

          $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.requestModal = modal;
            $scope.requestModal.show();

            if ($scope.verbModal.isShown()) {
              $timeout(function() {
                $scope.verbModal.hide();
              }, 2000);
            }

            if ($scope.taskVerbModal.isShown()) {
              $timeout(function() {
                $scope.taskVerbModal.hide();
              }, 2000);
            }

          });
      //UNDO
      // } else {
      //   alert('courses are not loaded yet');
      // }
    }


    

    $scope.closeContactingModal = function() {
      $scope.contactingModal.hide();
      if (!$scope.user.push_notifications) {
        $timeout(function() {
          $scope.requestPushNotifications();
        }, 1000);
      }
    }

    $scope.closeVerbModal = function() {
      $scope.verbModal.hide();
    }

  

     $scope.launchWelcomeStudentPopup = function() {

        var homeCenterComponent = document.getElementById('home-content-header');
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

      var checkOnboardingStatus = function() {

        var appOnboardingObj = $localstorage.getObject('appOnboarding');
        if (!appOnboardingObj || appOnboardingObj === {} || !appOnboardingObj.studentWelcome) {
          appOnboardingObj = {studentWelcome:true}
          $localstorage.setObject('appOnboarding', appOnboardingObj);
          $scope.launchWelcomeStudentPopup();
        }
      }



     $scope.$on('$ionicView.enter', function() {
      $ionicSideMenuDelegate.canDragContent(true);

        // $timeout(function() {
        //   $ionicSideMenuDelegate.toggleRight();
        // }, 250)
        //welcome to student mode screen
        $timeout(function() {
            checkOnboardingStatus()
        }, 1000);




      });

  }

]);
