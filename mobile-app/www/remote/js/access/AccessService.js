angular
	.module('uguru.util.controllers')
	.factory('AccessService', [
		'$localstorage',
		AccessService
		]);

function AccessService($localstorage) {

	var genericAccessCode = 'cool';
	var accessInput;
	return {
		validate: validate,
		accessInput: accessInput
	}

	function validate(code) {
		if(code !== undefined) {
			console.log("code entered: " + code);
			if(code===genericAccessCode) {
				if (!LOCAL) {
					$localstorage.set("access", "true");
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