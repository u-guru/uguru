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

  function removeCard(card, scope) {
    if (!confirm('Are you sure you want to remove ' + card.card_type + ' card ' + card.card_last4)) {
      return;
    }
    LoadingService.showAmbig();
    var cardInfo = {
      card: {
        id: card.id,
        remove_card: true
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your ' + card.card_type +' card ending in ' + card.card_last4 + ' has been removed.', 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    scope.user.updateObj(scope.user, 'cards', cardInfo, scope, successCallback, failureCallback);
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

  function purchaseCredits(offer_index, scope) {
    var clientOffers = [40, 80, 170];
    var clientPrices = [50, 105, 200];
    if (!scope.user.default_payment_card || !scope.user.default_payment_card.id) {
      LoadingService.showMsg('Please add a payment card and try again', 2500);
      return;
    }
    if (!confirm('Please confirm your ' + clientOffers[offer_index] + ' credits for $' + clientPrices[offer_index] + ' purchase with ' + scope.user.default_payment_card.card_type + ' card ending in ' + scope.user.default_payment_card.card_last4 + '.')) {
      LoadingService.showAmbig(null, 750, function() {
        LoadingService.hide();
      })
      return;
    }

    var cardInfo = {
      card: {
        id: scope.user.default_payment_card.id,
        offer_index: offer_index,
        purchase_credit: true
      }
    };
    var successCallback = function($scope, $state) {
      LoadingService.showSuccess('Your payment of ' + clientOffers[offer_index] + ' has been applied to your ' + card.card_type +' card ending in ' + card.card_last4, 2000);
    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }
    scope.user.updateObj(scope.user, 'cards', cardInfo, scope, successCallback);
  }

  function setPaymentCardToDefault(card, scope) {
    LoadingService.showAmbig();
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
    scope.user.updateObj(scope.user, 'cards', cardInfo, scope, successCallback, failureCallback);
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

  function addPaymentCard(scope, stripe_response, success) {
    var cardInfo = {
      card: {
        stripe_token: stripe_response.id,
        card_last4: stripe_response.card.last4,
        card_type: stripe_response.card.brand,
        is_debit: stripe_response.card.funding == "debit",
        is_payment_card: true
      },
      payment_card: true
    };
    if (cardInfo.card.is_debit) {
      cardInfo.card.funding = "debit";
    } else {
      cardInfo.card.funding = "credit";
    }

    var successCallback = function($scope, $state) {

      LoadingService.showSuccess('Your ' + stripe_response.card.brand +' card ending in ' + stripe_response.card.last4 + ' has been successfully added', 2000);
      success && success(scope);

    };

    var failureCallback = function($scope, $state) {
      LoadingService.showMsg("Something went wrong.. Please try again or message support", 2000);
    }

    scope.user.createObj(scope.user, 'cards', cardInfo, scope, successCallback);
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

    user.createObj(user, 'cards', cardInfo, $scope, successCallback);
  }

}






