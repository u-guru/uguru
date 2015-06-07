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
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop)     {



    //initialize location modal
    $ionicModal.fromTemplateUrl(BASE + 'templates/questions.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.questionsModal = modal;
    });

      $scope.postQuestionResponse = function() {
        console.log($scope.proposal.request.response);
        proposalObj = $scope.proposal;
        proposalObj.status = 2; //guru accepted
        proposalObj.proposal = true;

        $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);

        if (!$scope.user.pending_proposals) {
          $scope.user.pending_proposals = [];
        }

        // $scope.user.pending_proposals.push(proposalObj);

        $scope.loader.show();

        $state.go('^.guru');




        var successCallback = function() {
          $timeout(function() {

              $scope.loader.hide();
              $scope.questionsModal.remove();

          }, 1000)
        }

        $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope, successCallback);

      }

    $scope.launchAnswerQuestionModal = function(proposal) {
      $scope.proposal = proposal;
      $scope.proposal.request.tags = [{name:'mars'}, {name:'pluto'}];
      $scope.proposal.request.student_price = parseInt($scope.proposal.request.student_price);
      $scope.questionsModal.show();
    }

    $scope.closeQuestionsModal = function() {
      $scope.questionsModal.hide();
    }

    $scope.active_questions = $scope.user.active_questions;
  }

]);
