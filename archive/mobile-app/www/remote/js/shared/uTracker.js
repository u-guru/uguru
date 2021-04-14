angular.module('sharedServices')
.factory('uTracker', [
	'$timeout',
	uTracker
	]);

// TODO: we'll need to find a way to hold/queue the current events and fire for later
function uTracker($timeout) {

	var mixpanel, localytics;
	var trackers = 	[
					'mp', // mixpanel
					'lo', // localytics
					'ga', // google analytics
					'hp'  // heap analytics
					];

	// https://mixpanel.com/help/questions/articles/how-many-data-points-do-i-have
	// mixpanel data limits: only consumes data points for sending events. Setting user properties
	// or even event properties do not count towards the data limit.  You can send up to
	// 255 properties per event.

	//var dataLimit = $localstorage.get("dataLimit", 0);

	var defaultTokens = {
		mp: "cfe34825db9361e6c1d1a16a2b269b07",
		lo: "e5f4bf9fa4b0cfa312def57-c65b66fe-66bf-11e5-0c2c-00deb82fd81f"
	};

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

	function init(tracker, token) {
		if(!LOCAL) {
			switch(tracker) {
				case 'mp':
					mixpanel = window.mixpanel || null;
					mixpanel.init(token || defaultTokens.mp);
					break;

				case 'lo':
					// ll('init', token || defaultTokens.lo);
					// localyticsSession = LocalyticsSession(token || defaultTokens.lo);
					// localyticsSession.open();
					// localyticsSession.upload();
					break;
				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	// This sets the unique userID for the analytics provider

	function setUser(tracker, userID) {
		if(!LOCAL) {
			switch(tracker) {
				case 'mp':
					//DeviceService.getUUID();
					//var mixpanelID = deviceUUID.substring(0, 8);
					mixpanel.identify(userID);
					break;
				case 'lo':
					var doNothing;
					// ll('setCustomerId', userID);
					break;
				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	function sendDevice(tracker, deviceObject) {
		if(!LOCAL) {
			switch(tracker) {
				case 'mp':
					// var deviceUUID = DeviceService.getUUID;
					// if (deviceUUID === null || deviceUUID === undefined) deviceUUID = 'undefined';
					mixpanel.people.set(
						deviceObject
						// {
						//     "$last_login": new Date(),
						//     '$Device_UUID': DeviceService.getUUID(),
						//     '$Device_Model': DeviceService.getModel(),
						//     '$Device_Platform': DeviceService.getPlatform(),
						//     '$Device_Version': DeviceService.getVersion()
						//     //'$Network_State': navigator.connection.type || 'undefined'
						// }
					);
					break;
				case 'lo':
					//ll('setCustomDimension', 0, )
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

		if(!LOCAL) {
			switch(tracker) {
				case 'mp':
					if(typeof data === 'object') {
						mixpanel.people.set(data);
					}
					break;

				case 'lo': break;
				case 'ga': break;
				case 'hp': break;
				default: throw "Invalid tracker name. Refer to uTracker.js";
			}
		} else return;
	}

	// This sets the events that will be fired for as the user navigates through the app
	// Additional key-value pairs can be passed in as a data object

	function track(tracker, event, data) {
		if(!LOCAL) {
			switch(tracker) {
				case 'mp':
					$timeout(function() {
						mixpanel.track(event, data);
					}, 300);
					break;
				case 'lo':
					$timeout(function() {
						// ll('tagEvent', event, data);
					}, 300);
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












