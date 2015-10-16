angular.module('uguru.root.services')
.service('Camera', [
    '$timeout',
    'DeviceService',
    Camera
    ]);

function Camera($timeout, DeviceService) {

  var processFileType = function(file_string) {
    if (file_string.indexOf('image/') !== -1) {
      return file_string.split('/')[1];
    }
  }

  var processFileSize = function(file_string) {
    return Math.round((parseInt(file_string) / 1000), 2)
  }

  return {
    takePicture: takePicture,
  };

  function takePicture($scope, index, elemId, callbackSuccess) {

    if(!DeviceService.isMobile()) {
      var index = 0;
    }

    var cameraOptions = {
      quality: 65,
      destinationType: 0,
      mediaType: 0, // Picture: 0, Video: 1, Both: 2
      sourceType: index,
      allowEdit: false,
      encodingType: 0, // JEPG: 0, PNG: 1
      targetWidth: 500,
      targetHeight: 500,
      // popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

    function cameraSuccess(imageData) {

      if (elemId) {
        var image = document.getElementById(elemId);
        image.src = 'data:image/jpeg;base64,' + imageData;
      }

      $scope.photoUploaded = true;

      //package up imageData to save to server
      var formData = new FormData();
      formData.append('file', imageData);
      var file_name = new Date().getTime().toString();
      formData.append('filename', file_name);

      //if user is uploading a transcript
      if ($scope.root.vars.profile_url_changed) {
        formData.append('transcript_url', is_transcript);
      }
      //if user is logged in
      if ($scope.root.vars.profile_url_changed && $scope.user.id) {
        formData.append('profile_url', $scope.user.id);
      }

      $scope.loader.showSuccess('Saving...', 2000);

      $timeout(function() {
        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
      }, 500)
    }

    function cameraError(message) {
      console.log(err);
      if ('No camera available' === err) {
        alert('Sorry! It appears that there is no Camera or Photo Library Accessible. Please contact support.');
      }
    }
  }

}



