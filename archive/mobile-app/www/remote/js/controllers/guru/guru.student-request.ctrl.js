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
  '$ionicModal',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, $stateParams, User, $ionicModal) {

    $scope.request = JSON.parse($stateParams.requestObj);
    $scope.proposal = JSON.parse($stateParams.proposalObj);

    $scope.user.cashout_cards = [];

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.goToGuruProfile = function() {
        //Mixpanel Track
        mixpanel.track("Guru.profile");
        $state.go('^.guru-profile', { guruObj: JSON.stringify($scope.guru) });

    }

    $scope.declineRequest = function () {
        //Mixpanel Track
        mixpanel.track("Guru.home");
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

    $scope.calendar = {
          width: 2,
          height: 24,
          num_selected:0
    }

    $scope.updateProposalFromList = function(proposal, proposal_list) {
      for(i = 0; i < proposal_list.length; i++) {
        if(proposal_list[i].id === proposal.id) {
          proposal_list[i].status = proposal.status;
          return;
        }
      }
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/calendar.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.calendarModal = modal;
    });

    $scope.showCalendar = function(){

    }

    $scope.acceptStudent = function() {
        if ($scope.user.transfer_cards.length === 0) {
            //Mixpanel Track
            mixpanel.track("Student.add-payment");
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

    $scope.convertPythonDateStrToJsDate = function(calendar_events) {

      for (var i = 0; i < calendar_events.length; i++) {
        var dateTime = calendar_events[i]['start_time']
        var jsDate = new Date(Date.parse(dateTime));
        calendar_events[i]['start_time'] = jsDate.getHours();
        calendar_events[i]['end_time'] = jsDate.getHours();
      }
      return calendar_events;

    }

    var lightSpeedIn = document.getElementById('lightSpeedIn')
    setTimeout(function() {
      lightSpeedIn.classList.add('animated');
      lightSpeedIn.classList.add('lightSpeedIn');
    }, 5500);

    $scope.$on('$ionicView.beforeEnter', function(){

      //calendar json from the server
      var studentCalendarJson = $scope.proposal.student_calendar[0].calendar_events;
      var studentCalendarDates = $scope.convertPythonDateStrToJsDate(studentCalendarJson);

      $scope.student_calendar = studentCalendarDates;

    });

  }

]);
