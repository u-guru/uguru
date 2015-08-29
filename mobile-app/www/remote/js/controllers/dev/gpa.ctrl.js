angular.module('uguru.util.controllers')

.controller('gpaController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicActionSheet',

  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate,$ionicActionSheet)
  {

    //action
    $scope.showAttachActionSheet = function() {
       var options = [{text: 'A'},
                      {text: 'B'},
                      {text: 'C'},
                      {text: 'D'},
                     { text: 'F'}];

    // Show the action sheet
    $scope.closeAttachActionSheet = $ionicActionSheet.show({
        buttons: options,
        cancelText: 'Cancel',
        cancel: function() {
            $scope.closeAttachActionSheet();
        },
        buttonClicked: function(index) {
          console.log(index);
        }
    });
    }
    

    $scope.launchCourse = function(verb_index) {
        console.log("Course Session");
        $scope.root.vars.last_verb_index_clicked = 3;
          // if (verb_index) {
          //   $scope.root.vars.detailed_verbs_index_clicked = 1;
          // }

          $ionicModal.fromTemplateUrl(BASE + 'templates/dev/gpa.modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.requestModal = modal;
            $scope.requestModal.show();
          });
    }
  }
]);