angular
	.module('uguru.util.controllers')
	.factory('AccessService', [
		'$localstorage',
		'University',
		'User',
		AccessService
		]);

function AccessService($localstorage, University, User) {

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

	function validate(code, success_func, fail_func) {
		if(code !== undefined) {
			console.log("code entered: " + code);


			payload = {
				access_code: code
			}

			User.checkAccess(payload).then(function(data) {
				var data = data.plain()
				if (success_func) {
					console.log(data);
					success_func(data);
				}

			}, function(err) {
				console.log('SERVER ERR', err);
				if (err.status === 401) {
					console.log('invalid access code');
					fail_func();
				} else {
					fail_func();
				}
			})

			// if(code===genericAccessCode || isMascotCode(code)) {
			// 	if (!LOCAL) {
			// 		$localstorage.set("access", true);
			// 		$localstorage.set("accessAdmin", true);
			// 	} else {

			// 	}
			// 	return true;
			// } else return false;

		} else {
			var storedAccess = JSON.parse($localstorage.get("access", "false"));

			if (fail_func) {
				fail_func();
			}

			return storedAccess;
		}

	}

}