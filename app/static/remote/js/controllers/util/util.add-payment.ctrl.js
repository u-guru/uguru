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

    $scope.setDefault 

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
      var ccvNum = $scope.ccvInput.value;
      var cardType = $scope.getCardType(cardNum);
      
      //check for errors
      if (!$scope.validatedAddCardForm(cardNum, ccvNum)) {
        //make card shake
      }

      $scope.user.cards.push({
        last_4: cardNum.substring(12,16),
        type: cardType
      });

      $scope.rootUser.updateLocal($scope.user);
      $scope.showSuccess('Card Added!');
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
        var cardType = $scope.getCardType(foo);
        // console.log(cardType);
        if (cardType.length > 0) {
          console.log
        }

        if (foo.length > 0) {
          foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
        }
        $scope.cardInput.value = foo;
        if (foo.length === 19) {  
          $scope.ccvInput.focus();
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
      $scope.ccvInput = document.getElementById('ccv-input');

      if ($scope.card) {
        $scope.cardInput.value = '**** **** **** ' + $scope.card.last_4;
        $scope.ccvInput.value = '***'
      } else {
        $scope.root.keyboard.show('card-input', 500);        
      }

      $scope.cardInput.addEventListener('keyup', checkInputState);

    });

  }


])