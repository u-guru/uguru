angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsTransfersController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {

	$scope.goToSelectDebitCard = function() {

	}

	$scope.selectedTransferCard = $scope.user.default_transfer_card;

	$scope.cashoutAndSendToServer = function() {
		var transactionPayload = {

				card_id: $scope.selectedTransferCard.id,
				transaction:true

		}

		var current_date = new Date();
		MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		$scope.user.transfer_transactions.push({
			card: $scope.selectedTransferCard,
			guru_amount: $scope.user.balance,
			guru: {name: $scope.user.name, profile_url:$scope.user.profile_url},
			time: {date: current_date.getDate(), month: MONTHS[current_date.getMonth()]},
			transfer_status: "pending"
		})


		$scope.user.balance = 0;

		$scope.user.createObj($scope.user, 'transactions', transactionPayload, $scope);

		$state.go('^.settings-transactions');
	}

  }

]);

