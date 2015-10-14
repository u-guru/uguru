angular.module('sharedServices')
.factory("ModalService", [
	'Utilities',
	'$timeout',
	'DeviceService',
	ModalService
	]);

function ModalService(Utilities, $timeout, DeviceService) {

	var controller = {
		
	}


	return {
		setModal: setModal,
		getModal: getModal
	}


	function setModal(key, object) {
		controller[key] = object;
	}

	function getModal(key) {
		return controller[key];
	}
};






