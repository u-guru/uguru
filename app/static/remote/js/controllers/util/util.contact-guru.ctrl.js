angular.module('uguru.util.controllers')

.controller('ContactGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  'User',
  'CordovaPushWrapper',
  '$timeout',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, User, CordovaPushWrapper, $timeout) {

    if ($scope.platform.mobile && $scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.contactingGuruModal.hide();
        }, 300)
      } else {
        $scope.contactingGuruModal.hide();
    }

    $scope.$on('modal.shown', function() {

      $scope.closeContactGuruModal = function() {

      $timeout(function() {
        $scope.contactingGuruModal.hide();
        $state.go('^.home');

        } , 2500);


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
            $scope.closeContactGuruModal();

          }, 2000);
        }, 2000);


        if ($scope.platform.mobile && $scope.platform.ios) {

              if (!$scope.user.current_device) {

                  $scope.user.current_device = ionic.Platform.device();

              }

              // CordovaPushWrapper.register($scope,
              //   function() {
              //        setTimeout(function() {
              //           pulse.classList.add('animated', 'pulse');

              //           setTimeout(function() {
              //             console.log('shit is pulsating 3 second has passed');
              //             pulse.classList.remove('animated', 'pulse');
              //             $scope.closeContactGuruModal();
              //           }, 2000);
              //         }, 2000);
              // });



        }
        //TODO --> Cancel guru functioninality working

        setTimeout(function() {
          pulse.classList.add('animated', 'pulse');
          setTimeout(function() {
            pulse.classList.remove('animated', 'pulse');
          }, 4000);
        }, 4000);

      }

    }
  });

}


])