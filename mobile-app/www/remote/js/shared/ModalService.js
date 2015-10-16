angular.module('sharedServices')
.factory("ModalService", [
	'$rootScope',
	'uTracker',
	'Utilities',
	'$timeout',
	'DeviceService',
	'$ionicModal',
	ModalService
	]);

function ModalService($rootScope, uTracker, Utilities, $timeout, DeviceService, $ionicModal) {

	var controller = {
		faq: null,
		support: null,
		privacy: null,
		signup: null
	}

	var options = {
		animation: 'slide-in-up',
		focusFirstInput: false
	}

	return {
		init: init,
		setModal: setModal,
		getModal: getModal,
		open: open,
		close: close
	}

	function open(modalName) {
		var modal = controller[modalName]; 
		uTracker.track(tracker, modalName + ' modal');
		$timeout(function() {
			modal.show();
		}, 0);
		
	}

	function close(modalName) {
		$timeout(function() {
			controller[modalName].hide();
		}, 0);
	}


	function setModal(key, object) {
		controller[key] = object;
	}

	function getModal(key) {
		return controller[key];
	}

	function init() {

		$ionicModal.fromTemplateUrl(BASE + 'templates/faq.modal.html', options).then(function(modal) {
		        controller.faq = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', options).then(function(modal) {
		    controller.support = modal;
		});


		$ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', options).then(function(modal) {
		    controller.privacy = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', options).then(function(modal) {
		    controller.signup = modal;
		});	
	}
	




};









