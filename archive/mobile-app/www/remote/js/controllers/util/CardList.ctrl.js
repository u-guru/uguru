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
    // $scope.user_cards = [{card_last4:'2121',card_type:'Visa', id:1}, {card_last4:'3121',card_type:'Discover', id:2}, {card_last4:'4121',card_type:'Mastercard', id:3}]
    // $scope.user.name = 'Samir Makhani';

    $scope.editCard = {card_number: '', id:0, card_type:'', exp_date:''};

    $scope.$on('$ionicView.loaded', function() {

      var user_cards = $scope.user_cards;

      setTimeout(function(){

        for (var i =0; i < user_cards.length; i++) {

        var indexCard = user_cards[i]

            cardObj = CardService.userCardObj($scope.user.name, indexCard.card_last4, indexCard.id, indexCard.card_type)
            CardService.initCardView('', cardObj);

          $timeout(function() {
            CardService.instatiateAllCards($scope.user_cards);
          }, 1000)
        }

      }, 2000)
    })

    $scope.editCurrentCard = function(card) {
      $scope.editCard = card;
      $scope.editCard.card_number = '**** **** **** ' + card.card_last4;
      $scope.editCard.exp_date = '** / **';
      $scope.launchEditCardModal($scope.editCard);
    }

    setTimeout(function(){

        for (var i =0; i < $scope.user.transfer_cards.length; i++) {

        var indexCard = $scope.user.transfer_cards[i];
            cardObj = CardService.userCardObj($scope.user.name, indexCard.card_last4, indexCard.id, indexCard.card_type)
            CardService.initCardView('', cardObj);

          $timeout(function() {
            CardService.instatiateAllCards($scope.user.transfer_cards);
          }, 1000)
        }

      }, 2000)



      $scope.launchEditCardModal = function(edit_card) {
        $ionicModal.fromTemplateUrl(BASE + 'templates/add-card.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.editCardModal = modal;
            $scope.editCard = edit_card || $scope.editCard;
            $scope.editCardModal.show();
        });
      }

      $scope.$on('modal.shown', function() {
        $timeout(function() {
          cardObj = CardService.userCardObj($scope.user.name, $scope.editCard.card_last4, $scope.editCard.id, $scope.editCard.card_type)
          CardService.initCardView('card-modal-wrapper', cardObj);

          // if ($scope.editCard.id) {
          //   $timeout(function() {
          //     CardService.instatiateAllCards([$scope.editCard]);
          //   }, 500)
          // }

        }, 1000);
      });

  }


])