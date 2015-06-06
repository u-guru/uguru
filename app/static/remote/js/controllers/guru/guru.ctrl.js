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

  // functions relevant to these sections
    $scope.goToSessionDetails = function(session) {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru-session', {sessionObj:JSON.stringify(session)})
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.in-session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruInSessionModal = modal;
        });


    // functions relevant to these sections
    $scope.launchGuruInSessionModal = function() {

      $scope.guruInSessionModal.show();

    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruSessionDetailsModal = modal;

    });

    $scope.launchGuruSessionDetailsModal = function() {


        $scope.guruSessionDetailsModal.show();

    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.ratings.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.guruRatingsModal = modal;
    });

    $scope.launchGuruRatingsModal = function(rating) {


        $scope.pending_rating = rating;
        $scope.starsSelected;

        $scope.guruRatingsModal.show();

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

    $scope.submitGuruRatingServer = function () {
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
        $scope.launchPendingActions();
      }

      $scope.loader.show();

      console.log('payload to be submitted', ratingPayload);

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


    $scope.launchPendingActions = function() {

      //priority 1: see if any ratings are allowed

      if ($scope.user.pending_student_ratings.length > 0) {

        var rating = $scope.user.pending_student_ratings[0];

        //pop the first item

        $scope.user.pending_student_ratings.shift();

        $scope.pending_rating = rating;

        if(!$scope.guruRatingsModal.isShown()) {
          $scope.launchGuruRatingsModal(rating);
        }

        //no reason to
        return;

      }

      //see if any sessions are going on right now

      for (var i = 0 ; i < $scope.user.active_guru_sessions.length; i ++) {

            var session = $scope.user.active_guru_sessions[i];
            if (session.status === 2) {
              $scope.session = session;
              $timeout(function() {

                $scope.details = {show: true};


                if (!$scope.guruInSessionModal.isShown()) {
                  $scope.launchGuruInSessionModal();
                }

              }, 500);
            }

      }

    }






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

      $scope.processActiveProposalsGuru = function(active_proposals) {

          if (active_proposals.length === 0) {
            return;
          }

          var first_proposal = active_proposals[0];
          active_proposals.shift();
          $scope.featuredProposal = first_proposal;
          $scope.proposal = $scope.featuredProposal;
          $scope.initAndShowProposalModal();


          var processed_time = $scope.processTimeEstimate($scope.proposal.request.time_estimate);

          $scope.proposal.request.time_estimate = {hours: processed_time[0], minutes:processed_time[1]};

          // $scope.proposal.request.tags = ['milleniumfalcon'];

      }

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

      $scope.acceptIncomingStudentProposal = function() {

        proposalObj = $scope.proposal;
        proposalObj.status = 2; //guru accepted
        proposalObj.proposal = true;

        //fake it for now...r

        $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);

        if (!$scope.user.pending_proposals) {
          $scope.user.pending_proposals = [];
        }

        $scope.user.pending_proposals.push(proposalObj);


        $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);

        alert("Student request accepted. We'll let you know if they choose you! \n See below for progress");
          //Mixpanel Track



        $scope.incomingStudentSessionProposal.hide();


        //timeout
        $timeout(function() {

          $scope.processActiveProposalsGuru($scope.user.active_proposals);

        }, 500);

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

            $scope.guruSessionDetailsModal.show();

            // $ionicViewSwitcher.nextDirection('forward');
            // $state.go('^.guru-session', {sessionObj:JSON.stringify(session)})
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
            zoom: 10,
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

        $scope.$on('$ionicView.enter', function() {
            console.log('checking for pending actions...');
            //user has incoming request for help
            if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {


                    $scope.processActiveProposalsGuru($scope.user.active_proposals);


            }

            if ($scope.user && ($scope.user.active_guru_sessions.length > 0) || $scope.user.pending_student_ratings.length > 0) {



                    $scope.launchPendingActions();
                    //check to see if any of the guru sessions are active


            }

        });

        document.addEventListener("resume", function() {
          console.log('checking for pending actions...');

          if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {


                    $scope.processActiveProposalsGuru($scope.user.active_proposals);


          }

          if ($scope.user && ($scope.user.active_guru_sessions.length > 0) || $scope.user.pending_student_ratings.length > 0) {



                  $scope.launchPendingActions();
                  //check to see if any of the guru sessions are active


          }


        }, false);





  }

]);
