angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruController', [

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


  document.addEventListener("deviceready", function () {
    if (window.StatusBar) {
      $timeout(function() {
        StatusBar.overlaysWebView(true);
        StatusBar.styleLightContent();
      }, 250)
    }
  });


    console.log($scope.user);


    $scope.root.vars.guru_mode = true;
    $scope.guru_mode = true;

      $scope.processPendingProposals = function(pending_proposals) {
        for (var j = 0; j < pending_proposals.length; j++) {
          index_proposal = pending_proposals[j];

          index_proposal.request.schedule_time = 45;
          index_proposal.request.verb_image = 'session.svg';

          index_proposal.request.tags = ['milleniumfalcon'];

          //condense the address
          if (index_proposal.request.address.split(',').length > 2) {
            index_proposal.request.address = index_proposal.request.address.split(",").splice(0,2).join(",");
          }

        }
      }

      $scope.processActiveProposalsGuru = function(active_proposals) {

          if (active_proposals.length === 0) {
            return;
          }

          var first_proposal = active_proposals[0];
          active_proposals.shift();
          $scope.featuredProposal = first_proposal;
          $scope.proposal = $scope.featuredProposal;
          $scope.initAndShowProposalModal();


          var processed_time = $scope.processTimeEstimate($scope.proposal.request.time_estimate);

          $scope.proposal.request.time_estimate = {hours: processed_time[0], minutes:processed_time[1]};

          $scope.proposal.request.tags = ['milleniumfalcon'];

      }

      $scope.processTimeEstimate = function(minutes) {
        num_hours = Math.floor(Math.round((minutes / 60.0) * 100) / 100);
        minutes = minutes % 60;
        return [num_hours, minutes];

      }

      $scope.initAndShowProposalModal = function() {

        $ionicModal.fromTemplateUrl(BASE + 'templates/guru.request.incoming.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.incomingStudentSessionProposal = modal;
            $scope.incomingStudentSessionProposal.show();
        });

      }

      $scope.acceptIncomingStudentProposal = function() {

        proposalObj = $scope.proposal;
        proposalObj.status = 2; //guru accepted
        proposalObj.proposal = true;

        //fake it for now...r

        $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);

        if (!$scope.user.pending_proposals) {
          $scope.user.pending_proposals = [];
        }

        $scope.user.pending_proposals.push(proposalObj);


        $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);

        alert("Student request accepted. We'll let you know if they choose you! \n See below for progress");
          //Mixpanel Track



        $scope.incomingStudentSessionProposal.hide();


        //timeout
        $timeout(function() {

          $scope.processActiveProposalsGuru($scope.user.active_proposals);

        }, 500);

      }

       $scope.rejectStudent = function() {


          var callbackFunction = function() {
            proposalObj = $scope.proposal;
            $scope.deleteProposalFromList($scope.proposal, $scope.user.active_proposals);
            proposalObj.status = 3; //guru rejected
            proposalObj.proposal = true;
            $scope.user.updateObj($scope.user, 'requests', proposalObj, $scope);
            $scope.success.show(0, 2000, 'Success!');
              //Mixpanel Track
            mixpanel.track("Guru.home");
            $scope.incomingStudentSessionProposal.hide();


            //timeout
            $timeout(function() {

              $scope.processActiveProposalsGuru($scope.user.active_proposals);

            }, 500);


          }



          if ($scope.platform.mobile) {
            $scope.root.dialog.confirm('You cannot undo this!', 'Are you sure?', ['Cancel', 'Yes'], [null, callbackFunction]);
          } else {
            if (confirm('Are you sure? You cannot undo this!')) {
              callbackFunction();
            }
          }

        }

        $scope.createGoogleLatLng = function(latCoord, longCoord) {
            return new google.maps.LatLng(latCoord, longCoord);
        }



        $scope.showGoogleMap = function() {

          $scope.proposal.request.position.latitude = 51.219053;
          $scope.proposal.request.position.longitude = 4.404418;
          console.log($scope.proposal.request.position);

          if (!$scope.proposal.request.position || !$scope.proposal.request.position.latitude || !$scope.proposal.request.position.longitude) {
            console.log('no coordinates... forget about it');
            return;
          }

          $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
          $scope.options = {scrollwheel: false};

          var mapContainer = document.getElementById("map_canvas");
          var initMapCoords;


          initMapCoords = $scope.createGoogleLatLng(parseFloat($scope.proposal.request.position.latitude),parseFloat($scope.proposal.request.position.longitude))
          var mapOptions = {
            center: initMapCoords,
            zoom: 17,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            // zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER}
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

        $scope.$on('modal.shown', function() {

          if ($scope.incomingStudentSessionProposal.isShown()) {
            console.log('modal is shown')
            $timeout(function() {
              if (window.StatusBar) {
                StatusBar.overlaysWebView(true);
                StatusBar.styleLightContent();
              }

              $scope.showGoogleMap();

            }, 100);



          }

        });





  }

]);
