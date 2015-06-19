angular.module('uguru.student.controllers')

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
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher, $ionicActionSheet)     {


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

    $scope.cancelRequest = function(request) {
      if (confirm('Are you sure you want to cancel this request?')) {
        request.status = 4;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);


        if (request._type !== 2) {
          var cancelMsg = request.course.short_name + ' request canceled';
        } else {
          var cancelMsg = request.category +  'Task request canceled';
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
          $timeout(function() {
            $scope.launchPendingActions();
          }, 500);
        }

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

    $scope.launchPendingActions = function() {

            //priority 1: see if any ratings are allowed

      if ($scope.user.pending_guru_ratings.length > 0) {

        var rating = $scope.user.pending_guru_ratings[0];
        //pop the first item

        $scope.user.pending_guru_ratings.shift();

        $scope.pending_rating = rating;

        $scope.launchStudentRatingsModal(rating);

        if(!$scope.studentRatingsModal.isShown()) {
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

    console.log($scope.user);

    $scope.launchContactingModal = function() {
      $scope.contactingModal.show();
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


    $scope.initAndShowIncomingRequestModal = function() {

       $ionicModal.fromTemplateUrl(BASE + 'templates/student.request.incoming.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.incomingGuruModal = modal;
            $scope.incomingGuruModal.show();
        });

    }



    $scope.processTimeEstimate = function(minutes) {
        num_hours = Math.floor(Math.round((minutes / 60.0) * 100) / 100);
        minutes = minutes % 60;
        return [num_hours, minutes];

    }

    $scope.processIncomingRequests = function(incoming_requests) {

      if (incoming_requests.length === 0) {
        return;
      }


      //get first one out of array
      var incoming_request = incoming_requests[0];
      console.log(incoming_request);

      //get rid of the first one
      incoming_requests.shift();

      //get first one out of array
      $scope.incoming_request = incoming_request;

      //get first one out of array
      $timeout(function() {
        console.log('incoming requests');
        $scope.initAndShowIncomingRequestModal();


        var processed_time = $scope.processTimeEstimate($scope.incoming_request.time_estimate);

        $scope.incoming_request.time_estimate = {hours: processed_time[0], minutes:processed_time[1]};

        // $scope.incoming_request.tags = ['milleniumfalcon'];

      }, 500);

    }

     $scope.createGoogleLatLng = function(latCoord, longCoord) {
            return new google.maps.LatLng(latCoord, longCoord);
        }



      $scope.showGoogleMap = function() {

        if (!$scope.incoming_request.position.latitude || !$scope.incoming_request.position.longitude) {
            $scope.incoming_request.position.latitude = 51.219053;
            $scope.incoming_request.position.longitude = 4.404418;
        }


        if (!$scope.incoming_request.position || !$scope.incoming_request.position.latitude || !$scope.incoming_request.position.longitude) {
          console.log('no coordinates... forget about it');
          return;
        }

        $scope.map = {center: {latitude: $scope.incoming_request.position.latitude, longitude: $scope.incoming_request.position.longitude }, zoom: 14, control: {} };
        $scope.options = {scrollwheel: false};

        var mapContainer = document.getElementById("map_canvas");
        var initMapCoords;


        initMapCoords = $scope.createGoogleLatLng(parseFloat($scope.incoming_request.position.latitude),parseFloat($scope.incoming_request.position.longitude))
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

    //todo
    $scope.acceptIncomingGuru = function() {

      var acceptGuruCallback = function() {

        $scope.incoming_request.guru_id = $scope.incoming_request.guru.id;
        $scope.incoming_request.status = 1;


        $scope.loader.show()

        var closeModalAndShowSessionStatus = function($scope, $state) {
          $scope.loader.hide();
          $scope.incomingGuruModal.hide();
        }

        $scope.user.createObj($scope.user, 'sessions', $scope.incoming_request, $scope, closeModalAndShowSessionStatus);



        $scope.incoming_request.status = 2;

      }

      $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.incoming_request.id);

      //remove request from array
      dialog_title = "Accept this Guru?";
      dialog_message = "You will not be billed until the end of the session & 100% satisfaction guaranteed";
      button_arr = ['Not ready', 'Yes'];

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog_message)) {
            acceptGuruCallback();
        }

      } else {
            $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, acceptGuruCallback])
      }

    }


    //todo
    $scope.rejectIncomingGuru = function() {

      var rejectGuruCallback = function() {
          requestObj = $scope.incoming_request;
          requestObj.status = 3;

          //remove request from array
          $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.incoming_request.id);

          $scope.root.util.updateObjectByKey($scope.user.requests, 'id', $scope.incoming_request.id, 'status', 0);

          $scope.user.updateObj($scope.user, 'requests', requestObj, $scope);
          $scope.success.show(0, 2000, 'Guru successfully rejected');

          $scope.incomingGuruModal.hide();
      }


      dialog_title = "Are you sure?";
      dialog_message = "You may not hear from this Guru again for this request";
      button_arr = ['Cancel', 'Sure'];
      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog_message)) {
          rejectGuruCallback();
        }
      } else {
        $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, rejectGuruCallback])
      }
    }

    $scope.acceptIncomingQuestion = function() {

      var acceptQuestionCallback = function() {

        requestObj = $scope.incoming_request;
        requestObj.status = 15;

          //remove request from array
        $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.incoming_request.id);

        // $scope.root.util.updateObjectByKey($scope.user.requests, 'id', $scope.incoming_request.id, 'status', 0);

        $scope.loader.show()

        var closeModalAndShowQuestionComplete = function($scope, $state) {
          $scope.loader.hide();
          $scope.incomingGuruModal.hide();
        }

        $scope.user.updateObj($scope.user, 'requests', requestObj, $scope, closeModalAndShowQuestionComplete);

      }

      //remove request from array
      dialog_title = "Accept this Question?";

      if ($scope.incoming_request.student_price) {
        dialog_message = "Your card **-" + $scope.user.default_payment_card.card_last4 + " will be billed $" + parseInt($scope.incoming_request.student_price) + ".";
      } else {
        dialog_message = "The guru will be notified & their reputation will be increased!";
      }

      button_arr = ['Not sure yet', 'Yes'];

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog_message)) {
            acceptQuestionCallback();
        }

      } else {
            $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, acceptQuestionCallback])
      }

    }

    $scope.rejectIncomingQuestion = function() {

      var rejectQuestionCallback = function() {
          requestObj = $scope.incoming_request;
          requestObj.status = 3;

          //remove request from array
          $scope.root.util.removeObjectByKey($scope.user.incoming_requests, 'id', $scope.incoming_request.id);

          $scope.root.util.updateObjectByKey($scope.user.requests, 'id', $scope.incoming_request.id, 'status', 0);

          $scope.user.updateObj($scope.user, 'requests', requestObj, $scope);
          $scope.success.show(0, 2000, 'Response rejected. Searching for another Guru to reply.');

          $scope.incomingGuruModal.hide();
      }


      dialog_title = "Are you sure?";
      dialog_message = "We will try our best to get your question answered again!";
      button_arr = ['Cancel', 'Sure'];
      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog_message)) {
          rejectQuestionCallback();
        }
      } else {
        $scope.root.dialog.confirm(dialog_message, dialog_title, button_arr, [null, rejectQuestionCallback])
      }
    }

    $scope.$on('modal.shown', function() {

          if ($scope.incomingGuruModal && $scope.incomingGuruModal.isShown()) {
            $timeout(function() {
              if (window.StatusBar) {
                StatusBar.overlaysWebView(true);
                StatusBar.styleLightContent();
              }

              $scope.showGoogleMap();

            }, 100);



          }

      });


     $scope.$on('$ionicView.enter', function() {

        //user has incoming request for help
        if ($scope.user.incoming_requests && $scope.user.incoming_requests.length > 0) {
          $timeout(function() {
            $scope.processIncomingRequests($scope.user.incoming_requests);
          }, 500)
        }

        //student specific functions
        if ($scope.user && $scope.user.active_student_sessions
          && ($scope.user.active_student_sessions.length > 0 || $scope.user.pending_guru_ratings.length > 0)) {

                console.log('checking for user actions...');
                $scope.launchPendingActions();

        }

        // $scope.launchPendingActions();

    });



    document.addEventListener("resume", function() {


        console.log('device resumed... checking student actions');

        if ($scope.user.incoming_requests && $scope.user.incoming_requests.length > 0) {
          $timeout(function() {
            $scope.processIncomingRequests($scope.user.incoming_requests);
          }, 500)
        }

        //student specific functions
        if ($scope.user && $scope.user.active_student_sessions
          && ($scope.user.active_student_sessions.length > 0 || $scope.user.pending_guru_ratings.length > 0)) {

                $scope.launchPendingActions();

        }

    }, false);

    // $timeout(function() {
    //   $state.go('^.become-guru');
    // }, 4000)

  }

]);
