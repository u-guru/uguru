angular.module('uguru.util.controllers')

.controller('DescriptionController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicActionSheet',
  'Camera',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicActionSheet, Camera, LoadingService) {

    // $scope.request.attached_files.push({url: ($scope.img_base + './img/stock/stock-1.png')});
    // $scope.request.attached_files.push({url: ($scope.img_base + './img/stock/stock-2.png')});
    $scope.file_index = 0;

    $scope.takePhoto = function(index) {
      if ($scope.platform.mobile) {




        Camera.takePicture($scope, index, true);
      } else {
        var element = document.getElementById('file-input-web');
        element.click();
      }
    };

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Choose from Library' }];
      // if ($scope.platform.mobile) {
      options.push({text: 'Take a Photo'})
      // }

     // Show the action sheet
     $scope.closeAttachActionSheet = $ionicActionSheet.show({
       buttons: options,
       cancelText: 'Cancel',
       cancel: function() {
            $scope.closeAttachActionSheet();
        },
       buttonClicked: function(index) {
          $scope.takePhoto(index);

          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });

    };

    $scope.closeAttachActionSheet = function() {
      $scope.closeAttachActionSheet();
    }

    $scope.validateForm = function() {

      if ($scope.root.vars.request.description.length > 0) {
        $scope.closeDescriptionModal();
      } else {
        alert('Please fill out description.');
      }
    }

    $scope.saveDescriptionAndCloseModal = function() {
      $scope.closeDescriptionModal();
    }



    $scope.takePhoto = function(index) {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    var processFileType = function(file_string) {
      if (file_string.indexOf('image/') !== -1) {
        return file_string.split('/')[1];
      }
    }

    $scope.$on('modal.shown', function() {

      if ($scope.descriptionModal && $scope.descriptionModal.isShown()) {

        document.getElementById("course-input").blur();

        $timeout(function() {

            //focus on keyboard
            document.getElementById("description-input").focus();


        }, 1000);

      }

    })

    var processFileSize = function(file_string) {
      return Math.round((parseInt(file_string) / 1000), 2)
    }

    $scope.initTimer = function(index) {
      $scope.timer_seconds = new ProgressBar.Circle('#file-loader-container-' + index.toString(), {
        color: '#68b2a5',
        strokeWidth: 10,
        trailColor:'#FFFFFF',
        easing: 'easeInOut',
        duration:2500
      });

        $scope.timer_seconds.animate(1, function() {
          $scope.timer_seconds.destroy();
        });
    }

    $scope.deleteFile = function(index) {
      if (confirm('Are you sure you want to delete this photo?')) {
        $scope.request.files.splice(index, 1);
        $scope.success.show(0, 750, 'File deleted!');
        $scope.file_index -= 1;
      }
    }

    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        // $scope.request.attached_files.push({type:processFileType(photofile.type), size:processFileSize(photofile.size)});
        // $scope.root.vars.request.attached_files.push({type:processFileType(photofile.type), size:processFileSize(photofile.size)});

        // $scope.initTimer($scope.file_index);

        //let's view the image locally
        var reader = new FileReader();
        // var image = document.getElementsByClassName('attachment-container')[$scope.file_index];
        // var name = photofile.name;

        // reader.onload = function(e) {
        //     image.src = e.target.result;
        // };
        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);

        // var file_name = new Date().getTime().toString();
        formData.append('filename', name);

        $scope.file_index += 1;

        // $timeout(function() {
        //    $scope.request.attached_files[$scope.file_index - 1].show = true;

        // }, 3000);

      LoadingService.show();

      var callbackSuccess = function() {
        LoadingService.hide();
      }

        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };

  }


])