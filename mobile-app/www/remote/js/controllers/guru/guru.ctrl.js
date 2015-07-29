angular.module('uguru.guru.controllers')

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

  $scope.root.vars.guru_rank_initialized = false;
  $scope.showActive = true;
  $ionicSideMenuDelegate.canDragContent(false);

  document.addEventListener("deviceready", function () {
    $scope.turnStatusBarWhiteText = function() {
      $timeout(function() {
        StatusBar.overlaysWebView(true);
        StatusBar.styleLightContent();
      }, 250);
    }

    if (window.StatusBar) {
        $scope.turnStatusBarWhiteText();
    }
  });

  $scope.showPreviousActions = function(index) {
      if (!$scope.user.previous_proposals || $scope.user.previous_proposals.length === 0) {
        $scope.success.show(0, 2000, 'Sorry! No history yet. Update your profile to get more requests!');
      } else {
        $scope.showActiveToggle(index);
      }
    }

  $scope.showActiveToggle = function(index) {
      if (index === 1 && $scope.showActive) {
        $scope.showActive = !$scope.showActive;
      }

      if (index === 0 && !$scope.showActive) {
        $scope.showActive = !$scope.showActive;
      }

  }
  $scope.goToRankings = function() {
    $state.go('^.ranking');
  }

  // functions relevant to these sections
      $scope.goToSessionDetails = function(session) {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.guru-session', {sessionObj:JSON.stringify(session)})
      }

     $scope.cancelProposal = function(proposal) {
      if (confirm('Are you sure you want to cancel this?')) {
        var request = proposal.request;
        request.status = 5;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);


        if (request._type !== 2) {
          var cancelMsg = request.course.short_name + ' request canceled';
        } else {
          var cancelMsg = request.category +  ' Task canceled';
        }



        $scope.success.show(0, 2000, cancelMsg);
        $scope.root.util.removeObjectByKey($scope.user.pending_proposals, 'id', proposal.id);
      }
    }

    $scope.cancelActiveSession = function(session) {
      console.log('calling cancel');



      var canceled_session = session;

      var dialogCallBackSuccess = function() {
        //guru cancels session
        canceled_session.status = 5;

        var sessionPayload = {session: canceled_session}

        $scope.user.previous_guru_sessions.push(canceled_session);

        //remove session locally from active guru session
        $scope.root.util.removeObjectByKey($scope.user.active_guru_sessions, 'id', canceled_session.id);

        //update session locally
        $scope.root.util.updateObjectByKey($scope.user.guru_sessions, 'id', canceled_session.id, 'status', 5);
          //Mixpanel Track

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);

        $scope.success.show(0, 2000, 'Request successfully canceled');

        $scope.closeAttachActionSheet();

        $scope.goBack();
      }

      var dialog = {
        message: "Are you sure? This will be closely investigated by us and may impact your Guru ranking.",
        title: "Cancel Session",
        button_arr: ['Never Mind', 'Cancel Session'],
        callback_arr: [null, dialogCallBackSuccess]
      }

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog.message)) {
            dialogCallBackSuccess();
        }
      }

      else {
          $scope.root.dialog.confirm(dialog.message, dialog.title, dialog.button_arr, dialog.callback_arr);
      }

    }





    // functions relevant to these sections
    $scope.launchGuruInSessionModal = function() {

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruSessionDetailsModal = modal;
            $scope.guruInSessionModal.show();

      });

    }

    $scope.launchGuruSessionDetailsModal = function() {


        $scope.guruSessionDetailsModal.show();

    }



    $scope.launchGuruRatingsModal = function(rating) {


        $scope.pending_rating = rating;
        $scope.starsSelected;

        $ionicModal.fromTemplateUrl(BASE + 'templates/guru.ratings.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruRatingsModal = modal;
            $scope.guruRatingsModal.show();
        });

    }

    $scope.closeGuruRatingsModal = function() {
      $scope.loader.show();
      $scope.guruRatingsModal.hide();

      $scope.submitGuruRatingServer();

      //check to see if there are anymore active sessions or pending ratings


    }

    $scope.goBack = function() {
      $scope.guruSessionDetailsModal.hide();
    }

    $scope.cancelGuruActiveSession = function(session) {

        //guru goes back to session 'pending', maybe clicked start by accident
        $scope.session.status = 1;

        var sessionPayload = {session: $scope.session}

          //Mixpanel Track

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);

        $scope.closeAttachActionSheet();

        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.guru-session', {sessionObj:JSON.stringify(session)})

        $timeout(function() {
          $scope.guruInSessionModal.hide()
        }, 500)


    }

    $scope.goToCashOut = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.cashout');
    }

    $scope.submitGuruRatingServer = function () {


        $scope.pending_rating.guru_rate_student = true;
        $scope.pending_rating.student_rating = parseInt($scope.root.vars.starsSelected);


      var ratingPayload = $scope.pending_rating;

      var serverCallback = function() {
        $scope.loader.hide();
      }

      $scope.loader.show();

      $scope.user.updateObj($scope.user, 'ratings', ratingPayload, $scope, serverCallback);
    }


    $scope.endSessionGuru = function() {
        //guru start session
          $scope.session.status = 3;


          //todo later
          if ($scope.timer) {
            $scope.session.minutes = $scope.timer.minutes;
            $scope.session.seconds = $scope.timer.seconds;
            $scope.session.hours = $scope.timer.hours;
          }

          var sessionPayload = {session: $scope.session}

          $scope.loader.show();

          var postServerCallback = function() {

            $scope.launchPendingActions();


          }

          console.log(sessionPayload);

          $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope, postServerCallback);

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
              if (index === 0 && confirm('Are you sure? You will lose all session progress')) {


                $timeout(function() {
                  $scope.cancelGuruActiveSession($scope.session);
                }, 500)

              }
              if (index === 1) {
                $scope.launchGuruSessionDetailsModal();
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

      if ($state.current.name !== 'root.guru') {
        return;
      }

      //priority 1: see if any ratings are allowed

      if ($scope.user.pending_student_ratings.length > 0) {

        var rating = $scope.user.pending_student_ratings[0];

        //pop the first item

        // $scope.user.pending_student_ratings.shift();

        $scope.pending_rating = rating;

        if( !$scope.guruRatingsModal || !$scope.guruRatingsModal.isShown()) {
          $scope.launchGuruRatingsModal(rating);
        }

        //no reason to
        return;

      }



      for (var i = 0 ; i < $scope.user.active_guru_sessions.length; i ++) {

            var session = $scope.user.active_guru_sessions[i];

            if (session.status === 2) {
              $scope.success.show(0, 1500, 'You have 1 active session <br> Loading...')
              $scope.session = session;
              $scope.root.vars.guru_active_session = session;

              $ionicModal.fromTemplateUrl(BASE + 'templates/guru.in-session.modal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(function(modal) {
                  $scope.guruInSessionModal = modal;
                  $scope.details = {show: true};


                  if (!$scope.guruInSessionModal.isShown()) {
                    $timeout(function() {
                      $scope.launchGuruInSessionModal();
                    }, 500)
                  }
              });

            }

      }

      $scope.loader.hide();

    }

    $scope.launchPendingActions = $scope.root.vars.launchPendingActions;






    $scope.root.vars.guru_mode = true;
    $scope.guru_mode = true;

      $scope.processPendingProposals = function(pending_proposals) {
        for (var j = 0; j < pending_proposals.length; j++) {
          index_proposal = pending_proposals[j];

          index_proposal.request.schedule_time = 45;
          index_proposal.request.verb_image = 'session.svg';



          //condense the address
          if (index_proposal.request.address.split(',').length > 2) {
            index_proposal.request.address = index_proposal.request.address.split(",").splice(0,2).join(",");
          }

        }
      }

      $scope.root.vars.processActiveProposalsGuru = function(active_proposals) {

          if ($state.current.name !== 'root.guru') {
            return;
          }

          if (active_proposals.length === 0 || !$scope.root.vars.guru_mode) {
            return;
          }

          if ($scope.root.vars.active_processing_guru) {
            console.log('we have already began processing');
            return;
          }

          $scope.root.vars.active_processing_guru = true;

          var first_proposal = active_proposals[0];
          console.log($scope.user, active_proposals)
          active_proposals.shift();
          $scope.featuredProposal = first_proposal;
          $scope.proposal = $scope.featuredProposal;




          $scope.success.show(0, 2500, '<span class="center">You have 1 new request <br> Loading....  </span>')

          $timeout(function() {
            $scope.initAndShowProposalModal();
          }, 2000);

          // var processed_time = $scope.processTimeEstimate($scope.proposal.request.time_estimate);

          // $scope.proposal.request.time_estimate = {hours: processed_time[0], minutes:processed_time[1]};

          // $scope.proposal.request.tags = ['milleniumfalcon'];

      }

      $scope.processActiveProposalsGuru = $scope.root.vars.processActiveProposalsGuru;

      $scope.processTimeEstimate = function(minutes) {
        num_hours = Math.floor(Math.round((minutes / 60.0) * 100) / 100);
        minutes = minutes % 60;
        return [num_hours, minutes];

      }

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.request.incoming.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.incomingStudentSessionProposal = modal;

        });



      $scope.initAndShowProposalModal = function() {
        $timeout(function() {
          $scope.incomingStudentSessionProposal.show();
        }, 2000)
      }


      //start timer section

      $scope.startTimerFromX = function (second) {
        $scope.timer_seconds.animate(second / 60, {duration:1000});
      }

      $scope.incrementMinute = function() {
        $scope.timer.minutes += 1;
      }

      $scope.decrementMinute = function() {
        $scope.timer.minutes -= 1;
      }

      $scope.incrementHour = function() {
        $scope.timer.hours += 1;
      }

      $scope.decrementHour = function() {
        $scope.timer.hours -= 1;
      }

      $scope.resetTimer = function() {
        var successCallback = function() {
          $scope.timer.seconds = 0;
          $scope.timer.hours = 0;
          $scope.timer.minutes = 0;
          $scope.pauseTimer();
          $scope.session.reset_timer = true;
          $scope.startTimerFromX(-1);
          $scope.user.updateObj($scope.user, 'sessions', $scope.session, $scope);

        }

        var arr_callback = [null, successCallback];

        if ($scope.platform.web) {
          if (confirm('Are you sure? \n You will lose track of all progress')) {
            successCallback();
          }
        } else {
          $scope.root.dialog.confirm('You will lose track of all progress', 'Are you sure?', ['Cancel', 'Yes'], arr_callback);
        }
      }

      $scope.addOneSecond = function() {
        $timeout(function() {


          $scope.timer.seconds += 1;
          $scope.updateTimer();
          if ($scope.timer.active) {
            $scope.startTimerFromX($scope.timer.seconds);
            $scope.addOneSecond();
          }

        },1000)
      }

      $scope.updateTimer = function() {
        if ($scope.timer.seconds > 59) {
          $scope.timer.seconds = 0;
          $scope.timer.minutes += 1;
        }
        if ($scope.timer.minutes > 59) {
          $scope.timer.minutes = 0;
          $scope.timer.hours += 1
        }

      }

   $scope.initTimer = function() {




      $scope.timer_seconds = new ProgressBar.Circle('#timer-container', {
        color: '#FFFFFF',
        strokeWidth: 3.1,
        trailColor:'#A1D5CC'
      });

      $timeout(function(){
        $scope.timer_seconds.animate(1, function() {
          $scope.timer_seconds.set(0.001);
        });
      }, 1000);

   }

    $scope.pauseTimer = function() {
      $scope.timer.active = false;
      $scope.timer_seconds.stop();
    }

    $scope.setTimer = function(seconds, minutes, hours) {
        $scope.timer.hours = hours;
        $scope.timer.minutes = minutes;
        $scope.timer.seconds = seconds;

        $scope.session.update_timer = $scope.timer;
        $scope.user.updateObj($scope.user, 'sessions', $scope.session, $scope);
    }

      //end timer section


      console.log($scope.user);


      $scope.acceptIncomingStudentProposal = function() {

        proposalObj = $scope.proposal;
        proposalObj.status = 2; //guru accepted
        proposalObj.proposal = true;

        //fake it for now...

        // if (!$scope.user.pending_proposals) {
        //   $scope.user.pending_proposals = [];
        // }

        // $scope.user.pending_proposals.push(proposalObj);

        var closeModalAfterUpdate = function($scope, $state) {
          $timeout(function() {
            $scope.incomingStudentSessionProposal.hide();
          }, 500)
          $timeout(function() {
            $scope.loader.hide();
            alert("Student request accepted. We'll let you know if they choose you! \n See below for progress");
          }, 1000)
        }

        $scope.loader.show();
        $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope, closeModalAfterUpdate);

      }

       $scope.rejectStudent = function() {


          var callbackFunction = function() {
            proposalObj = $scope.proposal;
            $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
            proposalObj.status = 3; //guru rejected
            proposalObj.proposal = true;
            $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
            $scope.success.show(0, 2000, 'Success!');
              //Mixpanel Track
            mixpanel.track("Guru.home");
            $scope.incomingStudentSessionProposal.hide();


            //timeout
            $timeout(function() {

              $scope.processActiveProposalsGuru($scope.user.active_proposals);

            }, 500);


          }



          if ($scope.platform.mobile) {
            $scope.root.dialog.confirm('You cannot undo this!', 'Are you sure?', ['Cancel', 'Yes'], [null, callbackFunction]);
          } else {
            if (confirm('Are you sure? You cannot undo this!')) {
              callbackFunction();
            }
          }

        }

        $scope.goToProposalRequestDetails = function(proposal) {

            var session = {
              request: proposal.request
            }

            // $scope.guruSessionDetailsModal.show();

            $ionicViewSwitcher.nextDirection('forward');
            $state.go('^.guru-session', {sessionObj:JSON.stringify(session)})
        }

        $scope.createGoogleLatLng = function(latCoord, longCoord) {
            return new google.maps.LatLng(latCoord, longCoord);
        }


        $scope.showGoogleMap = function() {

          if (!$scope.proposal.request.position.latitude || !$scope.proposal.request.position.longitude) {
            $scope.proposal.request.position.latitude = 51.219053;
            $scope.proposal.request.position.longitude = 4.404418;
          }

          console.log('location right before we show the map', JSON.stringify($scope.proposal.request.position));

          if (!$scope.proposal.request.position || !$scope.proposal.request.position.latitude || !$scope.proposal.request.position.longitude) {
            console.log('no coordinates... forget about it');
            return;
          }

          $scope.map = {center: {latitude: $scope.proposal.request.position.latitude, longitude: $scope.proposal.request.position.longitude }, zoom: 14, control: {} };
          $scope.options = {scrollwheel: false};

          var mapContainer = document.getElementById("map_canvas");
          var initMapCoords;


          initMapCoords = $scope.createGoogleLatLng(parseFloat($scope.proposal.request.position.latitude),parseFloat($scope.proposal.request.position.longitude))
          var mapOptions = {
            center: initMapCoords,
            zoom: 14,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            // zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
          }
          actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          )

          $scope.marker = new google.maps.Marker({
                position: initMapCoords,
                map: actual_map
          });

          $scope.actual_map = actual_map
        }

        $scope.$on('modal.shown', function() {


            //show this
            console.log('modal is shown')
            $timeout(function() {
              if (window.StatusBar) {
                StatusBar.overlaysWebView(true);
                StatusBar.styleLightContent();
              }

            }, 100);


            if ($scope.incomingStudentSessionProposal && $scope.incomingStudentSessionProposal.isShown()) {
                $scope.showGoogleMap();
            }

        });

        $scope.initGuruRankProgress = function(selector) {
          var startColor = '#68A7CF';
          var endColor = '#6FD57F';
          var circle = new ProgressBar.Circle(selector, {
              fill: 'rgba(255,255,255,.97)',
              trailColor: '#FFF',
              color: startColor,
              strokeWidth: 10,
              trailWidth: 10,
              duration: 500,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                  bar.setText((bar.value() * 100).toFixed(0));
                  bar.path.setAttribute('stroke', state.color);
              }
          });

          return circle;

        }

        var animateProgress = function(progressObj, percent, startColor, endColor) {
          progressObj.animate(percent, {
              from: {color: startColor},
              to: {color: endColor}
          });
        }

        $scope.$on('$ionicView.enter', function() {
            console.log('checking for pending actions...');

            if (!$scope.root.vars.guru_rank_initialized) {
              $scope.guruRankProgress = $scope.initGuruRankProgress('#guru-ranking-progress');

              $scope.root.vars.guru_rank_initialized = true;

              var startColor = '#68A7CF';
              var endColor = '#68A7CF';
              // var endColor = '#6FD57F';
              $timeout(function() {
                animateProgress($scope.guruRankProgress, 0.99, startColor, endColor);
              }, 500)
            }


            $scope.doRefresh();

            if ($scope.user && $scope.user.active_guru_sessions && ($scope.user.active_guru_sessions.length > 0) || $scope.user.pending_student_ratings.length > 0) {


                    $scope.root.vars.launchPendingActions();
                  // }, 1000)

            }


        });

        document.addEventListener("resume", function() {
          console.log('checking for pending actions...');

          if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {


                    $scope.root.vars.processActiveProposalsGuru($scope.user.active_proposals);


          }

          if ($scope.user && $scope.user.active_guru_sessions && ($scope.user.active_guru_sessions.length > 0) || $scope.user.pending_student_ratings.length > 0) {

                $scope.root.vars.launchPendingActions();

          }


        }, false);


        $scope.guru_rank_pending = [
          {buttonText: 'Go To Settings', descriptionText: "turning push notifications ON. Students ain't got time for email!", link:'guru-profile'},
          {buttonText: 'Complete Your Profile', descriptionText: 'adding a profile image, description, and verifying school email', link:'guru-profile'},
          {buttonText: 'Increase Your Credibility', descriptionText: 'uploading your transcript, 3rd-party tutoring profiles, and verify .edu email', link:'guru-profile'},
          {buttonText: 'Add Bank Info', descriptionText: "linking your bank account so we know you're serious about earning $$$", link:'add-payment'},
          {buttonText: 'Confirm Commitment', descriptionText: "depositing $10. If you don't make $100 your first month - you'll get it back.", link:'add-payment'}
        ];
  }

]);
