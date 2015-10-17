angular.module('sharedServices')
.factory("KeyboardService", [
	'Utilities',
	'$timeout',
	'DeviceService',
	KeyboardService
	]);

function KeyboardService(Utilities, $timeout, DeviceService) {

	var deviceKeyboardExists = false;
	var deviceKeyboardOpen = false;
	return {
		setDeviceKeyboardState:setDeviceKeyboardState
	}



    function setDeviceKeyboardState(bool) {
    	deviceKeyboardOpen = bool;
    }




};






