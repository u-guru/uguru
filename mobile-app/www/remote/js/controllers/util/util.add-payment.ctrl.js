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
    // console.log();
    $scope.user.cards = [];
    $scope.user_has_card = $scope.user.cards && $scope.user.cards.length > 0;
    $scope.card_details = {number: '', expiry:''};

    $scope.clearCard = function() {

      $scope.card = null;
      // $scope.cardInput.value = '';
      // $scope.ccvInput.value = '';
      // $scope.rootUser.updateLocal($scope.user);
      // $scope.root.keyboard.show('card-input', 500);
      $scope.card_details.number = '';
      $scope.card_details.expiry = '';
    };

    $scope.paymentCardActionSheetOptions = function() {
      var card = $scope.card;
      var options = [{text: 'Remove Card'}];
      if (!card.is_default_payment && !card.is_default_transfer) {
        options.push({text: 'Set Default'});
      }
        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            // titleText: '<span class="semibold uppercase">Edit Card **-' + card.card_last4 + '</span>',
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {

              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $scope.removeCard();
                LoadingService.show();
                $timeout(function() {
                  LoadingService.hide();
                }, 750);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $scope.setDefault();
                LoadingService.show();
                $timeout(function() {
                  LoadingService.hide();
                }, 750);
              }
            }

      });
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

      if ($scope.paymentsModal) {
        $ionicHistory.goBack();
      }
      else if ($scope.root.vars.previous_page_ranking) {
        $scope.root.vars.previous_page_ranking = false;
        $ionicHistory.goBack();
      }
      else {
        LoadingService.show();
        $ionicSideMenuDelegate.toggleRight();

        $timeout(function() {

          LoadingService.hide();
        }, 1000);

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
      LoadingService.show();
      var cardNum = $scope.card_details.number;
      var expMM = $scope.card_details.expiry.split(' / ')[0];
      var expYY = $scope.card_details.expiry.split(' / ')[1];

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

      }

      else {

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

    $scope.initCardAndFocusInput = function(callback) {
      var payment_input = document.getElementById('card-input');
      payment_input.focus();

      var values = {name:$scope.user.name || null};
      var formSelectors = {
              numberInput: 'input#card-input',
              expiryInput: 'input#expiry-input',
      }



      if ($scope.root.vars.editCardClicked) {
        values.number = $scope.card_details.number;
        values.expiry = '**/**';
      }

      $scope.card_js = new Card({
          form: document.querySelector('form'),
          container: '.card-wrapper',
          values: values,
          formSelectors: formSelectors,
      });

      if (callback) {
        callback();
      }

    }

    $scope.fireKeyUpEvent = function() {
      var elem = document.getElementById('card-input');
      var e = document.createEvent("KeyboardEvent");
      e.initEvent("keyup", true, true);
      e.view = window;
      e.altKey = false;
      e.ctrlKey = false;
      e.shiftKey = false;
      e.metaKey = false;
      e.keyCode = 0;
      e.charCode = 'a';
      e.keyCode = 32;

      elem.dispatchEvent(e);
    }

    $scope.$on('$ionicView.enter', function(){

        if ($scope.root.vars.previous_page_ranking) {
          $scope.debitCardOnly = true;
        }

        $timeout(function() {
          LoadingService.hide();
        }, 250);

        var callback;
        if ($scope.root.vars.editCardClicked) {
          $scope.data.card_exists = true;

          $timeout(function() {
            var callback = function() {
              $scope.card = JSON.parse($stateParams.cardObj);
              $scope.card_details.expiry = '** / **';
              $scope.card_details.number = '****-****-****-' + $scope.card.card_last4;
              $timeout(function() {
                $scope.fireKeyUpEvent();
              }, 750);
            }
            $scope.initCardAndFocusInput(callback);
          }, 500);
        }

        $timeout(function() {
          var card_already_created = document.getElementsByClassName('jp-card');
          if (!card_already_created || !card_already_created.length) {
            $scope.initCardAndFocusInput(callback);
          }

        }, 500)

    });

    $scope.$on('$ionicView.leave', function() {
      console.log('leaving view..');
      $scope.root.vars.editCardClicked = null;
    });

  }


])