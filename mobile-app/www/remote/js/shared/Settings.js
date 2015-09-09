angular
.module('sharedServices')
.factory("Settings", [
	Settings
	]);

function Settings() {
//TODO: implement localstorage so that settings are actually saved
	var Settings = {
		location: null,
		setLocation: setLocation
	}

	return Settings;

	function getLocation() {
		console.log("retrieving value of location: " + Settings.location);
		return Settings.location;
	}
	function setLocation(value) {
		if(value===true) Settings.location = true;
		else Settings.location = false;
		console.log("location setting changed to: " + Settings.location);
	}

}