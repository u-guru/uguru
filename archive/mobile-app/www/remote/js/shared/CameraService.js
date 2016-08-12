angular.module('uguru.root.services')
.service('CameraService', [
    '$timeout',
    'DeviceService',
    'LoadingService',
    CameraService
    ]);

function CameraService($timeout, DeviceService, LoadingService) {

  
  var cameraOptions = {
    quality: 30,
    destinationType: 0, // Data URL: 0, File URI: 1, Native URI: 2
    mediaType: 0, // Picture: 0, Video: 1, Both: 2
    sourceType: 0,
    allowEdit: false,
    encodingType: 0, // JEPG: 0, PNG: 1
    targetWidth: 50,
    targetHeight: 50,
    // popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
  };


  return {

    takePicture: takePicture,

  }

  function takePicture(successCallback, sourceIndex, errorCallback) {

    if (typeof successCallback === 'undefined') {
      return;
    } else {
      function cameraSuccess(imageData) {

        successCallback(imageData);
        
        navigator.camera.cleanup(cleanupSuccess, cleanupError);
        function cleanupSuccess() {
            return
        }
        function cleanupError(err) {
            return
        }
      }

      if (typeof sourceIndex !== 'undefined') {
        cameraOptions.sourceType = sourceIndex;
      }

      if (typeof errorCallback === 'undefined') {
        cameraError = defaultError;
      } else cameraError = errorCallback;

      navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

      function defaultError(err) {
        alert("Camera failed because: " + err);
      }
    }


  }




  // var processFileType = function(file_string) {
  //   if (file_string.indexOf('image/') !== -1) {
  //     return file_string.split('/')[1];
  //   }
  // }

  // var processFileSize = function(file_string) {
  //   return Math.round((parseInt(file_string) / 1000), 2)
  // }

  // return {
  //   takePicture: takePicture,
  // };

  // function takePicture($scope, index, elemId, callbackSuccess) {

    
  //   navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

  //   function cameraSuccess(imageData) {
  //     navigator.camera.cleanup()

  //     if (elemId) {
  //       var image = document.getElementById(elemId);
  //       image.src = 'data:image/jpeg;base64,' + imageData;
  //     }

  //     $scope.photoUploaded = true;

  //     //package up imageData to save to server
  //     var formData = new FormData();
  //     formData.append('file', imageData);
  //     var file_name = new Date().getTime().toString();
  //     formData.append('filename', file_name);

  //     //if user is uploading a transcript
  //     if ($scope.root.vars.profile_url_changed) {
  //       formData.append('transcript_url', is_transcript);
  //     }
  //     //if user is logged in
  //     if ($scope.root.vars.profile_url_changed && $scope.user.id) {
  //       formData.append('profile_url', $scope.user.id);
  //     }

  //     LoadingService.showSuccess('Saving...', 2000);

  //     var callback_success = function() {
  //       LoadingService.showSuccess("Photo Successfully Saved");
  //     }

  //     var callback_failure = function() {
  //       LoadingService.showSuccess("Something went wrong... Please contact support");
  //     }

  //     $timeout(function() {

  //       $scope.user.createObj($scope.user, 'files', formData, $scope, callback_success, callback_failure);
  //     }, 500)
  //   }

  //   function cameraError(err) {
  //     if ('No camera available' === err) {
  //       alert('Sorry! It appears that there is no Camera or Photo Library Accessible. Please contact support.');
  //     }
  //   }

  // }

}



