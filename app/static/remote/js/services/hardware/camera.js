angular.module('uguru.root.services')
.service('Camera', 
    [
    '$localstorage',
    '$timeout',
    '$cordovaCamera',
    function($localstorage, $timeout, $cordovaCamera) {
        
        deviceCamera = {
                    takePicture: function($scope) {
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
                          var image = document.getElementById('requestPhotoImg');
                          image.src = "data:image/jpeg;base64," + imageData;
                          var image2 = document.getElementById('requestPhotoImgNoteExists');
                          image2.src = "data:image/jpeg;base64," + imageData;
                          $scope.request.photo = image.src;
                        }, function(err) {
                          console.log(err);
                        });
                    }
                };

        return deviceCamera; 
    
}]);