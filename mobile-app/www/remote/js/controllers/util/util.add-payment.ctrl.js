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

    $scope.root.vars.cardForm = {number: '', exp:'', view_only:false};

    if ($scope.LOCAL) {
      $scope.root.vars.cardForm.number = '4000056655665556';
      $scope.root.vars.cardForm.exp = '09 / 2016';
    }


      $scope.cashoutUser = function() {
      if ($scope.user.balance > 0) {
          LoadingService.showSuccess('Successfully cashed out', 2000);
          $scope.user.balance = 0;
          $localstorage.setObject('user', $scope.user);
        } else {
          LoadingService.showMsg('Sorry! You must have a balance of at least $1 to deposit to your account.', 3500);
        }
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
      LoadingService.showAmbig('Verifying', 10000);
      var cardNum = $scope.root.vars.cardForm.number;
      var expMM = $scope.root.vars.cardForm.exp.split(' / ')[0];
      var expYY = $scope.root.vars.cardForm.exp.split(' / ')[1];

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



          $scope.user.cards.push(cardInfo);

          var successCallback = function($scope, $state) {

            LoadingService.showSuccess('Your card has been successfully added', 2000, function() {
              if ($state.current.name === 'root.guru-home') {
                closeDefaultCardModal();
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
      $timeout(function() {
        closeDefaultCardModal();
      }, 500)
      $scope.user.updateObj($scope.user, 'cards', cardInfo, $scope);
      LoadingService.showSuccess('Card Successfully Deleted', 2000);
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

      $timeout(function() {
        closeDefaultCardModal();
      }, 500)
      LoadingService.showSuccess('Default set to card **- ' + $scope.card.card_last4, 2000)

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

        $timeout(function() {
          initHandlers();
        })

  }


])

//helper functions

var cardLength, cardValue;
var el = document.getElementById("card-number"),
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
var initHandlers = function() {


      el = document.getElementById("card-number");

      $("#card-number").on("keydown", function(e) {
        cardLength = $(this).val().replace(/ /g, "").length;
        cardValue = $(this).val();

        if (e.keyCode == 8) {
          if (pos == cardValue.length && cardLength % 4 == 0) {
            $(this).val(cardValue.slice(0, cardValue.length - 1));
          }
          return;
        } else if (e.keyCode > 57 || e.keyCode == 32) {
          if (e.keyCode >= 96 && e.keyCode <= 105) {
            return;
          }
          e.preventDefault();
          return;
        }

      });

      $("#card-number").on("keyup", function(e) {
        cardLength = $(this).val().replace(/ /g, "").length;
        cardValue = $(this).val().replace(/ /g, ""),
          pos = GetCaretPosition(this),
          newValue = "";

        if (cardLength >= 15 || e.keyCode < 48 && e.keyCode != 8) {
          e.preventDefault();
          return;
        }

        for (var i = 0; i < cardValue.length; i++) {
          if (i != 0 && i % 4 == 3) {
            newValue = newValue + cardValue[i] + " ";
          } else {
            newValue = newValue + cardValue[i];
          }
        }

        if (pos % 5 == 4) {
          pos++;
        } else if (pos % 5 == 0 && e.keyCode == 8) {
          pos--;
        }

        $(this).val(newValue);

        setCaretPosition(pos);
        displayCardIcon($(this));

      });

      $("#exp-date").on("keydown", function(e) {
        var value = $(this).val(),
          length = value.length;

        if (e.keyCode == 8) {
          if (length == 5) {
            $(this).val($(this).val().slice(0, 1));
            e.preventDefault();
            return;
          }
        } else if (e.keyCode > 57 || e.keyCode == 32) {
          if (e.keyCode >= 96 && e.keyCode <= 105) {
            return;
          }
          e.preventDefault();
          return;
        }
      })

      $("#exp-date").on("keyup", function(e) {
        var value = $(this).val(),
          length = value.length;

        if (e.keyCode < 48 && e.keyCode != 8) {
          e.preventDefault();
          return;
        }

        value = value.replace(/ /g, "").replace(/\//, "");
        var newValue = "";
        for (var i = 0; i < value.length; i++) {
          if (i == 1) {
            newValue += value[i] + " / ";
          } else {
            newValue += value[i];
          }
        }
        value = newValue;

        if (value.charAt(0) != "0" && parseInt(value) > 1 && parseInt(value) < 10) {
          value = "0" + value + " / ";
        }

        $(this).val(value);

      });

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

function displayCardIcon($el) {
  switch (GetCardType(cardValue)) {
    case "MasterCard":
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/MasterCardLogo.gif) no-repeat right");
      break;
    case "Visa":
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/VisaLogo.gif) no-repeat right");
      break;
    case "American Express":
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/AmExLogo.gif) no-repeat right");
      break;
    case "Discover":
      $el.css("background", "url(https://www.gcmapp.net/components/payment_v2/DiscoverLogo.gif) no-repeat right");
      break;
    default:
      $el.css("background", "none");
  }
}

//end helper functions