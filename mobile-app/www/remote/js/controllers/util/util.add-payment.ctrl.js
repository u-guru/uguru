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
  '$ionicActionSheet',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $stateParams, $ionicViewSwitcher,
  $ionicSideMenuDelegate, $ionicActionSheet, LoadingService) {

    $scope.data = {card_exists: false};

    $scope.cardForm = {number: '', exp:''};

    if ($scope.LOCAL) {
      $scope.cardForm.number = '4000056655665556';
      $scope.cardForm.exp = '09 / 2016';
    }


    //1. Add card [x] [ ]
      // validate card
      // send to server
    //2. Remove card [x] [ ]
      // remove client side
      // send to server
    //3. Update default Transfer [x] [ ]
      // Send card to server
    //4. Cashout
      // Update current balance
      // Create transaction server side
      // update transaction here

    // add card
    $scope.savePayment = function() {
      LoadingService.showAmbig('Verifying', 5000);
      var cardNum = $scope.cardForm.number;
      var expMM = $scope.cardForm.exp.split(' / ')[0];
      var expYY = $scope.cardForm.exp.split(' / ')[1];

      console.log('new details', cardNum, expMM, expYY);

      var stripeResponseHandler = function(status, response) {

        if (response.error) {
            LoadingService.hide();
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
            $scope.success.show(0, 2000, "Please Enter a Debit Card.\nYou entered a credit card.");
            if ($scope.cardYY && $scope.cardMM && $scope.cardInput) {
              $scope.cardYY.value = '';
              $scope.cardMM.value = '';
              $scope.cardInput.value = '';
            }
        }
        else {
          var cardInfo = {
            stripe_token: response.id,
            card_last4: response.card.last4,
            card_type: response.card.brand,
          }

          cardInfo.debit_card = true;
          cardInfo.is_transfer_card = true;
          if (!$scope.user.transfer_cards) {
            $scope.user.transfer_cards = [];
          }
          $scope.user.transfer_cards.push(cardInfo);

          // if ($scope.debitCardOnly) {
          // } else {
          //   cardInfo.card = true;
          //   cardInfo.is_payment_card = true;
          //   if (!$scope.user.payment_cards) {
          //     $scope.user.payment_cards = [];
          //   }
          //   $scope.user.payment_cards.push(cardInfo);
          // }
          LoadingService.hide();
          $scope.user.cards.push(cardInfo);
          LoadingService.show();
          console.log(cardInfo)
          var successCallback = function($scope, $state) {

            $scope.success.show(0, 2000, 'Your card has been successfully added');

              if ($state.current.name === 'root.home') {



                $scope.closePaymentsModal();

                if ($scope.choosePriceModal) {
                  $scope.choosePriceModal.show();
                  $timeout(function() {
                    LoadingService.hide();
                  }, 500)
                }

              }

              if ($scope.paymentsModal && $scope.paymentsModal.isShown()) {
                $scope.paymentsModal.hide();
                LoadingService.hide();
              }



              // $scope.success.show(0, 2000, 'Your card has been successfully added');

              if ($state.current.name === 'root.payments' && !$scope.root.vars.guru_mode) {
                $ionicSideMenuDelegate.toggleRight();

                $timeout(function() {
                  LoadingService.hide();
                }, 500)
              }

              if ($state.current.name === 'root.payments' && $scope.root.vars.guru_mode) {
                $scope.goBack();
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
      LoadingService.showSuccess('Card Successfully Deleted', 2000);
    }

    $scope.editPayment = function(card) {
      $scope.card = card;
      $scope.cardForm = {
        number: '**** **** **** ' + card.card_last4,
        exp: '** / **'
      }
      var paymentModalLink = document.getElementById('cta-modal-payments');
      var close_elem = document.querySelector('#cta-modal-payments .cta-modal-close');
      close_elem.addEventListener('click', function() {
        paymentModalLink.classList.remove('show');
        if ($scope.LOCAL) {
          $scope.cardForm.number = '4000056655665556';
          $scope.cardForm.exp = '09 / 2016';
        } else {
          $scope.cardForm = {number: '', exp:''};
        }
      });
      paymentModalLink.classList.add('show');

      // console.log('payment modal link', paymentModalLink);
      // paymentModalLink.click();
    }

    $scope.setDefaultTransfer = function() {

      var cardPayload = { card: { id: $scope.card.id, default_transfer:true } }
      for (var i = 0; i < $scope.user.transfer_cards.length; i++) {
        if ($scope.card.id != $scope.user.transfer_cards[i].id) {
          $scope.user.transfer_cards[i].is_default_transfer = false;
        }
      }

      cardPayload.default_transfer = true;
      $scope.user.updateObj($scope.user, 'cards', cardPayload, $scope);

      LoadingService.showSuccess('Default set!', 2000);

    }


    $scope.$on('modal.shown', function() {


    });





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

  }


])