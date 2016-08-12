angular.module('uguru.guru.controllers')

.controller('StudentProposalController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'RequestService',
  'LoadingService',
  'CTAService',
  function($scope, $state, $timeout, $localstorage,
 	RequestService, LoadingService, CTAService) {

    $scope.shouldShowNav = shouldShowNav;
    $scope.student_requests = {nav: {index: 0, show:shouldShowNav($scope.user)}, selected: null};
    $scope.incoming_requests = $scope.user.incoming_requests;
    $scope.request = $scope.incoming_requests[0];


    $scope.currentFilter = null;
    $scope.filterFunction = function(request, index, arr) {
      if (!$scope.currentFilter) {
        return true;
      }
      if (request.is_past && $scope.currentFilter === 'is_past') {
        return true;
      }
      if (request.is_pending && $scope.currentFilter === 'is_pending') {
        return true;
      }
      if (request.is_upcoming && $scope.currentFilter === 'is_upcoming') {
        return true;
      }
      if (request.is_incoming && $scope.currentFilter === 'is_incoming') {
        return true;
      }
    }

    $scope.acceptIncomingProposal = function(request) {
      RequestService.acceptGuruForRequest($scope.user.id, request, success, failure);
      function success() {
        LoadingService.showSuccess('You are now matched with ' + request.guru.name.split(' ')[0], 2500);
      }
      function failure() {
       LoadingService.showMsg("We're sorry - something went wrong, please contact support", 2500);
      }
    }

    $scope.selectAndDisplayRequestDetails = function(request) {
      LoadingService.showAmbig();
      $scope.student_requests.selected = request;
      // if (!CTAService.ctaFuncDict('.cta-box-request-details')) {
        // initRequestDetailsCTA(request);
        CTAService.showCTAManually('.cta-box-request-details');
      // }
    }


    function shouldShowNav(user) {
      var sum = 0;
      if (user.pending_requests && user.pending_requests.length) {
        sum++;
      }
      if (user.incoming_requests && user.incoming_requests.length) {
        sum++;
      }
      if (user.upcoming_sessions && user.upcoming_sessions.length) {
        sum++;
      }
      if (user.past_requests && user.past_requests.length) {
        sum++
      }
      return sum >= 2
    }

  }


])