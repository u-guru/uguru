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

    document.addEventListener("deviceready", function () {

      $scope.showTimerActionSheet = function() {


            if ($scope.platform.mobile) {

              options = {
                title: 'Options',
                buttonLabels: ['Reset', 'Set Timer'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton : true,
                winphoneEnableCancelButton : true
              };


            $cordovaActionSheet.show(options)
            .then(function(btnIndex) {
              var index = btnIndex;
              console.log(index);
              if (index === 1) {
                $scope.resetTimer()
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
         { text: '<b>Share</b> This' },
         { text: 'Move' }
       ],
       destructiveText: 'Delete',
       titleText: 'Modify your album',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
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

    $scope.root.vars.request.description = "";

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

    $scope.goToStudentRequest = function() {
      $state.go('^.student-request', {courseObj:JSON.stringify($scope.root.vars.request.course)});
    };


    $scope.showAddNoteTextArea = function() {
      $scope.root.keyboard.show('note-input', 500);
    }


    $scope.$on('$ionicView.beforeEnter', function() {
      if ($scope.root.vars.files_should_be_cleared) {
        var photo_container = document.getElementsByClassName('attachment-container')[0]
        photo_container.src = null;
        $scope.root.vars.files_should_be_cleared = false;
      }
    })

    $scope.takePhoto = function() {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    $scope.file_changed = function(element, file_index) {
        var photofile = element.files[0];

        //let's view the image locally
        var reader = new FileReader();
        var image = document.getElementsByClassName('attachment-container')[file_index];
        // var name = photofile.name;

        reader.onload = function(e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);

        // var file_name = new Date().getTime().toString();
        formData.append('filename', name);
        $scope.file_index += 1;

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