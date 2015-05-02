angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruActiveSession', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$stateParams',
  'Geolocation',
  '$cordovaGeolocation',
  'Restangular',
  '$ionicHistory',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$cordovaActionSheet',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $stateParams,
  Geolocation, $cordovaGeolocation, Restangular, $ionicHistory,
  $ionicPlatform, $cordovaStatusbar, $cordovaActionSheet, $ionicPlatform) {


    $ionicPlatform.ready(function() {

      if (window.StatusBar) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }


       var options = {
          title: 'Session Options',
          buttonLabels: ['Request Details'],
          addCancelButtonWithLabel: 'Close',
          androidEnableCancelButton : true,
          winphoneEnableCancelButton : true,
          addDestructiveButtonWithLabel : 'Cancel Request'
        };

         $scope.showOptions = function() {

            $cordovaActionSheet.show(options)
              .then(function(btnIndex) {
                if (btnIndex === 1) {
                  if ($scope.session) {
                    cancelSession($scope.session);
                  }
                }
              });

          }

    });

    $scope.$on('$ionicView.beforeEnter', function() {
      console.log('before enter, parsing the session obj..')
      $scope.session = JSON.parse($stateParams.sessionObj);
      $scope.recursive_delay = 60000;
      $scope.guru = {};


      //initializing stuff
      $scope.student_position = null;
      $scope.guru_position = null;

      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
      $scope.options = {scrollwheel: false};

      $scope.geoOptions = {
        timeout: 10000,
        enableHighAccuracy: false, //may cause high errors if true
      }

    });

    $scope.loadMapDelayed = function () {
      $timeout(function() {
              if (document.getElementsByClassName('gm-style').length === 0) {
                console.log("500-loaded: map hasn't been drawn yet, attempting to redraw");
                $scope.drawGoogleMap();
                $scope.loader.hide();
              }
            }, 500);

          $timeout(function() {
              if (document.getElementsByClassName('gm-style').length === 0) {
                console.log("1000-loaded: map hasn't been drawn yet, attempting to redraw");
                $scope.drawGoogleMap();
                $scope.loader.hide();
              }
            }, 1000);


            $timeout(function() {
              if (document.getElementsByClassName('gm-style').length === 0) {
                console.log("1500-loaded: map hasn't been drawn yet, attempting to redraw");
                $scope.drawGoogleMap();
                $scope.loader.hide();
              }
            }, 1500);
    }

    $scope.$on('$ionicView.loaded', function() {


      $scope.loadMapDelayed();

      if (!$scope.user.last_position || !$scope.user.last_position.latitude) {
        console.log('no last position on record... starting now every', $scope.recursive_delay, 'seconds');
        $scope.getUserRecentLocation($scope.recursive_delay);
      }

    });


    $scope.goToSessionMessages = function(session) {
      $state.go('^.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.guru-profile', {guruObj:JSON.stringify(session.student)});
    }

    $scope.goBack = function() {
      $ionicHistory.goBack();
    }


    $scope.cancelSession = function(session) {

      var dialogCallBackSuccess = function() {
        //guru cancels session
        $scope.session.status = 5;

        var sessionPayload = {session: $scope.session}

        $scope.user.previous_guru_sessions.push($scope.session);

        //remove session locally from active guru session
        $scope.root.util.removeObjectByKey($scope.user.active_guru_sessions, 'id', $scope.session.id);

        //update session locally
        $scope.root.util.updateObjectByKey($scope.user.guru_sessions, 'id', $scope.session.id, 'status', 5);

        $state.go('^.home');

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);
      }

      var dialog = {
        message: "Are you sure? This will be closely investigated by us and may impact your Guru ranking.",
        title: "Cancel Session",
        button_arr: ['Never Mind', 'Cancel Session'],
        callback_arr: [null, dialogCallBackSuccess]
      }

      $scope.root.dialog.confirm(dialog.message, dialog.title, dialog.button_arr, dialog.callback_arr);
    }

    $scope.continueSession = function(session) {
        $state.go('^.guru-session-start', {sessionObj:JSON.stringify(session)});
    }


    $scope.startSessionTimer = function(session) {
      console.log(session);

      var dialogCallBackSuccess = function() {

        var serverCallback = function() {
          $state.go('^.guru-session-start', {sessionObj:JSON.stringify(session)});
        }

        //guru start session
        $scope.session.status = 2;
        $scope.session.minutes = 0;
        $scope.session.hours = 0;
        $scope.session.seconds = 0;

        var sessionPayload = {session: $scope.session}

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope, serverCallback);
      }

      var dialog = {
        message: "Only start if the student is around you and you're good to go",
        title: "Are you sure?",
        button_arr: ['Cancel', 'Yes'],
        callback_arr: [null, dialogCallBackSuccess]
      }

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog.message)) {
            dialogCallBackSuccess();
        }

      } else {
            $scope.root.dialog.confirm(dialog.message, dialog.title, dialog.button_arr, dialog.callback_arr);
      }

    }

    $scope.getCurrentDate = function() {
        var d = new Date();
        var hour = d.getHours() % 12;
        var minutes = d.getMinutes();
        if (d.getHours() >= 12)  {
          ending = 'PM'
        } else {
          ending = 'AM'
        }
        result = hour + ':' + minutes + ' ' + ending
        return result
    }



    $scope.getCurrentPositionAndSync = function(time) {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.syncPositionWithServer(position);
          $scope.guru_position = position;
          if (time) {
              $timeout(function() {
              $scope.getCurrentPositionAndSync(time)
            }, time);
          }
        }, function(err) {
          console.log(err);
      });
    }

    $scope.sortPositionComparator = function(pos_a, pos_b) {
        return pos_a.id - pos_b.id;
    }

    $scope.syncPositionWithServer = function(position, callback) {
      if (!callback) {
        var payload = {
          session_position_guru: true,
          position: position.coords,
          session: $scope.session
        }
      } else {
        var payload = {
          session_position_guru: true,
          position: position,
          session: $scope.session
        }
      }
      Restangular
        .one('user', $scope.user.id).one('sessions')
        .customPUT(JSON.stringify(payload))
        .then(function(session){

            $scope.session = session.plain();
            $scope.session.student_positions.sort($scope.sortPositionComparator)
            $scope.session.guru_positions.sort($scope.sortPositionComparator)

            $scope.guru_position = $scope.session.guru_positions[$scope.session.guru_positions.length-2, $scope.session.guru_positions.length -1];
            $scope.student_position = $scope.session.student_positions[$scope.session.student_positions.length-2, $scope.session.student_positions.length-1];
            $scope.last_updated = $scope.getCurrentDate();
            $scope.drawGoogleMap($scope.guru_position, $scope.student_position);
            if (callback) {
              callback(position)
            }
        }, function(err){
            console.log(err);
            console.log('error...something happened with the server;')
        });

    }

    $scope.createGoogleLatLng = function(latCoord, longCoord) {
      return new google.maps.LatLng(latCoord, longCoord);
    }

    $scope.drawMapWithSchoolCoordinates = function() {

          var mapContainer = document.getElementById("map_canvas");
          var initMapCoords = $scope.createGoogleLatLng(
                                parseFloat($scope.user.university.latitude),
                                parseFloat($scope.user.university.longitude)
                            )

          var mapOptions = {
            center: initMapCoords,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
          }

          var actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          )

          $scope.actual_map = actual_map;

          //draw google markers

          var studentCoords = $scope.createGoogleLatLng(
                                parseFloat($scope.user.university.latitude),
                                parseFloat($scope.user.university.longitude)
                            )


          $scope.map.student_marker = new google.maps.Marker({
              position: studentCoords,
              map: actual_map,
              draggable:true
            });

          // $scope.drawGoogleMarkers(parseFloat($scope.user.university.latitude), parseFloat($scope.user.university.longitude), actual_map);
    }

    $scope.drawGoogleMap = function(pos_a, pos_b, markers_option) {

          if (!pos_a) {
            pos_a = {
              latitude: $scope.user.university.latitude,
              longitude: $scope.user.university.longitude
            }
          }

          var mapContainer = document.getElementById("map_canvas");
          var initMapCoords = $scope.createGoogleLatLng(
                                parseFloat(pos_a.latitude),
                                parseFloat(pos_a.longitude)
                            )

          var mapOptions = {
            center: initMapCoords,
            zoom: 15,
            disableDefaultUI: true,
            zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
          }

          var actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          )

          $scope.actual_map = actual_map;

          //if this is passed in as an argument
          if (markers_option) {

            $scope.drawGoogleMarkers(pos_a, pos_b, actual_map);

          }
    }



    $scope.drawGoogleMarkers = function(position_a, position_b, map) {
      if (position_a) {

        var studentCoords = $scope.createGoogleLatLng(
                                position_a.latitude,
                                position_a.longitude
                            )
        $scope.map.student_marker = new google.maps.Marker({
            position: studentCoords,
            map: map,
            draggable:true
          });

      }


      if (position_b) {

        var guruCoords = $scope.createGoogleLatLng(
                                position_b.latitude,
                                position_b.longitude
                            )
        $scope.map.guru_marker = new google.maps.Marker({
            position: guruCoords,
            map: map,
            draggable:true
          });

      }

      if (position_a && position_b) {
          var bounds = new google.maps.LatLngBounds();
          bounds.extend(guruCoords);
          bounds.extend(studentCoords);
          map.fitBounds(bounds);
      }

    }

    $scope.goToSessionMessages = function(session) {
      $state.go('^.messages', {sessionObj:JSON.stringify(session)});
    }




    $scope.showGeoLocationError = function(err) {
      if (err.code === 1) {
          alert('Please change your settings');
          $scope.location_error = 'denied';
      }
      if (err.code === 2 || err.code === 3) {
        alert('GPS strength isnt strong enough');
        $scope.location_error = 'unavailable';
      }
    }

    $scope.getUserRecentLocation = function(recursive_delay) {

      $cordovaGeolocation
      .getCurrentPosition($scope.geoOptions)
      .then(function (position) {

        $scope.user.last_position = position.coords;

        console.log('user is at ' + $scope.user.last_position.latitude + ',' + $scope.user.last_position.longitude);

        $scope.drawGoogleMap($scope.user.last_position, $scope.guru.last_position, true);

        if (recursive_delay) {
          $timeout(function() {
            $scope.getUserRecentLocation(recursive_delay);
          }, recursive_delay);
        }

      }, function(err) {
          console.log('error from gps', err);
          $scope.drawMapWithSchoolCoordinates();

      });

    }

  }

]);

