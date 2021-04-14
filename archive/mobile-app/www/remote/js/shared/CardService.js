angular.module('sharedServices')
.factory('CardService', [
	"$localstorage",
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
			number: options.card_last4 &&  '**** **** **** ' + options.card_last4
		}

		var formSelectors;


		if (options.card_number) {
			formSelectors = {
				numberInput: 'input#card-input-' + options.id,
				expiryInput: 'input#expiry-input-' + options.id,
			}
		}

		var placeholders = {
			number: '•••• •••• •••• ••••',
	        name: 'Full Name',
	        expiry: '••/••',
	        cvc: '•••'
		}

		var card_wrapper;
		var form_wrapper;
		if (selector) {
			card_wrapper = '.card-modal-wrapper-' + options.id;
			form_wrapper = '.form-modal-wrapper-' + options.id;
		} else {
			card_wrapper = '.card-wrapper-' + options.id;
			form_wrapper = '.form-wrapper-' + options.id;
		}

		var cardJSObj = new Card({
			form: '.form-wrapper-' + options.id,
			container: card_wrapper,
			values: values,
			placeholders: placeholders,
			formatting: true,
			formSelectors: formSelectors
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
			card_type:type
		}
	}

}