angular.module('uguru.util.controllers')

.controller('ContactGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  'User',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, User) {
    $scope.$on('modal.shown', function() {

      if ($scope.contactingGuruModal.isShown()) {
        var pulse = document.getElementById('pulse')

        pulse.classList.add('animated', 'pulse');
        setTimeout(function() {
          console.log('shit is pulsating 1 sec passed');
          pulse.classList.remove('animated', 'pulse');
        }, 1000);

        setTimeout(function() {
          pulse.classList.add('animated', 'pulse');
          setTimeout(function() {
            console.log('shit is pulsating 3 second has passed');
            pulse.classList.remove('animated', 'pulse');
          }, 2000);
        }, 2000);

        setTimeout(function() {
          pulse.classList.add('animated', 'pulse');
          setTimeout(function() {
            pulse.classList.remove('animated', 'pulse');
          }, 3000);
        }, 3000);

        setTimeout(function() {
          pulse.classList.add('animated', 'pulse');
          setTimeout(function() {
            pulse.classList.remove('animated', 'pulse');
          }, 4000);
        }, 4000);

      }

    });



    $scope.closeContactGuruModal = function() {

      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.contactingGuruModal.hide();
        }, 300)
      } else {
        $scope.contactingGuruModal.hide();
      }

    }

  }


])