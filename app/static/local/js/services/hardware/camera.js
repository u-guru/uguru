 var processFileType = function(file_string) {
  if (file_string.indexOf('image/') !== -1) {
    return file_string.split('/')[1];
  }
}

var processFileSize = function(file_string) {
  return Math.round((parseInt(file_string) / 1000), 2)
}

angular.module('uguru.root.services')
.service('Camera',
    [
    '$timeout',
    function($timeout) {

        return {
                    takePicture: function($scope, index, elemId, callbackSuccess) {

                      // if ($scope.platform.mobile) {
                        var source_type = 1;
                      // }

                        var cameraOptions = {
                          quality: 15,
                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: index,
                          allowEdit: false,
                          encodingType: Camera.EncodingType.JPEG,
                          targetWidth: 500,
                          targetHeight: 500,
                          // popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        };

                        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

                        function cameraSuccess(imageData) {

                          if (elemId) {

                            var image = document.getElementById(elemId);
                            if (image) {
                              image.src = 'data:image/jpeg;base64,' + imageData;
                            }

                          }

                          $scope.photoUploaded = true;

                          //package up imageData to save to server
                          var formData = new FormData();
                          formData.append('file', imageData);
                          var file_name = new Date().getTime().toString();
                          formData.append('filename', file_name);


                          //if user is uploading a transcript
                          // if ($scope.root.vars.profile_url_changed) {
                          //   formData.append('transcript_url', is_transcript);
                          // }
                          //if user is logged in
                          if ($scope.root.vars.profile_url_changed && $scope.user.id) {
                            formData.append('profile_url', $scope.user.id);
                          }

                          $scope.success.show(0, 1500, 'Saving...');

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
                };


}]);