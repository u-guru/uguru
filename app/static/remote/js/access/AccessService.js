angular
	.module('uguru.util.controllers')
	.factory('AccessService', [
		'$localstorage',
		AccessService
		]);

function AccessService($localstorage) {

	var genericAccessCode = 'cool';

	return {
		validate: validate
	}

	function validate(code) {
		if(code !== undefined) {
			console.log("code entered: " + code);
			if(code===genericAccessCode) {
				$localstorage.set("access", "true");
				return true;
			} else return false;

		} else {
			var storedAccess = JSON.parse($localstorage.get("access", "false"));
			console.log("storedAccess: " + storedAccess);
			return storedAccess;
		}
	
	}

}