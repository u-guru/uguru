angular
	.module('uguru.util.controllers')
	.factory('AccessService', AccessService);

function AccessService() {

	var genericAccessCode = 'cool';

	return {
		validate: validate
	}

	function validate(code) {
		return code === genericAccessCode;
	}


}