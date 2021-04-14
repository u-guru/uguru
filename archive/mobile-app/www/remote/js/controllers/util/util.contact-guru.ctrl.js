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



    $scope.$on('modal.shown', function() {


      if ($scope.contactingGuruModal.isShown() && $scope.platform.mobile && $scope.platform.ios) {
              // if (!$scope.user.current_device) {

              //     $scope.user.current_device = ionic.Platform.device();

              // }

              $timeout(function() {


                CordovaPushWrapper.register($scope,

                  function() {
                     setTimeout(function() {
                        pulse.classList.add('animated', 'pulse');

                        setTimeout(function() {
                          pulse.classList.remove('animated', 'pulse');
                          $scope.closeContactGuruModal();
                        }, 2000);
                      }, 2000);
                });



              } , 2500);

      };


      $scope.closeContactGuruModal = function() {

          $timeout(function () {
              //mixpanel track
              mixpanel.track("Home");
        $state.go('^.home');
        $scope.contactingGuruModal.hide();

        } , 500);


     }
  });

}


])