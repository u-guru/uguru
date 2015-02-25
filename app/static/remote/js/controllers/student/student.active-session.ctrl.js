angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentActiveSession', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  'Geolocation',
  '$cordovaGeolocation',
  '$cordovaBackgroundGeolocation',
  'Restangular',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams,
  Geolocation, $cordovaGeolocation, $cordovaBackgroundGeolocation,
  Restangular) {

    $scope.session = JSON.parse($stateParams.sessionObj);

    $scope.guru = {
      first_name: 'Shun',
      course:$scope.session.course.short_name,
      guru_courses: $scope.user.student_courses
    }

    $scope.bgGeo = window.plugins.backgroundGeoLocation;

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

    $scope.bgGeo.configure($scope.geoCallbackFn, $scope.geoFailureFn, {
        desiredAccuracy: 1,
        stationaryRadius: 20,
        distanceFilter: 30,
        activityType: 'Fitness',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
    });



    $scope.getCurrentPositionAndSync = function(time) {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.syncPositionWithServer(position);
          $scope.student_position = position;
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
          session_position_student: true,
          position: position.coords,
          session: $scope.session
        }
      } else {
        var payload = {
          session_position_student: true,
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
            $scope.drawGoogleMap($scope.student_position, $scope.guru_position);
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

    $scope.drawGoogleMap = function(pos_a, pos_b) {
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

          var actual_map = $scope.map.control.getGMap();
          actual_map = new google.maps.Map(
                  mapContainer,
                  mapOptions
          )

          $scope.actual_map = actual_map

          $scope.drawGoogleMarkers(pos_a, pos_b, actual_map);

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

    $scope.calculateDistance = function(position_a, position_b) {

    }

    $scope.goToSessionMessages = function(session) {
      console.log('going to session messages..')
      console.log(session);
      $state.go('^.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru)});
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.ratingModal = modal;
    });


    $scope.$on('$ionicView.beforeLeave', function(){
      $scope.bgGeo.stop();
      console.log('stopping background');
    });

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('starting background...')
      $scope.getCurrentPositionAndSync(20000);
      $scope.last_updated = $scope.getCurrentDate
      $scope.bgGeo.start();
    });

  }

]);

