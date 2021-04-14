angular.module('uguru.guru.controllers')

.controller('GuruProposalController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'RequestService',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	RequestService, LoadingService) {

    $scope.proposals = $scope.user.guru_proposals;
    $scope.proposal = $scope.proposals[0];
    $scope.acceptProposal = function(proposal) {
      proposal.status = RequestService.constants.GURU_ACCEPTED;
      proposal.proposal = true;
      RequestService.acceptStudentRequest($scope.user.id, proposal, success, failure);
      function success() {
        LoadingService.showSuccess('Your response has sent successfully', 2500);
      }
      function failure() {
       LoadingService.showMsg("We're sorry - something went wrong, please contact support", 2500);
      }
    }

  }


])