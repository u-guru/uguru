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

    $scope.card_details = {number: '', expiry:''};


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

    $scope.goBack = function() {
      $ionicHistory.goBack();
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

    $scope.savePaymentStatic = function() {

      var successCallback = function() {
        $scope.success.show(0, 2000, 'Your card was successfully added!');
        $timeout(function() {
          $scope.root.vars.show_price_fields = !$scope.root.vars.show_price_fields;
        }, 500);


      }

      $scope.savePayment(successCallback, null);

    }

    $scope.savePaymentHome = function() {

      $scope.success.show(500, 2000, 'Your card was successfully added!');
      $ionicSideMenuDelegate.toggleRight();
    }

    $scope.savePayment = function() {

      var cardNum = $scope.card_details.number;
      var expMM = $scope.card_details.expiry.split(' / ')[0];
      var expYY = $scope.card_details.expiry.split(' / ')[1];

      console.log('new details', cardNum, expMM, expYY);

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
          }

          $scope.user.cards.push(cardInfo);
          $scope.success.show(0, 2000, 'Your card has been successfully added');

          var successCallback = function($scope, $state) {

              if ($state.current.name === 'root.home') {
                $scope.closePaymentsModal();

                if ($scope.choosePriceModal) {
                $scope.choosePriceModal.show();
                }
              }

              if ($scope.paymentsModal && $scope.paymentsModal.isShown()) {
                $scope.paymentsModal.hide();
              }

              $scope.loader.hide();

              // $scope.success.show(0, 2000, 'Your card has been successfully added');

              if ($state.current.name === 'root.payments') {

                $timeout(function() {
                  $ionicHistory.goBack();
                }, 500);
              }


          }
          $scope.user.createObj($scope.user, 'cards', cardInfo, $scope, successCallback);
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
    $scope.card_already_created = false;


    $scope.$on('modal.shown', function() {


        if ($scope.paymentsModal && $scope.paymentsModal.isShown() && !$scope.card_already_created) {
          console.log('instantiating');
          $scope.card_already_created = true;
          $timeout(function() {
            $scope.initCardAndFocusInput();
          }, 750);
        }
    });


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
           if (number.match(re) != null)
                return "discover";

            return "";
        }




    $scope.$on('$ionicView.beforeEnter', function(){


    });

    $scope.initCardAndFocusInput = function() {
      var payment_input = document.getElementById('card-input');
      payment_input.focus();

      $scope.card_js = new Card({
          form: document.querySelector('form'),
          container: '.card-wrapper',
          values: {name:$scope.user.name || null},
          formSelectors: {
              numberInput: 'input#card-input',
              expiryInput: 'input#expiry-input',
          },
      });
    }

    $scope.$on('$ionicView.afterEnter', function(){
        console.log('after enter');
        $scope.initCardAndFocusInput();

    });

  }


])