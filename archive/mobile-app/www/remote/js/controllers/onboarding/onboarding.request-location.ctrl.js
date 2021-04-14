
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
    'LoadingService',
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $rootScope, LoadingService) {

    var failureCallback = function($scope, $state) {
        LoadingService.hide();
        //mixpanel track
        mixpanel.track("Onboarding.prompt");
      $state.go('^.prompt-location');
    }

    var callbackSuccess = function($scope, $state) {
        LoadingService.hide();
        //mixpanel track
        mixpanel.track("Onboarding.nearest");
        $state.go('^.onboarding-nearest-university');
    }

    $scope.$on('$ionicView.loaded', function(){
      var header = document.getElementById('header');
      var body = document.getElementById('body');
      var footer_1 = document.getElementById('footer_1');
      var footer_2 = document.getElementById('footer_2');


      // $timeout(function() {
      //   $timeout(function() {
      //   header.classList.add('bounceInDown');
      //   }, 1000);

      //   $timeout(function() {
      //     body.classList.add('lightSpeedIn');
      //   }, 1500);

      //   $timeout(function() {
      //     footer_1.classList.add('fadeInLeftBig');
      //   }, 2000);

      //   $timeout(function() {
      //     footer_2.classList.add('fadeInRightBig');
      //   }, 2500);
      // }, 1000)
    });

    $scope.togglePersonGuru = function() {

      if (!$scope.platform.mobile) {
          //mixpanel track
          mixpanel.track("Onboarding.nearest");
        $state.go('^.onboarding-nearest-university');

      }
      //if android
      else if
        ($scope.platform.android) {
          if ($scope.nearest_universities && $scope.nearest_universities.length > 0) {
              //mixpanel track
              mixpanel.track("Onboarding.nearest");
            $state.go('^.onboarding-nearest-university');
          } else {
              //mixpanel track
              mixpanel.track("Onboarding.nearest");
            $state.go('^.onboarding-nearest-university');
          }
      }

      //if ios
      else if ($scope.platform.ios) {
          //do prompt for ios & then run geolocation for background;

          // if (ionic.Platform && ionic.Platform.device()) {
          //   $scope.user.current_device = ionic.Platform.device();
          // }

          // Temporary
          //mixpanel track
          mixpanel.track("Onboarding.nearest");
          $state.go('^.onboarding-nearest-university');
          // Geolocation.getUserPosition($scope, callbackSuccess, failureCallback, $state);
      }
      else if ($scope.platform.web)  {
        return
      } else {
          //mixpanel track
          mixpanel.track("Onboarding.nearest");
          $state.go('^.onboarding-nearest-university');
      }
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

      if ($scope.location_error === 'turned-off') {
        return;
      }

      //else case
      var posOptions = {
          timeout: 10000,
          enableHighAccuracy: false, //may cause high errors if true
      };



      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.location_error = null;
        }, function(err) {
          if (err.code === 1) {
            $scope.location_error = 'denied';
            return
          }
          if (err.code === 2) {
            $scope.location_error = 'unavailable';
            return
          }
          if (err.code === 3) {
            $scope.location_error = 'timeout';
            return

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




