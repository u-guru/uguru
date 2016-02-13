angular
.module('sharedServices')
.factory("PaymentService", [
  'LoadingService',
  PaymentService
	]);

function PaymentService(LoadingService) {


  return {
    addPaymentCard: addPaymentCard,
    removeCard: removeCard,
    setPaymentCardToDefault: setPaymentCardToDefault,
    setTransferCardToDefault: setTransferCardToDefault,
    purchaseCredits: purchaseCredits,
    cashoutWithTransferCard: cashoutWithTransferCard,
    addTransferCard: addTransferCard
  }

  function removeCard(card, user) {
    var cardInfo = {
      card: {
        default_payment: true,
        id: card.id
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your ' + card.card_type +' card ending in ' + card.card_last4 + ' has been removed.', 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    user.updateObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function cashoutWithTransferCard(amount, card, user) {
      var cardInfo = {
        card: {
          id: card.id,
          amount: amount,
          card_id: card.id,

        }
      };
      var successCallback = function($scope, $state) {
        LoadingService.showSuccess('Your transfer of $' + amount + ' has been applied to your ' + card.card_type +' debit card ending in ' + card.card_last4 + '!', 2000);
      };

      var failureCallback = function($scope, $state) {
        LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
      }
      user.updateObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function purchaseCredits(offer, card, user) {
    var cardInfo = {
      card: {
        id: card.id,
        offer: offer
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your payment of ' + offer.price + ' has been applied to your ' + card.card_type +' card ending in ' + card.card_last4, 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    user.updateObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function setPaymentCardToDefault(card, user) {
    var cardInfo = {
      card: {
        default_payment: true,
        id: card.id
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your ' + card.card_type +' card ending in ' + card.card_last4 + ' has been set to default.', 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    user.updateObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function setTransferCardToDefault(card, user) {
    var cardInfo = {
      card: {
        default_transfer: true,
        id: card.id
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your ' + card.card_type +' card ending in ' + card.card_last4 + ' has been set to default.', 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    user.updateObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function addPaymentCard(user, stripe_response) {
    var cardInfo = {
      card: {
        stripe_token: stripe_response.id,
        card_last4: stripe_response.card.last4,
        card_type: stripe_response.card.brand,
        is_debit: stripe_response.card.funding == "debit"
      },
      payment_card: true
    };

    var successCallback = function($scope, $state) {

      LoadingService.showSuccess('Your card has been successfully added', 2000);

    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }

    user.createObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

  function addTransferCard(user, stripe_response) {
    var cardInfo = {
      card: {
        stripe_token: stripe_response.id,
        card_last4: stripe_response.card.last4,
        card_type: stripe_response.card.brand,
        debit_card: stripe_response.card.funding ==+ "debit"
      },
      transfer_card: true,
      debit_card: true
    };

    if (!cardInfo.card.debit_card) {
      LoadingService.showMsg("Sorry! This card did not process as a debit card. Please try again with a debit card.");
      return;
    }

    var successCallback = function($scope, $state) {

      LoadingService.showSuccess('Your card has been successfully added', 2000);

    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }

    user.createObj($scope.user, 'cards', cardInfo, $scope, successCallback);
  }

}





