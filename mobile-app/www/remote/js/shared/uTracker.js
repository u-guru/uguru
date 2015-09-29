angular.module('sharedServices')
.factory('uTracker', [
	'$localstorage',
	'DeviceService',
	uTracker
	]);

// TODO: we'll need to find a way to hold/queue the current events and fire for later
function uTracker($localstorage, DeviceService) {

	var tracker = 	[
					'mp', // mixpanel
					'ga', // google analytics
					'hp'  // heap analytics
					]

	// https://mixpanel.com/help/questions/articles/how-many-data-points-do-i-have
	// mixpanel data limits: only consumes data points for sending events. Setting user properties
	// or even event properties do not count towards the data limit.  You can send up to
	// 255 properties per event.

	//var dataLimit = $localstorage.get("dataLimit", 0);

	var defaultTokens = {
		mp: "cfe34825db9361e6c1d1a16a2b269b07"
	}

	return {
		init: init,
		setUser: setUser,
		set: set,
		track: track,
		push: push,
		get: get,
		sendDevice: sendDevice
	};

	// This sets the API token for the analytics provider
	// Example: uTracker.init('mp', "cfe34825db9361e6c1d1a16a2b269b07" )
	function init(tracker, token) {
		if(DeviceService.isMobile()) {
			switch(tracker) {
				case 'mp':
					console.log("initializing mixpanel tracking: " + defaultTokens.mp);
					mixpanel = window.mixpanel || null;
					mixpanel.init(token || defaultTokens.mp);
					break;

				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	// This sets the unique userID for the analytics provider
	// Example: uTracker.setUser('mp', userID')
	function setUser(tracker, userID) {
		if(DeviceService.isMobile()) {
			switch(tracker) {
				case 'mp':
					//DeviceService.getUUID();
					//var mixpanelID = deviceUUID.substring(0, 8);
					mixpanel.identify(userID);
					break;

				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	function sendDevice(tracker) {
		if(DeviceService.isMobile()) {
			switch(tracker) {
				case 'mp':
					var deviceUUID = DeviceService.getUUID;
					if (deviceUUID === null || deviceUUID === undefined) deviceUUID = 'undefined';
					mixpanel.people.set(
						{
						    "$last_login": new Date(),
						    '$Device_UUID': DeviceService.getUUID(),
						    '$Device_Model': DeviceService.getModel(),
						    '$Device_Platform': DeviceService.getPlatform(),
						    '$Device_Version': DeviceService.getVersion(),
						    '$Network_State': navigator.connection.type
						}
					)
					break;
				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		}
	}

	// This sets the user-level attributes
	// Can be pass in either a key-value pair, or an entire object
	function set(tracker, data) {

		if(DeviceService.isMobile()) {
			switch(tracker) {	
				case 'mp':
					if(typeof data === 'object') {
						mixpanel.people.set(data);
					}
					break;

				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	// This sets the events that will be fired for as the user navigates through the app
	// Additional key-value pairs can be passed in as a data object
	// Example: uTracker.track('mp', 'App Launch', {'App_Load_Time': })
	function track(tracker, event, data) {
		if(DeviceService.isMobile()) {
			switch(tracker) {
				case 'mp':
					mixpanel.track(event, data);
					break;

				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	// This retrieves the user-level attributes associated with the current userID
	function get(tracker, key, value) {

	}

	function push() {


	}


}












