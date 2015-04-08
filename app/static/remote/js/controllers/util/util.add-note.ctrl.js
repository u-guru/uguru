angular.module('uguru.util.controllers')

.controller('AddNoteController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  'Camera',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, Camera, $ionicHistory) {

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

    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    };

    $scope.root.vars.request.description = "I have a midterm tomorrow, that covers every-thing that we talked about last time plus some other worksheet he gave us that wasn't in the reading. Unfortunately idk anything and it would be cool if you could just take it for me? I'll give you my ID, we look pretty similar, I can pay like 200x what this app will."

    $scope.validateForm = function() {

      if ($scope.root.vars.request.description.length > 0) {
        $ionicHistory.goBack();
      } else {
        alert('Please fill out description.');
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

    $scope.goToStudentRequest = function() {
      $state.go('^.student-request', {courseObj:JSON.stringify($scope.root.vars.request.course)});
    };


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

    $scope.file_changed = function(element) {
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
        // $scope.user.createObj($scope.user, 'files', formData, $scope);
        $scope.saveImgToTag(photofile);
    };

    $scope.saveImgToTag = function(imageData) {
      var image = document.getElementsByClassName('attachment-container')[0];
      // image.src = "data:image/jpeg;base64," + imageData;

      var reader = new FileReader();

      reader.onload = function (e) {
        image.src = e.target.result;
      };

       reader.readAsDataURL(imageData);

      // $scope.request.photo = image.src;

      var formData = new FormData();
      // formData.append('file', image.src);
      formData.append('file', imageData);
      formData.append('filename', 'sup.jpg');

      $scope.user.createObj($scope.user, 'files', formData, $scope);
    }

  }


])