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
		setDeviceKeyboardState:setDeviceKeyboardState,
        closeKeyboardIfExists: closeKeyboardIfExists
	}



    function setDeviceKeyboardState(bool) {
    	deviceKeyboardOpen = bool;
    }

    function closeKeyboardIfExists() {
        DeviceService.doesCordovaExist() && cordova.plugins.Keyboard && cordova.plugins.Keyboard.close();
    }


};






