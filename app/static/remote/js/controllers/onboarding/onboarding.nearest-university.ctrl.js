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
  function($scope, $state, $timeout, $localstorage,
     Geolocation, $ionicPosition, $cordovaDialogs, $cordovaGeolocation,
     $ionicPlatform, $ionicModal, $cordovaKeyboard) {

    $scope.nearest_universities = $scope.static.nearest_universities;

    $scope.n_universities = $scope.nearest_universities.slice(0,10);
    //to let modal know that this is onboarding
    $scope.onboarding = true;

    $scope.nearestUniversitySelected = function($event, n_university) {

        if (!$scope.addUniversityModal.isShown()) {

            var elems = document.querySelectorAll(".selected");

            [].forEach.call(elems, function(el) {
                if (el.checked === true) {
                    el.classList.remove("selected");
                    el.checked = false;
                }
            });

            $event.target.classList.add("selected");

        }

        $scope.user.university_id = n_university.id;
        $scope.user.university = n_university;
        $scope.user.university.latitude = n_university.location.latitude;
        $scope.user.university.longitude = n_university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;

        $scope.user.updateAttr('university_id', $scope.user, $scope.user.university_id);
        $scope.closeKeyboard();
        $scope.loader.show();
        $timeout(function() {
            $scope.addUniversityModal.hide();
            $scope.loader.hide();
            $state.go('^.onboarding-university');
        }, 1000);
    };

    $scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addUniversityModal = modal;
    });

}]);




