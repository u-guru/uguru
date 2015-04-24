angular.module('uguru.guru.controllers')

.controller('ProposalDetailsActionController', [

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
    $scope.course = $scope.proposal.request;
    $scope.progress_active = false;

    $scope.convertTimeEstimate = function(time_int) {
      var time_options = ['30 minutes', '1 Hour', '1.5 hours', '2+ hours'];
      return time_options[time_int];
    }

    $scope.createGoogleLatLng = function(latCoord, longCoord) {
      return new google.maps.LatLng(latCoord, longCoord);
    }

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var date = new Date($scope.proposal.request.time_created);
    $scope.formatted_time_created = days[date.getDay()] + ", " + months[date.getMonth()] + ' ' + date.getDate();
    $scope.formatted_time_estimated_hours = Math.round(($scope.proposal.request.time_estimate / 60), 2);

    if ($scope.proposal.request.online && $scope.proposal.request.in_person) {
      $scope.formatted_request_type = 'In-person and online';
    } else if ($scope.proposal.request.online) {
      $scope.formatted_request_type = 'Online only';
    } else if ($scope.proposal.request.in_person) {
      $scope.formatted_request_type = 'In-person only';
    }

    // $scope.showSuccess = function(msg) {
    //   if (!$scope.progress_active)  {
    //       $scope.progress_active = true;
    //       $cordovaProgress.showSuccess(true, msg)
    //       $timeout(function() {
    //         $cordovaProgress.hide();
    //         $scope.progress_active = false;
    //       }, 2000);
    //   } else {

    //     console.log('Show success cannot be shown because progress bar is already active');
    //   }
    // }
    $scope.removeRequestFromActive = function(request) {
      var active_requests = $scope.user.active_requests;
      for (var i = 0; i < active_requests.length ; i++) {
        var index_request = active_requests[i];
        if (index_request.id === request.id) {
          $scope.user.active_requests.splice(i, i+1);
        }
      }
    }

    $scope.updateUserRequest = function(request) {
      var user_requests = $scope.user.requests;
      for (var i = 0; i < user_requests.length ; i++) {
        var index_request = user_requests[i];
        if (index_request.id === request.id) {
          $scope.user.requests[i].status = 3;
        }
      }
    }

    $scope.acceptStudent = function() {
      // if ($scope.user.transfer_cards.length === 0) {
      //   $state.go('^.^.student.add-payment');
      //   return;
      // }
      console.log('this button was clicked');
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
      var callbackFunction = function() {
        $ionicHistory.goBack();
      }
      $scope.root.dialog.alert("Student request accepted. We'll let you know if they choose you! \n See below for progress", 'Sweet!', 'OK', callbackFunction);
    }

    $scope.deleteProposalFromList = function(proposal, proposal_list) {
      for(i = 0; i < proposal_list.length; i++) {
        if(proposal_list[i].id === proposal.id) {
          proposal_list.splice(i, i+1);
          return;
        }
      }
    }

    $scope.rejectStudent = function() {
      proposalObj = $scope.proposal;
      $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
      proposalObj.status = 3; //guru rejected
      proposalObj.proposal = true;

      var callbackFunction = function() {
        $ionicHistory.goBack();
      }

      $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
      $scope.root.dialog.alert('Student request rejected. This increases your response rate!', 'Maybe Next Time', 'OK', callbackFunction);

    }

    $scope.showGoogleMap = function() {
      console.log($scope.request);
      if (!$scope.proposal.request.position || !$scope.proposal.request.position.latitude || !$scope.proposal.request.position.longitude) {
        console.log('no coordinates... forget about it');
        return;
      }

      $scope.map = {center: {latitude: $scope.proposal.request.position.latitude, longitude: $scope.proposal.request.position.longitude }, zoom: 14, control: {} };
      $scope.options = {scrollwheel: false};

      var mapContainer = document.getElementById("map_canvas");
      var initMapCoords;


      initMapCoords = $scope.createGoogleLatLng($scope.proposal.request.position.latitude,$scope.proposal.request.position.longitude)

      var mapOptions = {
        center: initMapCoords,
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: false,
        zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
      }
      actual_map = new google.maps.Map(
              mapContainer,
              mapOptions
      )

      $scope.marker = new google.maps.Marker({
            position: initMapCoords,
            map: actual_map
      });

      $scope.actual_map = actual_map
    }

    $scope.$on('$ionicView.enter', function(){
      console.log('entering...');
      $scope.showGoogleMap();
      $timeout(function() {

      }, 3000);
    });

    $scope.goToStudentCalendar = function (calendar) {
      console.log(calendar);
      console.log('this was clicked')
    }

  }


])