angular.module('uguru.onboarding.controllers')

.controller('OnboardingNearestUniversityController', [
    '$scope',
    '$state',
    '$timeout',
    '$localstorage',
    'Geolocation',
    '$ionicPosition',
    '$cordovaDialogs',
    '$cordovaGeolocation',
    '$ionicPlatform',
    '$ionicModal',
    '$cordovaKeyboard',
    '$cordovaStatusbar',
    '$ionicViewSwitcher',
    'LoadingService',
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $ionicModal, $cordovaKeyboard, $cordovaStatusbar, $ionicViewSwitcher, LoadingService) {

    $scope.search_text = '';
    $scope.header_text = 'Nearby Schools';

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.universities = $scope.static.universities;

        if ($scope.platform.ios && window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $scope.$on('$ionicView.afterEnter', function(){
        $scope.setFocus = function(target) {
          if ($scope.search_text.length === 0 && !$scope.keyboard_force_off) {
            document.getElementsByName("university-input")[0].focus();
            $scope.search_active = true;
          } else {
            $scope.search_active = false;
          }
        };

        $scope.clearSearchInput = function() {
            $scope.search_text = '';
        };


        if ($scope.static.nearest_universities.length === 0) {
            $scope.search_active = ($scope.static.universities && $scope.static.universities.length > 0)
            if ($scope.search_active) {
                $scope.header_text = 'Select University';
                $scope.setFocus();
            }
        }
    });

    $scope.hideKeyboard = function() {
        $scope.closeKeyboard();
    }


    $scope.nearest_universities = $scope.static.nearest_universities;

    $scope.n_universities = $scope.nearest_universities.slice(0,10);
    //to let modal know that this is onboarding
    $scope.onboarding = true;

    $scope.nearestUniversitySelected = function($event, n_university) {

        // if (!$scope.addUniversityModal.isShown()) {

            var elems = document.querySelectorAll(".selected");

            [].forEach.call(elems, function(el) {
                if (el.checked === true) {
                    el.classList.remove("selected");
                    el.checked = false;
                }
            });

            $event.target.classList.add("selected");

        // }

        $scope.user.university_id = n_university.id;
        $scope.user.university = n_university;
        $scope.user.university.latitude = n_university.location.latitude;
        $scope.user.university.longitude = n_university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;

        $scope.user.updateAttr('university_id', $scope.user, $scope.user.university_id, null, $scope);
        if ($scope.platform.mobile) {
            $scope.closeKeyboard();
        }
        LoadingService.show();
        $timeout(function() {

            // $scope.addUniversityModal.hide();
            LoadingService.hide();
            $ionicViewSwitcher.nextDirection('forward');
            //mixpanel track
            mixpanel.track("Student.home");
            $state.go('^.student-home');
        }, 1000);
    };

    $scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
    }

    // $ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    // }).then(function(modal) {
    //     $scope.addUniversityModal = modal;
    // });

}]);




