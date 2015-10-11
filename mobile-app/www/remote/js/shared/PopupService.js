angular.module('sharedServices')
.factory("PopupService", [
	'Utilities',
	'$timeout',
	'DeviceService',
	PopupService
	]);

function PopupService(Utilities, $timeout, DeviceService) {

	var controller, source, editName, editEmail, editPassword, confirmPhone, confirmEmail, ranking;
	$timeout(function() {
		source = document.getElementById('root-nav');

		 editName = document.getElementById('edit-name-uguru-popup');
		 editEmail = document.getElementById('edit-email-uguru-popup');
		 editPassword = document.getElementById('edit-password-uguru-popup');
		 confirmPhone = document.getElementById('confirm-phone-uguru-popup');
		 confirmEmail = document.getElementById('confirm-email-uguru-popup');
		 ranking = document.getElementById('guru-ranking-popup');

		 controller = {
		 	editName: editName,
		 	editEmail: editEmail,
		 	editPassword: editPassword,
		 	confirmPhone: confirmPhone,
		 	confirmEmail: confirmEmail,
		 	ranking: ranking
		 };

	}, 1000);
	

	return {
		init: init,
		open: open,
		attachListeners: attachListeners,
		close: close
	}

	function init() {
		console.log("initializing PopupService");
	}

	function open(popupName, callback) {
		var popup = controller[popupName];

		cta(source, popup, {duration:0},
			function(modal) {
				modal.classList.add('show');
			});

		attachListeners(popup, callback);
	}

	function attachListeners(popup, callback) {
		
		var closeIcon = popup.getElementsByClassName('close-popup-link')[0];
		var submitButton = popup.querySelectorAll('button.submit')[0];

		var clickClose = function() {
			popup.classList.remove('show');
		};
		var clickSubmit = function() {
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
		};

		closeIcon.addEventListener('click', clickClose);
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
		submitButton.removeEventListener('click', clickSubmit);
		popup.removeEventListener('keyup', enterSubmit);

	}
	



};






