angular.module('uguru.util.controllers')

.controller('AddPaymentController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicHistory',
  '$cordovaProgress',
  '$stateParams',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $cordovaProgress, $stateParams) {

    $scope.cardFormComplete = false;
    $scope.progress_active = false;
    $scope.actionButtonText = 'save';
    $scope.headerText = 'Add payment';

    if ($scope.user.guru_mode) {
      $scope.headerText = 'Add debit card';
    }

    $scope.card = null;
    if ($stateParams.cardObj) {
      $scope.card = JSON.parse($stateParams.cardObj);
      $scope.actionButtonText = 'clear';
    }

    $scope.clearCard = function() {
      $scope.card = null;
      $scope.cardInput.value = '';
      $scope.ccvInput.value = '';
      $scope.rootUser.updateLocal($scope.user);
      $scope.root.keyboard.show('card-input', 500);
    }

    $scope.addPaymentActionBtn = function() {
      if ($scope.actionButtonText === 'save') {
        $scope.savePayment()
      } else {
        $scope.clearCard();
      }
      $scope.setActionButtonText();
    }

    $scope.setActionButtonText = function() {
      if (!$scope.card) {
        $scope.actionButtonText = 'save';
      } else {
        $scope.actionButtonText = 'clear';
      }
    }

    $scope.showSuccess = function(msg) {
        if (!$scope.progress_active)  {
            $scope.progress_active = true;
            $cordovaProgress.showSuccess(true, msg)
            $timeout(function() {
              $cordovaProgress.hide();
              $scope.progress_active = false;
              $ionicHistory.goBack();
            }, 1000);
        } else {
          console.log('Show success cannot be shown because progress bar is already active');
        }
    }

    $scope.savePayment = function() {

      var cardNum = $scope.cardInput.value.split(" ").join("")
      var expMM = $scope.cardMM.value;
      var expYY = $scope.cardYY.value;
      var cardType = $scope.getCardType(cardNum);
      console.log(cardNum, expMM, expYY);
      //check for errors
      // if (!$scope.validatedAddCardForm(cardNum, ccvNum)) {
      //   //make card shake
      // }

      var stripeResponseHandler = function(status, response) {
        console.log(response);
        if (response.error) {

            $scope.progress_active = true;
            $cordovaProgress.showSuccess(true, response.error.message);
            $timeout(function() {
              $cordovaProgress.hide();
              $scope.progress_active = false;
            }, 1000);

        } else {

          var cardInfo = {
            stripe_token: response.id,
            card_last4: response.card.last4,
            card_type: response.card.brand,
            user: $scope.user,
            card: true
          }

          $scope.user.createObj($scope.user, 'cards', cardInfo, $scope);
          $scope.showSuccess("Card added!");
        }
      }

      Stripe.card.createToken({
        number: cardNum,
        exp_month: expMM,
        exp_year: expYY
      }, stripeResponseHandler);
    }

    $scope.removeCard = function() {
      var cardPosition = $scope.root.util.objectFindByIndexByKey($scope.user.cards, 'last_4', $scope.card.last_4);
      $scope.user.cards.splice(cardPosition, 1);
      $scope.showSuccess('Card Deleted');
    }

    $scope.setDefault = function() {
      var user_card = $scope.root.util.objectFindByKey($scope.user.cards, 'last_4', $scope.card.last_4);
      user_card.default = true;
      for (var i = 0; i < $scope.user.cards.length; i++) {
        if (user_card.last_4 != $scope.user.cards[i].last_4) {
          $scope.user.cards[i].default = false;
        }
      }

      $scope.rootUser.updateLocal($scope.user);
      $scope.showSuccess('Default Set!');

    }

    $scope.injectCardPngClass = function() {

    }

    $scope.getCardType = function(number) {
      return 'visa';
    }

    $scope.validatedAddCardForm = function(card_num, ccv) {
      //validated card farm
      return true;
    }

    var checkInputState = function(event) {

        var foo = $scope.cardInput.value.split(" ").join(""); // remove hyphens
        var mmInput = $scope.cardMM.value;
        var cardType = $scope.getCardType(foo);
        // console.log(cardType);
        if (cardType.length > 0) {
          console.log
        }

        if (foo.length > 0) {
          foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
        }
        $scope.cardInput.value = foo;
        if (foo.length === 19 && $scope.cardInput === document.activeElement) {
          $scope.cardMM.focus();
        }
        if (mmInput.length === 2 && $scope.cardMM === document.activeElement) {
          $scope.cardYY.focus();
        }
      }

      $scope.getCardType = function(number)
        {
            var re = new RegExp("^4");
            if (number.match(re) != null)
                return "visa";

            re = new RegExp("^(34|37)");
            if (number.match(re) != null)
                return "amex";

            re = new RegExp("^5[1-5]");
            if (number.match(re) != null)
                return "master";

            re = new RegExp("^6011");
            if (number.match(re) != null)
                return "discover";

            return "";
        }


    $scope.$on('$ionicView.enter', function(){

      $scope.cardInput = document.getElementById('card-input');
      $scope.cardMM = document.getElementById('mm-input');
      $scope.cardYY = document.getElementById('yy-input');

      if ($scope.card) {
        $scope.cardInput.value = '**** **** **** ' + $scope.card.last_4;
        $scope.ccvInput.value = '***'
      } else {
        $scope.root.keyboard.show('card-input', 500);
      }

      $scope.cardInput.addEventListener('keyup', checkInputState);
      $scope.cardMM.addEventListener('keyup', checkInputState);

    });

  }


])