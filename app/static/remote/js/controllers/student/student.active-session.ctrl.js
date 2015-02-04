angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentActiveSession', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  'Geolocation',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams,
  Geolocation) {

    $scope.session = JSON.parse($stateParams.sessionObj);

    $scope.goToSessionMessages = function(session) {
      $state.go('^.messages', {sessionObj:JSON.stringify(session)});
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.ratingModal = modal;
    });
    

  }

]);

