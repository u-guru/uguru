angular.module('uguru.guru.controllers')

.controller('StudentProposalController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'RequestService',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	RequestService, LoadingService) {

    $scope.incoming_requests = $scope.user.incoming_requests;
    $scope.request = $scope.incoming_requests[0];
    $scope.acceptIncomingProposal = function(request) {
      RequestService.acceptGuruForRequest($scope.user.id, request, success, failure);
      function success() {
        LoadingService.showSuccess('You are now matched with ' + request.guru.name.split(' ')[0], 2500);
      }
      function failure() {
       LoadingService.showMsg("We're sorry - something went wrong, please contact support", 2500);
      }
    }

  }


])