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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $stateParams,
  Geolocation, $cordovaGeolocation, Restangular, $ionicHistory) {

    $scope.session = JSON.parse($stateParams.sessionObj);
    $scope.recursive_delay = 60000;
    $scope.guru = {};
    console.log($scope.session);
    $scope.goToSessionMessages = function(session) {
      $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.^.student.guru-profile', {guruObj:JSON.stringify(session.student)});
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

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);
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

    // $scope.bgGeo = window.plugins.backgroundGeoLocation;

    $scope.student_position = null;
    $scope.guru_position = null;

    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
    $scope.options = {scrollwheel: false};

    $scope.startBackgroundGeolocation = function() {

      options =  {
        desiredAccuracy: 5,
        stationaryRadius: 20,
        distanceFilter: 30,
        activityType: 'Fitness',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false
      }
      $cordovaBackgroundGeolocation.configure(options)
      .then(
        function(success) {
          console.log(success);
        }, // Background never resolves
        function (err) { // error callback
          console.error(err);
        },
        function (location) { // notify callback
          console.log(location);
        });
    }

    $scope.finishBackgroundTask = function() {
        console.log('closing background task...');
        $scope.bgGeo.finish();
    };

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

    $scope.geoCallbackFn = function(location) {
        console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
        // Do your HTTP request here to POST location to your server.
        //
        //

        $scope.syncPositionWithServer(location, $scope.finishBackgroundTask);
    };

    $scope.geoFailureFn = function(error) {
        console.log('BackgroundGeoLocation error');
    }

    $scope.getCurrentPositionAndSync = function(time) {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};

      if ($state.current.name != 'root.guru.active-session') {
        $scope.bgGeo.stop();
        console.log('do not run background script anymore');
        return;
      }

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

            if ($state.current.name != 'root.guru.active-session') {
              $scope.bgGeo.stop();
              console.log('do not run background script anymore');
              return;
            }

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
            zoomControl: true,
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

    $scope.geoOptions = {
      timeout: 10000,
      enableHighAccuracy: false, //may cause high errors if true
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
          $scope.showGeoLocationError(err);

      });

    }

    $scope.$on('$ionicView.beforeLeave', function(){
      // $scope.bgGeo.stop();
      // console.log('stopping background');
    });

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.drawGoogleMap();

      if (!$scope.user.last_position || !$scope.user.last_position.latitude) {
        console.log('no last position on record... starting now every', $scope.recursive_delay, 'seconds');
        $scope.getUserRecentLocation($scope.recursive_delay);
      }

    });


  }

]);

