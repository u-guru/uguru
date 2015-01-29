angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams) {

    $scope.time_checkbox = 0;
    $scope.virtual_guru_checkbox = true;
    $scope.person_guru_checkbox = false;
    $scope.request = {
      note:null,
      photo:null
    };
    $scope.course = JSON.parse($stateParams.courseObj);

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/add-note.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addRequestNoteModal = modal;
    });

    $scope.checkboxClicked = function(index) {
      $scope.time_checkbox = index;
    }

    $scope.toggleVirtualGuru = function() {
      $scope.virtual_guru_checkbox = !$scope.virtual_guru_checkbox;
    }

    $scope.togglePersonGuru = function() {
      $scope.person_guru_checkbox = !$scope.person_guru_checkbox;
      if ($scope.person_guru_checkbox) {
        $scope.showComingSoonProgress('top', function(){
          $scope.person_guru_checkbox = false;
        })
      }
    }

    $scope.showComingSoonProgress = function(position, callback) {
      $cordovaProgress.showText(false, "Coming Soon! Stay Tuned", position);
        $timeout(function() {
          $cordovaProgress.hide();
          if (callback) {
            callback();
          }
        }, 1000)
    }

  }

]);

