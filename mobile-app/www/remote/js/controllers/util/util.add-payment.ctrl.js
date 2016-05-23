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
  'PaymentService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicHistory, $stateParams, $ionicViewSwitcher,
  $ionicSideMenuDelegate, $ionicActionSheet, LoadingService,
  PaymentService) {
    $scope.data = {card_exists: false};
    $scope.card = {exp: '', number: '', cvc: '', placeholder:"**** **** **** 4242"};
    $scope.root.vars.cardForm = {number: '', exp:'', view_only:false};

    if ($scope.LOCAL && $state.current.name === 'root.guru') {
      $scope.root.vars.cardForm.number = '4000056655665556';
      $scope.root.vars.cardForm.exp = '09 / 2016';
    }


      $scope.addStudentPayment = function() {
        var cardNum = $scope.root.vars.cardForm.number || $scope.card.number;
        var expMM = $scope.root.vars.cardForm.exp.split(' / ')[0] || $scope.card.exp.split(' / ')[0];
        var expYY = $scope.root.vars.cardForm.exp.split(' / ')[1] || $scope.card.exp.split(' / ')[1];

        if (!expYY || !expMM || !cardNum) {
          LoadingService.showMsg('Please fill in all fields');
          return;
        }
        LoadingService.showAmbig();
        Stripe.card.createToken({
          number: cardNum,
          exp_month: expMM,
          exp_year: expYY
        }, postStripeResponse);

        function postStripeResponse(status, response) {
          if (response.error) {
            LoadingService.showMsg(response.error, 3000);
            $scope.card.number = '';
            $scope.card.exp = '';
            $scope.card.csv = '';
          } else {
            var successFunction = function(scope) {
              scope.card.number = '';
              scope.card.exp = '';
              scope.card.cvc = '';
              scope.card.editStudentPaymentCard = false;
            }
            PaymentService.addPaymentCard($scope, response, successFunction);
          }
        }
      }

      $scope.setStudentCardDefault = function(card) {
        PaymentService.setPaymentCardToDefault(card, $scope);
      }

      $scope.removeStudentPaymentCard = function(card) {
       PaymentService.removeCard(card, $scope);
      }

      $scope.cashoutUser = function() {
      if ($scope.user.balance > 0) {
          var tempAmount = $scope.user.balance;
          LoadingService.showAmbig('Processing....', 5000);
          var successCallback = function() {
            LoadingService.showSuccess('Successfully cashed out $' + tempAmount + '!', 3000);
          }

          var bankTransferPayload = {
            'bank_transfer': true,
            'card_id': $scope.user.default_transfer_card.id
          }

          $scope.user.createObj($scope.user, 'bank_transfer', bankTransferPayload, $scope, successCallback);
        } else {
          LoadingService.showMsg('Sorry! You must have a balance of at least $1 to deposit to your account.', 3500);
        }
      }


    // add card
    $scope.savePayment = function() {
      LoadingService.showAmbig('Verifying', 10000);
      var cardNum = $scope.root.vars.cardForm.number || $scope.card.number;
      var expMM = $scope.root.vars.cardForm.exp.split(' / ')[0] || $scope.card.exp.split(' / ')[0];
      var expYY = $scope.root.vars.cardForm.exp.split(' / ')[1] || $scope.card.exp.split(' / ')[1];

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
        else if ($scope.debitCardOnly && response.card.funding !== "debit" && $state.current.name !== 'root.student-home') {
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

          if ($state.current.name === 'root.student-home') {
            cardInfo.is_payment_card = true;
            if (!$scope.user.payment_cards) {
              $scope.user.payment_cards = [];
            }
            cardInfo.payment_card = true;
            $scope.user.payment_cards.push(cardInfo);
          } else {
            cardInfo.debit_card = true;
            cardInfo.is_transfer_card = true;
            if (!$scope.user.transfer_cards) {
              $scope.user.transfer_cards = [];
            }
              $scope.user.transfer_cards.push(cardInfo);
          }

          $scope.user.cards.push(cardInfo);

          var successCallback = function($scope, $state) {

            LoadingService.showSuccess('Your card has been successfully added', 2000, function() {
              if ($scope.desktopMode) {
                if ($state.current.name === 'root.guru-home') {
                closeDefaultCardModal();
                }
              } else {
                $scope.addCardModal.hide();
              }
            });

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
      if ($scope.desktopMode) {
        $timeout(function() {
          closeDefaultCardModal();
        }, 500)
      } else {
        $scope.addCardModal.hide();
      }
      $scope.root.vars.cardForm = {number: '', exp:'', view_only:false};
      $scope.user.updateObj($scope.user, 'cards', cardInfo, $scope);
      LoadingService.showSuccess('Card Successfully Deleted', 3000);
    }

    var closeDefaultCardModal = function() {
        var paymentModalLink = document.getElementById('cta-modal-payments');
        paymentModalLink.classList.remove('show');
        if ($scope.LOCAL) {
          $scope.root.vars.cardForm.number = '4000056655665556';
          $scope.root.vars.cardForm.exp = '09 / 2016';
          $scope.root.vars.cardForm.view_only = false;
        } else {
          $scope.root.vars.cardForm = {number: '', exp:'', view_only:false};
        }
    }

    $scope.editPayment = function(card) {
      $scope.card = card;
      var paymentModalLink = document.getElementById('cta-modal-payments');
      var close_elem = document.querySelector('#cta-modal-payments .cta-modal-close');
      close_elem.addEventListener('click', closeDefaultCardModal);
      paymentModalLink.classList.add('show');
      $scope.root.vars.cardForm.number = '**** **** **** ' + card.card_last4;
      $scope.root.vars.cardForm.exp = '** / **';
      $scope.root.vars.cardForm.view_only = true;
      // paymentModalLink.click();
    }

    $scope.editPaymentMobile = function(card) {
      $scope.card = card;
      $scope.root.vars.cardForm.number = '**** **** **** ' + card.card_last4;
      $scope.root.vars.cardForm.exp = '** / **';
      $scope.root.vars.cardForm.view_only = true;
      $scope.addCardModal.show();
      // paymentModalLink.click();
    }

    $timeout(function() {
      if (!$scope.desktopMode) {
        $ionicModal.fromTemplateUrl(BASE + 'templates/add.payments.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.addCardModal = modal;
        });
      }
    })


    $scope.setDefaultTransfer = function() {


      var cardPayload = { card: { id: $scope.card.id, default_transfer:true } }
      for (var i = 0; i < $scope.user.transfer_cards.length; i++) {
        if ($scope.card.id != $scope.user.transfer_cards[i].id) {
          $scope.user.transfer_cards[i].is_default_transfer = false;
        }
      }

      cardPayload.default_transfer = true;
      $scope.user.updateObj($scope.user, 'cards', cardPayload, $scope);

      if ($scope.desktopMode) {
        $timeout(function() {
          closeDefaultCardModal();
        }, 500)
      }
      LoadingService.showSuccess('Default set to card **- ' + $scope.card.card_last4, 2000)

    }

    var checkInputState = function(event) {

      var foo = $scope.cardInput.value.split(" ").join(""); // remove hyphens
        var mmInput = $scope.cardMM.value;
        var cardType = $scope.getCardType(foo);

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

        $timeout(function() {
          if ($state.current.name === 'root.student-home') {
            initHandlers($scope);
          }
        })

  }


])

//helper functions

var cardLength, cardValue, el;
  CreditCardTypeExpressions = [{
    "card-type": "MasterCard",
    "exp": function(num) {
      return /^5[1-5]/.test(num);
    }
  }, {
    "card-type": "Visa",
    "exp": function(num) {
      return /^4/.test(num);
    }
  }, {
    "card-type": "American Express",
    "exp": function(num) {
      return /^3[47]/.test(num);
    }
  }, {
    "card-type": "Discover",
    "exp": function(num) {
      return /^6/.test(num);
    }
  }],
  GetCardType = function(num) {
    for (var i = 0; i < CreditCardTypeExpressions.length; i++) {
      if (CreditCardTypeExpressions[i]["exp"](num)) {
        return CreditCardTypeExpressions[i]["card-type"];
      }
    }
  }

var cardLength, cardValue, el;
function initHandlers($scope, parent) {
  if (parent) {
    parent += ' ';
  } else {
   parent = ''
  }
      el = document.querySelector(parent + "#card-number");

      // $("#card-number").on("keydown", function(e) {
      //   cardLength = $(this).val().replace(/ /g, "").length;
      //   cardValue = $(this).val();

      //   if (e.keyCode == 8) {
      //     if (pos == cardValue.length && cardLength % 4 == 0) {
      //       $(this).val(cardValue.slice(0, cardValue.length - 1));
      //     }
      //     return;
      //   } else if (e.keyCode > 57 || e.keyCode == 32) {
      //     if (e.keyCode >= 96 && e.keyCode <= 105) {
      //       return;
      //     }
      //     e.preventDefault();
      //     return;
      //   }

      // });

      // $(parent + "#card-number").on("keyup", function(e) {
      //   cardLength = $(this).val().replace(/ /g, "").length;
      //   cardValue = $(this).val().replace(/ /g, ""),
      //     pos = GetCaretPosition(this),
      //     newValue = "";

      //   if (cardLength >= 15 || e.keyCode < 48 && e.keyCode != 8) {
      //     e.preventDefault();
      //     return;
      //   }

      //   for (var i = 0; i < cardValue.length; i++) {
      //     if (i != 0 && i % 4 == 3) {
      //       newValue = newValue + cardValue[i] + " ";
      //     } else {
      //       newValue = newValue + cardValue[i];
      //     }
      //   }

      //   if (pos % 5 == 4) {
      //     pos++;
      //   } else if (pos % 5 == 0 && e.keyCode == 8) {
      //     pos--;
      //   }

      //   $(this).val(newValue);

      //   setCaretPosition(pos);
      //   displayCardIcon($(this), $scope);

      // });

      // $(parent + "#exp-date").on("keydown", function(e) {
      //   var value = $(this).val(),
      //     length = value.length;

      //   if (e.keyCode == 8) {
      //     if (length == 5) {
      //       $(this).val($(this).val().slice(0, 1));
      //       e.preventDefault();
      //       return;
      //     }
      //   } else if (e.keyCode > 57 || e.keyCode == 32) {
      //     if (e.keyCode >= 96 && e.keyCode <= 105) {
      //       return;
      //     }
      //     e.preventDefault();
      //     return;
      //   }
      // })

      // $(parent + "#exp-date").on("keyup", function(e) {
      //   var value = $(this).val(),
      //     length = value.length;

      //   if (e.keyCode < 48 && e.keyCode != 8) {
      //     e.preventDefault();
      //     return;
      //   }

      //   value = value.replace(/ /g, "").replace(/\//, "");
      //   var newValue = "";
      //   for (var i = 0; i < value.length; i++) {
      //     if (i == 1) {
      //       newValue += value[i] + " / ";
      //     } else {
      //       newValue += value[i];
      //     }
      //   }
      //   value = newValue;

      //   if (value.charAt(0) != "0" && parseInt(value) > 1 && parseInt(value) < 10) {
      //     value = "0" + value + " / ";
      //   }

      //   $(this).val(value);

      // });

  }


function setCaretPosition(pos) {

  el.value = el.value;
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', pos);
      range.select();
      return true;
    } else {
      if (el.selectionStart || el.selectionStart === 0) {
        el.focus();
        el.setSelectionRange(pos, pos);
        return true;
      } else {
        el.focus();
        return false;
      }
    }
  }
}

function GetCaretPosition() {
  var CaretPos = 0;
  // IE Support
  if (document.selection) {

    el.focus();
    var Sel = document.selection.createRange();

    Sel.moveStart('character', -el.value.length);

    CaretPos = Sel.text.length;
  }
  // Firefox support
  else if (el.selectionStart || el.selectionStart == '0')
    CaretPos = el.selectionStart;

  return (CaretPos);

}

function displayCardIcon($el, scope) {
  switch (GetCardType(cardValue)) {
    case "MasterCard":
      scope.card.type = 'mastercard';
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/MasterCardLogo.gif) no-repeat right");
      break;
    case "Visa":
      scope.card.type = 'visa';
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/VisaLogo.gif) no-repeat right");
      break;
    case "American Express":
      scope.card.type = 'amex';
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/AmExLogo.gif) no-repeat right");
      break;
    case "Discover":
      scope.card.type = 'discover';
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/DiscoverLogo.gif) no-repeat right");
      break;
    default:
      $el.css("background", "none");
  }
}

//end helper functions