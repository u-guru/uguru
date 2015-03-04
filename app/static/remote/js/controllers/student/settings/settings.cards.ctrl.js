angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsCardController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {

    $scope.goToEditCard = function(card) {
        $state.go('^.add-payment', {cardObj:JSON.stringify(card)});
    }

    $scope.deleteCard = function() {
        // $scope.card from $scope
        //delete this card from $scope.user.cards
    }

    $scope.goToAddTransferMethod = function(bool) {
      $state.go('^.add-payment', {debitCardOnly:JSON.stringify(bool)});
    }

  }


]);

