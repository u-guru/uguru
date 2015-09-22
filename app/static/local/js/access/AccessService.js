angular
	.module('uguru.util.controllers')
	.factory('AccessService', AccessService);

function AccessService() {

	var genericAccessCode = 'cool';

	return {
		validate: validate
	}

	function validate(code) {
		console.log("code entered: " + code);
		return code === genericAccessCode;
	}


}