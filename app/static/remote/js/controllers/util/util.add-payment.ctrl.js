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
    
    console.log($scope.user.cards);
    $scope.cardFormComplete = false;

    $scope.card = null;
    if ($stateParams.cardObj) {
      $scope.card = JSON.parse($stateParams.cardObj);
    }

    $scope.savePayment = function() {
      
      if (!$scope.validatedAddCardForm()) {
        //show errors
      }

      $scope.user.cards.push({
        last4: '4242',
        type: 'visa'
      })

      $scope.rootUser.updateLocal($scope.user);

      //show success --> go back

      $ionicHistory.goBack();
    }

    $scope.setCardToDefault = function() {
      $scope.card.default = true;

    }

    
    $scope.firstFourChange = function() {
      console.log('this is called');
      var element = document.getElementById('first-four');
      var elementValue = element.value;
      if (elementValue.length === 4) {
        var nextElement = document.getElementById("second-four");
        console.log(nextElement);
        nextElement.focus();
      }
    }

    $scope.secondFourChange = function() {
      var element = document.getElementById('second-four');
      var elementValue = element.value;
      if (elementValue.length === 4) {
        var nextElement = document.getElementById("third-four");
        console.log(nextElement);
        nextElement.focus();
      }
    }
    $scope.thirdFourChange = function() {
      var element = document.getElementById('third-four');
      var elementValue = element.value;
      if (elementValue.length === 4) {
        var nextElement = document.getElementById("last-four");
        console.log(nextElement);
        nextElement.focus();
      }
    }

    $scope.lastFourChange = function() {
      var element = document.getElementById('last-four');
      var elementValue = element.value;
      if (elementValue.length === 4) {
        var nextElement = document.getElementById("ccv");
        console.log(nextElement);
        nextElement.focus();
      }
    }

    $scope.ccvChange = function() {
      var element = document.getElementById('ccv');
      var elementValue = element.value;
      if (elementValue.length >= 3) {
        $scope.cardFormComplete = true;
      }
    }

    $scope.injectCardPngClass = function() {
      
    }

    $scope.getCardType = function(number) {
      return 'visa';
    }

    $scope.validatedAddCardForm = function() {
      return true;
    }

    

    $scope.cardForm = {
      first4: '',
      second4: '',
      third4: '',
      last4: '',
      ccv: ''
    }

  }


])