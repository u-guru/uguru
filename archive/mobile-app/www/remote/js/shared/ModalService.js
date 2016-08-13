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

	var controller = {};
	var faq, support, privacy, signup, university;

	return {
		initDefaults: initDefaults,
		init: init,
		setModal: setModal,
		getModal: getModal,
		open: open,
		close: close,
		isOpen: isOpen
	};

	function isOpen(modalName) {

		var modal = controller[modalName];
		return modal.isShown();
	}

	function open(modalName, $scope) {
		if (DeviceService.doesCordovaExist() && DeviceService.isIOSDevice()) {
			if (window.StatusBar) {
				window.StatusBar.styleLightContent();
			}
		}

		if(modalName === 'login') {
			modalName = 'signup';
			$scope.root.vars.loginMode = true;
		}
		else if (modalName === 'signup') {
			$scope.root.vars.loginMode = false;
		}

		var modal = controller[modalName];
		uTracker.track(tracker, modalName + ' modal');
		$timeout(function() {
			modal.show();
		}, 0);
		//attachListeners(modal);

	}

	function close(modalName) {

		if(DeviceService.doesCordovaExist() && cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.close();
		}
		$timeout(function() {
			controller[modalName].hide();
		}, 0);

	}

	var clickClose;
	function attachListeners(modal) {

		var closeLink = modal.getElementsByClassName('header-down')[0];

		clickClose = function() {
			modal.removeEventListener(clickClose);
			modal.hide();
		}

		modal.addEventListener('click', clickClose);
	}


	function setModal(key, object) {
		controller[key] = object;
	}

	function getModal(key) {
		return controller[key];
	}

	function init(modalName, $scope) {

		var options = {
			scope: $scope,
			animation: 'slide-in-up',
			focusFirstInput: false
		}
		switch (modalName) {
			case 'university':
				console.log("initlizing university modal..",modalName)
				$ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', options).then(function(modal) {
				    university = modal;
				    controller.university = university;
				});
				break;
			case 'course':
			console.log("initlizing course modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/dev/gpa/addcourse.modal.html', options).then(function(modal) {
				    course = modal;
				    controller.course = course;
				});
				break;
			default: break;
		}


	}

	function initDefaults($scope) {

		var options = {
			scope: $scope,
			animation: 'slide-in-up',
			focusFirstInput: false
		}

		$ionicModal.fromTemplateUrl(BASE + 'templates/faq.modal.html', options).then(function(modal) {
		    faq = modal;
		});

		$ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', options).then(function(modal) {
		    support = modal;
		});


		$ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', options).then(function(modal) {
		    privacy = modal;
		});
		// $ionicModal.fromTemplateUrl(BASE + 'templates/fb.modal.html', options).then(function(modal) {
		//     fb = modal;
		// });
		
		if (!$scope.desktopMode) {
			$ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', options).then(function(modal) {
		    	signup = modal;
			});
		}



		$timeout(function() {
				// controller.fb= fb,
				controller.faq= faq,
				controller.support = support,
				controller.privacy = privacy,
				controller.signup = signup,
				controller.login = signup

		}, 3000);


	}





};









