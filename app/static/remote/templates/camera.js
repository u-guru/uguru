angular.module('uguru.root.services')
.service('Camera',
    [
    '$localstorage',
    '$timeout',
    '$cordovaCamera',
    '$state',
    function($localstorage, $timeout, $cordovaCamera, $state) {

        deviceCamera = {
                    takePicture: function($scope) {

                      if ($scope.platform.mobile) {
                        var source_type = 1;
                      }
                        var options = {
                          quality: 100,
                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: Camera.PictureSourceType.CAMERA,
                          allowEdit: true,
                          encodingType: Camera.EncodingType.JPEG,
                          targetWidth: 1024,
                          targetHeight: 1024,
                          popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        };

                        $cordovaCamera.getPicture(options).then(function(imageData) {
                          console.log($state.current.name);
                          if ($state.current.name === 'root.guru-home') {

                            var image = document.getElementsByClassName('guru-profile-container')[0];

                          } else {
                            var image = document.getElementsByClassName('attachment-container')[0];

                          image.src = "data:image/jpeg;base64," + imageData;



                          // $scope.request.photo = image.src;

                          // $scope.root.vars.request.files.push(true);
                          var formData = new FormData();
                          // formData.append('file', image.src);
                          // imageData = "data:image/jpeg;base64," + imageData;

                          formData.append('file', imageData);
                          var file_name = new Date().getTime().toString();
                          formData.append('filename', file_name);

                          $scope.user.createObj($scope.user, 'files', formData, $scope);
                        }, function(err) {
                          console.log(err);
                        });
                    }
                };

        return deviceCamera;

}]);