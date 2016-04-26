angular.module('uguru.guru.controllers')

.controller('GuruConfirmProposalController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory) {

    $scope.proposal = JSON.parse($stateParams.proposalObj);
    $scope.goBack = function() {
      $ionicHistory.goBack();
    }

    $scope.acceptStudent = function() {
      // if ($scope.user.transfer_cards.length === 0) {
      //   $state.go('^.^.student.add-payment');
      //   return;
      // }
      proposalObj = $scope.proposal;
      proposalObj.status = 2; //guru accepted
      proposalObj.proposal = true;
      // proposalObj.guru_calendar =

      //fake it for now...r
      $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
      if (!$scope.user.pending_proposals) {
        $scope.user.pending_proposals = [];
      }
      $scope.user.pending_proposals.push(proposalObj);
      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      alert("Student request accepted. We'll let you know if they choose you! \n See below for progress");
        //Mixpanel Track
      mixpanel.track("Guru.home");
      $state.go('^.guru-home');
    }

    $scope.deleteProposalFromList = function(proposal, proposal_list) {
      for(i = 0; i < proposal_list.length; i++) {
        if(proposal_list[i].id === proposal.id) {
          proposal_list.splice(i, i+1);
          return;
        }
      }
    }

  }


]);

