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
	var faq, support, privacy, signup, university, course, filters, restaurant;

	return {
		initDefaults: initDefaults,
		init: init,
		setModal: setModal,
		getModal: getModal,
		open: open,
		close: close,
		isOpen: isOpen,
		openRestaurant: openRestaurant,
		initGrubModal: initGrubModal
	};

	function initGrubModal(modalName, $scope) {
		var options = {
			scope: $scope,
			animation: 'slide-in-up',
			focusFirstInput: false
		}
		switch (modalName) {
			case 'filters':
				console.log("initializing filters modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/food/filters.modal.html', options).then(function(modal) {
				    console.log("done initializing filters modal");
				    filters = modal;
				    controller.filters = filters;
				});
				break;
			case 'restaurant':
				console.log("initializing restaurant modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/food/restaurant.details.modal.html', options).then(function(modal) {
				    console.log("done initializing restaurant modal");
				    restaurant = modal;
				    controller.restaurant = restaurant;
				});
			default:
				break;
		}

	}

	function openRestaurant(restaurant) {
		
		Restaurant.selected = restaurant;
		console.log("opening restaurant: " + Restaurant.selected.name);
		var modal = controller.restaurant;
		$timeout(function() {
			modal.show();
		}, 0);
	}

	function isOpen(modalName) {

		var modal = controller[modalName];
		return modal.isShown();
	}

	function open(modalName, $scope) {
		console.log("opening " + modalName);

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
		console.log("modal found: " + modal);
		uTracker.track(tracker, modalName + ' modal');
		$timeout(function() {
			modal.show();
		}, 0);
		//attachListeners(modal);
	}

	function close(modalName) {
		console.log("closing " + modalName);

		if(DeviceService.doesCordovaExist() && cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.close();
		}
		$timeout(function() {
			controller[modalName].hide();
		}, 0);

	}

	var clickClose;
	function attachListeners(modal) {

		console.log("modal: " + modal);
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
				$ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', options).then(function(modal) {
				    university = modal;
				    controller.university = university;
				});
				break;

			case 'course':
				console.log("initializing course modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/addcourse.modal.html', options).then(function(modal) {
				    course = modal;
				    controller.course = course;
				});
				break;

			case 'support':
				$ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', options).then(function(modal) {
				    support = modal;
				    controller.support = support;
				});

			case 'filters':
				console.log("initializing filters modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/food/filters.modal.html', options).then(function(modal) {
				    // filters = modal;
				    // controller.filters = filters;
				});
				break;

			case 'restaurants':
				console.log("initializing restaurants modal..");
				$ionicModal.fromTemplateUrl(BASE + 'templates/food/restaurant.details.modal.html', options).then(function(modal) {
					restaurant = modal;
					controller.restaurant = restaurant;
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


		// $ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', options).then(function(modal) {
		//     privacy = modal;
		// });

		$ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', options).then(function(modal) {
		    signup = modal;
		});



		$timeout(function() {
				controller.faq= faq,
				controller.support = support,
				controller.privacy = privacy,
				controller.signup = signup,
				controller.login = signup

		}, 3000);


	}





};









