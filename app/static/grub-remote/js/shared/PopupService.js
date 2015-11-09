angular.module('sharedServices')
.factory("PopupService", [
	'Utilities',
	'$timeout',
	'$ionicSlideBoxDelegate',
	'DeviceService',
	PopupService
	]);

function PopupService(Utilities, $timeout, $ionicSlideBoxDelegate, DeviceService) {

	var controller = {};
	var localPopup, source, editName, editEmail, editPassword, confirmPhone, confirmEmail, ranking;
	
	return {
		initDefaults: initDefaults,
		init: init,
		open: open,
		attachListeners: attachListeners,
		close: close
	}

	function open(popupName, callback) {
		$timeout(function() {
			var popup = controller[popupName];
			if (typeof source !== 'element') {
				source = document.getElementById('root-nav');
			}
			cta(source, popup, {duration:0},
				function(modal) {
					modal.classList.add('show');
				});

			attachListeners(popup, callback);

		}, 0);	
	}

	var clickClose, clickSubmit, closeIcon, submitButton, enterSubmit
	function attachListeners(popup, callback) {

		var closeIcon = popup.getElementsByClassName('close-popup-link')[0];
		var submitClose = popup.querySelectorAll('button.submit-close')[0];
		var submitButton = popup.querySelectorAll('button.submit')[0];

		clickClose = function() {
			popup.classList.remove('show');
			closeIcon.removeEventListener('click', clickClose);
			// Wrapping this in a try block since some popups won't have these
			try {
				submitClose.removeEventListener('click', clickClose);
				submitButton.removeEventListener('click', clickSubmit);
				popup.removeEventListener('keyup', enterSubmit);	
			} catch(err) {
			}
			$ionicSlideBoxDelegate.update();
		};
		clickSubmit = function() {
			callback();
		};
		var enterSubmit = function(e) {
			var key = e.keyCode || e.key || e.which;
			if (key === 13) {
				if (DeviceService.isMobile()) {
				  cordova.plugins.Keyboard.close();
				}
				callback();
			}
			$ionicSlideBoxDelegate.update();
		};

		closeIcon.addEventListener('click', clickClose);
		if(submitClose !== undefined) {
			submitClose.addEventListener('click', clickClose);
		}

		if(typeof callback === 'function') {
			submitButton.addEventListener('click', clickSubmit);
			popup.addEventListener('keyup', enterSubmit);
		}

	}

	function close(popupName) {

		var popup = controller[popupName];
		var closeIcon = popup.getElementsByClassName('close-popup-link')[0];
		var submitButton = popup.querySelectorAll('button.submit')[0];

		popup.classList.remove('show');
		closeIcon.removeEventListener('click', clickClose);
		// Wrapping this in a try block since some popups won't have these
		try {
			submitClose.removeEventListener('click', clickClose);
			submitButton.removeEventListener('click', clickSubmit);
			popup.removeEventListener('keyup', enterSubmit);	
		} catch(err) {
		}
		$ionicSlideBoxDelegate.update();

	}


	function init(popupName, elemId) {
		//source = document.getElementById('root-nav');
		localPopup = document.getElementById(elemId);
		controller[popupName] = localPopup;
	}

	function initDefaults() {
		console.log("initializing PopupService");
		$timeout(function() {
			source = document.getElementById('root-nav');
			editName = document.getElementById('edit-name-uguru-popup');
			editEmail = document.getElementById('edit-email-uguru-popup');
			editPassword = document.getElementById('edit-password-uguru-popup');
			confirmPhone = document.getElementById('confirm-phone-uguru-popup');
			confirmEmail = document.getElementById('confirm-email-uguru-popup');
			ranking = document.getElementById('guru-ranking-popup');
 
		 	controller.editName = editName,
		 	controller.editEmail = editEmail,
		 	controller.editPassword = editPassword,
		 	controller.confirmPhone = confirmPhone,
		 	controller.confirmEmail = confirmEmail,
		 	controller.ranking = ranking


		}, 1000);
	}



}




