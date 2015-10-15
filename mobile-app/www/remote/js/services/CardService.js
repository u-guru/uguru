angular
	.module('uguru.util.controllers')
	.factory('CardService', [
		'$localstorage',
		CardService
		]);

function CardService($localstorage) {
	var localCardArr = [];
	return {
		initCardView: initCardView,
		userCardObj: userCardObj,
		localCardArr: localCardArr,
		instatiateAllCards: instatiateAllCards
	}

	function initCardView(selector, options) {
		var values = {
			name: options.name,
			expiry: '**/**',
			number: '**** **** **** ' +options.card_last4
		}
		var formSelectors = {
			numberInput: 'input#card-input-' + options.id,
			expiryInput: 'input#expiry-input-' + options.id,
		}

		var placeholders = {
			number: '•••• •••• •••• ••••',
	        name: 'Full Name',
	        expiry: '••/••',
	        cvc: '•••'
		}

		var cardJSObj = new Card({
			form: '.form-wrapper-' + options.id,
			container: '.card-wrapper-' + options.id,
			values: values,
			formSelectors: formSelectors,
			placeholders: placeholders,
			formatting: true
		})
		localCardArr = cardJSObj.$card;
		return cardJSObj;
	}

	function instatiateAllCards(user_cards) {
		localCardArr = document.querySelectorAll('.jp-card');
		for (var j = 0; j < localCardArr.length; j++) {
			var indexCard = localCardArr[j];
			var userIndexCard = user_cards[j]
			if (!(indexCard.className.indexOf('jp-card-identified') > -1)) {
				indexCard.className += ' jp-card-' + userIndexCard.card_type.toLowerCase() + ' jp-card-identified';
			}
		}
	}


	function userCardObj(name, card_last4, id, type) {
		return {
			name: name,
			card_last4: card_last4,
			id: id,
			type:type
		}
	}

}