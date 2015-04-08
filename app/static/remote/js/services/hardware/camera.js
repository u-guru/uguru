angular.module('uguru.root.services')
.service('Camera',
    [
    '$localstorage',
    '$timeout',
    '$cordovaCamera',
    function($localstorage, $timeout, $cordovaCamera) {

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
                          var image = document.getElementsByClassName('attachment-container')[0];

                          var reader = new FileReader();

                          reader.onload = function (e) {
                              image.src = imageData.target.result;
                          };

                          reader.readAsDataURL(imageData);



                          // $scope.request.photo = image.src;

                          var formData = new FormData();
                          // formData.append('file', image.src);
                          imageData = "data:image/jpeg;base64," + imageData;

                          formData.append('file', imageData);
                          formData.append('filename', 'sup.jpg');

                          // $scope.user.createObj($scope.user, 'files', formData, $scope);

                        }, function(err) {
                          console.log(err);
                        });
                    }
                };

        return deviceCamera;

}]);