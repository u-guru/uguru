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
                    takePicture: function($scope, index) {

                      if ($scope.platform.mobile) {
                        var source_type = 1;
                      }
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
                          if ($state.current.name === 'root.guru-profile-edit') {

                            var image = document.getElementsByClassName('guru-profile-container')[0];

                          } else if ($state.current.name === 'root.guru-profile') {
                            var image = document.getElementsByClassName('guru-prof-pic')[0];
                          } else if ($state.current.name === 'root.student-home') {
                            var image = document.getElementsByClassName('student-prof-pic')[0];
                          }
                          else
                          {
                            $scope.attached_files.push({type:"jpeg", size:processFileSize(imageData.length)});
                            $scope.initTimer($scope.file_index);
                            var image = document.getElementsByClassName('attachment-container')[$scope.file_index];
                          }

                          image.src = "data:image/jpeg;base64," + imageData;



                          // $scope.request.photo = image.src;

                          // $scope.root.vars.request.files.push(true);
                          var formData = new FormData();
                          // formData.append('file', image.src);
                          // imageData = "data:image/jpeg;base64," + imageData;
                          // $scope.loader.show();
                          formData.append('file', imageData);
                          var file_name = new Date().getTime().toString();
                          formData.append('filename', file_name);
                          if ($state.current.name !== 'root.request-description') {
                            formData.append('profile_url', $scope.user.id);
                          } else {

                            $scope.file_index += 1;

                            $timeout(function() {
                               $scope.attached_files[$scope.file_index - 1].show = true;
                            }, 3000);

                          }

                          $scope.user.createObj($scope.user, 'files', formData, $scope);

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