angular
.module('sharedServices')
.factory("Settings", [
	'$localstorage',
	Settings
	]);

function Settings($localstorage) {
//TODO: implement localstorage so that settings are actually saved
//Also a cached version of nearest universities once they activate gps
	
	var settings = $localstorage.getObject('settings');

	var defaultSettings = {
		locationMode: false
	}

	return {
		get: get,
		set: set,
		save: save
	}

	function get(key) {
		console.log("value of " + key + ": " + settings[key]);
		if(settings[key]===undefined) {
			settings[key] = JSON.parse(defaultSettings[key]);
		}
		return settings[key];
	}

	function set(key, value) {
		settings[key] = value;
		console.log("setting " + key + " to: " + value);
		$localstorage.setObject('settings', settings);
	}

	function save() {
		$localstorage.setObject('settings', settings);
	}


}