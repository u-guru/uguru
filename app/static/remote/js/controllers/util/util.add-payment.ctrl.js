  angular.module('uguru.util.controllers')

.controller('PaymentsController', [

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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $stateParams, $ionicViewSwitcher, $ionicSideMenuDelegate) {



    // console.log();
    $scope.user.cards = [];
    $scope.user_has_card = $scope.user.cards && $scope.user.cards.length > 0;

    $scope.clearCard = function() {
      $scope.card = null;
      $scope.cardInput.value = '';
      $scope.ccvInput.value = '';
      $scope.rootUser.updateLocal($scope.user);
      $scope.root.keyboard.show('card-input', 500);
    }

    $scope.addCard = function() {
      $scope.root.vars.show_price_fields = true;

      $timeout(function() {

        $scope.$apply();
      }, 500)

      $timeout(function() {
         console.log('shit triggered');
         var payment_input = document.getElementById('card-input');
         payment_input.focus();
         console.log(payment_input);
         $scope.beforeEnterFunctionTrigger();
      }, 1000)

      $ionicSideMenuDelegate.toggleRight();

    }

    $scope.addPaymentActionBtn = function() {
      if ($scope.actionButtonText.toLowerCase() === 'save') {
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
            $cordovaProgress.showSuccess(true, msg);
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



      // $scope.cardInput = document.getElementById('card-input');
      // $scope.cardMM = document.getElementById('mm-input');
      // $scope.cardYY = document.getElementById('yy-input');

      // var cardNum = $scope.cardInput.value.split(" ").join("")
      // var expMM = $scope.cardMM.value;
      // var expYY = $scope.cardYY.value;
      // var cardType = $scope.getCardType(cardNum);
      // console.log($scope.card_input_text, expMM, expYY);
      //check for errors
      // if (!$scope.validatedAddCardForm(cardNum, ccvNum)) {
      //   //make card shake
      // }

      var cardNum = $scope.card_input_text;
      var expMM = $scope.mm_input_text;
      var expYY = $scope.yy_input_text;
      console.log(cardNum, expMM, expYY);

      var stripeResponseHandler = function(status, response) {

        if (response.error) {
            $scope.error_msg = true;
            $scope.progress_active = true;
            $scope.success.show(0, 2000, response.error.message);
            $timeout(function() {
              $scope.error_msg = null;
            },2000);
            $scope.card_input_text = '';
            $scope.card_mm_text = '';
            $scope.card_yy_text = '';
            // alert(response.error.message);

        }
        else if ($scope.debitCardOnly && response.card.funding !== "debit") {
            $scope.success.show(0, 2000, "Please Enter a Debit Card. This one appears to be credit.");
            $scope.cardYY.value = '';
            $scope.cardMM.value = '';
            $scope.cardInput.value = '';
        }
        else {
          var cardInfo = {
            stripe_token: response.id,
            card_last4: response.card.last4,
            card_type: response.card.brand,
          }

          if ($scope.debitCardOnly) {
            cardInfo.debit_card = true;
            cardInfo.is_transfer_card = true;
            if (!$scope.user.transfer_cards) {
              $scope.user.transfer_cards = [];
            }
            $scope.user.transfer_cards.push(cardInfo);
          } else {
            cardInfo.card = true;
            cardInfo.is_payment_card = true;
            if (!$scope.user.payment_cards) {
              $scope.user.payment_cards = [];
            }
            $scope.user.payment_cards.push(cardInfo);
            // $scope.user.payment_cards.push(cardInfo)
          }

          $scope.user.cards.push(cardInfo);

          $scope.user.createObj($scope.user, 'cards', cardInfo, $scope);
          $scope.success.show(500, 2000, 'Your card was successfully added!');
          $ionicSideMenuDelegate.toggleRight();
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

      var cardInfo = {
        card: {
          id: $scope.card.id,
          remove_card: true
        }
      }

      $scope.user.updateObj($scope.user, 'cards', cardInfo, $scope);

      alert('Card Successfully Deleted');
      $ionicHistory.goBack();
    }
    $scope.setDefault = function() {

      var cardInfo = {
        card: {
          id: $scope.card.id
        }
      }

      var user_card = $scope.card;

      if ($scope.debitCardOnly) {
        for (var i = 0; i < $scope.user.transfer_cards.length; i++) {
          if (user_card.id != $scope.user.transfer_cards[i].id) {
            $scope.user.transfer_cards[i].is_default_transfer = false;
          }
        }
        cardInfo.default_transfer = true;
      } else {

        for (var i = 0; i < $scope.user.payment_cards.length; i++) {
          if (user_card.id != $scope.user.payment_cards[i].id) {
            $scope.user.payment_cards[i].is_default_payment = false;
          }
        }
        cardInfo.default_payment = true;

      }

      $scope.user.updateObj($scope.user, 'cards', cardInfo, $scope);
      alert('Card Default Set!');
      $ionicHistory.goBack();

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


    $scope.beforeEnterFunctionTrigger = function() {
      // $scope.loader.show();

      // $timeout(function() {
      //   $scope.loader.hide()
      //   }, 3000);

      $scope.debitCardOnly = ($stateParams && $stateParams.debitCardOnly) || $scope.user.guru_mode;

      $scope.cardFormComplete = false;
      $scope.progress_active = false;
      $scope.actionButtonText = 'save';
      $scope.headerText = 'Add payment';
      $scope.placeholderValue = '4242 4242 4242 4242';

      if ($scope.user.guru_mode || $scope.debitCardOnly) {
        $scope.headerText = 'Add debit card';
        $scope.placeholderValue = '4000 0566 5566 5556';
      }

      $scope.card = null;
      if ($stateParams.cardObj) {
        $scope.card = JSON.parse($stateParams.cardObj);
        $scope.actionButtonText = 'clear';
      }

      $scope.cardInput = document.getElementById('card-input');
      $scope.cardMM = document.getElementById('mm-input');
      $scope.cardYY = document.getElementById('yy-input');


      if ($scope.card) {
        $scope.cardInput.value = '**** **** **** ' + $scope.card.card_last4;
        $scope.cardMM.value = '**';
        $scope.cardYY.value = '**';
      } else {
        $scope.cardInput.focus();
      }

      // $scope.cardInput.addEventListener('keyup', checkInputState);
      // $scope.cardMM.addEventListener('keyup', checkInputState);
    }

    $scope.$on('$ionicView.beforeEnter', function(){

      $scope.beforeEnterFunctionTrigger()

    });

    $scope.$on('$ionicView.afterEnter', function(){
      $scope.loader.hide();
    });

  }


])