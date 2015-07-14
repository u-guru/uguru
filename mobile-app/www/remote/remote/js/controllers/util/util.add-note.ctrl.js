angular.module('uguru.util.controllers')

.controller('AddNoteController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  'Camera',
  '$ionicHistory',
  '$ionicTabsDelegate',
  '$cordovaActionSheet',
  '$ionicActionSheet',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, Camera, $ionicHistory, $ionicTabsDelegate, $cordovaActionSheet, $ionicActionSheet) {

    // $scope.root.vars.request = { description: "test description", files: []};
    $scope.topTabsDelegate = $ionicTabsDelegate.$getByHandle('student-home-tabs-top');

    $scope.file_index = 0;
    if ($scope.root.vars.request) {
      $scope.root.vars.request.attached_files = [];
    }
    $scope.attached_files = [];


    document.addEventListener("deviceready", function () {

      $scope.showTimerActionSheet = function() {


            if ($scope.platform.mobile) {

              options = {
                title: 'Options',
                buttonLabels: ['Use Camera', 'Choose from Library'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton : true,
                winphoneEnableCancelButton : true
              };


            $cordovaActionSheet.show(options)
            .then(function(btnIndex) {
              var index = btnIndex;
              if (index === 1) {
                $scope.takePhoto(1)
              } else if (index === 2) {
                $scope.takePhoto(0);
              }
            });

        }

      }
    });

    $scope.promptActionBar = function() {
      if ($scope.platform.mobile) {

            $scope.showTimerActionSheet();
      } else {

        $scope.showIonicActionSheet();

      }
    }

    $scope.showIonicActionSheet = function() {

   // Show the action sheet
     $scope.hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Attach Local File' },
       ],
       titleText: 'File Options',
       cancelText: 'Cancel',
       cancel: function() {
          $scope.hideSheet();
        },
       buttonClicked: function(index) {
          if (index === 1) {
              $scope.takePhoto(1)
          } else if (index === 2) {
            $scope.takePhoto(0);
          }
       }
     });

   };

    $scope.hideAddNoteModal = function() {
      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.addRequestNoteModal.hide();
        }, 300)
      } else {
        $scope.addRequestNoteModal.hide();
      }
    }

    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    };

    // $scope.root.vars.request.description = "";

    $scope.validateForm = function() {

      if ($scope.root.vars.request.description.length > 0) {
        $ionicHistory.goBack();
      } else {
        alert('Please fill out description.');
      }
    }

    $scope.saveNote = function() {
      $scope.addRequestNoteModal.hide();
    }

    $scope.toggleShowTextArea = function() {
      $scope.showAddNoteTextArea = !$scope.showAddNoteTextArea;
      if ($scope.showAddNoteTextArea) {
        $scope.root.keyboard.show('note-input', 500);
      }
    }

    $scope.goToStudentRequest = function () {
        //mixpanel track
        mixpanel.track("Student.request");
      $state.go('^.student-request', {courseObj:JSON.stringify($scope.root.vars.request.course)});
    };


    $scope.showAddNoteTextArea = function() {
      $scope.root.keyboard.show('note-input', 500);
    }


    $scope.$on('$ionicView.beforeEnter', function() {
      if (!$scope.root.vars.request.description) {
        $scope.root.vars.request.description = "";
      }


      if ($scope.root.vars.files_should_be_cleared) {
        var photo_container = document.getElementsByClassName('attachment-container')[0]
        photo_container.src = null;
        $scope.root.vars.files_should_be_cleared = false;
      }
    })

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


      // $scope.timer_seconds = new ProgressBar.Circle('#timer-container', {
      //   color: '#FFFFFF',
      //   strokeWidth: 3.1,
      //   trailColor:'#A1D5CC'
      // });

      // $timeout(function(){
      //   $scope.timer_seconds.animate(1, function() {
      //     $scope.timer_seconds.set(0.001);
      //   });
      // }, 1000);
    }

    $scope.deleteFile = function(index) {
      if (confirm('Are you sure you want to delete this photo?')) {
        $scope.attached_files.splice(index, 1);
        $scope.file_index -= 1;
      }
    }

    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        $scope.attached_files.push({type:processFileType(photofile.type), size:processFileSize(photofile.size)});
        $scope.root.vars.request.attached_files.push({type:processFileType(photofile.type), size:processFileSize(photofile.size)});

        $scope.initTimer($scope.file_index);

        //let's view the image locally
        var reader = new FileReader();
        var image = document.getElementsByClassName('attachment-container')[$scope.file_index];
        // var name = photofile.name;

        reader.onload = function(e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);

        formData.append('filename', name);

        $scope.file_index += 1;

        $timeout(function() {
           $scope.attached_files[$scope.file_index - 1].show = true;

        }, 3000);

        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };



    $scope.saveImgToTag = function(imageData) {
      var image = document.getElementsByClassName('attachment-container')[0];
      image.src = imageData;

      // var reader = new FileReader();

      // reader.onload = function (e) {
      //   image.src = e.target.result;
      // };

      //  reader.readAsDataURL(imageData);

      // // $scope.request.photo = image.src;

      // var formData = new FormData();
      // // formData.append('file', image.src);
      // formData.append('file', imageData);
      // formData.append('filename', 'sup.jpg');

      // $scope.user.createObj($scope.user, 'files', formData, $scope);
    }

  }


])