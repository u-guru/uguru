angular.module('uguru.root.services')
.service('Camera', [
    '$timeout',
    'DeviceService',
    'LoadingService',
    '$state',
    Camera
    ]);

function Camera($timeout, DeviceService, LoadingService, $state) {

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
      quality: 30,
      destinationType: 0,
      mediaType: 0, // Picture: 0, Video: 1, Both: 2
      sourceType: index,
      allowEdit: false,
      encodingType: 0, // JEPG: 0, PNG: 1
      targetWidth: 50,
      targetHeight: 50,
      // popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    
    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

    function cameraSuccess(imageData) {
      navigator.camera.cleanup()

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
      if ($state.current.name === 'root.guru-credibility') {
        formData.append('transcript_url', $scope.user.id);  
        LoadingService.showSuccess('Sending...', 2000);
        $scope.user.transcript_file.url = true;
        var callback_success = function() {
          LoadingService.showSuccess("Transcript successfully sent.", 2000);
        }
      }

      if ($state.current.name === 'root.guru-profile') {
        formData.append('profile_url', $scope.user.id);
        LoadingService.showSuccess('Saving...', 2000);
        var callback_success = function() {
          LoadingService.showSuccess("Photo Successfully Saved");
        }
      }

      var callback_failure = function() {
        LoadingService.showSuccess("Something went wrong... Please contact support");
      }

      $timeout(function() {
        $scope.user.createObj($scope.user, 'files', formData, $scope, callback_success, callback_failure);
      }, 500)
    }

    function cameraError(err) {
      if ('No camera available' === err) {
        alert('Sorry! It appears that there is no Camera or Photo Library Accessible. Please contact support.');
      }
    }
  }

}



