angular.module('uguru.util.controllers')

.controller('ContactGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal) {
    
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