angular
	.module('uguru.util.controllers')
	.factory('AccessService', [
		'$localstorage',
		'University',
		AccessService
		]);

function AccessService($localstorage, University) {

	var genericAccessCode = 'cool';
	var universityAccessCodes = University.getTargettedAccessCodes();
	var accessInput;
	return {
		validate: validate,
		accessInput: accessInput
	}

	function isMascotCode(code) {
		return universityAccessCodes.indexOf(code) > -1;
	}

	function validate(code) {
		if(code !== undefined) {
			console.log("code entered: " + code);
			if(code===genericAccessCode || isMascotCode(code)) {
				if (!LOCAL) {
					$localstorage.set("access", true);
					$localstorage.set("accessAdmin", true);
				} else {

				}
				return true;
			} else return false;

		} else {
			var storedAccess = JSON.parse($localstorage.get("access", "false"));
			console.log("storedAccess: " + storedAccess);
			return storedAccess;
		}

	}

}