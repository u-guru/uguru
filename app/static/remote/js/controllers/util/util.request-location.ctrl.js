angular.module('uguru.util.controllers')

.controller('RequestLocationController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal) {
    
    $scope.hideRequestMapModal = function() {
      
      if (!$scope.request.location) {
        $scope.togglePersonGuru();
      }

      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.requestMapModal.hide();
        }, 300)
      } else {
        $scope.requestMapModal.hide();
      }
    }

    $scope.setLocation = function() {
      $scope.request.location = "375 Valencia St San Francisco, CA 94103"
      $scope.hideRequestMapModal();
    }

    // $scope.saveNote = function() {
    //   $scope.addRequestNoteModal.hide();
    // }

    $scope.$on('modal.shown', function() {

      if ($scope.addRequestNoteModal.isShown()) {
        
      }

    });


  }


])