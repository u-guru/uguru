angular.module('uguru.root.services')
.service('Camera',
    [
    '$localstorage',
    '$timeout',
    '$cordovaCamera',
    '$state',
    function($localstorage, $timeout, $cordovaCamera, $state) {

        deviceCamera = {
                    takePicture: function($scope, index) {

                      if ($scope.platform.mobile) {
                        var source_type = index;
                      }
                        var options = {
                          quality: 30,
                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: index,
                          allowEdit: true,
                          encodingType: Camera.EncodingType.JPEG,
                          // targetWidth: 1024,
                          // targetHeight: 1024,
                          // popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        };

                        $cordovaCamera.getPicture(options).then(function(imageData) {






                          var formData = new FormData();

                          formData.append('file', imageData);

                          var file_name = new Date().getTime().toString();

                          formData.append('filename', file_name);

                          if (!$scope.root.vars.request) {
                            formData.append('profile_url', $scope.user.id);
                          }

                          $scope.user.createObj($scope.user, 'files', formData, $scope);

                        }, function(err) {

                          console.log(err);

                        });
                    }
                };

        return deviceCamera;

}]);