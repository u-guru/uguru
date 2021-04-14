angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruQuestionsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicModal',
  '$timeout',
  '$q',
  'University',
  '$localstorage',
  '$ionicSideMenuDelegate',
  '$ionicBackdrop',
  '$ionicActionSheet',
  'Camera',
  'LoadingService',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicActionSheet,
  Camera, LoadingService)     {

    $scope.file_index = 0;

    $scope.deleteFile = function(index) {
      if (confirm('Are you sure you want to delete this photo?')) {
        $scope.proposal.files.splice(index, 1);
        $scope.success.show(0, 750, 'File deleted!');
      }
    }

    //initialize location modal
    $ionicModal.fromTemplateUrl(BASE + 'templates/questions.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.questionsModal = modal;
    });

      $scope.postQuestionResponse = function() {

        proposalObj = $scope.proposal;
        proposalObj.status = 2; //guru accepted
        proposalObj.proposal = true;

        $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);

        if (!$scope.user.pending_proposals) {
          $scope.user.pending_proposals = [];
        }

        // $scope.user.pending_proposals.push(proposalObj);

        LoadingService.show();

        $state.go('^.guru');




        var successCallback = function() {
          $timeout(function() {

              LoadingService.hide();
              $scope.questionsModal.remove();

          }, 1000)
        }

        $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope, successCallback);

      }

    $scope.launchAnswerQuestionModal = function(proposal) {
      $scope.proposal = proposal;
      $scope.proposal.files = [];
      $scope.proposal.response = '';
      // $scope.proposal.request.tags = [{name:'mars'}, {name:'pluto'}];
      $scope.proposal.request.student_price = parseInt($scope.proposal.request.student_price);
      $scope.questionsModal.show();
    }

    $scope.takePhoto = function(index) {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'})
      }

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

    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.user.createObj($scope.user, 'files', formData, $scope);
    };

    $scope.closeQuestionsModal = function() {
      $scope.questionsModal.hide();
    }

    $scope.active_questions = $scope.user.active_questions;

     $scope.$on('$ionicView.enter', function() {


        if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

                    $ionicViewSwitcher.nextDirection('enter');
                    $state.go('^.guru');
          }




    });


     document.addEventListener("resume", function() {


          if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

                    $ionicViewSwitcher.nextDirection('enter');
                    $state.go('^.guru');
          }

    }, false);

  }

]);
