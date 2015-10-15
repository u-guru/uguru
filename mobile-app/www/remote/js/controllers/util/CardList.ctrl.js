  angular.module('uguru.util.controllers')

.controller('CardListController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicHistory',
  '$stateParams',
  '$ionicViewSwitcher',
  '$ionicSideMenuDelegate',
  '$ionicActionSheet',
  'CardService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $stateParams, $ionicViewSwitcher,
  $ionicSideMenuDelegate, $ionicActionSheet, CardService) {

    $scope.data = {card_exists: false};
    // console.log();
    $scope.user.cards = [{card_last4:'2121',card_type:'Visa', id:1}, {card_last4:'3121',card_type:'Discover', id:2}, {card_last4:'4121',card_type:'Mastercard', id:3}]
    $scope.user.name = 'Samir Makhani';


    $scope.$on('$ionicView.enter', function() {

      var user_cards = $scope.user.cards;

      for (var i =0; i < user_cards.length; i++) {

        var indexCard = user_cards[i]

            cardObj = CardService.userCardObj($scope.user.name, indexCard.card_last4, indexCard.id, indexCard.card_type)
            CardService.initCardView('', cardObj);

          $timeout(function() {
            CardService.instatiateAllCards($scope.user.cards);
          }, 1000)
      }

    });

  }


])