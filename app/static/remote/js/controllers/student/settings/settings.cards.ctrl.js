angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsCardController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {
    
    $scope.rootUser.updateLocal($scope.user);
    if ($scope.user.cards.length === 0) {
        $scope.user.cards = [
            {
                type: 'visa',
                last_4: '8531',
                default: false,
            },
            {
                type: 'master',
                last_4: '8121',
                default: true,
            },
            {
                type: 'amex',
                last_4: '8531',
                default: false,
            },
            {
                type: 'discovery',
                last_4: '8512',
                default: false,
            }
        ]
    }
    $scope.cards = $scope.user.cards;

    $scope.goToEditCard = function(card) {
        $state.go('^.add-payment', {cardObj:JSON.stringify(card)});
    }

    $scope.deleteCard = function() {
        // $scope.card from $scope
        //delete this card from $scope.user.cards 
    }

  }


]);

