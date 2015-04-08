angular.module('uguru.onboarding.controllers', [])

.controller('OnboardingRequestLocationController', [
    '$scope',
    '$state',
    '$timeout',
    '$localstorage',
    'Geolocation',
    '$ionicPosition',
    '$cordovaDialogs',
    '$cordovaGeolocation',
    '$ionicPlatform',
    '$cordovaStatusbar',
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform) {

    var failureCallback = function($scope, $state) {
      $scope.loader.hide();
      $state.go('^.prompt-location');
    }

    var callbackSuccess = function($scope, $state) {
      $scope.loader.hide();
      $state.go('^.onboarding-nearest-university');
    }

    $scope.togglePersonGuru = function() {
      //if user is ios.. prompt

      // $scope.loader.show();

      if ($scope.platform.ios || !$scope.platform.mobile) {

        Geolocation.getUserPosition($scope, callbackSuccess, failureCallback, $state);
      }

      else if
        ($scope.platform.android) {
          if ($scope.nearest_universities && $scope.nearest_universities.length > 0) {
            $state.go('^.onboarding-nearest-university');
          } else {
            $state.go('^.onboarding-nearest-university');
          }
      }


      // if ($scope.platform.isIOS()) {
      //     //do prompt for ios & then run geolocation for background;
      //     console.log('I am testing through ios app.')
      // }
      // else if ($scope.platform.web)  {
      //         console.log('I am testing through the web.')
      // } else {
      //     $state.go('^.onboarding-nearest-university');
      // }
    }



          // $scope.person_guru_checkbox = !$scope.person_guru_checkbox;
          // if ($scope.person_guru_checkbox) {
          //   // $scope.user.position = null;

          //   // $scope.checkLocationStatus();
          //   if (!$scope.requestPosition && !$scope.user.current_device.location_enabled) {
          //     //get location & fire the modal

          //   }
          //   //user already has provided access to their location
          //   else {
          //     $scope.requestMapModal.show();
          //   }
          // }

    $scope.checkLocationStatus = function() {

      console.log('current location status is..', $scope.location_error);
      if ($scope.location_error === 'turned-off') {
        console.log('skipping status check upon user request...');
        return;
      }

      //else case
      var posOptions = {
          timeout: 10000,
          enableHighAccuracy: false, //may cause high errors if true
      };


      console.log('checking status of user location services...')

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.location_error = null;
          console.log('user has it turned on');

        }, function(err) {
          if (err.code === 1) {
            $scope.location_error = 'denied';
            console.log('user has denied...');
          }
          if (err.code === 2) {
            $scope.location_error = 'unavailable';
            console.log('it is unavailable...');
          }
          if (err.code === 3) {
            console.log('it is unavailable...');
            $scope.location_error = 'timeout';
          }
      });
    }



    // $scope.saveRequestToUser = function() {
    //   $scope.request.status = 0;
    //   $scope.request._file = null;
    //   $scope.request.online = $scope.virtual_guru_checkbox;
    //   $scope.request.in_person = $scope.person_guru_checkbox;
    //   $scope.request.time_estimate = $scope.time_checkbox;
    //   $scope.request.address = $scope.request.location;

    //   if ($scope.calendar && $scope.calendar.num_selected > 0) {
    //     $scope.request.calendar = $scope.calendar;
    //     $scope.request.calendar_events = $scope.calendar.data;
    //   }

    //   if ($scope.requestPosition) {
    //     $scope.request.position = $scope.user.position.coords;
    //   }

    //   $scope.user.createObj($scope.user, 'requests', $scope.request, $scope);

    // }




    // $scope.showDialog = function(msg, title, button_name, callback) {
    //   $cordovaDialogs.alert(msg, title, button_name).then(function() {
    //     if (callback) {
    //       callback();
    //     }
    //   });
    // }

    $scope.toggleLocationService = function() {
      if (!$scope.location_error) {
        $scope.location_error = 'turned-off';
      } else {
        var location_error =  $scope.location_error;
        if (location_error == 'denied') {
          var callbackSuccess = function() {
            $scope.requestMapModal.hide()
          }
          $scope.showDialog('Please go to privacy settings, turn on location services for Uguru, and try again', 'Location Error', 'OK', callbackSuccess);
        } else if (location_error == 'unavailable') {
          $scope.showDialog('Sorry, GPS is currently unavailable for your phone at the moment. Please try again later', 'Location Error', 'OK');
        } else if (location_error == 'timeout') {
          $scope.showDialog('Sorry, GPS is currently unavailable for your phone at the moment. Please try again later', 'Location Error', 'OK');
        } else {
          Geolocation.getUserPosition($scope, $scope.showRequestMapModal);
          $scope.location_error = null;
        }
      }
    }

}]);




