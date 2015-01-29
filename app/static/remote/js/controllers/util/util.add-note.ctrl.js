angular.module('uguru.util.controllers')

.controller('AddNoteController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  'Camera',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, Camera) {
    
    $scope.hideAddNoteModal = function() {
      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.addRequestNoteModal.hide();
        }, 300)
      } else {
        $scope.addRequestNoteModal.hide();
      }
    }

    $scope.saveNote = function() {
      $scope.addRequestNoteModal.hide();
    }

    $scope.$on('modal.shown', function() {

      $scope.root.keyboard.show('note-input', 500);

    });

    $scope.takePhoto = function() {
      Camera.takePicture($scope);
    }

  }


])