angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsCardController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicHistory',
  '$ionicViewSwitcher',
  function($scope, $state, $ionicHistory, $ionicViewSwitcher) {

    $scope.goBack = function() {
      $ionicViewSwitcher.nextDirection('back');
      $scope.root.vars.select_bottom_three = true;
      if ($scope.user.guru_mode) {
        $state.go('^.student-home');
      } else {
        $state.go('^.guru-home');
      }

    }

      $scope.goToEditCard = function (card) {

          mixpanel.track("add.payment");
          $state.go('^.add-payment', {cardObj:JSON.stringify(card)});
      }

    $scope.deleteCard = function() {
        // $scope.card from $scope
        //delete this card from $scope.user.cards
    }

    $scope.goToAddTransferMethod = function (bool) {
        //mixpanel track
        mixpanel.track("add.payment");
      $state.go('^.add-payment', {debitCardOnly:JSON.stringify(bool)});
    }

  }


]);
