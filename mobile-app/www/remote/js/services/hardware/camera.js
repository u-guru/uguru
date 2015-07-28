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
    '$localstorage',
    '$timeout',
    '$cordovaCamera',
    '$state',
    function($localstorage, $timeout, $cordovaCamera, $state) {

        deviceCamera = {
                    takePicture: function($scope, index, has_callback, is_transcript) {

                      // if ($scope.platform.mobile) {
                        var source_type = 1;
                      // }


                        var options = {
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

                          $cordovaCamera.getPicture(options).then(function(imageData) {

                          //guru profile
                          // guru profile #2
                          //student profile #1
                          var callbackSuccess;

                          if (has_callback) {
                            $scope.loader.show();

                            var callbackSuccess = function() {
                              $scope.loader.hide();
                            }
                          }



                          var formData = new FormData();

                          formData.append('file', imageData);
                          var file_name = new Date().getTime().toString();
                          formData.append('filename', file_name);

                          if (is_transcript) {
                            formData.append('transcript_url', is_transcript);
                          }
                          $scope.root.vars.transcript_url_changed = true;
                          $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);

                        }, function(err) {
                          console.log(err);
                          if ('No camera available' === err) {
                            alert('Sorry! It appears that there is no Camera or Photo Library Accessible. Please contact support.');
                          }
                        });
                    }
                };

        return deviceCamera;

}]);