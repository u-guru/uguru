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
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop)     {

  console.log($scope.user);

  if ($scope.user && $scope.user.active_requests && $scope.user.active_requests.length > 0) {
    // $ionicSideMenuDelegate.canDragContent(false);

    $scope.cancelRequest = function(request) {
      if (confirm('Are you sure you want to cancel this request?')) {
        request.status = 4;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);

        var cancelMsg = request.course.short_name + ' request canceled';
        $scope.success.show(0, 2000, cancelMsg);
        $scope.root.util.removeObjectByKey($scope.user.active_requests, 'id', request.id);
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
      if ($scope.root.vars.courses) {

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

      } else {
        alert('courses are not loaded yet');
      }
    }

    $scope.launchContactingModal = function() {
      $scope.contactingModal.show();
    }



    $scope.closeContactingModal = function() {
      $scope.contactingModal.hide();
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

      //get rid of the first one
      incoming_requests.shift();

      //get first one out of array
      $scope.incoming_request = incoming_request;

      //get first one out of array
      $scope.initAndShowIncomingRequestModal();


      var processed_time = $scope.processTimeEstimate($scope.incoming_request.time_estimate);

      $scope.incoming_request.time_estimate = {hours: processed_time[0], minutes:processed_time[1]};

      $scope.incoming_request.tags = ['milleniumfalcon'];

    }

     $scope.createGoogleLatLng = function(latCoord, longCoord) {
            return new google.maps.LatLng(latCoord, longCoord);
        }



      $scope.showGoogleMap = function() {

        $scope.incoming_request.position.latitude = 51.219053;
        $scope.incoming_request.position.longitude = 4.404418;


        if (!$scope.incoming_request.position || !$scope.incoming_request.position.latitude || !$scope.incoming_request.position.longitude) {
          console.log('no coordinates... forget about it');
          return;
        }

        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
        $scope.options = {scrollwheel: false};

        var mapContainer = document.getElementById("map_canvas");
        var initMapCoords;


        initMapCoords = $scope.createGoogleLatLng(parseFloat($scope.incoming_request.position.latitude),parseFloat($scope.incoming_request.position.longitude))
        var mapOptions = {
          center: initMapCoords,
          zoom: 17,
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
      var doNothing;
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

     $scope.$on('$ionicView.afterEnter', function() {

        //user has incoming request for help
        if ($scope.user.incoming_requests && $scope.user.incoming_requests.length > 0) {
          $scope.processIncomingRequests($scope.user.incoming_requests);
        }

    });


    // $timeout(function() {

    //   $ionicModal.fromTemplateUrl(BASE + 'templates/price.home.modal.html', {
    //           scope: $scope,
    //           animation: 'slide-in-up'
    //       }).then(function(modal) {
    //         $scope.priceModal = modal;
    //         $scope.priceModal.show();
    //   }, 500);
    // });

  }

]);
