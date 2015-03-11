angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruIncomingRequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$stateParams',
  'User',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, $stateParams, User) {

    $scope.request = JSON.parse($stateParams.requestObj);
    $scope.proposal = JSON.parse($stateParams.proposalObj);

    $scope.user.cashout_cards = [];

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function() {
      $state.go('^.guru-profile', {guruObj:JSON.stringify($scope.guru)});
    }

    $scope.declineRequest = function() {
      $state.go('^.guru.home');
    }

    $scope.goToGuruRequestDetails = function(request) {
      var doNothing = true;
      // $scope.root.dialog.alert()
    }


    $scope.deleteProposalFromList = function(proposal, proposal_list) {
      for(i = 0; i < proposal_list.length; i++) {
        if(proposal_list[i].id === proposal.id) {
          proposal_list.splice(i, i+1);
          return;
        }
      }
    }

    $scope.updateProposalFromList = function(proposal, proposal_list) {
      for(i = 0; i < proposal_list.length; i++) {
        if(proposal_list[i].id === proposal.id) {
          proposal_list[i].status = proposal.status;
          return;
        }
      }
    }

    $scope.acceptStudent = function() {
      if ($scope.user.transfer_cards.length === 0) {
        $state.go('^.^.student.add-payment');
        return;
      }

      proposalObj = $scope.proposal;
      proposalObj.status = 2; //guru accepted
      proposalObj.proposal = true;

      //fake it for now...
      $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
      if (!$scope.user.pending_proposals) {
        $scope.user.pending_proposals = [];
      }
      $scope.user.pending_proposals.push(proposalObj);

      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      $scope.root.dialog.alert("Student request accepted. We'll let you know if they choose you! \n See below for progress", 'Sweet!', 'OK');
    }

    $scope.rejectStudent = function() {
      proposalObj = $scope.proposal;
      $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
      proposalObj.status = 3; //guru rejected
      proposalObj.proposal = true;

      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      $scope.root.dialog.alert('Student request rejected. This increases your response rate!', 'Maybe Next Time', 'OK');

    }

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('guru home view before Enter');
      console.log(JSON.stringify($scope.proposal));
      console.log(JSON.stringify($scope.proposal.request.address));
      User.getUserFromServer($scope, null, $state);
    });

  }

]);
