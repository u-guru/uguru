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

    $scope.toggleShowTextArea = function() {
      $scope.showAddNoteTextArea = !$scope.showAddNoteTextArea;
      if ($scope.showAddNoteTextArea) {
        $scope.root.keyboard.show('note-input', 500);
      }
    }


    $scope.showAddNoteTextArea = function() {
      $scope.root.keyboard.show('note-input', 500);
    }

    $scope.$on('modal.shown', function() {

      // if ($scope.addRequestNoteModal.isShown()) {
      //   $scope.root.keyboard.show('note-input', 500);
      // }

      if (!$scope.request.note) {
        $scope.showAddNoteTextArea = false;
      } else {
        $scope.showAddNoteTextArea = true;
      }

    });

    $scope.takePhoto = function() {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    $scope.file_changed = function(element, $scope) {
        var photofile = element.files[0];
         var reader = new FileReader();
         reader.onload = function(e) {
          console.log(e);
         };
         reader.readAsDataURL(photofile);

         var formData = new FormData();
        // formData.append('file', image.src);
        formData.append('file', photofile);
        formData.append('filename', photofile.name);
        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };

    $scope.saveImgToTag = function() {
      var image = document.getElementById('requestPhotoImg');
      image.src = "data:image/jpeg;base64," + imageData;
      var image2 = document.getElementById('requestPhotoImgNoteExists');
      image2.src = "data:image/jpeg;base64," + imageData;
      $scope.request.photo = image.src;

      var formData = new FormData();
      // formData.append('file', image.src);
      formData.append('file', imageData);
      formData.append('filename', 'sup.jpg');

      $scope.user.createObj($scope.user, 'files', formData, $scope);
    }

  }


])